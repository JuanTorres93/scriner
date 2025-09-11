export class Signup {
  constructor(repo) {
    this.repo = repo;
  }

  exec = async (user) => {
    if (!user) throw new Error("user required");
    // TODO: validate user fields?
    return this.repo.signup(user);
  };
}
