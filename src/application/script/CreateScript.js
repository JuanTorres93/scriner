export class CreateScript {
  constructor(repo) {
    this.repo = repo;
  }

  async exec(script) {
    if (!script) throw new Error("script required");
    // TODO: validate script fields?
    return this.repo.create(script);
  }
}
