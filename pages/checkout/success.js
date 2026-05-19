import { useEffect } from "react";
import { useRouter } from "next/router";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const GUEST_KEY = "pinebook_cart_guest";

export default function SuccessPage() {
  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    // ✅ Clear ALL cart keys immediately
    const clearAllCartData = () => {
      if (typeof window === "undefined") return;

      // Remove guest cart
      localStorage.removeItem(GUEST_KEY);

      // Remove all user-specific cart keys
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith("pinebook_cart_")) {
          localStorage.removeItem(key);
        }
      });

      // Notify other components/tabs
      window.dispatchEvent(new CustomEvent("auth_changed"));
      window.dispatchEvent(new StorageEvent("storage", { key: GUEST_KEY }));
    };

    clearAllCartData();

    // ✅ Ask backend to verify the Stripe session and mark the order paid.
    // This is the fallback for local dev where Stripe webhooks can't reach localhost.
    const verifyStripeSession = async () => {
      if (!session_id) return;
      try {
        const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
        const headers = { "Content-Type": "application/json", "Accept": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${API_BASE_URL}/stripe/verify-session`, {
          method: "POST",
          headers,
          body: JSON.stringify({ session_id }),
        });
        if (!res.ok) {
          const txt = await res.text();
          console.warn("Stripe verify failed:", res.status, txt);
        }
      } catch (e) {
        console.warn("Stripe verify error:", e);
      }
    };

    verifyStripeSession();

    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push("/shop");
    }, 3000);

    return () => clearTimeout(timer);
  }, [session_id]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <div style={{ textAlign: "center", padding: 32 }}>
        <div style={{ width: 64, height: 64, margin: "0 auto 16px", backgroundColor: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="32" height="32" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
          Payment Successful 🎉
        </h1>
        <p style={{ color: "#6b7280", marginBottom: 24 }}>
          Your cart has been cleared.
        </p>
        <p style={{ color: "#9ca3af", fontSize: 14 }}>
          Redirecting to shop...
        </p>
      </div>
    </div>
  );
}