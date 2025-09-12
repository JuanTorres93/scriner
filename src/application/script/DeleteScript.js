import { ValidationError } from "../../domain/common/errors";

export class DeleteScript {
  constructor(repo) {
    this.repo = repo;
  }

  exec = async (id) => {
    if (!id) throw new ValidationError("An script id is required");
    return this.repo.delete(id);
  };
}
