export class CreateEdit {
  constructor(repo) {
    this.repo = repo;
  }

  async exec(edit) {
    if (!edit) throw new Error("edit required");
    // TODO: validate edit fields?
    return this.repo.create(edit);
  }
}
