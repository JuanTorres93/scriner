import { describe, it, expect } from "vitest";
import { DomainError, isDomainError, ERR } from "../../../src/domain/errors.js";
import {
  AlreadyExistsError,
  AuthError,
  ConflictError,
  InfrastructureError,
  NotFoundError,
  PermissionError,
  RateLimitError,
  ValidationError,
} from "../../../src/domain/common/errors.js";

describe("Domain errors", () => {
  it("DomainError stores code, details and cause", () => {
    const cause = new Error("original");
    const err = new DomainError("msg", {
      code: ERR.VALIDATION,
      details: { foo: 1 },
      cause,
    });

    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("DomainError");
    expect(err.code).toBe(ERR.VALIDATION);
    expect(err.details).toEqual({ foo: 1 });
    expect(err.cause).toBe(cause);
  });

  it("isDomainError recognizes instances and shape-compatible objects", () => {
    expect(isDomainError(new ValidationError("x"))).toBe(true);
    expect(isDomainError({ code: "ANY_STRING" })).toBe(true);
    expect(isDomainError(new Error("x"))).toBe(false);
  });

  it("Subclases assign correct codes", () => {
    expect(new ValidationError().code).toBe(ERR.VALIDATION);
    expect(new NotFoundError().code).toBe(ERR.NOT_FOUND);
    expect(new AlreadyExistsError().code).toBe(ERR.ALREADY_EXISTS);
    expect(new AuthError().code).toBe(ERR.AUTH);
    expect(new PermissionError().code).toBe(ERR.PERMISSION);
    expect(new RateLimitError().code).toBe(ERR.RATE_LIMIT);
    expect(new ConflictError().code).toBe(ERR.CONFLICT);
    expect(new InfrastructureError().code).toBe(ERR.INFRA);
  });
});
