import { EditsRepo } from '../../../domain/edit/EditsRepo';
import { toEntity, toRow } from './EditMapper.js';
import { InfrastructureError } from '../../../domain/common/errors.js';

export class SupabaseEditsRepo extends EditsRepo {
  constructor(client) {
    // Client will be supabase instance. It is passed for ease of testing/mocking.
    super();
    this.client = client;
  }

  async nextId() {
    // TODO: Manage in a better way the ids. For now, return a dummy value.
    // This is not clean, but since I'm refactoring after the app was built, this is the best solution I can think of for now.
    // NOTE: see SupabaseScriptsRepo for more info.

    return Number(-1);
  }

  async getAllByScript(scriptId) {
    const { data, error } = await this.client
      .from('edits')
      .select('id,scriptId,content,type,isDone,created_at')
      .eq('scriptId', scriptId);

    if (error)
      throw new InfrastructureError('No se pudieron cargar las anotaciones', {
        cause: error,
      });

    return data.map(toEntity);
  }

  async getById(id) {
    const { data, error } = await this.client
      .from('edits')
      .select('id,scriptId,content,type,isDone,created_at')
      .eq('id', id)
      .single();

    if (error)
      throw new InfrastructureError('No se pudo cargar la anotación', {
        cause: error,
      });

    return toEntity(data);
  }

  async save(edit) {
    const row = toRow(edit);

    delete row.id; // let supabase handle the id

    const { data, error } = await this.client
      .from('edits')
      .insert(row)
      .select('id,scriptId,content,type,isDone,created_at')
      .single();

    if (error)
      throw new InfrastructureError('No se pudo crear la anotación', {
        cause: error,
      });

    const newEdit = toEntity(data);
    newEdit._updateId(data.id); // set the generated id

    return newEdit;
  }

  async updateInPersistence(id, edit) {
    const row = toRow(edit);
    const { data, error } = await this.client
      .from('edits')
      .update(row)
      .eq('id', id)
      .select('id,scriptId,content,type,isDone,created_at')
      .single();

    if (error)
      throw new InfrastructureError('No se pudo actualizar la anotación', {
        cause: error,
      });

    return toEntity(data);
  }

  async delete(id) {
    const { data, error } = await this.client
      .from('edits')
      .delete()
      .eq('id', id)
      .select('id,scriptId,content,type,isDone,created_at')
      .single();

    if (error)
      throw new InfrastructureError('No se pudo eliminar la anotación', {
        cause: error,
      });

    return toEntity(data);
  }
}
