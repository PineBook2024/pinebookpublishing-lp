import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pinebookbackend.pinedigitalhub.com/api';

export default function EditShipment() {
  const router = useRouter();
  const { id } = router.query;
  
  // Simple state - one object
  const [form, setForm] = useState({
    courier_name: '',
    tracking_number: '',
    shipping_status: 'pending',
    shipped_at: '',
    delivered_at: '',
    order_id: '',
    created_at: '',
    updated_at: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load data
  useEffect(() => {
    if (!id) return;
    
    fetch(`${API_URL}/shipments/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          courier_name: data.courier_name || '',
          tracking_number: data.tracking_number || '',
          shipping_status: data.shipping_status || 'pending',
          shipped_at: data.shipped_at ? data.shipped_at.slice(0, 16) : '',
          delivered_at: data.delivered_at ? data.delivered_at.slice(0, 16) : '',
          order_id: data.order_id?.toString() || '',
          created_at: data.created_at ? data.created_at.slice(0, 16).replace('T', ' ') : '',
          updated_at: data.updated_at ? data.updated_at.slice(0, 16).replace('T', ' ') : ''
        });
        setLoading(false);
      });
  }, [id]);

  // Simple change handler
  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      courier_name: form.courier_name || null,
      tracking_number: form.tracking_number || null,
      shipping_status: form.shipping_status,
      shipped_at: form.shipped_at || null,
      delivered_at: form.delivered_at || null
    };

    await fetch(`${API_URL}/shipments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    router.push('/admin/shipments');
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-xl mx-auto">
        <Link href="/admin/shipments" className="block mb-4 text-blue-600 hover:underline">← Back</Link>
        <h1 className="mb-6 text-2xl font-bold">Edit Shipment #{id}</h1>

        {/* Order Info */}
        <div className="p-4 mb-6 rounded-lg bg-blue-50">
          <p className="text-sm text-gray-600">Order ID: <span className="font-bold">#{form.order_id}</span></p>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4 bg-white rounded-lg shadow">

          {/* Courier Name */}
          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700">Courier Name</label>
            <input
              type="text"
              name="courier_name"
              value={form.courier_name}
              onChange={change}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Tracking Number */}
          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700">Tracking Number</label>
            <input
              type="text"
              name="tracking_number"
              value={form.tracking_number}
              onChange={change}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Shipping Status */}
          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700">Status</label>
            <select
              name="shipping_status"
              value={form.shipping_status}
              onChange={change}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="packed">Packed</option>
              <option value="shipped">Shipped</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="returned">Returned</option>
            </select>
          </div>

          {/* Shipped At */}
          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700">Shipped At</label>
            <input
              type="datetime-local"
              name="shipped_at"
              value={form.shipped_at}
              onChange={change}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Delivered At */}
          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700">Delivered At</label>
            <input
              type="datetime-local"
              name="delivered_at"
              value={form.delivered_at}
              onChange={change}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Read Only Timestamps */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-bold text-gray-700">Created</label>
              <input type="text" value={form.created_at} readOnly className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block mb-1 text-sm font-bold text-gray-700">Updated</label>
              <input type="text" value={form.updated_at} readOnly className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={saving} className="flex-1 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save'}
            </button>
            <Link href="/admin/shipments">
              <button type="button" className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50">Cancel</button>
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}