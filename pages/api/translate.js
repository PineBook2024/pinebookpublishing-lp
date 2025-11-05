import { Translate } from '@google-cloud/translate/build/src/v2';

const translate = new Translate({
  key: process.env.GOOGLE_TRANSLATE_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { text, targetLang } = req.body;

  try {
    const [translation] = await translate.translate(text, targetLang);
    res.status(200).json({ translatedText: translation });
  } catch (error) {
    res.status(500).json({ error: 'Translation failed' });
  }
}