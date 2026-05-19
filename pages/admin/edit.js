import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminEditPage() {
  const router = useRouter();
  const { type, id } = router.query;

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // ================= ENDPOINT MAP =================
  const getEndpoint = () => {
    if (type === "user") return "users";
    if (type === "author") return "authors";
    if (type === "vendor") return "vendor-applications";
    return null;
  };

  // Fields jo har type ke liye alag hain
  const getFieldsConfig = () => {
    switch (type) {
      case "user":
        return [
          { name: "first_name", label: "First Name", type: "text" },
          { name: "last_name", label: "Last Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone", type: "text" },
        ];
      case "author":
        return [
          { name: "display_name", label: "Display Name", type: "text" },
          { name: "company_name", label: "Company Name", type: "text" },
          { name: "author_bio", label: "Bio", type: "textarea" },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone", type: "text" },
          { name: "website_url", label: "Website", type: "text" },
          { name: "tax_number", label: "Tax Number", type: "text" },
          { name: "approval_status", label: "Approval Status", type: "select", options: ["pending", "approved", "rejected"] },
          { name: "wallet_balance", label: "Wallet Balance", type: "number" },
        ];
      case "vendor":
        return [
          { name: "first_name", label: "First Name", type: "text" },
          { name: "last_name", label: "Last Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone", type: "text" },
          { name: "company_name", label: "Company Name", type: "text" },
          { name: "author_brand_name", label: "Brand Name", type: "text" },
          { name: "tax_number", label: "Tax Number", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "website_url", label: "Website", type: "text" },
          { name: "address_line1", label: "Address Line 1", type: "text" },
          { name: "address_line2", label: "Address Line 2", type: "text" },
          { name: "city", label: "City", type: "text" },
          { name: "state_province", label: "State/Province", type: "text" },
          { name: "country", label: "Country", type: "text" },
          { name: "zip_postal_code", label: "ZIP/Postal Code", type: "text" },
          { name: "application_status", label: "Application Status", type: "select", options: ["pending", "under_review", "approved", "rejected"] },
          { name: "admin_notes", label: "Admin Notes", type: "textarea" },
        ];
      default:
        return [];
    }
  };

  // ================= FETCH DATA =================
  useEffect(() => {
    if (!type || !id) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const endpoint = getEndpoint();
        if (!endpoint) {
          setError("Invalid type provided");
          return;
        }

        const res = await axios.get(
          `http://127.0.0.1:8000/api/${endpoint}/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = res.data?.data || res.data || {};
        console.log("API Response:", data);
        setForm(data);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id, token]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: inputType === "checkbox" ? checked : value,
    }));
  };

  // ================= UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = getEndpoint();
      
      // Sirf wahi fields bhejo jo backend accept karta hai
      const fieldsConfig = getFieldsConfig();
      const updateData = {};
      fieldsConfig.forEach(field => {
        if (form[field.name] !== undefined) {
          updateData[field.name] = form[field.name];
        }
      });

      // Agar nested 'user' object hai toh uska bhi data lo
      if (form.user && typeof form.user === "object") {
        updateData.user_id = form.user_id || form.user.id;
      }

      console.log("Sending update:", updateData);

      await axios.put(
        `http://127.0.0.1:8000/api/${endpoint}/${id}`,
        updateData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        }
      );

      alert("✅ Updated Successfully");
      router.push("/admin/dashboard");
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Update failed");
      alert(`❌ Update Failed: ${err.response?.data?.message || err.message}`);
    }
  };

  // ================= RENDER FIELD =================
  const renderField = (field) => {
    const value = form[field.name] || "";

    if (field.type === "textarea") {
      return (
        <textarea
          name={field.name}
          value={value}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      );
    }

    if (field.type === "select") {
      return (
        <select
          name={field.name}
          value={value}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select {field.label}</option>
          {field.options.map(opt => (
            <option key={opt} value={opt}>
              {opt.replace(/_/g, " ").toUpperCase()}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={field.type}
        name={field.name}
        value={value}
        onChange={handleChange}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
      />
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error && !form.id && !form.user_id) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  const fieldsConfig = getFieldsConfig();

  return (
    <div className="max-w-2xl p-6 mx-auto mt-10 bg-white shadow-lg rounded-xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-800 capitalize">
        Edit {type}
      </h1>

      {error && (
        <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {fieldsConfig.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-700 capitalize">
              {field.label}
            </label>
            {renderField(field)}
          </div>
        ))}

        {/* Read-only info */}
        <div className="p-3 mt-4 text-sm text-gray-600 rounded bg-gray-50">
          <p><strong>ID:</strong> {form.id || form.user_id || form.application_id || id}</p>
          {form.created_at && <p><strong>Created:</strong> {new Date(form.created_at).toLocaleDateString()}</p>}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 p-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Update {type}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/dashboard")}
            className="p-3 px-6 font-semibold text-gray-700 transition bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}