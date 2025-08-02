import styled, { css } from "styled-components";

import { EDIT_TYPES } from "./editTypes";

const markHeightPx = 6;
const spaceBetweenMarksPx = 12;

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
    opacity: 0.6;
    transition: all 0.2s ease;

    &:hover {
      opacity: 1;
      transform: scaleY(1.2);
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
        background-color: lightcoral;
      }
    `}
`;

function InlineEdit(props) {
  function handleClick(e) {
    e.preventDefault();

    if (!props.editIds || props.editIds.length === 0) return;

    // TODO DELETE THESE DEBUG LOGS
    console.log("JSON.stringify(props.editIds)");
    console.log(JSON.stringify(props.editIds));
  }

  return (
    // span because all leaves MUST be an inline element.
    <StyledSpan onClick={handleClick} {...props.attributes} leaf={props.leaf}>
      <mark className={`inline-edit ${EDIT_TYPES.VFX}`}></mark>
      <mark className={`inline-edit ${EDIT_TYPES.SFX}`}></mark>
      <mark className={`inline-edit ${EDIT_TYPES.MUSIC}`}></mark>
      <mark className={`inline-edit ${EDIT_TYPES.GRAPHIC}`}></mark>
      <mark className={`inline-edit ${EDIT_TYPES.BROLL}`}></mark>
      <span>{props.children}</span>
    </StyledSpan>
  );
}

export default InlineEdit;
