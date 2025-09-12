import { describe, it, expect, vi, beforeEach } from "vitest";
import { DeleteUser } from "../../../../src/application/user/DeleteUser.js";
import { ValidationError } from "../../../../src/domain/common/errors.js";

describe("DeleteUser Use Case", () => {
  let mockUsersRepo;
  let deleteUser;

  beforeEach(() => {
    mockUsersRepo = {
      delete: vi.fn(),
    };
    deleteUser = new DeleteUser(mockUsersRepo);
  });

  it("should delete user through repository", async () => {
    const userId = "user-1";
    mockUsersRepo.delete.mockResolvedValue();

    await deleteUser.exec(userId);

    expect(mockUsersRepo.delete).toHaveBeenCalledWith(userId);
  });

  it("should throw ValidationError when id is not provided", async () => {
    await expect(deleteUser.exec()).rejects.toThrow(ValidationError);
  });

  it("should throw ValidationError when id is null", async () => {
    await expect(deleteUser.exec(null)).rejects.toThrow(ValidationError);
  });
});
