import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryEditRepo } from '../../../../src/infrastructure/memory/edit/MemoryEditRepo.js';
import { GetEditById } from '../../../../src/application/edit/GetEditById.js';
import { CreateEdit } from '../../../../src/application/edit/CreateEdit.js';
import { EDIT_TYPES } from '../../../../src/domain/edit/editTypes.js';
import { ValidationError } from '../../../../src/domain/common/errors.js';

describe('GetEditById Use Case', () => {
  let memoryEditsRepo;
  let getEditById;
  let createEdit;

  beforeEach(() => {
    memoryEditsRepo = new MemoryEditRepo();
    getEditById = new GetEditById(memoryEditsRepo);
    createEdit = new CreateEdit(memoryEditsRepo);
  });

  it('should get edit by id through repository', async () => {
    const expectedEdit = await createEdit.exec({
      id: 1,
      content: 'Test edit',
      type: EDIT_TYPES.SFX,
      scriptId: 6,
    });

    const result = await getEditById.exec(expectedEdit.id);

    expect(result).toEqual(expectedEdit);
  });

  it('should throw ValidationError when id is not provided', async () => {
    await expect(getEditById.exec()).rejects.toThrow(ValidationError);
  });

  it('should return null when edit not found', async () => {
    const result = await getEditById.exec(999);

    expect(result).toBeNull();
  });
});
