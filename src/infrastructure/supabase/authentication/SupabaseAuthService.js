import { AuthService } from '../../../domain/authentication/AuthService.js';
import { mapSupabaseError } from '../errors.js';

export class SupabaseAuthService extends AuthService {
  constructor(client) {
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
        },
        emailRedirectTo: `${window.location.origin}/app`,
      },
    });

    if (error) throw mapSupabaseError(error);

    return data;
  }

  async login({ email, password }) {
    const { data, error } = await this.client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw mapSupabaseError(error);

    return data;
  }

  async getCurrentUser() {
    const { data: session } = await this.client.auth.getSession();

    if (!session.session) return null;

    const { data, error } = await this.client.auth.getUser();

    if (error) throw mapSupabaseError(error);

    // join with profile data
    const { data: profile, error: profileError } = await this.client
      .from('profiles')
      .select('subscription_status,trial_ends_at')
      .eq('user_id', data?.user?.id)
      .single();

    if (profileError) throw mapSupabaseError(profileError);

    return { ...data?.user, ...profile };
  }

  async logout() {
    const { error } = await this.client.auth.signOut();

    if (error) throw mapSupabaseError(error);
  }
}
