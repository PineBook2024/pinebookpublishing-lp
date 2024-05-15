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
            </Head>
            <BrandTopBar />
            <BrandNavbar />
            {/* <BrandHero /> */}
            <BrandBannerVideo Component={BrandHero} />
            <BrandBannerLogo />
            <BrandAbout
                subdescone="Feeling overwhelmed by the daunting task of writing and publishing your book? Do you find yourself grappling with your amazing ideas, only to hit a roadblock every time you try to put them down on paper? It's a frustrating maze, but fear not – Pine Book Publishing is here to lead you through it with ease."
                subdesctwo="We specialize in simplifying the entire writing and publishing process, offering customized solutions tailored specifically to your needs. Say goodbye to the endless cycle of revisions and hello to a polished manuscript that truly reflects your vision."
                subdescthree=""
            />
            <BrandServices />
            <BrandCTA
            title="Hey, Wanna Talk?"
            desc="Ready to Chat? Reach out with your ideas or inquiries – we’re excited to listen and engage. Your message is the highlight of our day!"
            btntext="Let's Talk"
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
