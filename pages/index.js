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
                subdescone="Do you often feel lost in the maze of publishing and wonder how can I publish my book? Or, you have this amazing idea but every time you try to put it on paper, it feels like hitting a dead end? Writing and self publishing a book can feel like climbing a towering mountain."
                subdesctwo="With Pine Book Publishing, we simplify the writing and self-publishing process, offering personalized solutions suited to your needs. Say goodbye to the frustration of endless revisions and let us help you create a flawless manuscript."
                subdescthree=""
            />
            <BrandServices />
            <BrandCTA
            title="Hey, Wanna Talk?"
            desc="Ready to Chat? Reach out with your ideas or inquiries – we’re excited to listen and engage. Your message is the highlight of our day!"
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
