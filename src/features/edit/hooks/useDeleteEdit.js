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
        // NOTE: maybe there is a bug in ["edit", deletedEditId] is not invalidated
      });
      toast.success("Anotación eliminada correctamente");

      // TODO NEXT remove mark from editor and update current script to remove the deleted edit from the DB
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteEdit, isDeleting };
}
