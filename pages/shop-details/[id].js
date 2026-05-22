"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart, Minus, Plus, Star, Heart, BookOpen, X, Trash2,
  ArrowRight, ArrowLeft, CheckCircle, CheckCircle2, Truck, Shield, RotateCcw,
  Package, Globe, Calendar, FileText, Phone, Mail, Loader2, Sparkles, ChevronRight
} from "lucide-react";
import { useCart } from "../../hooks/useCart";
import BrandFooter from "../components/BrandFooter";

// Brand palette (matches shop.js)
const BRAND = {
  primary: "#137c6d",
  primaryLight: "#309687",
  primaryDark: "#075448",
  gradient: "linear-gradient(90deg, rgba(19, 124, 109, 1) 0%, rgba(48, 150, 135, 1) 100%)",
  gradientDark: "linear-gradient(90deg, rgba(19, 124, 109, 1) 0%, rgb(7, 84, 72) 100%)",
  soft: "#ecfdf5",
  border: "#e7e5e4",
  text: "#0f172a",
  textMuted: "#64748b",
  bg: "#fafaf9",
  surface: "#ffffff",
  accent: "#fbbf24",
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://pinebookbackend.pinedigitalhub.com/api";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const userId = 1;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [addingWishlist, setAddingWishlist] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const { cartItems, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity, reloadCart } = useCart();

  useEffect(() => {
    if (toast.show) {
      const t = setTimeout(() => setToast({ show: false, message: "", type: "success" }), 2800);
      return () => clearTimeout(t);
    }
  }, [toast.show]);

  useEffect(() => {
    if (cartOpen) reloadCart?.();
  }, [cartOpen, reloadCart]);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        setProduct(data.data || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const loadWishlist = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/wishlists?user_id=${userId}`);
      const data = await res.json();
      const wishlistData = Array.isArray(data) ? data : (data.data || []);
      setWishlist(wishlistData.filter((w) => w.user_id === userId));
    } catch (err) {
      console.log("Wishlist load error:", err);
    }
  };

  useEffect(() => { loadWishlist(); }, []);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setToast({ show: true, message: `"${product.title}" added to cart`, type: "success" });
  };

  const addToWishlist = async () => {
    if (!product) return;
    setAddingWishlist(true);
    try {
      const res = await fetch(`${API_BASE_URL}/wishlists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, product_id: product.product_id }),
      });
      const data = await res.json();
      if (res.ok) {
        await loadWishlist();
        setToast({ show: true, message: "Added to wishlist", type: "success" });
      } else if (res.status === 409) {
        setToast({ show: true, message: "Already in wishlist", type: "info" });
      } else {
        setToast({ show: true, message: data.message || "Failed to add", type: "error" });
      }
    } catch (err) {
      setToast({ show: true, message: "Network error", type: "error" });
    } finally {
      setAddingWishlist(false);
    }
  };

  const removeWishlist = async (wishlistId) => {
    try {
      await fetch(`${API_BASE_URL}/wishlists/${wishlistId}`, { method: "DELETE" });
      loadWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  const discount = product?.discount_price && product?.price > 0
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  const allImages = product
    ? [
        product.cover_image_url,
        ...(product.images?.map((img) =>
          typeof img === "string" ? img : img.image_url
        ) || []),
      ].filter(Boolean)
    : [];

  const isWishlisted = product && wishlist.some(w => w.product_id === product.product_id);

  // ---------- LOADING ----------
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: BRAND.bg, fontFamily: "'Poppins', ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <Loader2 style={{ width: 44, height: 44, color: BRAND.primary, animation: "spin 1s linear infinite", margin: "0 auto" }} />
          <p style={{ color: BRAND.textMuted, marginTop: 16, fontSize: 14 }}>Loading product...</p>
        </div>
      </div>
    );
  }

  // ---------- ERROR ----------
  if (error || !product) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: BRAND.bg, fontFamily: "'Poppins', ui-sans-serif, system-ui, -apple-system, sans-serif", padding: 20 }}>
        <div style={{ textAlign: "center", maxWidth: 480, padding: "48px 32px", background: "white", border: `1px solid ${BRAND.border}`, borderRadius: 18, boxShadow: "0 4px 12px rgba(15,23,42,0.05)" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: BRAND.soft, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
            <BookOpen style={{ width: 32, height: 32, color: BRAND.primary }} />
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: BRAND.text, margin: "0 0 8px 0", letterSpacing: "-0.01em" }}>
            {error || "Product not found"}
          </h3>
          <p style={{ color: BRAND.textMuted, fontSize: 13, margin: "0 0 22px 0" }}>The book you're looking for couldn't be loaded.</p>
          <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: BRAND.gradient, color: "white", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 14, boxShadow: "0 8px 20px rgba(19,124,109,0.30)" }}>
            <ArrowLeft size={16} /> Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  // ---------- MAIN ----------
  return (
    <>
      <Head>
        <title>{product.title} | Pine Book Publishing</title>
      </Head>

      {/* Top contact bar */}
      <div style={{ background: BRAND.gradient, color: "white", padding: "8px 16px", fontSize: 13, fontWeight: 500, letterSpacing: "0.2px", fontFamily: "'Poppins', ui-sans-serif, system-ui, sans-serif" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "flex-end", alignItems: "center", gap: "8px 24px" }}>
          <a href="tel:8887867135" style={{ color: "white", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
            <Phone style={{ width: 14, height: 14 }} /> Sales: (888) 786-7135
          </a>
          <a href="tel:8668417469" style={{ color: "white", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
            <Phone style={{ width: 14, height: 14 }} /> Support: (866) 841-7469
          </a>
          <a href="mailto:support@pinebookpublishing.com" style={{ color: "white", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
            <Mail style={{ width: 14, height: 14 }} /> support@pinebookpublishing.com
          </a>
        </div>
      </div>

      <div style={{ minHeight: "100vh", backgroundColor: BRAND.bg, fontFamily: "'Poppins', ui-sans-serif, system-ui, -apple-system, sans-serif" }}>

        {/* Toast */}
        {toast.show && (
          <div style={{ position: "fixed", top: 24, right: 24, zIndex: 200, animation: "sd-slideIn 0.3s ease-out" }}>
            <div style={{
              background: toast.type === "error" ? "linear-gradient(90deg,#dc2626,#ef4444)" : BRAND.gradient,
              color: "white", padding: "16px 22px", borderRadius: 14,
              boxShadow: "0 10px 30px rgba(19,124,109,0.35)",
              display: "flex", alignItems: "center", gap: 12, minWidth: 280, maxWidth: 400
            }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CheckCircle2 style={{ width: 20, height: 20 }} />
              </div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 14, flex: 1 }}>{toast.message}</p>
              <button onClick={() => setToast({ show: false, message: "", type: "success" })} style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: 4, opacity: 0.85 }}>
                <X style={{ width: 16, height: 16 }} />
              </button>
            </div>
          </div>
        )}

        <style>{`
          @keyframes sd-slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .sd-qty-btn:hover { background: ${BRAND.soft} !important; color: ${BRAND.primary} !important; }
          .sd-thumb { transition: all 0.2s; }
          .sd-thumb:hover { transform: translateY(-2px); }
          @media (max-width: 900px) {
            .sd-main-grid { grid-template-columns: 1fr !important; gap: 28px !important; padding: 22px !important; }
            .sd-info-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
            .sd-image-main { height: 360px !important; }
            .sd-title { font-size: 26px !important; }
          }
        `}</style>

        {/* Header */}
        <header style={{ backgroundColor: "white", boxShadow: "0 1px 0 rgba(15,23,42,0.05)", borderBottom: `1px solid ${BRAND.border}`, position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(8px)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72, gap: 16 }}>
            <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: BRAND.soft, color: BRAND.primaryDark, textDecoration: "none", fontSize: 13, fontWeight: 600, border: `1px solid ${BRAND.border}` }}>
              <ArrowLeft size={16} /> Back to Shop
            </Link>

            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: BRAND.gradient, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px rgba(19,124,109,0.30)" }}>
                <BookOpen style={{ width: 20, height: 20, color: "white" }} />
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: BRAND.text, margin: 0, letterSpacing: "-0.02em" }}>
                Pine<span style={{ color: BRAND.primary }}>Book</span>
              </h1>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => setWishlistOpen(true)} style={{ position: "relative", padding: 10, background: BRAND.soft, border: `1px solid ${BRAND.border}`, borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Heart style={{ width: 20, height: 20, color: BRAND.primaryDark }} />
                {wishlist.length > 0 && (
                  <span style={{ position: "absolute", top: -6, right: -6, background: "linear-gradient(90deg,#dc2626,#ef4444)", color: "white", borderRadius: "50%", minWidth: 22, height: 22, padding: "0 6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, boxShadow: "0 4px 10px rgba(220,38,38,0.4)" }}>
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button onClick={() => setCartOpen(true)} style={{ position: "relative", padding: 10, background: BRAND.soft, border: `1px solid ${BRAND.border}`, borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShoppingCart style={{ width: 20, height: 20, color: BRAND.primaryDark }} />
                {cartCount > 0 && (
                  <span style={{ position: "absolute", top: -6, right: -6, background: BRAND.gradient, color: "white", borderRadius: "50%", minWidth: 22, height: 22, padding: "0 6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, boxShadow: "0 4px 10px rgba(19,124,109,0.4)" }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "18px 20px 6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: BRAND.textMuted }}>
            <Link href="/" style={{ color: BRAND.textMuted, textDecoration: "none" }}>Home</Link>
            <ChevronRight size={14} />
            <Link href="/shop" style={{ color: BRAND.primary, textDecoration: "none", fontWeight: 600 }}>Shop</Link>
            <ChevronRight size={14} />
            <span style={{ color: BRAND.text, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 380 }}>{product.title}</span>
          </div>
        </div>

        {/* MAIN PRODUCT CARD */}
        <main style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 20px 56px" }}>
          <div className="sd-main-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, backgroundColor: "white", borderRadius: 20, padding: 36, boxShadow: "0 1px 3px rgba(15,23,42,0.06)", border: `1px solid ${BRAND.border}` }}>

            {/* ---------- IMAGE GALLERY ---------- */}
            <div>
              <div className="sd-image-main" style={{ position: "relative", width: "100%", height: 540, backgroundColor: "#f8fafc", borderRadius: 16, overflow: "hidden", marginBottom: 14, border: `1px solid ${BRAND.border}` }}>
                {allImages[activeImage] ? (
                  <Image src={allImages[activeImage]} alt={product.title} fill style={{ objectFit: "cover" }} unoptimized />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
                    <BookOpen style={{ width: 80, height: 80, marginBottom: 12 }} />
                    <span>No Image Available</span>
                  </div>
                )}

                {/* Badges */}
                <div style={{ position: "absolute", top: 16, left: 16, display: "flex", flexDirection: "column", gap: 8, zIndex: 5 }}>
                  {(product.is_bestseller == 1 || product.is_bestseller === true) && (
                    <span style={{ background: "linear-gradient(90deg,#dc2626,#ef4444)", color: "white", padding: "6px 14px", borderRadius: 999, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", boxShadow: "0 4px 10px rgba(220,38,38,0.30)" }}>★ Bestseller</span>
                  )}
                  {(product.is_featured == 1 || product.is_featured === true) && (
                    <span style={{ background: BRAND.gradient, color: "white", padding: "6px 14px", borderRadius: 999, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", boxShadow: "0 4px 10px rgba(19,124,109,0.30)" }}>Featured</span>
                  )}
                  {discount > 0 && (
                    <span style={{ backgroundColor: BRAND.accent, color: BRAND.primaryDark, padding: "6px 14px", borderRadius: 999, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.6px", boxShadow: "0 4px 10px rgba(251,191,36,0.35)" }}>−{discount}% Off</span>
                  )}
                </div>
              </div>

              {allImages.length > 1 && (
                <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
                  {allImages.map((img, idx) => (
                    <button key={idx} onClick={() => setActiveImage(idx)} className="sd-thumb"
                      style={{
                        width: 78, height: 98, borderRadius: 10, overflow: "hidden",
                        border: activeImage === idx ? `2px solid ${BRAND.primary}` : `1px solid ${BRAND.border}`,
                        cursor: "pointer", position: "relative", flexShrink: 0, padding: 0,
                        background: "white",
                        boxShadow: activeImage === idx ? "0 6px 14px rgba(19,124,109,0.20)" : "none"
                      }}>
                      <Image src={img} alt="" fill style={{ objectFit: "cover" }} unoptimized />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ---------- PRODUCT INFO ---------- */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: BRAND.primary, textTransform: "uppercase", letterSpacing: "1.2px", padding: "4px 12px", backgroundColor: BRAND.soft, borderRadius: 999 }}>
                  {product.format || "Book"}
                </span>
                {product.sku && (
                  <span style={{ color: BRAND.textMuted, fontSize: 12, fontWeight: 500 }}>SKU: {product.sku}</span>
                )}
              </div>

              <h1 className="sd-title" style={{ fontSize: 34, fontWeight: 700, color: BRAND.text, margin: "0 0 8px 0", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                {product.title}
              </h1>

              {product.author_name && (
                <p style={{ fontSize: 15, color: BRAND.textMuted, margin: "0 0 18px 0" }}>
                  by <span style={{ color: BRAND.primary, fontWeight: 600 }}>{product.author_name}</span>
                </p>
              )}

              {product.average_rating > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} style={{ width: 18, height: 18, color: i < Math.floor(product.average_rating) ? BRAND.accent : "#e5e7eb", fill: i < Math.floor(product.average_rating) ? BRAND.accent : "none" }} />
                    ))}
                  </div>
                  <span style={{ fontWeight: 600, color: BRAND.text, fontSize: 14 }}>{product.average_rating}</span>
                  <span style={{ color: BRAND.textMuted, fontSize: 13 }}>({product.total_reviews || 0} reviews)</span>
                </div>
              )}

              {/* PRICE CARD */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 22, padding: "20px 22px", background: BRAND.soft, borderRadius: 14, border: `1px solid ${BRAND.border}` }}>
                <span style={{ fontSize: 38, fontWeight: 800, color: BRAND.text, letterSpacing: "-0.02em" }}>
                  ${product.discount_price || product.price || 0}
                </span>
                {product.discount_price && product.price > product.discount_price && (
                  <>
                    <span style={{ fontSize: 19, color: BRAND.textMuted, textDecoration: "line-through" }}>
                      ${product.price}
                    </span>
                    <span style={{ background: "linear-gradient(90deg,#16a34a,#22c55e)", color: "white", padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, boxShadow: "0 4px 10px rgba(22,163,74,0.30)" }}>
                      Save ${(product.price - product.discount_price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {product.short_description && (
                <p style={{ color: BRAND.textMuted, lineHeight: 1.65, marginBottom: 22, fontSize: 14.5 }}>
                  {product.short_description}
                </p>
              )}

              {/* QUANTITY + ACTIONS */}
              <div style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "stretch" }}>
                <div style={{ display: "flex", alignItems: "center", border: `1px solid ${BRAND.border}`, borderRadius: 12, overflow: "hidden", background: "white" }}>
                  <button className="sd-qty-btn" style={{ padding: "12px 14px", background: "white", border: "none", cursor: "pointer", color: BRAND.text }} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus size={16} />
                  </button>
                  <span style={{ padding: "0 18px", fontWeight: 700, fontSize: 15, minWidth: 44, textAlign: "center", color: BRAND.text }}>{quantity}</span>
                  <button className="sd-qty-btn" style={{ padding: "12px 14px", background: "white", border: "none", cursor: "pointer", color: BRAND.text }} onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={16} />
                  </button>
                </div>

                <button onClick={handleAddToCart}
                  style={{ flex: 1, padding: "13px 24px", background: BRAND.gradient, color: "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 8px 20px rgba(19,124,109,0.30)", fontFamily: "inherit", letterSpacing: "0.2px" }}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)"; }}>
                  <ShoppingCart size={18} /> Add to Cart
                </button>

                <button onClick={addToWishlist} disabled={addingWishlist}
                  style={{ padding: "13px 16px", border: `1px solid ${isWishlisted ? "#fecaca" : BRAND.border}`, backgroundColor: isWishlisted ? "#fef2f2" : "white", borderRadius: 12, cursor: addingWishlist ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                  <Heart size={20} style={{ color: isWishlisted ? "#dc2626" : BRAND.text, fill: isWishlisted ? "#dc2626" : "none" }} />
                </button>
              </div>

              {/* STOCK */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, padding: "10px 14px", background: product.stock_quantity > 0 ? "#f0fdf4" : "#fef2f2", border: `1px solid ${product.stock_quantity > 0 ? "#bbf7d0" : "#fecaca"}`, borderRadius: 10 }}>
                {product.stock_quantity > 0 ? (
                  <>
                    <CheckCircle size={18} style={{ color: "#16a34a" }} />
                    <span style={{ color: "#15803d", fontWeight: 600, fontSize: 13 }}>
                      In Stock — {product.stock_quantity} available
                    </span>
                  </>
                ) : (
                  <>
                    <X size={18} style={{ color: "#dc2626" }} />
                    <span style={{ color: "#dc2626", fontWeight: 600, fontSize: 13 }}>Out of Stock</span>
                  </>
                )}
              </div>

              {/* TRUST BADGES */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { Icon: Truck, label: "Free Shipping" },
                  { Icon: Shield, label: "Secure Payment" },
                  { Icon: RotateCcw, label: "Easy Returns" },
                  { Icon: Package, label: "Fast Delivery" },
                ].map(({ Icon, label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", backgroundColor: "white", border: `1px solid ${BRAND.border}`, borderRadius: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: BRAND.soft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={16} style={{ color: BRAND.primary }} />
                    </div>
                    <span style={{ fontSize: 13, color: BRAND.text, fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- DETAILS / SPECS ---------- */}
          <div style={{ marginTop: 36, background: "white", borderRadius: 20, padding: 36, boxShadow: "0 1px 3px rgba(15,23,42,0.06)", border: `1px solid ${BRAND.border}` }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 999, background: BRAND.soft, marginBottom: 18 }}>
              <Sparkles style={{ width: 14, height: 14, color: BRAND.primary }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: BRAND.primaryDark, textTransform: "uppercase", letterSpacing: "1px" }}>Product Details</span>
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: BRAND.text, margin: "0 0 26px 0", letterSpacing: "-0.02em" }}>
              About this book
            </h2>

            <div className="sd-info-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48 }}>
              {/* DESCRIPTION */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: BRAND.text, margin: "0 0 14px 0", letterSpacing: "-0.01em" }}>Description</h3>
                <div style={{ color: BRAND.textMuted, lineHeight: 1.75, fontSize: 14.5 }}>
                  {product.full_description ? (
                    <>
                      <p style={{ margin: 0 }}>
                        {showFullDesc ? product.full_description : `${product.full_description.slice(0, 400)}${product.full_description.length > 400 ? "..." : ""}`}
                      </p>
                      {product.full_description.length > 400 && (
                        <button onClick={() => setShowFullDesc(!showFullDesc)}
                          style={{ background: "none", border: "none", color: BRAND.primary, fontWeight: 700, cursor: "pointer", marginTop: 12, padding: 0, fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
                          {showFullDesc ? "Show Less" : "Read More"}
                          <ArrowRight size={14} style={{ transform: showFullDesc ? "rotate(-90deg)" : "rotate(0)", transition: "transform 0.2s" }} />
                        </button>
                      )}
                    </>
                  ) : (
                    <p style={{ margin: 0 }}>No detailed description available.</p>
                  )}
                </div>
              </div>

              {/* SPECIFICATIONS */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: BRAND.text, margin: "0 0 14px 0", letterSpacing: "-0.01em" }}>Specifications</h3>
                <div style={{ background: "#f8fafc", border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: "6px 16px" }}>
                  {[
                    product.isbn && { Icon: FileText, label: "ISBN", value: product.isbn },
                    product.language && { Icon: Globe, label: "Language", value: product.language },
                    product.pages_count && { Icon: BookOpen, label: "Pages", value: product.pages_count },
                    product.publication_date && { Icon: Calendar, label: "Published", value: new Date(product.publication_date).toLocaleDateString() },
                    product.format && { Icon: Package, label: "Format", value: product.format, capitalize: true },
                    { Icon: CheckCircle, label: "Availability", value: product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : "Out of stock", color: product.stock_quantity > 0 ? "#15803d" : "#dc2626" },
                  ].filter(Boolean).map((row, idx, arr) => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: idx < arr.length - 1 ? `1px solid ${BRAND.border}` : "none" }}>
                      <span style={{ color: BRAND.textMuted, display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500 }}>
                        <row.Icon size={15} style={{ color: BRAND.primary }} /> {row.label}
                      </span>
                      <span style={{ fontWeight: 600, color: row.color || BRAND.text, fontSize: 13, textTransform: row.capitalize ? "capitalize" : "none" }}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* ---------- CART SIDEBAR ---------- */}
        {cartOpen && (
          <>
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(7,84,72,0.45)", backdropFilter: "blur(6px)", zIndex: 99 }} onClick={() => setCartOpen(false)} />
            <div style={{ position: "fixed", top: 0, right: 0, width: "100%", maxWidth: 420, height: "100vh", backgroundColor: "white", boxShadow: "-20px 0 60px rgba(15,23,42,0.18)", zIndex: 100, display: "flex", flexDirection: "column", fontFamily: "inherit" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 24px", borderBottom: `1px solid ${BRAND.border}`, background: BRAND.soft }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: BRAND.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ShoppingCart style={{ width: 18, height: 18, color: "white" }} />
                  </div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: BRAND.text, letterSpacing: "-0.01em" }}>Your Cart</h2>
                    <p style={{ margin: 0, fontSize: 12, color: BRAND.textMuted }}>{cartCount} {cartCount === 1 ? "item" : "items"}</p>
                  </div>
                </div>
                <button style={{ padding: 8, background: "white", border: `1px solid ${BRAND.border}`, borderRadius: 10, cursor: "pointer" }} onClick={() => setCartOpen(false)}>
                  <X style={{ width: 18, height: 18, color: BRAND.text }} />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
                {cartItems.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: BRAND.soft, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      <ShoppingCart style={{ width: 32, height: 32, color: BRAND.primary }} />
                    </div>
                    <p style={{ color: BRAND.text, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>Your cart is empty</p>
                    <p style={{ color: BRAND.textMuted, fontSize: 13, margin: 0 }}>Start adding some great reads</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.product_id || item.id} style={{ display: "flex", gap: 14, padding: 14, marginBottom: 10, borderRadius: 12, border: `1px solid ${BRAND.border}`, backgroundColor: "#f8fafc" }}>
                      <div style={{ width: 64, height: 84, backgroundColor: "white", borderRadius: 8, position: "relative", overflow: "hidden", flexShrink: 0, border: `1px solid ${BRAND.border}` }}>
                        {item.cover_image_url ? (
                          <Image src={item.cover_image_url} alt="" fill style={{ objectFit: "cover" }} unoptimized />
                        ) : (
                          <BookOpen style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", color: "#9ca3af" }} />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontWeight: 600, color: BRAND.text, margin: "0 0 4px 0", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{item.title}</h4>
                        <p style={{ color: BRAND.primary, fontWeight: 700, margin: "0 0 8px 0", fontSize: 14 }}>${item.discount_price || item.price}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <button style={{ width: 26, height: 26, borderRadius: 8, border: `1px solid ${BRAND.border}`, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => updateQuantity(item.product_id || item.id, item.quantity - 1)}>
                            <Minus size={12} />
                          </button>
                          <span style={{ width: 28, textAlign: "center", fontWeight: 600, fontSize: 13 }}>{item.quantity}</span>
                          <button style={{ width: 26, height: 26, borderRadius: 8, border: `1px solid ${BRAND.border}`, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => updateQuantity(item.product_id || item.id, item.quantity + 1)}>
                            <Plus size={12} />
                          </button>
                          <button style={{ marginLeft: "auto", color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, cursor: "pointer", padding: "5px 8px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => removeFromCart(item.product_id || item.id)}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div style={{ padding: "20px 24px", borderTop: `1px solid ${BRAND.border}`, background: "white" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: BRAND.textMuted, marginBottom: 6 }}>
                    <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 700, color: BRAND.text, marginBottom: 14, letterSpacing: "-0.01em" }}>
                    <span>Total</span><span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <Link href="/checkout" style={{ width: "100%", padding: 14, background: BRAND.gradient, color: "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", boxShadow: "0 8px 20px rgba(19,124,109,0.30)" }}>
                    Proceed to Checkout <ArrowRight size={18} />
                  </Link>
                  <p style={{ textAlign: "center", fontSize: 11, color: BRAND.textMuted, marginTop: 10, margin: "10px 0 0" }}>Secure checkout · SSL encrypted</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ---------- WISHLIST MODAL ---------- */}
        {wishlistOpen && (
          <>
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(7,84,72,0.55)", backdropFilter: "blur(6px)", zIndex: 100 }} onClick={() => setWishlistOpen(false)} />
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", borderRadius: 20, boxShadow: "0 25px 60px rgba(15,23,42,0.30)", width: "92%", maxWidth: 520, maxHeight: "82vh", overflowY: "auto", zIndex: 101, fontFamily: "inherit", border: `1px solid ${BRAND.border}` }}>
              <div style={{ padding: 26 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(90deg,#dc2626,#ef4444)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px rgba(220,38,38,0.30)" }}>
                      <Heart style={{ width: 18, height: 18, color: "white", fill: "white" }} />
                    </div>
                    <div>
                      <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: BRAND.text, letterSpacing: "-0.01em" }}>My Wishlist</h2>
                      <p style={{ margin: 0, fontSize: 12, color: BRAND.textMuted }}>{wishlist.length} {wishlist.length === 1 ? "item" : "items"}</p>
                    </div>
                  </div>
                  <button style={{ padding: 8, background: "white", border: `1px solid ${BRAND.border}`, borderRadius: 10, cursor: "pointer" }} onClick={() => setWishlistOpen(false)}>
                    <X style={{ width: 18, height: 18, color: BRAND.text }} />
                  </button>
                </div>

                {wishlist.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "44px 0" }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                      <Heart style={{ width: 26, height: 26, color: "#dc2626" }} />
                    </div>
                    <p style={{ color: BRAND.text, fontWeight: 600, margin: "0 0 4px" }}>Your wishlist is empty</p>
                    <p style={{ color: BRAND.textMuted, fontSize: 13, margin: 0 }}>Save your favorite books for later</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {wishlist.map((item) => (
                      <div key={item.wishlist_id} style={{ display: "flex", gap: 12, padding: 12, backgroundColor: "#f8fafc", borderRadius: 12, alignItems: "center", border: `1px solid ${BRAND.border}` }}>
                        <div style={{ width: 50, height: 65, backgroundColor: "white", borderRadius: 8, position: "relative", overflow: "hidden", flexShrink: 0, border: `1px solid ${BRAND.border}` }}>
                          {item.product?.cover_image_url ? (
                            <Image src={item.product.cover_image_url} alt="" fill style={{ objectFit: "cover" }} unoptimized />
                          ) : (
                            <BookOpen style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", color: "#9ca3af", width: 20, height: 20 }} />
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontWeight: 600, color: BRAND.text, margin: "0 0 2px 0", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {item.product?.title || "Unknown Product"}
                          </h4>
                          <p style={{ color: BRAND.primary, fontWeight: 700, margin: 0, fontSize: 13 }}>
                            ${item.product?.discount_price || item.product?.price || 0}
                          </p>
                        </div>
                        <button style={{ padding: 8, color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, cursor: "pointer" }} onClick={() => removeWishlist(item.wishlist_id)}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <BrandFooter />
    </>
  );
}
