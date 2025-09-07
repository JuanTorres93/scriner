import styled from "styled-components";

const StyledSection = styled.section`
  position: relative;
  width: 100%;
  height: 90vh; /* Hero a pantalla completa */
  background-color: var(--color-accent-t1);
  overflow: hidden;
  padding: 4rem;
  padding-top: 8rem;

  img {
    position: absolute;
    inset: 0; /* top:0; right:0; bottom:0; left:0 */
    width: 100%;
    height: 100%;
    object-fit: cover; /* Se recorta proporcionalmente */
  }
`;

const Box = styled.div`
  max-width: 80rem;
  color: var(--color-grey-t2);
  background: color-mix(
    in srgb,
    var(--color-grey-s2) 50%,
    transparent 50%
  ) !important;
  backdrop-filter: blur(3px);
  border-radius: 16px;
  padding: 1.75rem;

  h1 {
    font-size: var(--font-size-b6);
    line-height: 1.1;
    margin: 0 0 0.75rem;
  }

  p {
    font-size: var(--font-size-b2);
    opacity: 0.95;
    margin: 0 0 1.25rem;
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
      </Box>
    </StyledSection>
  );
}

export default Hero;
