import styled, { css } from 'styled-components';

const EditListTitleStyled = styled.h2`
  text-align: center;
`;

const SpanCurrentDone = styled.span`
  color: var(--color-grey-s1);
`;

const SpanCountAllDone = styled.span`
  ${(props) =>
    props['data-all-completed'] &&
    css`
      &,
      & > * {
        color: var(--color-primary);
      }
    `}
`;

function EditListTitle({ title, edits, className }) {
  const hasEdits = edits && edits.length > 0;
  const doneEditsCount = edits?.filter((edit) => edit.isDone).length;
  const hasDoneEdits = doneEditsCount > 0;
  const allEditsDone = hasEdits && doneEditsCount === edits.length;

  return (
    <EditListTitleStyled className={className}>
      {/* {allEditsDone && '🏅 '} */}
      {/* {allEditsDone && '🏆 '} */}
      {allEditsDone && '💪 '}
      {title}{' '}
      {hasEdits && (
        <SpanCountAllDone data-all-completed={allEditsDone}>
          (
          <SpanCurrentDone>
            {hasDoneEdits && `${doneEditsCount}/`}
          </SpanCurrentDone>
          {edits?.length})
        </SpanCountAllDone>
      )}
    </EditListTitleStyled>
  );
}

export default EditListTitle;
