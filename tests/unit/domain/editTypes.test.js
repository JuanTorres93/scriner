import { describe, it, expect } from "vitest";
import { EDIT_TYPES } from "../../../src/domain/edit/editTypes.js";

describe("Edit Types", () => {
  it("contains all expected edit type categories", () => {
    expect(EDIT_TYPES).toMatchObject({
      SFX: "sfx",
      VFX: "vfx",
      MUSIC: "music",
      EMOTION: "emotion",
      BROLL: "broll",
    });
  });

  it("has no duplicate values", () => {
    const values = Object.values(EDIT_TYPES);
    const uniqueValues = [...new Set(values)];
    expect(values).toHaveLength(uniqueValues.length);
  });
});
