import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetEditById } from "../../../../src/application/edit/GetEditById.js";
import { ValidationError } from "../../../../src/domain/common/errors.js";

describe("GetEditById Use Case", () => {
  let mockEditsRepo;
  let getEditById;

  beforeEach(() => {
    mockEditsRepo = {
      getById: vi.fn(),
    };
    getEditById = new GetEditById(mockEditsRepo);
  });

  it("should get edit by id through repository", async () => {
    const editId = "1";
    const expectedEdit = { id: "1", content: "Test edit" };

    mockEditsRepo.getById.mockResolvedValue(expectedEdit);

    const result = await getEditById.exec(editId);

    expect(mockEditsRepo.getById).toHaveBeenCalledWith(editId);
    expect(result).toEqual(expectedEdit);
  });

  it("should throw ValidationError when id is not provided", async () => {
    await expect(getEditById.exec()).rejects.toThrow(ValidationError);
  });

  it("should return null when edit not found", async () => {
    mockEditsRepo.getById.mockResolvedValue(null);

    const result = await getEditById.exec("999");

    expect(result).toBeNull();
  });
});
