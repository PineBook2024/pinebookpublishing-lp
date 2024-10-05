import "@/styles/globals.css";
import React, { useEffect } from 'react';
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Head from "next/head";

// Font files can be colocated inside of `pages`
// const majallab = localFont({
//   src: './majallab-webfont.woff2',
//   variable: '--font-majallab',
// });

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


        <meta name="twitter:title" content="Premier Book Publishing Company | Pine Book Publishing" />
        <meta name="twitter:description" content="A Premier Book Publishing Company dedicated to turn your writing dreams into reality. From manuscript to marketplace, We Make It Happen for YOU!" />
        <meta name="twitter:site" content="@pinebookwriting" />
        <meta name="twitter:url" content="https://pinebookpublishing.com/" />
        <meta name="twitter:image" content="https://pinebookpublishing.com/_next/image?url=%2Fbrand-img%2Flogo.webp&w=256&q=75" />

        <script
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
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                  ],
                  "opens": "11:00",
                  "closes": "20:00"
                }
              ],
              "priceRange": "$$",
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
            }),
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
        />
      </Head>
      <main className={`${poppins.variable}`}>
        <Component {...pageProps} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9X52J8V8NK"
          strategy="afterInteractive"
        />
        {/* <Script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=6ad75b0f-d085-4cae-9a7a-48abeb69b973"> </Script> */}
        {/* <Script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=6ad75b0f-d085-4cae-9a7a-48abeb69b973"> </Script> */}

        {/* LiveAgent integration script */}
        <Script id="liveagent-integration" strategy="lazyOnload">
          {`
          (function(d, src, c) { 
            var t = d.scripts[d.scripts.length - 1], 
                s = d.createElement('script');
            s.id = 'la_x2s6df8d';
            s.defer = true;
            s.src = src;
            s.onload = s.onreadystatechange = function() {
              var rs = this.readyState;
              if (rs && (rs != 'complete') && (rs != 'loaded')) {
                return;
              }
              c(this);
            };
            t.parentElement.insertBefore(s, t.nextSibling);
          })(document, 'https://pinebookpublishing.ladesk.com/scripts/track.js', function(e) { });
        `}
        </Script>
        {/* Meta Pixel Code */}
        <script
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
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1828587994272272&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}



      </main>
    </>
  );
}
