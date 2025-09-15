import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryEditRepo } from '../../../../src/infrastructure/memory/edit/MemoryEditRepo.js';
import { CreateEdit } from '../../../../src/application/edit/CreateEdit.js';
import { ValidationError } from '../../../../src/domain/common/errors.js';
import { EDIT_TYPES } from '../../../../src/domain/edit/editTypes.js';
import { Edit } from '../../../../src/domain/edit/Edit.js';

describe('CreateEdit Use Case', () => {
  let memoryEditsRepo;
  let createEdit;

  beforeEach(() => {
    memoryEditsRepo = new MemoryEditRepo();
    createEdit = new CreateEdit(memoryEditsRepo);
  });

  it('should create', async () => {
    const editData = {
      content: 'Test edit',
      type: EDIT_TYPES.SFX,
      scriptId: 'script-1',
    };

    const result = await createEdit.exec(editData);

    expect(result instanceof Edit).toEqual(true);
  });

  it('should throw ValidationError when edit is not provided', async () => {
    await expect(createEdit.exec()).rejects.toThrow(ValidationError);
  });

  it('should throw ValidationError when edit is null', async () => {
    await expect(createEdit.exec(null)).rejects.toThrow(ValidationError);
  });
});
