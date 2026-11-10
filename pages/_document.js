import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <meta name="facebook-domain-verification" content="ddnvgvw5pn3121zvii7izv2bijv916" />
      <link rel="shortcut icon" href="/images/fav.png" />
      <Head>
        <link rel="preconnect" href="https://salesiq.zohopublic.com" />
        <link rel="preconnect" href="https://js.zohostatic.com" crossOrigin="anonymous" />
        <script id="zoho-salesiq-bootstrap" dangerouslySetInnerHTML={{ __html: `
          window.$zoho = window.$zoho || {};
          window.$zoho.salesiq = window.$zoho.salesiq || { values: {} };
          window.$zoho.salesiq.ready = function () {
            window.$zoho.salesiq.floatbutton.visible("show");
          };
          (function () {
            if (document.getElementById("zsiqscript")) return;
            var script = document.createElement("script");
            script.id = "zsiqscript";
            script.async = true;
            script.src = "https://salesiq.zohopublic.com/widget?wc=siqbd2efc989c2066a4e9c5a1d1fc2a2e5aa947de2ffdfc7fef65f0b82ad608ba33";
            document.head.appendChild(script);
          })();
        ` }} />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
          async
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js?1733052783337"
          async
        ></script>
      </body>
    </Html>
  );
}

