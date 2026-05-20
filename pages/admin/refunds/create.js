import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://pinebookbackend.pinedigitalhub.com/api';

export default function CreateRefund() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    refund_status: 'pending', // <-- ADDED
  });

  useEffect(() => {
    async function loadFKs() {
      try {
        const [ordersRes, paymentsRes, usersRes] = await Promise.all([
          axios.get(`${API_BASE}/orders`),
          axios.get(`${API_BASE}/payments`),
          axios.get(`${API_BASE}/users`),
        ]);
        setOrders(ordersRes.data);
        setPayments(paymentsRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        setError('Failed to load form data: ' + (err.response?.data?.message || err.message));
      }
    }
    loadFKs();
  }, []);

  const availablePayments = form.order_id 
    ? payments.filter(p => String(p.order_id) === String(form.order_id))
    : [];

  useEffect(() => {
    if (form.order_id) {
      const order = orders.find(o => String(o.order_id) === String(form.order_id));
      if (order?.user_id) {
        setForm(f => ({ ...f, user_id: String(order.user_id) }));
      }
    }
  }, [form.order_id, orders]);

  useEffect(() => {
    setForm(f => ({ ...f, payment_id: '' }));
  }, [form.order_id]);

  const selectedPayment = payments.find(p => String(p.payment_id) === String(form.payment_id));
  const maxAmount = selectedPayment ? parseFloat(selectedPayment.amount) : null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setErrors({});

    try {
      await axios.post(`${API_BASE}/refunds`, {
        order_id: parseInt(form.order_id),
        payment_id: parseInt(form.payment_id),
        user_id: parseInt(form.user_id),
        reason: form.reason,
        refund_amount: parseFloat(form.refund_amount),
        refund_status: form.refund_status, // <-- ADDED
      });
      router.push('/admin/refunds');
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
        setError(err.response.data.message || 'Validation failed');
      } else {
        setError(err.response?.data?.message || err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const inputClass = (field) => `
    w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
    ${errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-300'}
    ${field === 'payment_id' && !form.order_id ? 'bg-gray-100 cursor-not-allowed' : ''}
  `;

  const statusColors = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-300',
    approved: 'bg-green-50 text-green-700 border-green-300',
    rejected: 'bg-red-50 text-red-700 border-red-300',
    processed: 'bg-blue-50 text-blue-700 border-blue-300',
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/admin/refunds" className="text-sm text-blue-600 hover:text-blue-800">
            ← Back to Refunds
          </Link>
        </div>

        <h1 className="mb-6 text-2xl font-bold text-gray-900">Request New Refund</h1>

        {error && (
          <div className="px-4 py-3 mb-4 text-red-700 border border-red-200 rounded bg-red-50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded-lg shadow">
          
          {/* ORDER */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Order <span className="text-red-500">*</span>
            </label>
            <select
              name="order_id"
              value={form.order_id}
              onChange={handleChange}
              required
              className={inputClass('order_id')}
            >
              <option value="">Select Order...</option>
              {orders.map(order => (
                <option key={order.order_id} value={order.order_id}>
                  #{order.order_id} {order.order_number ? `- ${order.order_number}` : ''} 
                  {order.total ? ` ($${order.total})` : ''}
                </option>
              ))}
            </select>
            {errors.order_id && <p className="mt-1 text-xs text-red-500">{errors.order_id}</p>}
          </div>

          {/* PAYMENT */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Payment <span className="text-red-500">*</span>
            </label>
            <select
              name="payment_id"
              value={form.payment_id}
              onChange={handleChange}
              required
              disabled={!form.order_id}
              className={inputClass('payment_id')}
            >
              <option value="">
                {!form.order_id ? 'Select an order first' : 'Select Payment...'}
              </option>
              {availablePayments.length === 0 && form.order_id ? (
                <option value="" disabled>No payments for this order</option>
              ) : (
                availablePayments.map(payment => (
                  <option key={payment.payment_id} value={payment.payment_id}>
                    #{payment.payment_id} - ${parseFloat(payment.amount).toFixed(2)} 
                    ({payment.payment_status || 'unknown'})
                  </option>
                ))
              )}
            </select>
            {errors.payment_id && <p className="mt-1 text-xs text-red-500">{errors.payment_id}</p>}
            {form.order_id && availablePayments.length === 0 && (
              <p className="mt-1 text-xs text-orange-600">No payments found for this order</p>
            )}
            {maxAmount && (
              <p className="mt-1 text-xs text-gray-500">
                Max refund: <span className="font-medium">${maxAmount.toFixed(2)}</span>
              </p>
            )}
          </div>

          {/* USER */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              User <span className="text-red-500">*</span>
            </label>
            <select
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
              required
              className={inputClass('user_id')}
            >
              <option value="">Select User...</option>
              {users.map(user => (
                <option key={user.user_id} value={user.user_id}>
                  {user.name || user.email || `User #${user.user_id}`}
                </option>
              ))}
            </select>
            {errors.user_id && <p className="mt-1 text-xs text-red-500">{errors.user_id}</p>}
          </div>

          {/* REFUND AMOUNT */}
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
                max={maxAmount || undefined}
                className={`${inputClass('refund_amount')} pl-7`}
                placeholder="0.00"
              />
            </div>
            {errors.refund_amount && <p className="mt-1 text-xs text-red-500">{errors.refund_amount}</p>}
          </div>

          {/* REFUND STATUS - NEW FIELD */}
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

          {/* REASON */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Reason
            </label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows={3}
              className={inputClass('reason')}
              placeholder="Why is this refund being requested?"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading ? 'Creating...' : 'Create Refund'}
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