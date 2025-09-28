// Deno runtime
import Stripe from 'https://esm.sh/stripe@14?target=denonext';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET')!);

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!; // To write in profiles if needed (Create stripe customer ID, etc)
const PUBLIC_SITE_URL = Deno.env.get('PUBLIC_SITE_URL')!;
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
    // 1) Authentication
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

    // 2) Parse body
    const { price_id } = await req.json();
    const quantity = 1;
    const mode = 'subscription'; // 'payment' for one-time, 'subscription' for recurring

    // Prevent price manipulation from client
    if (!ALLOWED_PRICE_IDS.includes(price_id)) {
      return cors(new Response('Invalid price', { status: 400 }));
    }

    // 3) Find / Create Stripe Customer
    const supabaseNoRLS = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
    const { data: profile } = await supabaseNoRLS
      .from('profiles')
      .select('id, user_id, username, stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    let customerId = profile?.stripe_customer_id ?? null;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_uid: user.id },
        name: profile?.username ?? undefined,
      });
      customerId = customer.id;

      await supabaseNoRLS
        .from('profiles')
        .update({
          stripe_customer_id: customerId,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);
    }

    // 4) Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode, // 'payment' | 'subscription'
      line_items: [{ price: price_id, quantity }],
      success_url: `${PUBLIC_SITE_URL}/app`,
      cancel_url: `${PUBLIC_SITE_URL}`,
      customer: customerId,
      client_reference_id: user.id,
      metadata: { supabase_uid: user.id }, // useful for linking in the webhook
      allow_promotion_codes: true,

      // Taxes (Stripe Tax)
      automatic_tax: { enabled: true }, // Must be enabled in Stripe Dashboard

      // Billing address and save in customer
      billing_address_collection: 'auto',
      customer_update: { address: 'auto' },

      // NOTE: VAT / NIF (If Business to business in the future)
      // tax_id_collection: { enabled: true }, // opcional: required: 'if_supported'
    });

    return cors(
      new Response(JSON.stringify({ url: session.url }), { status: 200 })
    );
  } catch (e) {
    console.error(e);
    return cors(new Response('Error creating session', { status: 500 }));
  }
});
