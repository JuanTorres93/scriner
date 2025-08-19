import { useQuery } from "@tanstack/react-query";

import { getEdits } from "../../../services/editsAPI";

export function useEdits(scriptId) {
  const {
    data: edits,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["edits", scriptId],
    queryFn: () => getEdits(scriptId),
  });

  return { edits, isLoading, error };
}
