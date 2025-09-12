import { it, expect } from "vitest";
import { EDIT_TYPES } from "../../../src/domain/edit/editTypes.js";

it("EDIT_TYPES contains the expected categories", () => {
  expect(EDIT_TYPES).toMatchObject({
    SFX: "sfx",
    VFX: "vfx",
    MUSIC: "music",
    EMOTION: "emotion",
    BROLL: "broll",
  });
});
