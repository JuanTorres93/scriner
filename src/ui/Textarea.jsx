import styled, { css } from "styled-components";

const variant = {
  none: css``,
};

const types = {
  edit: css`
    padding: 1rem;
    margin: 0;
    background-color: transparent;
    color: inherit;
    width: 100%;
    height: auto;
    resize: none;
    overflow: hidden;
    min-height: 0;

    &:focus {
      background-color: var(--color-grey-t3);
    }
  `,
};

const Textarea = styled.textarea`
  border-radius: 0.5rem;
  border: none;
  outline: none;

  ${(props) => types[props.type || "edit"]}
  ${(props) => variant[props.variant || "none"]}
`;

export default Textarea;
