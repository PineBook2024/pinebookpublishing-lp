import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function WishlistEdit() {
  const router = useRouter();
  const { id } = router.query;
  
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ user_id: '', product_id: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pinebookbackend.pinedigitalhub.com/api';

  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [wishlistRes, usersRes, productsRes] = await Promise.all([
        fetch(`${API_URL}/wishlists/${id}`),
        fetch(`${API_URL}/users`),
        fetch(`${API_URL}/products`)
      ]);

      if (!wishlistRes.ok) throw new Error('Wishlist not found');
      if (!usersRes.ok) throw new Error('Failed to fetch users');
      if (!productsRes.ok) throw new Error('Failed to fetch products');

      const wishlist = await wishlistRes.json();
      const usersData = await usersRes.json();
      const productsData = await productsRes.json();

      setFormData({
        user_id: wishlist.user_id?.toString() || '',
        product_id: wishlist.product_id?.toString() || ''
      });
      
      setUsers(Array.isArray(usersData) ? usersData : usersData.data || []);
      setProducts(Array.isArray(productsData) ? productsData : productsData.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Note: Laravel resource controller typically doesn't have update for wishlists
      // If your controller supports PUT/PATCH, use this. Otherwise, delete + recreate.
      const res = await fetch(`${API_URL}/wishlists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update wishlist');
      }

      router.push('/admin/wishlists');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;
  if (error && !formData.user_id) return <div style={{ padding: 40, color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 24 }}>Edit Wishlist #{id}</h1>

      {error && (
        <div style={{ 
          padding: '12px 16px', 
          background: '#fef2f2', 
          color: '#dc2626', 
          borderRadius: 6, 
          marginBottom: 20,
          border: '1px solid #fecaca'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        
        {/* User Select */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#374151' }}>
            User <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <select
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              fontSize: 14,
              background: 'white'
            }}
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.user_id} value={user.user_id}>
                {user.name || user.email || `User #${user.user_id}`}
              </option>
            ))}
          </select>
        </div>

        {/* Product Select */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#374151' }}>
            Product <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <select
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              fontSize: 14,
              background: 'white'
            }}
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product.product_id} value={product.product_id}>
                {product.name || product.title || `Product #${product.product_id}`}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            type="button"
            onClick={() => router.push('/admin/wishlists')}
            style={{
              padding: '10px 20px',
              background: '#f3f4f6',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '10px 20px',
              background: submitting ? '#93c5fd' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: submitting ? 'not-allowed' : 'pointer',
              fontSize: 14
            }}
          >
            {submitting ? 'Updating...' : 'Update Wishlist'}
          </button>
        </div>
      </form>
    </div>
  );
}