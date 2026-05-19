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

  const shippingCost = cartTotal >= 50 ? 0 : 9.99;
  const taxRate = 0.08;
  const taxAmount = cartTotal * taxRate;
  const finalTotal = cartTotal + shippingCost + taxAmount;

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

  const cs = { minHeight: "100vh", backgroundColor: "#f9fafb", fontFamily: "system-ui,-apple-system,sans-serif" };
  const hs = { backgroundColor: "#fff", borderBottom: "1px solid #e5e7eb" };
  const card = { backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, marginBottom: 24 };
  const lbl = { display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500, color: "#374151" };
  const inp = { width: "100%", padding: "10px 12px", fontSize: 14, border: "1px solid #d1d5db", borderRadius: 8, backgroundColor: "#fff", color: "#111827", outline: "none", boxSizing: "border-box" };
  const err = { borderColor: "#ef4444", backgroundColor: "#fef2f2" };
  const errTxt = { marginTop: 6, fontSize: 12, color: "#ef4444" };
  const sec = { fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 16 };
  const btn = { width: "100%", padding: 14, fontSize: 16, fontWeight: 700, color: "#fff", backgroundColor: "#f97316", border: "none", borderRadius: 10, cursor: "pointer" };
  const btnDis = { opacity: 0.5, cursor: "not-allowed" };
  const sum = { backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, position: "sticky", top: 16 };

  return (
    <>
      <Head><title>Checkout | Pine Book</title></Head>
      <div style={cs}>
        <div style={hs}>
          <div style={{ maxWidth: 1152, margin: "0 auto", padding: 16 }}>
            <nav style={{ display: "flex", alignItems: "center", fontSize: 14, color: "#6b7280" }}>
              <Link href="/" style={{ color: "#6b7280", textDecoration: "none" }}>Home</Link><span style={{ margin: "0 8px" }}>/</span>
              <Link href="/shop" style={{ color: "#6b7280", textDecoration: "none" }}>Shop</Link><span style={{ margin: "0 8px" }}>/</span>
              <span style={{ fontWeight: 500, color: "#f97316" }}>Checkout</span>
            </nav>
          </div>
        </div>

        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "32px 16px" }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#111827", marginBottom: 24 }}>Checkout</h1>
          
          {!isLoggedIn && (
            <div style={{ padding: 16, marginBottom: 16, backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "#1e40af", fontSize: 14 }}>
                You're checking out as a guest. <Link href="/login" style={{ fontWeight: 600, textDecoration: "underline" }}>Log in</Link> for faster checkout.
              </span>
            </div>
          )}

          {errors.submit && <div style={{ padding: 16, marginBottom: 16, color: "#991b1b", backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8 }}>{errors.submit}</div>}
          {cartItems.length === 0 && <div style={{ padding: 16, marginBottom: 16, color: "#92400e", backgroundColor: "#fef3c7", border: "1px solid #fde68a", borderRadius: 8 }}>Your cart is empty. <Link href="/shop" style={{ fontWeight: 500, textDecoration: "underline", color: "#f97316" }}>Continue Shopping</Link></div>}

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
            <div>
              <form onSubmit={handleSubmit}>
                <div style={card}>
                  <h2 style={sec}>Contact Information</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                    <div>
                      <label style={lbl}>Full Name *</label>
                      <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="John Doe" style={{ ...inp, ...(errors.full_name ? err : {}) }} />
                      {errors.full_name && <p style={errTxt}>{errors.full_name}</p>}
                    </div>
                    <div>
                      <label style={lbl}>Email Address *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" style={{ ...inp, ...(errors.email ? err : {}) }} />
                      {errors.email && <p style={errTxt}>{errors.email}</p>}
                    </div>
                    <div>
                      <label style={lbl}>Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" style={inp} />
                    </div>
                  </div>
                </div>

                <div style={card}>
                  <h2 style={sec}>Shipping Address</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                    <div>
                      <label style={lbl}>Address Line 1 *</label>
                      <input type="text" name="address_line1" value={formData.address_line1} onChange={handleChange} placeholder="123 Main Street" style={{ ...inp, ...(errors.address_line1 ? err : {}) }} />
                      {errors.address_line1 && <p style={errTxt}>{errors.address_line1}</p>}
                    </div>
                    <div>
                      <label style={lbl}>Address Line 2 <span style={{ color: "#9ca3af" }}>(Optional)</span></label>
                      <input type="text" name="address_line2" value={formData.address_line2} onChange={handleChange} placeholder="Apt 4B" style={inp} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={lbl}>City *</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="New York" style={{ ...inp, ...(errors.city ? err : {}) }} />
                        {errors.city && <p style={errTxt}>{errors.city}</p>}
                      </div>
                      <div>
                        <label style={lbl}>State / Province</label>
                        <input type="text" name="state_province" value={formData.state_province} onChange={handleChange} placeholder="NY" style={inp} />
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={lbl}>Country *</label>
                        <select name="country" value={formData.country} onChange={handleChange} style={{ ...inp, appearance: "auto", cursor: "pointer" }}>
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
                        <label style={lbl}>ZIP / Postal Code *</label>
                        <input type="text" name="zip_postal_code" value={formData.zip_postal_code} onChange={handleChange} placeholder="10001" style={{ ...inp, ...(errors.zip_postal_code ? err : {}) }} />
                        {errors.zip_postal_code && <p style={errTxt}>{errors.zip_postal_code}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={card}>
                  <h2 style={sec}>Payment Method</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[{ value: "stripe", label: "Credit / Debit Card (Stripe)" }, { value: "paypal", label: "PayPal (Coming Soon)" }, { value: "google_pay", label: "Google Pay (Coming Soon)" }, { value: "cod", label: "Cash on Delivery" }].map(m => (
                      <label key={m.value} style={{ display: "flex", alignItems: "center", padding: "14px 16px", border: formData.paymentMethod === m.value ? "2px solid #f97316" : "1px solid #d1d5db", borderRadius: 10, cursor: "pointer", backgroundColor: formData.paymentMethod === m.value ? "#fff7ed" : "#fff" }}>
                        <input type="radio" name="paymentMethod" value={m.value} checked={formData.paymentMethod === m.value} onChange={handleChange} style={{ width: 18, height: 18, accentColor: "#f97316" }} />
                        <span style={{ marginLeft: 12, fontWeight: 500, color: "#374151", fontSize: 14 }}>{m.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={card}>
                  <h2 style={sec}>Order Notes</h2>
                  <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} placeholder="Special instructions..." style={{ ...inp, resize: "vertical", minHeight: 80 }} />
                </div>

                <button type="submit" disabled={isSubmitting || cartItems.length === 0} style={{ ...btn, ...(isSubmitting || cartItems.length === 0 ? btnDis : {}) }}>
                  {isSubmitting ? "Processing..." : `Place Order — $${fmt(finalTotal)}`}
                </button>
              </form>
            </div>

            <div>
              <div style={sum}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Order Summary</h2>
                {cartItems.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "24px 0" }}>
                    <p style={{ color: "#6b7280", marginBottom: 8 }}>Your cart is empty</p>
                    <Link href="/shop" style={{ fontSize: 14, color: "#f97316", textDecoration: "underline", fontWeight: 500 }}>Continue Shopping</Link>
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20, maxHeight: 400, overflowY: "auto" }}>
                      {cartItems.map((it, i) => {
                        const up = parseFloat(it?.discount_price) > 0 ? parseFloat(it.discount_price) : parseFloat(it?.price) || 0;
                        const q = parseInt(it?.quantity) || 1;
                        const lt = up * q;
                        return (
                          <div key={it?.product_id || it?.id || `i-${i}`} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <div style={{ position: "relative", width: 56, height: 72, flexShrink: 0, backgroundColor: "#f3f4f6", borderRadius: 8, overflow: "hidden" }}>
                              <Image src={getImageUrl(it)} alt={it?.title || it?.name || "Product"} fill style={{ objectFit: "cover" }} sizes="56px" />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it?.title || it?.name || "Untitled"}</p>
                              <p style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>Qty: {q}</p>
                              <p style={{ fontSize: 14, fontWeight: 700, color: "#f97316", marginTop: 4 }}>${fmt(lt)}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "#6b7280" }}>Subtotal ({cartCount} items)</span><span style={{ fontWeight: 500, color: "#111827" }}>${fmt(cartTotal)}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "#6b7280" }}>Shipping</span><span style={{ fontWeight: 500, color: shippingCost === 0 ? "#16a34a" : "#111827" }}>{shippingCost === 0 ? "Free" : `$${fmt(shippingCost)}`}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "#6b7280" }}>Tax (8%)</span><span style={{ fontWeight: 500, color: "#111827" }}>${fmt(taxAmount)}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, borderTop: "1px solid #e5e7eb", paddingTop: 12 }}><span style={{ color: "#111827" }}>Total</span><span style={{ color: "#f97316" }}>${fmt(finalTotal)}</span></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}