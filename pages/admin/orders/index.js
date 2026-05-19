import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const apiFetch = async (url, options = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...options.headers
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }

  return res.json();
};

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
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
};

const sidebarVariants = {
  open: { width: 280, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: { width: 80, transition: { type: "spring", stiffness: 300, damping: 30 } },
};

export default function OrdersIndex() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");

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
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/orders');
      const ordersList = Array.isArray(data) ? data : (data.data || []);
      setOrders(ordersList);
      setError(null);
    } catch (err) {
      console.error('Failed to load orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Get customer info from billingAddress / shippingAddress (works for both guest & logged-in)
  const getCustomerName = (order) => {
    if (order?.user?.name || order?.user?.full_name) {
      return order.user.name || order.user.full_name;
    }
    if (order?.billingAddress?.full_name) return order.billingAddress.full_name;
    if (order?.billing_address?.full_name) return order.billing_address.full_name;
    if (order?.shippingAddress?.full_name) return order.shippingAddress.full_name;
    if (order?.shipping_address?.full_name) return order.shipping_address.full_name;
    if (order?.customer_name) return order.customer_name;
    if (order?.user?.email) return order.user.email;
    return '-';
  };

  const getCustomerEmail = (order) => {
    if (order?.user?.email) return order.user.email;
    if (order?.billingAddress?.email) return order.billingAddress.email;
    if (order?.billing_address?.email) return order.billing_address.email;
    if (order?.shippingAddress?.email) return order.shippingAddress.email;
    if (order?.shipping_address?.email) return order.shipping_address.email;
    if (order?.customer_email) return order.customer_email;
    return '-';
  };

  const getCustomerPhone = (order) => {
    if (order?.user?.phone) return order.user.phone;
    if (order?.billingAddress?.phone) return order.billingAddress.phone;
    if (order?.billing_address?.phone) return order.billing_address.phone;
    if (order?.shippingAddress?.phone) return order.shippingAddress.phone;
    if (order?.shipping_address?.phone) return order.shipping_address.phone;
    if (order?.phone) return order.phone;
    return '-';
  };

  // Only flag as guest when we truly have no customer info (no user AND no address name/email)
  const isGuestOrder = (order) => {
    if (order?.user_id) return false;
    const hasName =
      order?.billingAddress?.full_name ||
      order?.billing_address?.full_name ||
      order?.shippingAddress?.full_name ||
      order?.shipping_address?.full_name ||
      order?.customer_name;
    const hasEmail =
      order?.billingAddress?.email ||
      order?.billing_address?.email ||
      order?.shippingAddress?.email ||
      order?.shipping_address?.email ||
      order?.customer_email;
    return !hasName && !hasEmail;
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
      confirmed: { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' },
      processing: { bg: '#f5f3ff', text: '#7c3aed', border: '#ddd6fe' },
      shipped: { bg: '#ecfdf5', text: '#059669', border: '#a7f3d0' },
      delivered: { bg: '#f0fdf4', text: '#16a34a', border: '#86efac' },
      cancelled: { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
      returned: { bg: '#faf5ff', text: '#9333ea', border: '#e9d5ff' }
    };
    const theme = colors[status] || colors.pending;

    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 14px', borderRadius: 20, fontSize: 12,
        fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5,
        background: theme.bg, color: theme.text, border: `1px solid ${theme.border}`
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: theme.text }} />
        {status || 'pending'}
      </span>
    );
  };

  const getPaymentBadge = (status) => {
    const colors = {
      pending: { bg: '#fffbeb', text: '#b45309', border: '#fde68a' },
      paid: { bg: '#ecfdf5', text: '#059669', border: '#a7f3d0' },
      failed: { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
      refunded: { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' }
    };
    const theme = colors[status] || colors.pending;

    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 14px', borderRadius: 20, fontSize: 12,
        fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5,
        background: theme.bg, color: theme.text, border: `1px solid ${theme.border}`
      }}>
        {status || 'pending'}
      </span>
    );
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = statusFilter === 'all' || order.order_status === statusFilter;
      const matchesPayment = paymentFilter === 'all' || order.payment_status === paymentFilter;
      const matchesSearch = !searchTerm || 
        order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getCustomerName(order).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getCustomerEmail(order).toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesPayment && matchesSearch;
    });
  }, [orders, statusFilter, paymentFilter, searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-50">
        <div className="text-5xl">🔒</div>
        <h2 className="text-xl font-bold text-red-700">Error Loading Orders</h2>
        <p className="text-gray-500">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

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
        <div className="p-6 mx-auto max-w-7xl">

          {/* Menu Toggle + Title */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-200"
            >
              <Icons.Menu />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
              <p className="text-sm text-gray-500">{filteredOrders.length} orders found</p>
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 mb-6 bg-white border border-gray-200 rounded-xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[260px]">
                <span className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2">🔍</span>
                <input
                  type="text"
                  placeholder="Search by order #, customer name, email..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full py-2.5 pl-10 pr-4 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg cursor-pointer outline-none focus:border-blue-500">
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select value={paymentFilter} onChange={e => setPaymentFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg cursor-pointer outline-none focus:border-blue-500">
                <option value="all">All Payments</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Orders', value: orders.length, color: '#2563eb', icon: '📦' },
              { label: 'Pending', value: orders.filter(o => o.order_status === 'pending').length, color: '#f59e0b', icon: '⏳' },
              { label: 'Paid', value: orders.filter(o => o.payment_status === 'paid').length, color: '#10b981', icon: '💰' },
              { label: 'Delivered', value: orders.filter(o => o.order_status === 'delivered').length, color: '#059669', icon: '✅' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 text-2xl rounded-xl" style={{ background: stat.color + '15' }}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Orders Table */}
          <div className="overflow-hidden bg-white border border-gray-200 rounded-xl">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3.5 text-xs font-semibold text-left text-gray-500 uppercase tracking-wider">Order #</th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-left text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-left text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-left text-gray-500 uppercase tracking-wider">Payment</th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-left text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-left text-gray-500 uppercase tracking-wider">Placed At</th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-right text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map(order => (
                    <tr key={order.order_id} className="transition-colors border-t border-gray-100 hover:bg-blue-50/30">
                      <td className="px-4 py-4">
                        <div className="text-sm font-bold text-blue-600">{order.order_number}</div>
                        <div className="text-xs text-gray-400 mt-0.5">ID: {order.order_id}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center text-sm font-bold text-white rounded-full w-9 h-9" style={{ background: isGuestOrder(order) ? '#9ca3af' : '#2563eb' }}>
                            {getCustomerName(order).charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-800">{getCustomerName(order)}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{getCustomerEmail(order)}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{getCustomerPhone(order)}</div>
                            {isGuestOrder(order) && (
                              <span className="inline-block px-1.5 py-0.5 mt-1 text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded">
                                Guest
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-bold text-gray-800">${parseFloat(order.total_amount || 0).toFixed(2)}</div>
                        <div className="text-xs text-gray-400 mt-0.5">Sub: ${parseFloat(order.subtotal_amount || 0).toFixed(2)}</div>
                      </td>
                      <td className="px-4 py-4">
                        {getPaymentBadge(order.payment_status)}
                        <div className="mt-1 text-xs text-gray-400 capitalize">{order.payment_method || '-'}</div>
                      </td>
                      <td className="px-4 py-4">{getStatusBadge(order.order_status)}</td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-600">{order.placed_at ? new Date(order.placed_at).toLocaleDateString() : '-'}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{order.placed_at ? new Date(order.placed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/orders/${order.order_id}`}>
                            <button className="px-3.5 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">View</button>
                          </Link>
                          <Link href={`/admin/orders/edit/${order.order_id}`}>
                            <button className="px-3.5 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">Edit</button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-16 text-center text-gray-400">
                      <div className="mb-4 text-5xl">📭</div>
                      <p className="text-base">No orders found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}