import { ValidationError } from "../../domain/common/errors";

export class GetEditsByScript {
  constructor(repo) {
    this.repo = repo;
  }

  exec = async (scriptId) => {
    if (!scriptId) throw new ValidationError("An script id is required");
    return this.repo.getAllByScript(scriptId); // returns Edit entities
  };
}
