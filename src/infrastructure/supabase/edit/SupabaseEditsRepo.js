import { EditsRepo } from "../../../domain/edit/EditsRepo";
import { toEntity, toRow } from "./EditMapper.js";

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

    if (error) throw new Error("No se pudieron cargar las anotaciones");

    return data.map(toEntity);
  }

  async getById(id) {
    const { data, error } = await this.client
      .from("edits")
      .select("id,scriptId,content,type,isDone,created_at")
      .eq("id", id)
      .single();

    if (error) throw new Error("No se pudo cargar la anotación");

    return toEntity(data);
  }

  async create(edit) {
    const row = toRow(edit);
    const { data, error } = await this.client
      .from("edits")
      .insert(row)
      .select("id,scriptId,content,type,isDone,created_at")
      .single();

    if (error) throw new Error("No se pudo crear la anotación");

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

    if (error) throw new Error("No se pudo actualizar la anotación");

    return toEntity(data);
  }

  async delete(id) {
    const { data, error } = await this.client
      .from("edits")
      .delete()
      .eq("id", id)
      .select("id,scriptId,content,type,isDone,created_at")
      .single();

    if (error) throw new Error("No se pudo eliminar la anotación");

    return toEntity(data);
  }
}
