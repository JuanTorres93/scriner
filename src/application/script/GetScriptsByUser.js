export class GetScriptsByUser {
  constructor(repo) {
    this.repo = repo;
  }
  async exec(userId) {
    if (!userId) throw new Error("userId required");
    return this.repo.getAllByUser(userId); // returns Script entities
  }
}
