"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart, Minus, Plus, Star, Heart, BookOpen, X, Trash2,
  ArrowRight, ArrowLeft, CheckCircle, Truck, Shield, RotateCcw,
  Package, Globe, Calendar, FileText
} from "lucide-react";
import { useCart } from "../../hooks/useCart";

const API_BASE_URL = "http://localhost:8000/api";

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
  const [wishlistMsg, setWishlistMsg] = useState("");

  const { cartItems, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE_URL}/products/${id}`);

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();
        console.log("Product Detail API:", data);

        const productData = data.data || data;
        setProduct(productData);
      } catch (err) {
        console.error(err);
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

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setCartOpen(true);
  };

  const addToWishlist = async () => {
    if (!product) return;

    setAddingWishlist(true);
    setWishlistMsg("");

    try {
      const res = await fetch(`${API_BASE_URL}/wishlists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          product_id: product.product_id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        await loadWishlist();
        setWishlistOpen(true);
        setWishlistMsg("Added to wishlist!");
      } else if (res.status === 409) {
        setWishlistMsg("Already in wishlist!");
        setWishlistOpen(true);
      } else {
        setWishlistMsg(data.message || "Failed to add");
      }
    } catch (err) {
      console.log(err);
      setWishlistMsg("Network error");
    } finally {
      setAddingWishlist(false);
    }
  };

  const removeWishlist = async (wishlistId) => {
    try {
      await fetch(`${API_BASE_URL}/wishlists/${wishlistId}`, {
        method: "DELETE",
      });
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

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "48px", height: "48px", border: "4px solid #f3f4f6", borderTop: "4px solid #d97706", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto" }} />
          <p style={{ color: "#6b7280", marginTop: "16px" }}>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#dc2626", fontSize: "18px", marginBottom: "16px" }}>
            {error || "Product not found"}
          </p>
          <Link href="/shop" style={{ color: "#d97706", textDecoration: "none", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
            <ArrowLeft size={18} /> Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "system-ui, sans-serif" }}>

      <header style={{ backgroundColor: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          <Link href="/shop" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "#374151" }}>
            <ArrowLeft size={20} />
            <span style={{ fontWeight: "500" }}>Back to Shop</span>
          </Link>

          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <BookOpen style={{ width: "28px", height: "28px", color: "#d97706" }} />
            <h1 style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", margin: 0 }}>
              Pine<span style={{ color: "#d97706" }}>Book</span>
            </h1>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              style={{ position: "relative", padding: "8px", background: "none", border: "none", cursor: "pointer" }}
              onClick={() => setWishlistOpen(true)}
            >
              <Heart style={{ width: "22px", height: "22px", color: "#374151" }} />
              {wishlist.length > 0 && (
                <span style={{ position: "absolute", top: "-2px", right: "-2px", backgroundColor: "#dc2626", color: "white", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold" }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              style={{ position: "relative", padding: "8px", background: "none", border: "none", cursor: "pointer" }}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart style={{ width: "22px", height: "22px", color: "#374151" }} />
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: "-2px", right: "-2px", backgroundColor: "#d97706", color: "white", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold" }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#6b7280" }}>
          <Link href="/shop" style={{ color: "#d97706", textDecoration: "none" }}>Shop</Link>
          <span>/</span>
          <span style={{ color: "#374151" }}>{product.title}</span>
        </div>
      </div>

      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", backgroundColor: "white", borderRadius: "20px", padding: "32px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>

          <div>
            <div style={{ position: "relative", width: "100%", height: "500px", backgroundColor: "#f3f4f6", borderRadius: "16px", overflow: "hidden", marginBottom: "16px" }}>
              {allImages[activeImage] ? (
                <Image
                  src={allImages[activeImage]}
                  alt={product.title}
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
                  <BookOpen style={{ width: "80px", height: "80px", marginBottom: "12px" }} />
                  <span>No Image Available</span>
                </div>
              )}

              <div style={{ position: "absolute", top: "16px", left: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {(product.is_bestseller == 1 || product.is_bestseller === true) && (
                  <span style={{ backgroundColor: "#dc2626", color: "white", padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" }}>
                    Bestseller
                  </span>
                )}
                {(product.is_featured == 1 || product.is_featured === true) && (
                  <span style={{ backgroundColor: "#d97706", color: "white", padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" }}>
                    Featured
                  </span>
                )}
                {discount > 0 && (
                  <span style={{ backgroundColor: "#16a34a", color: "white", padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" }}>
                    -{discount}% Off
                  </span>
                )}
              </div>
            </div>

            {allImages.length > 1 && (
              <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "8px" }}>
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    style={{
                      width: "80px",
                      height: "100px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: activeImage === idx ? "3px solid #d97706" : "3px solid transparent",
                      cursor: "pointer",
                      position: "relative",
                      flexShrink: 0,
                      padding: 0,
                      background: "none"
                    }}
                  >
                    <Image src={img} alt="" fill style={{ objectFit: "cover" }} unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <span style={{ backgroundColor: "#fef3c7", color: "#92400e", padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" }}>
                {product.format || "Book"}
              </span>
              {product.sku && (
                <span style={{ color: "#9ca3af", fontSize: "13px" }}>SKU: {product.sku}</span>
              )}
            </div>

            <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#111827", margin: "0 0 8px 0", lineHeight: 1.2 }}>
              {product.title}
            </h1>

            {product.author_name && (
              <p style={{ fontSize: "16px", color: "#6b7280", margin: "0 0 16px 0" }}>
                by <span style={{ color: "#d97706", fontWeight: "600" }}>{product.author_name}</span>
              </p>
            )}

            {product.average_rating > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      style={{
                        width: "20px",
                        height: "20px",
                        color: i < Math.floor(product.average_rating) ? "#fbbf24" : "#d1d5db",
                        fill: i < Math.floor(product.average_rating) ? "#fbbf24" : "none"
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontWeight: "600", color: "#111827" }}>{product.average_rating}</span>
                <span style={{ color: "#6b7280" }}>({product.total_reviews || 0} reviews)</span>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "24px", padding: "20px", backgroundColor: "#f9fafb", borderRadius: "12px" }}>
              <span style={{ fontSize: "36px", fontWeight: "bold", color: "#111827" }}>
                ${product.discount_price || product.price || 0}
              </span>
              {product.discount_price && product.price > product.discount_price && (
                <>
                  <span style={{ fontSize: "20px", color: "#9ca3af", textDecoration: "line-through" }}>
                    ${product.price}
                  </span>
                  <span style={{ backgroundColor: "#dcfce7", color: "#16a34a", padding: "4px 12px", borderRadius: "6px", fontSize: "14px", fontWeight: "bold" }}>
                    Save ${(product.price - product.discount_price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {product.short_description && (
              <p style={{ color: "#6b7280", lineHeight: 1.6, marginBottom: "24px", fontSize: "15px" }}>
                {product.short_description}
              </p>
            )}

            <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", border: "2px solid #e5e7eb", borderRadius: "10px", overflow: "hidden" }}>
                <button
                  style={{ padding: "12px 16px", background: "white", border: "none", cursor: "pointer" }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={18} />
                </button>
                <span style={{ padding: "0 20px", fontWeight: "bold", fontSize: "16px", minWidth: "50px", textAlign: "center" }}>
                  {quantity}
                </span>
                <button
                  style={{ padding: "12px 16px", background: "white", border: "none", cursor: "pointer" }}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                style={{ flex: 1, padding: "14px 24px", backgroundColor: "#d97706", color: "white", border: "none", borderRadius: "10px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>

              <button
                style={{ padding: "14px", border: "2px solid #e5e7eb", backgroundColor: "white", borderRadius: "10px", cursor: "pointer" }}
                onClick={addToWishlist}
                disabled={addingWishlist}
              >
                <Heart
                  size={24}
                  style={{
                    color: wishlist.some(w => w.product_id === product.product_id) ? "#dc2626" : "#374151",
                    fill: wishlist.some(w => w.product_id === product.product_id) ? "#dc2626" : "none"
                  }}
                />
              </button>
            </div>

            {wishlistMsg && (
              <p style={{ color: wishlistMsg.includes("Added") ? "#16a34a" : "#d97706", fontSize: "14px", marginBottom: "16px", fontWeight: "500" }}>
                {wishlistMsg}
              </p>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              {product.stock_quantity > 0 ? (
                <>
                  <CheckCircle size={20} style={{ color: "#16a34a" }} />
                  <span style={{ color: "#16a34a", fontWeight: "500" }}>
                    In Stock ({product.stock_quantity} available)
                  </span>
                </>
              ) : (
                <>
                  <X size={20} style={{ color: "#dc2626" }} />
                  <span style={{ color: "#dc2626", fontWeight: "500" }}>Out of Stock</span>
                </>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <Truck size={20} style={{ color: "#6b7280" }} />
                <span style={{ fontSize: "13px", color: "#374151" }}>Free Shipping</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <Shield size={20} style={{ color: "#6b7280" }} />
                <span style={{ fontSize: "13px", color: "#374151" }}>Secure Payment</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <RotateCcw size={20} style={{ color: "#6b7280" }} />
                <span style={{ fontSize: "13px", color: "#374151" }}>Easy Returns</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <Package size={20} style={{ color: "#6b7280" }} />
                <span style={{ fontSize: "13px", color: "#374151" }}>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "48px", backgroundColor: "white", borderRadius: "20px", padding: "32px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", margin: "0 0 24px 0" }}>
            Product Details
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", margin: "0 0 12px 0" }}>
                Description
              </h3>
              <div style={{ color: "#6b7280", lineHeight: 1.7, fontSize: "15px" }}>
                {product.full_description ? (
                  <>
                    <p style={{ margin: 0 }}>
                      {showFullDesc
                        ? product.full_description
                        : `${product.full_description.slice(0, 400)}...`
                      }
                    </p>
                    {product.full_description.length > 400 && (
                      <button
                        onClick={() => setShowFullDesc(!showFullDesc)}
                        style={{ background: "none", border: "none", color: "#d97706", fontWeight: "600", cursor: "pointer", marginTop: "12px", padding: 0, fontSize: "14px" }}
                      >
                        {showFullDesc ? "Show Less ↑" : "Read More ↓"}
                      </button>
                    )}
                  </>
                ) : (
                  <p>No detailed description available.</p>
                )}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", margin: "0 0 12px 0" }}>
                Specifications
              </h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {product.isbn && (
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #f3f4f6" }}>
                    <span style={{ color: "#6b7280", display: "flex", alignItems: "center", gap: "8px" }}>
                      <FileText size={16} /> ISBN
                    </span>
                    <span style={{ fontWeight: "500", color: "#111827" }}>{product.isbn}</span>
                  </div>
                )}
                {product.language && (
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #f3f4f6" }}>
                    <span style={{ color: "#6b7280", display: "flex", alignItems: "center", gap: "8px" }}>
                      <Globe size={16} /> Language
                    </span>
                    <span style={{ fontWeight: "500", color: "#111827" }}>{product.language}</span>
                  </div>
                )}
                {product.pages_count && (
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #f3f4f6" }}>
                    <span style={{ color: "#6b7280", display: "flex", alignItems: "center", gap: "8px" }}>
                      <BookOpen size={16} /> Pages
                    </span>
                    <span style={{ fontWeight: "500", color: "#111827" }}>{product.pages_count}</span>
                  </div>
                )}
                {product.publication_date && (
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #f3f4f6" }}>
                    <span style={{ color: "#6b7280", display: "flex", alignItems: "center", gap: "8px" }}>
                      <Calendar size={16} /> Published
                    </span>
                    <span style={{ fontWeight: "500", color: "#111827" }}>
                      {new Date(product.publication_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {product.format && (
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #f3f4f6" }}>
                    <span style={{ color: "#6b7280", display: "flex", alignItems: "center", gap: "8px" }}>
                      <Package size={16} /> Format
                    </span>
                    <span style={{ fontWeight: "500", color: "#111827", textTransform: "capitalize" }}>
                      {product.format}
                    </span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0" }}>
                  <span style={{ color: "#6b7280", display: "flex", alignItems: "center", gap: "8px" }}>
                    <CheckCircle size={16} /> Availability
                  </span>
                  <span style={{ fontWeight: "500", color: product.stock_quantity > 0 ? "#16a34a" : "#dc2626" }}>
                    {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : "Out of stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {cartOpen && (
        <>
          <div
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 99 }}
            onClick={() => setCartOpen(false)}
          />
          <div style={{ position: "fixed", top: 0, right: 0, width: "100%", maxWidth: "420px", height: "100vh", backgroundColor: "white", boxShadow: "-10px 0 40px rgba(0,0,0,0.2)", zIndex: 100, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "2px solid #f3f4f6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <ShoppingCart style={{ width: "24px", height: "24px", color: "#d97706" }} />
                <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>Your Cart</h2>
                <span style={{ backgroundColor: "#fef3c7", color: "#92400e", padding: "4px 12px", borderRadius: "9999px", fontSize: "14px", fontWeight: "bold" }}>
                  {cartCount} items
                </span>
              </div>
              <button style={{ padding: "8px", background: "none", border: "none", cursor: "pointer" }} onClick={() => setCartOpen(false)}>
                <X style={{ width: "20px", height: "20px" }} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <ShoppingCart style={{ width: "64px", height: "64px", color: "#d1d5db", margin: "0 auto 16px" }} />
                  <p style={{ color: "#6b7280", fontSize: "16px" }}>Your cart is empty</p>
                  <button style={{ marginTop: "16px", padding: "10px 24px", backgroundColor: "#d97706", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }} onClick={() => setCartOpen(false)}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {cartItems.map((item) => (
                    <div key={item.product_id} style={{ display: "flex", gap: "16px", padding: "16px", backgroundColor: "#f9fafb", borderRadius: "12px" }}>
                      <div style={{ width: "70px", height: "90px", backgroundColor: "#f3f4f6", borderRadius: "8px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                        {item.cover_image_url ? (
                          <Image src={item.cover_image_url} alt="" fill style={{ objectFit: "cover" }} unoptimized />
                        ) : (
                          <BookOpen style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", color: "#9ca3af" }} />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontWeight: "600", color: "#111827", margin: "0 0 4px 0", fontSize: "14px" }}>{item.title}</h4>
                        <p style={{ color: "#d97706", fontWeight: "bold", margin: "0 0 8px 0", fontSize: "14px" }}>
                          ${item.discount_price || item.price}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <button style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #d1d5db", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => updateQuantity(item.product_id, item.quantity - 1)}>
                            <Minus size={14} />
                          </button>
                          <span style={{ width: "32px", textAlign: "center", fontWeight: "600" }}>{item.quantity}</span>
                          <button style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #d1d5db", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>
                            <Plus size={14} />
                          </button>
                          <button style={{ marginLeft: "auto", color: "#dc2626", background: "none", border: "none", cursor: "pointer", padding: "4px" }} onClick={() => removeFromCart(item.product_id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={{ padding: "20px 24px", borderTop: "2px solid #f3f4f6" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <Link href="/checkout"
                  style={{
                    width: "100%",
                    padding: "14px",
                    backgroundColor: "#d97706",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    textDecoration: "none"
                  }}
                >
                  Checkout <ArrowRight size={20} />
                </Link>
              </div>
            )}
          </div>
        </>
      )}

      {wishlistOpen && (
        <>
          <div
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 99 }}
            onClick={() => setWishlistOpen(false)}
          />
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", borderRadius: "20px", boxShadow: "0 25px 50px rgba(0,0,0,0.3)", width: "90%", maxWidth: "500px", maxHeight: "80vh", overflowY: "auto", zIndex: 100 }}>
            <div style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Heart style={{ width: "24px", height: "24px", color: "#dc2626", fill: "#dc2626" }} />
                  <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "bold" }}>My Wishlist</h2>
                  <span style={{ backgroundColor: "#fef3c7", color: "#92400e", padding: "4px 12px", borderRadius: "9999px", fontSize: "13px", fontWeight: "bold" }}>
                    {wishlist.length} items
                  </span>
                </div>
                <button style={{ padding: "8px", background: "none", border: "none", cursor: "pointer" }} onClick={() => setWishlistOpen(false)}>
                  <X style={{ width: "20px", height: "20px" }} />
                </button>
              </div>

              {wishlist.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <Heart style={{ width: "48px", height: "48px", color: "#d1d5db", margin: "0 auto 12px" }} />
                  <p style={{ color: "#6b7280" }}>Your wishlist is empty</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {wishlist.map((item) => (
                    <div key={item.wishlist_id} style={{ display: "flex", gap: "12px", padding: "12px", backgroundColor: "#f9fafb", borderRadius: "12px", alignItems: "center" }}>
                      <div style={{ width: "50px", height: "65px", backgroundColor: "#f3f4f6", borderRadius: "6px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                        {item.product?.cover_image_url ? (
                          <Image src={item.product.cover_image_url} alt="" fill style={{ objectFit: "cover" }} unoptimized />
                        ) : (
                          <BookOpen style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", color: "#9ca3af", width: "20px", height: "20px" }} />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontWeight: "600", color: "#111827", margin: "0 0 2px 0", fontSize: "14px" }}>
                          {item.product?.title || "Unknown Product"}
                        </h4>
                        <p style={{ color: "#d97706", fontWeight: "bold", margin: 0, fontSize: "13px" }}>
                          ${item.product?.discount_price || item.product?.price || 0}
                        </p>
                      </div>
                      <button
                        style={{ padding: "8px", color: "#dc2626", background: "none", border: "none", cursor: "pointer" }}
                        onClick={() => removeWishlist(item.wishlist_id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <footer style={{ backgroundColor: "#111827", color: "#9ca3af", padding: "32px 16px", textAlign: "center" }}>
        <p style={{ margin: 0 }}>© 2026 Pine Book Publishing. All rights reserved.</p>
      </footer>
    </div>
  );
}