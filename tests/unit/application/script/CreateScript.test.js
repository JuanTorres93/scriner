import { describe, it, expect, vi, beforeEach } from "vitest";
import { CreateScript } from "../../../../src/application/script/CreateScript.js";
import { ValidationError } from "../../../../src/domain/common/errors.js";

describe("CreateScript Use Case", () => {
  let mockScriptsRepo;
  let createScript;

  beforeEach(() => {
    mockScriptsRepo = {
      create: vi.fn(),
    };
    createScript = new CreateScript(mockScriptsRepo);
  });

  it("should create script through repository", async () => {
    const scriptData = {
      title: "Test Script",
      content: "Script content",
      user_id: "user-1",
    };
    const expectedScript = { id: "1", ...scriptData };

    mockScriptsRepo.create.mockResolvedValue(expectedScript);

    const result = await createScript.exec(scriptData);

    expect(mockScriptsRepo.create).toHaveBeenCalledWith(scriptData);
    expect(result).toEqual(expectedScript);
  });

  it("should throw ValidationError when script is not provided", async () => {
    await expect(createScript.exec()).rejects.toThrow(ValidationError);
  });

  it("should throw ValidationError when script is null", async () => {
    await expect(createScript.exec(null)).rejects.toThrow(ValidationError);
  });
});
