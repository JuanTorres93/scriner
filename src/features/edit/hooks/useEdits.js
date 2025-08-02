import { useQuery } from "@tanstack/react-query";

import { getEdits } from "../../../services/editsAPI";

export function useEdits() {
  const {
    data: edits,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["edits"],
    queryFn: getEdits,
  });

  return { edits, isLoading, error };
}
