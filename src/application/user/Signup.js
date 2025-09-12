import { ValidationError } from "../../domain/common/errors";

export class Signup {
  constructor(repo) {
    this.repo = repo;
  }

  exec = async (user) => {
    if (!user) throw new ValidationError("user required");
    // TODO: validate user fields?
    return this.repo.signup(user);
  };
}
