import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEdit as createEditApi } from "../../../services/editsAPI";
import toast from "react-hot-toast";
import { useCurrentEdits } from "../CurrentEditsContext";

export function useCreateEdit() {
  const queryClient = useQueryClient();
  const { setCurrentEditsIds } = useCurrentEdits();

  const { mutate: createEdit, isPending: isCreating } = useMutation({
    mutationFn: createEditApi,
    onSuccess: (data) => {
      // Invalidate the scripts query to refetch the updated list
      queryClient.invalidateQueries({
        queryKey: ["edits"],
      });

      // Set new edit as current edit for its type
      setCurrentEditsIds((prev) => ({
        ...prev,
        [data.type]: data.id,
      }));

      // toast.success("Edit created successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createEdit, isCreating };
}
