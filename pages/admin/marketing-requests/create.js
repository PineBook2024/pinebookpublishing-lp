import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function CreateMarketingRequest() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    author_id: '',
    product_id: '',
    request_type: 'featured',
    message: '',
    request_status: 'pending',
    admin_notes: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const requestTypes = [
    { value: 'featured', label: 'Featured' },
    { value: 'homepage_banner', label: 'Homepage Banner' },
    { value: 'promotion', label: 'Promotion' },
    { value: 'campaign', label: 'Campaign' },
  ];

  const statuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'completed', label: 'Completed' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const payload = {
        ...formData,
        author_id: parseInt(formData.author_id) || null,
        product_id: formData.product_id ? parseInt(formData.product_id) : null,
      };

      await axios.post(`${API_URL}/marketing-requests`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      // ✅ correct redirect
      router.push('/admin/marketing-requests');

    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        alert('Failed to create request');
      }
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Marketing Request</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGrid}>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Author ID <span style={styles.required}>*</span></label>
            <input
              type="number"
              name="author_id"
              value={formData.author_id}
              onChange={handleChange}
              placeholder="Enter author ID"
              style={{ ...styles.input, ...(errors.author_id ? styles.inputError : {}) }}
            />
            {errors.author_id && <span style={styles.errorText}>{errors.author_id[0]}</span>}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Product ID</label>
            <input
              type="number"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              placeholder="Enter product ID (optional)"
              style={styles.input}
            />
            {errors.product_id && <span style={styles.errorText}>{errors.product_id[0]}</span>}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Request Type <span style={styles.required}>*</span></label>
            <select
              name="request_type"
              value={formData.request_type}
              onChange={handleChange}
              style={{ ...styles.input, ...styles.select, ...(errors.request_type ? styles.inputError : {}) }}
            >
              {requestTypes.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            {errors.request_type && <span style={styles.errorText}>{errors.request_type[0]}</span>}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Request Status</label>
            <select
              name="request_status"
              value={formData.request_status}
              onChange={handleChange}
              style={{ ...styles.input, ...styles.select }}
            >
              {statuses.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            {errors.request_status && <span style={styles.errorText}>{errors.request_status[0]}</span>}
          </div>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your marketing request message..."
            rows={5}
            style={{ ...styles.input, ...styles.textarea }}
          />
          {errors.message && <span style={styles.errorText}>{errors.message[0]}</span>}
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Admin Notes</label>
          <textarea
            name="admin_notes"
            value={formData.admin_notes}
            onChange={handleChange}
            placeholder="Admin notes..."
            rows={3}
            style={{ ...styles.input, ...styles.textarea }}
          />
          {errors.admin_notes && <span style={styles.errorText}>{errors.admin_notes[0]}</span>}
        </div>

        <div style={styles.actions}>
          <button
            type="button"
            onClick={() => router.push('/admin/marketing-requests')}
            style={styles.cancelBtn}
          >
            Cancel
          </button>

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? 'Creating...' : 'Create Request'}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: '700px', margin: '0 auto', padding: '24px' },
  title: { fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' },
  form: { background: '#fff', borderRadius: '12px', padding: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' },
  fieldGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' },
  required: { color: '#ef4444' },
  input: { width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', boxSizing: 'border-box' },
  inputError: { borderColor: '#ef4444' },
  errorText: { color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' },
  select: { cursor: 'pointer', background: '#fff' },
  textarea: { resize: 'vertical', minHeight: '100px' },
  actions: { display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' },
  cancelBtn: { padding: '10px 20px', borderRadius: '8px', border: '1px solid #d1d5db', background: '#fff', color: '#374151', fontWeight: '600', cursor: 'pointer' },
  submitBtn: { padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#fff', fontWeight: '600', cursor: 'pointer' },
};