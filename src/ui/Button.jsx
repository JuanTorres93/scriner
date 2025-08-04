import styled, { css } from "styled-components";

const variant = {
  padding: css`
    padding: 0.5rem 1rem;
  `,
  activeHoverElement: css`
    // Add a svg before element with a diagonal line indicating it's going to remove it
    position: relative;

    // Line
    &::before {
      content: "";
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 80%;
      height: 80%;
      border-top: 2px solid var(--color-grey-s2);
      transform: translate(-20%, 45%) rotate(45deg);
    }

    // Background line to add the effect of "disrrupting" the icon
    &::after {
      content: "";
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 80%;
      height: 80%;
      border-top: 6px solid var(--color-grey-t2);
      transform: translate(-13%, 45%) rotate(45deg);
    }

    &:hover {
      &::after {
        border-color: var(--color-grey);
      }
    }
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
  hoverbar: css`
    background-color: var(--color-grey-t2);
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;

    &:hover {
      background-color: var(--color-grey);
    }

    &:disabled {
      background-color: var(--color-grey);
      color: var(--color-grey-s2);
    }

    svg {
      margin: auto;
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
  const isHoverbar = props.type === "hoverbar";

  return (
    <StyledButton
      {...props}
      type={isDisabled && !isHoverbar ? "disabled" : props.type}
      onClick={isDisabled ? null : props.onClick}
    >
      {props.children}
    </StyledButton>
  );
}

export default Button;
