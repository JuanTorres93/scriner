import { createGlobalStyle } from 'styled-components';
import { breakpoints } from './breakpoints';

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
    --font-size-b4: 4.42rem;    /* 4 steps up */
    --font-size-b5: 5.53rem;    /* 5 steps up */
    --font-size-b6: 6.91rem;    /* 6 steps up */

    // Font weights
    --font-weight-thinest: 400;
    --font-weight-medium: 500;
    // TODO add more weights

    // Colors
    // Open colors
    --color-primary-t2: #ffe8cc;
    --color-primary-t1: #ffc078;
    --color-primary: #ff922b;
    --color-primary-s1: #f76707;
    --color-primary-s2: #d9480f;

    --color-grey-t3: #f8f9fa;
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
    --color-error-s1: #d93c3c;


    --color-warning: #ffd166; 

    --color-text: var(--color-grey-s1);

    /* MÚSICA – lavanda suave */
    --color-music: #d8c9ff;
    --color-music-t1: #f4f0ff;
    --color-music-s1: #9b5de5;

    /* --color-sfx: #ffe3a3; */
    /* --color-sfx-t1: #fff8e1; */
    /* --color-sfx-s1: #e6b800; */
    --color-sfx: #ffcc66;  
    --color-sfx-t1: #fff4cc; 
    --color-sfx-s1: #e6a800; 


    /* GRÁFICOS – rosa pastel */
    --color-emotion: #ffb3d9;
    --color-emotion-t1: #ffe6f3;
    --color-emotion-s1: #e85ca2;

    /* VFX – azul suave */
    --color-vfx: #a3c9ff;
    --color-vfx-t1: #e0f0ff;
    --color-vfx-s1: #4f83ff;

    /* B-ROLL – verde menta suave */
    --color-broll: #a3f5df;
    --color-broll-t1: #e0fff7;
    --color-broll-s1: #00bfa5;


    --backdrop-color: rgba(255, 255, 255, 0.1);

    --box-shadow-split-box: 0 1rem 2rem rgba(0, 0, 0, 0.2);

    // Border radius
    --border-radius-s1: 0.5rem;
    --border-radius: 1rem;
    --border-radius-l1: 1.5rem;


    // breakpoints are defined in breakpoint.js because they cannot be used as CSS variables

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

    @media (max-width: ${breakpoints.reduceFont}) {
      font-size: 56.25%; // 9px
    }
  }

  body {
    box-sizing: border-box;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-thinest);

    // TODO change if needed
    line-height: 1.5;
  }

  ::selection {
    background-color: var(--color-primary);
    color: white;
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

  .inline-edit {
    background-color: transparent;
    font-weight: var(--font-weight-thinest);
  }

  // 5px is the height of the inline edit marks
  // and 10px is the space between them
  .inline-edit-sfx {
    border-bottom: 5px solid var(--color-sfx);
  }

  .inline-edit-vfx {
    border-top: 5px solid var(--color-vfx);
  }

  .inline-edit-emotion {
    border-top: 5px solid var(--color-emotion);
    padding-top: 10px;
  }

  .inline-edit-broll {
    border-top: 5px solid var(--color-broll);
    padding-top: 20px;
  }

  .inline-edit-music {
    background-color: lightgray;
  }

`;

export default GlobalStyles;
