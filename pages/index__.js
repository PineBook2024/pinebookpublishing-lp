import React, { useEffect } from "react";
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
            <BrandTopBar />
            <BrandNavbar />
            <BrandHero />
            <BrandBannerLogo />
            <BrandAbout />
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