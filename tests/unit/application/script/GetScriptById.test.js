import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetScriptById } from "../../../../src/application/script/GetScriptById.js";
import { ValidationError } from "../../../../src/domain/common/errors.js";

describe("GetScriptById Use Case", () => {
  let mockScriptsRepo;
  let getScriptById;

  beforeEach(() => {
    mockScriptsRepo = {
      getById: vi.fn(),
    };
    getScriptById = new GetScriptById(mockScriptsRepo);
  });

  it("should get script by id through repository", async () => {
    const scriptId = "1";
    const expectedScript = { id: "1", title: "Test Script" };

    mockScriptsRepo.getById.mockResolvedValue(expectedScript);

    const result = await getScriptById.exec(scriptId);

    expect(mockScriptsRepo.getById).toHaveBeenCalledWith(scriptId);
    expect(result).toEqual(expectedScript);
  });

  it("should throw ValidationError when id is not provided", async () => {
    await expect(getScriptById.exec()).rejects.toThrow(ValidationError);
  });

  it("should return null when script not found", async () => {
    mockScriptsRepo.getById.mockResolvedValue(null);

    const result = await getScriptById.exec("999");

    expect(result).toBeNull();
  });
});
