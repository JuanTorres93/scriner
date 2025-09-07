import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../ui/Logo";
import Button from "../../ui/Button";

const navItems = [
  // TODO cambiar por los que vaya a usar
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

const StyledNav = styled.nav`
  background-color: var(--color-grey-t2);
  padding: 0.5rem 2rem;

  ul {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    align-items: center;
    justify-items: center;
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
      }

      .nav-item,
      .nav-item:visited,
      .nav-item:link {
        padding: 0;
        margin: 0;
      }
    }

    .col-1 {
      grid-column: 1;
      justify-self: start;
    }

    .col-2 {
      grid-column: 2;

      li {
        margin-right: 3rem;
      }
    }

    .col-3 {
      grid-column: 3;
      justify-self: end;
    }
  }
`;

function LandingNavigation() {
  return (
    <StyledNav>
      <ul>
        <li className="col-1">
          <li>
            <Link to={"/"}>
              <Logo />
            </Link>
          </li>
        </li>

        <li className="col-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link className="nav-item" to={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </li>

        <li className="col-3">
          <li>
            <Button type="secondary" as={Link} to={"/login"}>
              Login
            </Button>
          </li>
          <li>
            <Button as={Link} to={"/signup"}>
              Sign Up
            </Button>
          </li>
        </li>
      </ul>
    </StyledNav>
  );
}

export default LandingNavigation;
