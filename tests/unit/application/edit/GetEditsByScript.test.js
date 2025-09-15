import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryEditRepo } from '../../../../src/infrastructure/memory/edit/MemoryEditRepo.js';
import { GetEditsByScript } from '../../../../src/application/edit/GetEditsByScript.js';
import { CreateEdit } from '../../../../src/application/edit/CreateEdit.js';
import { EDIT_TYPES } from '../../../../src/domain/edit/editTypes.js';
import { ValidationError } from '../../../../src/domain/common/errors.js';

describe('GetEditsByScript Use Case', () => {
  let memoryEditsRepo;
  let getEditsByScript;
  let createEdit;

  beforeEach(() => {
    memoryEditsRepo = new MemoryEditRepo();
    getEditsByScript = new GetEditsByScript(memoryEditsRepo);
    createEdit = new CreateEdit(memoryEditsRepo);
  });

  it('should return an array of edits for a valid script id, even if no results are found', async () => {
    const scriptId = 2;

    const result = await getEditsByScript.exec(scriptId);

    expect(result).toEqual([]);
  });

  it('should get edits by script through repository', async () => {
    const scriptId = 7;
    await createEdit.exec({
      content: 'Edit 1',
      type: EDIT_TYPES.SFX,
      scriptId: scriptId,
    });
    await createEdit.exec({
      content: 'Edit 2',
      type: EDIT_TYPES.BROLL,
      scriptId: scriptId,
    });

    const result = await getEditsByScript.exec(scriptId);
    expect(result.length).toBe(2);
    expect(result[0].content).toBe('Edit 1');
    expect(result[1].content).toBe('Edit 2');
  });

  it('should throw ValidationError when scriptId is not provided', async () => {
    await expect(getEditsByScript.exec()).rejects.toThrow(ValidationError);
  });

  it('should return empty array when script has no edits', async () => {
    const result = await getEditsByScript.exec('script-1');

    expect(result).toEqual([]);
  });
});
