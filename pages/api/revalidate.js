import crypto from 'crypto';

export default async function handler(req, res) {
  // Verify that the request came from Contentful using the signing secret
  const contentfulSignature = req.headers['x-contentful-signature'];
  const expectedSignature = crypto
    .createHmac('sha256', process.env.CONTENTFUL_SIGNING_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (contentfulSignature !== expectedSignature) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Check if the secret token matches the API_ROUTE_SECRET environment variable
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
