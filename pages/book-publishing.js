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
import Link from "next/link";
import BrandTopBar from "./components/BrandTopBar";

export default function BookPublishing() {
    const [openFAQ, setOpenFAQ] = useState(0);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const handleOpenChat = () => {
        window.zE && window.zE('webWidget', 'open');
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
                <title>Expert Book Publishing Services | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Discover the art of book publishing with our Expert Book Publishing Services. Our expert team guides you through the process, from editing to distribution."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <BrandTopBar />
            <BrandNavbar />
            <BrandPrimaryHeader
                title="Quality. Creativity. Passion – Our Book Publishing Service Has It All!"
                desc="Whether you are a beginner or a professional book author, Pine Book Publishing can help you every step of the way of book publishing.  We can help you fine-streamline the publishing process with our immense passion for providing creative and quality services and enabling you to focus on your main core."
            />
            <BrandBannerLogo />
            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-10">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h3 className="font-poppins text-2xl md:text-3xl uppercase">
                            Unveil Your Story with An Expert
                        </h3>
                        <h2 className="font-poppins text-3xl md:text-4xl uppercase font-bold">Book Publishing Company</h2>
                        <p className="font-poppins text-xl	pt-3">
                            Have you ever felt like running in circles about self-publishing your book? Pine Book Publishing is here to guide you through the twists and turns of the book publishing process with professionalism and expertise.
                        </p>
                        <p className="font-poppins text-xl	pt-3">Our professional online book publishing services make your works available for self-publishing on all popular platforms. As professional book publishers, Pine Book Publishing will work together with you to be sure your book meets industry standards and will make it easy for you to self-publish a book on Amazon.</p>
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
                <p className="font-poppins text-xl px-10 md:px-0" data-aos="fade-right">
                    Our services are not limited to publishing, but we help you with everything related to ISBN registration. We also provide online and traditional book distribution and marketing services to get your book to the right audience.<br></br>
                    So, if you are looking for an expert book publishing company that can help you exhibit your book to your potential readers, Pine Book Publishing is your destination. Don't wait anymore! Contact us to get a free quote!
                </p>
            </div>

            {/* <BrandProcess /> */}
            <section className="brand-process  mx-auto relative pt-10 text-center flex justify-center mb-12 overflow-hidden">
                <div className="max-w-screen-xl">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl text-black font-poppins">Our Service Workflow</h3>
                        <h2 className="font-poppins text-3xl md:text-4xl text-black font-bold" data-aos="zoom-out-down">6-Step Process of Our <br></br>Book Publishing Services</h2>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img1.png"} width={700} height={200} className=" pb-10" alt="process one" ></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Manuscript Review:</h2>
                            <p className="para">Our process starts by reviewing your<br></br> manuscript and providing feedback on the<br></br> design layout, content, and structure.
                            </p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img2.png"} width={700} height={200} className=" pb-10" alt="process two" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Manuscript Refining:</h2>
                            <p className="para">Then, our skilled editors make the necessary<br></br> changes/edits to ensure your draft<br></br> has no grammatical or structural flaws.
                            </p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img3.png"} width={700} height={200} className=" pb-10" alt="process three"></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Cover Design:</h2>
                            <p className="para">In this phase, our team of graphic designers<br></br> crafts an eye-catching cover that can draw<br></br> your readers' attention quickly.
                            </p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img4.png"} width={700} height={200} className=" pb-10" alt="process four" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Formatting:</h2>
                            <p className="para">Now, it’s time to format your book. We<br></br> handle everything, from typesetting and<br></br> interior designing to chapter alignment.
                            </p>
                        </div>
                    </div>

                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img5.png"} width={700} height={200} className=" pb-10" alt="process five" ></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Final Delivery:</h2>
                            <p className="para">Lastly, we help you get your book's identity<br></br> by registering a unique ISBN to make it<br></br> easily accessible among many others.</p>
                        </div>
                    </div>
                    {/* <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img6.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Book Publishing:</h2>
                            <p className="para">Last but not least, our publisher will work<br></br> with you to make your book available on<br></br> the leading publishing platforms like Amazon<br></br> Kindle Publishing. </p>
                        </div>
                    </div> */}
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
                <div className="brand-choose-us-section ms-auto relative left-0 md:left-52 px-12 md:px-20 mt-20 mb-8  " >
                    <div className="flex items-center flex-col md:flex-row" data-aos="fade-right" data-aos-delay="0" data-aos-duration="500">
                        <div className="basis-1/3 brand-choose-us-vector">
                        <Image src={"/brand-img/Why Choose Us 2.png"} width={750} height={750}
                                loading="lazy"
                                alt="about img"
                                className="brand-about-img"
                            />
                        </div>
                        <div className="basis-1/3 md:ml-20">
                            <h2 className="text-white font-poppins text-3xl md:text-4xl uppercase mt-20 md:mt-0 font-bold" data-aos="zoom-in-left" data-aos-delay="100">Why Choose Our Book Publishing Services?</h2>
                            <p className="text-white mt-2">There are many self-publishing companies and services out there, but the following are the things that make us different from others:</p>
                            <div className="flex gap-10 mt-6">
                                <ul>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} alt="check icon" className="icon" width={13} height={13} />Personalized Approach </li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} alt="check icon" className="icon" width={13} height={13} />Expert Guidance </li>
                                    <li className="font-poppins flex items-center gap-3 text-sm"><Image src={"/images/check-mark.png"} alt="check icon" className="icon" width={13} height={13} />Quality Assurance</li>
                                </ul>
                                <ul>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} alt="check icon" className="icon" width={13} height={13} />Timely Delivery</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} alt="check icon" className="icon" width={13} height={13} />Creative Collaboration</li>
                                    {/* <li className="font-poppins flex items-center gap-3 text-sm"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Pristine Publication</li> */}
                                </ul>
                            </div>
                            <button className="brand-nav-btn-white bg-white shadow-xl md:mt-10 mt-4 cursor-pointer ml-2 md:ml-3" onClick={handleOpenChat}><Link href={'javascript:;'}>Speak to our Consultant</Link></button>
                            <button className="brand-nav-btn-white bg-white shadow-xl md:mt-10 mt-4 cursor-pointer ml-2 md:ml-3"><Link href='tel:(888) 786-7135'>Call Now</Link></button>
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
