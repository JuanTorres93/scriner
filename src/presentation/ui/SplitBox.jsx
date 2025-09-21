import styled from 'styled-components';
import { breakpoints } from '../styles/breakpoints';

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

  &.auth-split-box {
    @media (max-width: ${breakpoints.auth}) {
      grid-template-columns: 1fr 0fr;
    }
  }
`;

function SplitBox({ child1, child2, ...props }) {
  return (
    <StyledSplitBox {...props}>
      {child1}
      {child2}
    </StyledSplitBox>
  );
}

export default SplitBox;
