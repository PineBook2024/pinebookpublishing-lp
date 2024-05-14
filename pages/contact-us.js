import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import BrandMainContact from "./components/BrandMainContact";

export default function Contact() {



    return (
        <>
            <Head>
                <title>Contact the Company | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Everything about Pine Book Publishing—your partner in crafting, editing, and publishing your story. Experience seamless service from manuscript to bookshelf."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>

            <BrandMainContact />
        </>
    );
}
