import styled from "styled-components";

import { useScripts } from "./useScripts";
import { formatDate } from "../../utils/dateUtils";
import { useNavigate } from "react-router-dom";

const StyledScriptsSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: var(--color-grey-t2);
  border-right: 1px solid var(--color-grey-t1);
  height: 100vh;
  overflow-y: auto;
  gap: 1rem;
`;

function ScriptsSidebar() {
  const { scripts, error, isLoading } = useScripts();

  return (
    <StyledScriptsSidebar>
      <h2>Your scripts</h2>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading scripts</p>}
      {scripts &&
        scripts.map((script) => <ScriptItem key={script.id} script={script} />)}
    </StyledScriptsSidebar>
  );
}

const StyledScriptItem = styled.div`
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-s1);
  cursor: pointer;
  transition: all 0.2s ease;

  background-color: var(--color-grey-t1);
  border-radius: 1rem;
  padding: 1rem;

  &:hover {
    background-color: var(--color-grey-s1);
    color: var(--color-grey-t2);
  }

  span {
    font-style: italic;
    margin-top: 0.5rem;
    margin-left: auto;
  }
`;

function ScriptItem({ script }) {
  const navigate = useNavigate();

  // Reduce content to 10 words
  const content = script.content
    ? script.content.split(" ").slice(0, 10).join(" ") + "..."
    : "No content available";

  return (
    <StyledScriptItem onClick={() => navigate(`/app/editor/${script.id}`)}>
      <h3>{script.title}</h3>
      <p>{content}</p>
      <span>{formatDate(script.created_at)}</span>
    </StyledScriptItem>
  );
}

export default ScriptsSidebar;
