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
          subscriptionStatus: 'trialing', // Comes from Stripe terminology. I don't want the user to have to input their payment info right away. If I change my mind, I can use trial functionality from Stripe. Remove this line here (and from DB trigger) and use the webhook instead.
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

    return data?.user;
  }

  async logout() {
    const { error } = await this.client.auth.signOut();

    if (error) throw mapSupabaseError(error);
  }
}
