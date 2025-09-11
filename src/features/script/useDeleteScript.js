import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useServices } from "../../interface-adapters/react/context/AppServicesProvider";

export function useDeleteScript() {
  const { scripts } = useServices();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteScript, isPending: isDeleting } = useMutation({
    mutationFn: scripts.delete.exec,
    onSuccess: () => {
      // Invalidate the scripts query to refetch the updated list
      queryClient.invalidateQueries({
        queryKey: ["scripts"],
      });
      toast.success("Guion eliminado correctamente");
      navigate(`/app/editor`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteScript, isDeleting };
}
