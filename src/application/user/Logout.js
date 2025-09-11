export class Logout {
  constructor(repo) {
    this.repo = repo;
  }

  async exec() {
    return this.repo.logout();
  }
}
