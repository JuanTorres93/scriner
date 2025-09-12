import { describe, it, expect } from "vitest";
import { UsersRepo } from "../../../src/domain/user/UsersRepo.js";

describe("UsersRepo Interface", () => {
  it("should have all required methods defined", () => {
    const repo = new UsersRepo();
    expect(typeof repo.getById).toBe("function");
    expect(typeof repo.updateProfile).toBe("function");
    expect(typeof repo.delete).toBe("function");
  });
});
