import { describe, it, expect, vi, beforeEach } from "vitest";
import { DeleteScript } from "../../../../src/application/script/DeleteScript.js";
import { ValidationError } from "../../../../src/domain/common/errors.js";

describe("DeleteScript Use Case", () => {
  let mockScriptsRepo;
  let deleteScript;

  beforeEach(() => {
    mockScriptsRepo = {
      delete: vi.fn(),
    };
    deleteScript = new DeleteScript(mockScriptsRepo);
  });

  it("should delete script through repository", async () => {
    const scriptId = "1";
    mockScriptsRepo.delete.mockResolvedValue();

    await deleteScript.exec(scriptId);

    expect(mockScriptsRepo.delete).toHaveBeenCalledWith(scriptId);
  });

  it("should throw ValidationError when id is not provided", async () => {
    await expect(deleteScript.exec()).rejects.toThrow(ValidationError);
  });

  it("should throw ValidationError when id is null", async () => {
    await expect(deleteScript.exec(null)).rejects.toThrow(ValidationError);
  });
});
