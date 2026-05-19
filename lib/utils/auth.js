const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const clearAllCarts = () => {
  if (typeof window === "undefined") return;
  Object.keys(localStorage).forEach(k => {
    if (k.startsWith("pinebook_cart_")) localStorage.removeItem(k);
  });
};

const dispatchAuthChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("auth_changed"));
  }
};

export const login = async (email, password) => {
  try {
    const r = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const d = await r.json();
    if (r.ok && d.token) {
      // STEP 1: Clear ALL cart data FIRST
      clearAllCarts();
      
      // STEP 2: Save auth
      localStorage.setItem("token", d.token);
      localStorage.setItem("auth_token", d.token);
      localStorage.setItem("user_id", d.user.user_id);
      
      // STEP 3: Fetch user's own cart from backend
      try {
        const cr = await fetch(`${API_BASE_URL}/api/cart/user`, {
          headers: { "Authorization": `Bearer ${d.token}`, "Accept": "application/json" }
        });
        if (cr.ok) {
          const cd = await cr.json();
          const userCartItems = cd.items || [];
          if (userCartItems.length > 0) {
            localStorage.setItem(`pinebook_cart_${d.user.user_id}`, JSON.stringify(userCartItems));
          }
        }
      } catch (e) {
        console.error("Failed to fetch user cart:", e);
      }
      
      // STEP 4: Notify all components that auth changed
      dispatchAuthChange();
      
      return { success: true, user: d.user };
    }
    return { success: false, message: d.message || "Login failed" };
  } catch (e) {
    return { success: false, message: "Network error" };
  }
};

export const logout = () => {
  clearAllCarts();
  localStorage.removeItem("token");
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_id");
  dispatchAuthChange();
  window.location.href = "/login";
};

export const isLoggedIn = () => !!localStorage.getItem("token");
export const getToken = () => localStorage.getItem("token") || localStorage.getItem("auth_token");
export const getUserId = () => localStorage.getItem("user_id");

export default { login, logout, isLoggedIn, getToken, getUserId };