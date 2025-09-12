/* eslint-disable no-unused-vars */

// TODO create an auth service to handle signup, login, logout, and getCurrentUser?
// TODO test both user repo and auth service
export class UsersRepo {
  async signup({ fullName, email, password }) {
    throw new Error("Not implemented");
  }
  async login({ email, password }) {
    throw new Error("Not implemented");
  }
  async getCurrentUser() {
    throw new Error("Not implemented");
  }
  async logout() {
    throw new Error("Not implemented");
  }
}
