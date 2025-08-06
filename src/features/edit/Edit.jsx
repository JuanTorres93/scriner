// TODO Añadir posición del edit en la base de datos?
import styled, { css } from "styled-components";

import { useUpdateEdit } from "./hooks/useUpdateEdit";
import { useDeleteEdit } from "./hooks/useDeleteEdit";
import { useCurrentEdits } from "./CurrentEditsContext";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import { HiMiniXMark } from "react-icons/hi2";
import { useSlate } from "slate-react";

const StyledEdit = styled.div`
  position: relative;
  padding: 1rem;
  border: none;
  border-radius: var(--border-radius-s1);
  cursor: pointer;
  margin: 0 1rem;
  max-height: 20rem;

  /* Color according type */
  ${(props) =>
    props.edit.type === "music" &&
    css`
      background-color: var(--color-music);
    `}

  ${(props) =>
    props.edit.type === "sfx" &&
    css`
      background-color: var(--color-sfx);
    `}

  ${(props) =>
    props.edit.type === "vfx" &&
    css`
      background-color: var(--color-vfx);
    `}

  ${(props) =>
    props.edit.type === "graphic" &&
    css`
      background-color: var(--color-graphic);
    `}

  ${(props) =>
    props.edit.type === "broll" &&
    css`
      background-color: var(--color-broll);
    `}

  &:hover {
    filter: saturate(0.9) brightness(1.1);
  }

  ${(props) =>
    props.isCurrent &&
    css`
      background-color: var(--color-primary);
    `}
`;

function Edit({ edit }) {
  const { isCurrentEdit } = useCurrentEdits();
  const { updateEdit, isUpdating } = useUpdateEdit();
  const { deleteEdit, isDeleting } = useDeleteEdit();
  // const editor = useSlate();

  const isLoading = isUpdating || isDeleting;

  function handleUpdateEdit(event) {
    // TODO IMPORTANT sanitize input
    const newContent = event.target.value;

    if (!edit?.id || !newContent || isLoading) return;
    if (newContent === edit?.content) return;

    updateEdit({
      id: edit?.id,
      data: { content: newContent },
    });
  }

  function handleDeleteEdit() {
    if (!edit?.id || isLoading) return;

    deleteEdit(edit.id);
  }

  return (
    <StyledEdit edit={edit} isCurrent={isCurrentEdit(edit)}>
      <Button type="delete" disabled={isLoading} onClick={handleDeleteEdit}>
        <HiMiniXMark />
      </Button>
      <Textarea
        onBlur={handleUpdateEdit}
        defaultValue={edit.content}
        type="edit"
        variant="none"
      />
    </StyledEdit>
  );
}

export default Edit;
