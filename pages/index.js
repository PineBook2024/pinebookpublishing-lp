import React, { useEffect } from "react";
import Head from "next/head";
import BrandTopBar from "./components/BrandTopBar";
import BrandFooter from "./components/BrandFooter";
import BrandAbout from "./components/BrandAbout";
import BrandNavbar from "./components/BrandNavbar";
import BrandHero from "./components/BrandHero";
import BrandBannerLogo from "./components/BrandBannerLogo";
import BrandCTA from "./components/BrandCTA";
import BrandServices from "./components/BrandServices";
import BrandChooseUs from "./components/BrandChooseUs";
import BrandTestimonial from "./components/BrandTestimonial";
import BrandFaqs from "./components/BrandFaqs";
import BrandContact from "./components/BrandContactForm";
import BrandLogo from "./components/BrandLogo";
import BrandProcess from "./components/BrandProcess";
import BrandBannerVideo from "./components/BrandBannerVideo";

export default function Home() {
    return (
        <>
            <Head>
                <title>Premier Book Publishing Company | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="A Premier Book Publishing Company dedicated to turn your writing dreams into reality. From manuscript to marketplace, We Make It Happen for YOU!"
                />
                <link rel="shortcut icon" href="/images/fav.png" />
                <meta name="google-site-verification" content="v2pKJGIZnMWCWw2QC5nuRPYT5gvDQlUtT0lZYFIhHYo" />
                {/* Google tag Manager Script */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-9X52J8V8NK"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-9X52J8V8NK');
              `,
                    }}
                />

                {/* <!-- Start of LiveChat (www.livechat.com) code --> */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.__lc = window.__lc || {};
                        window.__lc.license = 18656631;
                        window.__lc.integration_name = "manual_onboarding";
                        window.__lc.product_name = "livechat";
                        ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
                    `,
                    }}
                />
                <noscript><a href="https://www.livechat.com/chat-with/18656631/" rel="nofollow">Chat with us</a>, powered by <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a></noscript>
                {/* <!-- End of LiveChat code --> */}


            </Head>
            <BrandTopBar />
            <BrandNavbar />
            {/* <BrandHero /> */}
            <BrandBannerVideo Component={BrandHero} />
            <BrandBannerLogo />
            <BrandAbout
                subdescone="Have you ever tried publishing a book but don’t know where to start? Did you ever plan to consult a book publishing company? We get it – there are more book publishing companies out there than stars in the sky (okay, maybe not that many, but you get the idea)."
                subdesctwo="Don’t feel overwhelmed; Pine Book Publishing is here to help you meet your publishing needs. We have self-published 100s of books since our inception on 22nd February 2023. Even though we may not have been in the market for too long, but our experts have at least 10-15 years of experience and are masters of their designated fields. We know the difficulties faced by authors worldwide and understand how frustrating the writing journey can be! So, we are here to fill this gap and simplify the entire editing and publishing process, offering customized solutions specifically to your needs and requirements."
                subdescthree=""
            />
            <BrandServices />
            <BrandCTA
                title="Do You Have Concerns? "
                desc="It’s okay to have questions since we understand that your book is close to your heart. Why not just get into a quick discussion?"
                btntext="Speak to our Consultant"
            />
            <BrandProcess />
            <BrandChooseUs />
            <BrandTestimonial />
            <BrandFaqs />
            <BrandContact />
            <BrandLogo />
            <BrandFooter />
        </>
    );
}
