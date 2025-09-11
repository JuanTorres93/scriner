import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useServices } from "../../../interface-adapters/react/context/AppServicesProvider";

export function useUpdateEdit() {
  const { edits } = useServices();
  const queryClient = useQueryClient();

  const { mutate: updateEdit, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => edits.update.exec(id, data),
    onSuccess: (data, variables) => {
      // variables are the original parameters passed to the mutation
      queryClient.invalidateQueries({
        queryKey: ["edits"],
      });

      queryClient.invalidateQueries({
        queryKey: ["edit", variables.id],
      });

      // toast.success("Anotación actualizada correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateEdit, isUpdating };
}
