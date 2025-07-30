import { createPortal } from "react-dom";
import styled, { css } from "styled-components";

const loaderPositions = {
  inPlace: css``,
  wholeScreen: css`
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    backdrop-filter: blur(5px);
    background-color: color-mix(in srgb, var(--color-grey-s1) 30%, transparent);
  `,
};

const loaderStyles = {
  bars: css`
    &::before {
      position: absolute;
      content: "";
      width: 45px;
      aspect-ratio: 1;
      --c: no-repeat linear-gradient(var(--color-primary) 0 0);
      background: var(--c) 0% 100%, var(--c) 50% 100%, var(--c) 100% 100%;
      animation: l2 1s infinite linear;

      @keyframes l2 {
        0% {
          background-size: 20% 100%, 20% 100%, 20% 100%;
        }
        20% {
          background-size: 20% 60%, 20% 100%, 20% 100%;
        }
        40% {
          background-size: 20% 80%, 20% 60%, 20% 100%;
        }
        60% {
          background-size: 20% 100%, 20% 80%, 20% 60%;
        }
        80% {
          background-size: 20% 100%, 20% 100%, 20% 80%;
        }
        100% {
          background-size: 20% 100%, 20% 100%, 20% 100%;
        }
      }
    }
  `,
};

const StyledLoader = styled.div`
  ${(props) => loaderPositions[props.position] || loaderPositions.inPlace}
  ${(props) => loaderStyles[props.type] || loaderStyles.bars}
`;

function Loader({ ...props }) {
  if (props.position === "wholeScreen")
    return createPortal(<StyledLoader {...props} />, document.body);

  return <StyledLoader {...props}></StyledLoader>;
}

export default Loader;
