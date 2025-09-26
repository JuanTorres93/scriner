// presentation/pages/Subscribe.jsx
import styled from 'styled-components';
import MarketingLayout from '../ui/MarketingLayout';
import PricingButtons from '../ui/PricingButtons';
import Logo from '../ui/Logo';

const Wrapper = styled.section`
  display: grid;
  place-items: center;
  padding: 6rem 2rem 10rem;
  background-color: var(--color-grey-t3);
  min-height: 100dvh;
`;

const Card = styled.div`
  width: min(95rem, 92vw);
  background: var(--color-grey-t2);
  border-radius: var(--border-radius-large, 1.6rem);
  box-shadow: var(--shadow-lg, 0 10px 30px rgba(0, 0, 0, 0.08));
  padding: clamp(2rem, 4vw, 4rem);
  border: 1px solid var(--color-grey-t1);
`;

const Header = styled.header`
  display: grid;
  gap: 1.2rem;
  margin-bottom: 2.4rem;
  text-align: center;

  h1 {
    font-size: var(--font-size-b2);
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: var(--color-grey-s2);
  }

  p {
    font-size: var(--font-size-s1);
    color: var(--color-grey);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 860px) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: start;
  }
`;

const Features = styled.ul`
  list-style: none;
  display: grid;
  gap: 1rem;
  padding: 0;
  margin: 0;

  li {
    display: grid;
    grid-template-columns: 2rem 1fr;
    gap: 1.2rem;
    align-items: start;
    font-size: var(--font-size-s2);
    color: var(--color-grey-s1);
  }

  .dot {
    margin-top: 0.55rem;
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    background: var(--color-primary, #ff922b);
    box-shadow: 0 0 0 4px
      color-mix(in srgb, var(--color-primary, #ff922b) 20%, transparent);
  }
`;

const Plan = styled.div`
  background: var(--color-grey-t3);
  border: 1px solid var(--color-grey-t1);
  border-radius: var(--border-radius, 1.2rem);
  padding: clamp(1.6rem, 3vw, 2.4rem);

  .badge {
    display: inline-block;
    font-size: var(--font-size-s3);
    color: var(--color-primary-s2, #d9480f);
    background: color-mix(in srgb, var(--color-primary, #ff922b) 18%, white);
    border: 1px solid
      color-mix(in srgb, var(--color-primary, #ff922b) 35%, white);
    padding: 0.35rem 0.75rem;
    border-radius: 9999px;
    font-weight: 600;
    letter-spacing: 0.02em;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: var(--font-size-b1);
    color: var(--color-grey-s2);
    margin: 0.4rem 0 0.6rem 0;
    letter-spacing: -0.01em;
  }

  p.desc {
    color: var(--color-grey);
    font-size: var(--font-size-s2);
    margin-bottom: 1.6rem;
  }

  .price {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    margin: 1rem 0 1.6rem;

    .amount {
      font-size: var(--font-size-b3);
      font-weight: 800;
      color: var(--color-grey-s2);
      line-height: 1;
    }
    .period {
      color: var(--color-grey);
      font-size: var(--font-size-s2);
    }
  }

  .cta {
    margin-top: 1.4rem;
  }
`;

function Subscribe() {
  return (
    <MarketingLayout>
      <Wrapper>
        <Card>
          <Header>
            <Logo size="md" />
            <h1>Suscríbete a EditorMind</h1>
            <p>
              Se acabó tu periodo de prueba. Desbloquea todas las funciones sin
              límites.
            </p>
          </Header>

          <Grid>
            {/* Columna izquierda: beneficios */}
            <Features>
              <li>
                <span className="dot" />
                <span>
                  Editor de guiones con anotaciones{' '}
                  {`{B-roll, música, transiciones}`} en línea
                </span>
              </li>
              <li>
                <span className="dot" />
                <span>
                  Plantillas de estructura y “killer scripts” para YouTube
                </span>
              </li>
              <li>
                <span className="dot" />
                <span>Exportaciones limpias listas para Kdenlive</span>
              </li>
              <li>
                <span className="dot" />
                <span>Sin límites de proyectos ni scripts</span>
              </li>
              <li>
                <span className="dot" />
                <span>Soporte prioritario y mejoras continuas</span>
              </li>
            </Features>

            {/* Columna derecha: plan único */}
            <Plan>
              <span className="badge">Plan único</span>
              <h2>EditorMind Pro</h2>
              <p className="desc">
                Todo lo que necesitas para planificar y editar tus vídeos sin
                fricción.
              </p>

              <div className="price">
                <span className="amount">9,99€</span>
                <span className="period">/ mes</span>
              </div>

              <div className="cta">
                {/* Este botón ya gestiona: si estás activo → portal; si no → checkout */}
                <PricingButtons />
              </div>
            </Plan>
          </Grid>
        </Card>
      </Wrapper>
    </MarketingLayout>
  );
}

export default Subscribe;
