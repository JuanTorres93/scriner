// presentation/pages/Subscribe.jsx
import styled from 'styled-components';
import MarketingLayout from '../ui/MarketingLayout';
import PricingButtons from '../ui/PricingButtons';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 91dvh;
  padding: 4rem 2rem;
  background-color: var(--color-grey-t3);
`;

const Card = styled.div`
  background: var(--color-grey-t2);
  border-radius: var(--border-radius);
  padding: 3rem 2rem;
  max-width: 50rem;
  width: 100%;
  text-align: center;
  box-shadow: 0 0.8rem 2rem rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-grey-t1);

  button {
    margin: 0 auto;
  }
`;

const Title = styled.h1`
  font-size: var(--font-size-b2);
  margin-bottom: 1rem;
  color: var(--color-grey-s2);
`;

const Subtitle = styled.p`
  font-size: var(--font-size-s2);
  color: var(--color-grey);
  margin-bottom: 2rem;
`;

const Price = styled.div`
  margin: 2rem 0;
  font-size: var(--font-size-b3);
  font-weight: 700;
  color: var(--color-grey-s2);

  span {
    font-size: var(--font-size-s1);
    font-weight: 400;
    color: var(--color-grey);
  }
`;

function Subscribe() {
  return (
    <Wrapper>
      <Card>
        <Title>Suscríbete a EditorMind</Title>
        <Subtitle>
          Tu periodo de prueba ha terminado. Desbloquea todas las funciones y
          sigue creando sin límites.
        </Subtitle>

        <Price>
          2,00€ <span>/ mes</span>
        </Price>

        <PricingButtons />
      </Card>
    </Wrapper>
  );
}

export default Subscribe;
