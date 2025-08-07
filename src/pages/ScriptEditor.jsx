import React, { useEffect, useState } from "react";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import EditList from "../features/edit/EditList";
import Script from "../features/script/Script";
import Loader from "../ui/Loader";
import Input from "../ui/Input";

import { useScript } from "../features/script/useScript";
import { useEdits } from "../features/edit/hooks/useEdits";
import { useUpdateScript } from "../features/script/useUpdateScript";
import { resetEditorContent } from "../utils/slateUtils";
import { breakpoints } from "../styles/breakpoints";

const StyledScriptEditor = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 0.3fr 0.3fr minmax(40rem, 1fr) 0.3fr 0.3fr 0.3fr;
  grid-template-rows: min-content 1fr;
  gap: 2rem;
  overflow: scroll;
  padding: 2rem;

  h2,
  input {
    font-size: var(--font-size-regular);
    font-weight: var(--font-weight-medium);
    color: var(--color-grey-s2);
    align-self: flex-start;
  }

  h2 {
    text-transform: uppercase;
  }

  .loader {
    margin-top: 10rem;
    align-self: start;
  }

  @media screen and (max-width: ${breakpoints.smallColumns}) {
    grid-template-columns: 1.5fr 1fr 1fr;
    grid-template-rows: min-content 1fr min-content 1fr min-content 1fr;

    .title-music,
    .content-music {
      grid-column: 2 / 3;
    }
    .content-music {
      grid-row: 2 / 3;
    }

    .title-sfx,
    .content-sfx {
      grid-column: 3 / 4;
    }
    .content-sfx {
      grid-row: 2 / 3;
    }

    .title-script,
    .content-script {
      grid-column: 1 / 2;
    }
    .title-script {
      grid-row: 1 / 2;
    }
    .content-script {
      grid-row: 2 / -1;
    }

    .title-vfx {
      grid-column: 3 / 4;
      grid-row: 3 / 4;
    }
    .content-vfx {
    }

    .title-graphic {
      grid-column: 2 / 3;
      grid-row: 3 / 4;
    }
    .content-graphic {
    }

    .title-broll,
    .content-broll {
      grid-column: 2 / 3;
    }
    .title-broll {
      grid-row: 5 / 6;
    }
    .content-broll {
    }
  }
`;

function ScriptEditor() {
  const [editor] = useState(() => withReact(createEditor()));

  const { scriptId } = useParams();
  const {
    script,
    isLoading: isLoadingScript,
    error: scriptError,
  } = useScript(scriptId);
  const { updateScript, isUpdating } = useUpdateScript();
  const { edits, isLoading: isLoadingEdits, error: editsError } = useEdits();

  const sfxEdits = edits?.filter((edit) => edit.type === "sfx");
  const vfxEdits = edits?.filter((edit) => edit.type === "vfx");
  const graphicEdits = edits?.filter((edit) => edit.type === "graphic");
  const brollEdits = edits?.filter((edit) => edit.type === "broll");
  const musicEdits = edits?.filter((edit) => edit.type === "music");

  function handleUpdateScriptTitle(newTitle) {
    if (isUpdating || !newTitle) return;

    if (newTitle === script?.title) return;

    updateScript({ id: script?.id, data: { title: newTitle } });
  }

  function handleTitleBlur(e) {
    handleUpdateScriptTitle(e.target.value);
    // Move cursor to the start of the input
    e.target.setSelectionRange(0, 0);
  }

  const initialValue =
    JSON.parse(script?.content || "[]").length > 0
      ? JSON.parse(script?.content)
      : [
          {
            type: "paragraph",
            children: [{ text: "Pega tu guion aquí" }],
          },
        ];

  useEffect(() => {
    if (script?.content) {
      resetEditorContent(editor, script.content);
    }
  }, [script?.content, editor, scriptId]);

  return (
    <StyledScriptEditor>
      <Slate
        // key={`slate-${script?.id}`}
        editor={editor}
        initialValue={initialValue}
      >
        <>
          <h2 className="title-music">Música</h2>
          <h2 className="title-sfx">SFX</h2>
          <Input
            className="title-script"
            key={script?.id}
            type="plain"
            defaultValue={script?.title}
            placeholder="Nombre del guion"
            onBlur={handleTitleBlur}
          />
          <h2 className="title-vfx">VFX</h2>
          <h2 className="title-graphic">Gráficos</h2>
          <h2 className="title-broll">B-Roll</h2>

          {/* Music edits */}
          {isLoadingEdits ? (
            <Loader
              className="loader content-music"
              type="spinner"
              size="5rem"
              cssVarColor="--color-primary-t1"
            />
          ) : (
            <EditList className="content-music" edits={musicEdits} />
          )}

          {/* SFX edits */}
          {isLoadingEdits ? (
            <Loader
              className="loader content-sfx"
              type="spinner"
              size="5rem"
              cssVarColor="--color-primary-t1"
            />
          ) : (
            <EditList className="content-sfx" edits={sfxEdits} />
          )}

          {/* Script */}
          {isLoadingScript ? (
            <Loader
              className="loader content-script"
              type="spinner"
              size="10rem"
              cssVarColor="--color-primary-t1"
            />
          ) : (
            <Script className="content-script" script={script} />
          )}
          {/* VFX edits */}
          {isLoadingEdits ? (
            <Loader
              className="loader content-vfx"
              type="spinner"
              size="5rem"
              cssVarColor="--color-primary-t1"
            />
          ) : (
            <EditList className="content-vfx" edits={vfxEdits} />
          )}

          {/* Graphic edits */}
          {isLoadingEdits ? (
            <Loader
              className="loader content-graphic"
              type="spinner"
              size="5rem"
              cssVarColor="--color-primary-t1"
            />
          ) : (
            <EditList className="content-graphic" edits={graphicEdits} />
          )}

          {/* B-Roll edits */}
          {isLoadingEdits ? (
            <Loader
              className="loader content-broll"
              type="spinner"
              size="5rem"
              cssVarColor="--color-primary-t1"
            />
          ) : (
            <EditList className="content-broll" edits={brollEdits} />
          )}
        </>
      </Slate>
    </StyledScriptEditor>
  );
}

export default ScriptEditor;
