import { describe, it, expect } from "vitest";
import { Script } from "../../../src/domain/script/Script.js";
import { ValidationError } from "../../../src/domain/common/errors.js";

describe("Script entity", () => {
  const validScriptData = {
    id: "1",
    userId: "u1",
    title: "Test Script",
    content: "Script content",
    createdAt: new Date("2025-01-01"),
  };

  it("creates a valid script with all properties", () => {
    const script = new Script(validScriptData);

    expect(script.id).toBe("1");
    expect(script.userId).toBe("u1");
    expect(script.title).toBe("Test Script");
    expect(script.content).toBe("Script content");
    expect(script.createdAt).toEqual(new Date("2025-01-01"));
  });

  it("allows content to be undefined", () => {
    const scriptData = { ...validScriptData };
    delete scriptData.content;

    expect(() => new Script(scriptData)).not.toThrow();
  });

  it("throws ValidationError when required fields are missing", () => {
    expect(() => new Script({})).toThrow(ValidationError);
    expect(() => new Script({ id: "1" })).toThrow(ValidationError);
    expect(() => new Script({ id: "1", createdAt: new Date() })).toThrow(
      ValidationError
    );
    expect(
      () => new Script({ id: "1", createdAt: new Date(), title: "T" })
    ).toThrow(ValidationError);
  });

  it("throws ValidationError for invalid createdAt", () => {
    expect(
      () =>
        new Script({
          ...validScriptData,
          createdAt: "invalid-date",
        })
    ).toThrow(ValidationError);

    expect(
      () =>
        new Script({
          ...validScriptData,
          createdAt: null,
        })
    ).toThrow(ValidationError);
  });
});
