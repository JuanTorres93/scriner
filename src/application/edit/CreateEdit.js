import { ValidationError } from "../../domain/common/errors";

export class CreateEdit {
  constructor(repo) {
    this.repo = repo;
  }

  exec = async (edit) => {
    if (!edit) throw new ValidationError("An edit is required");
    // TODO: validate edit fields?
    return this.repo.create(edit);
  };
}
