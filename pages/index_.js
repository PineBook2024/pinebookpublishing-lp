import React, { useEffect } from "react";
import Footer from "./components/Footer";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import BrandTopBar from "./components/BrandTopBar";
import BrandFooter from "./components/BrandFooter";
import BrandAbout from "./components/BrandAbout";
import BrandNavbar from "./components/BrandNavbar";
import BrandHero from "./components/BrandHero";
import BrandBannerLogo from "./components/BrandBannerLogo";
import BrandCTA from "./components/BrandCTA";
import BrandServices from "./components/BrandServices";

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
            <BrandFooter />
        </>
    );
}
