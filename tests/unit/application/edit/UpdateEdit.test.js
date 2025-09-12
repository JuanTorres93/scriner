import { describe, it, expect, vi, beforeEach } from "vitest";
import { UpdateEdit } from "../../../../src/application/edit/UpdateEdit.js";
import { ValidationError } from "../../../../src/domain/common/errors.js";

describe("UpdateEdit Use Case", () => {
  let mockEditsRepo;
  let updateEdit;

  beforeEach(() => {
    mockEditsRepo = {
      update: vi.fn(),
    };
    updateEdit = new UpdateEdit(mockEditsRepo);
  });

  it("should update edit through repository", async () => {
    const editId = "1";
    const patch = { content: "Updated content" };
    const expectedEdit = { id: "1", content: "Updated content" };

    mockEditsRepo.update.mockResolvedValue(expectedEdit);

    const result = await updateEdit.exec(editId, patch);

    expect(mockEditsRepo.update).toHaveBeenCalledWith(editId, patch);
    expect(result).toEqual(expectedEdit);
  });

  it("should throw ValidationError when id is not provided", async () => {
    const patch = { content: "Updated content" };

    await expect(updateEdit.exec(null, patch)).rejects.toThrow(ValidationError);
  });

  it("should throw ValidationError when id is empty string", async () => {
    const patch = { content: "Updated content" };

    await expect(updateEdit.exec("", patch)).rejects.toThrow(ValidationError);
  });
});
