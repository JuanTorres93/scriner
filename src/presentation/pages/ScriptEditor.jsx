import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Slate, withReact } from 'slate-react';
import styled from 'styled-components';

import SEO from '../../seo/SEO';
import EditList from '../features/edit/EditList';
import Script from '../features/script/Script';
import Input from '../ui/Input';
import Loader from '../ui/Loader';

import { useEdits } from '../features/edit/hooks/useEdits';
import { useScript } from '../features/script/useScript';
import { useUpdateScript } from '../features/script/useUpdateScript';
import { useDebounce } from '../hooks/useDebounce';
import { breakpoints } from '../styles/breakpoints';
import { handleUpdateContent, resetEditorContent } from '../utils/slateUtils';
import { withHistory } from 'slate-history';
import { createEditor } from 'slate';

const StyledScriptEditor = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 0.3fr 0.3fr minmax(40rem, 1fr) 0.3fr 0.3fr 0.3fr;
  grid-template-rows: min-content 1fr;
  gap: 2rem;
  overflow: hidden;
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

    h2 {
      text-align: center;
    }

    .title-emotion,
    .content-emotion {
      grid-column: 2 / 3;
    }
    .content-emotion {
      grid-row: 2 / 3;
    }
    .title-emotion {
      grid-row: 1 / 2;
    }

    .title-music,
    .content-music {
      grid-column: 3 / 4;
    }
    .content-music {
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

    .title-sfx {
      grid-column: 2 / 3;
      grid-row: 3 / 4;
    }
    .content-sfx {
    }

    .title-vfx {
      grid-column: 3 / 4;
      grid-row: 3 / 4;
    }
    .content-vfx {
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
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const navigate = useNavigate();
  const debouncedHandleTitleBlur = useDebounce(handleTitleBlur);
  const debouncedHandleUpdateContent = useDebounce(handleUpdateContent, 500);

  const { scriptId } = useParams();
  const {
    script,
    isLoading: isLoadingScript,
    error: scriptError,
  } = useScript(scriptId);
  const { updateScript, isUpdating } = useUpdateScript();
  const {
    edits,
    isLoading: isLoadingEdits,
    error: editsError,
  } = useEdits(scriptId);

  const sfxEdits = edits?.filter((edit) => edit.type === 'sfx');
  const vfxEdits = edits?.filter((edit) => edit.type === 'vfx');
  const emotionEdits = edits?.filter((edit) => edit.type === 'emotion');
  const brollEdits = edits?.filter((edit) => edit.type === 'broll');
  const musicEdits = edits?.filter((edit) => edit.type === 'music');

  useEffect(() => {
    if (script?.content && Number(scriptId) !== script?.id) {
      resetEditorContent(editor, script.content, scriptId);
    }
  }, [script?.content, editor, scriptId, script?.id]);

  // TODO Change and go to NOT FOUND PAGE
  if (scriptError?.code === 'PGRST116') navigate('/app', { replace: true });

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
    JSON.parse(script?.content || '[]').length > 0
      ? JSON.parse(script?.content)
      : [
          {
            type: 'paragraph',
            children: [{ text: 'Pega tu guion aquí' }],
          },
        ];

  return (
    <>
      <SEO
        title="Editor — EditorMind"
        description="Edita tus guiones."
        robots="noindex,nofollow"
      />
      <StyledScriptEditor>
        <Slate
          key={`slate-${script?.id}`}
          editor={editor}
          // onChange does not work in Editable Slate component
          onChange={() =>
            debouncedHandleUpdateContent({
              editor,
              script,
              isUpdating,
              updateScript,
            })
          }
          initialValue={initialValue}
        >
          <>
            <h2 className="title-music">
              Música{' '}
              {musicEdits?.length > 0 && <span>({musicEdits?.length})</span>}
            </h2>
            <h2 className="title-sfx">
              SFX {sfxEdits?.length > 0 && <span>({sfxEdits?.length})</span>}
            </h2>
            <Input
              className="title-script"
              key={`script-title-${script?.id}`}
              type="plain"
              defaultValue={script?.title}
              placeholder="Nombre del guion"
              onChange={debouncedHandleTitleBlur}
              onBlur={handleTitleBlur}
            />
            <h2 className="title-emotion">
              Emoción{' '}
              {emotionEdits?.length > 0 && (
                <span>({emotionEdits?.length})</span>
              )}
            </h2>
            <h2 className="title-vfx">
              VFX {vfxEdits?.length > 0 && <span>({vfxEdits?.length})</span>}
            </h2>
            <h2 className="title-broll">
              B-Roll{' '}
              {brollEdits?.length > 0 && <span>({brollEdits?.length})</span>}
            </h2>

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
            {isLoadingScript || isLoadingEdits ? (
              <Loader
                className="loader content-script"
                type="spinner"
                size="10rem"
                cssVarColor="--color-primary-t1"
              />
            ) : (
              <Script
                key={`script-${script.id}`}
                className="content-script"
                script={script}
              />
            )}
            {/* emotion edits */}
            {isLoadingEdits ? (
              <Loader
                className="loader content-emotion"
                type="spinner"
                size="5rem"
                cssVarColor="--color-primary-t1"
              />
            ) : (
              <EditList className="content-emotion" edits={emotionEdits} />
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
    </>
  );
}

export default ScriptEditor;
