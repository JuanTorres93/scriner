import { describe, it, expect, vi, beforeEach } from "vitest";
import { DeleteEdit } from "../../../../src/application/edit/DeleteEdit.js";
import { ValidationError } from "../../../../src/domain/common/errors.js";

describe("DeleteEdit Use Case", () => {
  let mockEditsRepo;
  let deleteEdit;

  beforeEach(() => {
    mockEditsRepo = {
      delete: vi.fn(),
    };
    deleteEdit = new DeleteEdit(mockEditsRepo);
  });

  it("should delete edit through repository", async () => {
    const editId = "1";
    mockEditsRepo.delete.mockResolvedValue();

    await deleteEdit.exec(editId);

    expect(mockEditsRepo.delete).toHaveBeenCalledWith(editId);
  });

  it("should throw ValidationError when id is not provided", async () => {
    await expect(deleteEdit.exec()).rejects.toThrow(ValidationError);
  });

  it("should throw ValidationError when id is null", async () => {
    await expect(deleteEdit.exec(null)).rejects.toThrow(ValidationError);
  });
});
