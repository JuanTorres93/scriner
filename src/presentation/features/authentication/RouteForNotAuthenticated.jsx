import styled from 'styled-components';
import { useUser } from './hooks/useUser';
import Loader from '../../ui/Loader';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-t3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function RouteForNotAuthenticated({ children }) {
  const navigate = useNavigate();

  // Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // If there IS an authenticated user, redirect to /app
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/app', { replace: true });
    }
  }, [isAuthenticated, navigate, isLoading]);

  // While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Loader type="spinner" />
      </FullPage>
    );

  // If there is NOT a user, render the app
  if (!isAuthenticated) return children;
}

export default RouteForNotAuthenticated;
