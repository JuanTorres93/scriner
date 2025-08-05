import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEdit as updateEditApi } from "../../../services/editsAPI";
import toast from "react-hot-toast";

export function useUpdateEdit() {
  const queryClient = useQueryClient();

  const { mutate: updateEdit, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => updateEditApi(id, data),
    onSuccess: (data, variables) => {
      // variables are the original parameters passed to the mutation
      queryClient.invalidateQueries({
        queryKey: ["edits"],
      });

      queryClient.invalidateQueries({
        queryKey: ["edit", variables.id],
      });

      toast.success("Anotación actualizada correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateEdit, isUpdating };
}
