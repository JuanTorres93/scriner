import styled, { css } from "styled-components";

import { EDIT_TYPES } from "./editTypes";
import { useCurrentEdits } from "./CurrentEditsContext";

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
    /* TODO (maybe not here) Different colors for different emotions*/
    css`
      .inline-edit.music {
        display: inline-block;
        position: absolute;
        bottom: ${markHeightPx - 2 * spaceBetweenMarksPx}px;
        left: 0;
        right: 0;
        height: ${markHeightPx}px;
        background-color: var(
          --color-primary
        ); // TODO give music a proper color
      }
    `}
`;

function InlineEdit(props) {
  const editIds = props.editIds || [];
  const { setCurrentEditsIds, isCurrentEdit } = useCurrentEdits();

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

  return (
    // span because all leaves MUST be an inline element.
    <StyledSpan onClick={handleClick} {...props.attributes} leaf={props.leaf}>
      <mark
        data-edit-id={extractEditIdFromType(EDIT_TYPES.VFX, editIds)}
        // Assign class to detect current edit. It allows us to apply styles. when selecting an edit in the lists
        className={`inline-edit ${EDIT_TYPES.VFX}
        ${
          isCurrentEdit({
            type: EDIT_TYPES.VFX,
            id: extractEditIdFromType(EDIT_TYPES.VFX, editIds),
          })
            ? "current"
            : ""
        }
        `}
      ></mark>
      <mark
        data-edit-id={extractEditIdFromType(EDIT_TYPES.SFX, editIds)}
        className={`inline-edit ${EDIT_TYPES.SFX}
        ${
          isCurrentEdit({
            type: EDIT_TYPES.SFX,
            id: extractEditIdFromType(EDIT_TYPES.SFX, editIds),
          })
            ? "current"
            : ""
        }
        `}
      ></mark>
      <mark
        data-edit-id={extractEditIdFromType(EDIT_TYPES.MUSIC, editIds)}
        className={`inline-edit ${EDIT_TYPES.MUSIC}
        ${
          isCurrentEdit({
            type: EDIT_TYPES.MUSIC,
            id: extractEditIdFromType(EDIT_TYPES.MUSIC, editIds),
          })
            ? "current"
            : ""
        }
        `}
      ></mark>
      <mark
        data-edit-id={extractEditIdFromType(EDIT_TYPES.GRAPHIC, editIds)}
        className={`inline-edit ${EDIT_TYPES.GRAPHIC} 
        ${
          isCurrentEdit({
            type: EDIT_TYPES.GRAPHIC,
            id: extractEditIdFromType(EDIT_TYPES.GRAPHIC, editIds),
          })
            ? "current"
            : ""
        }
        `}
      ></mark>
      <mark
        data-edit-id={extractEditIdFromType(EDIT_TYPES.BROLL, editIds)}
        className={`inline-edit ${EDIT_TYPES.BROLL} 
        ${
          isCurrentEdit({
            type: EDIT_TYPES.BROLL,
            id: extractEditIdFromType(EDIT_TYPES.BROLL, editIds),
          })
            ? "current"
            : ""
        }
        `}
      ></mark>
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
