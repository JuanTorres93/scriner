import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../../services/apiAuth";

import { useServices } from "../../../interface-adapters/react/context/AppServicesProvider";

export function useSignup() {
  const { auth } = useServices();

  const {
    mutate: signup,
    isLoading,
    error,
  } = useMutation({
    mutationFn: auth.signup.exec,
    onSuccess: () => {
      toast.success(
        "Cuenta creada! Por favor, revisa tu email para verificarla."
      );
    },
    onError: () => {
      toast.error(
        "Error al crear la cuenta. Por favor, inténtalo de nuevo más tarde."
      );
    },
  });

  return { signup, isLoading, error };
}
