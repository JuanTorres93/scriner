import { describe, it, expect } from "vitest";
import {
  InvalidCredentialsError,
  UserAlreadyExistsError,
  SessionExpiredError,
  UnauthorizedError,
} from "../../../src/domain/authentication/errors.js";

describe("Authentication Errors", () => {
  describe("InvalidCredentialsError", () => {
    it("should create error with default message", () => {
      const error = new InvalidCredentialsError();

      expect(error.name).toBe("InvalidCredentialsError");
      expect(error.message).toBe("Invalid email or password");
      expect(error).toBeInstanceOf(Error);
    });

    it("should create error with custom message", () => {
      const customMessage = "Wrong credentials provided";
      const error = new InvalidCredentialsError(customMessage);

      expect(error.name).toBe("InvalidCredentialsError");
      expect(error.message).toBe(customMessage);
    });
  });

  describe("UserAlreadyExistsError", () => {
    it("should create error with default message", () => {
      const error = new UserAlreadyExistsError();

      expect(error.name).toBe("UserAlreadyExistsError");
      expect(error.message).toBe("User already exists");
      expect(error).toBeInstanceOf(Error);
    });

    it("should create error with custom message", () => {
      const customMessage = "Email already registered";
      const error = new UserAlreadyExistsError(customMessage);

      expect(error.name).toBe("UserAlreadyExistsError");
      expect(error.message).toBe(customMessage);
    });
  });

  describe("SessionExpiredError", () => {
    it("should create error with default message", () => {
      const error = new SessionExpiredError();

      expect(error.name).toBe("SessionExpiredError");
      expect(error.message).toBe("Session has expired");
      expect(error).toBeInstanceOf(Error);
    });

    it("should create error with custom message", () => {
      const customMessage = "Your session is no longer valid";
      const error = new SessionExpiredError(customMessage);

      expect(error.name).toBe("SessionExpiredError");
      expect(error.message).toBe(customMessage);
    });
  });

  describe("UnauthorizedError", () => {
    it("should create error with default message", () => {
      const error = new UnauthorizedError();

      expect(error.name).toBe("UnauthorizedError");
      expect(error.message).toBe("Unauthorized access");
      expect(error).toBeInstanceOf(Error);
    });

    it("should create error with custom message", () => {
      const customMessage = "Access denied to resource";
      const error = new UnauthorizedError(customMessage);

      expect(error.name).toBe("UnauthorizedError");
      expect(error.message).toBe(customMessage);
    });
  });
});
