import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import BrandFooter from "./components/BrandFooter";
import BrandNavbar from "./components/BrandNavbar";
import BrandBannerLogo from "./components/BrandBannerLogo";
import BrandChooseUs from "./components/BrandChooseUs";
import BrandPrimaryHeader from "./components/BrandPrimaryHeader";
import BrandProcess from "./components/BrandProcess";
import BrandAudioPlayer from "./components/BrandAudioPlayer";

export default function BookPublishing() {
    const [openFAQ, setOpenFAQ] = useState(0);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqData = [
        { question: "How is self-publishing different from traditional publishing?", answer: "Yes, self-publishing your book means you own all the rights to it. Self-publishing is not like traditional publishing, where the authors relinquish their rights to their books." },
        { question: "Is self-publishing suitable for all genres?", answer: "Self-publishing can be effective in various genres. It is flexible whether you are writing fiction, nonfiction, poetry, or any other genre." },
        { question: "What is an ISBN, and do I need one?", answer: "An ISBN (International Standard Book Number) is a unique identifier for your book that retailers, libraries, and distributors use. If you intend to publish your book with any retailer like Amazon, Barnes & Noble, and others, you must have an ISBN.	" },
        { question: "Will I need to have the copyright of my published book?", answer: "You do not have to register your copyright rights for your book. You own the copyright the moment you put the words on paper. However, registering your copyright has several legal advantages. If you want to register the copyrights of your book, you have to consult with your attorney." },
        { question: "How long does it take to get a book published?", answer: "Whether you choose Amazon Kindle publishing or want to get your book on any other online retailer, the publishing process may take a few weeks to months. It depends on factors like manuscript complexity and the service package chosen." },
        { question: "Do I relinquish my rights if I publish my book with The Pine Book Publishing?", answer: "No. The terms and conditions that we will provide you in the contract for the publication of your book will state the process and procedures that will be followed, but the rights belong to you fully. Our publishing contract allows us to convert your intellectual property into a printed book or ebook ready for the public domain, but we do not get extra rights on it." },
        { question: "Can I make changes to my book after it gets published?", answer: "Yes. However, you must pay an additional fee to update the database and publish the revised version of your book. This fee also includes assigning the new ISBN." },
        { question: "What if there are certain things that I did not like about the publishing process?", answer: "We understand that there are certain things that individuals will not like about the self-publishing process, and here comes Pine Book Publishing. We are here to make your publishing journey easy. Our representative will work with you to assist you in the best possible way." }
    ];

    return (
        <>
            <Head>
                <title>Book Publishing | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Everything about Pine Book Publishing—your partner in crafting, editing, and publishing your story. Experience seamless service from manuscript to bookshelf."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <BrandNavbar />
            <BrandPrimaryHeader
                title="Publishing With A Personal Touch"
                desc="Whether you are a beginner or a professional writer, Pine Book Publishing can help you fine-tune your book publishing process and make sure that you have one less thing to worry about. "
            />
            <BrandBannerLogo />
            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-20">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h3 className="font-poppins text-2xl md:text-3xl uppercase">
                            Our Book Publishing
                        </h3>
                        <h2 className="font-poppins text-3xl md:text-4xl uppercase font-bold">Services</h2>
                        <p className="font-poppins text-xl text-justify	pt-3">
                            Have you ever felt like running in circles about self-publishing your book? Pine Book Publishing is here to guide you through the twists and turns of the book publishing process with professionalism and expertise.<br></br>
                            Our professional online book publishing services avail your works for self-publishing on various platforms. As professional book publishers, Pine Book Publishing will work closely with you to ensure your book meets the industry standards and will make it easy for you to self-publish a book on Amazon.<br></br>
                            But our support doesn’t end there. We will help you with everything that has to do with ISBNs, and indeed the overall publishing. We also provide the distribution and marketing services to get your book noticed by the right audience.
                        </p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/Publishing.png"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000" 
                        />
                    </div>
                </div>
                <p className="font-poppins text-xl text-justify	px-10 md:px-0" data-aos="fade-right">
                    When you have Pine Book Publishing on your corner you can be confident your book will find the right audience and create the stir it deserves in the world of readers. So, are you ready to team up with us and get your book published?
                </p>
            </div>

            {/* <BrandProcess /> */}
            <section className="brand-process  mx-auto relative pt-10 text-center flex justify-center mb-12 overflow-hidden">
                <div className="max-w-screen-xl">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl text-black font-poppins">HOW WE WORK</h3>
                        <h2 className="font-poppins text-3xl md:text-4xl text-black font-bold" data-aos="zoom-out-down">How Your Journey Looks With Us?</h2>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img1.png"} width={700} height={200} className=" pb-10" ></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Review:</h2>
                            <p className="para">First up, our team of experts will take a<br></br> close look at your manuscript. They’ll<br></br> give you detailed feedback on how to improve<br></br> its structure, content, and overall quality.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img2.png"} width={700} height={200} className=" pb-10" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Editing & Proofreading:</h2>
                            <p className="para">Next, our skilled editors will work closely <br></br> with you to polish your manuscript. They’ll<br></br> make sure it’s free of errors and ready to shine.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img3.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Cover Design:</h2>
                            <p className="para">Now, it’s time to get creative! We’ll team <br></br> up with you to design a cover that<br></br> captures the essence of your book. </p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img4.png"} width={700} height={200} className=" pb-10" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Formatting:</h2>
                            <p className="para">We’ll take care of all the technical stuff, like<br></br> formatting your manuscript to meet industry<br></br> standards. Whether it’s for digital e-book stores<br></br> or print, we’ll make sure it’s ready to hit the shelves.</p>
                        </div>
                    </div>

                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img5.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Getting an ISBN:</h2>
                            <p className="para">Every book needs its ID, right? Our team<br></br> will assign your book a unique ISBN. Think<br></br> of it as its passport for proper identification<br></br> and distribution.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img6.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Book Publishing:</h2>
                            <p className="para">Last but not least, our publisher will work<br></br> with you to make your book available on<br></br> the leading publishing platforms like Amazon<br></br> Kindle Publishing. </p>
                        </div>
                    </div>
                </div>

                {/* <div className="max-w-screen-xl d-block md:hidden">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl text-black font-poppins">HOW WE WORK</h3>
                        <h2 className="font-poppins text-3xl md:text-4xl text-black " data-aos="zoom-out-down">How Your Journey Looks With Us?</h2>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-1.webp"} width={700} height={200} className=" pb-10" ></Image>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-2.webp"} width={700} height={200} className=" pb-10" ></Image>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-3.webp"} width={700} height={200} className=" pb-10"></Image>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-4.webp"} width={700} height={200} className=" pb-10" ></Image>
                    </div>

                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-5.webp"} width={700} height={200} className=" pb-10"></Image>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-6.webp"} width={700} height={200} className=" pb-10"></Image>
                    </div>
                </div> */}
            </section>
            <section className="overflow-hidden" >
                <div className="brand-choose-us-section ms-auto relative left-0 md:left-52 px-12 md:px-20 mt-20 mb-8 py-10 " >
                    <div className="flex items-center flex-col md:flex-row" data-aos="fade-right" data-aos-delay="0" data-aos-duration="500">
                        <div className="basis-1/3 brand-choose-us-vector">
                            <Image src={"/brand-img/why-choose-us-img.webp"} width={350} height={200} className="brand-choose-us-img"></Image>
                        </div>
                        <div className="basis-1/3 md:ml-20">
                            <h2 className="text-white font-poppins text-3xl md:text-4xl uppercase mt-20 md:mt-0 font-bold" data-aos="zoom-in-left" data-aos-delay="100">Why Choose Us</h2>
                            <p className="text-white mt-2">There are many self-publishing companies and services out there, but the following are the things that make us different from others:  </p>
                            <div className="flex gap-10 mt-6">
                                <ul>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Personalized Approach </li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Expert Guidance </li>
                                    <li className="font-poppins flex items-center gap-3 text-sm"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Quality Assurance </li>
                                </ul>
                                <ul>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Timely Delivery</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Creative Collaboration</li>
                                    {/* <li className="font-poppins flex items-center gap-3 text-sm"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Pristine Publication</li> */}
                                </ul>
                            </div>
                            <BrandAudioPlayer src="/brand-img/why-choose-us-voice.wav" />
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
                                    {faqData.slice(colIndex * 4, (colIndex + 1) * 4).map((faq, index) => {
                                        const actualIndex = index + colIndex * 4;
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
