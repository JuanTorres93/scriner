// DOC more loaders can be found here: https://css-loaders.com/
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";

const loaderPositions = {
  inPlace: css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
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
    background-color: color-mix(
      in srgb,
      var(${(props) => props.$cssVarColor || "--color-grey-s1"}) 30%,
      transparent
    );
  `,
};

const loaderStyles = {
  bars: css`
    &::before {
      position: absolute;
      content: "";
      width: ${(props) => props.size || "50px"};
      aspect-ratio: 1;
      --c: no-repeat
        linear-gradient(
          var(${(props) => props.cssVarColor || "--color-primary"}) 0 0
        );
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
  spinner: css`
    &::before {
      position: absolute;
      content: "";
      width: ${(props) => props.size || "50px"};
      aspect-ratio: 1;
      border-radius: 50%;
      background: radial-gradient(
            farthest-side,
            var(${(props) => props.$cssVarColor || "--color-primary"}) 94%,
            #0000
          )
          top/8px 8px no-repeat,
        conic-gradient(
          #0000 30%,
          var(${(props) => props.$cssVarColor || "--color-primary"})
        );
      -webkit-mask: radial-gradient(
        farthest-side,
        #0000 calc(100% - 8px),
        #000 0
      );
      animation: l13 1s infinite linear;
      @keyframes l13 {
        100% {
          transform: rotate(1turn);
        }
      }
    }
  `,
};

const StyledLoader = styled.div`
  ${(props) => loaderPositions[props.position] || loaderPositions.inPlace}
  ${(props) => loaderStyles[props.type] || loaderStyles.bars}
`;

function Loader({ cssVarColor, ...props }) {
  // Can accept props as:
  // - position: "inPlace" | "wholeScreen"
  // - type: "bars" | "spinner"
  // - size: "50px" | "10rem" (default is "50px")
  // - cssVarColor: "--color-primary" (default is "--color-primary")

  if (props.position === "wholeScreen")
    return createPortal(
      <StyledLoader {...props} $cssVarColor={cssVarColor} />,
      document.body
    );

  return <StyledLoader {...props} $cssVarColor={cssVarColor}></StyledLoader>;
}

export default Loader;
