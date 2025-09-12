import { describe, it, expect } from "vitest";
import { Script } from "../../../src/domain/script/Script.js";
import { ValidationError } from "../../../src/domain/common/errors.js";

describe("Script entity", () => {
  it("assigns entity properties", () => {
    const script = new Script({
      id: "1",
      userId: "u1",
      title: "T",
      content: "C",
      createdAt: new Date("2025-01-01"),
    });

    expect(script.id).toBe("1");
    expect(script.userId).toBe("u1");
    expect(script.title).toBe("T");
    expect(script.content).toBe("C");
    expect(script.createdAt).toEqual(new Date("2025-01-01"));
  });

  it("throws an error if id, createdAt, title or userId is missing", async () => {
    expect(() => new Script({})).toThrow();
    expect(() => new Script({ id: "1" })).toThrow();
    expect(
      () => new Script({ id: "1", createdAt: new Date("2025-01-01") })
    ).toThrow(ValidationError);

    expect(
      () =>
        new Script({ id: "1", createdAt: new Date("2025-01-01"), title: "T" })
    ).toThrow(ValidationError);

    expect(
      () =>
        new Script({
          id: "1",
          createdAt: new Date("2025-01-01"),
          title: "T",
          userId: "u1",
        })
    ).not.toThrow(ValidationError);
  });

  it("throws error if createdAt is not a valid date", async () => {
    expect(
      () =>
        new Script({
          id: "1",
          createdAt: "invalid-date",
          title: "T",
          userId: "u1",
        })
    ).toThrow(ValidationError);
  });
});
