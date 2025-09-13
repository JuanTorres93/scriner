import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem;
  gap: 4rem;
  max-width: 200rem;
  margin: 0 auto;

  h3 {
    font-size: var(--font-size-b4);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
    margin-bottom: 4rem;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 8rem;
  font-size: var(--font-size-b1);
  color: var(--color-grey-s2);
  line-height: 1.4;

  em {
    font-weight: var(--font-weight-medium);
    color: var(--color-accent);
  }
`;

function Section({ children, className, sectionName = "Section Name" }) {
  return (
    <StyledSection className={className}>
      <h3>{sectionName}</h3>
      <Content>{children}</Content>
    </StyledSection>
  );
}

export default Section;
