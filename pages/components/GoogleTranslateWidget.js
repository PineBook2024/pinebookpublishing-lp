import { useEffect } from 'react';
import Script from 'next/script';

export default function GoogleTranslateWidget() {
  useEffect(() => {
    // Initialize Google Translate when component mounts
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en', // Your website's default language
            autoDisplay: false,
            includedLanguages: 'en,es,fr,ar,hi,zh-CN,pt,de,ja,ko,ru,tr,it,nl,pl,vi,id,th,sv,no,da,fi,cs,el,he,ro,uk,bn,ta,te,mr,gu,kn,ml,pa',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      }
    };

    // Trigger initialization
    if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  return (
    <>
      {/* Load Google Translate Script */}
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Google Translate loaded successfully');
        }}
      />
      
      {/* Hidden default widget */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
    </>
  );
}