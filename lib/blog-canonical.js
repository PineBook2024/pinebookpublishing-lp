const SITE_URL = 'https://pinebookpublishing.com'

export function getBlogCanonicalUrl(fields = {}) {
  const fallback = `${SITE_URL}/blog/${String(fields.slug || '').trim().replace(/^\/+|\/+$/g, '')}`

  // Contentful field IDs are case-sensitive and can differ between blog models.
  for (const value of [fields.canonicalUrl, fields.canonicalURL, fields.canonical]) {
    if (typeof value !== 'string' || !value.trim()) continue

    try {
      const url = new URL(value.trim(), SITE_URL)
      if (!['https:', 'http:'].includes(url.protocol)) continue
      url.hash = ''
      return url.href
    } catch {
      // Keep a self-referencing canonical when a CMS value is invalid.
    }
  }

  return fallback
}
