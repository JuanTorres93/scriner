import { describe, it, expect } from "vitest";
import { Script } from "../../../src/domain/script/Script.js";

describe("Script entity", () => {
  it("assigns entity properties", () => {
    const script = new Script({
      id: "1",
      userId: "u1",
      title: "T",
      content: "C",
      createdAt: "2025-01-01",
    });

    expect(script.id).toBe("1");
    expect(script.userId).toBe("u1");
    expect(script.title).toBe("T");
    expect(script.content).toBe("C");
    expect(script.createdAt).toBe("2025-01-01");
  });
});
