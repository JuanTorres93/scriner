export class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

export class UsersRepo {
  async getById(id) {
    throw new Error("Not implemented");
  }
}
