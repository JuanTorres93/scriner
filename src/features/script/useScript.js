import { useQuery } from "@tanstack/react-query";

import { getScriptById } from "../../services/scriptsApi";

export function useScript(scriptId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["script", scriptId],
    queryFn: () => getScriptById(scriptId),
    enabled: !!scriptId, // Only make the query if scriptId is defined
  });

  return { script: data?.data, isLoading, error: error || data?.error };
}
