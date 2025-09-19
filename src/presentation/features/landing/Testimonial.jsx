import Section from './Section';
import styled from 'styled-components';
import ListItemIcon from '../../ui/ListItemIcon';
import { FaCheck } from 'react-icons/fa6';

const TestimonialSection = styled(Section)`
  background-color: var(--color-grey-t2);
`;

const Wrap = styled.div`
  display: grid;
  gap: 8rem;
  margin: 0 auto;
`;

const Quote = styled.figure`
  margin: 0;
  display: grid;
  gap: 1rem;

  blockquote {
    margin: 0;
    font-size: var(--font-size-b4);
    font-style: italic;
    font-weight: 500;
    line-height: 1.5;
    color: var(--color-primary-s2);
  }

  figcaption {
    font-size: var(--font-size-base);
    color: var(--color-grey-s2);
    margin-left: auto;
  }
`;

const Proof = styled.div`
  display: grid;
  gap: 4rem;

  h4 {
    margin: 0;
    margin-bottom: 2rem;
    font-size: var(--font-size-b1);
    color: var(--color-text);
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    list-style: none;
    gap: 0.6rem;

    li svg {
      fill: var(--color-primary-s1);
    }
  }
`;

const Person = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.2rem;
  justify-self: end;

  img {
    max-width: 5.5rem;
    height: auto;
    border-radius: 999px;
    object-fit: cover;
  }

  .name {
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
  }

  .role {
    font-size: var(--font-size-base);
    color: var(--color-grey-s2);
  }
`;

function Testimonial() {
  return (
    <TestimonialSection
      id="testimonial"
      sectionName={
        <Quote>
          <blockquote>
            “La creatividad es inteligencia divirtiéndose.”
          </blockquote>
          <figcaption>— Albert Einstein</figcaption>
        </Quote>
      }
    >
      <Wrap>
        <Proof>
          <div>
            <h4>Lo que he notado desde que uso el guion como GPS</h4>
            <ul>
              <ListItemIcon icon={<FaCheck />}>
                Menos tiempo atascado en la edición
              </ListItemIcon>
              <ListItemIcon icon={<FaCheck />}>
                Claridad sobre la emoción de cada parte
              </ListItemIcon>
              <ListItemIcon icon={<FaCheck />}>
                Edits coherentes con la emoción del momento
              </ListItemIcon>
              <ListItemIcon icon={<FaCheck />}>
                Base sólida para improvisar y ser más creativo
              </ListItemIcon>
            </ul>
          </div>
          <Person>
            <img src="/yo.jpg" alt="" />
            <div>
              <div className="name">Juan T.</div>
              <div className="role">Creador de Editormind</div>
            </div>
          </Person>
        </Proof>
      </Wrap>
    </TestimonialSection>
  );
}

export default Testimonial;
