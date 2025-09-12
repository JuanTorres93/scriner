import { EditsRepo } from "../../../domain/edit/EditsRepo";
import { toEntity, toRow } from "./EditMapper.js";
import { InfrastructureError } from "../../../domain/common/errors.js";

export class SupabaseEditsRepo extends EditsRepo {
  constructor(client) {
    // Client will be supabase instance. It is passed for ease of testing/mocking.
    super();
    this.client = client;
  }

  async getAllByScript(scriptId) {
    const { data, error } = await this.client
      .from("edits")
      .select("id,scriptId,content,type,isDone,created_at")
      .eq("scriptId", scriptId);

    if (error)
      throw new InfrastructureError("No se pudieron cargar las anotaciones", {
        cause: error,
      });

    return data.map(toEntity);
  }

  async getById(id) {
    const { data, error } = await this.client
      .from("edits")
      .select("id,scriptId,content,type,isDone,created_at")
      .eq("id", id)
      .single();

    if (error)
      throw new InfrastructureError("No se pudo cargar la anotación", {
        cause: error,
      });

    return toEntity(data);
  }

  async create(edit) {
    const row = toRow(edit);
    const { data, error } = await this.client
      .from("edits")
      .insert(row)
      .select("id,scriptId,content,type,isDone,created_at")
      .single();

    if (error)
      throw new InfrastructureError("No se pudo crear la anotación", {
        cause: error,
      });

    return toEntity(data);
  }

  async update(id, edit) {
    const row = toRow(edit);
    const { data, error } = await this.client
      .from("edits")
      .update(row)
      .eq("id", id)
      .select("id,scriptId,content,type,isDone,created_at")
      .single();

    if (error)
      throw new InfrastructureError("No se pudo actualizar la anotación", {
        cause: error,
      });

    return toEntity(data);
  }

  async delete(id) {
    const { data, error } = await this.client
      .from("edits")
      .delete()
      .eq("id", id)
      .select("id,scriptId,content,type,isDone,created_at")
      .single();

    if (error)
      throw new InfrastructureError("No se pudo eliminar la anotación", {
        cause: error,
      });

    return toEntity(data);
  }
}
