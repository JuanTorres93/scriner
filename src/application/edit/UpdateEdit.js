import { ValidationError } from '../../domain/common/errors';

export class UpdateEdit {
  constructor(editsRepo) {
    this._editsRepo = editsRepo;
  }

  exec = async (id, patch) => {
    if (!id) throw new ValidationError('UpdateEdit: An edit id is required');
    if (Object.keys(patch || {}).length === 0)
      throw new ValidationError('UpdateEdit: A patch is required');

    const edit = await this._editsRepo.getById(id);

    if (!edit) throw new ValidationError('UpdateEdit: Edit not found');

    const updatedEdit = await edit.update(patch);
    await this._editsRepo.updateInPersistence(id, updatedEdit);

    return updatedEdit;
  };
}
