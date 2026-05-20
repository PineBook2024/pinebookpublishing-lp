// pages/admin/orders/edit/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Save, XCircle, Loader2 } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://pinebookbackend.pinedigitalhub.com/api';

export default function EditOrder() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_BASE}/orders/${id}`, {
          headers: { 'Accept': 'application/json' }
        });
        const data = await res.json();

        if (res.ok) {
          setOrder(data);
        } else {
          setErrors({ general: [data.message || 'Order not found'] });
        }
      } catch (err) {
        setErrors({ general: ['Network error. Is Laravel running?'] });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const form = e.target;

    const payload = {
      user_id: parseInt(form.user_id.value),
      billing_address_id: form.billing_address_id.value ? parseInt(form.billing_address_id.value) : null,
      shipping_address_id: form.shipping_address_id.value ? parseInt(form.shipping_address_id.value) : null,
      coupon_id: form.coupon_id.value ? parseInt(form.coupon_id.value) : null,
      subtotal_amount: parseFloat(form.subtotal_amount.value),
      discount_amount: parseFloat(form.discount_amount.value) || 0,
      shipping_amount: parseFloat(form.shipping_amount.value) || 0,
      tax_amount: parseFloat(form.tax_amount.value) || 0,
      total_amount: parseFloat(form.total_amount.value),
      payment_status: form.payment_status.value,
      order_status: form.order_status.value,
      payment_method: form.payment_method.value || null,
      notes: form.notes.value || null
    };

    try {
      const res = await fetch(`${API_BASE}/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin/orders');
      } else {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: [data.message || 'Something went wrong'] });
        }
      }
    } catch (err) {
      setErrors({ general: ['Network error. Is Laravel running?'] });
    }
  };

  const fieldError = (name) => {
    return errors[name] ? (
      <p className="flex items-center gap-1 mt-1 text-xs text-red-600">
        <XCircle className="w-3 h-3" /> {errors[name][0]}
      </p>
    ) : null;
  };

  if (loading) {
    return (
      <>
        <Head><title>Edit Order</title></Head>
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading order...</span>
          </div>
        </div>
      </>
    );
  }

  if (!order && errors.general) {
    return (
      <>
        <Head><title>Edit Order</title></Head>
        <div className="min-h-screen p-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/admin/orders" className="p-2 bg-white border rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold">Edit Order</h1>
            </div>
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <p className="text-sm text-red-700">{errors.general[0]}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head><title>Edit Order #{id}</title></Head>
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          
          <div className="flex items-center gap-4 mb-6">
            <Link href="/admin/orders" className="p-2 bg-white border rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">Edit Order #{id}</h1>
          </div>

          {Object.keys(errors).length > 0 && (
            <div className="p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
              <h3 className="mb-2 text-sm font-bold text-red-800">Please fix these errors:</h3>
              <ul className="space-y-1">
                {Object.entries(errors).map(([field, messages]) => (
                  <li key={field} className="text-sm text-red-700">
                    <span className="font-semibold">{field}:</span> {Array.isArray(messages) ? messages.join(', ') : messages}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white border rounded-xl">

            <div>
              <label className="block mb-1 text-sm font-medium">User ID *</label>
              <input 
                type="number" 
                name="user_id" 
                required 
                defaultValue={order?.user_id || ''}
                className={`w-full px-3 py-2 border rounded-lg ${errors.user_id ? 'border-red-500 bg-red-50' : ''}`} 
              />
              {fieldError('user_id')}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Billing Address ID</label>
                <input 
                  type="number" 
                  name="billing_address_id" 
                  defaultValue={order?.billing_address_id || ''}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.billing_address_id ? 'border-red-500 bg-red-50' : ''}`} 
                />
                {fieldError('billing_address_id')}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Shipping Address ID</label>
                <input 
                  type="number" 
                  name="shipping_address_id" 
                  defaultValue={order?.shipping_address_id || ''}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.shipping_address_id ? 'border-red-500 bg-red-50' : ''}`} 
                />
                {fieldError('shipping_address_id')}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Coupon ID</label>
              <input 
                type="number" 
                name="coupon_id" 
                defaultValue={order?.coupon_id || ''}
                className={`w-full px-3 py-2 border rounded-lg ${errors.coupon_id ? 'border-red-500 bg-red-50' : ''}`} 
              />
              {fieldError('coupon_id')}
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Subtotal *</label>
                <input 
                  type="number" 
                  step="0.01" 
                  name="subtotal_amount" 
                  required 
                  defaultValue={order?.subtotal_amount || ''}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.subtotal_amount ? 'border-red-500 bg-red-50' : ''}`} 
                />
                {fieldError('subtotal_amount')}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Discount</label>
                <input 
                  type="number" 
                  step="0.01" 
                  name="discount_amount" 
                  defaultValue={order?.discount_amount || 0}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.discount_amount ? 'border-red-500 bg-red-50' : ''}`} 
                />
                {fieldError('discount_amount')}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Shipping</label>
                <input 
                  type="number" 
                  step="0.01" 
                  name="shipping_amount" 
                  defaultValue={order?.shipping_amount || 0}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.shipping_amount ? 'border-red-500 bg-red-50' : ''}`} 
                />
                {fieldError('shipping_amount')}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Tax</label>
                <input 
                  type="number" 
                  step="0.01" 
                  name="tax_amount" 
                  defaultValue={order?.tax_amount || 0}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.tax_amount ? 'border-red-500 bg-red-50' : ''}`} 
                />
                {fieldError('tax_amount')}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Total Amount *</label>
              <input 
                type="number" 
                step="0.01" 
                name="total_amount" 
                required 
                defaultValue={order?.total_amount || ''}
                className={`w-full px-3 py-2 border rounded-lg ${errors.total_amount ? 'border-red-500 bg-red-50' : ''}`} 
              />
              {fieldError('total_amount')}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Payment Status</label>
                <select 
                  name="payment_status" 
                  defaultValue={order?.payment_status || 'pending'} 
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="pending">pending</option>
                  <option value="paid">paid</option>
                  <option value="failed">failed</option>
                  <option value="refunded">refunded</option>
                  <option value="partially_refunded">partially_refunded</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Order Status</label>
                <select 
                  name="order_status" 
                  defaultValue={order?.order_status || 'pending'} 
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="pending">pending</option>
                  <option value="confirmed">confirmed</option>
                  <option value="processing">processing</option>
                  <option value="shipped">shipped</option>
                  <option value="delivered">delivered</option>
                  <option value="cancelled">cancelled</option>
                  <option value="returned">returned</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Payment Method</label>
                <select 
                  name="payment_method" 
                  defaultValue={order?.payment_method || ''}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.payment_method ? 'border-red-500 bg-red-50' : ''}`}
                >
                  <option value="">-- select --</option>
                  <option value="stripe">stripe</option>
                  <option value="paypal">paypal</option>
                  <option value="google_pay">google_pay</option>
                  <option value="cod">cod</option>
                </select>
                {fieldError('payment_method')}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Notes</label>
              <textarea 
                name="notes" 
                rows={3} 
                defaultValue={order?.notes || ''}
                className={`w-full px-3 py-2 border rounded-lg resize-none ${errors.notes ? 'border-red-500 bg-red-50' : ''}`}
              ></textarea>
              {fieldError('notes')}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Link href="/admin/orders" className="px-6 py-2.5 border rounded-lg">Cancel</Link>
              <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg">
                <Save className="w-4 h-4" /> Update Order
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}