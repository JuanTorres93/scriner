import { useQuery } from "@tanstack/react-query";

import { useServices } from "../../../interface-adapters/react/context/AppServicesProvider";

export function useScript(scriptId) {
  const { scripts } = useServices();

  const {
    data: script,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["scripts", Number(scriptId)],
    queryFn: () => scripts.getById.exec(scriptId),
    retry: 0, // Do not retry, assume that if failure, then somebody is trying to acces to another user's script through URL
  });

  return { script, isLoading, error };
}
