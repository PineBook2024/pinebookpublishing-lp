"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pinebookbackend.pinedigitalhub.com/api';

// ===== ICONS ===== (same as before, unchanged)
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
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Edit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
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
  UserCheck: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
  ),
  Package: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
};

const cardHover = {
  rest: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
  hover: { scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.03, type: "spring", stiffness: 300 } }),
};

export default function AdminUsersDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteModal, setDeleteModal] = useState(null);
  const [stats, setStats] = useState({ users: 0, authors: 0, vendors: 0, total: 0 });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isVerified, setIsVerified] = useState(false); // ✅ NEW: OTP verification status
  const router = useRouter();

  // ================= CHECK AUTH & OTP VERIFICATION =================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const otpVerified = localStorage.getItem("admin_otp_verified");
    
    // ✅ Check if OTP was verified
    if (!token) {
      setError("Please login first");
      setLoading(false);
      router.push("/admin/login"); // Uncomment to redirect
      return;
    }
    
    if (otpVerified !== "true") {
      setError("Please verify OTP first");
      setLoading(false);
      router.push("/admin-login"); // Uncomment to redirect
      return;
    }
    
    setIsVerified(true);
  }, [router]);

  // ================= FETCH ALL DATA =================
  const fetchData = useCallback(async () => {
    // ✅ Don't fetch if not verified
    if (!isVerified) return;
    
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");

      // ✅ Debug: Log token (remove in production)
      console.log("Token:", token?.substring(0, 20) + "...");

      const res = await axios.get(`${API_BASE_URL}/all-data`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        },
      });

      const users = res.data?.users || [];
      const authors = res.data?.authors || [];
      const allVendorApplications = res.data?.all_vendor_applications || [];

      const userData = users.map((u, index) => ({
        first_name: u.first_name || u.name?.split(' ')[0] || "",
        last_name: u.last_name || u.name?.split(' ').slice(1).join(' ') || "",
        email: u.email || "",
        role: "User",
        status: u.status || "inactive",
        type: "user",
        id: u.user_id || u.id || `user-${index}`,
        avatar: (u.first_name || u.name || "U")[0]?.toUpperCase() || "U",
        color: "from-blue-500 to-cyan-500",
      }));

      const authorData = authors.map((a, index) => ({
        first_name: a.display_name || a.first_name || a.user?.first_name || "",
        last_name: a.last_name || a.user?.last_name || "",
        email: a.email || a.user?.email || "",
        role: "Author",
        status: a.approval_status || a.status || "pending",
        type: "author",
        id: a.author_id || a.id || `author-${index}`,
        avatar: (a.display_name || a.first_name || "A")[0]?.toUpperCase() || "A",
        color: "from-purple-500 to-pink-500",
      }));

      const vendorData = allVendorApplications.map((v, index) => ({
        first_name: v.first_name || v.user?.first_name || "",
        last_name: v.last_name || v.user?.last_name || "",
        company_name: v.author_brand_name || v.company_name || v.business_name || "",
        email: v.email || v.user?.email || "",
        role: "Vendor",
        status: v.application_status || "pending",
        type: "vendor",
        id: v.application_id || v.id || `vendor-${index}`,
        avatar: (v.author_brand_name || v.first_name || "V")[0]?.toUpperCase() || "V",
        color: "from-orange-500 to-red-500",
      }));

      const allData = [...userData, ...authorData, ...vendorData];

      setData(allData);
      setStats({
        users: userData.length,
        authors: authorData.length,
        vendors: vendorData.length,
        total: allData.length,
      });

    } catch (err) {
      console.error("API Error:", err.response?.data);
      
      if (err.response?.status === 401) {
        // ✅ Token expired or invalid - clear and redirect
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("admin_otp_verified");
        // router.push("/admin/login"); // Uncomment to redirect
      } else {
        setError(`Failed to load data: ${err.response?.data?.message || err.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, [isVerified]);

  // ✅ Only fetch when verified
  useEffect(() => {
    if (isVerified) {
      fetchData();
    }
  }, [fetchData, isVerified]);

  // ================= SEARCH =================
  const filteredData = data.filter((item) => {
    const query = (searchQuery || "").toLowerCase().trim();
    if (query === "") return true;

    const firstName = (item.first_name || "").toLowerCase();
    const lastName = (item.last_name || "").toLowerCase();
    const fullName = `${firstName} ${lastName}`.trim();
    const email = (item.email || "").toLowerCase();
    const companyName = (item.company_name || "").toLowerCase();
    const role = (item.role || "").toLowerCase();

    return fullName.includes(query) || 
      email.includes(query) ||
      firstName.includes(query) ||
      lastName.includes(query) ||
      companyName.includes(query) ||
      role.includes(query);
  });

  // ================= DELETE =================
  const handleDelete = async (item) => {
    const token = localStorage.getItem("token");
    const endpoint = item.type === "author" ? "authors" : item.type === "vendor" ? "vendor-applications" : "users";

    try {
      await axios.delete(`${API_BASE_URL}/${endpoint}/${item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteModal(null);
      fetchData();
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedItems.length} items?`)) return;
    setSelectedItems([]);
  };

  // ================= TOGGLE SELECT =================
  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedItems.length === filteredData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map((d) => d.id));
    }
  };

  // ================= STATUS STYLES =================
  const getStatusStyle = (status) => {
    const styles = {
      approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
      active: "bg-emerald-100 text-emerald-700 border-emerald-200",
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      rejected: "bg-rose-100 text-rose-700 border-rose-200",
      inactive: "bg-slate-100 text-slate-700 border-slate-200",
      under_review: "bg-sky-100 text-sky-700 border-sky-200",
    };
    return styles[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  // ✅ SIDEBAR ITEMS
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

  // ✅ Show loading or error if not verified
  if (loading && !isVerified) {
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
        <header className="z-40 flex items-center justify-between h-16 px-6 border-b shadow-sm bg-white/80 backdrop-blur-xl border-gray-200/50">
          <div className="flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 transition-colors rounded-lg hover:bg-gray-100"><Icons.Menu /></motion.button>

            <div className="relative">
              <div className="absolute text-gray-400 -translate-y-1/2 pointer-events-none left-3 top-1/2"><Icons.Search /></div>
              <input type="text" placeholder="Search users, authors, vendors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="py-2 pl-10 pr-4 text-sm transition-all border border-gray-200 w-80 bg-gray-100/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-xl hover:bg-gray-100">
              <Icons.Bell />
            </motion.button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 mt-16 space-y-6 overflow-auto">
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="flex items-center gap-2 p-4 text-red-700 border border-red-200 bg-red-50 rounded-xl">
                <span className="w-2 h-2 bg-red-500 rounded-full" />{error}
                {/* ✅ Retry button for OTP verification */}
                {error.includes("OTP") && (
                  <button 
                    onClick={() => router.push("/admin/otp-verify")}
                    className="px-3 py-1 ml-auto text-xs text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Verify OTP
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats Cards */}
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Users", value: stats.users, icon: Icons.Users, color: "from-blue-500 to-cyan-500" },
              { label: "Authors", value: stats.authors, icon: Icons.UserCheck, color: "from-purple-500 to-pink-500" },
              { label: "Vendors", value: stats.vendors, icon: Icons.Package, color: "from-orange-500 to-red-500" },
              { label: "Total Records", value: stats.total, icon: Icons.TrendingUp, color: "from-emerald-500 to-teal-500" },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={staggerItem} initial="rest" whileHover="hover" animate="rest">
                <motion.div variants={cardHover} className="relative p-6 overflow-hidden bg-white border border-gray-100 shadow-lg rounded-2xl">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`} />
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <p className="mb-1 text-sm font-medium text-gray-500">{stat.label}</p>
                      <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold text-gray-800">{stat.value}</motion.h3>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}><stat.icon /></div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Actions Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {selectedItems.length > 0 && (
                <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={handleBulkDelete} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 transition-colors bg-red-50 rounded-xl hover:bg-red-100">
                  <Icons.Trash />Delete Selected ({selectedItems.length})
                </motion.button>
              )}
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={fetchData}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50">
                <Icons.Filter />Refresh
              </motion.button>
            </div>
          </motion.div>

          {/* Data Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="overflow-hidden bg-white border border-gray-100 shadow-xl rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80">
                    <th className="w-12 p-4 text-left">
                      <input type="checkbox" checked={selectedItems.length === filteredData.length && filteredData.length > 0} onChange={selectAll}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    </th>
                    <th className="p-4 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase">User</th>
                    <th className="p-4 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase">Email</th>
                    <th className="p-4 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase">Role</th>
                    <th className="p-4 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase">Status</th>
                    <th className="p-4 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredData.map((item, i) => (
                      <motion.tr key={`${item.type}-${item.id}`} custom={i} variants={rowVariants} initial="hidden" animate="visible" exit={{ opacity: 0, x: -20 }}
                        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.03)" }} className="transition-colors border-b border-gray-50 group">
                        <td className="p-4">
                          <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => toggleSelect(item.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                              {item.avatar}
                            </motion.div>
                            <div>
                              <p className="font-semibold text-gray-800 transition-colors group-hover:text-blue-600">{item.first_name} {item.last_name}</p>
                              {item.company_name && <p className="text-xs text-orange-500">{item.company_name}</p>}
                              <p className="text-xs text-gray-400">ID: {item.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{item.email}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.type === "user" ? "bg-blue-50 text-blue-700" : item.type === "author" ? "bg-purple-50 text-purple-700" : "bg-orange-50 text-orange-700"
                          }`}>{item.role}</span>
                        </td>
                        <td className="p-4">
                          <motion.span whileHover={{ scale: 1.05 }} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(item.status)}`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              item.status === "active" || item.status === "approved" ? "bg-emerald-500" : item.status === "pending" ? "bg-amber-500" : "bg-gray-500"
                            }`} />{item.status.replace(/_/g, " ")}
                          </motion.span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                            <Link href={{ pathname: "/admin/edit", query: { type: item.type, id: item.id } }}>
                              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100" title="Edit"><Icons.Edit /></motion.button>
                            </Link>
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setDeleteModal(item)} className="p-2 text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100" title="Delete"><Icons.Trash /></motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredData.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-16 text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full"><Icons.Search /></div>
                <h3 className="mb-1 text-lg font-semibold text-gray-800">No records found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search</p>
                <div className="flex justify-center gap-2 mt-4">
                  <button onClick={() => setSearchQuery("")} className="px-4 py-2 text-sm text-blue-600 rounded-lg bg-blue-50 hover:bg-blue-100">Clear Search</button>
                  <button onClick={fetchData} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Reload Data</button>
                </div>
              </motion.div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Showing <span className="font-semibold">{filteredData.length}</span> of <span className="font-semibold">{data.length}</span> records</p>
              <div className="flex gap-2">
                {[1, 2, 3].map((page) => (
                  <motion.button key={page} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className={`w-8 h-8 rounded-lg text-sm font-medium ${page === 1 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{page}</motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteModal(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()} className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full"><Icons.Trash /></div>
              <h3 className="mb-2 text-lg font-bold text-center text-gray-800">Delete Record</h3>
              <p className="mb-6 text-sm text-center text-gray-500">Are you sure you want to delete <strong>{deleteModal.first_name} {deleteModal.last_name}</strong>? This action cannot be undone.</p>
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setDeleteModal(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleDelete(deleteModal)}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-500/25">Delete</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}