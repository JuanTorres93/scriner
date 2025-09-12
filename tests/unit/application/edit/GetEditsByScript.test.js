import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetEditsByScript } from "../../../../src/application/edit/GetEditsByScript.js";
import { ValidationError } from "../../../../src/domain/common/errors.js";

describe("GetEditsByScript Use Case", () => {
  let mockEditsRepo;
  let getEditsByScript;

  beforeEach(() => {
    mockEditsRepo = {
      getAllByScript: vi.fn(),
    };
    getEditsByScript = new GetEditsByScript(mockEditsRepo);
  });

  it("should get edits by script through repository", async () => {
    const scriptId = "script-1";
    const expectedEdits = [
      { id: "1", content: "Edit 1", scriptId: "script-1" },
      { id: "2", content: "Edit 2", scriptId: "script-1" },
    ];

    mockEditsRepo.getAllByScript.mockResolvedValue(expectedEdits);

    const result = await getEditsByScript.exec(scriptId);

    expect(mockEditsRepo.getAllByScript).toHaveBeenCalledWith(scriptId);
    expect(result).toEqual(expectedEdits);
  });

  it("should throw ValidationError when scriptId is not provided", async () => {
    await expect(getEditsByScript.exec()).rejects.toThrow(ValidationError);
  });

  it("should return empty array when script has no edits", async () => {
    mockEditsRepo.getAllByScript.mockResolvedValue([]);

    const result = await getEditsByScript.exec("script-1");

    expect(result).toEqual([]);
  });
});
