import styled from 'styled-components';
import Section from './Section';
import { FaCheck } from 'react-icons/fa6';
import ListItemIcon from '../../ui/ListItemIcon';

const OfferSection = styled(Section)`
  padding: 4rem 2rem;
  text-align: center;

  ul {
    display: flex;
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
    color: var(--color-primary-s2);
    font-size: var(--font-size-b2);
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
          ¡Y además es <strong>100% gratuita</strong>! Por ahora... 😏
        </p>
      </div>
    </OfferSection>
  );
}

export default Offer;
