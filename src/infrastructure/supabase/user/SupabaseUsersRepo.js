import { UsersRepo } from "../../../domain/user/UsersRepo.js";
import { toEntity, toRow } from "./UserMapper.js";
import { mapSupabaseError } from "../errors.js";

// TODO IMPORTANT, when implementing/testing check this code, it has been written by GitHub Copilot.
export class SupabaseUsersRepo extends UsersRepo {
  constructor(client) {
    super();
    this.client = client;
  }

  async getById(id) {
    const { data, error } = await this.client
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // Not found
      throw mapSupabaseError(error);
    }

    return toEntity(data);
  }

  async updateProfile(id, updates) {
    const updateData = toRow(updates);

    const { data, error } = await this.client
      .from("users")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw mapSupabaseError(error);

    return toEntity(data);
  }

  async delete(id) {
    const { error } = await this.client.from("users").delete().eq("id", id);

    if (error) throw mapSupabaseError(error);
  }
}
