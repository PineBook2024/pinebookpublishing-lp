import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import BrandMainContact from "./components/BrandMainContact";
import BrandFooter from "./components/BrandFooter";
import BrandPrimaryHeader from "./components/BrandPrimaryHeader";
import BrandNavbar from "./components/BrandNavbar";
import BrandTopBar from "./components/BrandTopBar";

export default function Contact() {



    return (
        <>
            <Head>
                <title>Contact Us | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Ready to publish your book? Get in touch with our publishing experts at Pine Book Publishing. Our team is here to assist you every step of the way."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <BrandTopBar />
            <BrandNavbar />
            <BrandPrimaryHeader 
              title="Connect with Publishing Experts Now!"
              desc="Pine Book Publishing brings you the expert insights to kickstart your publishing journey. Reach out to us today!"/>
            <BrandMainContact />
            <BrandFooter />
        </>
    );
}
