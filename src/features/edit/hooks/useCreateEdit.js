import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEdit as createEditApi } from "../../../services/editsAPI";
import toast from "react-hot-toast";

export function useCreateEdit() {
  const queryClient = useQueryClient();

  const { mutate: createEdit, isPending: isCreating } = useMutation({
    mutationFn: createEditApi,
    onSuccess: () => {
      // Invalidate the scripts query to refetch the updated list
      queryClient.invalidateQueries({
        queryKey: ["edits"],
      });
      toast.success("Edit created successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createEdit, isCreating };
}
