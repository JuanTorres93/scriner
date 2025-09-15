import { EditsRepo } from '../../../domain/edit/EditsRepo';

export class MemoryEditRepo extends EditsRepo {
  constructor() {
    super();
    this.edits = [];
  }

  async nextId(scriptId) {
    const scriptEdits = this.edits.filter((edit) => edit.scriptId === scriptId);
    if (scriptEdits.length === 0) return 1;
    return Math.max(...scriptEdits.map((e) => e.id)) + 1;
  }

  async getAllByScript(scriptId) {
    return this.edits.filter((edit) => edit.scriptId === scriptId);
  }

  async getById(id) {
    return this.edits.find((edit) => edit.id === id) || null;
  }

  async delete(id) {
    const index = this.edits.findIndex((e) => e.id === id);
    if (index === -1) return false;
    this.edits.splice(index, 1);
    return true;
  }

  async save(edit) {
    const index = this.edits.findIndex((e) => e.id === edit.id);
    if (index === -1) {
      this.edits.push(edit);
    } else {
      this.edits[index] = edit;
    }
    return edit;
  }
}
