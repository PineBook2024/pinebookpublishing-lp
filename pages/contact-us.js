import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import BrandMainContact from "./components/BrandMainContact";
import BrandFooter from "./components/BrandFooter";
import BrandPrimaryHeader from "./components/BrandPrimaryHeader";
import BrandNavbar from "./components/BrandNavbar";

export default function Contact() {



    return (
        <>
            <Head>
                <title>Contact Us | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Everything about Pine Book Publishing—your partner in crafting, editing, and publishing your story. Experience seamless service from manuscript to bookshelf."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <BrandNavbar />
            <BrandPrimaryHeader 
              title="Connect with Publishing Experts Now!"
              desc="Pine Book Publishing brings you the expert insights to kickstart your publishing journey. Reach out to us today!"
              />

            <BrandMainContact />
            <BrandFooter />
        </>
    );
}
