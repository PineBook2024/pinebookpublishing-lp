import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PendingRequests() {
  const [data, setData] = useState({ authors: [], applications: [] });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/admin/pending-requests", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

 const handleAction = async (type, id, action) => {
  const token = localStorage.getItem("token");
  
  // URL ko backend ke 'admin' prefix aur structure se match karein
  const url = type === 'author' 
    ? `http://127.0.0.1:8000/api/admin/author/${action}/${id}` 
    : `http://127.0.0.1:8000/api/admin/vendor/${action}/${id}`;

  try {
    const res = await axios.post(url, {}, { 
      headers: { Authorization: `Bearer ${token}` } 
    });
    alert(res.data.message || "Action successful!");
    fetchData(); 
  } catch (err) {
    console.error("Error details:", err.response?.data);
    alert(err.response?.data?.message || "Action failed!");
  }
};

  if (loading) return <div className="p-10">Loading Requests...</div>;

  return (
    <div className="min-h-screen p-8 font-sans bg-gray-50">
      <h1 className="mb-8 text-2xl font-bold text-gray-800">Admin Approval Dashboard</h1>

      {/* VENDOR APPLICATIONS SECTION */}
      <section className="mb-12">
        <h2 className="pb-2 mb-4 text-lg font-semibold text-blue-700 border-b">New Vendor Applications ({data.applications.length})</h2>
        <div className="grid gap-4">
          {data.applications.map((app) => (
            <div key={app.application_id} className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div>
                <p className="font-bold text-gray-900">{app.author_brand_name || "No Brand Name"}</p>
                <p className="text-sm text-gray-500">{app.first_name} {app.last_name} | {app.email}</p>
                <span className="inline-block px-2 py-1 mt-2 text-xs text-yellow-700 bg-yellow-100 rounded">Pending</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleAction('vendor', app.application_id, 'approve')} className="px-4 py-2 text-sm text-white transition bg-green-600 rounded hover:bg-green-700">Accept</button>
                <button onClick={() => handleAction('vendor', app.application_id, 'reject')} className="px-4 py-2 text-sm text-red-600 transition border border-red-200 rounded bg-red-50 hover:bg-red-100">Reject</button>
              </div>
            </div>
          ))}
          {data.applications.length === 0 && <p className="italic text-gray-400">No pending applications.</p>}
        </div>
      </section>

      {/* INACTIVE AUTHORS SECTION */}
      <section>
        <h2 className="pb-2 mb-4 text-lg font-semibold text-purple-700 border-b">Inactive Author Profiles ({data.authors.length})</h2>
        <div className="grid gap-4">
          {data.authors.map((author) => (
            <div key={author.author_id} className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div>
                <p className="font-bold text-gray-900">{author.display_name}</p>
                <p className="text-sm text-gray-500">{author.email} | {author.company_name || 'Individual'}</p>
                <span className="inline-block px-2 py-1 mt-2 text-xs text-gray-600 bg-gray-100 rounded">Inactive</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleAction('author', author.author_id, 'approve')} className="px-4 py-2 text-sm text-white transition bg-blue-600 rounded hover:bg-blue-700">Activate</button>
                <button onClick={() => handleAction('author', author.author_id, 'reject')} className="px-4 py-2 text-sm text-red-600 transition border border-red-200 rounded bg-red-50 hover:bg-red-100">Suspend</button>
              </div>
            </div>
          ))}
          {data.authors.length === 0 && <p className="italic text-gray-400">No inactive authors found.</p>}
        </div>
      </section>
    </div>
  );
}