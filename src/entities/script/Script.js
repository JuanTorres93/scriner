export class Script {
  constructor(id, content, createdAt, title, userId) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.title = title;
    this.userId = userId;
  }
}

// Puerto (contrato). Sin detalles de DB.
export class ScriptsRepo {
  async getAllByUser(userId) {
    throw new Error("Not implemented");
  }
  async getById(id) {
    throw new Error("Not implemented");
  }
  async create(script) {
    throw new Error("Not implemented");
  }
  async update(id, patch) {
    throw new Error("Not implemented");
  }
  async delete(id) {
    throw new Error("Not implemented");
  }
}
