// TODO Añadir posición del edit en la base de datos para ordenarlos por orden de aparición?
import styled, { css } from 'styled-components';

import { useUpdateEdit } from './hooks/useUpdateEdit';
import { useDeleteEdit } from './hooks/useDeleteEdit';
import { useCurrentEdits } from './CurrentEditsContext';
import Textarea from '../../ui/Textarea';
import Button from '../../ui/Button';
import { HiCheckCircle, HiMiniXCircle, HiTrash } from 'react-icons/hi2';
import { useSlate } from 'slate-react';
import { ScriptActions } from '../script/ScriptActions';
import { useUpdateScript } from '../script/useUpdateScript';
import { useEffect, useRef, useLayoutEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

const StyledEdit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  margin: 0 1rem;
  /* max-height: 20rem; */
  background-color: var(--color-grey-t1);

  transition: all 0.2s ease;

  &:hover {
    ${(props) =>
      !props['data-is-current'] &&
      css`
        background-color: var(--color-grey-t1);
      `}
  }

  .actions-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
  }

  /* Color according type */
  ${(props) =>
    props.edit.type === 'music' &&
    props['data-is-current'] &&
    css`
      background-color: var(--color-music);

      textarea {
        background-color: var(--color-music-t1);
      }
    `}

  ${(props) =>
    props.edit.type === 'sfx' &&
    props['data-is-current'] &&
    css`
      background-color: var(--color-sfx);

      textarea {
        background-color: var(--color-sfx-t1);
      }
    `}

  ${(props) =>
    props.edit.type === 'vfx' &&
    props['data-is-current'] &&
    css`
      background-color: var(--color-vfx);
      textarea {
        background-color: var(--color-vfx-t1);
      }
    `}

  ${(props) =>
    props.edit.type === 'emotion' &&
    props['data-is-current'] &&
    css`
      background-color: var(--color-emotion);

      textarea {
        background-color: var(--color-emotion-t1);
      }
    `}

  ${(props) =>
    props.edit.type === 'broll' &&
    props['data-is-current'] &&
    css`
      background-color: var(--color-broll);

      textarea {
        background-color: var(--color-broll-t1);
      }
    `}

    /* Color for completed state */
  ${(props) =>
    props.edit.isDone &&
    css`
      background-color: var(--color-grey-t2) !important;
      border: 1px solid var(--color-grey-t1) !important;

      textarea {
        background-color: var(--color-grey-t2) !important;
      }
    `}
`;

function Edit({ edit }) {
  const textareaRef = useRef();
  const editor = useSlate();
  const { isCurrentEdit, setCurrentEditsIds } = useCurrentEdits();
  const { updateEdit, isUpdating } = useUpdateEdit();
  const { deleteEdit, isDeleting } = useDeleteEdit();
  const { updateScript, isUpdating: isUpdatingScript } = useUpdateScript();
  const debouncedHandleUpdateEdit = useDebounce(handleUpdateEdit);

  const isCurrent = isCurrentEdit(edit);
  const isLoading = isUpdating || isDeleting || isUpdatingScript;

  function autosize(el) {
    if (!el) return;
    el.style.height = '0px'; // reset for better computation
    el.style.height = el.scrollHeight + 'px';
  }

  // Adjust on mount and when initial content changes (e.g., when selecting another edit)
  useLayoutEffect(() => {
    autosize(textareaRef.current);
  }, [edit?.content]);

  useEffect(() => {
    // Select textarea content on mount to be able to start writing immediately
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select(); // Select all content to be overwritten
      autosize(textareaRef.current);
    }
  }, []);

  function handleUpdateEdit(event) {
    // TODO IMPORTANT sanitize input
    const newContent = event.target.value;

    if (!edit?.id || !newContent || isLoading) return;
    if (newContent === edit?.content) return;

    updateEdit({
      id: edit?.id,
      data: { content: newContent },
    });
  }

  function handleToggleIsDone() {
    if (isLoading) return;

    updateEdit({
      id: edit.id,
      data: { isDone: !edit.isDone },
    });
  }

  function handleDeleteEdit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!edit?.id || isLoading) return;

    deleteEdit(edit.id, {
      onSuccess: (data) => {
        ScriptActions.removeEditMarkByEditId(editor, data.type, data.id);

        // Save the changes to db
        const newContent = JSON.stringify(editor.children);
        if (!editor?.children || newContent === editor?.children) return;

        updateScript({
          id: data?.scriptId,
          data: { content: newContent },
        });
      },
    });
  }

  function handleSetCurrentEdit() {
    if (isCurrent) {
      // remove from current
      return setCurrentEditsIds((prev) => {
        const newIds = { ...prev };
        delete newIds[edit.type];
        return newIds;
      });
    }
    setCurrentEditsIds((prev) => ({ ...prev, [edit.type]: edit.id }));
  }

  return (
    <StyledEdit
      edit={edit}
      data-is-current={isCurrent}
      onClick={handleSetCurrentEdit}
    >
      {isCurrent && (
        <Textarea
          onClick={(e) => e.stopPropagation()}
          ref={textareaRef}
          onChange={debouncedHandleUpdateEdit} // Debounced to avoid excessive calls
          onBlur={handleUpdateEdit}
          onInput={(e) => autosize(e.currentTarget)} // Triggers on every input
          rows={1} // Start with 1 row, will expand as needed
          defaultValue={edit.content}
          type="edit"
          variant="none"
        />
      )}
      {!isCurrent && <p>{edit.content}</p>}

      <div className="actions-box">
        <Button
          type={edit?.isDone ? 'secondary' : 'confirm'}
          disabled={isLoading}
          onClick={handleToggleIsDone}
        >
          {edit?.isDone ? <HiMiniXCircle /> : <HiCheckCircle />}
        </Button>

        <Button type="danger" disabled={isLoading} onClick={handleDeleteEdit}>
          <HiTrash />
        </Button>
      </div>
    </StyledEdit>
  );
}

export default Edit;
