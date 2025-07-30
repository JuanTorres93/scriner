import { useQuery } from "@tanstack/react-query";

import { getScriptById } from "../../services/scriptsApi";

export function useScript(scriptId) {
  const {
    data: script,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["script", Number(scriptId)],
    queryFn: () => getScriptById(scriptId),
  });

  return { script, isLoading, error };
}
