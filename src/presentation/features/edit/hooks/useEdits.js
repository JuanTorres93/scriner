import { useQuery } from "@tanstack/react-query";

import { useServices } from "../../../../interface-adapters/react/context/AppServicesProvider";

export function useEdits(scriptId) {
  const { edits: editsService } = useServices();

  const {
    data: edits,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["edits", scriptId],
    queryFn: () => editsService.getByScript.exec(scriptId),
  });

  return { edits, isLoading, error };
}
