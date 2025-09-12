import { describe, it, expect } from "vitest";
import { AuthService } from "../../../src/domain/authentication/AuthService.js";

describe("AuthService Interface", () => {
  it("should have all required methods defined", () => {
    const authService = new AuthService();
    expect(typeof authService.signup).toBe("function");
    expect(typeof authService.login).toBe("function");
    expect(typeof authService.getCurrentUser).toBe("function");
    expect(typeof authService.logout).toBe("function");
  });
});
