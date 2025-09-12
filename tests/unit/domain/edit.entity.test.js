import { describe, it, expect } from "vitest";
import { Edit } from "../../../src/domain/edit/Edit.js";
import { EDIT_TYPES } from "../../../src/domain/edit/editTypes.js";
import { ValidationError } from "../../../src/domain/common/errors.js";

describe("Edit entity", () => {
  const validEditData = {
    id: "1",
    content: "Edit content",
    createdAt: new Date("2025-01-01"),
    type: EDIT_TYPES.SFX,
    isDone: false,
    scriptId: "s1",
  };

  it("creates a valid edit with all properties", () => {
    const edit = new Edit(validEditData);

    expect(edit.id).toBe("1");
    expect(edit.content).toBe("Edit content");
    expect(edit.createdAt).toEqual(new Date("2025-01-01"));
    expect(edit.type).toBe(EDIT_TYPES.SFX);
    expect(edit.isDone).toBe(false);
    expect(edit.scriptId).toBe("s1");
  });

  it("throws ValidationError for invalid edit type", () => {
    expect(
      () =>
        new Edit({
          ...validEditData,
          type: "invalid-type",
        })
    ).toThrow(ValidationError);
  });

  it("throws ValidationError when required fields are missing", () => {
    expect(() => new Edit({})).toThrow(ValidationError);
    expect(() => new Edit({ id: "1" })).toThrow(ValidationError);
    expect(() => new Edit({ id: "1", scriptId: "s1" })).toThrow(
      ValidationError
    );
  });

  it("accepts all valid edit types", () => {
    Object.values(EDIT_TYPES).forEach((type) => {
      expect(
        () =>
          new Edit({
            ...validEditData,
            type,
          })
      ).not.toThrow();
    });
  });

  it("defaults isDone to false when not provided", () => {
    const editData = { ...validEditData };
    delete editData.isDone;

    const edit = new Edit(editData);
    expect(edit.isDone).toBe(false);
  });

  it("accepts boolean values for isDone", () => {
    const doneEdit = new Edit({
      ...validEditData,
      isDone: true,
    });
    expect(doneEdit.isDone).toBe(true);

    const notDoneEdit = new Edit({
      ...validEditData,
      isDone: false,
    });
    expect(notDoneEdit.isDone).toBe(false);
  });
});
