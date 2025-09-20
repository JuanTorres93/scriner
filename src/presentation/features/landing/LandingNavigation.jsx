import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components';
import Logo from '../../ui/Logo';
import Button from '../../ui/Button';
import { useUser } from '../authentication/hooks/useUser';
import { breakpoints } from '../../styles/breakpoints';

const navItems = [
  { label: 'Problema', href: '#problem' },
  { label: 'Consecuencias', href: '#amplify' },
  { label: 'Método', href: '#story' },
  { label: 'Beneficios', href: '#response' },
];

const StyledNav = styled.nav`
  background-color: var(--color-grey-t2);
  padding: 0.5rem 2rem;
  font-size: var(--font-size-base);
  position: fixed;
  z-index: 10;
  width: 100%;
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.1);

  ul {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    align-items: center;
    justify-items: center;
    list-style: none;
    padding: 0;
    margin: 0;

    @media screen and (max-width: ${breakpoints.navBarLogin}) {
      grid-template-columns: 1fr 3fr 1.5fr;
    }

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
        transition: all 0.2s ease;
      }

      a:hover,
      a:focus,
      a:active {
        font-weight: 500;
      }

      .nav-item,
      .nav-item:visited,
      .nav-item:link {
        padding: 0;
        margin: 0;
      }

      span {
        display: inline-block;
      }
    }

    .col-1 {
      grid-column: 1;
      justify-self: start;
    }

    .col-2 {
      grid-column: 2;

      span {
        margin-right: 3rem;
      }
    }

    .col-3 {
      grid-column: 3;
      justify-self: end;

      display: flex;
      gap: 1rem;
    }

    .nav-logo {
      margin-top: 0.5rem;
    }
  }
`;

function LandingNavigation() {
  const { isAuthenticated } = useUser();

  return (
    <StyledNav>
      <ul>
        <li className="col-1">
          <span className="nav-logo">
            <HashLink smooth to={'/#hero'}>
              <Logo />
            </HashLink>
          </span>
        </li>

        <li className="col-2">
          {navItems.map((item) => (
            <span key={item.href}>
              <HashLink className="nav-item" smooth to={`/${item.href}`}>
                {item.label}
              </HashLink>
            </span>
          ))}
        </li>

        <li className="col-3">
          {!isAuthenticated && (
            <>
              <span>
                <Button type="secondary" as={Link} to={'/login'}>
                  Inicia sesión
                </Button>
              </span>
              <span>
                <Button as={Link} to={'/signup'}>
                  Regístrate
                </Button>
              </span>
            </>
          )}

          {isAuthenticated && (
            <span>
              <Button as={Link} to={'/app'}>
                Ir a la app
              </Button>
            </span>
          )}
        </li>
      </ul>
    </StyledNav>
  );
}

export default LandingNavigation;
