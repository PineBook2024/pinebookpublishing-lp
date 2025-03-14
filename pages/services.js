import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
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
import BrandTopBar from "./components/BrandTopBar";

export default function Services() {


    return (
        <>
            <Head>
                <title>Publish, Editing and Marketing Services| Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Explore our complete range of Publish, editing and marketing services at Pine Book Publishing. From editing to Publishing and Audiobooks, we offer everything."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <BrandTopBar />
            <BrandNavbar />
            <BrandPrimaryHeader
                title="Start Your Publishing Journey Now"
                desc={
                    <>
                        Are you searching for a company with a wide range of Book Publishing Services? You are at the right place. At{' '}
                        <Link href="https://pinebookpublishing.com/" target="_blank">
                            Pine Book Publishing
                        </Link>, we offer comprehensive services to cater to your needs. From editing to publishing, we have mastered everything. Explore everything you need to kick-start your publishing journey.
                    </>
                }
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
