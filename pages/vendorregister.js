import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Building2, User, Mail, Phone, Globe, MapPin, FileText,
  Sparkles, CheckCircle2, AlertCircle, ArrowRight, Loader2,
  ShieldCheck, Store, TrendingUp, BadgeDollarSign,
} from 'lucide-react';

const BRAND = {
  primary: '#137c6d',
  primaryDark: '#075448',
  primaryLight: '#309687',
  gradient: 'linear-gradient(135deg, #137c6d 0%, #309687 100%)',
  gradientDark: 'linear-gradient(135deg, #075448 0%, #137c6d 100%)',
  soft: '#ecfdf5',
  border: '#e7e5e4',
  text: '#0f172a',
  textMuted: '#64748b',
  bg: '#fafaf9',
  surface: '#ffffff',
  accent: '#fbbf24',
};

const inputBase = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '10px',
  border: `1px solid ${BRAND.border}`,
  backgroundColor: '#f8fafc',
  fontSize: '14px',
  color: BRAND.text,
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'all 0.2s',
};

function Field({ label, required, hint, children, icon: Icon }) {
  return (
    <div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: BRAND.text, marginBottom: 6 }}>
        {Icon && <Icon style={{ width: 14, height: 14, color: BRAND.primary }} />}
        {label}
        {required && <span style={{ color: '#dc2626' }}>*</span>}
      </label>
      {children}
      {hint && <p style={{ fontSize: 12, color: BRAND.textMuted, marginTop: 4 }}>{hint}</p>}
    </div>
  );
}

