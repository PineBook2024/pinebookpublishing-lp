import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const GUEST_KEY = "pinebook_cart_guest";

const getKey = () => {
  const uid = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
  return uid ? `pinebook_cart_${uid}` : GUEST_KEY;
};

const loadStorage = (key) => {
  if (typeof window === "undefined") return [];
  try {
    const s = localStorage.getItem(key);
    if (s) {
      const p = JSON.parse(s);
      if (Array.isArray(p)) return p;
    }
  } catch (e) {}
  return [];
};

const saveStorage = (key, items) => {
  if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(items));
};

const clearGuestCart = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(GUEST_KEY);
};

const clearAllCarts = () => {
  if (typeof window === "undefined") return;
  Object.keys(localStorage).forEach(k => {
    if (k.startsWith("pinebook_cart_")) localStorage.removeItem(k);
  });
};

const fetchBackendCart = async (token) => {
  try {
    const r = await fetch(`${API_BASE_URL}/api/cart/user`, {
      headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
    });
    if (r.ok) {
      const d = await r.json();
      return d.items || [];
    }
  } catch (e) {}
  return [];
};

export function useCart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const calc = useCallback((arr) => {
    let t = 0, c = 0;
    arr.forEach(it => {
      const up = parseFloat(it?.discount_price) > 0 ? parseFloat(it.discount_price) : parseFloat(it?.price) || 0;
      const q = parseInt(it?.quantity) || 1;
      t += up * q; c += q;
    });
    setTotal(t); setCount(c);
  }, []);

  const load = useCallback(async () => {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("user_id");
    let arr = [];

    if (token && uid) {
      // LOGGED IN: Always use backend cart, ignore localStorage completely
      clearGuestCart();
      arr = await fetchBackendCart(token);
      // Save to current user's key only
      saveStorage(getKey(), arr);
    } else {
      // GUEST: Use guest cart only
      arr = loadStorage(GUEST_KEY);
    }

    setItems(arr);
    calc(arr);
    setLoaded(true);
  }, [calc]);

  useEffect(() => {
    load();
    
    // Cross-tab sync
    const onStorage = (e) => { 
      if (e.key === "token" || e.key === "user_id" || e.key?.startsWith("pinebook_cart_")) {
        load(); 
      } 
    };
    window.addEventListener("storage", onStorage);
    
    // Tab focus
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    
    // Auth change (same tab)
    const onAuthChange = () => load();
    window.addEventListener("auth_changed", onAuthChange);
    
    return () => { 
      window.removeEventListener("storage", onStorage); 
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("auth_changed", onAuthChange);
    };
  }, [load]);

  const add = async (product) => {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("user_id");
    const loggedIn = !!(token && uid);

    setItems(prev => {
      const idx = prev.findIndex(it => (it.product_id || it.id) === (product.product_id || product.id));
      let next;
      if (idx >= 0) {
        next = [...prev];
        next[idx] = { ...next[idx], quantity: (next[idx].quantity || 1) + (product.quantity || 1) };
      } else {
        next = [...prev, { ...product, quantity: product.quantity || 1 }];
      }
      
      // Always save to CORRECT key
      saveStorage(getKey(), next);
      calc(next);

      if (loggedIn) {
        fetch(`${API_BASE_URL}/api/cart/add`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify({ 
            product_id: product.product_id || product.id, 
            quantity: product.quantity || 1 
          })
        }).catch(() => {});
      }
      return next;
    });
  };

  const remove = (pid) => {
    setItems(prev => {
      const next = prev.filter(it => (it.product_id || it.id) !== pid);
      saveStorage(getKey(), next);
      calc(next);
      return next;
    });
  };

  const updateQty = (pid, qty) => {
    if (qty < 1) { remove(pid); return; }
    setItems(prev => {
      const next = prev.map(it => (it.product_id || it.id) === pid ? { ...it, quantity: qty } : it);
      saveStorage(getKey(), next);
      calc(next);
      return next;
    });
  };

  const clear = () => { 
    setItems([]); 
    setTotal(0); 
    setCount(0); 
    const currentKey = getKey();
    localStorage.removeItem(currentKey);
    
    // Also clear from backend if logged in
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API_BASE_URL}/api/cart/clear`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      }).catch(() => {});
    }
  };

  return { 
    cartItems: items, 
    cartTotal: total, 
    cartCount: count, 
    isLoaded: loaded, 
    addToCart: add, 
    removeFromCart: remove, 
    updateQuantity: updateQty, 
    clearCart: clear, 
    reloadCart: load 
  };
}

export default useCart;