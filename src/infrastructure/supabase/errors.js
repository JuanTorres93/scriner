import {
  InfrastructureError,
  ValidationError,
} from "../../domain/common/errors.js";

export function mapSupabaseError(error) {
  // TODO Translate all message errors to English with i18n
  if (error?.code === "invalid_credentials")
    return new ValidationError("Email o contraseña inválidos", {
      cause: error,
    });

  // Default mapping
  return new InfrastructureError(error?.message, {
    details: "Error from db client",
    cause: error,
  });
}
