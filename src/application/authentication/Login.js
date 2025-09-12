import { ValidationError } from "../../domain/common/errors.js";

export class Login {
  constructor(authService) {
    this.authService = authService;
  }

  exec = async ({ email, password }) => {
    if (!email) throw new ValidationError("email required");
    if (!password) throw new ValidationError("password required");

    return this.authService.login({ email, password });
  };
}
