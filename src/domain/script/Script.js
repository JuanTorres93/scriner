import { ValidationError } from "../common/errors";

export class Script {
  constructor({ id, content, createdAt, title, userId }) {
    if (!id || !createdAt || !title || !userId)
      throw new ValidationError("Missing required fields");

    if (!(createdAt instanceof Date) || isNaN(createdAt))
      throw new ValidationError("createdAt must be a valid date");

    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.title = title;
    this.userId = userId;
  }
}
