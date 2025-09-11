import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useServices } from "../../../interface-adapters/react/context/AppServicesProvider";

export function useDeleteEdit() {
  const { edits } = useServices();

  const queryClient = useQueryClient();

  const { mutate: deleteEdit, isPending: isDeleting } = useMutation({
    mutationFn: edits.delete.exec,
    // eslint-disable-next-line no-unused-vars
    onSuccess: (data) => {
      // DOC data is the deleted edit
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
