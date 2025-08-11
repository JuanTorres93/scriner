import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateScript as updateScriptApi } from "../../services/scriptsApi";
import toast from "react-hot-toast";

export function useUpdateScript() {
  const queryClient = useQueryClient();

  const { mutate: updateScript, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => updateScriptApi(id, data),
    onSuccess: (data, variables) => {
      // variables are the original parameters passed to the mutation
      queryClient.invalidateQueries({
        queryKey: ["scripts"],
      });

      toast.success("Guion actualizado correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateScript, isUpdating };
}
