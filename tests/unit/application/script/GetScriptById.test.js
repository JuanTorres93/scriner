import { describe, it, expect, beforeEach } from 'vitest';
import { Script } from '../../../../src/domain/script/Script.js';
import { GetScriptById } from '../../../../src/application/script/GetScriptById.js';
import { CreateScript } from '../../../../src/application/script/CreateScript.js';
import { ValidationError } from '../../../../src/domain/common/errors.js';
import { MemoryScriptRepo } from '../../../../src/infrastructure/memory/script/MemoryScriptRepo.js';

describe('GetScriptById Use Case', () => {
  let memoryScriptRepo;
  let getScriptById;
  let createScript;

  beforeEach(() => {
    memoryScriptRepo = new MemoryScriptRepo();
    getScriptById = new GetScriptById(memoryScriptRepo);
    createScript = new CreateScript(memoryScriptRepo);

    // Pre-populate the repository with a script
    createScript.exec({
      userId: 'u1',
      title: 'Test Script',
      content: 'Script content',
    });
  });

  it('should get script by id through repository', async () => {
    const scriptId = 1;

    const foundScript = await getScriptById.exec(scriptId);

    expect(foundScript instanceof Script).toBe(true);
    expect(foundScript.id).toBe(scriptId);
  });

  it('should throw ValidationError when id is not provided', async () => {
    await expect(getScriptById.exec()).rejects.toThrow(ValidationError);
  });
});
