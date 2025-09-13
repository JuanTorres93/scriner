import styled from "styled-components";
import Section from "./Section";

const StyledSection = styled(Section)`
  img {
    max-width: 45rem;
    height: auto;
    margin-bottom: 2rem;
  }

  em {
    display: inline;
    font-style: italic;
    font-weight: var(--font-weight-medium);
    color: var(--color-accent);
  }
`;

function Problem() {
  return (
    <StyledSection id="problem">
      <img src="problem.png" alt="Un problema de creatividad" />
      <p>
        Crees que te falta creatividad, pero tienes un deseo ardiente de hacer
        mejores vídeos. Tu proceso actual se basa en ver tu vídeo una y otra vez
        en tu <em>timeline</em> esperando a que te llegue la iluminación para
        saber qué añadir.
      </p>
    </StyledSection>
  );
}

export default Problem;
