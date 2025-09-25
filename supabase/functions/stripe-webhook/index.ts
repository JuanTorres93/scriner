/**
 * Stripe webhook handler for a Supabase Edge Function (Deno runtime).
 *
 * Responsibilities:
 * - Verify the Stripe signature using the raw request body.
 * - Update the `profiles` table with the Stripe customer id after checkout.
 * - Keep `subscription_status` in sync on subscription lifecycle events.
 *
 */

import Stripe from 'https://esm.sh/stripe@14?target=denonext';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET')!);
const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

function cors(res: Response) {
  const h = new Headers(res.headers);
  h.set('Access-Control-Allow-Origin', '*'); // webhook does not require strict CORS
  h.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  h.set('Access-Control-Allow-Headers', 'content-type, stripe-signature');
  return new Response(res.body, { ...res, headers: h });
}

Deno.serve(async (req) => {
  // Respond to CORS preflight quickly.
  if (req.method === 'OPTIONS')
    return cors(new Response(null, { status: 204 }));

  // Stripe sends the signature in this header; we must read the RAW body,
  // not JSON-parsed, otherwise signature verification will fail.
  const stripeSignature = req.headers.get('stripe-signature');
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    // Construct and verify the event using Stripe's library and the endpoint secret.
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      stripeSignature!,
      endpointSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return cors(new Response('Bad signature', { status: 400 }));
  }

  // Use the service role key to bypass RLS for trusted server-side writes.
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        // Fired after a successful Checkout. If mode is subscription,
        // ensure the Stripe customer id is linked to the user profile.
        const session = event.data.object as Stripe.Checkout.Session;
        const uid =
          session.client_reference_id ?? session.metadata?.supabase_uid;

        // TODO send confirmation email?
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        // Keep  internal subscription status in sync with Stripe.
        const sub = event.data.object as Stripe.Subscription;
        const customerId =
          typeof sub.customer === 'string' ? sub.customer : sub.customer.id;

        // TODO DELETE THESE DEBUG LOGS
        console.log('customerId');
        console.log(customerId);

        const status = sub.status; // 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | etc.

        // TODO DELETE THESE DEBUG LOGS
        console.log('status');
        console.log(status);

        const { data, error } = await supabase
          .from('profiles')
          .update({
            subscription_status: status,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId);

        // TODO DELETE THESE DEBUG LOGS
        console.log('data');
        console.log(data);
        console.log('error');
        console.log(error);
        break;
      }

      default:
        // Ignore other event types that app does not use.
        break;
    }

    // Respond 200 OK to acknowledge receipt to Stripe.
    return cors(new Response('OK', { status: 200 }));
  } catch (e) {
    // Any unhandled error should return 5xx so Stripe can retry.
    console.error('Webhook handler error', e);
    return cors(new Response('Webhook error', { status: 500 }));
  }
});
