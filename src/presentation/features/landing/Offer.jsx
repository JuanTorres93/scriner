import styled from 'styled-components';
import Section from './Section';

const OfferSection = styled(Section)`
  /* background-color: var(--color-accent-t1); */
  padding: 4rem 2rem;
  text-align: center;

  h3 {
    font-size: var(--font-size-b3);
    color: var(--color-text);
    margin-bottom: 2rem;
  }

  ul {
    list-style: none;
    margin: 0 auto;
    padding: 0;
    display: grid;
    gap: 1rem;
    max-width: 40ch;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: var(--font-size-b1);
    color: var(--color-grey-s2);
    text-align: left;
  }

  li::before {
    content: '✓';
    color: var(--color-primary);
    font-weight: var(--font-weight-bold);
  }

  .highlight {
    margin-top: 2rem;
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary-s2);
    font-size: var(--font-size-b2);
  }
`;

function Offer() {
  return (
    <OfferSection id="offer" sectionName="Con mi herramienta conseguirás">
      <ul>
        <li>Menos tiempo de edición</li>
        <li>Mayor creatividad</li>
        <li>Vídeos más coherentes y atractivos</li>
      </ul>
      <div className="highlight">✨ Y además: ¡Es 100% gratuita!</div>
    </OfferSection>
  );
}

export default Offer;
