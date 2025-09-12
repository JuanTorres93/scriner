import { describe, it, expect, vi, beforeEach } from "vitest";
import { Logout } from "../../../../src/application/authentication/Logout.js";

describe("Logout Use Case", () => {
  let mockAuthService;
  let logout;

  beforeEach(() => {
    mockAuthService = {
      logout: vi.fn(),
    };
    logout = new Logout(mockAuthService);
  });

  it("should call auth service logout", async () => {
    mockAuthService.logout.mockResolvedValue();

    await logout.exec();

    expect(mockAuthService.logout).toHaveBeenCalled();
  });
});
