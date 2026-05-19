import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const Icons = {
  ArrowLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
  ),
};

export default function CreateCategoryPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    image_url: "",
    parent_id: "",
    is_active: true,
    sort_order: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setError("");

    const token = localStorage.getItem("token");
    
    try {
      await axios.post("http://127.0.0.1:8000/api/categories", form, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      router.push("/admin/categories");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/categories">
            <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Icons.ArrowLeft />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Add Category</h1>
            <p className="text-gray-500 text-sm">Create a new category</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Category name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Category description"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Parent ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category ID</label>
            <input
              type="number"
              name="parent_id"
              value={form.parent_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Leave empty for root category"
            />
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
            <input
              type="number"
              name="sort_order"
              value={form.sort_order}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Active */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 text-blue-600"
            />
            <label className="text-sm text-gray-700">Active</label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Category"}
            </button>
            <Link href="/admin/categories">
              <button
                type="button"
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}