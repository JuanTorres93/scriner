export class Login {
  constructor(repo) {
    this.repo = repo;
  }

  exec = async ({ email, password }) => {
    if (!email) throw new Error("email required");
    if (!password) throw new Error("password required");
    return this.repo.login({ email, password });
  };
}
