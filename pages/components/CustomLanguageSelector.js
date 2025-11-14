import { useState, useEffect } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
];

export default function CustomLanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // Auto-detect user's language
    const userLang = navigator.language || navigator.userLanguage;
    const langCode = userLang.split('-')[0];
    
    const supportedLang = languages.find(lang => lang.code.startsWith(langCode));
    if (supportedLang) {
      setCurrentLang(supportedLang.code);
      translatePage(supportedLang.code);
    }
  }, []);

  const translatePage = (langCode) => {
    const googleTranslateCombo = document.querySelector('.goog-te-combo');
    if (googleTranslateCombo) {
      googleTranslateCombo.value = langCode;
      googleTranslateCombo.dispatchEvent(new Event('change'));
      setCurrentLang(langCode);
      setIsOpen(false);
    }
  };

  const selectedLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  return (
    <div className="relative inline-block text-left z-50">
      <style jsx>{`
        .language-dropdown {
          min-width: 200px;
        }
        .language-item:hover {
          background-color: #f3f4f6;
        }
        .language-item.active {
          background-color: #e5e7eb;
          font-weight: 600;
        }
      `}</style>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200"
      >
        <span className="text-2xl">{selectedLanguage.flag}</span>
        <span className="font-medium text-gray-700">{selectedLanguage.name}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="language-dropdown absolute right-0 mt-2 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto border border-gray-200">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => translatePage(lang.code)}
                className={`language-item w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  lang.code === currentLang ? 'active' : ''
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-gray-700">{lang.name}</span>
                {lang.code === currentLang && (
                  <span className="ml-auto text-green-500 text-xl">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}