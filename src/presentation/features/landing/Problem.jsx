import styled from 'styled-components';
import Section from './Section';
import SplitRow from '../../ui/SplitRow';

const StyledSection = styled(Section)`
  img {
    max-width: 45rem;
    height: auto;
    margin-bottom: 2rem;
  }
`;

function Problem() {
  return (
    // TODO CHANGE SECTION NAME AND STYLING TO MAKE IT DIFFERENT FROM THE AMPLIFY SECTION
    <StyledSection id="problem" sectionName="¿Cuál es el problema?">
      <SplitRow spacing="6rem">
        <img src="problem.png" alt="Un problema de creatividad" />
        <p>
          Crees que te falta creatividad, pero tienes un deseo ardiente de hacer
          mejores vídeos. Tu proceso actual se basa en ver tu vídeo una y otra
          vez en tu <em>timeline</em> esperando a que te llegue la iluminación
          para saber qué añadir.
        </p>
      </SplitRow>
    </StyledSection>
  );
}

export default Problem;
