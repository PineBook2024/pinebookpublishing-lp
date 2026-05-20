import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pinebookbackend.pinedigitalhub.com/api';

export default function EditWithdrawal() {
  const router = useRouter();
  const { id } = router.query;
  const [authors, setAuthors] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    author_id: '',
    amount: '',
    payment_channel: 'bank',
    account_details: '',
    request_status: 'pending',
    admin_notes: ''
  });

  // Fetch authors (same as create)
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    fetch(`${API_URL}/authors`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
      .then(async r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = await r.json();
        console.log('Authors API response:', json);
        setAuthors(json.data || []);
      })
      .catch(err => {
        console.error('Failed to fetch authors:', err);
        setFetchError(err.message);
        setAuthors([]);
      });
  }, []);

  // Fetch withdrawal data
  useEffect(() => {
    if (!id) return;
    
    const token = localStorage.getItem('token');
    
    fetch(`${API_URL}/withdrawal-requests/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
      .then(async r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = await r.json();
        console.log('Withdrawal API response:', json);
        
        // Handle wrapped or unwrapped response
        const data = json.data || json;
        
        setForm({
          author_id: data.author_id?.toString() || '',
          amount: data.amount?.toString() || '',
          payment_channel: data.payment_channel || 'bank',
          account_details: data.account_details || '',
          request_status: data.request_status || 'pending',
          admin_notes: data.admin_notes || ''
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch withdrawal:', err);
        alert('Failed to load withdrawal data');
        router.push('/admin/withdrawals');
      });
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    try {
      const token = localStorage.getItem('token');
      
      const res = await fetch(`${API_URL}/withdrawal-requests/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          alert(data.message || 'Failed to update');
        }
        setSaving(false);
        return;
      }

      router.push('/admin/withdrawals');
    } catch (err) {
      alert('Network error');
      setSaving(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '12px 16px',
    borderRadius: 8,
    border: `1px solid ${errors[field] ? '#ef4444' : '#e2e8f0'}`,
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.15s',
    background: '#fff'
  });

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#64748b' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '20px 32px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link href="/admin/withdrawals" style={{ color: '#64748b', fontSize: 14, textDecoration: 'none' }}>
            ← Back to Withdrawals
          </Link>
          <h1 style={{ margin: '8px 0 0', fontSize: 22, fontWeight: 700, color: '#1e293b' }}>Edit Withdrawal #{id}</h1>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: 32 }}>
        <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 32 }}>
          
          {/* Author Select */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600, color: '#374151' }}>
              Author <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select 
              name="author_id" 
              value={form.author_id} 
              onChange={handleChange} 
              style={inputStyle('author_id')}
              disabled={authors.length === 0}
            >
              <option value="">
                {fetchError ? `Error: ${fetchError}` : 
                 authors.length === 0 ? 'Loading authors...' : 'Select an author'}
              </option>
              {authors.map(a => (
                <option key={a.author_id} value={a.author_id}>
                  {a.display_name || a.name} {a.email ? `(${a.email})` : ''}
                </option>
              ))}
            </select>
            {errors.author_id && (
              <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>
                {errors.author_id[0]}
              </span>
            )}
            {fetchError && (
              <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>
                Could not load authors. Check API endpoint and CORS.
              </span>
            )}
          </div>

          {/* Amount */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600, color: '#374151' }}>
              Amount ($) <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="number"
              name="amount"
              step="0.01"
              min="1"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
              style={inputStyle('amount')}
            />
            {errors.amount && <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.amount[0]}</span>}
          </div>

          {/* Payment Channel */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600, color: '#374151' }}>
              Payment Channel <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {['bank', 'paypal', 'stripe', 'other'].map(ch => (
                <label key={ch} style={{
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: `2px solid ${form.payment_channel === ch ? '#2563eb' : '#e2e8f0'}`,
                  background: form.payment_channel === ch ? '#eff6ff' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  fontSize: 14,
                  fontWeight: form.payment_channel === ch ? 600 : 400,
                  color: form.payment_channel === ch ? '#2563eb' : '#475569',
                  transition: 'all 0.15s'
                }}>
                  <input
                    type="radio"
                    name="payment_channel"
                    value={ch}
                    checked={form.payment_channel === ch}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  {ch}
                </label>
              ))}
            </div>
            {errors.payment_channel && <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.payment_channel[0]}</span>}
          </div>

          {/* Account Details */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600, color: '#374151' }}>
              Account Details
            </label>
            <textarea
              name="account_details"
              rows={4}
              placeholder="Bank account number, PayPal email, etc."
              value={form.account_details}
              onChange={handleChange}
              style={{ ...inputStyle('account_details'), resize: 'vertical', fontFamily: 'inherit' }}
            />
            {errors.account_details && <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.account_details[0]}</span>}
          </div>

          {/* Admin Section */}
          <div style={{ marginBottom: 20, padding: 20, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <label style={{ display: 'block', marginBottom: 12, fontSize: 14, fontWeight: 600, color: '#374151' }}>
              Request Status
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {['pending', 'approved', 'rejected', 'paid'].map(st => (
                <label key={st} style={{
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: `2px solid ${form.request_status === st ? '#2563eb' : '#e2e8f0'}`,
                  background: form.request_status === st ? '#eff6ff' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  fontSize: 14,
                  fontWeight: form.request_status === st ? 600 : 400,
                  color: form.request_status === st ? '#2563eb' : '#475569',
                  transition: 'all 0.15s'
                }}>
                  <input
                    type="radio"
                    name="request_status"
                    value={st}
                    checked={form.request_status === st}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  {st}
                </label>
              ))}
            </div>
            <p style={{ margin: '8px 0 0', fontSize: 12, color: '#94a3b8' }}>
              Approving or marking as paid will automatically set the processed date.
            </p>
          </div>

          {/* Admin Notes */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600, color: '#374151' }}>
              Admin Notes
            </label>
            <textarea
              name="admin_notes"
              rows={3}
              placeholder="Internal notes about this request..."
              value={form.admin_notes}
              onChange={handleChange}
              style={{ ...inputStyle('admin_notes'), resize: 'vertical', fontFamily: 'inherit' }}
            />
            {errors.admin_notes && <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.admin_notes[0]}</span>}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: 24 }}>
            <Link href="/admin/withdrawals">
              <button type="button" style={{
                padding: '10px 20px', borderRadius: 8, border: '1px solid #e2e8f0',
                background: '#fff', color: '#475569', fontSize: 14, cursor: 'pointer', fontWeight: 500
              }}>Cancel</button>
            </Link>
            <button type="submit" disabled={saving} style={{
              padding: '10px 24px', borderRadius: 8, border: 'none',
              background: saving ? '#93c5fd' : '#2563eb', color: '#fff',
              fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600
            }}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}