import { useQuery } from "@tanstack/react-query";

import { getScripts } from "../../services/scriptsApi";

export function useScripts() {
  const {
    data: scripts,
    isLoading,
    error,
  } = useQuery({
    // Uniquely identify the data that is going to be fetched. Used to cache the data.
    queryKey: ["scripts"],
    // The function NEEDS to return a promise (any NOT AWAITED async function does)
    queryFn: getScripts,
  });

  return { scripts, isLoading, error };
}
