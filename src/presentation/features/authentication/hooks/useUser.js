import { useQuery } from '@tanstack/react-query';
import { useServices } from '../../../../interface-adapters/react/context/AppServicesProvider';

export function useUser() {
  const { auth } = useServices();
  const { isPending: isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: auth.getCurrent.exec,
  });

  const isAuthenticated = user?.role === 'authenticated';

  const isAllowed =
    user?.subscription_status === 'active' ||
    user?.subscription_status === 'free' ||
    (user?.subscription_status === 'trialing' &&
      new Date(user?.trial_ends_at) > new Date());

  return { isLoading, user, isAuthenticated, isAllowed };
}
