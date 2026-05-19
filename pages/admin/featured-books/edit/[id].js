import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function FeaturedBookEdit() {
  const router = useRouter();
  const { id } = router.query;
  
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product_id: '',
    start_date: '',
    end_date: '',
    sort_order: 0,
    is_active: true
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [featuredRes, productsRes] = await Promise.all([
        fetch(`${API_URL}/featured-books/${id}`),
        fetch(`${API_URL}/products`)
      ]);

      if (!featuredRes.ok) throw new Error('Featured book not found');
      if (!productsRes.ok) throw new Error('Failed to fetch products');

      const featured = await featuredRes.json();
      const productsData = await productsRes.json();

      // Format datetime-local values (YYYY-MM-DDTHH:mm)
      const toDatetimeLocal = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        return d.toISOString().slice(0, 16);
      };

      setFormData({
        product_id: featured.product_id?.toString() || '',
        start_date: toDatetimeLocal(featured.start_date),
        end_date: toDatetimeLocal(featured.end_date),
        sort_order: featured.sort_order || 0,
        is_active: featured.is_active == 1
      });
      
      setProducts(Array.isArray(productsData) ? productsData : productsData.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      ...formData,
      sort_order: parseInt(formData.sort_order) || 0,
      is_active: formData.is_active ? 1 : 0
    };

    try {
      const res = await fetch(`${API_URL}/featured-books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update featured book');

      router.push('/admin/featured-books');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;
  if (error && !formData.product_id) return <div style={{ padding: 40, color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 24 }}>Edit Featured Book #{id}</h1>

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
        
        {/* Product Select */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>
            Product <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <select
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product.product_id} value={product.product_id}>
                {product.name || product.title || `Product #${product.product_id}`}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Start Date</label>
          <input
            type="datetime-local"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* End Date */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>End Date</label>
          <input
            type="datetime-local"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Sort Order */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Sort Order</label>
          <input
            type="number"
            name="sort_order"
            value={formData.sort_order}
            onChange={handleChange}
            min="0"
            style={inputStyle}
          />
        </div>

        {/* Is Active */}
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <input
            type="checkbox"
            name="is_active"
            id="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            style={{ width: 18, height: 18, cursor: 'pointer' }}
          />
          <label htmlFor="is_active" style={{ ...labelStyle, marginBottom: 0, cursor: 'pointer' }}>
            Active
          </label>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="button" onClick={() => router.push('/admin/featured-books')} style={cancelBtnStyle}>
            Cancel
          </button>
          <button type="submit" disabled={submitting} style={{ ...submitBtnStyle, opacity: submitting ? 0.6 : 1 }}>
            {submitting ? 'Updating...' : 'Update Featured Book'}
          </button>
        </div>
      </form>
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: 6, fontWeight: 600, color: '#374151' };
const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #d1d5db',
  borderRadius: 6,
  fontSize: 14,
  background: 'white',
  boxSizing: 'border-box'
};
const cancelBtnStyle = {
  padding: '10px 20px',
  background: '#f3f4f6',
  color: '#374151',
  border: '1px solid #d1d5db',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 14
};
const submitBtnStyle = {
  padding: '10px 20px',
  background: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 14
};