import { ValidationError } from "../../domain/common/errors.js";

export class DeleteUser {
  constructor(usersRepo) {
    this.usersRepo = usersRepo;
  }

  exec = async (id) => {
    if (!id) throw new ValidationError("User id is required");

    return this.usersRepo.delete(id);
  };
}
