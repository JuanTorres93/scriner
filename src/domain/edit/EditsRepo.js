/* eslint-disable no-unused-vars */

export class EditsRepo {
  async nextId() {
    throw new Error('EditsRepo: nextId Not implemented');
  }

  async getAllByScript(scriptId) {
    throw new Error('EditsRepo: getAllByScript Not implemented');
  }

  async getById(id) {
    throw new Error('EditsRepo: getById Not implemented');
  }

  async save(edit) {
    throw new Error('EditsRepo: create Not implemented');
  }

  // TODO remove when finished correct implementation
  async update(edit) {
    throw new Error('EditsRepo: update Not implemented');
  }

  async delete(id) {
    throw new Error('EditsRepo: delete Not implemented');
  }
}
