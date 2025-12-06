import { useState, useEffect } from 'react';

export default function useAutoTranslate() {
  const [targetLang, setTargetLang] = useState('en');

  useEffect(() => {
    // Detect user's language
    const userLang = navigator.language.split('-')[0];
    setTargetLang(userLang);
  }, []);

  const translateText = async (text) => {
    if (targetLang === 'en') return text;

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang }),
      });
      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      return text; // Fallback to original text
    }
  };

  return { translateText, targetLang, setTargetLang };
}