"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// ===== ICONS =====
const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1"/>
      <rect width="7" height="5" x="14" y="3" rx="1"/>
      <rect width="7" height="9" x="14" y="12" rx="1"/>
      <rect width="7" height="5" x="3" y="16" rx="1"/>
    </svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Products: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7.5 4.27 9 5.15"/>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
      <path d="m3.3 7 8.7 5 8.7-5"/>
      <path d="M12 22V12"/>
    </svg>
  ),
  Category: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2Z"/>
    </svg>
  ),
  Coupon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  FeaturedBook: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
      <path d="m9 9 2 2 4-4"/>
    </svg>
  ),
  Marketing: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/>
      <path d="m19 9-5 5-4-4-3 3"/>
    </svg>
  ),
  Order: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
      <path d="M3 6h18"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  Refund: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9 12h6"/>
      <path d="M12 9v6"/>
    </svg>
  ),
  Review: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Shipment: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="13" x="4" y="5" rx="2"/>
      <path d="m16 2-4 4-4-4"/>
      <path d="M4 18h16"/>
    </svg>
  ),
  Wishlist: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  ),
  Withdrawal: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M16 12H8"/>
      <path d="m12 8-4 4 4 4"/>
    </svg>
  ),
  Approvals: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <path d="m9 18 2 2 4-4"/>
      <path d="M14 2v6h6"/>
    </svg>
  ),
  Permissions: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  Logout: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" x2="9" y1="12" y2="12"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  ),
};

// ===== SIDEBAR NAVIGATION ITEMS =====
const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Icons.Dashboard, href: "/admin/dashboard" },
  { id: "users", label: "Users", icon: Icons.Users, href: "/admin/users" },
  { id: "products", label: "Products", icon: Icons.Products, href: "/admin/products" },
  { id: "categories", label: "Categories", icon: Icons.Category, href: "/admin/categories" },
  { id: "coupons", label: "Coupons", icon: Icons.Coupon, href: "/admin/coupons" },
  { id: "featured-books", label: "Featured Books", icon: Icons.FeaturedBook, href: "/admin/featured-books" },
  { id: "marketing-requests", label: "Marketing", icon: Icons.Marketing, href: "/admin/marketing-requests" },
  { id: "orders", label: "Orders", icon: Icons.Order, href: "/admin/orders" },
  { id: "refunds", label: "Refunds", icon: Icons.Refund, href: "/admin/refunds" },
  { id: "reviews", label: "Reviews", icon: Icons.Review, href: "/admin/reviews" },
  { id: "shipments", label: "Shipments", icon: Icons.Shipment, href: "/admin/shipments" },
  { id: "wishlists", label: "Wishlists", icon: Icons.Wishlist, href: "/admin/wishlists" },
  { id: "withdrawals", label: "Withdrawals", icon: Icons.Withdrawal, href: "/admin/withdrawals" },
  { id: "approvals", label: "Approvals", icon: Icons.Approvals, href: "/admin/approvals" },
  { id: "permissions", label: "Permissions", icon: Icons.Permissions, href: "/admin/permissions" },
];

const sidebarVariants = {
  open: { 
    width: 280, 
    transition: { type: "spring", stiffness: 300, damping: 30 } 
  },
  closed: { 
    width: 80, 
    transition: { type: "spring", stiffness: 300, damping: 30 } 
  },
};

export default function SideNavbar({ 
  open: controlledOpen, 
  onToggle,
  className = "" 
}) {
  const pathname = usePathname();
  const [internalOpen, setInternalOpen] = useState(true);
  
  // Support both controlled and uncontrolled modes
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const toggleSidebar = onToggle || (() => setInternalOpen(!internalOpen));

  // Get current active item based on pathname
  const getActiveItem = () => {
    const current = sidebarItems.find(item => pathname?.startsWith(item.href));
    return current?.id || "dashboard";
  };

  const activeItem = getActiveItem();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin_otp_verified");
    localStorage.removeItem("user");
    window.location.href = "/admin-login";
  };

  return (
    <motion.aside 
      variants={sidebarVariants}
      initial="open"
      animate={isOpen ? "open" : "closed"}
      className={`relative z-50 flex flex-col h-full overflow-hidden text-white shadow-2xl bg-slate-900 ${className}`}
    >
      {/* ===== LOGO ===== */}
      <div className="flex items-center gap-3 p-6 border-b border-white/10">
        <motion.div 
          whileHover={{ rotate: 180 }} 
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center flex-shrink-0 w-10 h-10 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl"
        >
          <span className="text-xl font-bold">P</span>
        </motion.div>
        
        <AnimatePresence>
          {isOpen && (
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

        {/* Toggle button (visible when sidebar is open) */}
        <AnimatePresence>
          {isOpen && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="p-1 ml-auto transition-colors rounded-lg hover:bg-white/10"
            >
              <Icons.ChevronLeft />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button (visible when sidebar is closed) */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={toggleSidebar}
          className="absolute z-10 p-1 transition-colors rounded-lg top-6 right-3 hover:bg-white/10"
        >
          <Icons.ChevronRight />
        </motion.button>
      )}

      {/* ===== NAVIGATION ===== */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {sidebarItems.map((item) => {
          const isActive = activeItem === item.id;
          
          return (
            <Link 
              key={item.id} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-600/20" 
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className={`flex-shrink-0 transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`}>
                <item.icon />
              </div>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Active indicator dot */}
              {isActive && isOpen && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ===== FOOTER ===== */}
      <div className="p-4 space-y-2 border-t border-white/10">
        {/* Admin Profile */}
        <motion.div 
          whileHover={{ scale: 1.02 }} 
          className="flex items-center gap-3 px-3 py-2 transition-colors cursor-pointer rounded-xl bg-white/5 hover:bg-white/10"
        >
          <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-bold rounded-full bg-gradient-to-br from-green-400 to-blue-500">
            A
          </div>
          <AnimatePresence>
            {isOpen && (
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

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors ${
            !isOpen && "justify-center"
          }`}
        >
          <Icons.Logout />
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.aside>
  );
}