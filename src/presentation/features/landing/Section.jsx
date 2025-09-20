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

  .section-title {
    font-size: var(--font-size-b4);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
    text-align: center;
  }

  .subtitle {
    font-size: var(--font-size-regular);
    font-weight: var(--font-weight-regular);
    color: var(--color-grey-s2);
    text-align: center;
    max-width: 60rem;
  }
`;

const Content = styled.div`
  padding: 6rem 0;
  font-size: var(--font-size-b1);
  color: var(--color-grey-s2);
  line-height: 1.4;

  em {
    /* font-weight: var(--font-weight-medium); */
    color: var(--color-primary-s2);
  }
`;

function Section({
  children,
  className,
  sectionName = 'Section Name',
  subtitle,
  ...props
}) {
  return (
    <StyledSection className={className} {...props}>
      <h3 className="section-title">{sectionName}</h3>

      {subtitle && <h4 className="subtitle">{subtitle}</h4>}
      <Content>{children}</Content>
    </StyledSection>
  );
}

export default Section;
