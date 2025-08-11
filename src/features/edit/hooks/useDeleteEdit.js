import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEdit as deleteEditApi } from "../../../services/editsAPI";
import toast from "react-hot-toast";

export function useDeleteEdit() {
  const queryClient = useQueryClient();

  const { mutate: deleteEdit, isPending: isDeleting } = useMutation({
    mutationFn: deleteEditApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["edits"],
      });
      toast.success("Anotación eliminada correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteEdit, isDeleting };
}
