import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    // Font sizes
    --font-size-s3: 0.92rem;   /* 3 steps down */
    --font-size-s2: 1.15rem;   /* 2 steps down */
    --font-size-s1: 1.44rem;   /* 1 step down */
    --font-size-base: 1.8rem;  /* base */
    --font-size-b1: 2.25rem;    /* 1 step up */
    --font-size-b2: 2.81rem;    /* 2 steps up */
    --font-size-b3: 3.52rem;    /* 3 steps up */

    // Font weights
    --font-weight-thinest: 400;
    // TODO add more weights

    // TODO change color if needed
    --color-text: #444;
  }

  /* Basix reset */
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;

    /* 
      Inherit box-sizing from parent, which will the the value
      defined in the body element
      */

    box-sizing: inherit;
    /* TODO: uncomment if needed: Creating animations for dark mode */
    /* transition: background-color 0.3s, border 0.3s; */
  }

  html {
    // Percentage of user's default font size
    // By default, browsers use 16px
    // This sets the base font size to 10px, allowing rem units to be easier
    // to calculate (1rem = 10px)
    font-size: 62.5%;

    font-family: "Work Sans", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;

    color: var(--color-text);
  }

  body {
    box-sizing: border-box;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-thinest);

    // TODO change if needed
    line-height: 1.5;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  *:disabled {
    cursor: not-allowed;
  }
    
  img {
    max-width: 100%;
  }

  // Include more global styles here
`;

export default GlobalStyles;
