import styled from "styled-components";
import Edit from "./Edit";
import { useCurrentEdits } from "./CurrentEditsContext";
import { useEffect, useRef } from "react";

const StyledEditList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 2rem;
  overflow-y: scroll;
  overflow-x: visible !important;
`;

function EditList({ edits, className }) {
  const { currentEditsIds } = useCurrentEdits();

  // Ref para la lista y para el primer Edit
  const listRef = useRef();

  let currentEditId = null;
  edits.forEach((edit) => {
    if (edit.id === currentEditsIds[edit.type]) {
      currentEditId = edit.id;
    }
  });

  const currentEdit = edits.find((edit) => edit.id === currentEditId);
  const restEdits = edits.filter((edit) => edit.id !== currentEditId);

  // Scroll al principio y focus al primer Edit cuando cambie currentEditsIds
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [currentEditsIds]);

  return (
    <StyledEditList className={className} ref={listRef}>
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
