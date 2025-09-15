import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryEditRepo } from '../../../../src/infrastructure/memory/edit/MemoryEditRepo.js';
import { Edit } from '../../../../src/domain/edit/Edit.js';
import { EDIT_TYPES } from '../../../../src/domain/edit/editTypes.js';
import { CreateEdit } from '../../../../src/application/edit/CreateEdit.js';
import { DeleteEdit } from '../../../../src/application/edit/DeleteEdit.js';
import { ValidationError } from '../../../../src/domain/common/errors.js';

describe('DeleteEdit Use Case', () => {
  let memoryEditsRepo;
  let deleteEdit;
  let createEdit;

  beforeEach(() => {
    memoryEditsRepo = new MemoryEditRepo();
    deleteEdit = new DeleteEdit(memoryEditsRepo);
    createEdit = new CreateEdit(memoryEditsRepo);
  });

  it('should delete edit through repository', async () => {
    const edit = await createEdit.exec({
      id: 1,
      content: 'Test edit to delete',
      type: EDIT_TYPES.SFX,
      scriptId: 3,
    });

    expect((await memoryEditsRepo.getById(edit.id)) instanceof Edit).toBe(true);

    await deleteEdit.exec(edit.id);

    const deletedEdit = await memoryEditsRepo.getById(edit.id);

    expect(deletedEdit).toBeNull();
  });

  it('should throw ValidationError when id is not provided', async () => {
    await expect(deleteEdit.exec()).rejects.toThrow(ValidationError);
  });

  it('should throw ValidationError when id is null', async () => {
    await expect(deleteEdit.exec(null)).rejects.toThrow(ValidationError);
  });
});
