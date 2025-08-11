import styled, { css } from "styled-components";

import { EDIT_TYPES } from "./editTypes";
import { useCurrentEdits } from "./CurrentEditsContext";
import { useEdits } from "./hooks/useEdits";

const markHeightPx = 6;
const spaceBetweenMarksPx = 12;
const hoverStyle = css`
  opacity: 1;
  transform: scaleY(1.6) !important;
`;

const StyledSpan = styled.span`
  background-color: transparent;
  font-weight: var(--font-weight-thinest);
  position: relative;

  .inline-edit {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    height: ${markHeightPx}px;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.2s ease;

    ${(props) => props.$isCurrent && hoverStyle}

    &:hover {
      ${hoverStyle}
    }

    &.current {
      ${hoverStyle}
    }

    &.done {
      background-color: var(--color-grey) !important;
    }
  }

  ${(props) =>
    props.leaf.sfx &&
    css`
      .inline-edit.sfx {
        display: inline-block;
        bottom: -${markHeightPx}px;
        background-color: var(--color-sfx);
      }
    `}

  ${(props) =>
    props.leaf.vfx &&
    css`
      .inline-edit.vfx {
        display: inline-block;
        top: ${markHeightPx - spaceBetweenMarksPx}px;
        background-color: var(--color-vfx);
      }
    `}

  ${(props) =>
    props.leaf.graphic &&
    css`
      .inline-edit.graphic {
        display: inline-block;
        top: ${markHeightPx - 2 * spaceBetweenMarksPx}px;
        background-color: var(--color-graphic);
      }
    `}

  ${(props) =>
    props.leaf.broll &&
    css`
      .inline-edit.broll {
        display: inline-block;
        top: ${markHeightPx - 3 * spaceBetweenMarksPx}px;
        background-color: var(--color-broll);
      }
    `}

  ${(props) =>
    props.leaf.music &&
    css`
      .inline-edit.music {
        display: inline-block;
        position: absolute;
        bottom: ${markHeightPx - 2 * spaceBetweenMarksPx}px;
        left: 0;
        right: 0;
        height: ${markHeightPx}px;
        background-color: var(--color-music);
      }
    `}
`;

function InlineEdit(props) {
  const editIds = props.editIds || [];
  const { setCurrentEditsIds, isCurrentEdit } = useCurrentEdits();
  const { edits } = useEdits();

  function handleClick(e) {
    e.preventDefault();

    if (!editIds || editIds.length === 0 || !setCurrentEditsIds) return;

    const newCurrentEditsIds = {};
    editIds.forEach((edit) => {
      newCurrentEditsIds[edit.type] = edit.editId;
    });

    // Set the current edits in the parent component.
    setCurrentEditsIds((prevCurrentEdits) => ({
      ...prevCurrentEdits,
      ...newCurrentEditsIds,
    }));
  }

  // Función helper para generar el className de cada edit
  function getEditClassName(editType) {
    const editId = extractEditIdFromType(editType, editIds);
    const isCurrent = isCurrentEdit({ type: editType, id: editId });
    const isDone = edits?.some((edit) => edit.id === editId && edit.isDone);

    return `inline-edit ${editType} ${isCurrent ? "current" : ""} ${
      isDone ? "done" : ""
    }`.trim();
  }

  // Función helper para renderizar cada mark
  function renderEditMark(editType) {
    const editId = extractEditIdFromType(editType, editIds);

    return (
      <mark
        key={editType}
        data-edit-id={editId}
        className={getEditClassName(editType)}
      ></mark>
    );
  }

  return (
    // span because all leaves MUST be an inline element.
    <StyledSpan onClick={handleClick} {...props.attributes} leaf={props.leaf}>
      {renderEditMark(EDIT_TYPES.VFX)}
      {renderEditMark(EDIT_TYPES.SFX)}
      {renderEditMark(EDIT_TYPES.MUSIC)}
      {renderEditMark(EDIT_TYPES.GRAPHIC)}
      {renderEditMark(EDIT_TYPES.BROLL)}
      <span>{props.children}</span>
    </StyledSpan>
  );
}

function extractEditIdFromType(type, editIds) {
  if (!editIds || editIds.length === 0) return null;

  const edit = editIds.find((edit) => edit.type === type);
  return edit ? edit.editId : null;
}

export default InlineEdit;
