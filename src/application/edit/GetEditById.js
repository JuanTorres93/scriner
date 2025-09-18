import { ValidationError } from '../../domain/common/errors';

export class GetEditById {
  constructor(editsRepo) {
    this._editsRepo = editsRepo;
  }

  exec = async (id) => {
    if (!id) throw new ValidationError('GetEditById: An edit id is required');

    return this._editsRepo.getById(id);
  };
}
