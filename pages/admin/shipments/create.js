import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pinebookbackend.pinedigitalhub.com/api';

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'packed', label: 'Packed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'in_transit', label: 'In Transit' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'returned', label: 'Returned' },
];

export default function CreateShipment() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [orderId, setOrderId] = useState('');
  const [courierName, setCourierName] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shippingStatus, setShippingStatus] = useState('pending');
  const [shippedAt, setShippedAt] = useState('');
  const [deliveredAt, setDeliveredAt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!orderId || orderId === '') {
      setError('Order ID is required');
      return;
    }

    setLoading(true);

    try {
      // ====== PROPER PAYLOAD BUILDING ======
      const payload = {
        order_id: parseInt(orderId, 10),
        courier_name: courierName.trim() === '' ? null : courierName.trim(),
        tracking_number: trackingNumber.trim() === '' ? null : trackingNumber.trim(),
        shipping_status: shippingStatus,
      };

      // Sirf tab bhejo jab value ho AUR status allow kare
      if (shippedAt && shippedAt !== '') {
        payload.shipped_at = shippedAt; // Format: 2026-04-24T17:36
      }
      
      if (deliveredAt && deliveredAt !== '') {
        payload.delivered_at = deliveredAt;
      }

      console.log('Sending:', payload);

      const res = await fetch(`${API_URL}/shipments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('Response:', data);

      if (!res.ok) {
        throw new Error(data.message || `HTTP ${res.status}`);
      }

      router.push('/admin/shipments');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 bg-white text-base";
  const labelClass = "block text-sm font-bold text-gray-800 mb-2";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl px-6 py-6 mx-auto">
          <Link href="/admin/shipments" className="block mb-4 text-sm text-gray-500 hover:text-blue-600">
            ← Back to Shipments
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create Shipment</h1>
        </div>
      </div>

      <div className="max-w-2xl px-6 py-8 mx-auto">
        {error && (
          <div className="p-4 mb-6 border-2 border-red-200 rounded-lg bg-red-50">
            <p className="font-bold text-red-700">Error: {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white border-2 border-gray-200 rounded-xl">

          {/* Order ID */}
          <div>
            <label className={labelClass}>
              Order ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="Enter order ID"
              className={inputClass}
            />
          </div>

          {/* Courier Name */}
          <div>
            <label className={labelClass}>Courier Name</label>
            <input
              type="text"
              value={courierName}
              onChange={(e) => setCourierName(e.target.value)}
              placeholder="e.g. DHL, FedEx, UPS"
              className={inputClass}
            />
          </div>

          {/* Tracking Number */}
          <div>
            <label className={labelClass}>Tracking Number</label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number"
              className={inputClass}
            />
          </div>

          {/* Shipping Status */}
          <div>
            <label className={labelClass}>
              Shipping Status <span className="text-red-500">*</span>
            </label>
            <select
              value={shippingStatus}
              onChange={(e) => setShippingStatus(e.target.value)}
              className={inputClass}
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Shipped At */}
          <div>
            <label className={labelClass}>Shipped At</label>
            <input
              type="datetime-local"
              value={shippedAt}
              onChange={(e) => setShippedAt(e.target.value)}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-gray-400">
              {shippingStatus === 'pending' || shippingStatus === 'packed' 
                ? 'Will be cleared for Pending/Packed status' 
                : 'Leave empty to auto-set'}
            </p>
          </div>

          {/* Delivered At */}
          <div>
            <label className={labelClass}>Delivered At</label>
            <input
              type="datetime-local"
              value={deliveredAt}
              onChange={(e) => setDeliveredAt(e.target.value)}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-gray-400">
              {shippingStatus === 'delivered' 
                ? 'Leave empty to auto-set to now' 
                : 'Will be cleared for non-delivered status'}
            </p>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-6 border-t-2 border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Shipment'}
            </button>
            <Link href="/admin/shipments">
              <button type="button" className="px-6 py-3 font-bold text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}