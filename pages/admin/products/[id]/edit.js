import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage';

const resolveImageUrl = (raw) => {
  if (!raw || typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  // Rewrite backend localhost host (matches shop.js behavior)
  const rewritten = trimmed
    .replace('http://localhost:8000', 'https://pinebookbackend.pinedigitalhub.com')
    .replace('https://localhost:8000', 'https://pinebookbackend.pinedigitalhub.com');
  if (/^(https?:|data:|blob:)/i.test(rewritten)) return rewritten;
  if (rewritten.startsWith('/')) return rewritten;
  return `${STORAGE_URL.replace(/\/$/, '')}/${rewritten.replace(/^\/+/, '')}`;
};

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Existing images from DB
  const [existingImages, setExistingImages] = useState([]);
  const [deletedImageIds, setDeletedImageIds] = useState([]);
  const [existingCoverUrl, setExistingCoverUrl] = useState(null);
  
  // New images to upload
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  
  // Single files
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [ebookFile, setEbookFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [samplePdf, setSamplePdf] = useState(null);

  const [form, setForm] = useState({
    author_id: '',
    category_id: '',
    title: '',
    slug: '',
    subtitle: '',
    short_description: '',
    full_description: '',
    author_name: '',
    isbn: '',
    language: '',
    publication_date: '',
    pages_count: '',
    format: 'ebook',
    price: '',
    discount_price: '',
    stock_quantity: '',
    sku: '',
    status: 'draft',
    admin_notes: '',
    is_featured: false,
    is_bestseller: false,
    average_rating: '',
    total_reviews: '',
    total_sales_count: '',
    published_at: ''
  });

  // Fetch authors and categories
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setFetchError('No auth token. Please login.');
      return;
    }

    fetch(`${API_URL}/authors`, {
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
    })
      .then(async r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = await r.json();
        setAuthors(Array.isArray(json) ? json : (json.data || []));
      })
      .catch(err => {
        console.error('Authors error:', err);
        setFetchError(err.message);
      });

    fetch(`${API_URL}/categories`, {
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
    })
      .then(async r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = await r.json();
        setCategories(Array.isArray(json) ? json : (json.data || []));
      })
      .catch(err => console.error('Categories error:', err));
  }, []);

  // Fetch product data
  useEffect(() => {
    if (!id) return;
    
    const token = localStorage.getItem('token');
    
    fetch(`${API_URL}/products/${id}`, {
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
    })
      .then(async r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = await r.json();
        const p = json.data || json;
        
        setForm({
          author_id: p.author_id?.toString() || '',
          category_id: p.category_id?.toString() || '',
          title: p.title || '',
          slug: p.slug || '',
          subtitle: p.subtitle || '',
          short_description: p.short_description || '',
          full_description: p.full_description || '',
          author_name: p.author_name || '',
          isbn: p.isbn || '',
          language: p.language || '',
          publication_date: p.publication_date || '',
          pages_count: p.pages_count?.toString() || '',
          format: p.format || 'ebook',
          price: p.price?.toString() || '',
          discount_price: p.discount_price?.toString() || '',
          stock_quantity: p.stock_quantity?.toString() || '',
          sku: p.sku || '',
          status: p.status || 'draft',
          admin_notes: p.admin_notes || '',
          is_featured: !!p.is_featured,
          is_bestseller: !!p.is_bestseller,
          average_rating: p.average_rating?.toString() || '',
          total_reviews: p.total_reviews?.toString() || '',
          total_sales_count: p.total_sales_count?.toString() || '',
          published_at: p.published_at ? p.published_at.slice(0, 16) : ''
        });
        
        setExistingImages(p.images || []);
        setExistingCoverUrl(
          resolveImageUrl(p.cover_image_url || p.cover_image || p.cover_url)
        );
        setLoading(false);
      })
      .catch(err => {
        console.error('Product fetch error:', err);
        alert('Failed to load product');
        router.push('/admin/products');
      });
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  // Handle new gallery images
  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    setNewImages(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setNewImagePreviews(prev => [...prev, ev.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeExistingImage = (imageId) => {
    setDeletedImageIds(prev => [...prev, imageId]);
    setExistingImages(prev => prev.filter(img => img.image_id !== imageId));
  };

  const removeNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Handle single files
  const handleFileChange = (setter, previewSetter) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setter(file);
    if (previewSetter) {
      const reader = new FileReader();
      reader.onload = (ev) => previewSetter(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const clearFile = (setter, previewSetter) => () => {
    setter(null);
    if (previewSetter) previewSetter(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    const formData = new FormData();
    formData.append('_method', 'PUT');

    // Append all text fields
    Object.keys(form).forEach(key => {
      if (form[key] !== '' && form[key] !== null && form[key] !== undefined) {
        formData.append(key, form[key]);
      }
    });

    // Booleans
    formData.append('is_featured', form.is_featured ? '1' : '0');
    formData.append('is_bestseller', form.is_bestseller ? '1' : '0');

    // Deleted image IDs
    formData.append('deleted_image_ids', JSON.stringify(deletedImageIds));

    // New gallery images
    newImages.forEach((file) => {
      formData.append('images[]', file);
    });

    // Single files
    if (coverImage) formData.append('cover_image', coverImage);
    if (ebookFile) formData.append('ebook_file', ebookFile);
    if (previewFile) formData.append('preview_file', previewFile);
    if (samplePdf) formData.append('sample_pdf', samplePdf);

    // Debug
    for (let [key, value] of formData.entries()) {
      console.log(key, value instanceof File ? value.name : value);
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          alert(data.message || 'Failed to update');
        }
        setSaving(false);
        return;
      }

      router.push('/admin/products');
    } catch (err) {
      alert('Network error: ' + err.message);
      setSaving(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '10px 14px',
    borderRadius: 8,
    border: `1px solid ${errors[field] ? '#ef4444' : '#e2e8f0'}`,
    fontSize: 14,
    outline: 'none',
    background: '#fff',
    fontFamily: 'inherit'
  });

  const labelStyle = { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#374151' };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#64748b' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '20px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Link href="/admin/products" style={{ color: '#64748b', fontSize: 14, textDecoration: 'none' }}>
            ← Back to Products
          </Link>
          <h1 style={{ margin: '8px 0 0', fontSize: 22, fontWeight: 700, color: '#1e293b' }}>Edit Product #{id}</h1>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: 32 }}>
        <form onSubmit={handleSubmit}>
          
          {/* Basic Info */}
          <div style={sectionStyle}>
            <h3 style={sectionTitle}>Basic Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Title <span style={{ color: '#ef4444' }}>*</span></label>
                <input name="title" value={form.title} onChange={handleChange} style={inputStyle('title')} />
                {errors.title && <span style={errorStyle}>{errors.title[0]}</span>}
              </div>
              <div>
                <label style={labelStyle}>Slug</label>
                <input name="slug" value={form.slug} onChange={handleChange} style={inputStyle('slug')} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Subtitle</label>
                <input name="subtitle" value={form.subtitle} onChange={handleChange} style={inputStyle('subtitle')} />
              </div>
            </div>
          </div>

          {/* Foreign Keys */}
          <div style={sectionStyle}>
            <h3 style={sectionTitle}>Relationships</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Author <span style={{ color: '#ef4444' }}>*</span></label>
                <select name="author_id" value={form.author_id} onChange={handleChange} style={inputStyle('author_id')} disabled={authors.length === 0}>
                  <option value="">{fetchError ? `Error: ${fetchError}` : authors.length === 0 ? 'Loading...' : 'Select author'}</option>
                  {authors.map(a => (
                    <option key={a.author_id} value={a.author_id}>
                      {a.display_name || a.name || 'Unnamed'} {a.email ? `(${a.email})` : ''}
                    </option>
                  ))}
                </select>
                {errors.author_id && <span style={errorStyle}>{errors.author_id[0]}</span>}
              </div>
              <div>
                <label style={labelStyle}>Category <span style={{ color: '#ef4444' }}>*</span></label>
                <select name="category_id" value={form.category_id} onChange={handleChange} style={inputStyle('category_id')} disabled={categories.length === 0}>
                  <option value="">{categories.length === 0 ? 'Loading...' : 'Select category'}</option>
                  {categories.map(c => (
                    <option key={c.category_id} value={c.category_id}>{c.name}</option>
                  ))}
                </select>
                {errors.category_id && <span style={errorStyle}>{errors.category_id[0]}</span>}
              </div>
              <div>
                <label style={labelStyle}>Author Name (Override)</label>
                <input name="author_name" value={form.author_name} onChange={handleChange} style={inputStyle('author_name')} />
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div style={sectionStyle}>
            <h3 style={sectionTitle}>Descriptions</h3>
            <div style={{ display: 'grid', gap: 16 }}>
              <div>
                <label style={labelStyle}>Short Description</label>
                <textarea name="short_description" value={form.short_description} onChange={handleChange} rows={3} style={{ ...inputStyle('short_description'), resize: 'vertical' }} />
              </div>
              <div>
                <label style={labelStyle}>Full Description</label>
                <textarea name="full_description" value={form.full_description} onChange={handleChange} rows={6} style={{ ...inputStyle('full_description'), resize: 'vertical' }} />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div style={sectionStyle}>
            <h3 style={sectionTitle}>Product Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <div>
                <label style={labelStyle}>ISBN</label>
                <input name="isbn" value={form.isbn} onChange={handleChange} style={inputStyle('isbn')} />
              </div>
              <div>
                <label style={labelStyle}>Language</label>
                <input name="language" value={form.language} onChange={handleChange} style={inputStyle('language')} />
              </div>
              <div>
                <label style={labelStyle}>Publication Date</label>
                <input type="date" name="publication_date" value={form.publication_date} onChange={handleChange} style={inputStyle('publication_date')} />
              </div>
              <div>
                <label style={labelStyle}>Pages</label>
                <input type="number" name="pages_count" value={form.pages_count} onChange={handleChange} style={inputStyle('pages_count')} />
              </div>
              <div>
                <label style={labelStyle}>Format <span style={{ color: '#ef4444' }}>*</span></label>
                <select name="format" value={form.format} onChange={handleChange} style={inputStyle('format')}>
                  <option value="ebook">Ebook</option>
                  <option value="paperback">Paperback</option>
                  <option value="hardcover">Hardcover</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>SKU</label>
                <input name="sku" value={form.sku} onChange={handleChange} style={inputStyle('sku')} />
                {errors.sku && <span style={errorStyle}>{errors.sku[0]}</span>}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div style={sectionStyle}>
            <h3 style={sectionTitle}>Pricing & Stock</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Price ($) <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="number" step="0.01" min="0" name="price" value={form.price} onChange={handleChange} style={inputStyle('price')} />
                {errors.price && <span style={errorStyle}>{errors.price[0]}</span>}
              </div>
              <div>
                <label style={labelStyle}>Discount Price ($)</label>
                <input type="number" step="0.01" min="0" name="discount_price" value={form.discount_price} onChange={handleChange} style={inputStyle('discount_price')} />
              </div>
              <div>
                <label style={labelStyle}>Stock Quantity</label>
                <input type="number" min="0" name="stock_quantity" value={form.stock_quantity} onChange={handleChange} style={inputStyle('stock_quantity')} />
              </div>
            </div>
          </div>

          {/* ===== PRODUCT GALLERY IMAGES ===== */}
          <div style={sectionStyle}>
            <h3 style={sectionTitle}>Product Gallery Images</h3>
            <p style={{ margin: '0 0 12px', fontSize: 12, color: '#64748b' }}>
              Stored in <code>product_images</code> table.
            </p>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <p style={{ ...labelStyle, marginBottom: 10 }}>Current Images</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 12 }}>
                  {existingImages.map(img => (
                    <div key={img.image_id} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                      <img src={resolveImageUrl(img.image_url)} alt={img.alt_text || 'Product'} style={{ width: '100%', height: 100, objectFit: 'cover' }} />
                      <button type="button" onClick={() => removeExistingImage(img.image_id)} style={{
                        position: 'absolute', top: 4, right: 4, background: '#ef4444', color: '#fff',
                        border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer',
                        fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>×</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Images */}
            <div style={{ marginBottom: 16 }}>
              <input type="file" multiple accept="image/*" onChange={handleNewImages} style={{ display: 'none' }} id="new-gallery-images" />
              <label htmlFor="new-gallery-images" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', background: '#eff6ff', color: '#2563eb',
                borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500,
                border: '2px dashed #bfdbfe'
              }}>
                <span>+</span> Add More Images
              </label>
              <span style={{ marginLeft: 12, color: '#94a3b8', fontSize: 13 }}>
                {newImages.length > 0 ? `${newImages.length} new selected` : 'Hold Ctrl/Cmd to select multiple'}
              </span>
            </div>

            {/* New Image Previews */}
            {newImagePreviews.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 12 }}>
                {newImagePreviews.map((preview, idx) => (
                  <div key={idx} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <img src={preview} alt={`New ${idx}`} style={{ width: '100%', height: 100, objectFit: 'cover' }} />
                    <button type="button" onClick={() => removeNewImage(idx)} style={{
                      position: 'absolute', top: 4, right: 4, background: '#ef4444', color: '#fff',
                      border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer',
                      fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>×</button>
                    <span style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: 'rgba(37,99,235,0.8)', color: '#fff', fontSize: 10,
                      padding: '2px 6px', textAlign: 'center'
                    }}>NEW</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ===== PRODUCT FILES ===== */}
          <div style={sectionStyle}>
            <h3 style={sectionTitle}>Product Files</h3>
            <p style={{ margin: '0 0 12px', fontSize: 12, color: '#64748b' }}>
              Replace existing files by uploading new ones.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Cover Image */}
              <div>
                <label style={labelStyle}>Cover Image</label>
                <input type="file" accept="image/*" onChange={handleFileChange(setCoverImage, setCoverPreview)} style={{ display: 'none' }} id="edit-cover-image" />
                <label htmlFor="edit-cover-image" style={{
                  display: 'block', padding: '20px', border: '2px dashed #e2e8f0',
                  borderRadius: 8, textAlign: 'center', cursor: 'pointer', color: '#64748b'
                }}>
                  {coverPreview ? (
                    <img src={coverPreview} alt="New cover" style={{ maxWidth: '100%', maxHeight: 120, borderRadius: 4 }} />
                  ) : existingCoverUrl ? (
                    <div>
                      <img src={existingCoverUrl} alt="Current cover" style={{ maxWidth: '100%', maxHeight: 120, borderRadius: 4 }} />
                      <p style={{ margin: '8px 0 0', fontSize: 11, color: '#94a3b8' }}>Current cover — click to replace</p>
                    </div>
                  ) : (
                    <span>+ Click to upload cover</span>
                  )}
                </label>
                {coverImage && (
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, color: '#374151' }}>{coverImage.name}</span>
                    <button type="button" onClick={clearFile(setCoverImage, setCoverPreview)} style={{
                      background: '#fee2e2', color: '#dc2626', border: 'none',
                      borderRadius: 4, padding: '2px 8px', fontSize: 11, cursor: 'pointer'
                    }}>Remove</button>
                  </div>
                )}
              </div>

              {/* Ebook File */}
              <div>
                <label style={labelStyle}>Ebook File (PDF/EPUB/MOBI)</label>
                <input type="file" accept=".pdf,.epub,.mobi" onChange={handleFileChange(setEbookFile, null)} style={{ display: 'none' }} id="edit-ebook-file" />
                <label htmlFor="edit-ebook-file" style={{
                  display: 'block', padding: '20px', border: '2px dashed #e2e8f0',
                  borderRadius: 8, textAlign: 'center', cursor: 'pointer', color: '#64748b'
                }}>
                  {ebookFile ? (
                    <div>
                      <span style={{ fontSize: 24 }}>📄</span>
                      <p style={{ margin: '4px 0 0', fontSize: 12 }}>{ebookFile.name}</p>
                    </div>
                  ) : (
                    <span>+ Change ebook file</span>
                  )}
                </label>
                {ebookFile && (
                  <button type="button" onClick={clearFile(setEbookFile, null)} style={{
                    marginTop: 8, background: '#fee2e2', color: '#dc2626', border: 'none',
                    borderRadius: 4, padding: '2px 8px', fontSize: 11, cursor: 'pointer'
                  }}>Remove</button>
                )}
              </div>

              {/* Preview File */}
              <div>
                <label style={labelStyle}>Preview File</label>
                <input type="file" accept="image/*,.pdf" onChange={handleFileChange(setPreviewFile, null)} style={{ display: 'none' }} id="edit-preview-file" />
                <label htmlFor="edit-preview-file" style={{
                  display: 'block', padding: '20px', border: '2px dashed #e2e8f0',
                  borderRadius: 8, textAlign: 'center', cursor: 'pointer', color: '#64748b'
                }}>
                  {previewFile ? (
                    <p style={{ margin: 0, fontSize: 12 }}>{previewFile.name}</p>
                  ) : (
                    <span>+ Change preview file</span>
                  )}
                </label>
                {previewFile && (
                  <button type="button" onClick={clearFile(setPreviewFile, null)} style={{
                    marginTop: 8, background: '#fee2e2', color: '#dc2626', border: 'none',
                    borderRadius: 4, padding: '2px 8px', fontSize: 11, cursor: 'pointer'
                  }}>Remove</button>
                )}
              </div>

              {/* Sample PDF */}
              <div>
                <label style={labelStyle}>Sample PDF</label>
                <input type="file" accept=".pdf" onChange={handleFileChange(setSamplePdf, null)} style={{ display: 'none' }} id="edit-sample-pdf" />
                <label htmlFor="edit-sample-pdf" style={{
                  display: 'block', padding: '20px', border: '2px dashed #e2e8f0',
                  borderRadius: 8, textAlign: 'center', cursor: 'pointer', color: '#64748b'
                }}>
                  {samplePdf ? (
                    <p style={{ margin: 0, fontSize: 12 }}>{samplePdf.name}</p>
                  ) : (
                    <span>+ Change sample PDF</span>
                  )}
                </label>
                {samplePdf && (
                  <button type="button" onClick={clearFile(setSamplePdf, null)} style={{
                    marginTop: 8, background: '#fee2e2', color: '#dc2626', border: 'none',
                    borderRadius: 4, padding: '2px 8px', fontSize: 11, cursor: 'pointer'
                  }}>Remove</button>
                )}
              </div>
            </div>
          </div>

          {/* Status & Settings */}
          <div style={sectionStyle}>
            <h3 style={sectionTitle}>Status & Settings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Status</label>
                <select name="status" value={form.status} onChange={handleChange} style={inputStyle('status')}>
                  <option value="draft">Draft</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="live">Live</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Published At</label>
                <input type="datetime-local" name="published_at" value={form.published_at} onChange={handleChange} style={inputStyle('published_at')} />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, paddingBottom: 8 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, color: '#374151' }}>
                  <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} style={{ width: 18, height: 18 }} />
                  Featured
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, color: '#374151' }}>
                  <input type="checkbox" name="is_bestseller" checked={form.is_bestseller} onChange={handleChange} style={{ width: 18, height: 18 }} />
                  Bestseller
                </label>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={sectionStyle}>
            <h3 style={sectionTitle}>Statistics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Average Rating</label>
                <input type="number" step="0.01" min="0" max="5" name="average_rating" value={form.average_rating} onChange={handleChange} style={inputStyle('average_rating')} />
              </div>
              <div>
                <label style={labelStyle}>Total Reviews</label>
                <input type="number" min="0" name="total_reviews" value={form.total_reviews} onChange={handleChange} style={inputStyle('total_reviews')} />
              </div>
              <div>
                <label style={labelStyle}>Total Sales</label>
                <input type="number" min="0" name="total_sales_count" value={form.total_sales_count} onChange={handleChange} style={inputStyle('total_sales_count')} />
              </div>
            </div>
          </div>

          {/* Admin Notes */}
          <div style={sectionStyle}>
            <h3 style={sectionTitle}>Admin Notes</h3>
            <textarea name="admin_notes" value={form.admin_notes} onChange={handleChange} rows={4} style={{ ...inputStyle('admin_notes'), resize: 'vertical' }} />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 8 }}>
            <Link href="/admin/products">
              <button type="button" style={{
                padding: '12px 24px', borderRadius: 8, border: '1px solid #e2e8f0',
                background: '#fff', color: '#475569', fontSize: 14, cursor: 'pointer', fontWeight: 500
              }}>Cancel</button>
            </Link>
            <button type="submit" disabled={saving} style={{
              padding: '12px 28px', borderRadius: 8, border: 'none',
              background: saving ? '#93c5fd' : '#2563eb', color: '#fff',
              fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600
            }}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const sectionStyle = { background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 24, marginBottom: 20 };
const sectionTitle = { margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#1e293b' };
const errorStyle = { color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' };