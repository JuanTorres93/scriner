import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetScriptsByUser } from "../../../../src/application/script/GetScriptsByUser.js";
import { ValidationError } from "../../../../src/domain/common/errors.js";

describe("GetScriptsByUser Use Case", () => {
  let mockScriptsRepo;
  let getScriptsByUser;

  beforeEach(() => {
    mockScriptsRepo = {
      getAllByUser: vi.fn(),
    };
    getScriptsByUser = new GetScriptsByUser(mockScriptsRepo);
  });

  it("should get scripts by user through repository", async () => {
    const userId = "user-1";
    const expectedScripts = [
      { id: "1", title: "Script 1", userId: "user-1" },
      { id: "2", title: "Script 2", userId: "user-1" },
    ];

    mockScriptsRepo.getAllByUser.mockResolvedValue(expectedScripts);

    const result = await getScriptsByUser.exec(userId);

    expect(mockScriptsRepo.getAllByUser).toHaveBeenCalledWith(userId);
    expect(result).toEqual(expectedScripts);
  });

  it("should throw ValidationError when userId is not provided", async () => {
    await expect(getScriptsByUser.exec()).rejects.toThrow(ValidationError);
  });

  it("should return empty array when user has no scripts", async () => {
    mockScriptsRepo.getAllByUser.mockResolvedValue([]);

    const result = await getScriptsByUser.exec("user-1");

    expect(result).toEqual([]);
  });
});
