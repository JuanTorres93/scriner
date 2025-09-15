import { ValidationError } from '../../domain/common/errors';

export class GetEditsByScript {
  constructor(editsRepo) {
    this._editsRepo = editsRepo;
  }

  exec = async (scriptId) => {
    if (!scriptId)
      throw new ValidationError('GetEditsByScript: A script id is required');

    return this._editsRepo.getAllByScript(scriptId); // returns array of Edit entities
  };
}
