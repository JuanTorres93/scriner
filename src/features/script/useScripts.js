import { useQuery } from "@tanstack/react-query";

import { getScripts } from "../../services/scriptsApi";

export function useScripts(userId) {
  const {
    data: scripts,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["scripts", userId],
    queryFn: () => getScripts(userId),
  });

  return { scripts, isLoading, error };
}
