import { ValidationError } from "../../domain/common/errors";

export class CreateScript {
  constructor(repo) {
    this.repo = repo;
  }

  exec = async (script) => {
    if (!script) throw new ValidationError("An script is required");
    // TODO: validate script fields?
    return this.repo.create(script);
  };
}
