export class GetEditsByScript {
  constructor(repo) {
    this.repo = repo;
  }
  exec = async (scriptId) => {
    if (!scriptId) throw new Error("scriptId required");
    return this.repo.getAllByScript(scriptId); // returns Edit entities
  };
}