function SectionCard({ title, subtitle, children }) {
  return (
    <div style={{ backgroundColor: BRAND.surface, borderRadius: 16, border: `1px solid ${BRAND.border}`, padding: '24px', boxShadow: '0 1px 2px rgba(15,23,42,0.04)' }}>
      <div style={{ marginBottom: 18 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: BRAND.text, margin: 0 }}>{title}</h3>
        {subtitle && <p style={{ fontSize: 13, color: BRAND.textMuted, margin: '4px 0 0 0' }}>{subtitle}</p>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </div>
  );
}

export default function VendorRegister() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }
    setAuthChecked(true);
  }, [router]);

  const [formData, setFormData] = useState({
    company_name: '',
    author_brand_name: '',
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
    setMessage(null);

    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pinebookbackend.pinedigitalhub.com/api';
      await axios.post(
        `${API_BASE_URL}/vendor-applications`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage({ type: 'success', text: 'Application submitted successfully! We\'ll review it and get back to you soon.' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (!authChecked) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: BRAND.bg, color: BRAND.textMuted }}>
        <Loader2 style={{ width: 24, height: 24, animation: 'spin 1s linear infinite', marginRight: 10, color: BRAND.primary }} />
        <span style={{ fontSize: 14 }}>Checking session...</span>
        <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: BRAND.bg, fontFamily: 'inherit', color: BRAND.text }}>
      {/* Hero Banner */}
      <div style={{ position: 'relative', overflow: 'hidden', background: BRAND.gradientDark, color: 'white', padding: '64px 20px 80px' }}>
        <div style={{ position: 'absolute', top: -90, right: -90, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.18), transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -110, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)' }} />
        <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <nav style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 16 }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: 'white' }}>Become a Vendor</span>
          </nav>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.25)', marginBottom: 18 }}>
            <Sparkles style={{ width: 14, height: 14, color: BRAND.accent }} />
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Vendor Application</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, margin: 0, lineHeight: 1.15, maxWidth: 720 }}>
            Apply for a vendor account
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', margin: '14px 0 0 0', maxWidth: 620, lineHeight: 1.6 }}>
            Join Pine Book Publishing's marketplace. Sell your books and merchandise to thousands of readers worldwide.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1180, margin: '-48px auto 0', padding: '0 20px 64px', position: 'relative', zIndex: 3 }}>
        <div className="vendor-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28, alignItems: 'flex-start' }}>

          {/* Left: Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {message && (
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', borderRadius: 12,
                background: message.type === 'success' ? '#ecfdf5' : '#fef2f2',
                border: `1px solid ${message.type === 'success' ? '#86efac' : '#fecaca'}`,
                color: message.type === 'success' ? '#065f46' : '#991b1b',
              }}>
                {message.type === 'success'
                  ? <CheckCircle2 style={{ width: 20, height: 20, flexShrink: 0, marginTop: 1 }} />
                  : <AlertCircle style={{ width: 20, height: 20, flexShrink: 0, marginTop: 1 }} />}
                <p style={{ margin: 0, fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>{message.text}</p>
              </div>
            )}

            <SectionCard title="Business Information" subtitle="Tell us about your company or brand">
              <Field label="Company" required icon={Building2}>
                <input type="text" name="company_name" required value={formData.company_name} onChange={handleChange} style={inputBase} placeholder="Acme Publishing LLC" />
              </Field>
              <Field label="Brand / Author Name" required icon={Sparkles} hint="The name shown to customers on your storefront">
                <input type="text" name="author_brand_name" required value={formData.author_brand_name} onChange={handleChange} style={inputBase} placeholder="Brand or Author Display Name" />
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="two-col">
                <Field label="Tax Number" icon={FileText}>
                  <input type="text" name="tax_number" value={formData.tax_number} onChange={handleChange} style={inputBase} placeholder="Optional" />
                </Field>
                <Field label="Subscription Plan">
                  <select name="plan_name" value={formData.plan_name} onChange={handleChange} style={{ ...inputBase, backgroundColor: 'white', cursor: 'pointer' }}>
                    <option>Discover ($0.00)</option>
                    <option>Premium ($99.00)</option>
                  </select>
                </Field>
              </div>
              <Field label="Description" hint="A short description of your business shown on your storefront">
                <textarea name="description" rows="4" value={formData.description} onChange={handleChange} style={{ ...inputBase, resize: 'vertical', minHeight: 100 }} placeholder="Tell readers what makes your books special..." />
              </Field>
            </SectionCard>

            <SectionCard title="Contact Information" subtitle="How we'll reach you about your application">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="two-col">
                <Field label="First Name" required icon={User}>
                  <input type="text" name="first_name" required value={formData.first_name} onChange={handleChange} style={inputBase} />
                </Field>
                <Field label="Last Name" required>
                  <input type="text" name="last_name" required value={formData.last_name} onChange={handleChange} style={inputBase} />
                </Field>
              </div>
              <Field label="Email" required icon={Mail}>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} style={inputBase} placeholder="you@example.com" />
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="two-col">
                <Field label="Phone" icon={Phone}>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={inputBase} placeholder="+1 (555) 000-0000" />
                </Field>
                <Field label="Website" icon={Globe}>
                  <input type="text" name="website_url" value={formData.website_url} onChange={handleChange} style={inputBase} placeholder="https://" />
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Address" subtitle="Where your business is located">
              <Field label="Street Address" icon={MapPin}>
                <input type="text" name="address_line1" value={formData.address_line1} onChange={handleChange} style={inputBase} placeholder="123 Main Street" />
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="two-col">
                <Field label="City" required>
                  <input type="text" name="city" required value={formData.city} onChange={handleChange} style={inputBase} />
                </Field>
                <Field label="State / Province">
                  <input type="text" name="state_province" value={formData.state_province} onChange={handleChange} style={inputBase} />
                </Field>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="two-col">
                <Field label="Country" required>
                  <select name="country" value={formData.country} onChange={handleChange} style={{ ...inputBase, backgroundColor: 'white', cursor: 'pointer' }}>
                    <option>Afghanistan</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>India</option>
                    <option>United Arab Emirates</option>
                    <option>Pakistan</option>
                  </select>
                </Field>
                <Field label="Zip / Postal Code" required>
                  <input type="text" name="zip_postal_code" required value={formData.zip_postal_code} onChange={handleChange} style={inputBase} />
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Agreements" subtitle="Please review and accept before submitting">
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '12px 14px', borderRadius: 10, border: `1px solid ${BRAND.border}`, backgroundColor: '#f8fafc' }}>
                <input type="checkbox" name="terms_accepted" required checked={formData.terms_accepted} onChange={handleChange} style={{ marginTop: 3, accentColor: BRAND.primary, width: 16, height: 16, cursor: 'pointer' }} />
                <span style={{ fontSize: 14, color: BRAND.text, lineHeight: 1.5 }}>
                  I accept the <a href="/terms-and-conditions" target="_blank" rel="noreferrer" style={{ color: BRAND.primary, fontWeight: 600, textDecoration: 'underline' }}>Terms and Conditions</a> of the vendor program.
                </span>
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '12px 14px', borderRadius: 10, border: `1px solid ${BRAND.border}`, backgroundColor: '#f8fafc' }}>
                <input type="checkbox" name="privacy_accepted" required checked={formData.privacy_accepted} onChange={handleChange} style={{ marginTop: 3, accentColor: BRAND.primary, width: 16, height: 16, cursor: 'pointer' }} />
                <span style={{ fontSize: 14, color: BRAND.text, lineHeight: 1.5 }}>
                  I agree to have my personal data <a href="/privacy-policy" target="_blank" rel="noreferrer" style={{ color: BRAND.primary, fontWeight: 600, textDecoration: 'underline' }}>processed according to the privacy policy</a>.
                </span>
              </label>
            </SectionCard>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between', padding: '4px 4px 20px' }}>
              <p style={{ fontSize: 13, color: BRAND.textMuted, margin: 0 }}>
                Already a vendor? <Link href="/login" style={{ color: BRAND.primary, fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
              </p>
              <button
                type="submit"
                disabled={loading}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '14px 28px', borderRadius: 12, border: 'none',
                  background: loading ? '#94a3b8' : BRAND.gradient,
                  color: 'white', fontSize: 15, fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 8px 20px rgba(19,124,109,0.30)',
                  transition: 'all 0.2s',
                }}
              >
                {loading
                  ? <><Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} /> Submitting...</>
                  : <>Submit Application <ArrowRight style={{ width: 18, height: 18 }} /></>}
              </button>
            </div>
          </form>

          {/* Right: Info Sidebar */}
          <aside className="vendor-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 24 }}>
            <div style={{ background: BRAND.gradient, color: 'white', borderRadius: 16, padding: '28px 24px', boxShadow: '0 12px 30px rgba(19,124,109,0.25)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
              <Store style={{ width: 32, height: 32, marginBottom: 14, position: 'relative' }} />
              <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px 0', position: 'relative' }}>Become a Vendor</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.88)', margin: 0, lineHeight: 1.6, position: 'relative' }}>
                Reach thousands of readers and grow your publishing business with us.
              </p>
            </div>

            <div style={{ backgroundColor: BRAND.surface, borderRadius: 16, border: `1px solid ${BRAND.border}`, padding: '24px', boxShadow: '0 1px 2px rgba(15,23,42,0.04)' }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: BRAND.text, margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: 0.5 }}>What you get</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: ShieldCheck, title: 'Personal admin area', desc: 'Manage your products, orders, and earnings from one dashboard.' },
                  { icon: Store, title: 'Common storefront', desc: 'List your titles alongside top publishers on our marketplace.' },
                  { icon: BadgeDollarSign, title: 'Competitive profit share', desc: 'Keep more of what you earn with transparent payouts.' },
                  { icon: TrendingUp, title: 'Marketing tools', desc: 'Promotions, discounts, and analytics to grow your sales.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <li key={title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, background: BRAND.soft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon style={{ width: 18, height: 18, color: BRAND.primary }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: BRAND.text, margin: '2px 0 2px 0' }}>{title}</p>
                      <p style={{ fontSize: 13, color: BRAND.textMuted, margin: 0, lineHeight: 1.5 }}>{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ backgroundColor: '#fffbeb', borderRadius: 16, border: '1px solid #fde68a', padding: '18px 20px' }}>
              <p style={{ fontSize: 13, color: '#78350f', margin: 0, lineHeight: 1.6 }}>
                <strong>Need help?</strong> Email us at <a href="mailto:vendors@pinebookpublishing.com" style={{ color: '#78350f', fontWeight: 700 }}>vendors@pinebookpublishing.com</a> — we usually reply within 24 hours.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus, select:focus, textarea:focus {
          border-color: ${BRAND.primary} !important;
          background-color: white !important;
          box-shadow: 0 0 0 3px rgba(19,124,109,0.12);
        }
        @media (max-width: 960px) {
          :global(.vendor-grid) {
            grid-template-columns: 1fr !important;
          }
          :global(.vendor-sidebar) {
            position: static !important;
            order: -1;
          }
        }
        @media (max-width: 640px) {
          :global(.two-col) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
