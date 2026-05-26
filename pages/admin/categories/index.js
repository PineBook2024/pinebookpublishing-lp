import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pinebookbackend.pinedigitalhub.com/api';

// ===== SIDEBAR + PAGE ICONS =====
const Icons = {
  // Sidebar Icons
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
  // Page Icons
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
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
  Folder: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  ),
  Alert: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
  Bell: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
  ),
};

// ===== SIDEBAR ANIMATION =====
const sidebarVariants = {
  open: { width: 280, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: { width: 80, transition: { type: "spring", stiffness: 300, damping: 30 } },
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("categories");
  const [notifications] = useState(3);
  const router = useRouter();

  // ===== FULL SIDEBAR ITEMS (Same as Coupons) =====
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
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
  try {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login first");
      setLoading(false);
      return;
    }

    
    const res = await axios.get(`${API_BASE_URL}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = res.data?.data || res.data || [];
    setCategories(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Error:", err);
    setError(err.response?.data?.message || "Failed to load categories");
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (id) => {
  if (!confirm("Delete this category?")) return;
  setDeleteLoading(id);
  const token = localStorage.getItem("token");
  
  try {
    // ✅ Fixed: Removed extra /api
    await axios.delete(`${API_BASE_URL}/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCategories();
  } catch (err) {
    alert(err.response?.data?.message || "Delete failed");
  } finally {
    setDeleteLoading(null);
  }
};

  const flattenCategories = (cats, level = 0) => {
    if (!Array.isArray(cats)) return [];
    let result = [];
    cats.forEach((cat) => {
      if (!cat || typeof cat !== 'object') return;
      result.push({ ...cat, level });
      const children = cat.children || [];
      if (children.length > 0) {
        result = result.concat(flattenCategories(children, level + 1));
      }
    });
    return result;
  };

  const allCategories = flattenCategories(categories);

  const filteredCategories = allCategories.filter((cat) => {
    const q = searchQuery.toLowerCase();
    return (cat.name?.toLowerCase().includes(q)) || (cat.slug?.toLowerCase().includes(q));
  });

  const getStatusBadge = (active) => active
    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
    : "bg-gray-500/10 text-gray-500 border-gray-500/20";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* ===== SIDEBAR (Same as Coupons - PineBook Style) ===== */}
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
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Top Header */}
        

        {/* Content Scroll Area - ✅ mt-0 removed, proper padding */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">

            {/* ✅ FIXED: Simple Create Button with White Card Background */}
            <div className="flex items-center justify-between p-4 mb-6 bg-white border border-gray-100 shadow-sm rounded-xl">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">All Categories</h2>
                <p className="text-sm text-gray-500">{filteredCategories.length} categor{filteredCategories.length !== 1 ? 'ies' : 'y'} found</p>
              </div>
              <Link href="/admin/categories/create" passHref>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
                >
                  <Icons.Plus /> Create Category
                </motion.button>
              </Link>
            </div>

            {/* Search */}
            <div className="relative max-w-md mb-6">
              <span className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2">
                <Icons.Search />
              </span>
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-4 mb-4 text-red-700 border border-red-200 bg-red-50 rounded-xl">
                <Icons.Alert />
                <div>
                  <p className="font-medium">{error}</p>
                  <button onClick={fetchCategories} className="mt-1 text-sm underline">Retry</button>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase">Category</th>
                      <th className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase">Slug</th>
                      <th className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase">Parent</th>
                      <th className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase">Sort</th>
                      <th className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.map((cat) => (
                      <tr key={cat.category_id || cat.id} className="transition-colors border-b border-gray-50 hover:bg-blue-50/30">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2" style={{ paddingLeft: `${(cat.level || 0) * 24}px` }}>
                            {(cat.level || 0) > 0 && <span className="text-gray-400"><Icons.ChevronRight /></span>}
                            <div className="flex items-center justify-center w-8 h-8 text-indigo-600 bg-indigo-100 rounded-lg">
                              <Icons.Folder />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{cat.name || "Unnamed"}</p>
                              {cat.description && <p className="text-xs text-gray-400 truncate max-w-[200px]">{cat.description}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono text-sm text-gray-500">{cat.slug || "-"}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {cat.parent_id ? <span className="px-2 py-1 text-xs bg-gray-100 rounded">ID: {cat.parent_id}</span> : <span className="text-xs text-gray-400">Root</span>}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(cat.is_active)}`}>
                            {cat.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{cat.sort_order ?? 0}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Link href={`/admin/categories/edit?id=${cat.category_id || cat.id}`}>
                              <button className="p-2 text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100" title="Edit">
                                <Icons.Edit />
                              </button>
                            </Link>
                            <button onClick={() => handleDelete(cat.category_id || cat.id)} disabled={deleteLoading === (cat.category_id || cat.id)} className="p-2 text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100 disabled:opacity-50" title="Delete">
                              <Icons.Trash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredCategories.length === 0 && (
                <div className="p-12 text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full mt-7">
                    <Icons.Folder />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">{searchQuery ? "No categories found" : "No categories yet"}</h3>
                  <p className="mb-4 text-sm text-gray-500">{searchQuery ? "Try a different search" : "Add your first category"}</p>
                  {!searchQuery && (
                    <Link href="/admin/categories/create">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center mt-4 gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium shadow-lg hover:bg-blue-700 mx-auto"
                      >
                        <Icons.Plus /> Create Category
                      </motion.button>
                    </Link>
                  )}
                </div>
              )}

              <div className="px-4 py-3 text-sm text-gray-500 border-t border-gray-100 bg-gray-50">
                Total: {filteredCategories.length} categories
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}