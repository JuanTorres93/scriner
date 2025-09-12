import { describe, it, expect } from "vitest";
import { Edit } from "../../../src/domain/edit/Edit";
import { EDIT_TYPES } from "../../../src/domain/edit/editTypes";
import { ValidationError } from "../../../src/domain/common/errors";

describe("Edit entity", () => {
  it("assigns entity properties", () => {
    const edit = new Edit({
      id: "1",
      content: "C",
      createdAt: "2025-01-01",
      type: EDIT_TYPES.SFX,
      isDone: false,
      scriptId: "s1",
    });

    expect(edit.id).toBe("1");
    expect(edit.content).toBe("C");
    expect(edit.createdAt).toBe("2025-01-01");
    expect(edit.type).toBe(EDIT_TYPES.SFX);
    expect(edit.isDone).toBe(false);
    expect(edit.scriptId).toBe("s1");
  });

  it("throws error if edit type is not predefined", () => {
    expect(() => {
      new Edit({
        id: "1",
        content: "C",
        createdAt: "2025-01-01",
        type: "invalid-type",
        isDone: false,
        scriptId: "s1",
      });
    }).toThrow(ValidationError);
  });
});
