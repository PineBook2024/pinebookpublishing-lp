"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ===== SIDEBAR + TABLE ICONS =====
const Icons = {
  Edit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  UserCheck: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
  ),
  Package: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
  ),
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  ),
  Products: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
  Bell: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
  ),
  TrendingUp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
  ),
  Filter: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
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

export default function AdminUsersTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [processingId, setProcessingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("users");

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://127.0.0.1:8000/api/all-data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const users = (res.data?.users || []).map((u) => ({
        id: u.user_id,
        name: `${u.first_name || ""} ${u.last_name || ""}`.trim(),
        email: u.email,
        role: "User",
        type: "user",
        status: u.status || "inactive",
        approval_status: null,
        color: "bg-blue-500",
      }));

      const authors = (res.data?.authors || []).map((a) => ({
        id: a.author_id || a.id,
        name: a.display_name || `${a.first_name || ""} ${a.last_name || ""}`.trim(),
        email: a.email || a.user?.email,
        role: "Author",
        type: "author",
        status: a.approval_status || "inactive",
        approval_status: a.approval_status,
        color: "bg-purple-500",
      }));

      const allVendorApplications = (res.data?.all_vendor_applications || []).map((v) => ({
        id: v.application_id || v.id,
        name: `${v.first_name || v.user?.first_name || ""} ${v.last_name || v.user?.last_name || ""}`.trim() || v.author_brand_name || "Vendor",
        email: v.email || v.user?.email,
        role: "Vendor",
        type: "vendor",
        status: v.application_status || "pending",
        approval_status: v.application_status,
        color: "bg-orange-500",
      }));

      setData([...users, ...authors, ...allVendorApplications]);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Filter data
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  // Delete
  const handleDelete = async (item) => {
    if (!confirm(`Delete ${item.name}?`)) return;
    const token = localStorage.getItem("token");
    const endpoint = item.type === "author" ? "authors" : item.type === "vendor" ? "vendor-applications" : "users";
    try {
      await axios.delete(`http://127.0.0.1:8000/api/${endpoint}/${item.id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (err) { alert("Delete failed"); }
  };

  // Approve
  const handleApprove = async (item) => {
    setProcessingId(item.id);
    const token = localStorage.getItem("token");
    try {
      if (item.type === "author") {
        await axios.post(`http://127.0.0.1:8000/api/admin/author/approve/${item.id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      } else if (item.type === "vendor") {
        await axios.post(`http://127.0.0.1:8000/api/admin/vendor/approve/${item.id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      }
      fetchData();
    } catch (err) { alert("Approval failed"); } finally { setProcessingId(null); }
  };

  // Reject
  const handleReject = async (item) => {
    if (!confirm(`Reject ${item.name}?`)) return;
    setProcessingId(item.id);
    const token = localStorage.getItem("token");
    try {
      if (item.type === "author") {
        await axios.post(`http://127.0.0.1:8000/api/admin/author/reject/${item.id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      } else if (item.type === "vendor") {
        await axios.post(`http://127.0.0.1:8000/api/admin/vendor/reject/${item.id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      }
      fetchData();
    } catch (err) { alert("Rejection failed"); } finally { setProcessingId(null); }
  };

  // Status badge color
  const getStatusBadge = (status) => {
    const colors = {
      active: "bg-green-100 text-green-700 border-green-200",
      approved: "bg-green-100 text-green-700 border-green-200",
      inactive: "bg-gray-100 text-gray-700 border-gray-200",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      rejected: "bg-red-100 text-red-700 border-red-200",
      under_review: "bg-blue-100 text-blue-700 border-blue-200",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  // Stats
  const stats = {
    users: data.filter((d) => d.type === "user").length,
    authors: data.filter((d) => d.type === "author").length,
    vendors: data.filter((d) => d.type === "vendor").length,
  };

  // ✅ SIDEBAR ITEMS - Saare CRUD links
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
      {/* ===== SIDEBAR ===== */}
      <motion.aside variants={sidebarVariants} initial="open" animate={sidebarOpen ? "open" : "closed"}
        className="relative z-50 flex flex-col h-full overflow-hidden text-white shadow-2xl bg-slate-900">
        <div className="flex items-center gap-3 p-6 border-b border-white/10">
          <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}
            className="flex items-center justify-center flex-shrink-0 w-10 h-10 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
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
            <Link key={item.id} href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${activeTab === item.id ? "bg-amber-600 text-white" : "text-slate-300 hover:bg-white/10"}`}
              onClick={() => setActiveTab(item.id)}>
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

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Header */}
        <header className="z-40 flex items-center justify-between h-16 px-6 border-b shadow-sm bg-white/80 backdrop-blur-xl border-gray-200/50">
          <div className="flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 transition-colors rounded-lg hover:bg-gray-100"><Icons.Menu /></motion.button>
            <h1 className="text-xl font-bold text-gray-800">User Management</h1>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-xl hover:bg-gray-100">
            <Icons.Bell />
          </motion.button>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Error */}
          {error && (
            <div className="p-4 mb-4 text-red-700 rounded-lg bg-red-50">
              {error}
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
            {[
              { label: "Users", value: stats.users, icon: Icons.Users, color: "bg-blue-500" },
              { label: "Authors", value: stats.authors, icon: Icons.UserCheck, color: "bg-purple-500" },
              { label: "Vendors", value: stats.vendors, icon: Icons.Package, color: "bg-orange-500" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                  <stat.icon />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="p-4 mb-4 bg-white border border-gray-100 shadow-sm rounded-xl">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[250px]">
                <span className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"><Icons.Search /></span>
                <input type="text" placeholder="Search by name or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex gap-2">
                {["all", "user", "author", "vendor"].map((type) => (
                  <button key={type} onClick={() => setFilterType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                      filterType === type ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}>
                    {type === "all" ? "All" : `${type}s`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase">Role</th>
                    <th className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase">Approval</th>
                    <th className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={`${item.type}-${item.id}`} className="transition-colors border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                            {item.name?.[0]?.toUpperCase() || "?"}
                          </div>
                          <span className="font-medium text-gray-800">{item.name || "N/A"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.email || "N/A"}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.type === "user" ? "bg-blue-50 text-blue-700" :
                          item.type === "author" ? "bg-purple-50 text-purple-700" :
                          "bg-orange-50 text-orange-700"
                        }`}>{item.role}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(item.status)}`}>{item.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        {(item.type === "author" || item.type === "vendor") && (
                          <div className="flex gap-2">
                            {(item.status === "pending" || item.status === "inactive" || item.status === "under_review") && (
                              <>
                                <button onClick={() => handleApprove(item)} disabled={processingId === item.id}
                                  className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors disabled:opacity-50">
                                  <Icons.Check /> Approve
                                </button>
                                <button onClick={() => handleReject(item)} disabled={processingId === item.id}
                                  className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors disabled:opacity-50">
                                  <Icons.X /> Reject
                                </button>
                              </>
                            )}
                            {item.status === "approved" && <span className="flex items-center gap-1 text-xs font-medium text-green-600"><Icons.Check /> Approved</span>}
                            {item.status === "rejected" && <span className="flex items-center gap-1 text-xs font-medium text-red-600"><Icons.X /> Rejected</span>}
                          </div>
                        )}
                        {item.type === "user" && <span className="text-xs text-gray-400">-</span>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Link href={{ pathname: "/admin/edit", query: { type: item.type, id: item.id } }}>
                            <button className="p-2 text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100" title="Edit"><Icons.Edit /></button>
                          </Link>
                          <button onClick={() => handleDelete(item)} className="p-2 text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100" title="Delete"><Icons.Trash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredData.length === 0 && (
              <div className="p-12 text-center text-gray-500">No records found</div>
            )}
            <div className="px-4 py-3 text-sm text-gray-500 border-t border-gray-100 bg-gray-50">
              Showing {filteredData.length} of {data.length} records
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}