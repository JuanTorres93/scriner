import { describe, it, expect } from 'vitest';
import { EditsRepo } from '../../../src/domain/edit/EditsRepo.js';

describe('Edit contract', () => {
  it('EditsRepo has all required methods', async () => {
    const repo = new EditsRepo();
    await expect(repo.getAllByScript('u')).rejects.toThrow(/Not implemented/);
    await expect(repo.getById('1')).rejects.toThrow(/Not implemented/);
    await expect(repo.save('1')).rejects.toThrow(/Not implemented/);
    await expect(repo.update('1')).rejects.toThrow(/Not implemented/);
    await expect(repo.delete('1')).rejects.toThrow(/Not implemented/);
  });
});
