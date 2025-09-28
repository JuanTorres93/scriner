import { useUser } from './hooks/useUser';
import Loader from '../../ui/Loader';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FullPage from '../../ui/FullPage';

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
