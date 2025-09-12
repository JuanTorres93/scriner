import { AuthError } from "../common/errors";

export class InvalidCredentialsError extends AuthError {
  constructor(message = "Invalid email or password") {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}

export class UserAlreadyExistsError extends AuthError {
  constructor(message = "User already exists") {
    super(message);
    this.name = "UserAlreadyExistsError";
  }
}

export class SessionExpiredError extends AuthError {
  constructor(message = "Session has expired") {
    super(message);
    this.name = "SessionExpiredError";
  }
}

export class UnauthorizedError extends AuthError {
  constructor(message = "Unauthorized access") {
    super(message);
    this.name = "UnauthorizedError";
  }
}
