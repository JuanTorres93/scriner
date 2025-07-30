import styled from "styled-components";

import EditList from "../features/edit/EditList";
import Script from "../features/script/Script";

import { useParams } from "react-router-dom";
import { useScript } from "../features/script/useScript";

const StyledScriptEditor = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 0.3fr 0.3fr minmax(40rem, 1fr) 0.3fr 0.3fr 0.3fr;
  gap: 2rem;
  overflow: scroll;
`;

function ScriptEditor() {
  const { scriptId } = useParams();
  const { script, isLoading, error } = useScript(scriptId);

  // TODO handle better
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading scripts</div>;

  const initialContent = script?.content;

  return (
    <StyledScriptEditor>
      <EditList title="MUSIC" />
      <EditList title="SFX" />
      {initialContent && <Script initialContent={initialContent} />}
      <EditList title="VFX" />
      <EditList title="GRAPHICS" />
      <EditList title="B-ROLL" />
    </StyledScriptEditor>
  );
}

export default ScriptEditor;
