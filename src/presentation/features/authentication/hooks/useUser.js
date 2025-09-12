import { useQuery } from "@tanstack/react-query";
import { useServices } from "../../../../interface-adapters/react/context/AppServicesProvider";

export function useUser() {
  const { auth } = useServices();
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: auth.getCurrent.exec,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
