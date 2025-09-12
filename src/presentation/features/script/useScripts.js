import { useQuery } from "@tanstack/react-query";

import { useServices } from "../../../interface-adapters/react/context/AppServicesProvider";

export function useScripts(userId) {
  const { scripts: scriptsService } = useServices();

  const {
    data: scripts,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["scripts", userId],
    queryFn: () => scriptsService.getByUser.exec(userId),
  });

  return { scripts, isLoading, error };
}
