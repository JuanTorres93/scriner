import { describe, it, expect, beforeEach } from 'vitest';
import { Script } from '../../../../src/domain/script/Script.js';
import { MemoryEditRepo } from '../../../../src/infrastructure/memory/edit/MemoryEditRepo.js';
import { MemoryScriptRepo } from '../../../../src/infrastructure/memory/script/MemoryScriptRepo.js';
import { GetEditsByScript } from '../../../../src/application/edit/GetEditsByScript.js';
import { AddEditToScript } from '../../../../src/application/script/AddEditToScript.js';
import { EDIT_TYPES } from '../../../../src/domain/edit/editTypes.js';
import { ValidationError } from '../../../../src/domain/common/errors.js';

describe('GetEditsByScript Use Case', () => {
  let script;
  let memoryEditsRepo;
  let memoryScriptsRepo;
  let getEditsByScript;
  let addEditToScript;

  beforeEach(() => {
    script = Script.create({
      id: 1,
      title: 'Test Script',
      createdAt: new Date(),
      userId: 1,
    });
    memoryEditsRepo = new MemoryEditRepo();
    memoryScriptsRepo = new MemoryScriptRepo();
    memoryScriptsRepo.save(script);
    getEditsByScript = new GetEditsByScript(memoryEditsRepo);
    addEditToScript = new AddEditToScript(memoryScriptsRepo, memoryEditsRepo);
  });

  it('should return an array of edits for a valid script id, even if no results are found', async () => {
    const scriptId = 2;

    const result = await getEditsByScript.exec(scriptId);

    expect(result).toEqual([]);
  });

  it('should get edits by script through repository', async () => {
    await addEditToScript.exec({
      content: 'Edit 1',
      type: EDIT_TYPES.SFX,
      scriptId: script.id,
    });

    const result = await getEditsByScript.exec(script.id);
    expect(result.length).toBe(1);
    expect(result[0].content).toBe('Edit 1');
  });

  it('should throw ValidationError when scriptId is not provided', async () => {
    await expect(getEditsByScript.exec()).rejects.toThrow(ValidationError);
  });

  it('should return empty array when script has no edits', async () => {
    const result = await getEditsByScript.exec('script-1');

    expect(result).toEqual([]);
  });
});
