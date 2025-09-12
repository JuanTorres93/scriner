import { ValidationError } from "../../domain/common/errors";

export class Login {
  constructor(repo) {
    this.repo = repo;
  }

  exec = async ({ email, password }) => {
    if (!email) throw new ValidationError("email required");
    if (!password) throw new ValidationError("password required");
    return this.repo.login({ email, password });
  };
}
