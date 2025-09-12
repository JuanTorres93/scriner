import { describe, it, expect, vi, beforeEach } from "vitest";
import { UpdateScript } from "../../../../src/application/script/UpdateScript.js";
import { ValidationError } from "../../../../src/domain/common/errors.js";

describe("UpdateScript Use Case", () => {
  let mockScriptsRepo;
  let updateScript;

  beforeEach(() => {
    mockScriptsRepo = {
      update: vi.fn(),
    };
    updateScript = new UpdateScript(mockScriptsRepo);
  });

  it("should update script through repository", async () => {
    const scriptId = "1";
    const patch = { title: "Updated Title" };
    const expectedScript = { id: "1", title: "Updated Title" };

    mockScriptsRepo.update.mockResolvedValue(expectedScript);

    const result = await updateScript.exec(scriptId, patch);

    expect(mockScriptsRepo.update).toHaveBeenCalledWith(scriptId, patch);
    expect(result).toEqual(expectedScript);
  });

  it("should throw ValidationError when id is not provided", async () => {
    const patch = { title: "Updated Title" };

    await expect(updateScript.exec(null, patch)).rejects.toThrow(
      ValidationError
    );
  });

  it("should throw ValidationError when id is empty string", async () => {
    const patch = { title: "Updated Title" };

    await expect(updateScript.exec("", patch)).rejects.toThrow(ValidationError);
  });
});
