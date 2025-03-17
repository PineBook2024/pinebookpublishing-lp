import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import BrandFooter from "./components/BrandFooter";
import BrandNavbar from "./components/BrandNavbar";
import BrandBannerLogo from "./components/BrandBannerLogo";
import BrandChooseUs from "./components/BrandChooseUs";
import BrandPrimaryHeader from "./components/BrandPrimaryHeader";
import BrandProcess from "./components/BrandProcess";
import BrandContact from "./components/BrandContactForm";
import BrandTopBar from "./components/BrandTopBar";

export default function DocumentProcessing() {
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
                <title>Document Processing Services | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Use our document processing services to streamline your operations. For data extraction, digitization, indexing, and other tasks, we provide precise, effective, and safe solutions."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <BrandTopBar />
            <BrandNavbar />
            <BrandPrimaryHeader
                title="Your Documents, Perfected - Expert Document Processing Services"
                desc="Pine Book Publishing is your reliable resource for document management. We offer a range of document processing services, from rapid document printing to multi-type folding and envelop insertion. Have questions? Contact us now!"
            />
            <BrandBannerLogo />
            <div className="container mx-auto max-w-screen-xl overflow-hidden pt-10 md:py-20">
                <div className="text-center">
                    <h2 className="font-poppins text-3xl md:text-4xl uppercase font-bold">Professional Document Processing Services</h2>
                    <p className="font-poppins text-xl text-center	pt-3">
                        Being a leading name in the publishing and printing industry, we understand how important high-quality document printing and processing are. At <Link href={"https://pinebookpublishing.com/"} target="_blank" className="font-bold hover:text-blue-500">Pine Book Publishing</Link>, we are familiar with all the perspectives of document management, from printing and folding to perfectly inserting documents in no time.
                    </p>
                </div>
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/doc-processing-bg-img.png"} width={670} height={500}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate mt-10"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                </div>
            </div>
            <div className="container mx-auto max-w-screen-xl overflow-hidden pb-10 md:pb-20">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/doc-01.png"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h2 className="font-poppins text-3xl md:text-4xl uppercase font-bold mt-8 md:mt-0">Document Printing</h2>
                        <p className="font-poppins text-xl	pt-3">
                            Do you need high-quality and speedy document print? We deliver exceptional results by providing our professional document printing services. We handle different paper sizes and quantities. Whether you require a letter (8.5 x11"), Legal (8.5 x 14"), or Tabloid (11 x 17"), we're here to serve!
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto max-w-screen-xl overflow-hidden mb-8">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h2 className="font-poppins text-3xl md:text-4xl uppercase font-bold">Document Folding:</h2>
                        <p className="font-poppins text-xl	pt-3 mb-4">
                            Choose the fold that works best for you, and we'll do the rest. Our folding options are the following:
                        </p>
                        <ul>
                            <li className="mb-4"><b>C Fold:</b> An ideal folding type for brochures and letters.</li>
                            <li className="mb-4"><b>Z Fold:</b> Ideal for neat and well-organized presentations and marketing stuff.</li>
                            <li className="mb-4"><b>Bi-Fold:</b> A multipurpose and timeless choice. Suitable for a wide range of documents.</li>
                        </ul>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/doc-02.png"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                </div>
            </div>
            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-20">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/doc-03.png"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h2 className="font-poppins text-3xl md:text-4xl uppercase font-bold mt-8 md:mt-0">Document Insertion</h2>
                        <p className="font-poppins text-xl	pt-3">
                            Document insertion requires diligence and efficiency. Our team of active document handlers works together to deliver fast and accurate results. Here is the process we follow:
                        </p>
                        <p className="font-poppins text-xl	pt-3 mb-3">
                            <b>Insertion:</b> Once you choose the envelope type, whether it is (#10, 6x9, 12x9, or 8.5x11), we begin the document insertion process with a thorough attention to detail.</p>
                        <p className="font-poppins text-xl	pt-3"><b>Sealing:</b> Our second unit, the sealing unit, works along and ensures that all your documents are carefully sealed and ready for distribution.</p>
                    </div>
                </div>
            </div>

            {/* <BrandProcess /> */}
            {/* <BrandChooseUs /> */}
           <BrandContact />
            <BrandFooter />
        </>
    );
}
