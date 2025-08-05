import styled from "styled-components";

import Edit from "./Edit";
import { useCurrentEdits } from "./CurrentEditsContext";

const StyledEditList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 2rem;
  overflow-y: scroll;
  overflow-x: visible !important;
`;

function EditList({ edits }) {
  const { currentEditsIds } = useCurrentEdits();

  let currentEditId = null;

  edits.forEach((edit) => {
    if (edit.id === currentEditsIds[edit.type]) {
      currentEditId = edit.id;
    }
  });

  const currentEdit = edits.find((edit) => edit.id === currentEditId);
  const restEdits = edits.filter((edit) => edit.id !== currentEditId);

  return (
    <StyledEditList>
      {currentEdit && (
        <Edit key={`edit-${currentEdit.id}`} edit={currentEdit} />
      )}
      {restEdits.map((edit, index) => (
        <Edit key={index} edit={edit} />
      ))}
    </StyledEditList>
  );
}

export default EditList;
