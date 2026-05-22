import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const GUEST_KEY = "pinebook_cart_guest";
const getKey = () => {
  const uid = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
  return uid ? `pinebook_cart_${uid}` : GUEST_KEY;
};

const loadStorage = () => {
  if (typeof window === "undefined") return [];
  try {
    const s = localStorage.getItem(getKey());
    if (s) { const p = JSON.parse(s); if (Array.isArray(p)) return p; }
  } catch (e) {}
  return [];
};

// ✅ FIX: Added clearCart function
const clearCart = () => {
  if (typeof window === "undefined") return;
  const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
  const uid = localStorage.getItem("user_id");
  
  // Clear localStorage cart
  localStorage.removeItem(getKey());
  localStorage.removeItem(GUEST_KEY);
  if (uid) {
    localStorage.removeItem(`pinebook_cart_${uid}`);
  }
  
  // Clear backend cart if logged in
  if (token) {
    fetch(`${API_BASE_URL}/cart/clear`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
    }).catch(() => {});
  }
  
  // Dispatch event to update cart count in navbar
  window.dispatchEvent(new CustomEvent("auth_changed"));
  window.dispatchEvent(new StorageEvent("storage", { key: getKey() }));
};

const fetchBackendCart = async (token) => {
  try {
    const r = await fetch(`${API_BASE_URL}/cart/user`, {
      headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
    });
    if (r.ok) { const d = await r.json(); return d.items || []; }
  } catch (e) {}
  return [];
};

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "", email: "", phone: "", address_line1: "", address_line2: "",
    city: "", state_province: "", country: "US", zip_postal_code: "",
    address_type: "billing", paymentMethod: "stripe", notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [errors, setErrors] = useState({});

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { coupon_id, code, name, ... }
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
    const uid = localStorage.getItem("user_id");
    setIsLoggedIn(!!token && !!uid);
  }, []);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
      const uid = localStorage.getItem("user_id");
      let items = [];
      if (token && uid) {
        items = await fetchBackendCart(token);
      } else {
        items = loadStorage();
      }
      setCartItems(items);
      let t = 0, c = 0;
      items.forEach(it => {
        const up = parseFloat(it?.discount_price) > 0 ? parseFloat(it.discount_price) : parseFloat(it?.price) || 0;
        const q = parseInt(it?.quantity) || 1;
        t += up * q; c += q;
      });
      setCartTotal(t); setCartCount(c); setIsLoaded(true);
    };
    load();
    const hf = () => load();
    window.addEventListener("focus", hf);
    window.addEventListener("storage", hf);
    return () => { window.removeEventListener("focus", hf); window.removeEventListener("storage", hf); };
  }, []);

  const discountedSubtotal = Math.max(cartTotal - couponDiscount, 0);
  const shippingCost = discountedSubtotal >= 50 ? 0 : (cartItems.length === 0 ? 0 : 9.99);
  const taxRate = 0.08;
  const taxAmount = discountedSubtotal * taxRate;
  const finalTotal = discountedSubtotal + shippingCost + taxAmount;

  // Re-validate coupon when cart total changes (e.g., if min order is no longer met)
  useEffect(() => {
    if (!appliedCoupon) return;
    const minOrder = parseFloat(appliedCoupon.minimum_order_amount) || 0;
    if (cartTotal < minOrder) {
      setAppliedCoupon(null);
      setCouponDiscount(0);
      setCouponError(`Coupon removed: minimum order of $${minOrder.toFixed(2)} not met`);
      setCouponSuccess("");
    }
  }, [cartTotal, appliedCoupon]);

  const handleApplyCoupon = async () => {
    const code = (couponInput || "").trim();
    setCouponError("");
    setCouponSuccess("");
    if (!code) {
      setCouponError("Please enter a coupon code");
      return;
    }
    if (cartItems.length === 0) {
      setCouponError("Add items to your cart before applying a coupon");
      return;
    }
    setCouponLoading(true);
    try {
      const r = await fetch(`${API_BASE_URL}/coupons/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ code, order_amount: cartTotal }),
      });
      const d = await r.json();
      if (!r.ok) {
        setAppliedCoupon(null);
        setCouponDiscount(0);
        setCouponError(d?.message || "Invalid coupon");
        return;
      }
      const discount = parseFloat(d.discount) || 0;
      setAppliedCoupon(d.coupon);
      setCouponDiscount(discount);
      setCouponSuccess(`Coupon "${d.coupon.code}" applied — you saved $${discount.toFixed(2)}`);
    } catch (e) {
      setCouponError("Failed to apply coupon. Please try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponInput("");
    setCouponError("");
    setCouponSuccess("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: null }));
  };

  const validate = () => {
    const ne = {};
    if (!formData.full_name.trim()) ne.full_name = "Required";
    if (!formData.email.trim()) ne.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) ne.email = "Invalid";
    if (!formData.address_line1.trim()) ne.address_line1 = "Required";
    if (!formData.city.trim()) ne.city = "Required";
    if (!formData.zip_postal_code.trim()) ne.zip_postal_code = "Required";
    setErrors(ne);
    return Object.keys(ne).length === 0;
  };

  const handleStripe = async () => {
    setIsSubmitting(true);
    setErrors({});
    try {
        const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
        
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };
        
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        
        const r = await fetch(`${API_BASE_URL}/stripe/checkout`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                items: cartItems.map(it => ({
                    product_id: it.product_id || it.id,
                    name: it.title || it.name || "Product",
                    price: parseFloat(it?.discount_price) > 0 ? parseFloat(it.discount_price) : parseFloat(it?.price) || 0,
                    quantity: parseInt(it?.quantity) || 1,
                    image: it.cover_image_url || it.image || it.cover_image || null,
                })),
                customer_email: formData.email,
                customer_name: formData.full_name,
                phone: formData.phone || null,
                billing_address: {
                    full_name: formData.full_name,
                    email: formData.email,
                    phone: formData.phone || null,
                    address_line1: formData.address_line1,
                    address_line2: formData.address_line2 || null,
                    city: formData.city,
                    state_province: formData.state_province || null,
                    country: formData.country,
                    zip_postal_code: formData.zip_postal_code,
                    address_type: "billing",
                    is_default: true,
                },
                shipping_address: {
                    full_name: formData.full_name,
                    email: formData.email,
                    phone: formData.phone || null,
                    address_line1: formData.address_line1,
                    address_line2: formData.address_line2 || null,
                    city: formData.city,
                    state_province: formData.state_province || null,
                    country: formData.country,
                    zip_postal_code: formData.zip_postal_code,
                },
                order_notes: formData.notes || null,
                subtotal: cartTotal,
                shipping: shippingCost,
                tax: taxAmount,
                total: finalTotal,
                discount_amount: couponDiscount,
                coupon_id: appliedCoupon?.coupon_id || null,
                coupon_code: appliedCoupon?.code || null,
            }),
        });
        
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || d.message || "Failed");
        
        if (d.url) {
            // ✅ clearCart is now defined above
            clearCart();
            window.location.href = d.url;
        }
        else throw new Error("No URL");
    } catch (e) { 
        setErrors({ submit: e.message }); 
    } finally { 
        setIsSubmitting(false); 
    }
  };

  const handleCOD = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
      
      const headers = { 
        "Content-Type": "application/json", 
        "Accept": "application/json" 
      };
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      
      const r = await fetch(`${API_BASE_URL}/checkout`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          billing_address: {
            full_name: formData.full_name,
            email: formData.email,
            phone: formData.phone,
            address_line1: formData.address_line1,
            address_line2: formData.address_line2 || null,
            city: formData.city,
            state_province: formData.state_province || null,
            country: formData.country,
            zip_postal_code: formData.zip_postal_code,
            address_type: "billing",
            is_default: true,
          },
          items: cartItems.map(it => ({
            product_id: it.product_id || it.id,
            quantity: parseInt(it?.quantity) || 1,
            unit_price: parseFloat(it?.discount_price) > 0 ? parseFloat(it.discount_price) : parseFloat(it?.price) || 0,
          })),
          subtotal_amount: cartTotal,
          shipping_amount: shippingCost,
          tax_amount: taxAmount,
          total_amount: finalTotal,
          discount_amount: couponDiscount,
          coupon_id: appliedCoupon?.coupon_id || null,
          coupon_code: appliedCoupon?.code || null,
          payment_method: "cod",
          notes: formData.notes || null,
        }),
      });
      const d = await r.json();
      if (r.ok && d.success) {
        setOrderNumber(d.order_number);
        setOrderPlaced(true);
        // ✅ Use clearCart here too
        clearCart();
        setCartItems([]);
        setCartTotal(0);
        setCartCount(0);
      } else { 
        setErrors({ submit: d?.message || "Failed" }); 
      }
    } catch (e) { setErrors({ submit: "Failed" }); } finally { setIsSubmitting(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (cartItems.length === 0) { alert("Cart empty!"); return; }
    if (formData.paymentMethod === "stripe") await handleStripe();
    else if (formData.paymentMethod === "cod") await handleCOD();
    else alert("Coming soon!");
  };

  const getImageUrl = (it) => {
    if (!it) return "/images/placeholder-book.png";
    let p = it?.cover_image_url || it?.image || it?.cover_image;
    if (!p) return "/images/placeholder-book.png";
    if (typeof p !== "string") return "/images/placeholder-book.png";
    if (p.startsWith("http")) return p;
    return `${API_BASE_URL.replace('/api', '')}/storage/${p.startsWith("/") ? p.substring(1) : p}`;
  };

  const fmt = (p) => (parseFloat(p) || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  if (!isLoaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <div style={{ width: 48, height: 48, border: "3px solid #e5e7eb", borderTopColor: "#f97316", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
      <style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style>
    </div>
  );

  if (orderPlaced) return (
    <>
      <Head><title>Order Confirmed</title></Head>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <div style={{ maxWidth: 448, padding: 32, margin: "0 16px", textAlign: "center", backgroundColor: "#fff", borderRadius: 16, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, margin: "0 auto 16px", backgroundColor: "#dcfce7", borderRadius: "50%" }}>
            <svg width="32" height="32" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          </div>
          <h2 style={{ marginBottom: 8, fontSize: 24, fontWeight: 700, color: "#111827" }}>Order Placed!</h2>
          {orderNumber && <p style={{ marginBottom: 16, fontFamily: "monospace", fontSize: 18, color: "#6b7280" }}>{orderNumber}</p>}
          <p style={{ marginBottom: 24, color: "#6b7280" }}>Thank you for your purchase.</p>
          <Link href="/shop" style={{ display: "inline-block", padding: "12px 24px", fontWeight: 600, color: "#fff", backgroundColor: "#f97316", borderRadius: 8, textDecoration: "none" }}>Continue Shopping</Link>
        </div>
      </div>
    </>
  );

  const T = {
    bg: "#fafaf9",
    surface: "#ffffff",
    surfaceMuted: "#f8fafc",
    border: "#e7e5e4",
    borderSoft: "#f1f5f9",
    text: "#0f172a",
    textMuted: "#64748b",
    textSubtle: "#94a3b8",
    accent: "#f97316",
    accentSoft: "#fff7ed",
    accentDark: "#ea580c",
    success: "#16a34a",
    successSoft: "#f0fdf4",
    danger: "#dc2626",
    dangerSoft: "#fef2f2",
  };

  const styles = {
    page: { minHeight: "100vh", backgroundColor: T.bg, fontFamily: "ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif", color: T.text },
    header: { backgroundColor: T.surface, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(8px)" },
    headerInner: { maxWidth: 1200, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 },
    brand: { display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: T.text, fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" },
    brandDot: { width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 800 },
    secureBadge: { display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", fontSize: 12, fontWeight: 500, color: T.textMuted, backgroundColor: T.surfaceMuted, border: `1px solid ${T.border}`, borderRadius: 999 },
    container: { maxWidth: 1200, margin: "0 auto", padding: "28px 20px 64px" },
    crumbs: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: T.textMuted, marginBottom: 18 },
    crumbLink: { color: T.textMuted, textDecoration: "none" },
    crumbActive: { fontWeight: 600, color: T.text },
    h1: { fontSize: 30, fontWeight: 800, color: T.text, marginBottom: 6, letterSpacing: "-0.02em" },
    sub: { fontSize: 14, color: T.textMuted, marginBottom: 28 },
    alert: (kind) => ({
      padding: "12px 16px", marginBottom: 16, borderRadius: 12, fontSize: 14,
      backgroundColor: kind === "info" ? "#eff6ff" : kind === "warn" ? "#fffbeb" : T.dangerSoft,
      border: `1px solid ${kind === "info" ? "#bfdbfe" : kind === "warn" ? "#fde68a" : "#fecaca"}`,
      color: kind === "info" ? "#1e40af" : kind === "warn" ? "#92400e" : "#991b1b",
      display: "flex", alignItems: "center", gap: 10,
    }),
    grid: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 420px)", gap: 28, alignItems: "start" },
    card: { backgroundColor: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: "0 1px 2px rgba(15,23,42,0.04)" },
    cardHead: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18, paddingBottom: 14, borderBottom: `1px solid ${T.borderSoft}` },
    stepNum: { width: 30, height: 30, borderRadius: 10, backgroundColor: T.accentSoft, color: T.accentDark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 },
    cardTitle: { fontSize: 16, fontWeight: 700, color: T.text, letterSpacing: "-0.01em" },
    cardTitleSub: { fontSize: 12, color: T.textMuted, marginTop: 2 },
    label: { display: "block", marginBottom: 6, fontSize: 13, fontWeight: 500, color: "#334155" },
    input: { width: "100%", padding: "11px 14px", fontSize: 14, border: `1px solid ${T.border}`, borderRadius: 10, backgroundColor: T.surface, color: T.text, outline: "none", boxSizing: "border-box", transition: "border-color 120ms, box-shadow 120ms" },
    inputErr: { borderColor: T.danger, backgroundColor: T.dangerSoft },
    errTxt: { marginTop: 6, fontSize: 12, color: T.danger, display: "flex", alignItems: "center", gap: 4 },
    rowTwo: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
    rowOne: { display: "grid", gridTemplateColumns: "1fr", gap: 14 },
    payOpt: (sel, disabled) => ({
      display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
      border: sel ? `1.5px solid ${T.accent}` : `1px solid ${T.border}`,
      borderRadius: 12, cursor: disabled ? "not-allowed" : "pointer",
      backgroundColor: sel ? T.accentSoft : T.surface, opacity: disabled ? 0.55 : 1,
      transition: "all 120ms",
    }),
    payIcon: { width: 36, height: 36, borderRadius: 8, backgroundColor: T.surfaceMuted, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
    payLabel: { flex: 1, fontSize: 14, fontWeight: 600, color: T.text },
    paySub: { fontSize: 12, color: T.textMuted, fontWeight: 400, marginTop: 2 },
    submit: (dis) => ({
      width: "100%", padding: "15px 20px", fontSize: 15, fontWeight: 700, color: "#fff",
      background: dis ? "#cbd5e1" : `linear-gradient(180deg, ${T.accent}, ${T.accentDark})`,
      border: "none", borderRadius: 12, cursor: dis ? "not-allowed" : "pointer",
      boxShadow: dis ? "none" : "0 4px 12px rgba(249,115,22,0.25)",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8, letterSpacing: "-0.01em",
    }),
    summary: { backgroundColor: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: 24, position: "sticky", top: 92, boxShadow: "0 1px 2px rgba(15,23,42,0.04)" },
    sumHead: { fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 4, letterSpacing: "-0.01em" },
    sumSub: { fontSize: 12, color: T.textMuted, marginBottom: 18 },
    itemsBox: { display: "flex", flexDirection: "column", gap: 12, marginBottom: 18, maxHeight: 320, overflowY: "auto", paddingRight: 4 },
    itemRow: { display: "flex", gap: 12, alignItems: "center", padding: 8, borderRadius: 10, backgroundColor: T.surfaceMuted, border: `1px solid ${T.borderSoft}` },
    itemImg: { position: "relative", width: 52, height: 68, flexShrink: 0, backgroundColor: T.surface, borderRadius: 8, overflow: "hidden", border: `1px solid ${T.border}` },
    qtyBadge: { position: "absolute", top: -6, right: -6, minWidth: 20, height: 20, padding: "0 6px", borderRadius: 10, backgroundColor: T.text, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" },
    progress: { padding: "10px 12px", marginBottom: 16, borderRadius: 10, backgroundColor: T.successSoft, border: `1px solid #bbf7d0`, fontSize: 12, color: "#15803d", fontWeight: 500 },
    progressNeed: { padding: "10px 12px", marginBottom: 16, borderRadius: 10, backgroundColor: "#fffbeb", border: `1px solid #fde68a`, fontSize: 12, color: "#92400e", fontWeight: 500 },
    progressBar: { height: 4, backgroundColor: "rgba(0,0,0,0.06)", borderRadius: 2, overflow: "hidden", marginTop: 6 },
    progressFill: { height: "100%", backgroundColor: T.accent, borderRadius: 2, transition: "width 200ms" },
    couponWrap: { borderTop: `1px solid ${T.borderSoft}`, paddingTop: 16, marginBottom: 16 },
    couponHead: { display: "flex", alignItems: "center", gap: 6, marginBottom: 10, fontSize: 13, fontWeight: 600, color: "#334155" },
    couponApplied: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", backgroundColor: T.successSoft, border: `1px dashed #34d399`, borderRadius: 10 },
    couponInput: { flex: 1, padding: "11px 14px", fontSize: 13, border: `1px solid ${T.border}`, borderRadius: 10, backgroundColor: T.surface, color: T.text, outline: "none", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 },
    couponBtn: (dis) => ({ padding: "11px 18px", fontSize: 13, fontWeight: 600, color: "#fff", backgroundColor: dis ? "#cbd5e1" : T.text, border: "none", borderRadius: 10, cursor: dis ? "not-allowed" : "pointer", whiteSpace: "nowrap" }),
    totals: { borderTop: `1px solid ${T.borderSoft}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 },
    row: { display: "flex", justifyContent: "space-between", fontSize: 14, color: T.textMuted },
    rowVal: { fontWeight: 500, color: T.text },
    grand: { display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 18, fontWeight: 700, borderTop: `1px dashed ${T.border}`, paddingTop: 14, marginTop: 4 },
    trust: { display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 16, paddingTop: 16, borderTop: `1px solid ${T.borderSoft}`, fontSize: 11, color: T.textSubtle },
  };

  const LockIcon = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>);
  const ChevronRight = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>);
  const TagIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>);
  const CardIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>);
  const PaypalIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070ba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11l1.5-7h4.5c2.5 0 4 1.5 4 3.5 0 2.5-2 4.5-5 4.5H9.5L9 14H7z"/><path d="M5 14l1.5-7"/></svg>);
  const GpayIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M8 13h2"/><path d="M14 13h2"/></svg>);
  const CashIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>);
  const ErrIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>);
  const CheckIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>);

  const payMethods = [
    { value: "stripe", label: "Credit / Debit Card", sub: "Pay securely via Stripe", icon: <CardIcon />, disabled: false },
    { value: "paypal", label: "PayPal", sub: "Coming soon", icon: <PaypalIcon />, disabled: true },
    { value: "google_pay", label: "Google Pay", sub: "Coming soon", icon: <GpayIcon />, disabled: true },
    { value: "cod", label: "Cash on Delivery", sub: "Pay when you receive your order", icon: <CashIcon />, disabled: false },
  ];

  const freeShipRemaining = Math.max(50 - discountedSubtotal, 0);
  const freeShipPct = Math.min((discountedSubtotal / 50) * 100, 100);

  return (
    <>
      <Head><title>Checkout | Pine Book</title></Head>
      <div style={styles.page}>
        <div style={styles.header}>
          <div style={styles.headerInner}>
            <Link href="/" style={styles.brand}>
              <span style={styles.brandDot}>P</span>
              <span>Pine Book</span>
            </Link>
            <div style={styles.secureBadge}>
              <LockIcon /> Secure Checkout
            </div>
          </div>
        </div>

        <div style={styles.container}>
          <nav style={styles.crumbs}>
            <Link href="/" style={styles.crumbLink}>Home</Link>
            <ChevronRight />
            <Link href="/shop" style={styles.crumbLink}>Shop</Link>
            <ChevronRight />
            <span style={styles.crumbActive}>Checkout</span>
          </nav>

          <h1 style={styles.h1}>Complete your order</h1>
          <p style={styles.sub}>Fill in your details below — it only takes a minute.</p>

          {!isLoggedIn && (
            <div style={styles.alert("info")}>
              <span>You're checking out as a guest. <Link href="/login" style={{ fontWeight: 600, textDecoration: "underline", color: "inherit" }}>Log in</Link> for faster checkout.</span>
            </div>
          )}
          {errors.submit && (
            <div style={styles.alert("danger")}>
              <ErrIcon /> <span>{errors.submit}</span>
            </div>
          )}
          {cartItems.length === 0 && (
            <div style={styles.alert("warn")}>
              <span>Your cart is empty. <Link href="/shop" style={{ fontWeight: 600, textDecoration: "underline", color: "inherit" }}>Continue Shopping</Link></span>
            </div>
          )}

          <div className="co-grid" style={styles.grid}>
            <div>
              <form onSubmit={handleSubmit}>
                <div style={styles.card}>
                  <div style={styles.cardHead}>
                    <div style={styles.stepNum}>1</div>
                    <div>
                      <h2 style={styles.cardTitle}>Contact Information</h2>
                      <p style={styles.cardTitleSub}>We'll send your order confirmation here</p>
                    </div>
                  </div>
                  <div style={styles.rowOne}>
                    <div>
                      <label style={styles.label}>Full Name *</label>
                      <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="John Doe" style={{ ...styles.input, ...(errors.full_name ? styles.inputErr : {}) }} />
                      {errors.full_name && <p style={styles.errTxt}><ErrIcon /> {errors.full_name}</p>}
                    </div>
                    <div style={styles.rowTwo}>
                      <div>
                        <label style={styles.label}>Email Address *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" style={{ ...styles.input, ...(errors.email ? styles.inputErr : {}) }} />
                        {errors.email && <p style={styles.errTxt}><ErrIcon /> {errors.email}</p>}
                      </div>
                      <div>
                        <label style={styles.label}>Phone Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" style={styles.input} />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={styles.card}>
                  <div style={styles.cardHead}>
                    <div style={styles.stepNum}>2</div>
                    <div>
                      <h2 style={styles.cardTitle}>Shipping Address</h2>
                      <p style={styles.cardTitleSub}>Where should we deliver your order?</p>
                    </div>
                  </div>
                  <div style={styles.rowOne}>
                    <div>
                      <label style={styles.label}>Address Line 1 *</label>
                      <input type="text" name="address_line1" value={formData.address_line1} onChange={handleChange} placeholder="123 Main Street" style={{ ...styles.input, ...(errors.address_line1 ? styles.inputErr : {}) }} />
                      {errors.address_line1 && <p style={styles.errTxt}><ErrIcon /> {errors.address_line1}</p>}
                    </div>
                    <div>
                      <label style={styles.label}>Address Line 2 <span style={{ color: T.textSubtle, fontWeight: 400 }}>(Optional)</span></label>
                      <input type="text" name="address_line2" value={formData.address_line2} onChange={handleChange} placeholder="Apt 4B" style={styles.input} />
                    </div>
                    <div style={styles.rowTwo}>
                      <div>
                        <label style={styles.label}>City *</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="New York" style={{ ...styles.input, ...(errors.city ? styles.inputErr : {}) }} />
                        {errors.city && <p style={styles.errTxt}><ErrIcon /> {errors.city}</p>}
                      </div>
                      <div>
                        <label style={styles.label}>State / Province</label>
                        <input type="text" name="state_province" value={formData.state_province} onChange={handleChange} placeholder="NY" style={styles.input} />
                      </div>
                    </div>
                    <div style={styles.rowTwo}>
                      <div>
                        <label style={styles.label}>Country *</label>
                        <select name="country" value={formData.country} onChange={handleChange} style={{ ...styles.input, appearance: "auto", cursor: "pointer" }}>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="PK">Pakistan</option>
                          <option value="IN">India</option>
                          <option value="AE">UAE</option>
                        </select>
                      </div>
                      <div>
                        <label style={styles.label}>ZIP / Postal Code *</label>
                        <input type="text" name="zip_postal_code" value={formData.zip_postal_code} onChange={handleChange} placeholder="10001" style={{ ...styles.input, ...(errors.zip_postal_code ? styles.inputErr : {}) }} />
                        {errors.zip_postal_code && <p style={styles.errTxt}><ErrIcon /> {errors.zip_postal_code}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={styles.card}>
                  <div style={styles.cardHead}>
                    <div style={styles.stepNum}>3</div>
                    <div>
                      <h2 style={styles.cardTitle}>Payment Method</h2>
                      <p style={styles.cardTitleSub}>Choose how you'd like to pay</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {payMethods.map(m => (
                      <label key={m.value} style={styles.payOpt(formData.paymentMethod === m.value, m.disabled)}>
                        <input type="radio" name="paymentMethod" value={m.value} checked={formData.paymentMethod === m.value} onChange={handleChange} disabled={m.disabled} style={{ width: 18, height: 18, accentColor: T.accent, flexShrink: 0 }} />
                        <div style={styles.payIcon}>{m.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={styles.payLabel}>{m.label}</div>
                          <div style={styles.paySub}>{m.sub}</div>
                        </div>
                        {formData.paymentMethod === m.value && !m.disabled && (
                          <div style={{ color: T.accent }}><CheckIcon /></div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <div style={styles.card}>
                  <div style={styles.cardHead}>
                    <div style={styles.stepNum}>4</div>
                    <div>
                      <h2 style={styles.cardTitle}>Order Notes <span style={{ color: T.textSubtle, fontSize: 13, fontWeight: 400 }}>(Optional)</span></h2>
                      <p style={styles.cardTitleSub}>Anything we should know about your order?</p>
                    </div>
                  </div>
                  <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} placeholder="Special instructions, gift message, delivery preferences..." style={{ ...styles.input, resize: "vertical", minHeight: 90, fontFamily: "inherit" }} />
                </div>

                <button type="submit" disabled={isSubmitting || cartItems.length === 0} style={styles.submit(isSubmitting || cartItems.length === 0)}>
                  {isSubmitting ? (
                    <>
                      <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <LockIcon /> Place Order — ${fmt(finalTotal)}
                    </>
                  )}
                </button>
                <style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style>

                <p style={{ textAlign: "center", fontSize: 12, color: T.textSubtle, marginTop: 14 }}>
                  By placing your order, you agree to our <Link href="/terms" style={{ color: T.textMuted, textDecoration: "underline" }}>Terms</Link> and <Link href="/privacy" style={{ color: T.textMuted, textDecoration: "underline" }}>Privacy Policy</Link>.
                </p>
              </form>
            </div>

            <aside>
              <div style={styles.summary}>
                <h2 style={styles.sumHead}>Order Summary</h2>
                <p style={styles.sumSub}>{cartCount} {cartCount === 1 ? "item" : "items"} in your cart</p>

                {cartItems.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "32px 0" }}>
                    <div style={{ width: 56, height: 56, margin: "0 auto 12px", borderRadius: "50%", backgroundColor: T.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <TagIcon />
                    </div>
                    <p style={{ color: T.textMuted, marginBottom: 12, fontSize: 14 }}>Your cart is empty</p>
                    <Link href="/shop" style={{ display: "inline-block", padding: "8px 18px", fontSize: 13, fontWeight: 600, color: T.accentDark, backgroundColor: T.accentSoft, borderRadius: 8, textDecoration: "none" }}>Browse books</Link>
                  </div>
                ) : (
                  <>
                    {/* Free shipping progress */}
                    {shippingCost === 0 ? (
                      <div style={styles.progress}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><CheckIcon /> You've unlocked free shipping!</span>
                      </div>
                    ) : (
                      <div style={styles.progressNeed}>
                        Add <strong>${fmt(freeShipRemaining)}</strong> more for free shipping
                        <div style={styles.progressBar}>
                          <div style={{ ...styles.progressFill, width: `${freeShipPct}%` }} />
                        </div>
                      </div>
                    )}

                    <div style={styles.itemsBox}>
                      {cartItems.map((it, i) => {
                        const up = parseFloat(it?.discount_price) > 0 ? parseFloat(it.discount_price) : parseFloat(it?.price) || 0;
                        const q = parseInt(it?.quantity) || 1;
                        const lt = up * q;
                        return (
                          <div key={it?.product_id || it?.id || `i-${i}`} style={styles.itemRow}>
                            <div style={styles.itemImg}>
                              <Image src={getImageUrl(it)} alt={it?.title || it?.name || "Product"} fill style={{ objectFit: "cover" }} sizes="52px" />
                              <div style={styles.qtyBadge}>{q}</div>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: 13, fontWeight: 600, color: T.text, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it?.title || it?.name || "Untitled"}</p>
                              <p style={{ fontSize: 11, color: T.textMuted, margin: "2px 0 0" }}>${fmt(up)} × {q}</p>
                            </div>
                            <p style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: 0, whiteSpace: "nowrap" }}>${fmt(lt)}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Coupon Section */}
                    <div style={styles.couponWrap}>
                      <div style={styles.couponHead}>
                        <TagIcon />
                        <span>Promo / Coupon Code</span>
                      </div>
                      {appliedCoupon ? (
                        <div style={styles.couponApplied}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: T.success, flexShrink: 0 }}>
                              <CheckIcon />
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <p style={{ fontSize: 13, fontWeight: 700, color: "#065f46", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{appliedCoupon.code}</p>
                              <p style={{ fontSize: 11, color: "#047857", margin: 0 }}>−${fmt(couponDiscount)} applied</p>
                            </div>
                          </div>
                          <button type="button" onClick={handleRemoveCoupon} style={{ padding: "6px 12px", fontSize: 12, fontWeight: 600, color: T.danger, backgroundColor: "#fff", border: `1px solid #fecaca`, borderRadius: 8, cursor: "pointer" }}>Remove</button>
                        </div>
                      ) : (
                        <div style={{ display: "flex", gap: 8 }}>
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); if (couponError) setCouponError(""); if (couponSuccess) setCouponSuccess(""); }}
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleApplyCoupon(); } }}
                            placeholder="Enter code"
                            disabled={couponLoading}
                            style={styles.couponInput}
                          />
                          <button type="button" onClick={handleApplyCoupon} disabled={couponLoading || !couponInput.trim()} style={styles.couponBtn(couponLoading || !couponInput.trim())}>
                            {couponLoading ? "..." : "Apply"}
                          </button>
                        </div>
                      )}
                      {couponError && <p style={{ marginTop: 8, fontSize: 12, color: T.danger, display: "flex", alignItems: "center", gap: 4 }}><ErrIcon /> {couponError}</p>}
                      {couponSuccess && !appliedCoupon && <p style={{ marginTop: 8, fontSize: 12, color: T.success }}>{couponSuccess}</p>}
                    </div>

                    <div style={styles.totals}>
                      <div style={styles.row}>
                        <span>Subtotal</span>
                        <span style={styles.rowVal}>${fmt(cartTotal)}</span>
                      </div>
                      {appliedCoupon && couponDiscount > 0 && (
                        <div style={styles.row}>
                          <span style={{ color: T.success }}>Discount ({appliedCoupon.code})</span>
                          <span style={{ fontWeight: 600, color: T.success }}>−${fmt(couponDiscount)}</span>
                        </div>
                      )}
                      <div style={styles.row}>
                        <span>Shipping</span>
                        <span style={{ ...styles.rowVal, color: shippingCost === 0 ? T.success : T.text }}>
                          {shippingCost === 0 ? "Free" : `$${fmt(shippingCost)}`}
                        </span>
                      </div>
                      <div style={styles.row}>
                        <span>Tax (8%)</span>
                        <span style={styles.rowVal}>${fmt(taxAmount)}</span>
                      </div>
                      <div style={styles.grand}>
                        <span>Total</span>
                        <span style={{ color: T.text }}>${fmt(finalTotal)} <span style={{ fontSize: 11, fontWeight: 500, color: T.textSubtle, marginLeft: 4 }}>USD</span></span>
                      </div>
                    </div>

                    <div style={styles.trust}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><LockIcon /> SSL Secure</span>
                      <span>·</span>
                      <span>Encrypted Payment</span>
                    </div>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .co-grid { grid-template-columns: 1fr !important; }
          }
          input:focus, select:focus, textarea:focus {
            border-color: ${T.accent} !important;
            box-shadow: 0 0 0 3px rgba(249,115,22,0.12) !important;
          }
        `}</style>
      </div>
    </>
  );
}