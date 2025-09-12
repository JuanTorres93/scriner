import { InfrastructureError } from "../../../domain/common/errors.js";
import { ScriptsRepo } from "../../../domain/script/ScriptsRepo.js";
import { toEntity, toRow } from "./ScriptMapper.js";

export class SupabaseScriptsRepo extends ScriptsRepo {
  constructor(client) {
    // Client will be supabase instance. It is passed for ease of testing/mocking.
    super();
    this.client = client;
  }

  async getAllByUser(userId) {
    const { data, error } = await this.client
      .from("scripts")
      .select("id,user_id,title,content,created_at")
      .eq("user_id", userId);

    if (error)
      throw new InfrastructureError("No se pudieron cargar los guiones", {
        cause: error,
      });

    return data.map(toEntity);
  }

  async getById(id) {
    const { data, error } = await this.client
      .from("scripts")
      .select("id,user_id,title,content,created_at")
      .eq("id", id)
      .single();

    if (error)
      throw new InfrastructureError("No se pudo cargar el guion", {
        cause: error,
      });

    return toEntity(data);
  }

  async create(script) {
    const row = toRow(script);

    const { data, error } = await this.client
      .from("scripts")
      .insert(row)
      .select("id,user_id,title,content,created_at")
      .single();

    if (error)
      throw new InfrastructureError("No se pudo crear el guion", {
        cause: error,
      });
    return toEntity(data);
  }

  async update(id, patch) {
    const row = toRow(patch);
    const { data, error } = await this.client
      .from("scripts")
      .update(row)
      .eq("id", id)
      .select("id,user_id,title,content,created_at")
      .single();
    if (error)
      throw new InfrastructureError("No se pudo actualizar el guion", {
        cause: error,
      });
    return toEntity(data);
  }

  async delete(id) {
    const { error } = await this.client.from("scripts").delete().eq("id", id);
    if (error)
      throw new InfrastructureError("No se pudo eliminar el guion", {
        cause: error,
      });
  }
}
