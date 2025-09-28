import { useUser } from './hooks/useUser';
import Loader from '../../ui/Loader';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FullPage from '../../ui/FullPage';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // If there is NO authenticated user, redirect to /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, isLoading]);

  // While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Loader type="spinner" />
      </FullPage>
    );

  // If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
