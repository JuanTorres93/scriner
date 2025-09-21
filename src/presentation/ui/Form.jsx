import styled, { css } from 'styled-components';

const StyledForm = styled.form`
  ${(props) =>
    props.type === 'regular' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      /* background-color: var(--color-grey-t1); */
      background-color: transparent;
      /* border: 1px solid var(--color-grey); */
      border-radius: var(--border-radius);
    `}

  ${(props) =>
    props.type === 'modal' &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.6rem;
`;

function Form({ children, ...props }) {
  return (
    <StyledForm {...props} type={props.type || 'regular'}>
      {children}
    </StyledForm>
  );
}

export default Form;
