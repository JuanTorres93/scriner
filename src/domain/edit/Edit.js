import { ValidationError } from "../common/errors";
import { EDIT_TYPES } from "./editTypes";

export class Edit {
  constructor({ id, content, createdAt, type, isDone = false, scriptId }) {
    if (!id || !createdAt || !type || !scriptId) {
      throw new ValidationError("Missing required fields");
    }

    if (!Object.values(EDIT_TYPES).includes(type))
      throw new ValidationError("Invalid edit type");

    if (!(createdAt instanceof Date) || isNaN(createdAt.getTime()))
      throw new ValidationError("Invalid createdAt");

    this.id = id;
    this.content = content;
    this.type = type;
    this.createdAt = createdAt;
    this.isDone = isDone;
    this.scriptId = scriptId;
  }
}
