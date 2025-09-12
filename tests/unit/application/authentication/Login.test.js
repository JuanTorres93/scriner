import { describe, it, expect, vi, beforeEach } from "vitest";
import { Login } from "../../../../src/application/authentication/Login.js";
import { ValidationError } from "../../../../src/domain/common/errors.js";

describe("Login Use Case", () => {
  let mockAuthService;
  let login;

  beforeEach(() => {
    mockAuthService = {
      login: vi.fn(),
    };
    login = new Login(mockAuthService);
  });

  it("should call auth service with credentials", async () => {
    const credentials = {
      email: "john@example.com",
      password: "password123",
    };
    const expectedResult = { user: { id: "1", email: "john@example.com" } };

    mockAuthService.login.mockResolvedValue(expectedResult);

    const result = await login.exec(credentials);

    expect(mockAuthService.login).toHaveBeenCalledWith(credentials);
    expect(result).toEqual(expectedResult);
  });

  it("should throw ValidationError when credentials are not provided", async () => {
    await expect(login.exec()).rejects.toThrow(ValidationError);
  });
});
