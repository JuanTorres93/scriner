import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useSlate, useFocused } from "slate-react";
import { Editor, Range, Node } from "slate";
import {
  useFloating,
  flip,
  shift,
  offset,
  autoUpdate,
} from "@floating-ui/react";
import { useParams } from "react-router-dom";

import {
  HiMiniBell,
  HiHeart,
  HiMiniPhoto,
  HiFilm,
  HiMiniMusicalNote,
} from "react-icons/hi2";

import { ScriptActions } from "./ScriptActions";
import { EDIT_TYPES } from "../edit/editTypes";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useCreateEdit } from "../edit/hooks/useCreateEdit";
import { useDeleteEdit } from "../edit/hooks/useDeleteEdit";

/* ======================================================
   SAFETY HELPERS
   - These helpers prevent crashes caused by invalid paths
   - They validate the selection before accessing Editor APIs
   - Without these guards, Slate can throw errors like:
     "Cannot find a descendant at path …"
   ====================================================== */
function hasValidSelection(editor) {
  const sel = editor.selection;
  if (!sel || !Range.isRange(sel)) return false;
  if (!Node.has(editor, sel.anchor.path) || !Node.has(editor, sel.focus.path))
    return false;
  return true;
}

function safeGetMarks(editor) {
  if (!hasValidSelection(editor)) return null;
  try {
    return Editor.marks(editor) ?? null;
  } catch {
    return null;
  }
}

function safeSelectedText(editor) {
  if (!hasValidSelection(editor)) return "";
  try {
    return Editor.string(editor, editor.selection);
  } catch {
    return "";
  }
}

/* ======================================================
   STYLES
   ====================================================== */
const StyledMenu = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  padding: 0.7rem 1rem;
  background-color: var(--color-grey-t1);
  border-radius: var(--border-radius);
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);

  transition: opacity 120ms ease, transform 80ms ease-out;
