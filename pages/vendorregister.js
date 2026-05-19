import React, { useState } from 'react';
import axios from 'axios';

export default function VendorRegister() {
  const [formData, setFormData] = useState({
    company_name: '',
    author_brand_name: '', // Required by schema
    tax_number: '',
    plan_name: 'Discover ($0.00)',
    description: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    website_url: '',
    address_line1: '',
    city: '',
    country: 'Afghanistan',
    state_province: '',
    zip_postal_code: '',
    terms_accepted: false,
    privacy_accepted: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Get your Auth token (assuming stored in localStorage or cookie)
    const token = localStorage.getItem('token'); 

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/vendor-applications', 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage({ type: 'success', text: 'Application submitted successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl p-6 mx-auto font-sans text-gray-800">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-gray-500">Home / Apply for a vendor account</nav>
      
      <h1 className="mb-8 text-2xl font-bold">Apply for a vendor account</h1>

      <div className="flex flex-col gap-12 md:flex-row">
        {/* Left Side: Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          
          <div>
            <label className="block text-sm font-semibold">Company *</label>
            <input type="text" name="company_name" required onChange={handleChange} className="w-full p-2 mt-1 border" />
          </div>

          <div>
            <label className="block text-sm font-semibold">Brand Name *</label>
            <input type="text" name="author_brand_name" required onChange={handleChange} className="w-full p-2 mt-1 border" placeholder="Brand/Author Display Name" />
          </div>

          <div>
            <label className="block text-sm font-semibold">Tax number</label>
            <input type="text" name="tax_number" onChange={handleChange} className="w-full p-2 mt-1 border" />
          </div>

          <div>
            <label className="block text-sm font-semibold">Plan</label>
            <select name="plan_name" onChange={handleChange} className="w-full p-2 mt-1 bg-white border">
              <option>Discover ($0.00)</option>
              <option>Premium ($99.00)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold">Description</label>
            <textarea name="description" rows="4" onChange={handleChange} className="w-full p-2 mt-1 border"></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">First name *</label>
              <input type="text" name="first_name" required onChange={handleChange} className="w-full p-2 mt-1 border" />
            </div>
            <div>
              <label className="block text-sm font-semibold">Last name *</label>
              <input type="text" name="last_name" required onChange={handleChange} className="w-full p-2 mt-1 border" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold">E-mail *</label>
            <input type="email" name="email" required onChange={handleChange} className="w-full p-2 mt-1 border" />
          </div>

          <div>
            <label className="block text-sm font-semibold">Phone</label>
            <input type="text" name="phone" onChange={handleChange} className="w-full p-2 mt-1 border" />
          </div>

          <div>
            <label className="block text-sm font-semibold">URL (Website)</label>
            <input type="text" name="website_url" onChange={handleChange} className="w-full p-2 mt-1 border" />
          </div>

          <div>
            <label className="block text-sm font-semibold">Address</label>
            <input type="text" name="address_line1" onChange={handleChange} className="w-full p-2 mt-1 border" />
          </div>

          <div>
            <label className="block text-sm font-semibold">City *</label>
            <input type="text" name="city" required onChange={handleChange} className="w-full p-2 mt-1 border" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">Country *</label>
              <select name="country" onChange={handleChange} className="w-full p-2 mt-1 bg-white border">
                <option>Afghanistan</option>
                <option>United States</option>
                {/* Add more countries */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold">State/Province</label>
              <input type="text" name="state_province" onChange={handleChange} className="w-full p-2 mt-1 border" />
            </div>
          </div>

          <div className="w-1/3">
            <label className="block text-sm font-semibold">Zip/postal code *</label>
            <input type="text" name="zip_postal_code" required onChange={handleChange} className="w-full p-2 mt-1 border" />
          </div>

          {/* Agreements Section */}
          <div className="p-4 space-y-3 border bg-gray-50">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" name="terms_accepted" required onChange={handleChange} />
              <span>I accept the <span className="text-blue-600 underline">Terms and Conditions</span></span>
            </label>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="privacy_accepted" required onChange={handleChange} />
            <span>I agree to have my personal data <span className="text-blue-600 underline">processed as follows</span>.</span>
          </div>

          {message && (
            <div className={`p-3 text-white ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
              {message.text}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="px-8 py-2 font-semibold text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {/* Right Side: Info Sidebar */}
        <div className="md:w-1/3">
          <h2 className="mb-4 text-xl font-bold">Become a vendor</h2>
          <ul className="mb-8 space-y-3 text-sm text-gray-600">
            <li className="flex gap-2"><span>•</span> Access your personal administrator area</li>
            <li className="flex gap-2"><span>•</span> Use the common storefront to sell your goods</li>
            <li className="flex gap-2"><span>•</span> Get your profit share</li>
          </ul>
          
          {/* Handshake Graphic Placeholder */}
          <div className="flex justify-center opacity-10">
             <img src="/handshake-icon.png" alt="Icon" className="w-48 h-48 grayscale" />
          </div>
        </div>
      </div>
    </div>
  );
} 