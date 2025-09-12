import { describe, it, expect } from "vitest";
import { User } from "../../../src/domain/user/User.js";
import { ValidationError } from "../../../src/domain/common/errors.js";

describe("User Entity", () => {
  const validUserData = {
    id: "user-123",
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date("2023-01-01"),
  };

  describe("constructor", () => {
    it("should create a User with valid data", () => {
      const user = new User(validUserData);

      expect(user.id).toBe(validUserData.id);
      expect(user.name).toBe(validUserData.name);
      expect(user.email).toBe(validUserData.email);
      expect(user.createdAt).toBe(validUserData.createdAt);
    });

    it("error if createdAt is not date", () => {
      expect(() => {
        new User({
          ...validUserData,
          createdAt: undefined,
        });
      }).toThrow(ValidationError);
    });
  });
});
