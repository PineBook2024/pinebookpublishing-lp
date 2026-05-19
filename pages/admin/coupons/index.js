"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

// ===== SIDEBAR ICONS =====
const SidebarIcons = {
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
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2Z"/></svg>
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

// ===== COUPON ICONS =====
const Icons = {
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  ),
  Edit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Tag: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
  ),
  Percent: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
  ),
  Calendar: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
  ),
  AlertCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
  ),
};

const sidebarVariants = {
  open: { width: 280, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: { width: 80, transition: { type: "spring", stiffness: 300, damping: 30 } },
};

const statusBadge = (coupon) => {
  const now = new Date();
  const starts = coupon.starts_at ? new Date(coupon.starts_at) : null;
  const ends = coupon.ends_at ? new Date(coupon.ends_at) : null;

  if (!coupon.is_active) return { text: "Inactive", class: "bg-gray-100 text-gray-600 border-gray-200" };
  if (starts && now < starts) return { text: "Scheduled", class: "bg-blue-100 text-blue-700 border-blue-200" };
  if (ends && now > ends) return { text: "Expired", class: "bg-red-100 text-red-700 border-red-200" };
  if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) return { text: "Limit Reached", class: "bg-orange-100 text-orange-700 border-orange-200" };
  return { text: "Active", class: "bg-emerald-100 text-emerald-700 border-emerald-200" };
};

export default function CouponsIndex() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("coupons");
  const router = useRouter();

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: SidebarIcons.Dashboard, href: "/admin/dashboard" },
    { id: "users", label: "Users", icon: SidebarIcons.Users, href: "/admin/users" },
    { id: "products", label: "Products", icon: SidebarIcons.Products, href: "/admin/products" },
    { id: "categories", label: "Categories", icon: SidebarIcons.Category, href: "/admin/categories" },
    { id: "coupons", label: "Coupons", icon: SidebarIcons.Coupon, href: "/admin/coupons" },
    { id: "featured-books", label: "Featured Books", icon: SidebarIcons.FeaturedBook, href: "/admin/featured-books" },
    { id: "marketing-requests", label: "Marketing Requests", icon: SidebarIcons.Marketing, href: "/admin/marketing-requests" },
    { id: "orders", label: "Orders", icon: SidebarIcons.Order, href: "/admin/orders" },
    { id: "refunds", label: "Refunds", icon: SidebarIcons.Refund, href: "/admin/refunds" },
    { id: "reviews", label: "Reviews", icon: SidebarIcons.Review, href: "/admin/reviews" },
    { id: "shipments", label: "Shipments", icon: SidebarIcons.Shipment, href: "/admin/shipments" },
    { id: "wishlists", label: "Wishlists", icon: SidebarIcons.Wishlist, href: "/admin/wishlists" },
    { id: "withdrawals", label: "Withdrawals", icon: SidebarIcons.Withdrawal, href: "/admin/withdrawals" },
    { id: "approvals", label: "Approvals", icon: SidebarIcons.Approvals, href: "/admin/approvals" },
    { id: "permissions", label: "Permissions", icon: SidebarIcons.Permissions, href: "/admin/permissions" },
  ];

  const fetchCoupons = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://127.0.0.1:8000/api/coupons", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCoupons(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/coupons/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteModal(null);
      fetchCoupons();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const filtered = coupons.filter(c => 
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent" />
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
              className="p-2 transition-colors rounded-lg hover:bg-gray-100"><SidebarIcons.Menu /></motion.button>
            <h1 className="text-xl font-bold text-gray-800">Coupons</h1>
          </div>
        </header>

        {/* Coupons Content */}
        <div className="flex-1 p-6 mt-10 overflow-auto">
          <div className="mx-auto space-y-6 max-w-7xl">

            {/* ✅ FIXED: Header with Create Coupon Button - Clearly Visible */}
            <div className="flex items-center justify-between p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">All Coupons</h2>
                <p className="text-sm text-gray-500">{filtered.length} coupon{coupons.length !== 1 ? 's' : ''} found</p>
              </div>
              <Link href="/admin/coupons/create">
  <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg border-none cursor-pointer">
    <Icons.Plus /> Create Coupon
  </button>
</Link>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <div className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2">
                <Icons.Search />
              </div>
              <input
                type="text"
                placeholder="Search by code or name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-2.5 pl-10 pr-4 text-sm border border-gray-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Coupons Grid */}
            {filtered.length === 0 ? (
              <div className="p-12 text-center bg-white border border-gray-100 shadow-lg rounded-2xl">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
                  <Icons.Tag />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">No coupons found</h3>
                <p className="text-sm text-gray-500">Create your first coupon to get started</p>
                <Link href="/admin/coupons/create" className="inline-block mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg"
                  >
                    <Icons.Plus /> Create Coupon
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {filtered.map((coupon) => {
                    const status = statusBadge(coupon);
                    return (
                      <motion.div
                        key={coupon.coupon_id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative p-5 transition-shadow bg-white border border-gray-100 shadow-lg rounded-2xl group hover:shadow-xl"
                      >
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${status.class}`}>
                            {status.text}
                          </span>
                        </div>

                        {/* Code */}
                        <div className="flex items-center gap-2 mb-2">
                          <Icons.Tag />
                          <h3 className="text-lg font-bold text-gray-800">{coupon.code}</h3>
                        </div>

                        {/* Name */}
                        <p className="mb-3 text-sm text-gray-600">{coupon.name}</p>

                        {/* Discount Info */}
                        <div className="flex items-center gap-2 p-3 mb-3 rounded-xl bg-gray-50">
                          <Icons.Percent />
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {coupon.discount_type === "fixed" 
                                ? `$${coupon.discount_value} OFF` 
                                : `${coupon.discount_value}% OFF`}
                            </p>
                            {coupon.maximum_discount_amount && (
                              <p className="text-xs text-gray-500">Max: ${coupon.maximum_discount_amount}</p>
                            )}
                          </div>
                        </div>

                        {/* Meta */}
                        <div className="space-y-1.5 mb-4">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Icons.AlertCircle />
                            Min Order: ${coupon.minimum_order_amount}
                          </div>
                          {coupon.usage_limit && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Icons.AlertCircle />
                              Used: {coupon.used_count} / {coupon.usage_limit}
                            </div>
                          )}
                          {coupon.ends_at && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Icons.Calendar />
                              Expires: {new Date(coupon.ends_at).toLocaleDateString()}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                          <Link href={`/admin/coupons/${coupon.coupon_id}/edit`} className="flex-1">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center justify-center w-full gap-2 px-3 py-2 text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
                            >
                              <Icons.Edit /> Edit
                            </motion.button>
                          </Link>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setDeleteModal(coupon)}
                            className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"
                          >
                            <Icons.Trash /> Delete
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setDeleteModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm p-6 bg-white shadow-2xl rounded-2xl"
            >
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                <Icons.Trash />
              </div>
              <h3 className="mb-2 text-lg font-bold text-center text-gray-800">Delete Coupon</h3>
              <p className="mb-6 text-sm text-center text-gray-500">
                Delete <strong>{deleteModal.code}</strong>? This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteModal(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteModal.coupon_id)} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}