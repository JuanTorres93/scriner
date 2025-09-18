import { describe, it, expect, beforeEach } from 'vitest';
import { Script } from '../../../../src/domain/script/Script.js';
import { Edit } from '../../../../src/domain/edit/Edit.js';
import { AddEditToScript } from '../../../../src/application/script/AddEditToScript.js';
import { MemoryScriptRepo } from '../../../../src/infrastructure/memory/script/MemoryScriptRepo.js';
import { MemoryEditRepo } from '../../../../src/infrastructure/memory/edit/MemoryEditRepo.js';
import { EDIT_TYPES } from '../../../../src/domain/edit/editTypes.js';

describe('AddEditToScript Use Case', () => {
  let addEditToScript;
  let memoryScriptRepo;
  let memoryEditsRepo;

  beforeEach(() => {
    memoryScriptRepo = new MemoryScriptRepo();
    memoryEditsRepo = new MemoryEditRepo();
    addEditToScript = new AddEditToScript(memoryScriptRepo, memoryEditsRepo);
  });

  it('should add a new edit to a script', async () => {
    const script = Script.create({
      id: 1,
      content: 'Script content',
      createdAt: new Date(),
      title: 'Script Title',
      userId: 'user-123',
    });

    await memoryScriptRepo.save(script);

    const edit = {
      scriptId: script.id,
      type: EDIT_TYPES.SFX,
      content: 'New content',
    };

    const result = await addEditToScript.exec(edit);

    expect(result instanceof Edit).toBe(true);
    expect(result.content).toBe('New content');
    expect(result.type).toBe(EDIT_TYPES.SFX);
    expect(result.scriptId).toBe(script.id);
  });
});
