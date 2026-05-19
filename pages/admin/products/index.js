import { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// ─── Sidebar Component ───────────────────────────────────────────────────────
function Sidebar({ activePath }) {
  const menuItems = [
    { label: 'Dashboard', icon: '📊', href: '/admin/dashboard' },
    { label: 'Products', icon: '📦', href: '/admin/products' },
    { label: 'Orders', icon: '🛒', href: '/admin/orders' },
    { label: 'Customers', icon: '👥', href: '/admin/customers' },
    { label: 'Authors', icon: '✍️', href: '/admin/authors' },
    { label: 'Categories', icon: '🏷️', href: '/admin/categories' },
    { label: 'Reviews', icon: '⭐', href: '/admin/reviews' },
    { label: 'Settings', icon: '⚙️', href: '/admin/settings' },
  ];

  return (
    <aside style={{
      width: 260,
      minHeight: '100vh',
      background: '#0f172a',
      color: '#cbd5e1',
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50,
    }}>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid #1e293b' }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>🌲</span> PineBook
        </h2>
        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748b' }}>Admin Panel</p>
      </div>
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        {menuItems.map(item => {
          const isActive = activePath === item.href || activePath?.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '12px 16px', borderRadius: 10, marginBottom: 4,
                display: 'flex', alignItems: 'center', gap: 12,
                fontSize: 14, fontWeight: 500,
                color: isActive ? '#fff' : '#94a3b8',
                background: isActive ? '#2563eb' : 'transparent',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#1e293b'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
      <div style={{ padding: '16px 20px', borderTop: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', background: '#2563eb',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff'
          }}>A</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Admin User</div>
            <div style={{ fontSize: 11, color: '#64748b' }}>admin@pinebook.com</div>
          </div>
        </div>
        <button style={{
          width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #334155',
          background: 'transparent', color: '#94a3b8', fontSize: 13, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>🚪 Logout</button>
      </div>
    </aside>
  );
}

// ─── TopBar ──────────────────────────────────────────────────────────────────
function TopBar({ title, subtitle }) {
  return (
    <div style={{
      background: '#fff', borderBottom: '1px solid #e2e8f0',
      padding: '20px 32px', position: 'sticky', top: 0, zIndex: 40,
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#0f172a' }}>{title}</h1>
            <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: 15 }}>{subtitle}</p>
          </div>
          <Link href="/admin/products/create">
            <button style={{
              background: '#2563eb', color: '#fff', border: 'none', padding: '12px 24px',
              borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 18 }}>+</span> Add Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main Products Page ──────────────────────────────────────────────────────
export default function ProductsIndex() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState({ total: 0, live: 0, pending: 0, lowStock: 0 });

  const getToken = useCallback(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token') || '';
    }
    return '';
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const currentToken = getToken();
    
    console.log('🔍 Fetching products...');
    console.log('🔑 Token exists?', !!currentToken);
    console.log('🌐 API URL:', `${API_URL}/products`);

    try {
      const res = await fetch(`${API_URL}/products`, {
        headers: { 
          'Authorization': `Bearer ${currentToken}`, 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📡 Response status:', res.status);

      if (res.status === 401) {
        console.error('❌ Unauthorized - redirecting to login');
        setError('Session expired. Please log in again.');
        setProducts([]);
        // Uncomment if you have a login page:
        // router.push('/login');
        setLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const json = await res.json();
      console.log('📦 Full API Response:', json);

      // ✅ ROBUST DATA EXTRACTION - handles multiple response formats
      let data = [];
      if (Array.isArray(json)) {
        data = json;
      } else if (json && Array.isArray(json.data)) {
        data = json.data;
      } else if (json && Array.isArray(json.products)) {
        data = json.products;
      } else if (json && typeof json === 'object') {
        // Last resort: find any array in the response
        const possibleArray = Object.values(json).find(v => Array.isArray(v) && v.length > 0);
        if (possibleArray) data = possibleArray;
      }
      
      console.log('✅ Extracted products:', data.length);
      if (data.length > 0) {
        console.log('📋 First product:', data[0]);
      }

      setProducts(data);
      setStats({
        total: data.length,
        live: data.filter(p => p.status === 'live').length,
        pending: data.filter(p => p.status === 'pending').length,
        lowStock: data.filter(p => (p.stock_quantity || 0) < 5).length
      });
    } catch (err) {
      console.error('💥 Failed to fetch:', err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  // ✅ FIXED: Only ONE useEffect to fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}`, 'Accept': 'application/json' }
      });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.product_id !== id));
        setSelectedIds(prev => prev.filter(sid => sid !== id));
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    if (!confirm(`Delete ${selectedIds.length} products?`)) return;
    
    const currentToken = getToken();
    try {
      await Promise.all(selectedIds.map(id => 
        fetch(`${API_URL}/products/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${currentToken}`, 'Accept': 'application/json' }
        })
      ));
      setProducts(prev => prev.filter(p => !selectedIds.includes(p.product_id)));
      setSelectedIds([]);
    } catch (err) {
      alert('Bulk delete failed: ' + err.message);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length && filteredProducts.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map(p => p.product_id));
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      draft:    { bg: '#f3f4f6', color: '#374151', border: '#d1d5db', dot: '#9ca3af' },
      pending:  { bg: '#fffbeb', color: '#92400e', border: '#fcd34d', dot: '#f59e0b' },
      approved: { bg: '#ecfdf5', color: '#065f46', border: '#6ee7b7', dot: '#10b981' },
      rejected: { bg: '#fef2f2', color: '#991b1b', border: '#fecaca', dot: '#ef4444' },
      live:     { bg: '#eff6ff', color: '#1e40af', border: '#93c5fd', dot: '#3b82f6' },
      inactive: { bg: '#f5f3ff', color: '#5b21b6', border: '#c4b5fd', dot: '#8b5cf6' }
    };
    const s = styles[status] || styles.draft;
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '5px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600,
        textTransform: 'capitalize', background: s.bg, color: s.color,
        border: `1px solid ${s.border}`
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot }} />
        {status || 'draft'}
      </span>
    );
  };

  const getFormatIcon = (format) => {
    const icons = { ebook: '📱', paperback: '📖', hardcover: '💎' };
    return icons[format] || '📦';
  };

  const getCoverImage = (product) => {
    if (!product) return null;
    if (product.cover_image_url) return product.cover_image_url;
    if (product.images?.length && product.images[0]?.image_url) return product.images[0].image_url;
    return null;
  };

  // ✅ SAFE FILTERING with null checks
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }

    const q = search.toLowerCase().trim();

    let result = products.filter(p => {
      if (!p || typeof p !== 'object') return false;

      const title = (p.title || '').toLowerCase();
      const authorDisplay = (p.author?.display_name || '').toLowerCase();
      const authorName = (p.author?.name || '').toLowerCase();
      const authorNameDirect = (p.author_name || '').toLowerCase();
      const sku = (p.sku || '').toLowerCase();
      const isbn = String(p.isbn || '').toLowerCase();

      const matchesSearch = !q || (
        title.includes(q) ||
        authorDisplay.includes(q) ||
        authorName.includes(q) ||
        authorNameDirect.includes(q) ||
        sku.includes(q) ||
        isbn.includes(q)
      );

      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchesFormat = formatFilter === 'all' || p.format === formatFilter;

      return matchesSearch && matchesStatus && matchesFormat;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.created_at || 0) - new Date(a.created_at || 0);
        case 'oldest': return new Date(a.created_at || 0) - new Date(b.created_at || 0);
        case 'price-high': return parseFloat(b.price || 0) - parseFloat(a.price || 0);
        case 'price-low': return parseFloat(a.price || 0) - parseFloat(b.price || 0);
        case 'name': return (a.title || '').localeCompare(b.title || '');
        default: return 0;
      }
    });

    return result;
  }, [products, search, statusFilter, formatFilter, sortBy]);

  const StatCard = ({ label, value, color, icon }) => (
    <div style={{
      background: '#fff', borderRadius: 12, padding: '20px 24px',
      border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 16,
      minWidth: 180, flex: 1
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12, background: `${color}15`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#1e293b' }}>{value}</div>
        <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <Sidebar activePath="/admin/products" />
      <main style={{ marginLeft: 260, flex: 1, minWidth: 0 }}>
        <TopBar title="Products" subtitle={`Manage your catalog of ${stats.total} products`} />
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
          
          {/* Stats */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
            <StatCard label="Total Products" value={stats.total} color="#2563eb" icon="📦" />
            <StatCard label="Live" value={stats.live} color="#10b981" icon="🚀" />
            <StatCard label="Pending" value={stats.pending} color="#f59e0b" icon="⏳" />
            <StatCard label="Low Stock" value={stats.lowStock} color="#ef4444" icon="⚠️" />
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12,
              padding: '16px 20px', marginBottom: 20, color: '#991b1b', display: 'flex',
              alignItems: 'center', gap: 12
            }}>
              <span style={{ fontSize: 20 }}>⚠️</span>
              <div>
                <div style={{ fontWeight: 600 }}>Error loading products</div>
                <div style={{ fontSize: 13, marginTop: 2 }}>{error}</div>
              </div>
              <button 
                onClick={fetchProducts}
                style={{
                  marginLeft: 'auto', padding: '8px 16px', borderRadius: 6,
                  border: '1px solid #ef4444', background: '#ef4444', color: '#fff',
                  fontSize: 13, cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Toolbar */}
          <div style={{
            background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0',
            padding: '16px 20px', marginBottom: 20
          }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search products, authors, SKU, ISBN..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px 10px 40px', borderRadius: 8,
                    border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', background: '#f8fafc'
                  }}
                />
              </div>
              <button onClick={() => setShowFilters(!showFilters)} style={{
                padding: '10px 16px', borderRadius: 8, border: '1px solid #e2e8f0',
                background: showFilters ? '#eff6ff' : '#fff', color: showFilters ? '#2563eb' : '#475569',
                fontSize: 14, cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6
              }}>⚙️ Filters {showFilters ? '▲' : '▼'}</button>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                padding: '10px 16px', borderRadius: 8, border: '1px solid #e2e8f0',
                fontSize: 14, background: '#fff', cursor: 'pointer'
              }}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="name">Name A-Z</option>
              </select>
              <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
                <button onClick={() => setViewMode('grid')} style={{
                  padding: '10px 14px', border: 'none', background: viewMode === 'grid' ? '#2563eb' : '#fff',
                  color: viewMode === 'grid' ? '#fff' : '#64748b', cursor: 'pointer', fontSize: 14
                }}>⊞ Grid</button>
                <button onClick={() => setViewMode('table')} style={{
                  padding: '10px 14px', border: 'none', background: viewMode === 'table' ? '#2563eb' : '#fff',
                  color: viewMode === 'table' ? '#fff' : '#64748b', cursor: 'pointer', fontSize: 14
                }}>☰ List</button>
              </div>
            </div>
            {showFilters && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f1f5f9', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6, display: 'block' }}>Status</label>
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{
                    padding: '8px 14px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 14, minWidth: 140
                  }}>
                    <option value="all">All Statuses</option>
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="live">Live</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6, display: 'block' }}>Format</label>
                  <select value={formatFilter} onChange={e => setFormatFilter(e.target.value)} style={{
                    padding: '8px 14px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 14, minWidth: 140
                  }}>
                    <option value="all">All Formats</option>
                    <option value="ebook">Ebook</option>
                    <option value="paperback">Paperback</option>
                    <option value="hardcover">Hardcover</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button onClick={() => { setStatusFilter('all'); setFormatFilter('all'); setSearch(''); }}
                    style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 14, cursor: 'pointer' }}>
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <div style={{
              background: '#1e293b', color: '#fff', borderRadius: 10,
              padding: '14px 20px', marginBottom: 20, display: 'flex',
              justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>
                {selectedIds.length} product{selectedIds.length > 1 ? 's' : ''} selected
              </span>
              <button onClick={handleBulkDelete} style={{
                padding: '8px 16px', borderRadius: 6, border: '1px solid #ef4444',
                background: '#ef4444', color: '#fff', fontSize: 13, cursor: 'pointer', fontWeight: 500
              }}>🗑️ Delete Selected</button>
            </div>
          )}

          {/* Results Count */}
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#64748b', fontSize: 14 }}>
              Showing <strong style={{ color: '#1e293b' }}>{filteredProducts.length}</strong> of {products.length} products
            </span>
            {selectedIds.length > 0 && (
              <button onClick={() => setSelectedIds([])} style={{
                fontSize: 13, color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer'
              }}>Clear selection</button>
            )}
          </div>

          {/* Content */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: 80 }}>
              <div style={{
                width: 40, height: 40, border: '3px solid #e2e8f0',
                borderTopColor: '#2563eb', borderRadius: '50%',
                animation: 'spin 1s linear infinite', margin: '0 auto 16px'
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <p style={{ color: '#64748b' }}>Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 80, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
              <h3 style={{ margin: 0, color: '#374151', fontSize: 18 }}>No products found</h3>
              <p style={{ color: '#94a3b8', marginTop: 8 }}>
                {products.length === 0 
                  ? 'No products in database. Add your first product!' 
                  : 'Try adjusting your filters or search query'}
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {filteredProducts.map(p => (
                <div key={p.product_id} style={{
                  background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0',
                  overflow: 'hidden', transition: 'all 0.2s', position: 'relative',
                  boxShadow: selectedIds.includes(p.product_id) ? '0 0 0 2px #2563eb' : 'none'
                }}>
                  <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 10 }}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(p.product_id)}
                      onChange={() => toggleSelect(p.product_id)}
                      style={{ width: 20, height: 20, cursor: 'pointer', accentColor: '#2563eb' }}
                    />
                  </div>
                  <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, display: 'flex', gap: 6 }}>
                    {p.is_featured && <span style={{ background: '#f59e0b', color: '#fff', padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>★ FEATURED</span>}
                    {p.is_bestseller && <span style={{ background: '#8b5cf6', color: '#fff', padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>🔥 BEST</span>}
                  </div>
                  <div style={{ height: 200, background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
                    {getCoverImage(p) ? (
                      <img src={getCoverImage(p)} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', fontSize: 48 }}>📚</div>
                    )}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 16px 12px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                      <span style={{ color: '#fff', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {getFormatIcon(p.format)} {p.format}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      {getStatusBadge(p.status)}
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>Stock: <strong style={{ color: (p.stock_quantity || 0) < 5 ? '#ef4444' : '#059669' }}>{p.stock_quantity ?? 0}</strong></span>
                    </div>
                    <h3 style={{ margin: '8px 0', fontSize: 16, fontWeight: 700, color: '#1e293b', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {p.title}
                    </h3>
                    <p style={{ margin: '4px 0 12px', fontSize: 13, color: '#64748b' }}>
                      by {p.author?.display_name || p.author?.name || p.author_name || 'Unknown'}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: 20, fontWeight: 800, color: '#1e293b' }}>${parseFloat(p.price || 0).toFixed(2)}</span>
                      {p.discount_price && (
                        <span style={{ fontSize: 14, color: '#94a3b8', textDecoration: 'line-through' }}>
                          ${parseFloat(p.discount_price).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 6, paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
                      <Link href={`/admin/products/${p.product_id}/edit`} style={{ flex: 1 }}>
                        <button style={{
                          width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #e2e8f0',
                          background: '#fff', color: '#475569', fontSize: 13, cursor: 'pointer', fontWeight: 500
                        }}>✏️ Edit</button>
                      </Link>
                      <button onClick={() => handleDelete(p.product_id)} style={{
                        padding: '8px 12px', borderRadius: 6, border: '1px solid #fee2e2',
                        background: '#fef2f2', color: '#dc2626', fontSize: 13, cursor: 'pointer', fontWeight: 500
                      }}>🗑️</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '14px 16px', width: 40 }}>
                      <input type="checkbox" checked={selectedIds.length === filteredProducts.length && filteredProducts.length > 0} onChange={toggleSelectAll} style={{ accentColor: '#2563eb' }} />
                    </th>
                    <th style={thStyle}>Product</th>
                    <th style={thStyle}>Author</th>
                    <th style={thStyle}>Price</th>
                    <th style={thStyle}>Format</th>
                    <th style={thStyle}>Stock</th>
                    <th style={thStyle}>Status</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => (
                    <tr key={p.product_id} style={{ borderTop: '1px solid #f1f5f9', background: selectedIds.includes(p.product_id) ? '#eff6ff' : '#fff' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <input type="checkbox" checked={selectedIds.includes(p.product_id)} onChange={() => toggleSelect(p.product_id)} style={{ accentColor: '#2563eb' }} />
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          {getCoverImage(p) ? (
                            <img src={getCoverImage(p)} alt="" style={{ width: 40, height: 56, objectFit: 'cover', borderRadius: 6, border: '1px solid #e2e8f0' }} />
                          ) : (
                            <div style={{ width: 40, height: 56, borderRadius: 6, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📚</div>
                          )}
                          <div>
                            <div style={{ fontWeight: 600, color: '#1e293b' }}>{p.title}</div>
                            <div style={{ fontSize: 12, color: '#94a3b8' }}>SKU: {p.sku || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#475569', fontSize: 13 }}>{p.author?.display_name || p.author?.name || p.author_name || 'N/A'}</td>
                      <td style={{ padding: '14px 16px', fontWeight: 700, color: '#1e293b' }}>
                        ${parseFloat(p.price || 0).toFixed(2)}
                        {p.discount_price && <span style={{ color: '#94a3b8', fontSize: 12, marginLeft: 6, textDecoration: 'line-through' }}>${parseFloat(p.discount_price).toFixed(2)}</span>}
                      </td>
                      <td style={{ padding: '14px 16px', textTransform: 'capitalize', color: '#475569', fontSize: 13 }}>{getFormatIcon(p.format)} {p.format}</td>
                      <td style={{ padding: '14px 16px', color: (p.stock_quantity || 0) < 5 ? '#ef4444' : '#475569', fontWeight: (p.stock_quantity || 0) < 5 ? 700 : 400 }}>{p.stock_quantity ?? 0}</td>
                      <td style={{ padding: '14px 16px' }}>{getStatusBadge(p.status)}</td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                          <Link href={`/admin/products/${p.product_id}/edit`}>
                            <button style={btnStyle('edit')}>Edit</button>
                          </Link>
                          <button onClick={() => handleDelete(p.product_id)} style={btnStyle('delete')}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const thStyle = { padding: '14px 16px', textAlign: 'left', fontWeight: 600, color: '#475569', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 };

function btnStyle(type) {
  const base = { padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer', fontWeight: 500, border: '1px solid' };
  if (type === 'edit') return { ...base, borderColor: '#e2e8f0', background: '#fff', color: '#475569' };
  return { ...base, borderColor: '#fee2e2', background: '#fef2f2', color: '#dc2626' };
}