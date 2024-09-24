import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import BrandFooter from "./components/BrandFooter";
import BrandNavbar from "./components/BrandNavbar";
import BrandBannerLogo from "./components/BrandBannerLogo";
import BrandPrimaryHeader from "./components/BrandPrimaryHeader";
import BrandTestimonial from "./components/BrandTestimonial";
import BrandCTA from "./components/BrandCTA";
import BrandCustomerStory from "./components/BrandCustomerStory";
import BrandTesti from "./components/BrandTesti";

export default function Services() {
    const [openFAQ, setOpenFAQ] = useState(0);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqData = [
        { question: "What genres does Pine Book Publishing specialize in?", answer: "We pride ourselves on our versatility and can assist with a wide range of genres, including fiction, non-fiction, memoirs, and more." },
        { question: "How does the publishing process work with Pine Book Publishing?", answer: "Our process begins with an initial consultation to discuss your project's goals and requirements. From there, we'll work closely with you every step of the way, from manuscript development to final publication." },
        { question: "What level of involvement will I have in the editing process?", answer: "Your level of involvement is entirely up to you. We offer collaborative editing services, where you'll have the opportunity to provide feedback and input throughout the editing process." },
        { question: "How long does it typically take to publish a book with Pine Book Publishing?", answer: "The timeline can vary depending on the scope of your project and our current workload. However, we strive to work efficiently without compromising quality, aiming to deliver your finished product within a reasonable timeframe." },
        { question: "What sets Pine Book Publishing apart from other publishing services?", answer: "At Pine Book Publishing, we prioritize personalized attention, expert guidance, and transparent communication. Our goal is not just to publish your book but to ensure it's the best it can be, tailored to your unique vision and goals." },
        { question: "What pricing options are available for your services?", answer: "We offer competitive pricing packages tailored to fit your budget and project needs. Our rates are transparent, and we're happy to provide a detailed quote based on the specific services you require." }
    ];

    return (
        <>
            <Head>
                <title>Client Testimonials | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="At Pine Book Publishing, customer success is our priority. Discover what our clients have to say about their experiences us."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <BrandNavbar />
            <BrandPrimaryHeader
                title="Ready To Write Your Next Chapter?"
                desc="Let Pine Book Publishing be the compass for your narrative journey, steering you toward literary success with every stroke of the pen."
            />
            <BrandBannerLogo />
            <BrandTesti />
            <BrandTestimonial />
            <BrandCTA
                title="Hey, Wanna Talk?"
                desc="Ready to Chat? Reach out with your ideas or inquiries – we’re excited to listen and engage. Your message is the highlight of our day!"
                btntext="Let's Talk"
            />
            {/* <BrandCustomerStory /> */}

            <BrandFooter />
        </>
    );
}
