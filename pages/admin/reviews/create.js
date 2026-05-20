import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pinebookbackend.pinedigitalhub.com/api';

export default function CreateReview() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState(null);
  const [form, setForm] = useState({
    product_id: '',
    user_id: '',
    order_id: '',
    rating: 5,
    review_title: '',
    comment: '',
  });

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const unwrap = (data) =>
      Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.products)
            ? data.products
            : Array.isArray(data?.users)
              ? data.users
              : [];

    Promise.all([
      fetch(`${API_URL}/products`, { headers }).then(r => r.ok ? r.json() : Promise.reject(new Error(`Products: ${r.status}`))),
      fetch(`${API_URL}/users`, { headers }).then(r => r.ok ? r.json() : Promise.reject(new Error(`Users: ${r.status}`))),
    ])
      .then(([prodData, userData]) => {
        setProducts(unwrap(prodData));
        setUsers(unwrap(userData));
      })
      .catch(err => {
        const msg = err?.message === 'Failed to fetch'
          ? 'Cannot reach the server to load products/users (network or CORS).'
          : err?.message || 'Failed to load products/users';
        setOptionsError(msg);
      })
      .finally(() => setOptionsLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          ...form,
          product_id: Number(form.product_id),
          user_id: Number(form.user_id),
          order_id: form.order_id ? Number(form.order_id) : null,
          rating: Number(form.rating),
        }),
      });

      if (!res.ok) {
        let serverMsg = `Request failed with status ${res.status}`;
        try {
          const body = await res.json();
          serverMsg = body?.message || body?.error || JSON.stringify(body);
        } catch (_) {
          try { serverMsg = await res.text(); } catch (_) {}
        }
        throw new Error(serverMsg);
      }
      router.push('/admin/reviews');
    } catch (err) {
      const msg = err?.message === 'Failed to fetch'
        ? 'Cannot reach the server. Check your internet connection or that the backend allows requests from this origin (CORS).'
        : err?.message || 'Failed to create review';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-8 mx-auto">
      <Link href="/admin/reviews" className="text-sm text-blue-600 hover:underline">
        ← Back to Reviews
      </Link>
      <h1 className="mt-2 mb-6 text-2xl font-bold">Create Review</h1>

      <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded-lg shadow">
        {optionsError && (
          <div className="px-4 py-3 text-sm text-red-700 border border-red-200 rounded-md bg-red-50">
            {optionsError}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Product *</label>
            <select name="product_id" value={form.product_id} onChange={handleChange} required disabled={optionsLoading}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100">
              <option value="">{optionsLoading ? 'Loading products...' : 'Select Product'}</option>
              {products.map(p => (
                <option key={p.product_id ?? p.id} value={p.product_id ?? p.id}>
                  {p.name || p.title || `Product #${p.product_id ?? p.id}`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">User *</label>
            <select name="user_id" value={form.user_id} onChange={handleChange} required disabled={optionsLoading}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100">
              <option value="">{optionsLoading ? 'Loading users...' : 'Select User'}</option>
              {users.map(u => {
                const uid = u.user_id ?? u.id;
                const display = u.name
                  || [u.first_name, u.last_name].filter(Boolean).join(' ').trim()
                  || u.email
                  || `User #${uid}`;
                return <option key={uid} value={uid}>{display}</option>;
              })}
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Order ID (optional)</label>
          <input type="number" name="order_id" value={form.order_id} onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Rating</label>
          <select name="rating" value={form.rating} onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Review Title</label>
          <input type="text" name="review_title" value={form.review_title} onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Comment</label>
          <textarea name="comment" value={form.comment} onChange={handleChange} rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={loading}
            className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Review'}
          </button>
          <Link href="/admin/reviews">
            <button type="button" className="px-6 py-2 text-gray-800 bg-gray-200 rounded hover:bg-gray-300">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}