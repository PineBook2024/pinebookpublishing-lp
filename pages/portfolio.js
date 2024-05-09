import React, { useEffect } from "react";
import BrandFooter from "./components/BrandFooter";
import BrandAbout from "./components/BrandAbout";
import BrandNavbar from "./components/BrandNavbar";
import BrandBannerLogo from "./components/BrandBannerLogo";
import BrandChooseUs from "./components/BrandChooseUs";
import BrandFaqs from "./components/BrandFaqs";
import BrandContact from "./components/BrandContactForm";
import BrandPrimaryHeader from "./components/BrandPrimaryHeader";
import BrandPortfolio from "./components/BrandPortfolio";
import BrandCTA from "./components/BrandCTA";
import BrandProcess from "./components/BrandProcess";

export default function About() {
    return (
        <>
            <BrandNavbar />
            <BrandPrimaryHeader
                title="Portfolio"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
            />
            <BrandBannerLogo />
            <BrandPortfolio />
            <BrandProcess />
            <BrandCTA />
            <BrandFaqs />
            <BrandContact />
            <BrandFooter />
        </>
    );
}
