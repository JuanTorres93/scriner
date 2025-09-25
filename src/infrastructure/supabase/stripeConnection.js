import supabase from './client';

export async function goToCheckout(priceId) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Not authenticated');

  const res = await fetch(
    `${import.meta.env.VITE_EDGE_URL}/create-checkout-session`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        price_id: priceId,
        mode: 'subscription',
        quantity: 1,
      }),
    }
  );

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Checkout failed: ${msg}`);
  }

  const { url } = await res.json();
  window.location.href = url;
}

export async function openBillingPortal() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Not authenticated');

  const res = await fetch(`${import.meta.env.VITE_EDGE_URL}/billing-portal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Portal failed: ${msg}`);
  }

  const { url } = await res.json();
  window.location.href = url;
}
