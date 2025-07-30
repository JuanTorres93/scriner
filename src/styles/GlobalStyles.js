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

    // Colors
    // Open colors
    --color-primary-t2: #ffe8cc;
    --color-primary-t1: #ffc078;
    --color-primary: #ff922b;
    --color-primary-s1: #f76707;
    --color-primary-s2: #d9480f;

    --color-grey-t2: #f1f3f5;
    --color-grey-t1: #dee2e6;
    --color-grey: #adb5bd;
    --color-grey-s1: #495057;
    --color-grey-s2: #343a40;

    // ChatGPT colors
    --color-accent-t1: #e0f7fa; /* Cian muy claro para fondos o chips */
    --color-accent: #38bdf8;   /* Azul cian brillante */
    --color-accent-s1: #0ea5e9; /* Más saturado para hover */


    --color-success-t1: #e3fafc;  /* Muy claro, para fondos de alerta/success */
    --color-success: #5dd39e;     
    --color-success-s1: #1b9c57;  

    --color-error: #ff5252;   

    --color-warning: #ffd166; 

    --color-text: var(--color-grey-s1);

    --color-sfx: var(--color-warning);
    --color-vfx: var(--color-error);
    --color-graphic: var(--color-success-s1);
    --color-broll: var(--color-accent-s1);

    // Border radius
    --border-radius: 1rem;
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
