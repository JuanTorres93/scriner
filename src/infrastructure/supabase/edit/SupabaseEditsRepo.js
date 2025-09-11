import { EditsRepo } from "../../../domain/edit/EditsRepo";
import { supabase } from "../client.js";
import { toEntity, toRow } from "./EditMapper.js";

export class SupabaseEditsRepo extends EditsRepo {
  async getAllByScript(scriptId) {
    const { data, error } = await supabase
      .from("edits")
      .select("id,scriptId,content,created_at")
      .eq("scriptId", scriptId);

    if (error) throw new Error("No se pudieron cargar las anotaciones");

    return data.map(toEntity);
  }

  async getById(id) {
    const { data, error } = await supabase
      .from("edits")
      .select("id,scriptId,content,created_at")
      .eq("id", id)
      .single();

    if (error) throw new Error("No se pudo cargar la anotación");

    return toEntity(data);
  }

  async create(edit) {
    const row = toRow(edit);
    const { data, error } = await supabase
      .from("edits")
      .insert(row)
      .select("id,scriptId,content,created_at")
      .single();

    if (error) throw new Error("No se pudo crear la anotación");

    return toEntity(data);
  }

  async update(id, edit) {
    const row = toRow(edit);
    const { data, error } = await supabase
      .from("edits")
      .update(row)
      .eq("id", id)
      .select("id,scriptId,content,created_at")
      .single();

    if (error) throw new Error("No se pudo actualizar la anotación");

    return toEntity(data);
  }

  async delete(id) {
    const { data, error } = await supabase
      .from("edits")
      .delete()
      .eq("id", id)
      .select("id,scriptId,content,created_at")
      .single();

    if (error) throw new Error("No se pudo eliminar la anotación");

    return toEntity(data);
  }
}
