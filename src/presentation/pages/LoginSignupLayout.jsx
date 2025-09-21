import styled from 'styled-components';
import { breakpoints } from '../styles/breakpoints';

const LoginSignupLayout = styled.main`
  min-height: 89.6vh;
  display: grid;
  grid-template-columns: 100rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-t3);

  @media (max-width: ${breakpoints.reduceFont}) {
    min-height: 90.6vh;
  }

  @media (max-width: ${breakpoints.auth}) {
    grid-template-columns: 90%;
  }
`;

export default LoginSignupLayout;
