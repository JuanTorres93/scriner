import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { Editor, Range } from "slate";
import { useFocused, useSlate } from "slate-react";
import styled from "styled-components";

import {
  HiBolt,
  HiCamera,
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

const HoveringToolbar = () => {
  const ref = useRef(null);
  const editor = useSlate();
  const inFocus = useFocused();
  const { scriptId } = useParams();
  const { createEdit, isCreating } = useCreateEdit();
  const { deleteEdit, isDeleting: isDeletingEdit } = useDeleteEdit();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;
    if (!el) {
      return;
    }
    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }
    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = ".8";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  function handleToggleEdit(type) {
    const hasMark = ScriptActions.isMarkActive(editor, type);
    if (hasMark) {
      // 1. Search in editor selector for mark type
      const marks = getMarksInSelection(editor);

      // 2. Search for the mark type in the array of marks
      const mark = marks.find((mark) => mark[type] !== undefined);

      // ScriptActions.removeMark(editor, type);
      // TODO NEXT Refactor para quitar marcas primero. Si no quedan marcas con el edit Id, entonces borrarlo de la base de datos

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
        content: "Nueva anotación",
        isDone: false,
        scriptId,
      };

      // Create the edit in the database.
      createEdit(newEdit, {
        onSuccess: (data) => {
          ScriptActions.addMark(editor, type, data.id);
        },
      });
    }
  }

  return (
    <Portal>
      <Modal>
        <Menu
          ref={ref}
          onMouseDown={(e) => {
            // prevent toolbar from taking focus away from editor
            e.preventDefault();
          }}
        >
          {/* TODO NEXT los botones deben abrir un modal con el menú para añadir el Edit */}
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
            <HiBolt />
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
            onClick={() => handleToggleEdit(EDIT_TYPES.GRAPHIC)}
            type="hoverbar"
            variant={
              ScriptActions.isMarkActive(editor, EDIT_TYPES.GRAPHIC)
                ? "activeHoverElement"
                : null
            }
            disabled={isCreating}
          >
            <HiCamera />
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
      </Modal>
    </Portal>
  );
};

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.7rem 1rem;
  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: var(--color-grey-t1);
  border-radius: var(--border-radius);
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
  transition: opacity 0.2s ease;
`;

export const Menu = React.forwardRef(({ ...props }, ref) => (
  <StyledMenu {...props} data-test-id="menu" ref={ref} />
));

export const Portal = ({ children }) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export default HoveringToolbar;
