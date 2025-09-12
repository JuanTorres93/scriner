import { ValidationError } from "../../domain/common/errors.js";

export class Signup {
  constructor(authService) {
    this.authService = authService;
  }

  exec = async ({ fullName, email, password } = {}) => {
    if (!fullName) throw new ValidationError("fullName required");
    if (!email) throw new ValidationError("email required");
    if (!password) throw new ValidationError("password required");

    // Basic password validation this is handled better by supabase
    if (password.length < 6) {
      throw new ValidationError("password must be at least 6 characters");
    }

    return this.authService.signup({ fullName, email, password });
  };
}
