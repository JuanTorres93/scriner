import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useServices } from '../../../../interface-adapters/react/context/AppServicesProvider.jsx';

export function useLogin() {
  const { auth } = useServices();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => auth.login.exec({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      navigate('/app', { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login, isLoading };
}
