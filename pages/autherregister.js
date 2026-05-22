import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  User, Building2, Mail, Phone, Globe, FileText, Image as ImageIcon,
  Sparkles, CheckCircle2, AlertCircle, ArrowRight, Loader2,
  Award, BookOpen, TrendingUp, ShieldCheck,
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

export default function AuthorRegister() {
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

  const initialState = {
    display_name: '',
    company_name: '',
    author_bio: '',
    email: '',
    phone: '',
    website_url: '',
    branding_logo_url: '',
    branding_banner_url: '',
    profile_image_url: '',
    tax_number: '',
    approval_status: 'inactive',
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      await axios.post(`${API_BASE_URL}/authors`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setMessage({ type: 'success', text: 'Author profile created successfully!' });
      setFormData(initialState);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
      });
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
            <span style={{ color: 'white' }}>Create Author Profile</span>
          </nav>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.25)', marginBottom: 18 }}>
            <Sparkles style={{ width: 14, height: 14, color: BRAND.accent }} />
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Author Profile</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, margin: 0, lineHeight: 1.15, maxWidth: 720 }}>
            Create your author profile
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', margin: '14px 0 0 0', maxWidth: 620, lineHeight: 1.6 }}>
            Build your presence on Pine Book Publishing. Share your story, showcase your brand, and connect with readers.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1180, margin: '-48px auto 0', padding: '0 20px 64px', position: 'relative', zIndex: 3 }}>
        <div className="author-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28, alignItems: 'flex-start' }}>

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

            <SectionCard title="Profile" subtitle="How you'll appear to readers">
              <Field label="Display Name" required icon={User} hint="The name shown on your author page">
                <input type="text" name="display_name" required value={formData.display_name} onChange={handleChange} style={inputBase} placeholder="Jane Doe" />
              </Field>
              <Field label="Company Name" icon={Building2}>
                <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} style={inputBase} placeholder="Optional publisher or imprint" />
              </Field>
              <Field label="Author Bio" icon={FileText} hint="A short introduction shown on your profile">
                <textarea name="author_bio" rows="4" value={formData.author_bio} onChange={handleChange} style={{ ...inputBase, resize: 'vertical', minHeight: 110 }} placeholder="Tell readers about yourself, your writing journey, and what makes your work unique..." />
              </Field>
            </SectionCard>

            <SectionCard title="Contact" subtitle="How readers and the team can reach you">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="two-col">
                <Field label="Email" required icon={Mail}>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} style={inputBase} placeholder="you@example.com" />
                </Field>
                <Field label="Phone" icon={Phone}>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={inputBase} placeholder="+1 (555) 000-0000" />
                </Field>
              </div>
              <Field label="Website" icon={Globe}>
                <input type="text" name="website_url" value={formData.website_url} onChange={handleChange} style={inputBase} placeholder="https://yourwebsite.com" />
              </Field>
            </SectionCard>

            <SectionCard title="Branding & Media" subtitle="Visual identity for your author page">
              <Field label="Profile Image URL" icon={ImageIcon} hint="A square headshot or avatar (recommended 400x400px)">
                <input type="text" name="profile_image_url" value={formData.profile_image_url} onChange={handleChange} style={inputBase} placeholder="https://..." />
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="two-col">
                <Field label="Brand Logo URL" icon={ImageIcon}>
                  <input type="text" name="branding_logo_url" value={formData.branding_logo_url} onChange={handleChange} style={inputBase} placeholder="https://..." />
                </Field>
                <Field label="Brand Banner URL" icon={ImageIcon} hint="Wide banner for header">
                  <input type="text" name="branding_banner_url" value={formData.branding_banner_url} onChange={handleChange} style={inputBase} placeholder="https://..." />
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Tax Information" subtitle="For payouts and legal compliance (optional)">
              <Field label="Tax Number" icon={FileText}>
                <input type="text" name="tax_number" value={formData.tax_number} onChange={handleChange} style={inputBase} placeholder="VAT, TIN, or local tax ID" />
              </Field>
            </SectionCard>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between', padding: '4px 4px 20px' }}>
              <p style={{ fontSize: 13, color: BRAND.textMuted, margin: 0 }}>
                Need a vendor account instead? <Link href="/vendorregister" style={{ color: BRAND.primary, fontWeight: 600, textDecoration: 'none' }}>Apply here</Link>
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
                  ? <><Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} /> Creating...</>
                  : <>Create Author <ArrowRight style={{ width: 18, height: 18 }} /></>}
              </button>
            </div>
          </form>

          {/* Right: Sidebar */}
          <aside className="author-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 24 }}>
            <div style={{ background: BRAND.gradient, color: 'white', borderRadius: 16, padding: '28px 24px', boxShadow: '0 12px 30px rgba(19,124,109,0.25)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
              <BookOpen style={{ width: 32, height: 32, marginBottom: 14, position: 'relative' }} />
              <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px 0', position: 'relative' }}>Authors Welcome</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.88)', margin: 0, lineHeight: 1.6, position: 'relative' }}>
                Build a professional presence and reach readers who love what you write.
              </p>
            </div>

            <div style={{ backgroundColor: BRAND.surface, borderRadius: 16, border: `1px solid ${BRAND.border}`, padding: '24px', boxShadow: '0 1px 2px rgba(15,23,42,0.04)' }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: BRAND.text, margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: 0.5 }}>Profile Tips</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: User, title: 'Use a professional display name', desc: 'The name you want readers to recognize you by.' },
                  { icon: ImageIcon, title: 'Add branding for trust', desc: 'Profile image and logo make your page feel established.' },
                  { icon: Award, title: 'Approved authors get a boost', desc: 'Approved profiles appear in featured listings and search.' },
                  { icon: TrendingUp, title: 'A complete profile ranks higher', desc: 'Bio, website, and branding all improve discoverability.' },
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
                <ShieldCheck style={{ width: 14, height: 14, display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />
                <strong>Privacy:</strong> Your email and phone stay private. Only your display name, bio, and branding appear publicly.
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
          :global(.author-grid) {
            grid-template-columns: 1fr !important;
          }
          :global(.author-sidebar) {
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
