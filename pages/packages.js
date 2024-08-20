import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import BrandFooter from "./components/BrandFooter";
import BrandNavbar from "./components/BrandNavbar";
import BrandBannerLogo from "./components/BrandBannerLogo";
import BrandChooseUs from "./components/BrandChooseUs";
import BrandContact from "./components/BrandContactForm";
import BrandPrimaryHeader from "./components/BrandPrimaryHeader";
import Popup from "./components/popup";
import BrandProcess from "./components/BrandProcess";
import Chart from "./components/Chart";
import Packages from "./components/Packages";
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PopupBundle from "./components/PopupBundle";

export default function Bundle({ isOpen, onClose, service }) {
    const [openFAQ, setOpenFAQ] = useState(0);
    const [showPackages, setShowPackages] = useState(false);
    const [showPackages2, setShowPackages2] = useState(false);
    const [collapseOpen1, setCollapseOpen1] = useState(false);
    const [collapseOpen2, setCollapseOpen2] = useState(false);

    const contentRef = useRef(null);

    const togglePackages2 = () => {
        setShowPackages2(!showPackages2);
        setCollapseOpen2(!collapseOpen2);
    };

    const togglePackages = () => {
        setShowPackages(!showPackages);
        setCollapseOpen1(!collapseOpen1);
    };

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('');


    const openModal = (service) => {
        setSelectedService(service);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleOpenChat = () => {
        window.zE && window.zE('webWidget', 'open');
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
                <title>Bundles the Company | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Everything about Pine Book Publishing—your partner in crafting, editing, and publishing your story. Experience seamless service from manuscript to bookshelf."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            {/* <Popup isOpen={isModalOpen} onClose={closeModal} service={selectedService} /> */}
            <PopupBundle isOpen={isModalOpen} onClose={closeModal} service={selectedService} />
            <BrandNavbar />
            <BrandPrimaryHeader
                title="Want to publish your book in affordable price?"
                desc="Pine Book Publishing is here to offer you with the top-notch publishing service in affordable price. We are offering more than just publishing. Explore our Packages below!"
            />
            <BrandBannerLogo />
            <section className="package pb-5 pt-12">
                <div className="container mx-auto max-w-screen-xl">
                    <div className="grid items-center grid-cols-1 text-center m1-h">
                        <h3 className="text-3xl font-poppins md:text-4xl font-bold">
                            Packages
                        </h3>
                    </div>

                    {/* <div className="grid grid-cols-4 gap-4 items-top"> */}
                    {/* <div className="grid grid-cols-1 px-6 mt-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        <div className="gap-8 brand-bundle-pack-wrap">
                            <div className="flex items-center pack-box">
                                <Image src={"/images/pp1.png"} width={40} height={50}></Image>
                                <h4 className="pl-2 text-xl font-poppins md:text-2xl">
                                    Standard
                                </h4>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                            </p>
                        </div>
                        <div className="brand-bundle-pack-wrap">
                            <div className="flex items-center pack-box">
                                <Image src={"/images/pp2.png"} width={40} height={50}></Image>
                                <h4 className="pl-2 text-xl font-poppins md:text-2xl">
                                    Professional
                                </h4>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                            </p>
                        </div>
                        <div className="brand-bundle-pack-wrap">
                            <div className="flex items-center pack-box">
                                <Image src={"/images/pp3.png"} width={40} height={50}></Image>
                                <h4 className="pl-2 text-xl font-poppins md:text-2xl">
                                    All-Inclusive
                                </h4>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                            </p>
                        </div>
                        <div className="brand-bundle-pack-wrap">
                            <div className="flex items-center pack-box">
                                <Image src={"/images/pp4.png"} width={40} height={50}></Image>
                                <h4 className="pl-2 text-xl font-poppins md:text-2xl">
                                    Traditional
                                </h4>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                            </p>
                        </div>
                    </div> */}
                </div>
            </section>

            <section className="bg-white pt-5 pb-5">
                <div className="width-container">
                    <div className="container mx-auto">
                        {/* <div className="text-center mb-6">
                            <h3 className="text-2xl text-black font-poppins uppercase">Publishing</h3>
                            <h2 className="font-poppins text-4xl font-bold text-black uppercase">Bundles</h2>
                        </div> */}

                        <div className="packages-wrapper flex flex-col md:flex-row justify-center gap-12">
                            <div className="single-packages relative">
                                {/* <span className="hover-top-vector"></span> */}

                                <h4 className="text-2xl font-poppins mb-6 text-center pt-4 pb-4 hover-top-vector relative">Basic Package <br></br><span>$700 USD</span></h4>
                                <div className="single-packages-content mb-5 px-10">
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Preparing Your Manuscript
                                    </div>
                                    {/* <div className="flex gap-2 mb-5 items-center items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Developmental Editing
                                    </div> */}
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Line by Line Editing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Proofreading
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Typesetting
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Layout Adjustment
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Formatting (50+ Platforms)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        2 Revisions Per Draft
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Book Publishing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Account Creation
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Account Verification
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on Kindle
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Guarantees
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        No Royalties Share
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Ownership Rights
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Satisfaction
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="package-get-started-btn text-md mt-7" onClick={() => openModal('Basic')}>
                                        GET A QUOTE
                                    </button>
                                </div>

                                <div className="single-packages-footer flex  w-100 justify-center">
                                    <div >
                                        <h5 className="text-xl">Share your idea!</h5>
                                        <p className="text-md text-black"><Link href="tel:(866)-841-7469">(866)-841-7469</Link></p>
                                    </div>
                                    <span className="border-line mx-8"></span>
                                    <div>
                                        <h5 className="text-xl">Want to discuss?</h5>
                                        <button className="text-md text-black blink_me pl-2" onClick={handleOpenChat}>Live Chat Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="single-packages relative">
                                <h4 className="text-2xl font-poppins mb-6 text-center pt-4 pb-4 hover-top-vector relative">Start Up Package<br></br><span>$2,000 USD</span></h4>
                                <div className="single-packages-content mb-5 px-10">
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Preparing Your Manuscript
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Developmental Editing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Line by Line Editing

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Proofreading

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Typesetting
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Layout Adjustment

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Formatting (50+ Platforms)

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        3 Revisions Per Draft

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Designing your Cover
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Graphic OR Illustrated Design
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Cover Layout
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Cover Formatting
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Front, Back & Spine
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Book Publishing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Account Creation
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Account Verification
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on Amazon & Kindle
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        eBook Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Paperback Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Guarantees
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        No Royalties Share
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Ownership Rights
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Satisfaction
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="package-get-started-btn text-md mt-7" onClick={() => openModal('Start up')}>
                                        GET A QUOTE
                                    </button>
                                </div>
                                <div className="single-packages-footer flex  w-100 justify-center">
                                    <div >
                                        <h5 className="text-xl">Share your idea!</h5>
                                        <p className="text-md text-black"><Link href="tel:(866)-841-7469">(866)-841-7469</Link></p>
                                    </div>
                                    <span className="border-line mx-8"></span>
                                    <div>
                                        <h5 className="text-xl">Want to discuss?</h5>
                                        <button className="text-md text-black blink_me pl-2" onClick={handleOpenChat}>Live Chat Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="single-packages relative">
                                <Image src={"/images/badge.png"} className="package-badge" width={80} height={80}></Image>
                                <h4 className="text-2xl font-poppins mb-6 text-center pt-4 pb-4 hover-top-vector relative">Standard Package <br></br><span>$3,000 USD</span></h4>
                                <div className="single-packages-content mb-5 px-10">
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Preparing Your Manuscript
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Developmental Editing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Line by Line Editing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Proofreading

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Typesetting

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Layout Adjustment

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Formatting (50+ Platforms)

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        5 Revisions Per Draft
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Designing your Cover
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Graphic OR Illustrated Design
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Cover Layout
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Cover Formatting
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Front, Back & Spine
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        ISBN + Barcode (2X)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Book Publishing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Account Creation
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Account Verification
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on Amazon & Kindle
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on Barnes and Noble
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        eBook Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Paperback Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Hardcover Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Guarantees
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        No Royalties Share
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Ownership Rights
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Satisfaction
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="package-get-started-btn text-md mt-7" onClick={() => openModal('Standard')}>
                                        GET A QUOTE
                                    </button>
                                </div>

                                <div className="single-packages-footer flex  w-100 justify-center">
                                    <div >
                                        <h5 className="text-xl">Share your idea!</h5>
                                        <p className="text-md text-black"><Link href="tel:(866)-841-7469">(866)-841-7469</Link></p>
                                    </div>
                                    <span className="border-line mx-8"></span>
                                    <div>
                                        <h5 className="text-xl">Want to discuss?</h5>
                                        <button className="text-md text-black blink_me pl-2" onClick={handleOpenChat}>Live Chat Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="table-sec overflow-x-scroll max-w-screen-xl mx-auto">
                            <div className="container mx-auto m1-h mt-10 text-center">
                                {/* <h3 className="mb-8 text-center font-poppins text-3xl md:text-4xl font-bold">
                        
                                </h3> */}
                                <button className="compare-now-btn mb-10 mt-5" onClick={togglePackages2}>Comparison
                                    <FontAwesomeIcon
                                        className="ml-2"
                                        icon={collapseOpen2 ? faArrowUp : faArrowDown}
                                        color="#0d0f38"
                                    />
                                </button>
                            </div>
                            <div className="">
                                <div className={`container container-compare mx-auto transition-height duration-500 ease-in-out ${showPackages2 ? 'expanded' : 'collapsed'}`} ref={contentRef}>
                                    <div className="md:w-full w-[500px] responsive-width">
                                        <table className="w-full mb-14 table-auto bundle-comparison-chart table-fixed">
                                            <thead className="chart-header-custom">
                                                <tr>
                                                    <th
                                                        className="mainpage-regular"
                                                    ></th>

                                                    <th className="font-poppins">
                                                        <div className="heading">
                                                            Basic Package
                                                        </div>
                                                    </th >

                                                    <th className="font-poppins heading">
                                                        <div className="heading">
                                                            Start Up Package
                                                        </div>
                                                    </th>

                                                    <th className="font-poppins heading">
                                                        <div className="heading">
                                                            Standard Package
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-center">
                                                <tr className="m-4">
                                                    <th className="text-2xl md:text-2xl text-start p-3 font-bold"
                                                        colspan="4"
                                                        scope="row">Preparing Your Manuscript</th>
                                                </tr>
                                                <tr>
                                                    <td>Line by Line Editing</td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Developmental Editing</td>
                                                    <td>
                                                        ❌
                                                    </td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Proofreading</td>
                                                    <td>✔️</td>
                                                    <td>✔️</td>
                                                    <td>✔️</td>
                                                </tr>
                                                <tr>
                                                    <td>Typesetting</td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                    <td>✔️</td>
                                                    <td>✔️</td>
                                                </tr>
                                                <tr>
                                                    <td>Layout Adjustment</td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                    <td>✔️</td>
                                                    <td>✔️</td>
                                                </tr>
                                                <tr>
                                                    <td>Formatting</td>
                                                    <td>
                                                        50+ Platforms
                                                    </td>
                                                    <td>50+ Platforms</td>
                                                    <td>50+ Platforms</td>
                                                </tr>
                                                <tr>
                                                    <td>Revisions Per Draft</td>
                                                    <td>
                                                        2
                                                    </td>
                                                    <td>3</td>
                                                    <td>5</td>
                                                </tr>
                                                <tr className="m-4">
                                                    <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5 lg:pl-16 md:pl-16"
                                                        colspan="4"
                                                        scope="row">Book Publishing</th>
                                                </tr>
                                                <tr>
                                                    <td>Account Creation</td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Account Verification</td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Kindle</td>
                                                    <td>✔️</td>
                                                    <td>✔️</td>
                                                    <td>✔️</td>
                                                </tr>
                                                <tr>
                                                    <td>Amazon</td>
                                                    <td>❌</td>
                                                    <td>✔️</td>
                                                    <td>✔️</td>
                                                </tr>
                                                <tr>
                                                    <td>Barnes and Noble</td>
                                                    <td>
                                                        ❌
                                                    </td>
                                                    <td>❌</td>
                                                    <td>✔️</td>
                                                </tr>
                                                <tr>
                                                    <td>eBook Format</td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                    <td>✔️</td>
                                                    <td>✔️</td>
                                                </tr>
                                                <tr>
                                                    <td>Paperback Format</td>
                                                    <td>
                                                        ❌
                                                    </td>
                                                    <td>✔️</td>
                                                    <td>✔️</td>
                                                </tr>
                                                <tr>
                                                    <td>Hardcover Format</td>
                                                    <td>
                                                        ❌
                                                    </td>
                                                    <td>❌</td>
                                                    <td>✔️</td>
                                                </tr>

                                                <tr className="m-4">
                                                    <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5 lg:pl-10 md:pl-10"
                                                        colspan="4"
                                                        scope="row">Designing your Cover</th>
                                                </tr>
                                                <tr>
                                                    <td>Graphic OR Illustrated Design</td>
                                                    <td>
                                                        ❌
                                                    </td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Cover Layout</td>
                                                    <td>
                                                        ❌
                                                    </td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Cover Formatting</td>
                                                    <td>❌</td>
                                                    <td>✔️</td>
                                                    <td>✔️</td>
                                                </tr>
                                                <tr>
                                                    <td>Front, Back & Spine</td>
                                                    <td>
                                                        ❌
                                                    </td>
                                                    <td>✔️</td>
                                                    <td>✔️</td>
                                                </tr>
                                                <tr>
                                                    <td>ISBN + Barcode (2X)</td>
                                                    <td>
                                                        ❌
                                                    </td>
                                                    <td>❌</td>
                                                    <td>✔️</td>
                                                </tr>
                                                <tr className="m-4">
                                                    <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5 lg:pl-20 md:pl-20"
                                                        colspan="4"
                                                        scope="row">Guarantees</th>
                                                </tr>
                                                <tr>
                                                    <td>No Royalties Share</td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>100% Ownership Rights</td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                    <td>
                                                        ✔️
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>100% Satisfaction</td>
                                                    <td>✔️</td>
                                                    <td>✔️</td>
                                                    <td>✔️</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="packages-wrapper flex flex-col md:flex-row justify-center gap-12 mt-0">
                            <div className="single-packages relative">
                                <h4 className="text-2xl font-poppins mb-6 text-center pt-4 pb-4 hover-top-vector relative">Expert Package<br></br><span>$7,000 USD</span></h4>
                                <div className="single-packages-content mb-5 px-10">
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Preparing Your Manuscript
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Developmental Editing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Line by Line Editing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Proofreading
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Typesetting
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Layout Adjustment
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Formatting (50+ Platforms)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        5 Revisions Per Draft
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Designing your Cover
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Graphic OR Illustrated Design
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Cover Layout
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Cover Formatting
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Front, Back & Spine
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        ISBN + Barcode (2X)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Book Publishing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Account Creation
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Account Verification
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on Amazon & Kindle
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on Barnes and Noble
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on Google Books
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        eBook Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Paperback Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Hardcover Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Online Presence
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        3 - 5 Page Authors Website
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        1 - Year Domain & Hosting
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        30 - 60 Seconds Book Trailer
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Guarantees
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        No Royalties Share
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Ownership Rights
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Satisfaction
                                    </div>
                                </div>
                                <div className="text-center mb-4">
                                    <h5 className="font-poppins text-xl flex justify-center items-center gap-3">
                                        EASY PAYMENT PLAN
                                        <div className="tooltip">
                                            <Image src={"/images/question-icon.png"} className="icon" width={20} height={20}></Image>
                                            <span className="tooltip-content">
                                                <ul>
                                                    <li> 50% PAYMENT UPFRONT.</li>
                                                    <li> REMAINING 50% CAN BE PAID IN 2-3 MONTHS INSTALLMENTS</li>
                                                    OR
                                                    <li> AFTER THE DELIVERY OF 3 CHAPTERS.</li>
                                                </ul>
                                            </span>
                                        </div>
                                    </h5>
                                </div>
                                <div className="text-center">
                                    <button className="package-get-started-btn text-md mt-5" onClick={() => openModal('Expert')}>
                                        GET A QUOTE
                                    </button>
                                </div>

                                <div className="single-packages-footer flex  w-100 justify-center">
                                    <div >
                                        <h5 className="text-xl">Share your idea!</h5>
                                        <p className="text-md text-black"><Link href="tel:(866)-841-7469">(866)-841-7469</Link></p>
                                    </div>
                                    <span className="border-line mx-8"></span>
                                    <div>
                                        <h5 className="text-xl">Want to discuss?</h5>
                                        <button className="text-md text-black blink_me pl-2" onClick={handleOpenChat}>Live Chat Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="single-packages relative">
                                <Image src={"/images/badge.png"} className="package-badge" width={80} height={80}></Image>
                                <h4 className="text-2xl font-poppins mb-6 text-center pt-4 pb-4 hover-top-vector relative">Premium Package <br></br><span>$15,000 USD</span></h4>
                                <div className="single-packages-content mb-5 px-10">
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Preparing Your Manuscript
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Developmental Editing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Line by Line Editing

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Proofreading

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Typesetting
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Layout Adjustment

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Formatting (50+ Platforms)

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        5 Revisions Per Draft

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Designing your Cover
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Graphic OR Illustrated Design
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Cover Layout
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Cover Formatting
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Front, Back & Spine
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        ISBN + Barcode (2X)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Book Publishing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Account Creation
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Account Verification
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on Amazon & Kindle
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on Barnes and Noble
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on Google Books
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on Smashwords
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        eBook Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Paperback Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Hardcover Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        12 Months Brand Marketing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Logo Design (Complimentary)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        3 - 5 Page Authors Website
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        1 - Year Domain & Hosting
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        30 - 60 Seconds Book Trailer
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Organic Google Marketing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Social Media Marketing
                                        (Facebook, Instagram & LinkedIn)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Guarantees
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        No Royalties Share
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Ownership Rights
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Satisfaction
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h5 className="font-poppins text-xl flex justify-center items-center gap-3">
                                        EASY PAYMENT PLAN
                                        <div className="tooltip">
                                            <Image src={"/images/question-icon.png"} className="icon" width={20} height={20}></Image>
                                            <span className="tooltip-content">
                                                <ul>
                                                    <li> 50% PAYMENT UPFRONT.</li>
                                                    <li> REMAINING 50% CAN BE PAID IN 2-3 MONTHS INSTALLMENTS</li>
                                                    OR
                                                    <li> AFTER THE DELIVERY OF 3 CHAPTERS.</li>
                                                </ul>
                                            </span>
                                        </div>
                                    </h5>
                                </div>
                                <div className="text-center">
                                    <button className="package-get-started-btn text-md mt-8" onClick={() => openModal('Premium')}>
                                        GET A QUOTE
                                    </button>
                                </div>
                                <div className="single-packages-footer flex  w-100 justify-center">
                                    <div >
                                        <h5 className="text-xl">Share your idea!</h5>
                                        <p className="text-md text-black"><Link href="tel:(866)-841-7469">(866)-841-7469</Link></p>
                                    </div>
                                    <span className="border-line mx-8"></span>
                                    <div>
                                        <h5 className="text-xl">Want to discuss?</h5>
                                        <button className="text-md text-black blink_me pl-2" onClick={handleOpenChat}>Live Chat Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="single-packages relative">
                                <h4 className="text-2xl font-poppins mb-6 text-center pt-4 pb-4 hover-top-vector relative">Enterprise Package <br></br><span>$25,000 USD</span>
                                </h4>
                                <div className="single-packages-content mb-5 px-10">
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Preparing Your Manuscript
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Developmental Editing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Line by Line Editing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Proofreading

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Typesetting

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Layout Adjustment

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Formatting (50+ Platforms)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        5 Revisions Per Draft
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Designing your Cover
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Graphic OR Illustrated Design
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Cover Layout
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Cover Formatting
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Front, Back & Spine
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        ISBN + Barcode (2X)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Book Publishing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Account Creation
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Account Verification
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on Amazon & Kindle
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on Barnes and Noble
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on Google Books
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on Smashwords
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on Draft2Digital
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Available on ACX
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        eBook Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Paperback Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Hardcover Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Audiobook Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        24 Months Brand Marketing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Logo Design (Complimentary)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        3 - 5 Page Authors Website
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        2 - Year Domain & Hosting
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        60 - 90 Seconds Video Trailer
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Organic Google Marketing
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Blogs & Article Postings
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Press Releases (150+ Platforms)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Social Media Marketing
                                        (Facebook, Instagram, Twitter)
                                        (Pinterest, Youtube & LinkedIn)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                                        Guarantees
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        No Royalties Share
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Ownership Rights
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Satisfaction
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h5 className="font-poppins text-xl flex justify-center items-center gap-3">
                                        EASY PAYMENT PLAN
                                        <div className="tooltip">
                                            <Image src={"/images/question-icon.png"} className="icon" width={20} height={20}></Image>
                                            <span className="tooltip-content">
                                                <ul>
                                                    <li> 50% PAYMENT UPFRONT.</li>
                                                    <li> REMAINING 50% CAN BE PAID IN 2-3 MONTHS INSTALLMENTS</li>
                                                    OR
                                                    <li> AFTER THE DELIVERY OF 3 CHAPTERS.</li>
                                                </ul>
                                            </span>
                                        </div>

                                    </h5>
                                </div>
                                <div className="text-center">
                                    <button className="package-get-started-btn font-poppins text-md mt-8" onClick={() => openModal('Enterprise')}>
                                        GET A QUOTE
                                    </button>
                                </div>

                                <div className="single-packages-footer flex  w-100 justify-center">
                                    <div >
                                        <h5 className="text-xl">Share your idea!</h5>
                                        <p className="text-md text-black"><Link href="tel:(866)-841-7469">(866)-841-7469</Link></p>
                                    </div>
                                    <span className="border-line mx-8"></span>
                                    <div>
                                        <h5 className="text-xl">Want to discuss?</h5>
                                        <button className="text-md text-black blink_me pl-2" onClick={handleOpenChat}>Live Chat Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="table-sec overflow-x-scroll max-w-screen-xl mx-auto">
                <div className="container mx-auto m1-h mt-10 text-center">
                    <button className="compare-now-btn mb-10 mt-5" onClick={togglePackages}>Comparison
                        <FontAwesomeIcon
                            className="ml-2"
                            icon={collapseOpen1 ? faArrowUp : faArrowDown}
                            color="#0d0f38"
                        />
                    </button>
                </div>
                <div className="">
                    <div className={`container container-compare mx-auto transition-height duration-500 ease-in-out ${showPackages ? 'expanded' : 'collapsed'}`} ref={contentRef}>
                        <div className="md:w-full w-[500px] responsive-width">
                            <table className="w-full mb-14 table-auto bundle-comparison-chart table-fixed">
                                <thead className="chart-header-custom">
                                    <tr>
                                        <th
                                            className="mainpage-regular"
                                        ></th>

                                        <th className="font-poppins">
                                            <div className="heading">
                                                Expert Package
                                            </div>
                                        </th >
                                        <th className="font-poppins">
                                            <div className="heading">
                                                Premium Package
                                            </div>
                                        </th>

                                        <th className="font-poppins">
                                            <div className="heading">
                                                Enterprise Package
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr className="m-4">
                                        <th className="text-2xl md:text-2xl text-start p-3 font-bold"
                                            colspan="4"
                                            scope="row">Preparing Your Manuscript</th>
                                    </tr>
                                    <tr>
                                        <td>Line by Line Editing</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Developmental Editing</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Proofreading</td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                    </tr>
                                    <tr>
                                        <td>Typesetting</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                    </tr>
                                    <tr>
                                        <td>Layout Adjustment</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                    </tr>
                                    <tr>
                                        <td>Formatting</td>
                                        <td>
                                            50+ Platforms
                                        </td>
                                        <td>50+ Platforms</td>
                                        <td>50+ Platforms</td>
                                    </tr>
                                    <tr>
                                        <td>Revisions Per Draft</td>
                                        <td>
                                            5
                                        </td>
                                        <td>5</td>
                                        <td>5</td>
                                    </tr>
                                    <tr className="m-4">
                                        <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5 lg:pl-16 md:pl-16"
                                            colspan="4"
                                            scope="row">Book Publishing</th>
                                    </tr>
                                    <tr>
                                        <td>Account Creation</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Account Verification</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Kindle</td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                    </tr>
                                    <tr>
                                        <td>Amazon</td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                    </tr>
                                    <tr>
                                        <td>Barnes and Noble</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                    </tr>
                                    <tr>
                                        <td>Google Books</td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                    </tr>
                                    <tr>
                                        <td>Smashwords</td>
                                        <td>
                                            ❌
                                        </td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                    </tr>
                                    <tr>
                                        <td>Draft2Digital</td>
                                        <td>
                                            ❌
                                        </td>
                                        <td>❌</td>
                                        <td>✔️</td>
                                    </tr>
                                    <tr>
                                        <td>ACX</td>
                                        <td>
                                            ❌
                                        </td>
                                        <td>❌</td>
                                        <td>✔️</td>
                                    </tr>
                                    <tr>
                                        <td>eBook Format</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                    </tr>
                                    <tr>
                                        <td>Paperback Format</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                    </tr>
                                    <tr>
                                        <td>Hardcover Format</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                    </tr>
                                    <tr>
                                        <td>Audiobook Format</td>
                                        <td>
                                            ❌
                                        </td>
                                        <td>❌</td>
                                        <td>✔️</td>
                                    </tr>
                                    <tr className="m-4">
                                        <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5 lg:pl-8 md:pl-8"
                                            colspan="4"
                                            scope="row">Designing your Cover</th>
                                    </tr>
                                    <tr>
                                        <td>Graphic OR Illustrated Design</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Cover Layout</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Cover Formatting</td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                    </tr>
                                    <tr>
                                        <td>Front, Back & Spine</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                    </tr>
                                    <tr>
                                        <td>ISBN + Barcode (2X)</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                    </tr>
                                    {/* <tr className="m-4">
                                        <td className="text-2xl md:text-2xl text-start p-3 font-bold"
                                            colspan="4"
                                            scope="row">Guarantees</td>
                                    </tr>
                                    <tr>
                                        <td>No Royalties Share</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>100% Ownership Rights</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>100% Satisfaction</td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                    </tr> */}
                                    <tr className="m-4">
                                        <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5 lg:pl-14 md:pl-14"
                                            colspan="4"
                                            scope="row">Online Presence</th>
                                    </tr>
                                    <tr>
                                        <td>Authors Website</td>
                                        <td>
                                            3-5 Pages
                                        </td>
                                        <td>
                                            3-5 Pages
                                        </td>
                                        <td>
                                            3-5 Pages
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Domain & Hosting</td>
                                        <td>
                                            1 Year
                                        </td>
                                        <td>
                                            1 Year
                                        </td>
                                        <td>
                                            2 Year
                                        </td>
                                    </tr>
                                    <tr className="m-4">
                                        <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5 lg:pl-8 md:pl-8"
                                            colspan="4"
                                            scope="row">Marketing & Branding</th>
                                    </tr>
                                    <tr>
                                        <td>Book Trailer</td>
                                        <td>
                                            30-60 Seconds
                                        </td>
                                        <td>
                                            30-60 Seconds
                                        </td>
                                        <td>
                                            60-90 Seconds
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Social Media Marketing</td>
                                        <td>
                                            ❌
                                        </td>
                                        <td>
                                            3 Platforms
                                        </td>
                                        <td>
                                            6 Platforms
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Organic Google Marketing</td>
                                        <td>
                                            ❌
                                        </td>
                                        <td>
                                            6 Months
                                        </td>
                                        <td>
                                            12 Months
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Blogs & Article Postings</td>
                                        <td>
                                            ❌
                                        </td>
                                        <td>
                                            ❌
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Press Releases</td>
                                        <td>
                                            ❌
                                        </td>
                                        <td>
                                            ❌
                                        </td>
                                        <td>
                                            150+ Platforms
                                        </td>
                                    </tr>
                                    <tr className="m-4">
                                        <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5 lg:pl-20 md:pl-20"
                                            colspan="4"
                                            scope="row">Guarantees</th>
                                    </tr>
                                    <tr>
                                        <td>100% Royalties</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>100% Ownership Rights</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td>100% Satisfaction</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* <Chart /> */}
            {/* <BrandProcess /> */}
            {/* <BrandChooseUs /> */}
            <section className="brand-testimonials-section">
                <div className="max-w-screen-xl mx-auto px-4 my-20 relative py-22">
                    <div className="text-center mb-6">
                        <h2 className="font-poppins text-4xl text-black uppercase mb-3 font-bold">Frequently Asked Questions</h2>
                        {/* <h3 className="text-xl text-black font-poppins uppercase font-bold">each Out to Us for Further Assistance.</h3> */}
                    </div>
                    <div className="faq-que">
                        <div className="flex flex-col md:flex-row justify-center gap-4">
                            {Array.from({ length: 2 }).map((_, colIndex) => (
                                <div key={colIndex} className="w-full max-w-screen-sm">
                                    {faqData.slice(colIndex * 3, (colIndex + 1) * 3).map((faq, index) => {
                                        const actualIndex = index + colIndex * 3;
                                        return (
                                            <button
                                                key={actualIndex}
                                                className="w-full border-b-2 border-gray-300 p-6 text-left mt-0 focus:outline-none bg-slate-200 mb-4 rounded-2xl"
                                                onClick={() => toggleFAQ(actualIndex)}
                                            >
                                                <div className={`text-lg font-semibold flex justify-between ${openFAQ === actualIndex ? 'border-b border-gray-300' : 'border-0'}`}>
                                                    {faq.question}
                                                    <div onClick={() => toggleFAQ()}>
                                                        {openFAQ === actualIndex ? (
                                                            <Image src="/brand-img/up-arrow.png" alt="Close" className="brand-faq-icon" width={50} height={20} />
                                                        ) : (
                                                            <Image src="/brand-img/down-arrow.png" alt="Open" className="brand-faq-icon" width={50} height={20} />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={`mt-3  text-gray-700 ${openFAQ === actualIndex ? 'faq-content-open' : 'faq-content-close'}`}>
                                                    {faq.answer}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <BrandContact />
            <BrandFooter />
        </>
    );
}
