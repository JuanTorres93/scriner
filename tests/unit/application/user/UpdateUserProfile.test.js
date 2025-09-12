import { describe, it, expect, vi, beforeEach } from "vitest";
import { UpdateUserProfile } from "../../../../src/application/user/UpdateUserProfile.js";
import { ValidationError } from "../../../../src/domain/common/errors.js";

describe("UpdateUserProfile Use Case", () => {
  let mockUsersRepo;
  let updateUserProfile;

  beforeEach(() => {
    mockUsersRepo = {
      updateProfile: vi.fn(),
    };
    updateUserProfile = new UpdateUserProfile(mockUsersRepo);
  });

  it("should update user profile through repository", async () => {
    const userId = "user-1";
    const updates = { name: "Updated Name" };
    const expectedUser = { id: "user-1", name: "Updated Name" };

    mockUsersRepo.updateProfile.mockResolvedValue(expectedUser);

    const result = await updateUserProfile.exec(userId, updates);

    expect(mockUsersRepo.updateProfile).toHaveBeenCalledWith(userId, updates);
    expect(result).toEqual(expectedUser);
  });

  it("should throw ValidationError when id is not provided", async () => {
    const updates = { name: "Updated Name" };

    await expect(updateUserProfile.exec(null, updates)).rejects.toThrow(
      ValidationError
    );
  });

  it("should throw ValidationError when updates are not provided", async () => {
    await expect(updateUserProfile.exec("user-1")).rejects.toThrow(
      ValidationError
    );
  });
});
