// /functions/billing-portal/index.ts

/**
 * Creates a Stripe Billing Portal session for the currently authenticated user.
 *
 * Flow:
 * 1) Validate CORS / preflight (OPTIONS).
 * 2) Use the Supabase ANON key + the client's Authorization header (JWT) to fetch the user.
 * 3) Look up the user's `stripe_customer_id` in `profiles`.
 * 4) Create a Billing Portal session for that customer and return the URL.
 *
 * Requirements:
 * - In Stripe Dashboard, ensure Billing Portal is enabled and configured (branding, features, etc.).
 */

import Stripe from 'https://esm.sh/stripe@14?target=denonext';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET')!);

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;

// Where Stripe will send the user after they exit the Billing Portal
const RETURN_URL = Deno.env.get('PUBLIC_SITE_URL')! + '/app';

function cors(res: Response) {
  const h = new Headers(res.headers);
  h.set('Access-Control-Allow-Origin', 'https://www.editormind.com');
  h.set(
    'Access-Control-Allow-Headers',
    'authorization, x-client-info, apikey, content-type'
  );
  h.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  return new Response(res.body, { ...res, headers: h });
}

Deno.serve(async (req) => {
  // Handle preflight quickly for browsers
  if (req.method === 'OPTIONS')
    return cors(new Response(null, { status: 204 }));

  try {
    // Create a Supabase client that forwards the caller's JWT.
    // This allows us to get the currently authenticated user.
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: req.headers.get('Authorization')! } },
    });

    // If there is no valid JWT, `user` will be null.
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return cors(new Response('Unauthorized', { status: 401 }));

    // Fetch the Stripe customer id for this user from `profiles` table.
    // RLS should allow the user to read their own row.
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    // If the profile is missing or hasn't been linked to a Stripe customer yet, bail out.
    if (error || !profile?.stripe_customer_id) {
      return cors(new Response('Missing customer', { status: 400 }));
    }

    // Create a Billing Portal session for that Stripe customer.
    // The portal lets users update payment method, view invoices, cancel plan, etc.
    const portal = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: RETURN_URL,
    });

    // Return the portal URL to the frontend so it can redirect the user.
    return cors(
      new Response(JSON.stringify({ url: portal.url }), { status: 200 })
    );
  } catch (e) {
    // Any unexpected error gets logged; client receives a generic 500.
    console.error(e);
    return cors(new Response('Error creating portal session', { status: 500 }));
  }
});
