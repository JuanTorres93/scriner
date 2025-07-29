import styled from "styled-components";

import EditList from "../features/edit/EditList";
import Script from "../features/script/Script";

import { useScripts } from "../features/script/useScripts";

const StyledScriptEditor = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 0.3fr 0.3fr minmax(40rem, 1fr) 0.3fr 0.3fr 0.3fr;
  gap: 2rem;
  overflow: scroll;
`;

function ScriptEditor() {
  const { scripts, isLoading, error } = useScripts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading scripts</div>;

  const initialContent = scripts?.data?.[0]?.content;

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
