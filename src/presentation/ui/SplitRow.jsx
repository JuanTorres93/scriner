import styled, { css } from 'styled-components';

const StyledSplitRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  ${(props) =>
    props.firstChildSize &&
    css`
      grid-template-columns:
        ${props.firstChildSize}fr
        ${1 - props.firstChildSize}fr;
    `}
  justify-items: center;
  align-items: center;

  ${(props) =>
    props.spacing &&
    css`
      gap: ${props.spacing};
    `}

  img {
    max-width: 40rem;
    border-radius: 1rem;

    // Is first child
    &:first-child {
      justify-self: end;
    }

    // Is last child
    &:last-child {
      justify-self: start;
    }
  }
`;

function SplitRow({ children, ...props }) {
  return <StyledSplitRow {...props}>{children}</StyledSplitRow>;
}

export default SplitRow;
