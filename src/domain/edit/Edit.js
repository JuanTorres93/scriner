import { ValidationError } from "../common/errors";
import { EDIT_TYPES } from "./editTypes";

export class Edit {
  constructor({ id, content, createdAt, type, isDone, scriptId }) {
    if (!Object.values(EDIT_TYPES).includes(type))
      throw new ValidationError("Invalid edit type");

    this.id = id;
    this.content = content;
    this.type = type;
    this.createdAt = createdAt;
    this.isDone = isDone;
    this.scriptId = scriptId;
  }
}
