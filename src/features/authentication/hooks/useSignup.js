import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../../services/apiAuth";

export function useSignup() {
  const {
    mutate: signup,
    isLoading,
    error,
  } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Signup successfully created! Please check your email to confirm your account."
      );
    },
    onError: (error) => {
      toast.error("Signup failed. Please try again later.");
    },
  });

  return { signup, isLoading, error };
}
