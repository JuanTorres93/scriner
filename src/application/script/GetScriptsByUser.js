import { ValidationError } from '../../domain/common/errors';

export class GetScriptsByUser {
  constructor(repo) {
    this.repo = repo;
  }

  exec = async (userId) => {
    if (!userId)
      throw new ValidationError('GetScriptsByUser: A user id is required');

    return this.repo.getAllByUser(userId); // returns Script entities
  };
}
