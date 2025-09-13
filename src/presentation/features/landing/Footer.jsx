import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: var(--color-grey-s2);
  color: var(--color-grey-t2);
  text-align: center;
  padding: 2rem;
  font-size: var(--font-size-small);
`;

function Footer() {
  return (
    <StyledFooter>
      <p>TODO: Design and implement footer</p>
    </StyledFooter>
  );
}

export default Footer;
