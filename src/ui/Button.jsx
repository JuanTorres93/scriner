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
};

const Button = styled.button`
  border-radius: var(--border-radius);
  border: none;
  box-shadow: var(--shadow-sm);

  ${(props) => types[props.type || "primary"]}
  ${(props) => variant[props.variant || "padding"]}
`;

export default Button;
