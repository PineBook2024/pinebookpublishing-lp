// lib/contentful/client.js
// Dummy client — no Contentful needed

export const client = {
  getEntries: async () => ({ items: [] })
}

export async function getEntries(query) {
  return { items: [] }
}