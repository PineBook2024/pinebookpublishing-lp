import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import BrandAudioPlayer from "../pages/components/BrandAudioPlayer";
import BrandFooter from "./components/BrandFooter";
import BrandNavbar from "./components/BrandNavbar";
import BrandBannerLogo from "./components/BrandBannerLogo";
import BrandChooseUs from "./components/BrandChooseUs";
import BrandPrimaryHeader from "./components/BrandPrimaryHeader";
import BrandProcess from "./components/BrandProcess";

export default function AudioBook() {
    const [openFAQ, setOpenFAQ] = useState(0);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqData = [
        { question: "Is it a requirement that my book has been published already?", answer: "No, there's no requirement for your book to be already published for audiobook production. We can create audiobook of both published and unpublished manuscripts." },
        { question: "How long will my audiobook take to be completed?", answer: "The whole production time of your audiobook production will depend on its overall length, research and how many narrators are working on it. We'll provide an estimated timeline during the project consultation." },
        { question: "How much will my audiobook cost?", answer: "Our audiobook production service cost may vary based on working hours (we charge hourly), your book's length, the number of narrators who will be working, and any additional services you acquire. You will be provided a detailed quote once we review your manuscript and discuss your audiobook-related needs." },
        { question: "Do you provide Audiobook translation service?", answer: "Yes, we offer all-embracing audiobook translation services to help you convert your book (written in any language) to any language you desire." },
        { question: "How many narrators will work on my Audiobook?", answer: "We have a vast team of male and female narrators of different ages, voices and unique narration skills. We will discuss and suggest the number of narrators required for your specific genre and requirements." },
        { question: "Can I narrate my audiobook?", answer: "Yes, you can narrate your audiobook your own too. If you've chosen to narrate yourself, we can assist you with our expert guidance and support throughout the recording process." }
    ];

    return (
        <>
            <Head>
                <title>Audiobook Production and Publishing | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Transform your book into an audiobook with our professional audiobook production and publishing services. High quality and fast delivery. Contact us today!"
                />
                <link rel="shortcut icon" href="/images/fav.png" />

            </Head>
            <BrandNavbar />
            <BrandPrimaryHeader
                title="Reach Maximum Audience with Professional Audiobook Production Services"
                desc="Why always sell text-based books when a large audience loves to listen to audio-recoded books? At Pine Book Publishing, we offer a complete package of audiobooks, from manuscript refinement to audio narration and publishing on the most popular audiobook publishing platforms. Contact us to learn more!"
            />
            <BrandBannerLogo />
            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-20">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h3 className="font-poppins text-2xl md:text-3xl uppercase">
                            Your Story, Our Voice
                        </h3>
                        <h2 className="font-poppins text-3xl md:text-4xl uppercase font-bold">Professional Audiobook Narration Services</h2>
                        <p className="font-poppins text-xl	pt-3">
                            Audiobook creation and distribution is an engaging and more accessible way to consume a book's content while doing other activities or giving eyes rest. Audiobooks have a separate audience base that prefers to enjoy a book in an audio format. So, if you want to make your book accessible to a larger audience, audiobook creation is an excellent option.
                        </p>
                        <p className="font-poppins text-xl	pt-3">
                            Pine Book Publishing has a talented group of male and female narrators of different ages, voices and expertise, as well as professional audio engineers on board who specialize in converting written words into ear-engaging audio experiences. They all serve years of experience in infusing life into different stories of different genres. Our extended team of audiobook narrators is steadily available to serve whether you require solo-narration, duet-narration, multicast narration or other. We thoroughly handle everything from writing to publishing.                         </p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/Audio Book.png"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                </div>
                <p className="font-poppins text-xl	px-10 md:px-0 pt-4" data-aos="fade-right">
                    Why still waiting? Why settled with a one-sided audience base? Hire Pine Book Publishing to reach a large audience, audiobook lovers. Contact our experts now!                </p>
            </div>
            {/* <BrandProcess /> */}
            <section className="brand-process  mx-auto relative pt-10 text-center flex justify-center mb-12 overflow-hidden">
                <div className="max-w-screen-xl">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl text-black font-poppins">Our Service Workflow</h3>
                        <h2 className="font-poppins text-3xl md:text-4xl text-black font-bold" data-aos="zoom-out-down">6-Step Process of Our <br></br>Audiobook Production Services</h2>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img1.png"} width={700} height={200} className=" pb-10" alt="process-one" ></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Project Discussion:</h2>
                            <p className="para">Our process begins with discussing your<br></br> requirements, including your goals, your<br></br> target audience, and your specific style.
                            </p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img2.png"} width={700} height={200} className=" pb-10" alt="process-two"></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Manuscript Preparation:</h2>
                            <p className="para">We'll get to your manuscript to review<br></br> the whole content's consistency, clarity,<br></br> and format to prepare it for production.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img3.png"} width={700} height={200} className=" pb-10" alt="process-three"></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Manuscript Finalization:</h2>
                            <p className="para">After the review, we'll suggest if there are<br></br> any changes required to improve its overall<br></br> compatibility with audio narration.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img4.png"} width={700} height={200} className=" pb-10" alt="process-four"></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Chapter-Wise Narration:</h2>
                            <p className="para">Then, our narrators will collectively <br></br>produce and send your work chapter-<br></br>by-chapter and make edits based on your feedback.</p>
                        </div>
                    </div>

                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img5.png"} width={700} height={200} className=" pb-10" alt="process-five"></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Audio Refinement:</h2>
                            <p className="para">After the narration, we'll edit and refine<br></br> the recorded audio, remove noise, and adjust<br></br> levels to make it a polished version.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img6.png"} width={700} height={200} className=" pb-10" alt="process-six"></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Publishing:</h2>
                            <p className="para">In the last step, we'll handle everything<br></br> regarding audiobook distribution and<br></br> publication on the most popular platforms.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="overflow-hidden" >
                <div className="brand-choose-us-section ms-auto relative left-0 md:left-52 px-12 md:px-16 mt-20 mb-8 " >
                    <div className="flex items-center flex-col md:flex-row" data-aos="fade-right" data-aos-delay="0" data-aos-duration="500">
                        <div className="basis-1/3 brand-choose-us-vector">
                            {/* <Image src={"/brand-img/why-choose-us-img.webp"} width={350} height={200} className="brand-choose-us-img"></Image> */}
                            <Image src={"/brand-img/Why Choose Us 2.png"} width={750} height={750}
                                loading="lazy"
                                alt="about img"
                                className="brand-about-img"
                            />
                        </div>
                        <div className="basis-1/3 md:ml-20 py-8">
                            <h2 className="text-white font-poppins text-3xl md:text-4xl uppercase mt-20 md:mt-0 font-bold" data-aos="zoom-in-left" data-aos-delay="100">Why Choose Our Audiobook Narration Services?</h2>
                            <p className="text-white mt-2">At Pine Book Publishing, we believe that audiobooks are not just about listening to a book but about how one can dive into the world of imagination and emotions. We offer affordable audiobook creation services for numerous genres, from heartwarming romances to attention-grabbing children's stories.</p>
                            <div className="flex gap-10 mt-6">
                                <ul>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} alt="check icon" />100% Original Audio</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} alt="check icon" />Expert Narrators</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} alt="check icon" />Multiple Revisions</li>
                                </ul>
                                <ul>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} alt="check icon" />Global Distribution</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} alt="check icon" />Affordable Pricing</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} alt="check icon" />Efficient Process</li>
                                </ul>
                            </div>
                            <BrandAudioPlayer src="/brand-img/why-choose-us-voice.wav" />
                            {/* <button className="brand-nav-btn-white bg-white shadow-xl md:mt-10 mt-4 cursor-pointer ml-2 md:ml-3"><Link href='tel:(866) 841-7469'>Call Now</Link></button> */}
                        </div>
                    </div>
                </div>
            </section>

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
            <BrandFooter />
        </>
    );
}
