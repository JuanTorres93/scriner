import { describe, it, expect, vi, beforeEach } from "vitest";
import { Signup } from "../../../../src/application/authentication/Signup.js";
import { ValidationError } from "../../../../src/domain/common/errors.js";

describe("Signup Use Case", () => {
  let mockAuthService;
  let signup;

  beforeEach(() => {
    mockAuthService = {
      signup: vi.fn(),
    };
    signup = new Signup(mockAuthService);
  });

  it("should call auth service with provided data", async () => {
    const userData = {
      fullName: "John Doe",
      email: "john@example.com",
      password: "password123",
    };
    const expectedResult = { user: { id: "1", email: "john@example.com" } };

    mockAuthService.signup.mockResolvedValue(expectedResult);

    const result = await signup.exec(userData);

    expect(mockAuthService.signup).toHaveBeenCalledWith(userData);
    expect(result).toEqual(expectedResult);
  });

  it("should throw ValidationError when user data is not provided", async () => {
    await expect(signup.exec()).rejects.toThrow(ValidationError);
  });
});
