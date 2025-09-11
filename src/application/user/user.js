// Receive the repository in the constructor (Dependency Inversion)
export class GetUserById {
  constructor(usersRepo) {
    if (!usersRepo) throw new Error("GetUserById requires a usersRepo");
    this.users = usersRepo;
  }

  async exec(id) {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid 'id' parameter");
    }

    const user = await this.users.getById(id);

    if (!user) throw new Error("UserNotFound");

    return user; // Domain entity User
  }
}
