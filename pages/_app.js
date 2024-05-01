import "@/styles/globals.css";
import React, { useEffect } from 'react';
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';
import Script from 'next/script';

// Font files can be colocated inside of `pages`
const majallab = localFont({
  src: './majallab-webfont.woff2',
  variable: '--font-majallab',
});
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600'],
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-9X52J8V8NK');
  }, []);


  return (
    <main className={`${poppins.variable, majallab.variable}`}>
      <Component {...pageProps} />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9X52J8V8NK"
        strategy="afterInteractive"
      />
    </main>
  );
}
