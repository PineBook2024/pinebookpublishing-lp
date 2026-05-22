"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import {
  ShoppingCart, Search, Loader2, Star, Filter, BookOpen,
  Heart, Eye, X, Plus, Minus, Trash2, ArrowRight, ChevronRight,
  CheckCircle2, Sparkles, Phone, Mail
} from "lucide-react";
import ReactPaginate from "react-paginate";
import { useCart } from "../hooks/useCart";
import usePagination from "../hooks/use-pagination";
import BrandFooter from "./components/BrandFooter";

// Brand palette
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

const PRODUCTS_PER_PAGE = 12;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://pinebookbackend.pinedigitalhub.com/api";

export default function BookShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [wishlist, setWishlist] = useState([]);
  const [quickView, setQuickView] = useState(null);
  const [imgErrors, setImgErrors] = useState({});
  const [cartImgErrors, setCartImgErrors] = useState({});
  const [quickViewImgError, setQuickViewImgError] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: "", product: null });

  const { cartItems, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity, reloadCart } = useCart();

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "", product: null });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Cart open hone pe fresh data load karo
  useEffect(() => {
    if (cartOpen) {
      reloadCart();
    }
  }, [cartOpen, reloadCart]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const result = await response.json();
        const productList = result.data || result;
        if (!Array.isArray(productList)) throw new Error("Invalid API format");
        setProducts(productList);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast({
      show: true,
      message: `"${product.title || 'Book'}" added to cart successfully!`,
      product: product
    });
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = !searchQuery || (p.title && p.title.toLowerCase().includes(searchQuery.toLowerCase())) || (p.author_name && p.author_name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter === "all" || (activeFilter === "bestseller" && (p.is_bestseller == 1 || p.is_bestseller === true)) || (activeFilter === "featured" && (p.is_featured == 1 || p.is_featured === true)) || (activeFilter === "sale" && p.discount_price && p.discount_price < p.price) || p.format === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const { currentItems, pageCount, handlePageClick } = usePagination(filteredProducts, PRODUCTS_PER_PAGE);

  const filters = [
    { id: "all", label: "All Books" },
    { id: "bestseller", label: "Bestsellers" },
    { id: "featured", label: "Featured" },
    { id: "sale", label: "On Sale" },
    { id: "ebook", label: "E-Books" },
    { id: "paperback", label: "Paperback" },
    { id: "hardcover", label: "Hardcover" },
  ];

  // Helper: Render book cover image with fallback
  const renderBookCover = (src, alt, productId, isCart = false, isQuickView = false) => {
    if (!src) {
        return (
            <div style={{ 
                width: "100%", 
                height: "100%", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center", 
                color: "#9ca3af" 
            }}>
                <BookOpen style={{ width: "64px", height: "64px", marginBottom: "8px" }} />
                <span style={{ fontSize: "14px" }}>No Cover</span>
            </div>
        );
    }

    // Image exists - render it (NO onError handler)
    return (
        <Image
            src={src}
            alt={alt || "Book"}
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }} 
            unoptimized
        />
    );
};

  return (
    <>
      <Head><title>Pine Book | Online Bookstore</title></Head>
      <div style={{ background: BRAND.gradient, color: "white", padding: "8px 16px", fontSize: "13px", fontWeight: 500, letterSpacing: "0.2px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "flex-end", alignItems: "center", gap: "8px 24px" }}>
          <a href="tel:8887867135" style={{ color: "white", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
            <Phone style={{ width: 14, height: 14 }} />
            Sales: (888) 786-7135
          </a>
          <a href="tel:8668417469" style={{ color: "white", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
            <Phone style={{ width: 14, height: 14 }} />
            Support: (866) 841-7469
          </a>
          <a href="mailto:support@pinebookpublishing.com" style={{ color: "white", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
            <Mail style={{ width: 14, height: 14 }} />
            support@pinebookpublishing.com
          </a>
        </div>
      </div>
      <div style={{ minHeight: "100vh", backgroundColor: BRAND.bg, fontFamily: "'Poppins', ui-sans-serif, system-ui, -apple-system, sans-serif" }}>

        {/* Toast Notification */}
        {toast.show && (
          <div style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            zIndex: 200,
            animation: "slideIn 0.3s ease-out"
          }}>
            <div style={{
              background: BRAND.gradient,
              color: "white",
              padding: "16px 24px",
              borderRadius: "14px",
              boxShadow: "0 10px 30px rgba(19,124,109,0.35)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              minWidth: "300px",
              maxWidth: "400px"
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <CheckCircle2 style={{ width: "20px", height: "20px" }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: "600", fontSize: "14px" }}>Added to Cart</p>
                <p style={{ margin: "4px 0 0 0", fontSize: "13px", opacity: 0.9 }}>{toast.message}</p>
              </div>
              <button
                onClick={() => setToast({ show: false, message: "", product: null })}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  padding: "4px",
                  opacity: 0.85
                }}
              >
                <X style={{ width: "16px", height: "16px" }} />
              </button>
            </div>
          </div>
        )}

        {/* CSS Styles */}
        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes shimmer { 0% { transform: translateX(-100%);} 100% { transform: translateX(100%);} }
          .shop-pagination {
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0;
            gap: 8px;
            align-items: center;
          }
          .shop-pagination__item .shop-pagination__link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 40px;
            height: 40px;
            padding: 0 12px;
            border-radius: 10px;
            border: 1px solid ${BRAND.border};
            background: white;
            color: ${BRAND.text};
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
            font-family: inherit;
          }
          .shop-pagination__item .shop-pagination__link:hover {
            border-color: ${BRAND.primary};
            color: ${BRAND.primary};
          }
          .shop-pagination__item--active .shop-pagination__link {
            background: ${BRAND.gradient};
            border-color: transparent;
            color: white;
            box-shadow: 0 6px 14px rgba(19, 124, 109, 0.28);
          }
          .shop-pagination__item--active .shop-pagination__link:hover {
            color: white;
            border-color: transparent;
          }
          .shop-pagination__item--disabled .shop-pagination__link {
            opacity: 0.4;
            cursor: not-allowed;
          }
          .shop-pagination__item--disabled .shop-pagination__link:hover {
            border-color: ${BRAND.border};
            color: ${BRAND.text};
          }
          .shop-search-input:focus {
            border-color: ${BRAND.primary} !important;
            box-shadow: 0 0 0 4px rgba(19,124,109,0.10) !important;
          }
        `}</style>

        {/* Header */}
        <header style={{ backgroundColor: "white", boxShadow: "0 1px 0 rgba(15,23,42,0.05)", borderBottom: `1px solid ${BRAND.border}`, position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(8px)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px", gap: 16 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: BRAND.gradient, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px rgba(19,124,109,0.30)" }}>
                <BookOpen style={{ width: "20px", height: "20px", color: "white" }} />
              </div>
              <h1 style={{ fontSize: "22px", fontWeight: 700, color: BRAND.text, margin: 0, letterSpacing: "-0.02em" }}>Pine<span style={{ color: BRAND.primary }}>Book</span></h1>
            </Link>
            <div style={{ position: "relative", flex: 1, maxWidth: "560px", margin: "0 16px" }}>
              <Search style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", width: "18px", height: "18px", color: BRAND.textMuted }} />
              <input type="text" placeholder="Search by title, author, ISBN..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="shop-search-input"
                style={{ width: "100%", padding: "11px 18px 11px 44px", borderRadius: "9999px", border: `1px solid ${BRAND.border}`, outline: "none", fontSize: "14px", backgroundColor: "#f8fafc", color: BRAND.text, fontFamily: "inherit", transition: "all 0.2s" }} />
            </div>
            <button style={{ position: "relative", padding: "10px", background: BRAND.soft, border: `1px solid ${BRAND.border}`, borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setCartOpen(!cartOpen)}>
              <ShoppingCart style={{ width: "20px", height: "20px", color: BRAND.primaryDark }} />
              {cartCount > 0 && <span style={{ position: "absolute", top: "-6px", right: "-6px", background: BRAND.gradient, color: "white", borderRadius: "50%", minWidth: "22px", height: "22px", padding: "0 6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, boxShadow: "0 4px 10px rgba(19,124,109,0.4)" }}>{cartCount}</span>}
            </button>
          </div>
        </header>

        {/* Cart Sidebar */}
        {cartOpen && (
          <>
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(7,84,72,0.45)", backdropFilter: "blur(6px)", zIndex: 99 }} onClick={() => setCartOpen(false)} />
            <div style={{ position: "fixed", top: 0, right: 0, width: "100%", maxWidth: "420px", height: "100vh", backgroundColor: "white", boxShadow: "-20px 0 60px rgba(15,23,42,0.18)", zIndex: 100, display: "flex", flexDirection: "column", fontFamily: "inherit" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 24px", borderBottom: `1px solid ${BRAND.border}`, background: BRAND.soft }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: BRAND.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ShoppingCart style={{ width: "18px", height: "18px", color: "white" }} />
                  </div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: BRAND.text, letterSpacing: "-0.01em" }}>Your Cart</h2>
                    <p style={{ margin: 0, fontSize: 12, color: BRAND.textMuted }}>{cartCount} {cartCount === 1 ? "item" : "items"}</p>
                  </div>
                </div>
                <button style={{ padding: "8px", background: "white", border: `1px solid ${BRAND.border}`, borderRadius: 10, cursor: "pointer" }} onClick={() => setCartOpen(false)}><X style={{ width: "18px", height: "18px", color: BRAND.text }} /></button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
                {cartItems.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: BRAND.soft, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      <ShoppingCart style={{ width: "32px", height: "32px", color: BRAND.primary }} />
                    </div>
                    <p style={{ color: BRAND.text, fontSize: "16px", fontWeight: 600, margin: "0 0 4px" }}>Your cart is empty</p>
                    <p style={{ color: BRAND.textMuted, fontSize: 13, margin: 0 }}>Start adding some great reads</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.product_id || item.id} style={{ display: "flex", gap: "14px", padding: "14px", marginBottom: 10, borderRadius: 12, border: `1px solid ${BRAND.border}`, backgroundColor: "#f8fafc" }}>
                      <div style={{ width: "64px", height: "84px", backgroundColor: "white", borderRadius: "8px", position: "relative", overflow: "hidden", flexShrink: 0, border: `1px solid ${BRAND.border}` }}>
                        {renderBookCover(item.cover_image_url, item.title, item.product_id || item.id, true)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontWeight: 600, color: BRAND.text, margin: "0 0 4px 0", fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{item.title}</h4>
                        <p style={{ color: BRAND.primary, fontWeight: 700, margin: "0 0 8px 0", fontSize: 14 }}>${item.discount_price || item.price}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <button style={{ width: "26px", height: "26px", borderRadius: 8, border: `1px solid ${BRAND.border}`, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => updateQuantity(item.product_id || item.id, item.quantity - 1)}><Minus size={12} /></button>
                          <span style={{ width: "28px", textAlign: "center", fontWeight: 600, fontSize: 13 }}>{item.quantity}</span>
                          <button style={{ width: "26px", height: "26px", borderRadius: 8, border: `1px solid ${BRAND.border}`, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => updateQuantity(item.product_id || item.id, item.quantity + 1)}><Plus size={12} /></button>
                          <button style={{ marginLeft: "auto", color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, cursor: "pointer", padding: "5px 8px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => removeFromCart(item.product_id || item.id)}><Trash2 size={13} /></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cartItems.length > 0 && (
                <div style={{ padding: "20px 24px", borderTop: `1px solid ${BRAND.border}`, background: "white" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: BRAND.textMuted, marginBottom: 6 }}>
                    <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "20px", fontWeight: 700, color: BRAND.text, marginBottom: 14, letterSpacing: "-0.01em" }}>
                    <span>Total</span><span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <Link href="/checkout" style={{ width: "100%", padding: "14px", background: BRAND.gradient, color: "white", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none", boxShadow: "0 8px 20px rgba(19,124,109,0.30)" }}>
                    Proceed to Checkout <ArrowRight size={18} />
                  </Link>
                  <p style={{ textAlign: "center", fontSize: 11, color: BRAND.textMuted, marginTop: 10, margin: "10px 0 0" }}>Secure checkout · SSL encrypted</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Hero Section */}
        <section style={{ background: "linear-gradient(135deg, #075448 0%, #137c6d 55%, #309687 100%)", color: "white", padding: "80px 16px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.18), transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: -100, left: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)" }} />
          <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)", marginBottom: 20, backdropFilter: "blur(6px)" }}>
              <Sparkles style={{ width: 14, height: 14, color: BRAND.accent }} />
              <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase" }}>Pine Book Publishing Store</span>
            </div>
            <h2 style={{ fontSize: "52px", fontWeight: 700, margin: "0 0 18px 0", lineHeight: 1.05, letterSpacing: "-0.02em" }}>Discover Your Next<br /><span style={{ color: BRAND.accent }}>Great Read</span></h2>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.85)", margin: "0 0 32px 0", maxWidth: "560px", lineHeight: 1.6 }}>Explore thousands of titles from bestselling authors. Curated by our editorial team, delivered to your door.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button style={{ padding: "14px 28px", backgroundColor: "white", color: BRAND.primaryDark, border: "none", borderRadius: "9999px", fontSize: "15px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 10px 24px rgba(0,0,0,0.15)" }} onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}>
                Browse Collection <ArrowRight size={16} />
              </button>
              <button style={{ padding: "14px 28px", backgroundColor: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "9999px", fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", backdropFilter: "blur(6px)" }} onClick={() => setActiveFilter("bestseller")}>
                View Bestsellers
              </button>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section style={{ backgroundColor: "white", borderBottom: `1px solid ${BRAND.border}`, padding: "14px 16px", position: "sticky", top: "72px", zIndex: 40, boxShadow: "0 4px 12px rgba(15,23,42,0.04)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", gap: "8px", overflowX: "auto", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 10, backgroundColor: BRAND.soft, color: BRAND.primaryDark, fontSize: 12, fontWeight: 600, flexShrink: 0, marginRight: 4 }}>
              <Filter style={{ width: "14px", height: "14px" }} />
              <span>Filter</span>
            </div>
            {filters.map((filter) => (
              <button key={filter.id} onClick={() => setActiveFilter(filter.id)}
                style={{
                  padding: "9px 18px",
                  borderRadius: "9999px",
                  border: activeFilter === filter.id ? "1px solid transparent" : `1px solid ${BRAND.border}`,
                  fontSize: "13px",
                  fontWeight: activeFilter === filter.id ? 700 : 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                  background: activeFilter === filter.id ? BRAND.gradient : "white",
                  color: activeFilter === filter.id ? "white" : BRAND.text,
                  boxShadow: activeFilter === filter.id ? "0 6px 14px rgba(19,124,109,0.28)" : "none",
                  fontFamily: "inherit"
                }}>
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <main id="products" style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 20px" }}>
          {loading && (
            <div style={{ textAlign: "center", padding: "100px 0" }}>
              <Loader2 style={{ width: "44px", height: "44px", color: BRAND.primary, animation: "spin 1s linear infinite", margin: "0 auto" }} />
              <p style={{ color: BRAND.textMuted, marginTop: "16px", fontSize: 14 }}>Loading books...</p>
            </div>
          )}
          {error && !loading && (
            <div style={{ textAlign: "center", padding: "80px 20px", maxWidth: 480, margin: "0 auto", backgroundColor: "white", border: `1px solid ${BRAND.border}`, borderRadius: 16 }}>
              <p style={{ color: "#dc2626", fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>Error: {error}</p>
              <p style={{ color: BRAND.textMuted, fontSize: 13, marginBottom: 16 }}>API: {API_BASE_URL}/products</p>
              <button style={{ marginTop: "8px", padding: "10px 24px", background: BRAND.gradient, color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: 600, fontFamily: "inherit" }} onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: "36px" }}>
                <div>
                  <h3 style={{ fontSize: "32px", fontWeight: 700, color: BRAND.text, margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                    {activeFilter === "all" ? "All Books" : filters.find(f => f.id === activeFilter)?.label}
                  </h3>
                  <p style={{ color: BRAND.textMuted, margin: 0, fontSize: 14 }}>
                    <span style={{ color: BRAND.primary, fontWeight: 600 }}>{filteredProducts.length}</span> {filteredProducts.length === 1 ? "book" : "books"} available
                  </p>
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, backgroundColor: "white", border: `1px solid ${BRAND.border}`, fontSize: 12, color: BRAND.textMuted }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: BRAND.primary }} />
                  <span>Curated by Pine Book</span>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "28px" }}>
                  {currentItems.map((product) => {
                    const discount = product.discount_price && product.price > 0 ? Math.round(((product.price - product.discount_price) / product.price) * 100) : 0;
                    const isWishlisted = wishlist.includes(product.product_id);

                    return (
                      <div key={product.product_id} style={{ backgroundColor: "white", borderRadius: "18px", overflow: "hidden", boxShadow: "0 1px 3px rgba(15,23,42,0.06)", border: `1px solid ${BRAND.border}`, transition: "transform 0.3s ease, box-shadow 0.3s ease", cursor: "pointer", display: "flex", flexDirection: "column" }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(19,124,109,0.14)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(15,23,42,0.06)"; }}>

                        {/* Book Cover */}
                        <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", backgroundColor: "#f8fafc", overflow: "hidden", borderBottom: `1px solid ${BRAND.border}` }}>
                          {renderBookCover(product.cover_image_url, product.title, product.product_id)}

                          {/* Badges */}
                          <div style={{ position: "absolute", top: "14px", left: "14px", display: "flex", flexDirection: "column", gap: "6px", zIndex: 5 }}>
                            {(product.is_bestseller == 1 || product.is_bestseller === true) && (
                              <span style={{ background: "linear-gradient(90deg,#dc2626,#ef4444)", color: "white", padding: "5px 11px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", boxShadow: "0 4px 10px rgba(220,38,38,0.30)" }}>★ Bestseller</span>
                            )}
                            {(product.is_featured == 1 || product.is_featured === true) && (
                              <span style={{ background: BRAND.gradient, color: "white", padding: "5px 11px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", boxShadow: "0 4px 10px rgba(19,124,109,0.30)" }}>Featured</span>
                            )}
                            {discount > 0 && (
                              <span style={{ backgroundColor: BRAND.accent, color: BRAND.primaryDark, padding: "5px 11px", borderRadius: "999px", fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.6px", boxShadow: "0 4px 10px rgba(251,191,36,0.35)" }}>−{discount}%</span>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <button style={{ position: "absolute", top: "14px", right: "14px", width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "white", border: `1px solid ${BRAND.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 10px rgba(15,23,42,0.08)", zIndex: 10 }}
                            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.product_id); }}>
                            <Heart style={{ width: "15px", height: "15px", color: isWishlisted ? "#dc2626" : BRAND.text, fill: isWishlisted ? "#dc2626" : "none" }} />
                          </button>
                          <button style={{ position: "absolute", top: "58px", right: "14px", width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "white", border: `1px solid ${BRAND.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 10px rgba(15,23,42,0.08)", zIndex: 10 }}
                            onClick={(e) => { e.stopPropagation(); setQuickView(product); setQuickViewImgError(false); }}>
                            <Eye style={{ width: "15px", height: "15px", color: BRAND.text }} />
                          </button>
                        </div>

                        {/* Product Info */}
                        <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                            <span style={{ fontSize: "10px", fontWeight: 700, color: BRAND.primary, textTransform: "uppercase", letterSpacing: "1.2px" }}>{product.format || "Book"}</span>
                            {product.stock_quantity !== undefined && product.stock_quantity > 0 && product.stock_quantity < 10 && (
                              <span style={{ fontSize: "10px", fontWeight: 700, color: "#dc2626", padding: "2px 8px", borderRadius: 999, backgroundColor: "#fef2f2" }}>Only {product.stock_quantity} left</span>
                            )}
                          </div>

                          <h4 style={{ fontSize: "16px", fontWeight: 700, color: BRAND.text, margin: "0 0 6px 0", lineHeight: 1.35, letterSpacing: "-0.01em", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "44px" }}>{product.title || "Untitled Book"}</h4>
                          {product.author_name && <p style={{ fontSize: "12px", color: BRAND.textMuted, margin: "0 0 12px 0" }}>by <span style={{ color: BRAND.text, fontWeight: 500 }}>{product.author_name}</span></p>}

                          {product.average_rating > 0 && (
                            <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "12px" }}>
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} style={{ width: "14px", height: "14px", color: i < Math.floor(product.average_rating) ? BRAND.accent : "#e5e7eb", fill: i < Math.floor(product.average_rating) ? BRAND.accent : "none" }} />
                              ))}
                              <span style={{ fontSize: "11px", color: BRAND.textMuted, marginLeft: "5px" }}>({product.total_reviews || 0})</span>
                            </div>
                          )}

                          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "14px", marginTop: "auto" }}>
                            <span style={{ fontSize: "22px", fontWeight: 800, color: BRAND.text, letterSpacing: "-0.02em" }}>${product.discount_price || product.price || 0}</span>
                            {product.discount_price && product.price > product.discount_price && (
                              <span style={{ fontSize: "13px", color: BRAND.textMuted, textDecoration: "line-through" }}>${product.price}</span>
                            )}
                          </div>

                          <div style={{ display: "flex", gap: "8px" }}>
                            <button style={{ flex: 1, padding: "11px 14px", background: BRAND.gradient, color: "white", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", transition: "all 0.2s", boxShadow: "0 4px 12px rgba(19,124,109,0.25)", fontFamily: "inherit" }}
                              onClick={() => handleAddToCart(product)}
                              onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.08)"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)"; }}>
                              <ShoppingCart style={{ width: "15px", height: "15px" }} /> Add
                            </button>
                            <Link href={`/shop-details/${product.product_id}`} style={{ flex: 1, padding: "11px 14px", backgroundColor: "white", color: BRAND.text, border: `1px solid ${BRAND.border}`, borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", textDecoration: "none", transition: "all 0.2s", fontFamily: "inherit" }}
                              onMouseEnter={(e) => { e.currentTarget.style.borderColor = BRAND.primary; e.currentTarget.style.color = BRAND.primary; e.currentTarget.style.backgroundColor = BRAND.soft; }}
                              onMouseLeave={(e) => { e.currentTarget.style.borderColor = BRAND.border; e.currentTarget.style.color = BRAND.text; e.currentTarget.style.backgroundColor = "white"; }}>
                              Details <ChevronRight style={{ width: "14px", height: "14px" }} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "80px 20px", backgroundColor: "white", border: `1px solid ${BRAND.border}`, borderRadius: 16, maxWidth: 480, margin: "0 auto" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: BRAND.soft, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <BookOpen style={{ width: "32px", height: "32px", color: BRAND.primary }} />
                  </div>
                  <p style={{ fontSize: "17px", color: BRAND.text, fontWeight: 600, margin: "0 0 4px" }}>No books found</p>
                  <p style={{ fontSize: 13, color: BRAND.textMuted, margin: 0 }}>Try adjusting your filters or search</p>
                </div>
              )}

              {/* Pagination */}
              {pageCount > 1 && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next ›"
                    previousLabel="‹ Prev"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    containerClassName="shop-pagination"
                    pageClassName="shop-pagination__item"
                    pageLinkClassName="shop-pagination__link"
                    previousClassName="shop-pagination__item"
                    previousLinkClassName="shop-pagination__link"
                    nextClassName="shop-pagination__item"
                    nextLinkClassName="shop-pagination__link"
                    breakClassName="shop-pagination__item"
                    breakLinkClassName="shop-pagination__link"
                    activeClassName="shop-pagination__item--active"
                    disabledClassName="shop-pagination__item--disabled"
                  />
                </div>
              )}
            </>
          )}
        </main>

        {/* Quick View Modal */}
        {quickView && (
          <>
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(7,84,72,0.55)", backdropFilter: "blur(6px)", zIndex: 100 }} onClick={() => setQuickView(null)} />
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", borderRadius: "20px", boxShadow: "0 25px 60px rgba(15,23,42,0.30)", maxWidth: "880px", width: "94%", maxHeight: "92vh", overflowY: "auto", zIndex: 101, fontFamily: "inherit", border: `1px solid ${BRAND.border}` }}>
              <div className="qv-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ position: "relative", minHeight: "440px", backgroundColor: "#f8fafc", borderRight: `1px solid ${BRAND.border}` }}>
                  {renderBookCover(quickView.cover_image_url, quickView.title, quickView.product_id, false, true)}
                </div>
                <div style={{ padding: "32px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: BRAND.primary, textTransform: "uppercase", letterSpacing: "1.2px", padding: "4px 10px", backgroundColor: BRAND.soft, borderRadius: 999 }}>{quickView.format || "Book"}</span>
                    <button onClick={() => setQuickView(null)} style={{ background: "white", border: `1px solid ${BRAND.border}`, borderRadius: 10, cursor: "pointer", padding: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} /></button>
                  </div>
                  <h3 style={{ fontSize: "26px", fontWeight: 700, color: BRAND.text, margin: "0 0 6px 0", letterSpacing: "-0.02em", lineHeight: 1.25 }}>{quickView.title}</h3>
                  {quickView.author_name && <p style={{ color: BRAND.textMuted, fontSize: 14, marginBottom: "16px" }}>by <span style={{ color: BRAND.text, fontWeight: 500 }}>{quickView.author_name}</span></p>}
                  {quickView.average_rating > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "16px" }}>
                      {[...Array(5)].map((_, i) => <Star key={i} style={{ width: "18px", height: "18px", color: i < Math.floor(quickView.average_rating) ? BRAND.accent : "#e5e7eb", fill: i < Math.floor(quickView.average_rating) ? BRAND.accent : "none" }} />)}
                      <span style={{ marginLeft: "8px", color: BRAND.textMuted, fontSize: 13 }}>({quickView.total_reviews} reviews)</span>
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: "16px", padding: "12px 0", borderTop: `1px solid ${BRAND.border}`, borderBottom: `1px solid ${BRAND.border}` }}>
                    <span style={{ fontSize: "30px", fontWeight: 800, color: BRAND.text, letterSpacing: "-0.02em" }}>${quickView.discount_price || quickView.price}</span>
                    {quickView.discount_price && <span style={{ fontSize: "16px", color: BRAND.textMuted, textDecoration: "line-through" }}>${quickView.price}</span>}
                  </div>
                  <p style={{ color: BRAND.textMuted, lineHeight: 1.65, marginBottom: "24px", fontSize: 14 }}>{quickView.short_description || quickView.full_description || "No description available."}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button style={{ flex: 1, padding: "13px", background: BRAND.gradient, color: "white", border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 8px 20px rgba(19,124,109,0.30)", fontFamily: "inherit" }}
                      onClick={() => { handleAddToCart(quickView); setQuickView(null); }}>
                      <ShoppingCart size={18} /> Add to Cart
                    </button>
                    <Link href={`/shop-details/${quickView.slug || quickView.product_id}`} style={{ padding: "13px 22px", backgroundColor: "white", color: BRAND.text, border: `1px solid ${BRAND.border}`, borderRadius: "12px", fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", fontFamily: "inherit" }}>
                      Details
                    </Link>
                  </div>
                </div>
              </div>
              <style>{`@media (max-width: 720px){ .qv-grid{ grid-template-columns: 1fr !important; } }`}</style>
            </div>
          </>
        )}
      </div>
      <BrandFooter />
    </>
  );
}