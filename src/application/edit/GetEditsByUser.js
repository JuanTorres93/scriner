export class GetEditsByUser {
  constructor(repo) {
    this.repo = repo;
  }
  async exec(userId) {
    if (!userId) throw new Error("userId required");
    return this.repo.getAllByUser(userId); // returns Edit entities
  }
}
