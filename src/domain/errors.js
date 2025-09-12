export class DomainError extends Error {
  constructor(
    message,
    { code = ERR.UNKNOWN, details = undefined, cause = undefined } = {}
  ) {
    super(message);
    this.name = new.target.name; // new.target is the constructor, so this sets the name to the class name
    this.code = code; // e.g., "VALIDATION", "NOT_FOUND", "AUTH", ...
    this.details = details; // usefull payload for UI or logs
    this.cause = cause; // original error
  }
}

export function isDomainError(err) {
  return err instanceof DomainError || (err && typeof err.code === "string");
}

export const ERR = {
  VALIDATION: "VALIDATION",
  NOT_FOUND: "NOT_FOUND",
  ALREADY_EXISTS: "ALREADY_EXISTS",
  AUTH: "AUTH",
  PERMISSION: "PERMISSION",
  RATE_LIMIT: "RATE_LIMIT",
  CONFLICT: "CONFLICT",
  INFRA: "INFRA",
  UNKNOWN: "UNKNOWN",
};
