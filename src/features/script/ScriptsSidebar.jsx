import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { HiMiniXMark } from "react-icons/hi2";

import { useScripts } from "./useScripts";
import { formatDate } from "../../utils/dateUtils";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useCreateScript } from "./useCreateScript";
import Loader from "../../ui/Loader";
import { useDeleteScript } from "./useDeleteScript";

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
  const { scripts, error, isLoading } = useScripts();
  const { createScript, isCreating } = useCreateScript();

  const scriptsByDate = scripts
    ? [...scripts]?.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
    : [];

  function handleCreateScript() {
    createScript({ title: "Nuevo guión", content: "" });
  }

  return (
    <StyledScriptsSidebar>
      <h2>Tus guiones</h2>
      <Button disabled={isCreating} type="primary" onClick={handleCreateScript}>
        + Nuevo guión
      </Button>

      {isLoading && <Loader className="loader" type="spinner" />}
      {error && <p>Error loading scripts</p>}

      {scriptsByDate &&
        scriptsByDate.map((script) => (
          <ScriptItem key={script.id} script={script} />
        ))}
    </StyledScriptsSidebar>
  );
}

//////////////////////////
// ScriptItem component

const DeleteButton = styled(Button)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: 0.3rem;
  border-radius: var(--border-radius-s1);

  color: var(--color-grey-s1);

  &:hover {
    background-color: var(--color-error);
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

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

  ${(props) => props.isActive && activeScriptStyle}

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

  // Reduce content to 10 words
  const content = script.content
    ? script.content.split(" ").slice(0, 10).join(" ") + "..."
    : "Aún no hay contenido";

  function handleDeleteScript(e) {
    e.stopPropagation();

    deleteScript(script.id);
  }

  return (
    <StyledScriptItem
      isActive={isActive}
      onClick={() => navigate(`/app/editor/${script.id}`)}
    >
      <DeleteButton disabled={isDeleting} onClick={handleDeleteScript}>
        <HiMiniXMark />
      </DeleteButton>
      <h3>{script.title}</h3>
      <p>{content}</p>
      <span>{formatDate(script.created_at)}</span>
    </StyledScriptItem>
  );
}

export default ScriptsSidebar;
