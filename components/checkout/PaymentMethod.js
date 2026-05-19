// components/Checkout/PaymentMethod.jsx
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentMethod({ cartItems, orderSummary, shippingAddress }) {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    if (selectedMethod === 'cod') {
      // Handle Cash on Delivery separately
      await handleCODOrder();
      return;
    }

    if (selectedMethod === 'card') {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token'); // Your auth token
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/checkout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: cartItems.map(item => ({
              product_id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image,
            })),
            customer_email: shippingAddress?.email,
            order_notes: document.getElementById('order-notes')?.value,
            shipping_address: shippingAddress,
            tax: orderSummary.tax,
            shipping: orderSummary.shipping,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create checkout session');
        }

        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (stripeError) {
          throw stripeError;
        }

      } catch (err) {
        console.error('Checkout error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    // PayPal will be handled later
    if (selectedMethod === 'paypal') {
      // TODO: PayPal integration
      alert('PayPal coming soon');
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div className="p-6 bg-white border rounded-lg">
        <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>
        
        <div className="space-y-3">
          <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
            selectedMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={selectedMethod === 'card'}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="ml-3 font-medium">Credit/Debit Card</span>
            <div className="flex gap-2 ml-auto">
              {/* Card icons */}
              <svg className="w-8 h-5" viewBox="0 0 48 32" fill="none">
                <rect width="48" height="32" rx="4" fill="#1A1F71"/>
                <text x="24" y="20" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">VISA</text>
              </svg>
              <svg className="w-8 h-5" viewBox="0 0 48 32" fill="none">
                <rect width="48" height="32" rx="4" fill="#EB001B"/>
                <circle cx="18" cy="16" r="10" fill="#EB001B"/>
                <circle cx="30" cy="16" r="10" fill="#F79E1B" opacity="0.8"/>
              </svg>
            </div>
          </label>

          <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
            selectedMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={selectedMethod === 'paypal'}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="ml-3 font-medium">PayPal</span>
            <span className="ml-auto italic font-bold text-blue-700">PayPal</span>
          </label>

          <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
            selectedMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={selectedMethod === 'cod'}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="ml-3 font-medium">Cash on Delivery</span>
          </label>
        </div>
      </div>

      {/* Order Notes */}
      <div className="p-6 bg-white border rounded-lg">
        <h2 className="mb-4 text-xl font-semibold">Order Notes</h2>
        <textarea
          id="order-notes"
          placeholder="Special instructions..."
          className="w-full h-24 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 text-red-700 border border-red-200 rounded-lg bg-red-50">
          {error}
        </div>
      )}

      {/* Place Order Button */}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full py-4 text-lg font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Processing...
          </span>
        ) : (
          `Place Order - $${orderSummary.total.toFixed(2)}`
        )}
      </button>
    </div>
  );
}