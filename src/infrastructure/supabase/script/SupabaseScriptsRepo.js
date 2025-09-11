import { ScriptsRepo } from "../../../domain/script/ScriptsRepo.js";
import supabase from "../client.js";
import { toEntity, toRow } from "./ScriptMapper.js";

export class SupabaseScriptsRepo extends ScriptsRepo {
  async getAllByUser(userId) {
    const { data, error } = await supabase
      .from("scripts")
      .select("id,user_id,title,content,created_at")
      .eq("user_id", userId);
    if (error) throw new Error("No se pudieron cargar los guiones");
    return data.map(toEntity);
  }

  async getById(id) {
    const { data, error } = await supabase
      .from("scripts")
      .select("id,user_id,title,content,created_at")
      .eq("id", id)
      .single();
    if (error) throw new Error("ScriptNotFound");
    return toEntity(data);
  }

  async create(script) {
    const row = toRow(script);
    const { data, error } = await supabase
      .from("scripts")
      .insert(row)
      .select("id,user_id,title,content,created_at")
      .single();
    if (error) throw new Error("No se pudo crear el guion");
    return toEntity(data);
  }

  async update(id, patch) {
    const row = toRow(patch);
    const { data, error } = await supabase
      .from("scripts")
      .update(row)
      .eq("id", id)
      .select("id,user_id,title,content,created_at")
      .single();
    if (error) throw new Error("No se pudo actualizar el guion");
    return toEntity(data);
  }

  async delete(id) {
    const { error } = await supabase.from("scripts").delete().eq("id", id);
    if (error) throw new Error("No se pudo eliminar el guion");
  }
}
