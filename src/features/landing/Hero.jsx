import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";

const StyledSection = styled.section`
  position: relative;
  width: 100%;
  height: 90vh;
  background-color: var(--color-accent-t1);
  overflow: hidden;
  padding: 8rem;
  padding-top: 30rem;

  img {
    position: absolute;
    inset: 0; /* top:0; right:0; bottom:0; left:0 */
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    line-height: 1.1;
    margin-bottom: 2rem;
  }

  p {
    font-size: var(--font-size-b1);
    opacity: 0.95;
    margin: 0 0 1.25rem;
  }

  .button-container {
    max-width: 14rem;
  }
`;

function Hero() {
  return (
    <StyledSection>
      <img
        src="/hero.jpg"
        alt="Hero image: A pen writing on a futuristic paper"
      />

      <Box>
        <h1>¡Atención, YouTuber!</h1>
        <p>Tus vídeos subirán al siguiente nivel...</p>

        <div className="button-container">
          <Button as={Link} to={"/signup"}>
            Únete ahora
          </Button>
        </div>
      </Box>
    </StyledSection>
  );
}

export default Hero;
