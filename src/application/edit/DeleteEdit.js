import { ValidationError } from '../../domain/common/errors';

export class DeleteEdit {
  constructor(editsRepo) {
    this._editsRepo = editsRepo;
  }

  exec = async (id) => {
    if (!id) throw new ValidationError('An edit id is required');
    return this._editsRepo.delete(id);
  };
}
