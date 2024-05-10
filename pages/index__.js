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
            <BrandHero />
            <BrandBannerLogo />
            <BrandAbout
                subdescone="Are you feeling stuck in the maze of writing and publishing your book? Do you have this amazing idea but every time you try to put it on paper, it feels like hitting a dead end?"
                subdesctwo="With Pine Book Publishing, we simplify the writing and publishing process, offering personalized solutions tailored to your needs. Say goodbye to the frustration of endless revisions and let us guide you towards a polished manuscript."
                subdescthree=""
            />
            <BrandServices />
            <BrandCTA />
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
