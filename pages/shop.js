"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import {
  ShoppingCart, Search, Loader2, Star, Filter, BookOpen,
  Heart, Eye, X, Plus, Minus, Trash2, ArrowRight, ChevronRight,
  CheckCircle2
} from "lucide-react";
import ReactPaginate from "react-paginate";
import { useCart } from "../hooks/useCart";
import usePagination from "../hooks/use-pagination";

const PRODUCTS_PER_PAGE = 12;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// URL fix helper - localhost URLs ko live domain se replace karega
const fixImageUrl = (url) => {
  if (!url) return null;
  
  return url.replace(
    'http://localhost:8000', 
    'https://pinebookbackend.pinedigitalhub.com'
  ).replace(
    'https://localhost:8000',
    'https://pinebookbackend.pinedigitalhub.com'
  );
};

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
    // Fix localhost URLs
    const fixedSrc = src ? src.replace('http://localhost:8000', 'https://pinebookbackend.pinedigitalhub.com')
                              .replace('https://localhost:8000', 'https://pinebookbackend.pinedigitalhub.com') 
                        : null;

    // If no src, show fallback immediately
    if (!fixedSrc) {
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
            src={fixedSrc} 
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
      <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "system-ui, -apple-system, sans-serif" }}>

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
              backgroundColor: "#10b981",
              color: "white",
              padding: "16px 24px",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
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
                backgroundColor: "rgba(255,255,255,0.2)",
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
                  opacity: 0.8
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
            border: 1px solid #e5e7eb;
            background: white;
            color: #374151;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
          }
          .shop-pagination__item .shop-pagination__link:hover {
            border-color: #d97706;
            color: #d97706;
          }
          .shop-pagination__item--active .shop-pagination__link {
            background: #d97706;
            border-color: #d97706;
            color: white;
            box-shadow: 0 4px 6px rgba(217, 119, 6, 0.3);
          }
          .shop-pagination__item--active .shop-pagination__link:hover {
            color: white;
          }
          .shop-pagination__item--disabled .shop-pagination__link {
            opacity: 0.4;
            cursor: not-allowed;
          }
          .shop-pagination__item--disabled .shop-pagination__link:hover {
            border-color: #e5e7eb;
            color: #374151;
          }
        `}</style>

        {/* Announcement Bar */}
        <div style={{ backgroundColor: "#d97706", color: "white", padding: "8px 16px", textAlign: "center", fontSize: "14px" }}>
          Free shipping on orders over $50 | Use code: FREESHIP
        </div>

        {/* Header */}
        <header style={{ backgroundColor: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <BookOpen style={{ width: "32px", height: "32px", color: "#d97706" }} />
              <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", margin: 0 }}>Pine<span style={{ color: "#d97706" }}>Book</span></h1>
            </Link>
            <div style={{ position: "relative", flex: 1, maxWidth: "500px", margin: "0 32px" }}>
              <Search style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "18px", height: "18px", color: "#9ca3af" }} />
              <input type="text" placeholder="Search by title, author, ISBN..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "100%", padding: "10px 16px 10px 40px", borderRadius: "9999px", border: "1px solid #d1d5db", outline: "none", fontSize: "14px" }} />
            </div>
            <button style={{ position: "relative", padding: "8px", background: "none", border: "none", cursor: "pointer" }} onClick={() => setCartOpen(!cartOpen)}>
              <ShoppingCart style={{ width: "24px", height: "24px", color: "#374151" }} />
              {cartCount > 0 && <span style={{ position: "absolute", top: "-4px", right: "-4px", backgroundColor: "#dc2626", color: "white", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "bold" }}>{cartCount}</span>}
            </button>
          </div>
        </header>

        {/* Cart Sidebar */}
        {cartOpen && (
          <>
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 99 }} onClick={() => setCartOpen(false)} />
            <div style={{ position: "fixed", top: 0, right: 0, width: "100%", maxWidth: "400px", height: "100vh", backgroundColor: "white", boxShadow: "-10px 0 40px rgba(0,0,0,0.2)", zIndex: 100, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "2px solid #f3f4f6" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <ShoppingCart style={{ width: "24px", height: "24px", color: "#d97706" }} />
                  <h2 style={{ margin: 0, fontSize: "20px" }}>Your Cart</h2>
                  <span style={{ backgroundColor: "#fef3c7", color: "#92400e", padding: "4px 12px", borderRadius: "9999px", fontSize: "14px", fontWeight: "bold" }}>{cartCount} items</span>
                </div>
                <button style={{ padding: "8px", background: "none", border: "none", cursor: "pointer" }} onClick={() => setCartOpen(false)}><X style={{ width: "20px", height: "20px" }} /></button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
                {cartItems.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <ShoppingCart style={{ width: "64px", height: "64px", color: "#d1d5db", margin: "0 auto 16px" }} />
                    <p style={{ color: "#6b7280", fontSize: "16px" }}>Your cart is empty</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.product_id || item.id} style={{ display: "flex", gap: "16px", padding: "16px 0", borderBottom: "1px solid #f3f4f6" }}>
                      <div style={{ width: "70px", height: "90px", backgroundColor: "#f3f4f6", borderRadius: "8px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                        {renderBookCover(item.cover_image_url, item.title, item.product_id || item.id, true)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontWeight: "600", color: "#111827", margin: "0 0 4px 0", fontSize: "14px" }}>{item.title}</h4>
                        <p style={{ color: "#d97706", fontWeight: "bold", margin: "0 0 8px 0" }}>${item.discount_price || item.price}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <button style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #d1d5db", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => updateQuantity(item.product_id || item.id, item.quantity - 1)}><Minus size={14} /></button>
                          <span style={{ width: "32px", textAlign: "center", fontWeight: "600" }}>{item.quantity}</span>
                          <button style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #d1d5db", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => updateQuantity(item.product_id || item.id, item.quantity + 1)}><Plus size={14} /></button>
                          <button style={{ marginLeft: "auto", color: "#dc2626", background: "none", border: "none", cursor: "pointer", padding: "4px" }} onClick={() => removeFromCart(item.product_id || item.id)}><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cartItems.length > 0 && (
                <div style={{ padding: "20px 24px", borderTop: "2px solid #f3f4f6" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
                    <span>Total</span><span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <Link href="/checkout" style={{ width: "100%", padding: "14px", backgroundColor: "#d97706", color: "white", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none" }}>
                    Checkout <ArrowRight size={20} />
                  </Link>
                </div>
              )}
            </div>
          </>
        )}

        {/* Hero Section */}
        <section style={{ background: "linear-gradient(135deg, #111827 0%, #1f2937 50%, #92400e 100%)", color: "white", padding: "80px 16px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "48px", fontWeight: "bold", margin: "0 0 16px 0", lineHeight: 1.1 }}>Discover Your Next<br /><span style={{ color: "#fbbf24" }}>Great Read</span></h2>
            <p style={{ fontSize: "18px", color: "#d1d5db", margin: "0 0 32px 0", maxWidth: "500px" }}>Explore thousands of titles from bestselling authors. Free delivery on your first order.</p>
            <button style={{ padding: "14px 32px", backgroundColor: "#d97706", color: "white", border: "none", borderRadius: "9999px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }} onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}>Browse Collection</button>
          </div>
        </section>

        {/* Filter Bar */}
        <section style={{ backgroundColor: "white", borderBottom: "1px solid #e5e7eb", padding: "16px", position: "sticky", top: "64px", zIndex: 40, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", gap: "8px", overflowX: "auto", alignItems: "center" }}>
            <Filter style={{ width: "18px", height: "18px", color: "#9ca3af", flexShrink: 0 }} />
            {filters.map((filter) => (
              <button key={filter.id} onClick={() => setActiveFilter(filter.id)}
                style={{ padding: "8px 20px", borderRadius: "9999px", border: "none", fontSize: "14px", fontWeight: activeFilter === filter.id ? "bold" : "500", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s", backgroundColor: activeFilter === filter.id ? "#d97706" : "#f3f4f6", color: activeFilter === filter.id ? "white" : "#374151", boxShadow: activeFilter === filter.id ? "0 4px 6px rgba(217, 119, 6, 0.3)" : "none" }}>
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <main id="products" style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 16px" }}>
          {loading && <div style={{ textAlign: "center", padding: "80px 0" }}><Loader2 style={{ width: "48px", height: "48px", color: "#d97706", animation: "spin 1s linear infinite", margin: "0 auto" }} /><p style={{ color: "#6b7280", marginTop: "16px" }}>Loading books...</p></div>}
          {error && !loading && <div style={{ textAlign: "center", padding: "80px 0" }}><p style={{ color: "#dc2626", fontSize: "18px", marginBottom: "8px" }}>Error: {error}</p><p style={{ color: "#6b7280" }}>API: {API_BASE_URL}/products</p><button style={{ marginTop: "16px", padding: "10px 24px", backgroundColor: "#d97706", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px" }} onClick={() => window.location.reload()}>Retry</button></div>}

          {!loading && !error && (
            <>
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontSize: "28px", fontWeight: "bold", color: "#111827", margin: "0 0 8px 0" }}>{activeFilter === "all" ? "All Books" : filters.find(f => f.id === activeFilter)?.label}</h3>
                <p style={{ color: "#6b7280", margin: 0 }}>{filteredProducts.length} {filteredProducts.length === 1 ? "book" : "books"} available</p>
              </div>

              {filteredProducts.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "32px" }}>
                  {currentItems.map((product) => {
                    const discount = product.discount_price && product.price > 0 ? Math.round(((product.price - product.discount_price) / product.price) * 100) : 0;
                    const isWishlisted = wishlist.includes(product.product_id);

                    return (
                      <div key={product.product_id} style={{ backgroundColor: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #f3f4f6", transition: "all 0.3s ease", cursor: "pointer" }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"; }}>

                        {/* Book Cover - FIXED */}
                        <div style={{ position: "relative", width: "100%", height: "400px", backgroundColor: "#f3f4f6", overflow: "hidden" }}>
                          {renderBookCover(product.cover_image_url, product.title, product.product_id)}

                          {/* Badges */}
                          <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", flexDirection: "column", gap: "6px", zIndex: 5 }}>
                            {(product.is_bestseller == 1 || product.is_bestseller === true) && (
                              <span style={{ backgroundColor: "#dc2626", color: "white", padding: "5px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.5px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>Bestseller</span>
                            )}
                            {(product.is_featured == 1 || product.is_featured === true) && (
                              <span style={{ backgroundColor: "#d97706", color: "white", padding: "5px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.5px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>Featured</span>
                            )}
                            {discount > 0 && (
                              <span style={{ backgroundColor: "#16a34a", color: "white", padding: "5px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.5px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>-{discount}% OFF</span>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <button style={{ position: "absolute", top: "12px", right: "12px", width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "white", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", zIndex: 10 }}
                            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.product_id); }}>
                            <Heart style={{ width: "16px", height: "16px", color: isWishlisted ? "#dc2626" : "#374151", fill: isWishlisted ? "#dc2626" : "none" }} />
                          </button>
                          <button style={{ position: "absolute", top: "56px", right: "12px", width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "white", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", zIndex: 10 }}
                            onClick={(e) => { e.stopPropagation(); setQuickView(product); setQuickViewImgError(false); }}>
                            <Eye style={{ width: "16px", height: "16px", color: "#374151" }} />
                          </button>
                        </div>

                        {/* Product Info */}
                        <div style={{ padding: "24px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                            <span style={{ fontSize: "12px", fontWeight: "bold", color: "#d97706", textTransform: "uppercase", letterSpacing: "1px" }}>{product.format || "Book"}</span>
                            {product.stock_quantity !== undefined && product.stock_quantity > 0 && product.stock_quantity < 10 && (
                              <span style={{ fontSize: "12px", fontWeight: "bold", color: "#dc2626" }}>Only {product.stock_quantity} left</span>
                            )}
                          </div>

                          <h4 style={{ fontSize: "18px", fontWeight: "bold", color: "#111827", margin: "0 0 8px 0", lineHeight: 1.3, minHeight: "48px" }}>{product.title || "Untitled Book"}</h4>
                          {product.author_name && <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 12px 0" }}>by {product.author_name}</p>}

                          {product.average_rating > 0 && (
                            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "12px" }}>
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} style={{ width: "16px", height: "16px", color: i < Math.floor(product.average_rating) ? "#fbbf24" : "#d1d5db", fill: i < Math.floor(product.average_rating) ? "#fbbf24" : "none" }} />
                              ))}
                              <span style={{ fontSize: "12px", color: "#9ca3af", marginLeft: "4px" }}>({product.total_reviews || 0})</span>
                            </div>
                          )}

                          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "16px" }}>
                            <span style={{ fontSize: "22px", fontWeight: "bold", color: "#111827" }}>${product.discount_price || product.price || 0}</span>
                            {product.discount_price && product.price > product.discount_price && (
                              <span style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "line-through" }}>${product.price}</span>
                            )}
                          </div>

                          <div style={{ display: "flex", gap: "8px" }}>
                            <button style={{ flex: 1, padding: "10px 16px", backgroundColor: "#111827", color: "white", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", transition: "all 0.2s" }}
                              onClick={() => handleAddToCart(product)}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#d97706"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#111827"; }}>
                              <ShoppingCart style={{ width: "16px", height: "16px" }} /> Add
                            </button>
                            <Link href={`/shop-details/${product.product_id}`} style={{ flex: 1, padding: "10px 16px", backgroundColor: "white", color: "#111827", border: "2px solid #e5e7eb", borderRadius: "10px", fontSize: "14px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", textDecoration: "none", transition: "all 0.2s" }}
                              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#d97706"; e.currentTarget.style.color = "#d97706"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#111827"; }}>
                              View Details <ChevronRight style={{ width: "16px", height: "16px" }} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <BookOpen style={{ width: "64px", height: "64px", color: "#d1d5db", margin: "0 auto 16px" }} />
                  <p style={{ fontSize: "18px", color: "#6b7280" }}>No books found</p>
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
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 100 }} onClick={() => setQuickView(null)} />
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", borderRadius: "20px", boxShadow: "0 25px 50px rgba(0,0,0,0.3)", maxWidth: "800px", width: "90%", maxHeight: "90vh", overflowY: "auto", zIndex: 101 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ position: "relative", height: "500px", backgroundColor: "#f3f4f6" }}>
                  {renderBookCover(quickView.cover_image_url, quickView.title, quickView.product_id, false, true)}
                </div>
                <div style={{ padding: "32px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <span style={{ fontSize: "12px", fontWeight: "bold", color: "#d97706", textTransform: "uppercase", letterSpacing: "1px" }}>{quickView.format}</span>
                    <button onClick={() => setQuickView(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}><X size={24} /></button>
                  </div>
                  <h3 style={{ fontSize: "28px", fontWeight: "bold", color: "#111827", margin: "0 0 8px 0" }}>{quickView.title}</h3>
                  {quickView.author_name && <p style={{ color: "#6b7280", marginBottom: "16px" }}>by {quickView.author_name}</p>}
                  {quickView.average_rating > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "16px" }}>
                      {[...Array(5)].map((_, i) => <Star key={i} style={{ width: "20px", height: "20px", color: i < Math.floor(quickView.average_rating) ? "#fbbf24" : "#d1d5db", fill: i < Math.floor(quickView.average_rating) ? "#fbbf24" : "none" }} />)}
                      <span style={{ marginLeft: "8px", color: "#6b7280" }}>({quickView.total_reviews} reviews)</span>
                    </div>
                  )}
                  <div style={{ marginBottom: "16px" }}>
                    <span style={{ fontSize: "32px", fontWeight: "bold", color: "#111827" }}>${quickView.discount_price || quickView.price}</span>
                    {quickView.discount_price && <span style={{ fontSize: "18px", color: "#9ca3af", textDecoration: "line-through", marginLeft: "12px" }}>${quickView.price}</span>}
                  </div>
                  <p style={{ color: "#6b7280", lineHeight: 1.6, marginBottom: "24px" }}>{quickView.short_description || quickView.full_description || "No description available."}</p>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button style={{ flex: 1, padding: "14px", backgroundColor: "#d97706", color: "white", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                      onClick={() => { handleAddToCart(quickView); setQuickView(null); }}>
                      <ShoppingCart size={20} /> Add to Cart
                    </button>
                    <Link href={`/shop-details/${quickView.slug || quickView.product_id}`} style={{ padding: "14px 24px", backgroundColor: "white", color: "#111827", border: "2px solid #e5e7eb", borderRadius: "12px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <footer style={{ backgroundColor: "#111827", color: "#9ca3af", padding: "48px 16px 24px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", marginBottom: "32px" }}>
              <div><h3 style={{ color: "white", fontSize: "18px", fontWeight: "bold", margin: "0 0 16px 0" }}>PineBook</h3><p style={{ fontSize: "14px", lineHeight: 1.6 }}>Your trusted online bookstore for all genres and formats.</p></div>
              <div><h4 style={{ color: "white", fontWeight: "600", margin: "0 0 12px 0" }}>Categories</h4>{["E-Books", "Paperback", "Hardcover", "Bestsellers"].map((cat) => <button key={cat} style={{ color: "#9ca3af", background: "none", border: "none", padding: 0, display: "block", marginBottom: "8px", cursor: "pointer", fontSize: "14px" }} onClick={() => setActiveFilter(cat.toLowerCase().replace("-", ""))}>{cat}</button>)}</div>
              <div><h4 style={{ color: "white", fontWeight: "600", margin: "0 0 12px 0" }}>Support</h4>{["FAQ", "Shipping", "Returns", "Contact Us"].map((item) => <span key={item} style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>{item}</span>)}</div>
              <div><h4 style={{ color: "white", fontWeight: "600", margin: "0 0 12px 0" }}>Contact</h4><p style={{ fontSize: "14px" }}>support@pinebook.com</p><p style={{ fontSize: "14px" }}>+1 (555) 123-4567</p></div>
            </div>
            <div style={{ borderTop: "1px solid #374151", paddingTop: "24px", textAlign: "center", fontSize: "14px" }}>© 2026 Pine Book Publishing. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </>
  );
}