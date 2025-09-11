export class UpdateEdit {
  constructor(repo) {
    this.repo = repo;
  }

  exec = async (id, patch) => {
    if (!id) throw new Error("id required");
    // TODO: validate patch fields?
    return this.repo.update(id, patch);
  };
}
