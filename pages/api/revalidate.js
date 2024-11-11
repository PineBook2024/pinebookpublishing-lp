import crypto from 'crypto';

export default async function handler(req, res) {
  // Ensure the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const contentfulSignature = req.headers['x-contentful-signature'];
  const expectedSignature = crypto
    .createHmac('sha256', process.env.CONTENTFUL_SIGNING_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex');

  // Verify the Contentful signature
  if (contentfulSignature !== expectedSignature) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify the secret token
  if (req.query.secret !== process.env.API_ROUTE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // Revalidate the blog posts page
    await res.revalidate('/posts');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
