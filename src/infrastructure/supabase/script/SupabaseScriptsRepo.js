import { InfrastructureError } from '../../../domain/common/errors.js';
import { ScriptsRepo } from '../../../domain/script/ScriptsRepo.js';
import { toEntity, toRow } from './ScriptMapper.js';

export class SupabaseScriptsRepo extends ScriptsRepo {
  constructor(client) {
    // Client will be supabase instance. It is passed for ease of testing/mocking.
    super();
    this.client = client;
  }

  async nextId() {
    // INFO: supabase does not allow direct SQL execution. scripts_next_id is a function created from their web API that returns the next id for the scripts table.
    // const { data, error } = await this.client.rpc('scripts_next_id');

    // if (error) throw error;

    // IMPORTANT The above code is commented because it INCREASED the id, making it create 2 ids per script created: one here and one when inserting the script.

    // TODO: Manage in a better way the ids. For now, return a dummy value.
    // This is not clean, but since I'm refactoring after the app was built, this is the best solution I can think of for now.

    return Number(-1);
  }

  async getAllByUser(userId) {
    const { data, error } = await this.client
      .from('scripts')
      .select('id,user_id,title,content,created_at')
      .eq('user_id', userId);

    if (error)
      throw new InfrastructureError('No se pudieron cargar los guiones', {
        cause: error,
      });

    return data.map(toEntity);
  }

  async getById(id) {
    const { data, error } = await this.client
      .from('scripts')
      .select('id,user_id,title,content,created_at')
      .eq('id', id)
      .single();

    if (error)
      throw new InfrastructureError('No se pudo cargar el guion', {
        cause: error,
      });

    return toEntity(data);
  }

  async save(script) {
    const row = toRow(script);

    delete row.id; // let supabase handle the id

    const { data, error } = await this.client
      .from('scripts')
      .insert(row)
      .select('id,user_id,title,content,created_at')
      .single();

    if (error)
      throw new InfrastructureError('No se pudo crear el guion', {
        cause: error,
      });

    const newScript = toEntity(data);
    newScript._updateId(data.id); // set the generated id
    return newScript;
  }

  async updateInPersistence(id, patch) {
    const row = toRow(patch);
    const { data, error } = await this.client
      .from('scripts')
      .update(row)
      .eq('id', id)
      .select('id,user_id,title,content,created_at')
      .single();
    if (error)
      throw new InfrastructureError('No se pudo actualizar el guion', {
        cause: error,
      });
    return toEntity(data);
  }

  async delete(id) {
    const { error } = await this.client.from('scripts').delete().eq('id', id);
    if (error)
      throw new InfrastructureError('No se pudo eliminar el guion', {
        cause: error,
      });
  }
}
