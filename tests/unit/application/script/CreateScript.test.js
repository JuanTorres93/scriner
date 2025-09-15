import { describe, it, expect, beforeEach } from 'vitest';
import { CreateScript } from '../../../../src/application/script/CreateScript.js';
import { MemoryScriptRepo } from '../../../../src/infrastructure/memory/script/MemoryScriptRepo.js';

const validScript = {
  id: 1,
  content: 'Script content',
  createdAt: new Date(),
  title: 'Script Title',
  userId: 'user-123',
};

describe('CreateScript Use Case', () => {
  let memoryScriptsRepo;
  let createScript;

  beforeEach(() => {
    memoryScriptsRepo = new MemoryScriptRepo();
    createScript = new CreateScript(memoryScriptsRepo);
  });

  it('should create script', async () => {
    const result = await createScript.exec(validScript);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('content');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('userId');
  });
});
