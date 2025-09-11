import { ScriptsRepo } from "../../domain/script/ScriptsRepo.js";
import { Script } from "../../domain/script/Script.js";

// Funciones de mapeo DTO <-> Entidad (aislan cambios de esquema)
function toEntity(row) {
  if (!row) return null;
  return new Script({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    content: row.content,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });
}

function toRow(input) {
  // Normaliza claves del dominio a columnas DB
  return {
    id: input.id,
    user_id: input.userId,
    title: input.title,
    content: input.content,
  };
}

export class SupabaseScriptsRepo extends ScriptsRepo {
  constructor(supabase) {
    super();
    this.db = supabase; // inyecta el cliente ya configurado
  }

  async getAllByUser(userId) {
    const { data, error } = await this.db
      .from("scripts")
      .select("id,user_id,title,content,created_at,updated_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data || []).map(toEntity);
  }

  async getById(id) {
    const { data, error } = await this.db
      .from("scripts")
      .select("id,user_id,title,content,created_at,updated_at")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return toEntity(data);
  }

  async create(scriptInput) {
    const row = toRow(scriptInput);
    const { data, error } = await this.db
      .from("scripts")
      .insert(row)
      .select("id,user_id,title,content,created_at,updated_at")
      .single();

    if (error) throw new Error("No se pudo crear el guion");
    return toEntity(data);
  }

  async update(id, patch) {
    const row = toRow(patch);
    const { data, error } = await this.db
      .from("scripts")
      .update(row)
      .eq("id", id)
      .select("id,user_id,title,content,created_at,updated_at")
      .single();

    if (error) throw new Error("No se pudo actualizar el guion");
    return toEntity(data);
  }

  async delete(id) {
    const { error } = await this.db.from("scripts").delete().eq("id", id);
    if (error) throw new Error("No se pudo eliminar el guion");
    return true;
  }
}
