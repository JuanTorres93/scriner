import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteScript as deleteScriptApi } from "../../services/scriptsApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useDeleteScript() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteScript, isPending: isDeleting } = useMutation({
    mutationFn: deleteScriptApi,
    onSuccess: () => {
      // Invalidate the scripts query to refetch the updated list
      queryClient.invalidateQueries({
        queryKey: ["scripts"],
        // NOTE: maybe there is a bug in ["script", deletedScriptId] is not invalidated
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
