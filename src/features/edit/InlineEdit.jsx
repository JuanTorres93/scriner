import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";

import { EDIT_TYPES } from "./editTypes";
import { useCurrentEdits } from "./CurrentEditsContext";
import { useEdits } from "./hooks/useEdits";

const BORDER_WIDTH = "0.7rem";
const INCREASED_BORDER_WIDTH = "1.2rem";

export const getBorderByType = (leaf, type) => {
  if (!leaf?.[type]) return "";

  if (leaf[type].isDone) return css`--border-${type}: var(--color-grey);`;

  if (leaf[type].isCurrent) {
    const isBottomBorder = type === EDIT_TYPES.SFX || type === EDIT_TYPES.MUSIC;

    return css`
      ${isBottomBorder
        ? `border-bottom: ${INCREASED_BORDER_WIDTH} solid transparent;`
        : `border-top: ${INCREASED_BORDER_WIDTH} solid transparent;`}
      --border-${type}: var(--color-${type}-s1);
    `;
  }

  // Default border
  return css`
        --border-${type}: var(--color-${type});
      `;
};

export const getEmotionBackground = (leaf) => {
  if (!leaf?.[EDIT_TYPES.EMOTION]) return "";

  if (leaf[EDIT_TYPES.EMOTION].isDone)
    return css`
      --bg-emotion: var(--color-grey);
    `;

  if (leaf[EDIT_TYPES.EMOTION].isCurrent) {
    return css`
      --bg-emotion: var(--color-emotion-s1);
    `;
  }

  // Default background
  return css`
    --bg-emotion: var(--color-emotion);
  `;
};

const StyledSpan = styled.span`
  background-color: transparent;
  border-bottom: ${BORDER_WIDTH} solid transparent;
  border-top: ${BORDER_WIDTH} solid transparent;
  font-weight: var(--font-weight-thinest);
  position: relative;
  padding: 0.2rem 0;
  background-clip: padding-box; // Prevents background from bleeding into the border

  transition: all 0.3s ease;

  &:hover {
    border-bottom: ${INCREASED_BORDER_WIDTH} solid transparent;
    border-top: ${INCREASED_BORDER_WIDTH} solid transparent;
  }

  --border-music: transparent;
  --border-sfx: transparent;
  --border-vfx: transparent;
  --bg-emotion: transparent;
  --border-broll: transparent;

  ${(props) => getBorderByType(props.leaf, EDIT_TYPES.SFX)}
  ${(props) => getBorderByType(props.leaf, EDIT_TYPES.VFX)}
  ${(props) => getEmotionBackground(props.leaf)}
  ${(props) => getBorderByType(props.leaf, EDIT_TYPES.BROLL)}
  ${(props) => getBorderByType(props.leaf, EDIT_TYPES.MUSIC)}

  border-top-color: color-mix(
    in srgb,
    var(--border-vfx) 50%,
    var(--border-broll) 50%
  ) !important;

  border-bottom-color: color-mix(
    in srgb,
    var(--border-music) 50%,
    var(--border-sfx) 50%
  ) !important;

  background-color: color-mix(
    in srgb,
    var(--bg-emotion) 35%,
    transparent 65%
  ) !important;
`;

function InlineEdit({ leaf, ...props }) {
  const { scriptId } = useParams();
  const editIds = props.editIds || [];
  const { setCurrentEditsIds, isCurrentEdit } = useCurrentEdits();
  const { edits } = useEdits(scriptId);

  const newLeaf = { ...leaf };

  // leaf is an object, loop over its keys
  for (const key in newLeaf) {
    if (EDIT_TYPES[key.toUpperCase()]) {
      newLeaf[key].isCurrent = isCurrentEdit({
        type: key,
        id: newLeaf[key].editId,
      });
      newLeaf[key].isDone = edits?.some(
        (edit) => edit.id === newLeaf[key].editId && edit.isDone
      );
    }
  }

  function handleClick(e) {
    e.preventDefault();

    if (!editIds || editIds.length === 0 || !setCurrentEditsIds) return;

    const newCurrentEditsIds = {};
    editIds.forEach((edit) => {
      newCurrentEditsIds[edit.type] = edit.editId;
    });

    // set the current edits in the parent component.
    //setCurrentEditsIds((prevCurrentEdits) => ({
    //  ...prevCurrentEdits,
    //  ...newCurrentEditsIds,
    //}));

    // Don't preserve previous ones. In this way it is easier for the user to keep focus
    // on the working part of the script
    setCurrentEditsIds(newCurrentEditsIds);
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

  return (
    // span because all leaves MUST be an inline element.
    <StyledSpan onClick={handleClick} {...props.attributes} leaf={newLeaf}>
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
