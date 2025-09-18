import { ValidationError } from '../../domain/common/errors';

export class UpdateScript {
  constructor(scriptsRepo) {
    this._scriptsRepo = scriptsRepo;
  }

  exec = async (id, patch) => {
    if (!id) throw new ValidationError('An script id is required');
    if (Object.keys(patch || {}).length === 0)
      throw new ValidationError('UpdateScript: An script patch is required');

    const script = await this._scriptsRepo.getById(id);

    if (!script) throw new ValidationError('UpdateScript: Script not found');

    // Apply patch to script
    const updatedScript = await script.update(patch);
    await this._scriptsRepo.updateInPersistence(id, updatedScript);

    return updatedScript;
  };
}
