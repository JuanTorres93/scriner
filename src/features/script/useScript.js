import { useQuery } from "@tanstack/react-query";

import { getScriptById } from "../../services/scriptsApi";

export function useScript(scriptId) {
  const {
    data: script,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["scripts", Number(scriptId)],
    queryFn: () => getScriptById(scriptId),
    retry: 0, // Do not retry, assume that if failure, then somebody is trying to acces to another user's script through URL
  });

  return { script, isLoading, error };
}
