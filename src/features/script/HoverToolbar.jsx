import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useSlate, useFocused } from "slate-react";
import { Editor, Range } from "slate";
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
import { getMarksInSelection } from "../../utils/slateUtils";
import { useDeleteEdit } from "../edit/hooks/useDeleteEdit";

/**
 * HoveringToolbar
 * ---------------
 * A floating toolbar anchored to the current Slate selection using Floating UI.
 *
 * Key ideas:
 * - We use a "virtual element" (no real DOM node) whose `getBoundingClientRect`
 *   returns the rectangle of the current selection. Floating UI positions
 *   relative to that virtual rect.
 * - `autoUpdate` handles scroll/resize changes, but it doesn't know when the
 *   selection rectangle changes. We therefore call `update()` when Slate's
 *   selection changes and on `document.selectionchange`.
 * - `contextElement` points to the Editable container so `autoUpdate` also
 *   responds to *container* scroll (not only window scroll).
 * - We hide the toolbar when focus/selection is invalid or the selection is
 *   empty (same semantics you had before).
 */
const HoveringToolbar = ({ getSelectionRect, editableRef }) => {
  const editor = useSlate();
  const inFocus = useFocused();
  const { scriptId } = useParams();
  const { createEdit, isCreating } = useCreateEdit();
  const { deleteEdit, isDeleting: isDeletingEdit } = useDeleteEdit();

  /**
   * Virtual element:
   * - Floating UI can position relative to anything that looks like a DOMRect.
   * - `getBoundingClientRect` pulls the latest rect from `getSelectionRect()`.
   * - If there is no valid selection, we return an off-screen rect so Floating UI
   *   effectively "parks" the toolbar out of view.
   * - `contextElement` is crucial when the editor lives inside a scrollable
   *   container: autoUpdate will listen to that element's scroll events.
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
   * - `placement: "top"`: prefer to show the toolbar above the selection.
   * - `offset(8)`: small gap between selection and toolbar.
   * - `flip()`: if there is not enough space on top, flip to bottom.
   * - `shift({ padding: 8 })`: keep inside viewport with some padding.
   * - `autoUpdate`: recompute position on scroll/resize/layout changes of
   *   the reference/floating/context elements.
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

  /**
   * Attach the virtual reference to Floating UI.
   * This tells Floating UI: "position relative to this virtual element".
   */
  useEffect(() => {
    refs.setReference(virtualEl);
  }, [virtualEl, refs]);

  /**
   * Force a position update when Slate's selection object changes.
   * Note: Floating UI does not automatically detect selection changes because
   * the "reference" is virtual; we must call `update()` explicitly.
   */
  useEffect(() => {
    update();
  }, [update, editor.selection]);

  /**
   * Also update when the browser fires `selectionchange` (covers cases where
   * Slate may not re-render immediately, multi-line selections, etc.).
   */
  useEffect(() => {
    const onSelChange = () => update();
    document.addEventListener("selectionchange", onSelChange);
    return () => document.removeEventListener("selectionchange", onSelChange);
  }, [update]);

  /**
   * Visibility guard:
   * - Hide if editor is not focused.
   * - Hide if there is no selection or it's collapsed.
   * - Hide if the selected text is empty (e.g., only spaces).
   * - Hide if `getSelectionRect()` can't compute a rectangle (off-screen / invalid).
   */
  const shouldHide = (() => {
    const sel = editor.selection;
    if (!inFocus || !sel || Range.isCollapsed(sel)) return true;
    if (Editor.string(editor, sel) === "") return true;
    return !getSelectionRect?.();
  })();

  /**
   * Toggle a mark that is persisted as an "Edit" in your app:
   * - If the mark exists, find the specific mark in the selection and delete
   *   its "edit" from DB, then remove the mark by its editId in Slate.
   * - If it does not exist, create the edit in DB and add the mark with the
   *   returned editId.
   *
   * This keeps Slate's inline marks and your DB "edits" in sync.
   */
  function handleToggleEdit(type) {
    const hasMark = ScriptActions.isMarkActive(editor, type);

    if (hasMark) {
      // 1. Search in editor selector for mark type
      const marks = getMarksInSelection(editor);

      // 2. Search for the mark type in the array of marks
      const mark = marks.find((mark) => mark[type] !== undefined);

      // ScriptActions.removeMark(editor, type);
      // TODO?  Refactor para quitar marcas primero. Si no quedan marcas con el edit Id, entonces borrarlo de la base de datos

      // 3. If the mark is found, remove it from the editor
      if (mark && !isDeletingEdit) {
        deleteEdit(mark[type].editId, {
          onSuccess: () => {
            ScriptActions.removeEditMarkByEditId(
              editor,
              type,
              mark[type].editId
            );
          },
        });
      }
    } else {
      if (!scriptId) {
        return;
      }
      // If the mark is not active, add it with a unique edit ID.
      const newEdit = {
        type,
        content: "Nueva anotación", // Default label for new edits
        isDone: false,
        scriptId,
      };

      // Create the edit in the database.
      createEdit(newEdit, {
        onSuccess: (data) => {
          // Adds a Slate mark like { [type]: { editId: data.id } } to the selection
          ScriptActions.addMark(editor, type, data.id);
        },
      });
    }
  }

  /**
   * Render:
   * - We use a React portal so the toolbar lives at `document.body` level,
   *   avoiding z-index/overflow issues from nested containers.
   * - The `Menu` receives Floating UI's `refs.setFloating` and `x/y/strategy`.
   * - When `shouldHide` is true, the toolbar is moved off-screen and made
   *   non-interactive (`pointerEvents: none`, `opacity: 0`).
   */
  return ReactDOM.createPortal(
    <Modal>
      <Menu
        ref={refs.setFloating}
        style={{
          position: strategy,
          top: y ?? -9999,
          left: x ?? -9999,
          opacity: shouldHide ? 0 : 0.9,
          pointerEvents: shouldHide ? "none" : "auto",
        }}
        // Prevent the toolbar from stealing focus from the editor on click.
        onMouseDown={(e) => e.preventDefault()}
      >
        <Button
          onClick={() => handleToggleEdit(EDIT_TYPES.MUSIC)}
          type="hoverbar"
          variant={
            ScriptActions.isMarkActive(editor, EDIT_TYPES.MUSIC)
              ? "activeHoverElement"
              : null
          }
          disabled={isCreating}
        >
          <HiMiniMusicalNote />
        </Button>

        <Button
          onClick={() => handleToggleEdit(EDIT_TYPES.SFX)}
          type="hoverbar"
          variant={
            ScriptActions.isMarkActive(editor, EDIT_TYPES.SFX)
              ? "activeHoverElement"
              : null
          }
          disabled={isCreating}
        >
          <HiMiniBell />
        </Button>

        <Button
          onClick={() => handleToggleEdit(EDIT_TYPES.EMOTION)}
          type="hoverbar"
          variant={
            ScriptActions.isMarkActive(editor, EDIT_TYPES.EMOTION)
              ? "activeHoverElement"
              : null
          }
          disabled={isCreating}
        >
          <HiHeart />
        </Button>

        <Button
          onClick={() => handleToggleEdit(EDIT_TYPES.VFX)}
          type="hoverbar"
          variant={
            ScriptActions.isMarkActive(editor, EDIT_TYPES.VFX)
              ? "activeHoverElement"
              : null
          }
          disabled={isCreating}
        >
          <HiMiniPhoto />
        </Button>

        <Button
          onClick={() => handleToggleEdit(EDIT_TYPES.BROLL)}
          type="hoverbar"
          variant={
            ScriptActions.isMarkActive(editor, EDIT_TYPES.BROLL)
              ? "activeHoverElement"
              : null
          }
          disabled={isCreating}
        >
          <HiFilm />
        </Button>
      </Menu>
    </Modal>,
    document.body
  );
};

/**
 * Fixed-position container styled as a compact hover bar.
 * We rely on Floating UI for the actual `top/left/strategy` positioning.
 */
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

  /* Keep motion subtle and snappy */
  transition: opacity 120ms ease, transform 80ms ease-out;
`;

export const Menu = React.forwardRef(({ ...props }, ref) => (
  <StyledMenu {...props} data-test-id="menu" ref={ref} />
));

export default HoveringToolbar;
