import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../ui/Logo";

const navItems = [];

const StyledNav = styled.nav`
  background-color: var(--color-grey-t2);
  padding: 0.5rem 2rem;

  ul {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: inline-block;
      padding: 0;
      margin: 0;
      margin-right: 1rem;

      &:last-child {
        margin-right: 0;
      }

      a,
      a:visited,
      a:link {
        color: var(--color-grey-s3);
        text-decoration: none;
        padding: 0;
        margin: 0;
      }
    }
  }
`;

function LandingNavigation() {
  return (
    <StyledNav>
      <ul>
        <li>
          <Link to={"/"}>
            <Logo />
          </Link>
        </li>

        {navItems.map((item) => (
          <li key={item.href}>
            <Link to={item.href}>{item.label}</Link>
          </li>
        ))}

        <li>
          <Link to={"/login"}>Login</Link>
        </li>
        <li>
          <Link to={"/signup"}>Sign Up</Link>
        </li>
      </ul>
    </StyledNav>
  );
}

export default LandingNavigation;
