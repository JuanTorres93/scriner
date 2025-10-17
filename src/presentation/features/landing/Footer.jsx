import styled from 'styled-components';
import { FaLinkedin } from 'react-icons/fa';

const StyledFooter = styled.footer`
  background-color: var(--color-grey-s2);
  color: var(--color-grey-t2);
  text-align: center;
  padding: 2rem;
  font-size: var(--font-size-small);

  nav {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  }

  a {
    color: var(--color-grey-t2);
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: var(--color-primary);
    }
  }

  .social {
    margin-top: 1rem;

    a {
      display: inline !important;
    }
  }

  .social a {
    display: flex;
    justify-content: center;
    align-items: center;

    .linkedin-icon {
      margin-right: 1rem;
    }
  }

  .legal {
    margin-top: 1rem;
    font-size: 0.85em;
    color: var(--color-grey-t1);
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <p>
        <strong>Editormind</strong> — Mejora tus vídeos con claridad y
        creatividad
      </p>

      <div className="social">
        Contacta conmigo enviando un email a{' '}
        <a href="mailto:juan@juantorres.me">juan@juantorres.me</a>
      </div>

      <div className="legal">
        © {new Date().getFullYear()} Editormind. Todos los derechos reservados.
      </div>
    </StyledFooter>
  );
}

export default Footer;
