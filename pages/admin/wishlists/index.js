import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

// ===== SIDEBAR ICONS =====
const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Products: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
  ),
  Category: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><circle cx="15" cy="13" r="1"/></svg>
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
  Order: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
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
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
};

const sidebarVariants = {
  open: { width: 280, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: { width: 80, transition: { type: "spring", stiffness: 300, damping: 30 } },
};

export default function WishlistsIndex() {
  const router = useRouter();
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("wishlists");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

  // ===== FULL SIDEBAR ITEMS =====
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

  useEffect(() => {
    fetchWishlists();
  }, []);

  const fetchWishlists = async () => {
    try {
      const res = await fetch(`${API_URL}/wishlists`);
      const data = await res.json();
      setWishlists(data.data || data || []);
    } catch {
      alert('Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove from wishlist?')) return;
    try {
      await fetch(`${API_URL}/wishlists/${id}`, { method: 'DELETE' });
      setWishlists(prev => prev.filter(w => w.wishlist_id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* ===== SIDEBAR ===== */}
      <motion.aside
        variants={sidebarVariants}
        initial="open"
        animate={sidebarOpen ? "open" : "closed"}
        className="relative z-50 flex flex-col h-full overflow-hidden text-white shadow-2xl bg-slate-900"
      >
        {/* Logo */}
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
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="overflow-hidden"
              >
                <h1 className="text-lg font-bold tracking-tight">PineBook</h1>
                <p className="text-xs text-slate-400">Admin Panel</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${
                activeTab === item.id ? "bg-amber-600 text-white" : "text-slate-300 hover:bg-white/10"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <div className="flex-shrink-0">
                {item.icon && <item.icon />}
              </div>
              {sidebarOpen && (
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-xl bg-white/5"
          >
            <div className="flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full bg-gradient-to-br from-green-400 to-blue-500">
              A
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-slate-400">Super Admin</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div style={styles.loader}>Loading Wishlists...</div>
        ) : (
          <div style={styles.page}>
            <style dangerouslySetInnerHTML={{ __html: `
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
              * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
              .row:hover { background: #f8fafc; }
            `}} />

            <div style={styles.container}>
              <div style={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#475569', padding: '8px', borderRadius: '8px' }}
                  >
                    <Icons.Menu />
                  </button>
                  <div>
                    <h1 style={styles.title}>Wishlists</h1>
                    <p style={styles.subtitle}>Showing {wishlists.length} saved items</p>
                  </div>
                </div>
                <button onClick={() => router.push('/admin/wishlists/create')} style={styles.addBtn}>
                  + Add Wishlist
                </button>
              </div>

              <div style={styles.card}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>User Details</th>
                      <th style={styles.th}>Product</th>
                      <th style={styles.th}>Date Added</th>
                      <th style={{...styles.th, textAlign: 'right'}}>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {wishlists.length > 0 ? (
                      wishlists.map((w, index) => (
                        <tr key={w?.wishlist_id || index} className="row">
                          <td style={{...styles.td, ...styles.id}}>#{w?.wishlist_id}</td>

                          <td style={styles.td}>
                            <div style={styles.userBox}>
                              <div style={styles.avatar}>{w?.user?.name?.[0] || 'U'}</div>
                              <div>
                                <div style={styles.userName}>{w?.user?.name || 'Unknown User'}</div>
                                <div style={styles.userEmail}>{w?.user?.email || 'No email provided'}</div>
                              </div>
                            </div>
                          </td>

                          <td style={styles.td}>
                            <span style={styles.productTag}>
                              {w?.product?.name || w?.product?.title || `Product #${w?.product_id}`}
                            </span>
                          </td>

                          <td style={{...styles.td, ...styles.date}}>
                            {w?.created_at ? new Date(w.created_at).toLocaleDateString() : '-'}
                          </td>

                          <td style={styles.td}>
                            <div style={styles.actions}>
                              <button onClick={() => router.push(`/admin/wishlists/${w.wishlist_id}/edit`)} style={styles.edit}>Edit</button>
                              <button onClick={() => handleDelete(w.wishlist_id)} style={styles.delete}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={styles.empty}>No data found in database.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { background: '#f1f5f9', minHeight: '100vh', padding: '40px 20px' },
  container: { maxWidth: '1100px', margin: 'auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  title: { fontSize: '26px', fontWeight: '800', color: '#1e293b', margin: 0 },
  subtitle: { color: '#64748b', fontSize: '14px', marginTop: '4px' },
  addBtn: { background: '#4f46e5', color: '#fff', padding: '12px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: '600', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)' },
  card: { background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  th: { padding: '16px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0' },
  td: { padding: '16px', borderBottom: '1px solid #f1f5f9', color: '#334155', verticalAlign: 'middle' },
  id: { fontWeight: '700', color: '#4f46e5' },
  userBox: { display: 'flex', gap: '12px', alignItems: 'center' },
  avatar: { width: '36px', height: '36px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#475569' },
  userName: { fontWeight: '600', color: '#1e293b', fontSize: '14px' },
  userEmail: { fontSize: '12px', color: '#64748b' },
  productTag: { background: '#e0e7ff', color: '#4338ca', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600' },
  date: { color: '#64748b', fontSize: '13px' },
  actions: { display: 'flex', gap: '10px', justifyContent: 'flex-end' },
  edit: { background: '#f59e0b', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' },
  delete: { background: '#ef4444', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' },
  empty: { textAlign: 'center', padding: '80px', color: '#94a3b8', fontSize: '16px' },
  loader: { textAlign: 'center', padding: '100px', fontSize: '18px', fontWeight: '600', color: '#4f46e5' }
};
