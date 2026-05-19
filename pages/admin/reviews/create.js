import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function CreateReview() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    product_id: '',
    user_id: '',
    order_id: '',
    rating: 5,
    review_title: '',
    comment: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          product_id: Number(form.product_id),
          user_id: Number(form.user_id),
          order_id: form.order_id ? Number(form.order_id) : null,
          rating: Number(form.rating),
        }),
      });

      if (!res.ok) throw new Error('Failed to create');
      router.push('/admin/reviews');
    } catch (err) {
      alert(err.message);
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Product ID *</label>
            <input type="number" name="product_id" value={form.product_id} onChange={handleChange} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">User ID *</label>
            <input type="number" name="user_id" value={form.user_id} onChange={handleChange} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
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