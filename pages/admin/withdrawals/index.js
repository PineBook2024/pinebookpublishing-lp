import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function WithdrawalsIndex() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const router = useRouter();

  const fetchWithdrawals = async () => {
    try {
      const res = await fetch(`${API_URL}/withdrawal-requests`);
      const data = await res.json();
      setWithdrawals(data);
    } catch (err) {
      console.error('Failed to fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this withdrawal request?')) return;
    try {
      const res = await fetch(`${API_URL}/withdrawal-requests/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        setWithdrawals(prev => prev.filter(w => w.withdrawal_id !== id));
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: '#fef3c7', color: '#92400e', border: '#f59e0b' },
      approved: { bg: '#d1fae5', color: '#065f46', border: '#10b981' },
      rejected: { bg: '#fee2e2', color: '#991b1b', border: '#ef4444' },
      paid: { bg: '#dbeafe', color: '#1e40af', border: '#3b82f6' }
    };
    const s = styles[status] || styles.pending;
    return (
      <span style={{
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'capitalize',
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`
      }}>
        {status}
      </span>
    );
  };

  const filtered = withdrawals.filter(w => {
    const matchesSearch = 
      w.author?.name?.toLowerCase().includes(search.toLowerCase()) ||
      w.payment_channel?.toLowerCase().includes(search.toLowerCase()) ||
      w.amount?.toString().includes(search);
    const matchesStatus = statusFilter === 'all' || w.request_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '20px 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#1e293b' }}>Withdrawal Requests</h1>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>Manage author payout requests</p>
          </div>
          <Link href="/admin/withdrawals/create">
            <button style={{
              background: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px',
              borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8
            }}>
              <span>+</span> New Request
            </button>
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search by author, channel, amount..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, minWidth: 280, padding: '10px 16px', borderRadius: 8,
              border: '1px solid #e2e8f0', fontSize: 14, outline: 'none'
            }}
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{
              padding: '10px 16px', borderRadius: 8, border: '1px solid #e2e8f0',
              fontSize: 14, background: '#fff', minWidth: 160, cursor: 'pointer'
            }}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#64748b' }}>Loading...</div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, color: '#475569', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>ID</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, color: '#475569', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>Author</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, color: '#475569', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>Amount</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, color: '#475569', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>Channel</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, color: '#475569', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>Status</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, color: '#475569', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>Requested</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right', fontWeight: 600, color: '#475569', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: 60, textAlign: 'center', color: '#94a3b8' }}>
                      No withdrawal requests found
                    </td>
                  </tr>
                ) : (
                  filtered.map(w => (
                    <tr key={w.withdrawal_id} style={{ borderTop: '1px solid #f1f5f9', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                      <td style={{ padding: '16px 20px', color: '#64748b', fontWeight: 500 }}>#{w.withdrawal_id}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ fontWeight: 600, color: '#1e293b' }}>{w.author?.name || 'Unknown'}</div>
                        <div style={{ fontSize: 12, color: '#94a3b8' }}>{w.author?.email || ''}</div>
                      </td>
                      <td style={{ padding: '16px 20px', fontWeight: 700, color: '#1e293b', fontSize: 15 }}>
                        ${parseFloat(w.amount).toFixed(2)}
                      </td>
                      <td style={{ padding: '16px 20px', textTransform: 'capitalize', color: '#475569' }}>{w.payment_channel}</td>
                      <td style={{ padding: '16px 20px' }}>{getStatusBadge(w.request_status)}</td>
                      <td style={{ padding: '16px 20px', color: '#64748b', fontSize: 13 }}>
                        {new Date(w.requested_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                          <Link href={`/admin/withdrawals/${w.withdrawal_id}/edit`}>
                            <button style={{
                              padding: '6px 14px', borderRadius: 6, border: '1px solid #e2e8f0',
                              background: '#fff', color: '#475569', fontSize: 13, cursor: 'pointer',
                              fontWeight: 500
                            }}>Edit</button>
                          </Link>
                          <button onClick={() => handleDelete(w.withdrawal_id)} style={{
                            padding: '6px 14px', borderRadius: 6, border: '1px solid #fee2e2',
                            background: '#fef2f2', color: '#dc2626', fontSize: 13, cursor: 'pointer',
                            fontWeight: 500
                          }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}