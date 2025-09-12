import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useServices } from "../../../interface-adapters/react/context/AppServicesProvider";

export function useUpdateScript() {
  const { scripts } = useServices();

  const queryClient = useQueryClient();

  const { mutate: updateScript, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => scripts.update.exec(id, data),
    // eslint-disable-next-line no-unused-vars
    onSuccess: (data, variables) => {
      // DOC variables are the original parameters passed to the mutation
      queryClient.invalidateQueries({
        queryKey: ["scripts"],
      });

      // toast.success("Guion actualizado correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateScript, isUpdating };
}
