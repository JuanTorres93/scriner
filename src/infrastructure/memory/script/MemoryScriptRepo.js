import { NotFoundError } from '../../../domain/common/errors';
import { ScriptsRepo } from '../../../domain/script/ScriptsRepo';

export class MemoryScriptRepo extends ScriptsRepo {
  constructor() {
    super();
    this._scripts = new Map();
  }

  async nextId(userId) {
    const scripts = await this.getAllByUser(userId);
    const maxId = scripts.reduce((max, script) => Math.max(max, script.id), 0);
    return maxId + 1;
  }

  async getAllByUser(userId) {
    return Array.from(this._scripts.values()).filter(
      (script) => script.userId === userId
    );
  }

  async getById(id) {
    const script = this._scripts.get(id);
    if (!script) throw new NotFoundError('Script not found');
    return script;
  }

  async delete(id) {
    if (!this._scripts.has(id)) throw new NotFoundError('Script not found');
    this._scripts.delete(id);
  }

  async save(script) {
    this._scripts.set(script.id, script);
  }
}
