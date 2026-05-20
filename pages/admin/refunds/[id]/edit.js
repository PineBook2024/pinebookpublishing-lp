import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://pinebookbackend.pinedigitalhub.com/api';

export default function EditRefund() {
  const router = useRouter();
  const { id } = router.query;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    order_id: '',
    payment_id: '',
    user_id: '',
    reason: '',
    refund_amount: '',
    refund_status: 'pending',
    processed_by: '',
  });

  useEffect(() => {
    if (!id) return;

    async function loadData() {
      try {
        const [refundRes, ordersRes, paymentsRes, usersRes] = await Promise.all([
          axios.get(`${API_BASE}/refunds/${id}`),
          axios.get(`${API_BASE}/orders`),
          axios.get(`${API_BASE}/payments`),
          axios.get(`${API_BASE}/users`),
        ]);

        const refund = refundRes.data;
        setForm({
          order_id: refund.order_id?.toString() || '',
          payment_id: refund.payment_id?.toString() || '',
          user_id: refund.user_id?.toString() || '',
          reason: refund.reason || '',
          refund_amount: refund.refund_amount?.toString() || '',
          refund_status: refund.refund_status || 'pending',
          processed_by: refund.processed_by?.toString() || '',
        });

        setOrders(ordersRes.data);
        setPayments(paymentsRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        setError('Failed to load: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = {
        order_id: parseInt(form.order_id),
        payment_id: parseInt(form.payment_id),
        user_id: parseInt(form.user_id),
        reason: form.reason,
        refund_amount: parseFloat(form.refund_amount),
        refund_status: form.refund_status,
        processed_by: form.refund_status === 'processed' ? parseInt(form.processed_by) : null,
      };

      await axios.put(`${API_BASE}/refunds/${id}`, payload);
      router.push('/admin/refunds');
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
        setError(err.response.data.message || 'Validation failed');
      } else {
        setError(err.response?.data?.message || err.message);
      }
    } finally {
      setSaving(false);
    }
  }

  const inputClass = (field) => `
    w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
    ${errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-300'}
  `;

  const statusColors = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-300',
    approved: 'bg-green-50 text-green-700 border-green-300',
    rejected: 'bg-red-50 text-red-700 border-red-300',
    processed: 'bg-blue-50 text-blue-700 border-blue-300',
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error && !form.order_id) return (
    <div className="p-8 text-center text-red-600">
      {error}
      <div className="mt-4">
        <Link href="/admin/refunds" className="text-blue-600">← Back</Link>
      </div>
    </div>
  );

  const isProcessed = form.refund_status === 'processed';

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/admin/refunds" className="text-sm text-blue-600 hover:text-blue-800">
            ← Back to Refunds
          </Link>
        </div>

        <h1 className="mb-6 text-2xl font-bold text-gray-900">Edit Refund #{id}</h1>

        {error && (
          <div className="px-4 py-3 mb-4 text-red-700 border border-red-200 rounded bg-red-50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded-lg shadow">
          
          {/* ORDER - Read Only */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Order</label>
            <input
              type="text"
              value={orders.find(o => String(o.order_id) === String(form.order_id))?.order_number || `Order #${form.order_id}`}
              disabled
              className="w-full px-3 py-2 text-gray-600 bg-gray-100 border border-gray-200 rounded-lg"
            />
            <input type="hidden" name="order_id" value={form.order_id} />
          </div>

          {/* PAYMENT - Read Only */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Payment</label>
            <input
              type="text"
              value={payments.find(p => String(p.payment_id) === String(form.payment_id)) 
                ? `Payment #${form.payment_id} - $${parseFloat(payments.find(p => String(p.payment_id) === String(form.payment_id)).amount).toFixed(2)}`
                : `Payment #${form.payment_id}`
              }
              disabled
              className="w-full px-3 py-2 text-gray-600 bg-gray-100 border border-gray-200 rounded-lg"
            />
            <input type="hidden" name="payment_id" value={form.payment_id} />
          </div>

          {/* USER - Read Only */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">User</label>
            <input
              type="text"
              value={users.find(u => String(u.user_id) === String(form.user_id))?.name || `User #${form.user_id}`}
              disabled
              className="w-full px-3 py-2 text-gray-600 bg-gray-100 border border-gray-200 rounded-lg"
            />
            <input type="hidden" name="user_id" value={form.user_id} />
          </div>

          {/* REFUND AMOUNT - Editable */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Refund Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute text-gray-500 left-3 top-2">$</span>
              <input
                type="number"
                name="refund_amount"
                value={form.refund_amount}
                onChange={handleChange}
                required
                min="0.01"
                step="0.01"
                className={`${inputClass('refund_amount')} pl-7`}
              />
            </div>
            {errors.refund_amount && <p className="mt-1 text-xs text-red-500">{errors.refund_amount}</p>}
          </div>

          {/* REASON - Editable */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Reason</label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows={3}
              className={inputClass('reason')}
            />
          </div>

          {/* REFUND STATUS - Editable */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Refund Status <span className="text-red-500">*</span>
            </label>
            <select
              name="refund_status"
              value={form.refund_status}
              onChange={handleChange}
              required
              className={`${inputClass('refund_status')} ${statusColors[form.refund_status] || ''}`}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="processed">Processed</option>
            </select>
            {errors.refund_status && <p className="mt-1 text-xs text-red-500">{errors.refund_status}</p>}
          </div>

          {/* PROCESSED BY - Shows only when status is "processed" */}
          {isProcessed && (
            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
              <label className="block mb-1 text-sm font-medium text-blue-800">
                Processed By <span className="text-red-500">*</span>
              </label>
              <select
                name="processed_by"
                value={form.processed_by}
                onChange={handleChange}
                required={isProcessed}
                className={inputClass('processed_by')}
              >
                <option value="">Select Admin...</option>
                {users.map(user => (
                  <option key={user.user_id} value={user.user_id}>
                    {user.name || user.email || `Admin #${user.user_id}`}
                  </option>
                ))}
              </select>
              {errors.processed_by && <p className="mt-1 text-xs text-red-500">{errors.processed_by}</p>}
              <p className="mt-1 text-xs text-blue-600">
                Setting status to "processed" will record the processor and timestamp.
              </p>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2 font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
            >
              {saving ? 'Saving...' : 'Update Refund'}
            </button>
            <Link href="/admin/refunds" className="flex-1">
              <button
                type="button"
                className="w-full py-2 font-medium text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}