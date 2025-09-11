export class GetCurrentUser {
  constructor(repo) {
    this.repo = repo;
  }

  exec = async () => {
    return this.repo.getCurrentUser();
  };
}
