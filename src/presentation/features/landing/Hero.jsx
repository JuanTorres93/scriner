import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../ui/Button';

const StyledSection = styled.section`
  position: relative;
  width: 100%;
  height: 90vh;
  /* Fallback when image is not shown */
  background-image: linear-gradient(
    to top right,
    var(--color-primary-s2) 0%,
    var(--color-primary-t2) 100%
  );

  overflow: hidden;
  padding: 8rem;
  padding-top: 30rem;

  img {
    position: absolute;
    inset: 0; /* top:0; right:0; bottom:0; left:0 */
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: right;
  }
`;

const Box = styled.div`
  max-width: 80rem;
  color: var(--color-grey-t2);
  background: color-mix(
    in srgb,
    var(--color-grey-s2) 70%,
    transparent 30%
  ) !important;
  backdrop-filter: blur(3px);
  border-radius: 16px;
  padding: 2.75rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);

  h1 {
    font-size: var(--font-size-b5);
    font-weight: 400;
    color: var(--color-grey-t2);
    line-height: 1.1;
    opacity: 0.95;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: var(--font-size-b3);
    color: var(--color-grey-t3);
    letter-spacing: 0.1rem;
    margin: 0 0 1.25rem;
  }

  .button-container {
    margin-top: 6rem;
    max-width: 16rem;
  }
`;

function Hero() {
  return (
    <StyledSection id="hero">
      <img src="/hero.jpg" alt="Hero image" />

      <Box>
        <h2>¿Pierdes el tiempo al editar?</h2>
        <h1>Mejora tus vídeos y acelera la edición.</h1>
        {/* <p>Tus vídeos subirán al siguiente nivel...</p> */}

        <div className="button-container">
          <Button variant="boldTextLarge" as={Link} to={'/signup'}>
            Únete ahora
          </Button>
        </div>
      </Box>
    </StyledSection>
  );
}

export default Hero;
