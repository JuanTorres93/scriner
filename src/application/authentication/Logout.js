export class Logout {
  constructor(authService) {
    this.authService = authService;
  }

  exec = async () => {
    return this.authService.logout();
  };
}
