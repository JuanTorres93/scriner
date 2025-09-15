import { describe, it, expect } from 'vitest';
import { ScriptsRepo } from '../../../src/domain/script/ScriptsRepo.js';

describe('Script contract', () => {
  it('ScriptsRepo has all required methods', async () => {
    const repo = new ScriptsRepo();
    await expect(repo.getAllByUser('u')).rejects.toThrow(/Not implemented/);
    await expect(repo.getById('1')).rejects.toThrow(/Not implemented/);
    await expect(repo.create('1')).rejects.toThrow(/Not implemented/);
    await expect(repo.update('1')).rejects.toThrow(/Not implemented/);
    await expect(repo.delete('1')).rejects.toThrow(/Not implemented/);
    await expect(repo.nextId('1')).rejects.toThrow(/Not implemented/);
  });
});
