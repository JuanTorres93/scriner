import { describe, it, expect, beforeEach } from 'vitest';
import { Script } from '../../../../src/domain/script/Script.js';
import { MemoryScriptRepo } from '../../../../src/infrastructure/memory/script/MemoryScriptRepo.js';
import { UpdateScript } from '../../../../src/application/script/UpdateScript.js';
import { ValidationError } from '../../../../src/domain/common/errors.js';

describe('UpdateScript Use Case', () => {
  let memoryScriptsRepo;
  let updateScript;

  beforeEach(() => {
    memoryScriptsRepo = new MemoryScriptRepo();
    updateScript = new UpdateScript(memoryScriptsRepo);
  });

  it('should update script', async () => {
    const script = Script.create({
      id: 1,
      userId: 1,
      title: 'Original Title',
      createdAt: new Date('2023-01-01'),
    });
    await memoryScriptsRepo.save(script);

    const patch = { title: 'Updated Title' };

    const result = await updateScript.exec(script.id, patch);

    expect(result.title).toEqual(patch.title);
  });

  it('should throw ValidationError when id is not provided', async () => {
    const patch = { title: 'Updated Title' };

    await expect(updateScript.exec(null, patch)).rejects.toThrow(
      ValidationError
    );
  });

  it('should throw ValidationError when id is empty string', async () => {
    const patch = { title: 'Updated Title' };

    await expect(updateScript.exec('', patch)).rejects.toThrow(ValidationError);
  });
});
