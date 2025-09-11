export class GetScriptsByUser {
  constructor(repo) {
    this.repo = repo;
  }
  async exec(userId) {
    if (!userId) throw new Error("userId requerido");
    return this.repo.getAllByUser(userId); // devuelve entidades Script
  }
}
