import styled from "styled-components";

const StyledImg = styled.img`
  height: 50px;
`;
function Logo() {
  return <StyledImg src="/logo.png" alt="logo" />;
}

export default Logo;
