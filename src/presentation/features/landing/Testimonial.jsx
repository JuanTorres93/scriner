import Section from './Section';
import styled from 'styled-components';

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
    font-size: var(--font-size-b2);
    font-style: italic;
    line-height: 1.5;
    color: var(--color-primary-s2);
  }

  figcaption {
    font-size: var(--font-size-base);
    color: var(--color-grey-s2);
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
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.6rem;
  }

  li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.6rem;
    align-items: start;
    color: var(--color-grey-s2);
  }

  li::before {
    content: '✓';
    color: var(--color-primary);
    font-weight: var(--font-weight-semibold);
  }
`;

const Person = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.2rem;

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
    <TestimonialSection id="testimonial" sectionName="Testimonio">
      <Wrap>
        <Quote>
          <blockquote>
            “La creatividad es inteligencia divirtiéndose.”
          </blockquote>
          <figcaption>— Albert Einstein</figcaption>
        </Quote>

        <Proof>
          <div>
            <h4>Lo que he notado desde que uso el guion como GPS</h4>
            <ul>
              <li>Menos tiempo atascado en la edición</li>
              <li>Claridad sobre la emoción de cada parte</li>
              <li>Edits coherentes con la emoción del momento</li>
              <li>Base sólida para improvisar y ser más creativo</li>
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
