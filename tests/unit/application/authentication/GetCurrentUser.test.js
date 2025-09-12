import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetCurrentUser } from "../../../../src/application/authentication/GetCurrentUser.js";

describe("GetCurrentUser Use Case", () => {
  let mockAuthService;
  let getCurrentUser;

  beforeEach(() => {
    mockAuthService = {
      getCurrentUser: vi.fn(),
    };
    getCurrentUser = new GetCurrentUser(mockAuthService);
  });

  it("should return current user from auth service", async () => {
    const expectedUser = { id: "1", email: "john@example.com" };
    mockAuthService.getCurrentUser.mockResolvedValue(expectedUser);

    const result = await getCurrentUser.exec();

    expect(mockAuthService.getCurrentUser).toHaveBeenCalled();
    expect(result).toEqual(expectedUser);
  });

  it("should return null when no user is authenticated", async () => {
    mockAuthService.getCurrentUser.mockResolvedValue(null);

    const result = await getCurrentUser.exec();

    expect(result).toBeNull();
  });
});
