import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useServices } from '../../../interface-adapters/react/context/AppServicesProvider';

export function useCreateScript() {
  const { scripts } = useServices();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createScript, isPending: isCreating } = useMutation({
    mutationFn: scripts.create.exec,
    onSuccess: (data) => {
      // Invalidate the scripts query to refetch the updated list
      queryClient.invalidateQueries({
        queryKey: ['scripts'],
      });
      toast.success('Script created successfully!');
      navigate(`/app/editor/${data.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createScript, isCreating };
}
