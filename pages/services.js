import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import BrandFooter from "./components/BrandFooter";
import BrandAbout from "./components/BrandAbout";
import BrandNavbar from "./components/BrandNavbar";
import BrandBannerLogo from "./components/BrandBannerLogo";
import BrandChooseUs from "./components/BrandChooseUs";
import BrandContact from "./components/BrandContactForm";
import BrandPrimaryHeader from "./components/BrandPrimaryHeader";
import BrandServices from "./components/BrandServices";
import BrandTestimonial from "./components/BrandTestimonial";

export default function Services() {


    return (
        <>
            <Head>
                <title>Service | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Everything about Pine Book Publishing—your partner in crafting, editing, and publishing your story. Experience seamless service from manuscript to bookshelf."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <BrandNavbar />
            <BrandPrimaryHeader
                title="Start Your Publishing Journey Now"
                desc="Are you searching for a company with a wide range of Book Publishing Services? You are at the right place. At Pine Book Publishing, we offer comprehensive services to cater to your needs. From editing to publishing, we have mastered everything. Explore everything you need to kick-start your publishing journey."
            />
            <BrandBannerLogo />
            <BrandServices />
            <BrandChooseUs />
            <BrandTestimonial />

            <BrandContact />
            <BrandFooter />
        </>
    );
}
