export class GetCurrentUser {
  constructor(authService) {
    this.authService = authService;
  }

  exec = async () => {
    return this.authService.getCurrentUser();
  };
}
