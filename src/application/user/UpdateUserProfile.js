import { ValidationError } from "../../domain/common/errors.js";

export class UpdateUserProfile {
  constructor(usersRepo) {
    this.usersRepo = usersRepo;
  }

  exec = async (id, updates) => {
    if (!id) throw new ValidationError("User id is required");
    if (!updates || Object.keys(updates).length === 0) {
      throw new ValidationError("Updates are required");
    }

    return this.usersRepo.updateProfile(id, updates);
  };
}
