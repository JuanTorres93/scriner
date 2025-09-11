export class Edit {
  constructor({ id, content, createdAt, type, isDone, scriptId }) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.type = type;
    this.isDone = isDone;
    this.scriptId = scriptId;
  }
}
