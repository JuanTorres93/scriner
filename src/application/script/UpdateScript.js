import { ValidationError } from "../../domain/common/errors";

export class UpdateScript {
  constructor(repo) {
    this.repo = repo;
  }

  exec = async (id, patch) => {
    if (!id) throw new ValidationError("An script id is required");
    // TODO: validate patch fields?
    return this.repo.update(id, patch);
  };
}
