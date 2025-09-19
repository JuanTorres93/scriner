import { describe, it, expect, beforeEach } from 'vitest';
import { Script } from '../../../../src/domain/script/Script.js';
import { MemoryEditRepo } from '../../../../src/infrastructure/memory/edit/MemoryEditRepo.js';
import { MemoryScriptRepo } from '../../../../src/infrastructure/memory/script/MemoryScriptRepo.js';
import { GetEditById } from '../../../../src/application/edit/GetEditById.js';
import { AddEditToScript } from '../../../../src/application/script/AddEditToScript.js';
import { EDIT_TYPES } from '../../../../src/domain/edit/editTypes.js';
import { ValidationError } from '../../../../src/domain/common/errors.js';

describe('GetEditById Use Case', () => {
  let memoryEditsRepo;
  let memoryScriptsRepo;
  let getEditById;
  let addEditToScript;
  let script;

  beforeEach(() => {
    script = Script.create({
      id: 6,
      title: 'Test Script',
      createdAt: new Date(),
      userId: 1,
    });
    memoryEditsRepo = new MemoryEditRepo();
    memoryScriptsRepo = new MemoryScriptRepo();
    memoryScriptsRepo.save(script);
    getEditById = new GetEditById(memoryEditsRepo);
    addEditToScript = new AddEditToScript(memoryScriptsRepo, memoryEditsRepo);
  });

  it('should get edit by id through repository', async () => {
    const expectedEdit = await addEditToScript.exec({
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
