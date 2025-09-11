export class DeleteScript {
  constructor(repo) {
    this.repo = repo;
  }

  async exec(id) {
    if (!id) throw new Error("id required");
    return this.repo.delete(id);
  }
}
