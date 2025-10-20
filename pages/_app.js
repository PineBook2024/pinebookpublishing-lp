import "@/styles/globals.css";
import React, { useEffect, useState } from 'react';
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Head from "next/head";
import HomePopupNew from "./components/HomePopupNew";
// import Loader from "./components/Loader";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600'],
});


export default function App({ Component, pageProps }) {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Wait for page to fully load (simulate for now with setTimeout)
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000); // ⏱ You can adjust delay here (in ms)

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-9X52J8V8NK');
  }, []);

  useEffect(() => {
    AOS.init({
      offset: 0,
      delay: 0,
      duration: 400,
      easing: 'ease',
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
  }, []);


  return (
    <>
      <Head>
        <meta name="facebook-domain-verification" content="ddnvgvw5pn3121zvii7izv2bijv916" />
        <meta property="og:title" content="Premier Book Publishing Company | Pine Book Publishing" />
        <meta property="og:description" content="A Premier Book Publishing Company dedicated to turn your writing dreams into reality. From manuscript to marketplace, We Make It Happen for YOU!" />
        <meta property="og:image" content="https://pinebookpublishing.com/_next/image?url=%2Fbrand-img%2Flogo.webp&w=256&q=75" />
        <meta property="og:url" content="https://pinebookpublishing.com/" />
        <link rel="shortcut icon" href="/images/fav.png" />
        <meta name="twitter:title" content="Premier Book Publishing Company | Pine Book Publishing" />
        <meta name="twitter:description" content="A Premier Book Publishing Company dedicated to turn your writing dreams into reality. From manuscript to marketplace, We Make It Happen for YOU!" />
        <meta name="twitter:site" content="@pinebookwriting" />
        <meta name="twitter:url" content="https://pinebookpublishing.com/" />
        <meta name="twitter:image" content="https://pinebookpublishing.com/_next/image?url=%2Fbrand-img%2Flogo.webp&w=256&q=75" />
        <meta name="p:domain_verify" content="327df5313414f4447f99182ec46c1485" />
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Pine Book Publishing",
              "url": "https://pinebookpublishing.com/",
              "logo": "https://pinebookpublishing.com/_next/image?url=%2Fbrand-img%2Flogo.webp&w=256&q=75",
              "alternateName": "Pine Book Publishing",
              "sameAs": [
                "https://www.facebook.com/pinebookwriting0",
                "https://www.instagram.com/pinebookwriting/",
                "https://twitter.com/pinebookwriting",
                "https://www.youtube.com/@Pinebookwriting"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "R-10225, Yonge St, Suite #250",
                "addressLocality": "Richmond Hill",
                "addressRegion": "ON",
                "postalCode": "L4C 3B2",
                "addressCountry": "CA"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+1 (866) 841 7463",
                  "contactType": "customer service",
                  "email": "support@pinebookpublishing.com",
                  "contactOption": "TollFree",
                  "availableLanguage": "en"
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+1 (289) 809-7465",
                  "contactType": "sales",
                  "email": "damon@pinebookpublishing.com",
                  "contactOption": "TollFree",
                  "availableLanguage": "en"
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+1 (289) 809-6209",
                  "contactType": "sales",
                  "email": "steve@pinebookpublishing.com",
                  "contactOption": "TollFree",
                  "availableLanguage": "en"
                }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "About Pine Book Publishing",
                  "item": "https://pinebookpublishing.com/about"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Publishing Services",
                  "item": "https://pinebookpublishing.com/services"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Success Stories",
                  "item": "https://pinebookpublishing.com/testimonials"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Book Publishing Packages",
                  "item": "https://pinebookpublishing.com/packages"
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "name": "Shelf-Worthy Portfolio",
                  "item": "https://pinebookpublishing.com/portfolio"
                },
                {
                  "@type": "ListItem",
                  "position": 6,
                  "name": "Get in Touch",
                  "item": "https://pinebookpublishing.com/contact-us"
                }
              ]
            }),
          }}
        /> */}
      </Head>
      <main className={`${poppins.variable}`}>
        
        <Component {...pageProps} />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-16471224604"></Script>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-16471224604'); 
              `,
          }}
        />
        {/* <Script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=6ad75b0f-d085-4cae-9a7a-48abeb69b973"> </Script> */}
        <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=6ad75b0f-d085-4cae-9a7a-48abeb69b973"> </script>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
            !function () {var reb2b = window.reb2b = window.reb2b || [];if (reb2b.invoked) return;reb2b.invoked = true;reb2b.methods = ["identify", "collect"];reb2b.factory = function (method) {return function () {var args = Array.prototype.slice.call(arguments);args.unshift(method);reb2b.push(args);return reb2b;};};for (var i = 0; i < reb2b.methods.length; i++) {var key = reb2b.methods[i];reb2b[key] = reb2b.factory(key);}reb2b.load = function (key) {var script = document.createElement("script");script.type = "text/javascript";script.async = true;script.src = "https://s3-us-west-2.amazonaws.com/b2bjsstore/b/" + key + "/961Y0H4Z2KNG.js.gz";var first = document.getElementsByTagName("script")[0];first.parentNode.insertBefore(script, first);};reb2b.SNIPPET_VERSION = "1.0.1";reb2b.load("961Y0H4Z2KNG");}();`,
          }}
        />
        <script id="vtag-ai-js" async src="https://r2.leadsy.ai/tag.js" data-pid="16nA6yS1gNDvBUeVX" data-version="062024"></script>
        
        {/* Meta Pixel Code */}
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1828587994272272');
              fbq('track', 'PageView');
            `,
          }}
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
              o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
              o.onload=function(){window.trackingFunctions.onLoad({appId:"673cfe53e44b8903edb82af7"})},
              document.head.appendChild(o)}initApollo();
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1828587994272272&ev=PageView&noscript=1"
          />
        </noscript>
    <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "lck76mjve8");`,
          }}
        />
      </main>
    </>
  );
}
