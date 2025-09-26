import styled from 'styled-components';
import { useUser } from '../authentication/hooks/useUser';
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

function PaidRoute({ children }) {
  const navigate = useNavigate();

  // Load the authenticated user
  const { isLoading, isAllowed } = useUser();

  // If user has no active subscription, redirect to /subscribe
  useEffect(() => {
    if (!isAllowed && !isLoading) {
      navigate('/subscribe');
    }
  }, [isAllowed, navigate, isLoading]);

  // While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Loader type="spinner" />
      </FullPage>
    );

  // If there IS a subscription, render the app
  if (isAllowed) return children;
}

export default PaidRoute;
