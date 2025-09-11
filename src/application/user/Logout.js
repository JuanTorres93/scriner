export class Logout {
  constructor(repo) {
    this.repo = repo;
  }

  // Defining the method as a class field to autobind `this`,
  // otherwise `this` would be undefined when called from useMutation
  exec = async () => {
    return this.repo.logout();
  };
}
