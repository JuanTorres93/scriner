export class UpdateUser {
  constructor(repo) {
    this.repo = repo;
  }

  async exec(id, patch) {
    if (!id) throw new Error("id required");
    // TODO: validate patch fields?
    return this.repo.update(id, patch);
  }
}
