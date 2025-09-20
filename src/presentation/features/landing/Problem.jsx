import styled from 'styled-components';
import Section from './Section';
import SplitRow from '../../ui/SplitRow';

import { breakpoints } from '../../styles/breakpoints';

const StyledSection = styled(Section)`
  img {
    max-width: 45rem;
    height: auto;
    margin-bottom: 2rem;

    @media (max-width: ${breakpoints.problem}) {
      max-width: 35rem;
    }
  }

  p {
    max-width: 55ch;
  }

  .problem-content {
    display: flex;
  }

  @media (max-width: ${breakpoints.problem2}) {
    .problem-content {
      flex-direction: column;
      /* align-items: center; */
      /* text-align: center; */
    }
  }
`;

function Problem() {
  return (
    <StyledSection
      id="problem"
      sectionName="¿Por qué no sabes qué hacer en tu editor?"
    >
      <SplitRow className="problem-content" spacing="6rem">
        <img src="problem.png" alt="Un problema de creatividad" />
        <p>
          Crees que te falta creatividad, pero quieres hacer vídeos. Tu proceso
          actual se basa en ver tu vídeo una y otra vez en tu <em>timeline</em>{' '}
          esperando a que te llegue la iluminación para saber qué añadir.
        </p>
      </SplitRow>
    </StyledSection>
  );
}

export default Problem;
