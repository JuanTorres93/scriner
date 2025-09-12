import { describe, it, expect, vi, beforeEach } from "vitest";
import { CreateEdit } from "../../../../src/application/edit/CreateEdit.js";
import { ValidationError } from "../../../../src/domain/common/errors.js";
import { EDIT_TYPES } from "../../../../src/domain/edit/editTypes.js";

describe("CreateEdit Use Case", () => {
  let mockEditsRepo;
  let createEdit;

  beforeEach(() => {
    mockEditsRepo = {
      create: vi.fn(),
    };
    createEdit = new CreateEdit(mockEditsRepo);
  });

  it("should create edit through repository", async () => {
    const editData = {
      content: "Test edit",
      type: EDIT_TYPES.SFX,
      scriptId: "script-1",
    };
    const expectedEdit = { id: "1", ...editData };

    mockEditsRepo.create.mockResolvedValue(expectedEdit);

    const result = await createEdit.exec(editData);

    expect(mockEditsRepo.create).toHaveBeenCalledWith(editData);
    expect(result).toEqual(expectedEdit);
  });

  it("should throw ValidationError when edit is not provided", async () => {
    await expect(createEdit.exec()).rejects.toThrow(ValidationError);
  });

  it("should throw ValidationError when edit is null", async () => {
    await expect(createEdit.exec(null)).rejects.toThrow(ValidationError);
  });
});
