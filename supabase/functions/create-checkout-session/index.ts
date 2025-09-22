// Deno runtime
import Stripe from 'https://esm.sh/stripe@14?target=denonext';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET')!);

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
const ALLOWED_PRICE_IDS = (Deno.env.get('ALLOWED_PRICE_IDS') ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

// Basic CORS handling
function cors(res: Response) {
  const headers = new Headers(res.headers);
  headers.set('Access-Control-Allow-Origin', 'https://www.editormind.com');
  headers.set(
    'Access-Control-Allow-Headers',
    'authorization, x-client-info, apikey, content-type'
  );
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  return new Response(res.body, { ...res, headers });
}

// Start Deno server
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS')
    return cors(new Response(null, { status: 204 }));

  try {
    // Authenticate the user with token from the Authorization header
    // NOTE: In this way, ONLY logged-in users can create a checkout session
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: req.headers.get('Authorization')! } },
    });
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();
    if (authErr || !user)
      return cors(new Response('Unauthorized', { status: 401 }));

    const { price_id, quantity = 1, mode = 'subscription' } = await req.json();

    // Prevent price manipulation from client
    if (!ALLOWED_PRICE_IDS.includes(price_id)) {
      return cors(new Response('Invalid price', { status: 400 }));
    }

    // For simplicity: use the user's email (Stripe creates/links the customer)
    const session = await stripe.checkout.sessions.create({
      mode, // 'payment' | 'subscription'
      line_items: [{ price: price_id, quantity }],
      success_url: `${Deno.env.get(
        'PUBLIC_SITE_URL'
      )}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${Deno.env.get('PUBLIC_SITE_URL')}/checkout/cancelled`,
      customer_email: user.email ?? undefined,
      client_reference_id: user.id,
      metadata: { supabase_uid: user.id }, // useful for linking in the webhook
      allow_promotion_codes: true,
    });

    return cors(
      new Response(JSON.stringify({ url: session.url }), { status: 200 })
    );
  } catch (e) {
    console.error(e);
    return cors(new Response('Error creating session', { status: 500 }));
  }
});
