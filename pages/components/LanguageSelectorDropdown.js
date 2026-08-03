import { useState, useEffect } from 'react';
import Image from 'next/image';

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
    { code: 'zh-CN', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
    { code: 'pt', name: 'Portuguese', flag: '🇧🇷', nativeName: 'Português' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷', nativeName: 'Türkçe' },
    { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
    { code: 'id', name: 'Indonesian', flag: '🇮🇩', nativeName: 'Indonesia' },
    { code: 'th', name: 'Thai', flag: '🇹🇭', nativeName: 'ไทย' },
    { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', nativeName: 'Tiếng Việt' },
    { code: 'nl', name: 'Dutch', flag: '🇳🇱', nativeName: 'Nederlands' },
    { code: 'pl', name: 'Polish', flag: '🇵🇱', nativeName: 'Polski' },
    { code: 'sv', name: 'Swedish', flag: '🇸🇪', nativeName: 'Svenska' },
];

export default function LanguageSelectorDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState('en');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Auto-detect user's browser language
        const detectAndSetLanguage = () => {
            const userLang = navigator.language || navigator.userLanguage;
            const langCode = userLang.split('-')[0];

            // Check if detected language is in our supported list
            const supportedLang = languages.find(
                lang => lang.code.startsWith(langCode) || lang.code === langCode
            );

            if (supportedLang && supportedLang.code !== 'en') {
                setTimeout(() => {
                    translatePage(supportedLang.code);
                }, 1000); // Wait for Google Translate to load
            }
        };

        detectAndSetLanguage();

        // Get current language from cookie
        const checkCurrentLanguage = setInterval(() => {
            const googleLangCookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('googtrans='));

            if (googleLangCookie) {
                const langValue = googleLangCookie.split('=')[1].split('/')[2];
                if (langValue && langValue !== currentLang) {
                    setCurrentLang(langValue);
                }
            }
        }, 1000);

        return () => clearInterval(checkCurrentLanguage);
    }, []);

    const translatePage = (langCode) => {
        setIsLoading(true);

        const selectElement = document.querySelector('.goog-te-combo');
        if (selectElement) {
            selectElement.value = langCode;
            selectElement.dispatchEvent(new Event('change'));
        }

        document.cookie = `googtrans=/en/${langCode}; path=/`;
        document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;

        setTimeout(() => {
            window.location.reload();
        }, 500);

        setCurrentLang(langCode);
        setIsOpen(false);
    };

    const selectedLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

    return (
        <>
            <style jsx>{`
        .language-selector-container {
          position: relative;
          z-index: 1000;
        }

        .language-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: white;
          border: 2px solid #e5e7eb;
          background-color: #1a8273;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .language-button:hover {
          background: #1a8273;
          border-color: #d1d5db;
          box-shadow: 0 4px 6px rgba(0,0,0,0.15);
        }

        .language-button.loading {
          opacity: 0.6;
          pointer-events: none;
        }

        .flag-icon {
          font-size: 24px;
          line-height: 1;
        }

        .language-name {
          font-weight: 500;
          color: #fff;
          font-size: 14px;
        }

        .dropdown-icon {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }

        .dropdown-icon.open {
          transform: rotate(180deg);
        }

        .dropdown-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          min-width: 280px;
          max-height: 400px;
          overflow-y: auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          z-index: 1000;
          animation: slideDown 0.2s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-menu::-webkit-scrollbar {
          width: 8px;
        }

        .dropdown-menu::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .dropdown-menu::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }

        .dropdown-menu::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .language-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }

        .language-option:hover {
          background: #f3f4f6;
        }

        .language-option.active {
          background: #e5e7eb;
        }

        .language-option .flag-icon {
          font-size: 28px;
        }

        .language-info {
          flex: 1;
        }

        .language-info .name {
          font-weight: 500;
          color: #111827;
          font-size: 14px;
        }

        .language-info .native {
          font-size: 12px;
          color: #6b7280;
        }

        .check-icon {
          color: #10b981;
          font-size: 20px;
          font-weight: bold;
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid #f3f4f6;
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .language-selector-container {
            width: 100%;
          }

          .dropdown-menu {
            min-width: 250px;
            max-height: 350px;
          }
          
          .language-button {
            width: 100%;
            justify-content: center;
            padding: 6px 12px;
          }
          
          .language-name {
            font-size: 13px;
          }
        }
      `}</style>

            <div className="language-selector-container">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`language-button  ${isLoading ? 'loading' : ''}`}
                    aria-label="Select Language"
                >
                    <span className="flag-icon">{selectedLanguage.flag}</span>
                    <span className="language-name">{selectedLanguage.nativeName}</span>
                    {isLoading ? (
                        <div className="loading-spinner"></div>
                    ) : (
                        <svg
                            className={`dropdown-icon ${isOpen ? 'open' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    )}
                </button>

                {isOpen && (
                    <>
                        <div className="dropdown-overlay" onClick={() => setIsOpen(false)}></div>
                        <div className="dropdown-menu">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => translatePage(lang.code)}
                                    className={`language-option ${lang.code === currentLang ? 'active' : ''}`}
                                >
                                    <span className="flag-icon">{lang.flag}</span>
                                    <div className="language-info">
                                        <div className="name">{lang.name}</div>
                                        <div className="native">{lang.nativeName}</div>
                                    </div>
                                    {lang.code === currentLang && (
                                        <span className="check-icon">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
