export class GetCurrentUser {
  constructor(repo) {
    this.repo = repo;
  }

  async exec() {
    return this.repo.getCurrentUser();
  }
}
