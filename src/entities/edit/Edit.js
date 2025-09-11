export class Edit {
  constructor(id, content, createdAt, type, isDone, scriptId) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.type = type;
    this.isDone = isDone;
    this.scriptId = scriptId;
  }
}

export class EditsRepo {
  async getAll() {
    throw new Error("Not implemented");
  }

  async getById(id) {
    throw new Error("Not implemented");
  }

  async create(edit) {
    throw new Error("Not implemented");
  }

  async update(edit) {
    throw new Error("Not implemented");
  }

  async delete(id) {
    throw new Error("Not implemented");
  }
}
