import styled from 'styled-components';
import Section from './Section';
import Button from '../../ui/Button';
import { Link } from 'react-router-dom';

const ResponseSection = styled(Section)`
  background-color: var(--color-grey-t2);
  padding: 6rem 2rem;

  h2 {
    font-size: var(--font-size-b3);
    color: var(--color-text);
    margin-bottom: 1.6rem;
  }

  p {
    font-size: var(--font-size-b1);
    color: var(--color-grey-s2);
    max-width: 50ch;
    margin: 0 auto 4rem;
  }
`;

function Response() {
  return (
    <ResponseSection
      id="response"
      sectionName="Haz vídeos más rápidos, claros y creativos"
    >
      <p>
        Empieza hoy mismo a transformar tu proceso de edición con una
        herramienta que te ahorra tiempo y potencia tu creatividad.
      </p>
      <Button as={Link} to="/signup" variant="large">
        🚀 Regístrate gratis
      </Button>
    </ResponseSection>
  );
}

export default Response;
