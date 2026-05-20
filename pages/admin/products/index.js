import { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pinebookbackend.pinedigitalhub.com/api';
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage';

// ===== ICONS (same as admin dashboard) =====
const Icons = {
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Products: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
  ),
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
  Category: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2Z"/></svg>
  ),
  Order: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  ),
  Coupon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="m9 12 2 2 4-4"/></svg>
  ),
  FeaturedBook: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="m9 9 2 2 4-4"/></svg>
  ),
  Marketing: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
  ),
  Refund: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12h6"/><path d="M12 9v6"/></svg>
  ),
  Review: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ),
  Shipment: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="13" x="4" y="5" rx="2"/><path d="m16 2-4 4-4-4"/><path d="M4 18h16"/></svg>
  ),
  Wishlist: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  ),
  Withdrawal: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 12H8"/><path d="m12 8-4 4 4 4"/></svg>
  ),
  Approvals: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="m9 18 2 2 4-4"/><path d="M14 2v6h6"/></svg>
  ),
  Permissions: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  ),
};

const sidebarVariants = {
  open: { width: 280, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: { width: 80, transition: { type: "spring", stiffness: 300, damping: 30 } },
};

// const resolveImageUrl = (raw) => {
//   if (!raw || typeof raw !== 'string') return null;
//   const trimmed = raw.trim();
//   if (!trimmed) return null;
//   if (/^(https?:|data:|blob:)/i.test(trimmed)) return trimmed;
//   if (trimmed.startsWith('/')) return trimmed;
//   return `${STORAGE_URL.replace(/\/$/, '')}/${trimmed.replace(/^\/+/, '')}`;
// };

// ─── Sidebar Component (matches admin/dashboard) ─────────────────────────────
function Sidebar({ activePath, sidebarOpen, setSidebarOpen }) {
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Icons.Dashboard, href: "/admin/dashboard" },
    { id: "users", label: "Users", icon: Icons.Users, href: "/admin/users" },
    { id: "products", label: "Products", icon: Icons.Products, href: "/admin/products" },
    { id: "categories", label: "Categories", icon: Icons.Category, href: "/admin/categories" },
    { id: "coupons", label: "Coupons", icon: Icons.Coupon, href: "/admin/coupons" },
    { id: "featured-books", label: "Featured Books", icon: Icons.FeaturedBook, href: "/admin/featured-books" },
    { id: "marketing-requests", label: "Marketing Requests", icon: Icons.Marketing, href: "/admin/marketing-requests" },
    { id: "orders", label: "Orders", icon: Icons.Order, href: "/admin/orders" },
    { id: "refunds", label: "Refunds", icon: Icons.Refund, href: "/admin/refunds" },
    { id: "reviews", label: "Reviews", icon: Icons.Review, href: "/admin/reviews" },
    { id: "shipments", label: "Shipments", icon: Icons.Shipment, href: "/admin/shipments" },
    { id: "wishlists", label: "Wishlists", icon: Icons.Wishlist, href: "/admin/wishlists" },
    { id: "withdrawals", label: "Withdrawals", icon: Icons.Withdrawal, href: "/admin/withdrawals" },
    { id: "approvals", label: "Approvals", icon: Icons.Approvals, href: "/admin/approvals" },
    { id: "permissions", label: "Permissions", icon: Icons.Permissions, href: "/admin/permissions" },
  ];

  const isActive = (href) => activePath === href || activePath?.startsWith(href + '/');

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="open"
      animate={sidebarOpen ? "open" : "closed"}
      className="sticky top-0 z-50 flex flex-col h-screen overflow-hidden text-white shadow-2xl bg-slate-900"
    >
      <div className="flex items-center gap-3 p-6 border-b border-white/10">
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center flex-shrink-0 w-10 h-10 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl"
        >
          <span className="text-xl font-bold">P</span>
        </motion.div>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="overflow-hidden">
              <h1 className="text-lg font-bold tracking-tight">PineBook</h1>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive(item.href) ? "bg-amber-600 text-white" : "text-slate-300 hover:bg-white/10"}`}
          >
            <div className="flex-shrink-0">{item.icon && <item.icon />}</div>
            {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-xl bg-white/5">
          <div className="flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full bg-gradient-to-br from-green-400 to-blue-500">A</div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-slate-400">Super Admin</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.aside>
  );
}

// ─── TopBar ──────────────────────────────────────────────────────────────────
function TopBar({ title, subtitle, onToggleSidebar }) {
  return (
    <div style={{
      background: '#fff', borderBottom: '1px solid #e2e8f0',
      padding: '20px 32px', position: 'sticky', top: 0, zIndex: 40,
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
              style={{
                background: 'transparent', border: 'none', padding: 8, borderRadius: 8,
                cursor: 'pointer', color: '#0f172a', display: 'flex', alignItems: 'center'
              }}
            >
              <Icons.Menu />
            </button>
            <div>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#0f172a' }}>{title}</h1>
              <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: 15 }}>{subtitle}</p>
            </div>
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
    const raw =
      product.cover_image_url ||
      product.cover_image ||
      product.cover_url ||
      (product.images?.length && (product.images[0]?.image_url || product.images[0]?.url)) ||
      null;
    if (!raw || typeof raw !== 'string') return null;
    const trimmed = raw.trim();
    if (!trimmed) return null;
    // Rewrite localhost URLs the backend embeds in responses (matches shop.js behavior)
    const rewritten = trimmed
      .replace('http://localhost:8000', 'https://pinebookbackend.pinedigitalhub.com')
      .replace('https://localhost:8000', 'https://pinebookbackend.pinedigitalhub.com');
    if (/^(https?:|data:|blob:)/i.test(rewritten)) return rewritten;
    if (rewritten.startsWith('/')) return rewritten;
    return `${STORAGE_URL.replace(/\/$/, '')}/${rewritten.replace(/^\/+/, '')}`;
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
      <Sidebar activePath="/admin/products" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main style={{ flex: 1, minWidth: 0 }}>
        <TopBar title="Products" subtitle={`Manage your catalog of ${stats.total} products`} onToggleSidebar={() => setSidebarOpen(o => !o)} />
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
    <img 
        src={getCoverImage(p)} 
        alt={p.title}
        onError={(e) => { 
            e.target.style.display = 'none'; 
            e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#cbd5e1;font-size:48px">📚</div>';
        }}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
    />
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