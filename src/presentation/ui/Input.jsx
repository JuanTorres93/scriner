import styled, { css } from "styled-components";

const variant = {
  padding: css`
    padding: 0.5rem 1rem;
  `,
};

const types = {
  plain: css`
    padding: 0 !important;
    margin: 0 !important;
    background-color: transparent;
    color: inherit;

    &:focus {
      background-color: var(--color-grey-t3);
    }
  `,
};

const Input = styled.input`
  border-radius: var(--border-radius);
  border: none;
  outline: none;

  ${(props) => types[props.type || "primary"]}
  ${(props) => variant[props.variant || "padding"]}
`;

export default Input;
