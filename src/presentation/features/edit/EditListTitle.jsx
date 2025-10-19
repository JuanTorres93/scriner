import styled from 'styled-components';

const SpanCurrentDone = styled.span`
  color: var(--color-grey-s1);
`;

function EditListTitle({ title, edits, className }) {
  const hasEdits = edits && edits.length > 0;
  const doneEditsCount = edits?.filter((edit) => edit.isDone).length;
  const hasDoneEdits = doneEditsCount > 0;

  return (
    <h2 className={className}>
      {title}{' '}
      {hasEdits && (
        <span>
          (
          <SpanCurrentDone>
            {hasDoneEdits && `${doneEditsCount}/`}
          </SpanCurrentDone>
          {edits?.length})
        </span>
      )}
    </h2>
  );
}

export default EditListTitle;
