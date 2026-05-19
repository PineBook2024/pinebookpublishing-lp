import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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

const statusConfig = {
  pending: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: '⏳' },
  packed: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300', icon: '📦' },
  shipped: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-300', icon: '🚚' },
  in_transit: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300', icon: '🛣️' },
  delivered: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300', icon: '✅' },
  returned: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-300', icon: '↩️' },
};

const statusLabels = {
  pending: 'Pending',
  packed: 'Packed',
  shipped: 'Shipped',
  in_transit: 'In Transit',
  delivered: 'Delivered',
  returned: 'Returned',
};

// Date formatter
const formatDate = (dateString) => {
  if (!dateString || dateString === null || dateString === 'null') return '—';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (e) {
    return '—';
  }
};

// Date only formatter
const formatDateOnly = (dateString) => {
  if (!dateString || dateString === null || dateString === 'null') return '—';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (e) {
    return '—';
  }
};

export default function ShipmentsIndex() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("shipments");
  const router = useRouter();

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
    fetch(`${API_URL}/shipments`)
      .then(res => res.json())
      .then(data => {
        setShipments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this shipment?')) return;
    try {
      const res = await fetch(`${API_URL}/shipments/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setShipments(shipments.filter(s => s.shipment_id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Filter logic
  const filtered = shipments.filter(s => {
    const matchesStatus = filter === 'all' || s.shipping_status === filter;
    const matchesSearch =
      (s.courier_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (s.tracking_number?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      s.shipment_id.toString().includes(searchTerm) ||
      s.order_id.toString().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  // Stats
  const stats = {
    total: shipments.length,
    pending: shipments.filter(s => s.shipping_status === 'pending').length,
    shipped: shipments.filter(s => s.shipping_status === 'shipped').length,
    delivered: shipments.filter(s => s.shipping_status === 'delivered').length,
    inTransit: shipments.filter(s => s.shipping_status === 'in_transit').length,
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
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-6 mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-200"
                >
                  <Icons.Menu />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Shipments</h1>
                  <p className="mt-1 text-sm text-gray-500">Track and manage order deliveries</p>
                </div>
              </div>
              <Link href="/admin/shipments/create">
                <button className="px-4 py-2 text-white bg-blue-600 rounded">
                  New Shipment
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="px-6 py-8 mx-auto max-w-7xl">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-5">
            <div className="p-5 transition-shadow bg-white border border-gray-200 rounded-xl hover:shadow-md">
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              <p className="mt-1 text-sm font-medium text-gray-500">Total</p>
            </div>
            <div className="p-5 transition-shadow bg-white border border-gray-200 rounded-xl hover:shadow-md">
              <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
              <p className="mt-1 text-sm font-medium text-gray-500">Pending</p>
            </div>
            <div className="p-5 transition-shadow bg-white border border-gray-200 rounded-xl hover:shadow-md">
              <p className="text-3xl font-bold text-indigo-600">{stats.shipped}</p>
              <p className="mt-1 text-sm font-medium text-gray-500">Shipped</p>
            </div>
            <div className="p-5 transition-shadow bg-white border border-gray-200 rounded-xl hover:shadow-md">
              <p className="text-3xl font-bold text-blue-600">{stats.inTransit}</p>
              <p className="mt-1 text-sm font-medium text-gray-500">In Transit</p>
            </div>
            <div className="p-5 transition-shadow bg-white border border-gray-200 rounded-xl hover:shadow-md">
              <p className="text-3xl font-bold text-emerald-600">{stats.delivered}</p>
              <p className="mt-1 text-sm font-medium text-gray-500">Delivered</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 p-4 mb-6 bg-white border border-gray-200 rounded-xl sm:flex-row">
            <div className="relative flex-1">
              <svg className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by ID, order, courier, tracking..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            >
              <option value="all">All Status</option>
              {Object.entries(statusLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">Shipment</th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">Order</th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">Courier & Tracking</th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">Shipped</th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">Delivered</th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-right text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    [...Array(3)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        {[...Array(7)].map((_, j) => (
                          <td key={j} className="px-6 py-4"><div className="w-3/4 h-4 bg-gray-200 rounded"></div></td>
                        ))}
                      </tr>
                    ))
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center w-16 h-16 mb-3 bg-gray-100 rounded-full">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                          <p className="font-medium text-gray-500">No shipments found</p>
                          <p className="mt-1 text-sm text-gray-400">Try adjusting your search or filters</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map(s => {
                      const status = statusConfig[s.shipping_status] || statusConfig.pending;
                      return (
                        <tr key={s.shipment_id} className="transition-colors hover:bg-blue-50/50 group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-10 h-10 text-sm font-bold text-white rounded-lg shadow-sm bg-gradient-to-br from-blue-500 to-blue-600">
                                #{s.shipment_id}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">Shipment #{s.shipment_id}</p>
                                <p className="text-xs text-gray-500">{formatDate(s.created_at)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center w-8 h-8 text-xs font-bold text-gray-600 bg-gray-100 rounded-full">
                                O
                              </div>
                              <span className="text-sm font-medium text-gray-700">Order #{s.order_id}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{s.courier_name || '—'}</p>
                              <p className="text-xs text-gray-500 font-mono mt-0.5">{s.tracking_number || 'No tracking'}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${status.bg} ${status.text} ${status.border}`}>
                              <span>{status.icon}</span>
                              {statusLabels[s.shipping_status]}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${s.shipped_at ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                              <span className="text-sm text-gray-600">{formatDateOnly(s.shipped_at)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${s.delivered_at ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                              <span className="text-sm text-gray-600">{formatDateOnly(s.delivered_at)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                              <Link href={`/admin/shipments/${s.shipment_id}/edit`}>
                                <button className="p-2 text-blue-600 transition-colors rounded-lg hover:bg-blue-50" title="Edit">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                              </Link>
                              <button
                                onClick={() => handleDelete(s.shipment_id)}
                                className="p-2 text-red-600 transition-colors rounded-lg hover:bg-red-50"
                                title="Delete"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
              <span className="text-sm text-gray-500">
                Showing {filtered.length} of {shipments.length} shipments
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
