import { ValidationError } from '../../domain/common/errors';

export class DeleteScript {
  constructor(scriptsRepo) {
    this._scriptsRepo = scriptsRepo;
  }

  exec = async (id) => {
    if (!id)
      throw new ValidationError('DeleteScript: An script id is required');
    return this._scriptsRepo.delete(id);
  };
}
