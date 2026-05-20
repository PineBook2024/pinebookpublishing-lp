import React, { useState } from "react";
import axios from "axios";

export default function AuthorCreate() {
  const [formData, setFormData] = useState({
    display_name: "",
    company_name: "",
    author_bio: "",

    email: "",
    phone: "",
    website_url: "",

    branding_logo_url: "",
    branding_banner_url: "",
    profile_image_url: "",

    tax_number: "",

    approval_status: "inactive",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const token = localStorage.getItem("token");

  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pinebookbackend.pinedigitalhub.com/api';
    
    await axios.post(`${API_BASE_URL}/authors`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    setMessage({ type: "success", text: "Author created successfully!" });

    setFormData({
      display_name: "",
      company_name: "",
      author_bio: "",
      email: "",
      phone: "",
      website_url: "",
      branding_logo_url: "",
      branding_banner_url: "",
      profile_image_url: "",
      tax_number: "",
      approval_status: "inactive",
    });
  } catch (error) {
    setMessage({
      type: "error",
      text: error.response?.data?.message || "Something went wrong",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-6xl p-6 mx-auto font-sans text-gray-800">

      <nav className="mb-4 text-sm text-gray-500">
        Home / Create Author
      </nav>

      <h1 className="mb-8 text-2xl font-bold">Create Author Profile</h1>

      <div className="flex flex-col gap-12 md:flex-row">

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">

          {/* DISPLAY NAME */}
          <div>
            <label className="block text-sm font-semibold">Display Name *</label>
            <input
              type="text"
              name="display_name"
              required
              value={formData.display_name}
              onChange={handleChange}
              className="w-full p-2 mt-1 border"
            />
          </div>

          {/* COMPANY */}
          <div>
            <label className="block text-sm font-semibold">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="w-full p-2 mt-1 border"
            />
          </div>

          {/* BIO */}
          <div>
            <label className="block text-sm font-semibold">Author Bio</label>
            <textarea
              name="author_bio"
              rows="4"
              value={formData.author_bio}
              onChange={handleChange}
              className="w-full p-2 mt-1 border"
            />
          </div>

          {/* EMAIL + PHONE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mt-1 border"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 mt-1 border"
              />
            </div>
          </div>

          {/* WEBSITE */}
          <div>
            <label className="block text-sm font-semibold">Website URL</label>
            <input
              type="text"
              name="website_url"
              value={formData.website_url}
              onChange={handleChange}
              className="w-full p-2 mt-1 border"
            />
          </div>

          {/* BRANDING */}
          <div>
            <label className="block text-sm font-semibold">Brand Logo URL</label>
            <input
              type="text"
              name="branding_logo_url"
              value={formData.branding_logo_url}
              onChange={handleChange}
              className="w-full p-2 mt-1 border"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Brand Banner URL</label>
            <input
              type="text"
              name="branding_banner_url"
              value={formData.branding_banner_url}
              onChange={handleChange}
              className="w-full p-2 mt-1 border"
            />
          </div>

          {/* PROFILE IMAGE */}
          <div>
            <label className="block text-sm font-semibold">Profile Image URL</label>
            <input
              type="text"
              name="profile_image_url"
              value={formData.profile_image_url}
              onChange={handleChange}
              className="w-full p-2 mt-1 border"
            />
          </div>

          {/* TAX NUMBER */}
          <div>
            <label className="block text-sm font-semibold">Tax Number</label>
            <input
              type="text"
              name="tax_number"
              value={formData.tax_number}
              onChange={handleChange}
              className="w-full p-2 mt-1 border"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="block text-sm font-semibold">Approval Status</label>
            <select
              name="approval_status"
              value={formData.approval_status}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-white border"
            >
              <option value="inactive">Inactive</option>
              <option value="approved">Approved</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* MESSAGE */}
          {message && (
            <div
              className={`p-3 text-white ${
                message.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Create Author"}
          </button>
        </form>

        {/* SIDEBAR */}
        <div className="md:w-1/3">
          <h2 className="mb-4 text-xl font-bold">Profile Tips</h2>

          <ul className="space-y-3 text-sm text-gray-600">
            <li>• Use a professional display name</li>
            <li>• Add branding for trust</li>
            <li>• Approved authors get visibility boost</li>
            <li>• Complete profile increases ranking</li>
          </ul>
        </div>

      </div>
    </div>
  );
}