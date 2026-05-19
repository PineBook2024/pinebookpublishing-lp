"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Icons
const Icons = {
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  Save: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
  ),
  Refresh: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>
  ),
  Lock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  Alert: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  ),
};

const ROLES = [
  { id: "admin", name: "Admin", color: "bg-red-500" },
  { id: "vendor", name: "Vendor", color: "bg-orange-500" },
  { id: "customer", name: "Customer", color: "bg-blue-500" },
];

const ACTION_OPTIONS = [
  { value: "CRUD", label: "CRUD", color: "bg-green-100 text-green-700" },
  { value: "view", label: "View", color: "bg-blue-100 text-blue-700" },
  { value: "create", label: "Create", color: "bg-yellow-100 text-yellow-700" },
  { value: "self only", label: "Self Only", color: "bg-purple-100 text-purple-700" },
  { value: "own", label: "Own", color: "bg-indigo-100 text-indigo-700" },
  { value: "approve", label: "Approve", color: "bg-pink-100 text-pink-700" },
  { value: "moderate", label: "Moderate", color: "bg-teal-100 text-teal-700" },
  { value: "process", label: "Process", color: "bg-cyan-100 text-cyan-700" },
  { value: "manage", label: "Manage", color: "bg-amber-100 text-amber-700" },
  { value: "reply", label: "Reply", color: "bg-lime-100 text-lime-700" },
  { value: "request", label: "Request", color: "bg-violet-100 text-violet-700" },
  { value: "❌", label: "No Access", color: "bg-red-100 text-red-700" },
];

const getDefaultPermissions = () => [
  { table: "users", admin: "CRUD", vendor: "self only", customer: "self only" },
  { table: "vendor_applications", admin: "CRUD", vendor: "create", customer: "❌" },
  { table: "authors", admin: "CRUD", vendor: "self only", customer: "❌" },
  { table: "categories", admin: "CRUD", vendor: "❌", customer: "❌" },
  { table: "products", admin: "CRUD", vendor: "CRUD", customer: "view" },
  { table: "product_files", admin: "CRUD", vendor: "CRUD", customer: "❌" },
  { table: "carts", admin: "❌", vendor: "❌", customer: "CRUD" },
  { table: "orders", admin: "view", vendor: "own", customer: "own" },
  { table: "order_items", admin: "view", vendor: "view", customer: "view" },
  { table: "payments", admin: "view", vendor: "❌", customer: "create" },
  { table: "refunds", admin: "process", vendor: "request", customer: "request" },
  { table: "reviews", admin: "moderate", vendor: "reply", customer: "create" },
  { table: "withdrawal_requests", admin: "manage", vendor: "create", customer: "❌" },
  { table: "marketing_requests", admin: "approve", vendor: "create", customer: "❌" },
];

