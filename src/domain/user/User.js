import { ValidationError } from "../common/errors";

export class User {
  constructor({ id, name, email, createdAt }) {
    if (!(createdAt instanceof Date))
      throw new ValidationError("createdAt must be a Date");

    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
  }
}
