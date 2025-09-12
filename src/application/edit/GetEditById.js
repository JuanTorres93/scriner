import { ValidationError } from "../../domain/common/errors";

export class GetEditById {
  constructor(repo) {
    this.repo = repo;
  }

  exec = async (id) => {
    if (!id) throw new ValidationError("An edit id is required");

    return this.repo.getById(id);
  };
}
