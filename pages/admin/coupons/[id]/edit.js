import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pinebookbackend.pinedigitalhub.com/api';

export default function EditCoupon() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [form, setForm] = useState({
    code: "",
    name: "",
    description: "",
    discount_type: "fixed",
    discount_value: "",
    minimum_order_amount: "0",
    maximum_discount_amount: "",
    usage_limit: "",
    starts_at: "",
    ends_at: "",
    is_active: true,
  });

  // ===== FETCH COUPON DATA =====
  useEffect(() => {
    if (!id) return;

    const fetchCoupon = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/coupons/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;

        // Format datetime for input type="datetime-local" (YYYY-MM-DDTHH:MM)
        const formatDateTime = (dateStr) => {
          if (!dateStr) return "";
          const d = new Date(dateStr);
          d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
          return d.toISOString().slice(0, 16);
        };

        setForm({
          code: data.code || "",
          name: data.name || "",
          description: data.description || "",
          discount_type: data.discount_type || "fixed",
          discount_value: data.discount_value?.toString() || "",
          minimum_order_amount: data.minimum_order_amount?.toString() || "0",
          maximum_discount_amount: data.maximum_discount_amount?.toString() || "",
          usage_limit: data.usage_limit?.toString() || "",
          starts_at: formatDateTime(data.starts_at),
          ends_at: formatDateTime(data.ends_at),
          is_active: data.is_active === 1 || data.is_active === true,
        });
      } catch (err) {
        alert("Failed to load coupon");
        router.push("/admin/coupons");
      } finally {
        setFetching(false);
      }
    };

    fetchCoupon();
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_BASE_URL}/coupons/${id}`, {
        name: form.name,
        description: form.description || null,
        discount_type: form.discount_type,
        discount_value: parseFloat(form.discount_value),
        minimum_order_amount: parseFloat(form.minimum_order_amount) || 0,
        maximum_discount_amount: form.maximum_discount_amount ? parseFloat(form.maximum_discount_amount) : null,
        usage_limit: form.usage_limit ? parseInt(form.usage_limit) : null,
        starts_at: form.starts_at || null,
        ends_at: form.ends_at || null,
        is_active: form.is_active ? 1 : 0,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      router.push("/admin/coupons");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Failed to update"));
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f8fafc" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "4px solid #e5e7eb", borderTop: "4px solid #2563eb", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }}></div>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>Loading coupon...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1f2937", marginBottom: "8px" }}>
          Edit Coupon
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "32px" }}>
          Update coupon: <strong>{form.code}</strong>
        </p>

        <div style={{ backgroundColor: "white", padding: "32px", borderRadius: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <form onSubmit={handleSubmit}>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              
              {/* CODE - READ ONLY */}
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                  Coupon Code
                </label>
                <input
                  type="text"
                  value={form.code}
                  disabled
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "#f3f4f6",
                    color: "#6b7280",
                    cursor: "not-allowed",
                  }}
                />
                <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>Code cannot be changed</p>
              </div>

              {/* NAME */}
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                  Coupon Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Summer Sale"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "#111827",
                  }}
                />
              </div>

              {/* DISCOUNT TYPE */}
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                  Discount Type
                </label>
                <select
                  name="discount_type"
                  value={form.discount_type}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "#111827",
                  }}
                >
                  <option value="fixed">Fixed Amount</option>
                  <option value="percent">Percentage</option>
                </select>
              </div>

              {/* DISCOUNT VALUE */}
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                  Discount Value *
                </label>
                <input
                  type="number"
                  name="discount_value"
                  value={form.discount_value}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "#111827",
                  }}
                />
              </div>

              {/* MINIMUM ORDER */}
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                  Minimum Order
                </label>
                <input
                  type="number"
                  name="minimum_order_amount"
                  value={form.minimum_order_amount}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "#111827",
                  }}
                />
              </div>

              {/* MAXIMUM DISCOUNT */}
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                  Max Discount
                </label>
                <input
                  type="number"
                  name="maximum_discount_amount"
                  value={form.maximum_discount_amount}
                  onChange={handleChange}
                  placeholder="No limit"
                  step="0.01"
                  min="0"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "#111827",
                  }}
                />
              </div>

              {/* STARTS AT */}
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                  Starts At
                </label>
                <input
                  type="datetime-local"
                  name="starts_at"
                  value={form.starts_at}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "#111827",
                  }}
                />
              </div>

              {/* ENDS AT */}
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                  Ends At
                </label>
                <input
                  type="datetime-local"
                  name="ends_at"
                  value={form.ends_at}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "#111827",
                  }}
                />
              </div>

              {/* USAGE LIMIT */}
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                  Usage Limit
                </label>
                <input
                  type="number"
                  name="usage_limit"
                  value={form.usage_limit}
                  onChange={handleChange}
                  placeholder="Unlimited"
                  min="1"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "#111827",
                  }}
                />
              </div>

              {/* IS ACTIVE */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "28px" }}>
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
                <label style={{ fontSize: "14px", color: "#374151", cursor: "pointer" }}>
                  Active
                </label>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Describe the coupon..."
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  backgroundColor: "white",
                  color: "#111827",
                  resize: "vertical",
                }}
              />
            </div>

            {/* BUTTONS */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "20px", borderTop: "1px solid #e5e7eb" }}>
              <button
                type="button"
                onClick={() => router.push("/admin/coupons")}
                style={{
                  padding: "10px 24px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  backgroundColor: "white",
                  color: "#374151",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "10px 24px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#2563eb",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "Updating..." : "Update Coupon"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}