import styled from "styled-components";

import EditList from "../features/edit/EditList";
import Script from "../features/script/Script";

import { useParams } from "react-router-dom";
import { useScript } from "../features/script/useScript";
import Loader from "../ui/Loader";

const StyledScriptEditor = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 0.3fr 0.3fr minmax(40rem, 1fr) 0.3fr 0.3fr 0.3fr;
  grid-template-rows: min-content 1fr;
  gap: 2rem;
  overflow: scroll;
  padding: 2rem;

  h2 {
    font-size: var(--font-size-regular);
    font-weight: var(--font-weight-medium);
    color: var(--color-grey-s2);
    text-transform: uppercase;
  }

  .loader {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }
`;

function ScriptEditor() {
  const { scriptId } = useParams();
  const { script, isLoading, error } = useScript(scriptId);

  if (error) return <div>Error loading scripts</div>;

  const initialContent = script?.content || "Tu nuevo guion aquí...";

  return (
    <StyledScriptEditor>
      {isLoading && (
        <Loader
          className="loader"
          type="spinner"
          size="10rem"
          cssVarColor="--color-primary-t1"
        />
      )}
      {!isLoading && (
        <>
          <h2>Música</h2>
          <h2>SFX</h2>
          <h2>Guión</h2>
          <h2>VFX</h2>
          <h2>Gráficos</h2>
          <h2>B-Roll</h2>
          <EditList title="MUSIC" />
          <EditList title="SFX" />
          <Script initialContent={initialContent} />
          <EditList title="VFX" />
          <EditList title="GRAPHICS" />
          <EditList title="B-ROLL" />
        </>
      )}
    </StyledScriptEditor>
  );
}

export default ScriptEditor;
