import "@/styles/globals.css";
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
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
    AOS.init({
      // You can also pass settings
      duration: 2000, // values from 0 to 3000, with step 50ms
    });
  }, []);

  return (
    <main className={`${poppins.variable, majallab.variable}`}>
      <Component {...pageProps} />
      <ToastContainer />
    </main>
  );
}