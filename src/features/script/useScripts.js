import { useQuery } from "@tanstack/react-query";

import { getScripts } from "../../services/scriptsApi";

export function useScripts() {
  const {
    data: scripts,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["scripts"],
    queryFn: getScripts,
  });

  return { scripts, isLoading, error };
}
