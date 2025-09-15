import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryEditRepo } from '../../../../src/infrastructure/memory/edit/MemoryEditRepo.js';
import { CreateEdit } from '../../../../src/application/edit/CreateEdit.js';
import { UpdateEdit } from '../../../../src/application/edit/UpdateEdit.js';
import { EDIT_TYPES } from '../../../../src/domain/edit/editTypes.js';
import { ValidationError } from '../../../../src/domain/common/errors.js';

const validEditData = {
  content: 'Initial content',
  type: EDIT_TYPES.SFX,
  isDone: false,
  scriptId: 1,
};

describe('UpdateEdit Use Case', () => {
  let memoryEditsRepo;
  let updateEdit;
  let createEdit;

  beforeEach(() => {
    memoryEditsRepo = new MemoryEditRepo();
    updateEdit = new UpdateEdit(memoryEditsRepo);
    createEdit = new CreateEdit(memoryEditsRepo);
  });

  it('should update edit', async () => {
    const edit = await createEdit.exec(validEditData);

    const patch = {
      content: 'Updated content',
      isDone: true,
      type: EDIT_TYPES.BROLL,
    };

    const updatedEdit = await updateEdit.exec(edit.id, patch);

    expect(updatedEdit.content).toEqual(patch.content);
    expect(updatedEdit.isDone).toEqual(patch.isDone);
    expect(updatedEdit.type).toEqual(patch.type);
  });

  it('should throw ValidationError when id is not provided', async () => {
    const patch = { content: 'Updated content' };

    await expect(updateEdit.exec(null, patch)).rejects.toThrow(ValidationError);
  });

  it('should throw ValidationError when id is empty string', async () => {
    const patch = { content: 'Updated content' };

    await expect(updateEdit.exec('', patch)).rejects.toThrow(ValidationError);
  });

  it('should throw ValidationError when patch is empty', async () => {
    const edit = await createEdit.exec(validEditData);

    const patch = {};

    await expect(updateEdit.exec(edit.id, patch)).rejects.toThrow(
      ValidationError
    );
  });
});
