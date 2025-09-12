import { describe, it, expect } from "vitest";
import { Script } from "../../../src/domain/script/Script.js";

describe("Script entity", () => {
  it("assigns entity properties", () => {
    const s = new Script({
      id: "1",
      userId: "u1",
      title: "T",
      content: "C",
      createdAt: "2025-01-01",
    });

    expect(s.id).toBe("1");
    expect(s.userId).toBe("u1");
    expect(s.title).toBe("T");
    expect(s.content).toBe("C");
    expect(s.createdAt).toBe("2025-01-01");
  });
});
