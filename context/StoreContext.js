"use client";

import { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext();

const API = "http://localhost:8000/api";

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // ---------------- CART ----------------
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.product_id === product.product_id);
      if (exist) {
        return prev.map((i) =>
          i.product_id === product.product_id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);

  // ---------------- WISHLIST (API) ----------------
  const fetchWishlist = async (user_id = 1) => {
    try {
      const res = await fetch(`${API}/wishlists`);
      const data = await res.json();
      setWishlist(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const addToWishlist = async (product_id, user_id = 1) => {
    try {
      const res = await fetch(`${API}/wishlists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, product_id }),
      });

      if (res.status === 201) {
        fetchWishlist();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await fetch(`${API}/wishlists/${id}`, {
        method: "DELETE",
      });
      fetchWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        cartCount,

        wishlist,
        addToWishlist,
        removeFromWishlist,

        wishlistOpen,
        setWishlistOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);