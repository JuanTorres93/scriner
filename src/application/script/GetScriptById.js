import { ValidationError } from '../../domain/common/errors';

export class GetScriptById {
  constructor(scriptRepo) {
    this._scriptRepo = scriptRepo;
  }

  exec = async (id) => {
    if (!id) throw new ValidationError('An script id is required');
    return this._scriptRepo.getById(id);
  };
}
