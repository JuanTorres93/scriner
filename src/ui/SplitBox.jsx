import styled from "styled-components";

const StyledSplitBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 50rem;
  align-items: center;
  /* justify-items: center; */
  border-radius: var(--border-radius-l1);
  box-shadow: var(--box-shadow-split-box);
  background-color: var(--color-grey-t1);
  overflow: hidden;

  & img {
    object-fit: contain;
    object-position: center;
  }
`;

function SplitBox({ child1, child2 }) {
  return (
    <StyledSplitBox>
      {child1}
      {child2}
    </StyledSplitBox>
  );
}

export default SplitBox;
