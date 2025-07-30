import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createScript as createScriptApi } from "../../services/scriptsApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCreateScript() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createScript, isPending: isCreating } = useMutation({
    mutationFn: createScriptApi,
    onSuccess: (data) => {
      // Invalidate the scripts query to refetch the updated list
      queryClient.invalidateQueries({
        queryKey: ["scripts"],
      });
      toast.success("Script created successfully!");
      navigate(`/app/editor/${data.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createScript, isCreating };
}
