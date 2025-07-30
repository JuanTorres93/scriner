import styled, { css } from "styled-components";

const variant = {
  padding: css`
    padding: 0.5rem 1rem;
  `,
};

const types = {
  primary: css`
    background-color: var(--color-primary);
    color: var(--color-grey-t2);

    &:hover {
      background-color: var(--color-primary-s1);
    }
  `,
  disabled: css`
    background-color: var(--color-grey-t1);
    color: var(--color-grey-s1);
    cursor: not-allowed;
  `,
};

const StyledButton = styled.button`
  border-radius: var(--border-radius);
  border: none;
  box-shadow: var(--shadow-sm);

  ${(props) => types[props.type || "primary"]}
  ${(props) => variant[props.variant || "padding"]}
`;

function Button({ ...props }) {
  const isDisabled = props.disabled;

  return (
    <StyledButton
      {...props}
      type={isDisabled ? "disabled" : props.type}
      onClick={isDisabled ? null : props.onClick}
    >
      {props.children}
    </StyledButton>
  );
}

export default Button;
