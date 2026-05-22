"use client";

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useStore } from "../context/StoreContext";

const BRAND = {
  primary: "#137c6d",
  primaryLight: "#309687",
  primaryDark: "#075448",
  gradient: "linear-gradient(90deg, rgba(19, 124, 109, 1) 0%, rgba(48, 150, 135, 1) 100%)",
  gradientDark: "linear-gradient(135deg, #075448 0%, #137c6d 55%, #309687 100%)",
  soft: "#ecfdf5",
  border: "#e7e5e4",
  text: "#0f172a",
  textMuted: "#64748b",
  bg: "#fafaf9",
  surface: "#ffffff",
  accent: "#fbbf24",
};

export default function Login() {
  const store = useStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://pinebookbackend.pinedigitalhub.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login Successful ");
        localStorage.setItem("token", data.token);

        if (store?.fetchWishlist) {
          store.fetchWishlist();
        }

        window.location.href = "/shop";
      } else {
        alert("Error: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "13px 16px 13px 44px",
    height: "52px",
    borderRadius: "12px",
    border: `1px solid ${BRAND.border}`,
    outline: "none",
    fontSize: "14px",
    backgroundColor: "#f8fafc",
    color: BRAND.text,
    fontFamily: "inherit",
    transition: "all 0.2s",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "13px",
    fontWeight: 600,
    color: BRAND.text,
    letterSpacing: "-0.01em",
  };

  const iconWrapStyle = {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: BRAND.textMuted,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <Head>
        <title>Sign In | Pine Book Publishing</title>
        <link rel="icon" href="/assets/images/favicon.png" />
      </Head>

      <style>{`
        .pb-auth-input:focus {
          border-color: ${BRAND.primary} !important;
          box-shadow: 0 0 0 4px rgba(19,124,109,0.10) !important;
          background-color: #ffffff !important;
        }
        .pb-auth-btn-primary:hover { filter: brightness(1.08); }
        .pb-auth-link:hover { color: ${BRAND.primaryDark} !important; }
        @media (max-width: 991px) {
          .pb-auth-grid { grid-template-columns: 1fr !important; }
          .pb-auth-left { min-height: 280px !important; padding: 40px 24px !important; }
          .pb-auth-right { padding: 40px 20px !important; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: BRAND.bg,
          fontFamily: "'Poppins', ui-sans-serif, system-ui, -apple-system, sans-serif",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <div
          className="pb-auth-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            width: "100%",
            minHeight: "100vh",
          }}
        >
          {/* LEFT SIDE - Brand panel */}
          <div
            className="pb-auth-left"
            style={{
              background: BRAND.gradientDark,
              color: "white",
              padding: "60px 56px",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -100,
                right: -100,
                width: 360,
                height: 360,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(251,191,36,0.18), transparent 70%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -120,
                left: -80,
                width: 320,
                height: 320,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)",
              }}
            />

            <div style={{ position: "relative", zIndex: 2 }}>
              <Link
                href="/"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.18)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <BookOpen style={{ width: 22, height: 22, color: "white" }} />
                </div>
                <h1
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: "white",
                    margin: 0,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Pine<span style={{ color: BRAND.accent }}>Book</span>
                </h1>
              </Link>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  marginTop: 36,
                  marginBottom: 18,
                  backdropFilter: "blur(6px)",
                }}
              >
                <Sparkles style={{ width: 14, height: 14, color: BRAND.accent }} />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Welcome Back
                </span>
              </div>

              <h2
                style={{
                  fontSize: 44,
                  fontWeight: 700,
                  margin: "0 0 16px 0",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Pick up where <br />
                <span style={{ color: BRAND.accent }}>you left off</span>
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.85)",
                  margin: "0 0 28px 0",
                  maxWidth: 420,
                  lineHeight: 1.65,
                }}
              >
                Sign in to view your wishlist, track your orders, and continue
                exploring curated titles from your favorite authors.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  maxWidth: 420,
                }}
              >
                {[
                  "Access your saved books & wishlist",
                  "Track recent orders & purchases",
                  "Member-only discounts & early access",
                ].map((line, idx) => (
                  <div
                    key={idx}
                    style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}
                  >
                    <CheckCircle2 style={{ width: 18, height: 18, color: BRAND.accent, flexShrink: 0 }} />
                    <span style={{ color: "rgba(255,255,255,0.92)" }}>{line}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 2,
                marginTop: 40,
                textAlign: "center",
              }}
            >
              <img
                src="/images/bb-01.png"
                alt="Pine Book"
                style={{
                  maxWidth: "100%",
                  maxHeight: 320,
                  margin: "0 auto",
                  filter: "drop-shadow(0 25px 40px rgba(0,0,0,0.30))",
                }}
              />
            </div>
          </div>

          {/* RIGHT SIDE - Form */}
          <div
            className="pb-auth-right"
            style={{
              padding: "60px 56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: BRAND.bg,
            }}
          >
            <div style={{ width: "100%", maxWidth: 460 }}>
              <div style={{ marginBottom: 28 }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 11,
                    fontWeight: 700,
                    color: BRAND.primary,
                    textTransform: "uppercase",
                    letterSpacing: "1.4px",
                    padding: "4px 12px",
                    backgroundColor: BRAND.soft,
                    borderRadius: 999,
                    marginBottom: 14,
                  }}
                >
                  Sign In
                </span>
                <h2
                  style={{
                    fontSize: 30,
                    fontWeight: 700,
                    color: BRAND.text,
                    margin: "0 0 6px 0",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Login to your account
                </h2>
                <p style={{ fontSize: 14, color: BRAND.textMuted, margin: 0 }}>
                  Welcome back! Please enter your details.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>Email Address</label>
                  <div style={{ position: "relative" }}>
                    <span style={iconWrapStyle}>
                      <Mail size={16} />
                    </span>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="pb-auth-input"
                      style={inputStyle}
                      type="email"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Password</label>
                  <div style={{ position: "relative" }}>
                    <span style={iconWrapStyle}>
                      <Lock size={16} />
                    </span>
                    <input
                      type={showPwd ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="Enter your password"
                      className="pb-auth-input"
                      style={{ ...inputStyle, paddingRight: 44 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      style={{
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: BRAND.textMuted,
                        padding: 6,
                        display: "flex",
                      }}
                    >
                      {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 24,
                    fontSize: 13,
                  }}
                >
                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      color: BRAND.textMuted,
                      cursor: "pointer",
                    }}
                  >
                    <input type="checkbox" style={{ accentColor: BRAND.primary }} />
                    Remember me
                  </label>
                  <Link
                    href="/forgot-password"
                    className="pb-auth-link"
                    style={{
                      color: BRAND.primary,
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="pb-auth-btn-primary"
                  style={{
                    width: "100%",
                    padding: "15px",
                    background: BRAND.gradient,
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: "0 8px 20px rgba(19,124,109,0.30)",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                    opacity: loading ? 0.7 : 1,
                    letterSpacing: "0.2px",
                  }}
                >
                  {loading ? "Signing in..." : "Sign In"}
                  {!loading && <ArrowRight size={18} />}
                </button>

                <div
                  style={{
                    textAlign: "center",
                    marginTop: 22,
                    fontSize: 14,
                    color: BRAND.textMuted,
                  }}
                >
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="pb-auth-link"
                    style={{
                      color: BRAND.primary,
                      fontWeight: 700,
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                  >
                    Create account
                  </Link>
                </div>

                <p
                  style={{
                    textAlign: "center",
                    marginTop: 26,
                    fontSize: 11,
                    color: BRAND.textMuted,
                  }}
                >
                  
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
