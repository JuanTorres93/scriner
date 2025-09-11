import { UsersRepo } from "../../../domain/user/UsersRepo.js";
import supabase from "../client.js";
import { toEntity, toRow } from "./UserMapper.js";

// TODO create an auth service to handle signup, login, logout, and getCurrentUser?
// TODO manage toEntity and toRow when I decide how to finally implement user profiles and authentication

export class SupabaseUsersRepo extends UsersRepo {
  async signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Adds data to the newly created user
        data: {
          fullName,
          avatar: "",
        },
      },
    });

    if (error) throw new Error(error.message);

    return data;
  }

  async login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    return data;
  }

  async getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    return data?.user;
  }

  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
  }
}
