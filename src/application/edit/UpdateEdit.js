import { ValidationError } from "../../domain/common/errors";

export class UpdateEdit {
  constructor(repo) {
    this.repo = repo;
  }

  exec = async (id, patch) => {
    if (!id) throw new ValidationError("An edit id is required");
    // TODO: validate patch fields?
    return this.repo.update(id, patch);
  };
}
