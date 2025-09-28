import styled from 'styled-components';
import Section from './Section';
import { FaCheck } from 'react-icons/fa6';
import ListItemIcon from '../../ui/ListItemIcon';

const OfferSection = styled(Section)`
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;

  ul {
    display: flex;
    max-width: 34ch;
    margin: 0 auto;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    list-style: none;
    gap: 0.6rem;

    li {
      text-align: left;
      svg {
        fill: var(--color-primary-s1);
      }
    }
  }

  .highlight {
    margin-top: 6rem;
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-b1);
    color: var(--color-grey-s1);

    strong {
      color: var(--color-primary-s2);
    }

    /* First paragraph */
    p:first-of-type {
      margin-bottom: 2rem;
    }

    .comparison {
      margin-top: 1rem;
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-regular);
    }
  }
`;

function Offer() {
  return (
    <OfferSection id="offer" sectionName="Editormind te ofrece:">
      <ul>
        <ListItemIcon icon={<FaCheck />}>Menos tiempo de edición</ListItemIcon>
        <ListItemIcon icon={<FaCheck />}>Mayor creatividad</ListItemIcon>
        <ListItemIcon icon={<FaCheck />}>
          Vídeos más coherentes y atractivos
        </ListItemIcon>
      </ul>
      <div className="highlight">
        <p>
          Pruébalo <strong>gratis</strong> durante <strong>14 días</strong>.
        </p>
        <p>
          Tras el periodo de prueba, disfruta de todo por{' '}
          <strong>2€/mes</strong>.
        </p>
        <p className="comparison">(Sí, lo que vale un café ☕)</p>
      </div>
    </OfferSection>
  );
}

export default Offer;
