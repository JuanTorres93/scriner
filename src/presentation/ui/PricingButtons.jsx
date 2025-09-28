import { useState } from 'react';
import Button from '../ui/Button';
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

  return (
    <div>
      {user?.subscription_status === 'active' ? (
        <Button type="secondary" onClick={handlePortal} disabled={loading}>
          Administrar suscripción
        </Button>
      ) : (
        <Button onClick={handleCheckout} disabled={loading}>
          Suscríbete
        </Button>
      )}
    </div>
  );
}
