import styled from 'styled-components';
import Button from './Button';

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-s2);
    margin-bottom: 1.2rem;
  }

  & span {
    font-weight: 600;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({
  resourceType,
  onConfirm,
  disabled,
  onCloseModal,
  resourceName,
}) {
  return (
    <StyledConfirmDelete>
      <h3>Borrar {resourceType}</h3>
      <p>
        ¿Estás seguro de que deseas eliminar permanentemente{' '}
        <span>{resourceName ? resourceName : `este ${resourceType}`}</span>?
      </p>

      <p>Esta acción no se puede deshacer.</p>

      <div>
        <Button type="secondary" disabled={disabled} onClick={onCloseModal}>
          Cancelar
        </Button>
        <Button type="danger" disabled={disabled} onClick={onConfirm}>
          Eliminar
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
