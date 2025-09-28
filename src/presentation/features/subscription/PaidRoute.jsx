import { useUser } from '../authentication/hooks/useUser';
import Loader from '../../ui/Loader';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FullPage from '../../ui/FullPage';

function PaidRoute({ children }) {
  const navigate = useNavigate();

  // Load the authenticated user
  const { isLoading, isAllowed, user } = useUser();

  // If user has no active subscription, redirect to /subscribe
  useEffect(() => {
    // Due to caching (probably), user.subscription_status is initially undefined. So we wait until it's defined to do the redirect check.
    if (!user.subscription_status) return;

    if (!isAllowed && !isLoading) {
      navigate('/subscribe');
    }
  }, [isAllowed, navigate, isLoading, user.subscription_status]);

  // While loading, show a spinner
  if (isLoading || !user.subscription_status)
    return (
      <FullPage>
        <Loader type="spinner" />
      </FullPage>
    );

  // If there IS a subscription, render the app
  if (isAllowed) return children;
}

export default PaidRoute;
