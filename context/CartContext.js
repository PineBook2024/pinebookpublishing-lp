import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);

  const getAuthToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token") || localStorage.getItem("auth_token");
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => {
      const price = parseFloat(item?.discount_price) > 0 
        ? item.discount_price 
        : item?.price || item?.unit_price || 0;
      return sum + price * (item?.quantity || 1);
    }, 0);
  };

  // 🔥 UNIVERSAL CART LOADER — sab keys check karega
  const loadCartFromStorage = () => {
    if (typeof window === "undefined") return [];
    
    const possibleKeys = ["cart", "pinebook_cart", "shopping_cart", "book_cart", "cart_items"];
    let items = [];
    
    for (const key of possibleKeys) {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            items = parsed;
            console.log(`✅ Cart loaded from key: "${key}"`, parsed);
            break;
          }
        }
      } catch (e) {
        console.warn(`❌ Failed to parse "${key}":`, e);
      }
    }
    
    return items;
  };

  const loadCart = async () => {
    // Step 1: Try API first
    try {
      const token = getAuthToken();
      const storedSession = localStorage.getItem("cart_session_token");
      
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
      };

      if (token) headers["Authorization"] = `Bearer ${token}`;
      if (storedSession) headers["X-Session-Token"] = storedSession;

      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        method: "GET",
        headers,
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.session_token) {
          localStorage.setItem("cart_session_token", data.session_token);
          setSessionToken(data.session_token);
        }

        const items = data.items?.map(item => ({
          product_id: item.product_id,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          discount_price: item.discount_price,
          unit_price: item.unit_price,
          line_total: item.line_total,
          cover_image_url: item.cover_image_url,
          cart_item_id: item.cart_item_id,
        })) || [];

        if (items.length > 0) {
          setCartItems(items);
          setCartTotal(calculateTotal(items));
          setIsLoaded(true);
          return;
        }
      }
    } catch (error) {
      console.log("API cart failed");
    }

    // Step 2: Fallback to localStorage — UNIVERSAL
    const items = loadCartFromStorage();
    
    if (items.length > 0) {
      setCartItems(items);
      setCartTotal(calculateTotal(items));
      // Sync to standard "cart" key
      localStorage.setItem("cart", JSON.stringify(items));
    }
    
    setIsLoaded(true);
  };

  useEffect(() => {
    loadCart();
    
    // Listen for cart updates from other tabs/components
    const handleStorage = (e) => {
      if (e.key?.includes("cart")) {
        console.log("Storage event:", e.key);
        loadCart();
      }
    };
    
    const handleCartUpdate = () => loadCart();
    
    window.addEventListener("storage", handleStorage);
    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("cartChange", handleCartUpdate);
    
    // Poll every 3 seconds as fallback
    const interval = setInterval(() => {
      const items = loadCartFromStorage();
      if (items.length !== cartItems.length) {
        console.log("Cart changed, refreshing...");
        loadCart();
      }
    }, 3000);
    
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("cartChange", handleCartUpdate);
      clearInterval(interval);
    };
  }, []);

  const addToCart = async (product) => {
    try {
      const token = getAuthToken();
      const storedSession = localStorage.getItem("cart_session_token");
      
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
      };

      if (token) headers["Authorization"] = `Bearer ${token}`;
      if (storedSession) headers["X-Session-Token"] = storedSession;

      const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          product_id: product.product_id,
          quantity: product.quantity || 1,
        }),
      });

      if (response.ok) {
        await loadCart();
        return { success: true };
      }
    } catch (error) {
      console.log("API add failed, using localStorage");
    }

    // Fallback: localStorage
    const existing = cartItems.find(item => item.product_id === product.product_id);
    let newItems;
    
    if (existing) {
      newItems = cartItems.map(item =>
        item.product_id === product.product_id
          ? { ...item, quantity: (item.quantity || 1) + (product.quantity || 1) }
          : item
      );
    } else {
      newItems = [...cartItems, { ...product, quantity: product.quantity || 1 }];
    }
    
    setCartItems(newItems);
    setCartTotal(calculateTotal(newItems));
    localStorage.setItem("cart", JSON.stringify(newItems));
    window.dispatchEvent(new Event("cartUpdated"));
    
    return { success: true };
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const token = getAuthToken();
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const response = await fetch(`${API_BASE_URL}/api/cart/item/${cartItemId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        await loadCart();
        return { success: true };
      }
    } catch (error) {
      console.log("API update failed");
    }

    const newItems = cartItems.map(item =>
      item.cart_item_id === cartItemId ? { ...item, quantity } : item
    );
    setCartItems(newItems);
    setCartTotal(calculateTotal(newItems));
    localStorage.setItem("cart", JSON.stringify(newItems));
    window.dispatchEvent(new Event("cartUpdated"));
    return { success: true };
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const token = getAuthToken();
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const response = await fetch(`${API_BASE_URL}/api/cart/item/${cartItemId}`, {
        method: "DELETE",
        headers,
      });

      if (response.ok) {
        await loadCart();
        return { success: true };
      }
    } catch (error) {
      console.log("API remove failed");
    }

    const newItems = cartItems.filter(item => item.cart_item_id !== cartItemId);
    setCartItems(newItems);
    setCartTotal(calculateTotal(newItems));
    localStorage.setItem("cart", JSON.stringify(newItems));
    window.dispatchEvent(new Event("cartUpdated"));
    return { success: true };
  };

  const clearCart = async () => {
    try {
      const token = getAuthToken();
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      await fetch(`${API_BASE_URL}/api/cart/clear`, {
        method: "DELETE",
        headers,
      });
    } catch (error) {
      console.log("API clear failed");
    }

    setCartItems([]);
    setCartTotal(0);
    localStorage.removeItem("cart");
    localStorage.removeItem("pinebook_cart");
    localStorage.removeItem("cart_session_token");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartTotal,
      isLoaded,
      sessionToken,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      refreshCart: loadCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}