`;

export const Menu = React.forwardRef(({ ...props }, ref) => (
  <StyledMenu {...props} data-test-id="menu" ref={ref} />
));

/* ======================================================
   HoveringToolbar
   ------------------------------------------------------
   A floating toolbar anchored to the current Slate selection
   using Floating UI.

   Key ideas:
   - We use a "virtual element" (no real DOM node) whose `getBoundingClientRect`
     returns the rectangle of the current selection.
   - Floating UI positions relative to this virtual rect.
   - `autoUpdate` handles scroll/resize changes, but not selection
     changes — we must call `update()` manually when selection changes.
   - We hide the toolbar when focus/selection is invalid or empty.
   ====================================================== */
const HoveringToolbar = ({ getSelectionRect, editableRef }) => {
  const editor = useSlate();
  const inFocus = useFocused();
  const { scriptId } = useParams();
  const { createEdit, isCreating } = useCreateEdit();
  const { deleteEdit, isDeleting: isDeletingEdit } = useDeleteEdit();

  /**
   * Virtual element:
   * - Provides the rect of the current selection to Floating UI.
   * - If no selection, return an off-screen rect so the toolbar
   *   is effectively hidden.
   * - `contextElement` allows autoUpdate to listen to scroll events
   *   of the editor container, not only the window.
   */
  const virtualEl = useMemo(() => {
    const ve = {
      getBoundingClientRect: () => {
        const rect = getSelectionRect?.();
        return rect ?? new DOMRect(-9999, -9999, 0, 0);
      },
      contextElement: editableRef?.current ?? undefined,
    };
    return ve;
  }, [getSelectionRect, editableRef]);

  /**
   * Floating UI configuration:
   * - `placement: "top"`: prefer showing above selection.
   * - `offset(8)`: small gap between selection and toolbar.
   * - `flip()`: if no space above, flip to bottom.
   * - `shift({ padding: 8 })`: keep inside viewport.
   * - `autoUpdate`: recompute position on scroll/resize/layout.
   */
  const { x, y, strategy, refs, update } = useFloating({
    placement: "top",
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: (reference, floating, cleanup) => {
      const stop = autoUpdate(reference, floating, update);
      return () => {
        stop();
        cleanup?.();
      };
    },
  });

  /** Attach the virtual reference to Floating UI */
  useEffect(() => {
    refs.setReference(virtualEl);
  }, [virtualEl, refs]);

  /** Force update on Slate selection changes */
  useEffect(() => {
    update();
  }, [update, editor.selection]);

  /** Also update on browser `selectionchange` events */
  useEffect(() => {
    const onSelChange = () => update();
    document.addEventListener("selectionchange", onSelChange);
    return () => document.removeEventListener("selectionchange", onSelChange);
  }, [update]);

  /**
   * Visibility guard:
   * - Hide if editor not focused
   * - Hide if no valid selection (guards against stale paths)
   * - Hide if selected text is empty
   * - Hide if no selection rectangle available
   */
  const shouldHide = (() => {
    if (!inFocus) return true;
    if (!hasValidSelection(editor)) return true;
    if (safeSelectedText(editor) === "") return true;
    if (!getSelectionRect?.()) return true;
    return false;
  })();

  /**
   * Active marks:
   * - Read once per render using safeGetMarks
   * - Prevents multiple unsafe calls to Editor.marks
   */
  const activeMarks = safeGetMarks(editor) || {};
  const isMusicActive = !!activeMarks[EDIT_TYPES.MUSIC];
  const isSfxActive = !!activeMarks[EDIT_TYPES.SFX];
  const isEmotionActive = !!activeMarks[EDIT_TYPES.EMOTION];
  const isVfxActive = !!activeMarks[EDIT_TYPES.VFX];
  const isBrollActive = !!activeMarks[EDIT_TYPES.BROLL];

  /**
   * Toggle a mark persisted as an "Edit" in the DB:
   * - If active: remove mark and delete its edit in DB
   * - If inactive: create new edit in DB, then add mark with editId
   * - Always guard with hasValidSelection to avoid crashes
   */
  function handleToggleEdit(type) {
    if (!hasValidSelection(editor)) return;

    const current = (safeGetMarks(editor) || {})[type];

    // Remove mark
    if (current) {
      const editId = current?.editId;
      if (editId && !isDeletingEdit) {
        deleteEdit(editId, {
          onSuccess: () => {
            ScriptActions.removeEditMarkByEditId(editor, type, editId);
          },
        });
      } else {
        // Fallback if no editId
        ScriptActions.removeMark(editor, type);
      }
      return;
    }

    // Add new mark
    if (!scriptId) return;
    const newEdit = {
      type,
      content: "Nueva anotación",
      isDone: false,
      scriptId,
    };
    createEdit(newEdit, {
      onSuccess: (data) => {
        ScriptActions.addMark(editor, type, data.id);
      },
    });
  }

  /** Optimization: do not render anything if hidden */
  if (shouldHide) return null;

  /**
   * Render:
   * - Use a React portal so toolbar lives at document.body level,
   *   avoiding z-index/overflow issues
   * - Floating UI provides x/y/strategy positioning
   */
  return ReactDOM.createPortal(
    <Modal>
      <Menu
        ref={refs.setFloating}
        style={{
          position: strategy,
          top: y ?? -9999,
          left: x ?? -9999,
          opacity: 0.9,
          pointerEvents: "auto",
        }}
        onMouseDown={(e) => e.preventDefault()} // prevent stealing focus
      >
        <Button
          onClick={() => handleToggleEdit(EDIT_TYPES.MUSIC)}
          type="hoverbar"
          variant={isMusicActive ? "activeHoverElement" : null}
          disabled={isCreating}
        >
          <HiMiniMusicalNote />
        </Button>

        <Button
          onClick={() => handleToggleEdit(EDIT_TYPES.SFX)}
          type="hoverbar"
          variant={isSfxActive ? "activeHoverElement" : null}
          disabled={isCreating}
        >
          <HiMiniBell />
        </Button>

        <Button
          onClick={() => handleToggleEdit(EDIT_TYPES.EMOTION)}
          type="hoverbar"
          variant={isEmotionActive ? "activeHoverElement" : null}
          disabled={isCreating}
        >
          <HiHeart />
        </Button>

        <Button
          onClick={() => handleToggleEdit(EDIT_TYPES.VFX)}
          type="hoverbar"
          variant={isVfxActive ? "activeHoverElement" : null}
          disabled={isCreating}
        >
          <HiMiniPhoto />
        </Button>

        <Button
          onClick={() => handleToggleEdit(EDIT_TYPES.BROLL)}
          type="hoverbar"
          variant={isBrollActive ? "activeHoverElement" : null}
          disabled={isCreating}
        >
          <HiFilm />
        </Button>
      </Menu>
    </Modal>,
    document.body
  );
};

export default HoveringToolbar;
