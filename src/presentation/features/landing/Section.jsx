import styled from 'styled-components';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  gap: 2rem;
  max-width: 200rem;
  margin: 0 auto;

  h3 {
    font-size: var(--font-size-b4);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
  }
`;

const Content = styled.div`
  padding: 6rem 0;
  font-size: var(--font-size-b1);
  color: var(--color-grey-s2);
  line-height: 1.4;

  em {
    font-weight: var(--font-weight-medium);
    color: var(--color-accent);
  }
`;

function Section({
  children,
  className,
  sectionName = 'Section Name',
  ...props
}) {
  return (
    <StyledSection className={className} {...props}>
      <h3>{sectionName}</h3>
      <Content>{children}</Content>
    </StyledSection>
  );
}

export default Section;
