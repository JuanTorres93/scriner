import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetUserById } from "../../../../src/application/user/GetUserById.js";
import { ValidationError } from "../../../../src/domain/common/errors.js";

describe("GetUserById Use Case", () => {
  let mockUsersRepo;
  let getUserById;

  beforeEach(() => {
    mockUsersRepo = {
      getById: vi.fn(),
    };
    getUserById = new GetUserById(mockUsersRepo);
  });

  it("should get user by id through repository", async () => {
    const userId = "user-1";
    const expectedUser = { id: "user-1", name: "John Doe" };

    mockUsersRepo.getById.mockResolvedValue(expectedUser);

    const result = await getUserById.exec(userId);

    expect(mockUsersRepo.getById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(expectedUser);
  });

  it("should throw ValidationError when id is not provided", async () => {
    await expect(getUserById.exec()).rejects.toThrow(ValidationError);
  });

  it("should return null when user not found", async () => {
    mockUsersRepo.getById.mockResolvedValue(null);

    const result = await getUserById.exec("999");

    expect(result).toBeNull();
  });
});
