export class CreateUser {
  constructor(repo) {
    this.repo = repo;
  }

  async exec(user) {
    if (!user) throw new Error("user required");
    // TODO: validate user fields?
    return this.repo.create(user);
  }
}
