export class GetScriptsByUser {
  constructor(repo) {
    this.repo = repo;
  }
  exec = async (userId) => {
    if (!userId) throw new Error("userId required");
    return this.repo.getAllByUser(userId); // returns Script entities
  };
}
