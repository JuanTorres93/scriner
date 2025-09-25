import { useState } from 'react';
import {
  goToCheckout,
  openBillingPortal,
} from '../../infrastructure/supabase/stripeConnection';
import { useUser } from '../features/authentication/hooks/useUser';

export default function PricingButtons() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleCheckout = async () => {
    try {
      setLoading(true);
      // TODO IMPORTANT: Change dynamically based on selected plan
      await goToCheckout('price_1SA9YDEt3CkqZGIjRCiCabIP');
    } finally {
      setLoading(false);
    }
  };

  const handlePortal = async () => {
    try {
      setLoading(true);
      await openBillingPortal();
    } finally {
      setLoading(false);
    }
  };

  // TODO IMPORTANT: Style these buttons
  return (
    <div>
      {user?.subscription_status === 'active' ? (
        <button onClick={handlePortal} disabled={loading}>
          Administrar suscripción
        </button>
      ) : (
        <button onClick={handleCheckout} disabled={loading}>
          Suscríbete
        </button>
      )}
    </div>
  );
}
