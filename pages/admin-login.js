import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { Mail, Lock, ChevronRight } from "lucide-react";

export default function AdminLogin() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // STEP 1: SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
     await axios.post("https://pinebookbackend.pinedigitalhub.com/api/admin/login",  {
        email: form.email,
        password: form.password,
      });

      setStep(2);
      setMessage({ type: "success", text: "OTP sent to email" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Login failed",
      });
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: VERIFY OTP
  // STEP 2: VERIFY OTP
const handleVerifyOtp = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(
      "https://pinebookbackend.pinedigitalhub.com/api/admin/verify-otp",
      {
        email: form.email,
        otp: form.otp,
      }
    );

    console.log("✅ OTP Response:", res.data);

    // ✅ FIX: Save token, user, AND verification flag
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("admin_otp_verified", "true"); // ✅ YEH LINE ADD KARO!

    setMessage({ type: "success", text: "Login successful" });

    setTimeout(() => {
      window.location.href = "/admin/dashboard";
    }, 800);
    
  } catch (error) {
    console.error("❌ OTP Error:", error);
    setMessage({
      type: "error",
      text: error.response?.data?.message || "Invalid OTP",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6] p-4 font-sans">
      <Head>
        <title>Admin Login</title>
      </Head>

      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl min-h-[600px]">

        {/* LEFT */}
        <div className="md:w-[45%] bg-gradient-to-b from-[#1e60d2] to-[#29b6d1] p-12 text-white flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold">Admin Login</h1>
            <p className="mt-4 text-sm opacity-80">
              Secure OTP based authentication system
            </p>
          </div>

          <div className="p-6 border rounded-xl bg-white/10">
            Secure System
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:w-[55%] p-10 flex flex-col justify-center">

          <h2 className="mb-6 text-2xl font-bold">
            {step === 1 ? "Login Account" : "Verify OTP"}
          </h2>

          {/* MESSAGE */}
          {message && (
            <div
              className={`p-3 mb-4 text-sm rounded ${
                message.type === "success"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-5">

              {/* EMAIL */}
              <div className="relative">
                <Mail className="absolute text-gray-400 left-3 top-3" />
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-3 pl-10 border rounded"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <Lock className="absolute text-gray-400 left-3 top-3" />
                <input
                  type="text"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full p-3 pl-10 border rounded"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full p-3 text-white bg-blue-600 rounded"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">

              {/* OTP INPUT FIXED */}
              <input
                type="text"
                name="otp"
                value={form.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                className="w-full p-3 text-lg tracking-widest text-center border rounded"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full p-3 text-white bg-green-600 rounded"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-sm text-gray-500 underline"
              >
                Back
              </button>
            </form>
          )}

        </div>
      </div>
    </div>  
  );
}