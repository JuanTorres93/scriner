import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { HiMiniXMark } from 'react-icons/hi2';

import { useUser } from '../../features/authentication/hooks/useUser';
import { useScripts } from './useScripts';
import { formatDate } from '../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import { useCreateScript } from './useCreateScript';
import Loader from '../../ui/Loader';
import { useDeleteScript } from './useDeleteScript';
import { htmlToText } from '../../utils/htmlUtils';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Logout from '../authentication/Logout';

const StyledScriptsSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: var(--color-grey-t3);
  border-right: 1px solid var(--color-grey-t1);
  height: 100vh;
  overflow-y: auto;
  gap: 1rem;

  h2 {
    text-align: center;
    text-transform: uppercase;
    color: var(--color-grey-s1);
    font-size: var(--font-size-b1);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.1rem;
    margin-bottom: 1rem;
  }

  .loader {
    margin-top: 4rem;
  }

  button {
    margin-bottom: 0.75rem;
  }
`;

function ScriptsSidebar() {
  const { user } = useUser();
  const { scripts, error, isLoading } = useScripts(user.id);
  const { createScript, isCreating } = useCreateScript();

  const scriptsByDate = scripts
    ? [...scripts]?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  function handleCreateScript() {
    createScript({ title: 'Nuevo guión', content: '', user_id: user.id });
  }

  return (
    <StyledScriptsSidebar>
      <Logout />
      <h2>Tus guiones</h2>
      <Button disabled={isCreating} type="primary" onClick={handleCreateScript}>
        + Nuevo guión
      </Button>

      {isLoading && <Loader className="loader" type="spinner" />}
      {error && <p>Error al cargar los guiones</p>}

      {scriptsByDate?.length > 0 &&
        scriptsByDate.map((script) => (
          <ScriptItem key={script.id} script={script} />
        ))}

      {scriptsByDate?.length === 0 && !isLoading && <p>No tienes guiones</p>}
    </StyledScriptsSidebar>
  );
}

//////////////////////////
// ScriptItem component

const activeScriptStyle = css`
  background-color: var(--color-grey-s1);
  color: var(--color-grey-t2);
  box-shadow: 0 0 1rem
    color-mix(in srgb, var(--color-primary-t1) 30%, transparent);

  button {
    color: var(--color-grey-t3);
  }
`;

const StyledScriptItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-s1);
  cursor: pointer;
  transition: all 0.3s ease;

  background-color: var(--color-grey-t1);
  border-radius: var(--border-radius);
  padding: 1rem;

  ${(props) => props.$isActive && activeScriptStyle}

  &:hover {
    ${activeScriptStyle}
  }

  span {
    font-style: italic;
    margin-top: 0.5rem;
    margin-left: auto;
  }
`;

function ScriptItem({ script }) {
  const navigate = useNavigate();
  const { deleteScript, isDeleting } = useDeleteScript();
  const { scriptId } = useParams();
  const isActive = +scriptId === script.id;

  const rawContent = JSON.parse(script?.content || '{}');

  // TODO Extract more text from nodes
  const text = rawContent[0]?.children?.[0]?.text || '';

  const content = htmlToText(text).split(' ').slice(0, 10).join(' ') + '...';

  function handleDeleteScript(e) {
    e.stopPropagation();

    deleteScript(script.id);
  }

  return (
    <StyledScriptItem
      $isActive={isActive}
      onClick={() => navigate(`/app/editor/${script.id}`)}
    >
      <Modal>
        <Modal.Open opens="deleteScript">
          <Button type="delete" disabled={isDeleting}>
            <HiMiniXMark />
          </Button>
        </Modal.Open>

        <Modal.Window name="deleteScript">
          <ConfirmDelete
            resourceType="guion"
            resourceName={script.title}
            disabled={isDeleting}
            onConfirm={handleDeleteScript}
          />
        </Modal.Window>
      </Modal>
      <h3>{script.title}</h3>
      <p>{content}</p>
      <span>{formatDate(script.createdAt)}</span>
    </StyledScriptItem>
  );
}

export default ScriptsSidebar;