export default function PermissionsPage() {
  const router = useRouter();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // ✅ FIX: Check auth on mount with delay
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userStr = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        
        console.log("🔍 Checking auth...");
        console.log("Token exists:", !!token);
        console.log("User string:", userStr);
        
        if (!token || !userStr) {
          console.log("❌ No token or user, redirecting to login...");
          router.push("/login");
          return;
        }
        
        const parsed = JSON.parse(userStr);
        console.log("✅ Parsed user:", parsed);
        console.log("User role:", parsed.role);
        
        setCurrentUser(parsed);
        
        // ✅ FIX: Check if admin
        if (parsed.role !== "admin") {
          console.log("❌ Not admin, redirecting to dashboard...");
          router.push("/dashboard");
          return;
        }
        
        console.log("✅ Admin confirmed, loading permissions...");
        setIsReady(true);
        
      } catch (e) {
        console.error("❌ Auth error:", e);
        router.push("/login");
      }
    };

    // Small delay to ensure localStorage is ready
    setTimeout(checkAuth, 100);
  }, [router]);

  // Load permissions only when ready
  useEffect(() => {
    if (!isReady) return;
    
    loadPermissions();
  }, [isReady]);

  const loadPermissions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      console.log("🔍 Loading permissions with token...");
      
      const res = await axios.get("http://127.0.0.1:8000/api/permissions", {
        headers: { Authorization: "Bearer " + token },
      });

      console.log("✅ Permissions loaded:", res.data);
      
      if (res.data && res.data.permissions && res.data.permissions.length > 0) {
        setPermissions(res.data.permissions);
      } else {
        setPermissions(getDefaultPermissions());
      }
    } catch (err) {
      console.error("❌ API error:", err.response?.status, err.response?.data);
      
      if (err.response?.status === 403) {
        setError("Forbidden: You are not admin. Role: " + (currentUser?.role || "unknown"));
      } else if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setPermissions(getDefaultPermissions());
      }
    } finally {
      setLoading(false);
    }
  };

  const updatePermission = (table, role, value) => {
    setPermissions((prev) =>
      prev.map((p) => (p.table === table ? { ...p, [role]: value } : p))
    );
  };

  const savePermissions = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");
      
      await axios.post(
        "http://127.0.0.1:8000/api/permissions",
        { permissions: permissions },
        { headers: { Authorization: "Bearer " + token } }
      );

      setSuccess("Permissions saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save permissions");
    } finally {
      setSaving(false);
    }
  };

  const resetDefaults = () => {
    if (typeof window !== "undefined" && window.confirm("Reset to default permissions?")) {
      setPermissions(getDefaultPermissions());
      setSuccess("Reset to defaults. Click Save to apply.");
    }
  };

  const getActionColor = (action) => {
    const option = ACTION_OPTIONS.find((o) => o.value === action);
    return option ? option.color : "bg-gray-100 text-gray-700";
  };

  // Show loading while checking auth
  if (loading || !isReady) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 mb-4 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
        <p className="text-gray-500">Checking permissions...</p>
      </div>
    );
  }

  // Show access denied
  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 text-center bg-white border border-red-200 shadow-lg rounded-2xl">
          <div className="flex justify-center mb-4 text-red-500">
            <Icons.Alert />
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-800">Access Denied</h2>
          <p className="text-gray-500">You need admin privileges to view this page.</p>
          <p className="mt-2 text-sm text-gray-400">
            Current: {currentUser ? currentUser.role : "Not logged in"}
          </p>
          <button 
            onClick={() => router.push("/login")}
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header */}
      <div className="mx-auto mb-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 mb-2 text-2xl font-bold text-gray-800">
              <span className="p-2 text-white bg-indigo-600 rounded-lg">
                <Icons.Shield />
              </span>
              Role Permissions Manager
            </h1>
            <p className="text-gray-500">Manage access control for all user roles</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={resetDefaults}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Icons.Refresh />
              Reset
            </button>
            <button
              onClick={savePermissions}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              <Icons.Save />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-center gap-2 p-4 mx-auto mb-4 text-red-700 border border-red-200 rounded-lg max-w-7xl bg-red-50">
          <Icons.Alert />
          {error}
        </div>
      )}
      
      {success && (
        <div className="flex items-center gap-2 p-4 mx-auto mb-4 text-green-700 border border-green-200 rounded-lg max-w-7xl bg-green-50">
          <Icons.Check />
          {success}
        </div>
      )}

      {/* Role Legend */}
      <div className="grid grid-cols-1 gap-4 mx-auto mb-6 max-w-7xl md:grid-cols-3">
        {ROLES.map((role) => (
          <div key={role.id} className="flex items-center gap-3 p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
            <div className={role.color + " w-10 h-10 rounded-lg flex items-center justify-center text-white"}>
              <Icons.Lock />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{role.name}</p>
              <p className="text-xs text-gray-500 capitalize">{role.id} Role</p>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Table */}
      <div className="mx-auto overflow-hidden bg-white border border-gray-100 shadow-sm max-w-7xl rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="sticky left-0 z-10 px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase bg-gray-50">
                  Table / Resource
                </th>
                {ROLES.map((role) => (
                  <th key={role.id} className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <div className={role.color + " w-2 h-2 rounded-full"} />
                      {role.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm, index) => (
                <tr 
                  key={perm.table} 
                  className={"border-b border-gray-50 hover:bg-gray-50/50 transition-colors " + (index % 2 === 0 ? "bg-white" : "bg-gray-50/30")}
                >
                  <td className="sticky left-0 z-10 px-4 py-3 bg-inherit">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 font-mono text-xs font-medium text-gray-600 bg-gray-100 rounded">
                        {perm.table}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={perm.admin}
                      onChange={(e) => updatePermission(perm.table, "admin", e.target.value)}
                      className={"w-full px-3 py-1.5 text-xs font-medium rounded-lg border-0 cursor-pointer focus:ring-2 focus:ring-indigo-500 " + getActionColor(perm.admin)}
                    >
                      {ACTION_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={perm.vendor}
                      onChange={(e) => updatePermission(perm.table, "vendor", e.target.value)}
                      className={"w-full px-3 py-1.5 text-xs font-medium rounded-lg border-0 cursor-pointer focus:ring-2 focus:ring-orange-500 " + getActionColor(perm.vendor)}
                    >
                      {ACTION_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={perm.customer}
                      onChange={(e) => updatePermission(perm.table, "customer", e.target.value)}
                      className={"w-full px-3 py-1.5 text-xs font-medium rounded-lg border-0 cursor-pointer focus:ring-2 focus:ring-blue-500 " + getActionColor(perm.customer)}
                    >
                      {ACTION_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
          <p className="text-sm text-gray-500">Total {permissions.length} resources configured</p>
          <p className="text-xs text-gray-400">Changes are saved to database when you click Save Changes</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mx-auto mt-6 max-w-7xl md:grid-cols-4">
        {[
          { label: "Total Tables", value: permissions.length, color: "text-indigo-600" },
          { label: "Admin Full Access", value: permissions.filter(p => p.admin.includes("CRUD")).length, color: "text-red-600" },
          { label: "Vendor Restricted", value: permissions.filter(p => p.vendor.includes("own") || p.vendor.includes("self")).length, color: "text-orange-600" },
          { label: "Customer Limited", value: permissions.filter(p => p.customer === "❌").length, color: "text-blue-600" },
        ].map((stat) => (
          <div key={stat.label} className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
            <p className={"text-2xl font-bold " + stat.color}>{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}