import { UsersRepo } from "../../../domain/user/UsersRepo.js";
import { toEntity, toRow } from "./UserMapper.js";

// TODO create an auth service to handle signup, login, logout, and getCurrentUser?
// TODO manage toEntity and toRow when I decide how to finally implement user profiles and authentication

export class SupabaseUsersRepo extends UsersRepo {
  constructor(client) {
    // Client will be supabase instance. It is passed for ease of testing/mocking.
    super();
    this.client = client;
  }

  async signup({ fullName, email, password }) {
    const { data, error } = await this.client.auth.signUp({
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
    const { data, error } = await this.client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    return data;
  }

  async getCurrentUser() {
    const { data: session } = await this.client.auth.getSession();

    if (!session.session) return null;

    const { data, error } = await this.client.auth.getUser();

    if (error) throw new Error(error.message);

    return data?.user;
  }

  async logout() {
    const { error } = await this.client.auth.signOut();

    if (error) throw new Error(error.message);
  }
}
