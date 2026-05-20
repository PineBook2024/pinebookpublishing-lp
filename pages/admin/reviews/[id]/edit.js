import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pinebookbackend.pinedigitalhub.com/api';

export default function EditReview() {
  const router = useRouter();
  const { id } = router.query;
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/reviews/${id}`)
      .then(res => res.json())
      .then(data => {
        setReview(data);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to load review');
        router.push('/admin/reviews');
      });
  }, [id]);

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${API_URL}/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: Number(review.rating),
          review_title: review.review_title,
          comment: review.comment,
          vendor_reply: review.vendor_reply,
          moderation_status: review.moderation_status,
        }),
      });

      if (!res.ok) throw new Error('Failed to update');
      router.push('/admin/reviews');
    } catch (err) {
      alert(err.message);
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!review) return <div className="p-8">Review not found</div>;

  return (
    <div className="max-w-2xl p-8 mx-auto">
      <Link href="/admin/reviews" className="text-sm text-blue-600 hover:underline">
        ← Back to Reviews
      </Link>
      <h1 className="mt-2 mb-2 text-2xl font-bold">Edit Review #{review.review_id}</h1>

      <div className="p-4 mb-6 text-sm text-gray-600 rounded-lg bg-gray-50">
        <p><strong>Product:</strong> {review.product?.name || review.product_id}</p>
        <p><strong>User:</strong> {review.user?.name || review.user_id}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Rating</label>
            <select name="rating" value={review.rating} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
            <select name="moderation_status" value={review.moderation_status} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Review Title</label>
          <input type="text" name="review_title" value={review.review_title || ''} onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Comment</label>
          <textarea name="comment" value={review.comment || ''} onChange={handleChange} rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Vendor Reply</label>
          <textarea name="vendor_reply" value={review.vendor_reply || ''} onChange={handleChange} rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Reply to this review..." />
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving}
            className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
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