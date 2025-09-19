import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryScriptRepo } from '../../../../src/infrastructure/memory/script/MemoryScriptRepo.js';
import { MemoryEditRepo } from '../../../../src/infrastructure/memory/edit/MemoryEditRepo.js';
import { Edit } from '../../../../src/domain/edit/Edit.js';
import { EDIT_TYPES } from '../../../../src/domain/edit/editTypes.js';
import { Script } from '../../../../src/domain/script/Script.js';
import { AddEditToScript } from '../../../../src/application/script/AddEditToScript.js';
import { DeleteEdit } from '../../../../src/application/edit/DeleteEdit.js';
import { ValidationError } from '../../../../src/domain/common/errors.js';

describe('DeleteEdit Use Case', () => {
  let memoryEditsRepo;
  let memoryScriptsRepo;
  let deleteEdit;
  let addEditToScript;
  let script;

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
    deleteEdit = new DeleteEdit(memoryEditsRepo);
    addEditToScript = new AddEditToScript(memoryScriptsRepo, memoryEditsRepo);
  });

  it('should delete edit through repository', async () => {
    const edit = await addEditToScript.exec({
      id: 1,
      content: 'Test edit to delete',
      type: EDIT_TYPES.SFX,
      scriptId: script.id,
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
