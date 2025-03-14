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
import BrandAudioPlayer from "./components/BrandAudioPlayer";
import BrandTopBar from "./components/BrandTopBar";

export default function BookFormatting() {
    const [openFAQ, setOpenFAQ] = useState(0);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };
    const handleOpenChat = () => {
        window.zE && window.zE('webWidget', 'open');
    };

    const faqData = [
        { question: "What is book formatting and why is it important?", answer: "Book formatting is the method of converting your manuscript into a fascinating and readable book. We work closely on all aspects, like font styling, chapter layouts, and line spacing. A well-formatted book looks professional and takes the reader to its last page." },
        { question: "How long does the book formatting process take?", answer: "The exact duration of the book formatting completely depends on your book's length, complexity, and other preferences. However, it usually takes anywhere from 4 to 7 working days. We always strive to deliver your project within the promised timeline." },
        { question: "How much does e-book and print book formatting cost?", answer: "The pricing of book formatting completely depends on your specific needs and requirements. We consider multiple factors like book length, genre, complexity, as well as the desired timeline to decide the exact cost. However, we offer transparent yet competitive pricing to cater to the formatting needs of every level." },
        { question: "Do you offer book formatting software or templates?", answer: "No, we do not offer any book formatting software. However, our team of experts leverages advanced tools to achieve top-notch outcomes. We also do not provide any book formatting templates, as every book has different attributes and requires a unique formatting method." },
        { question: "Why do I need to have my book professionally formatted?", answer: "Your book's story might be fascinating, but nobody would want to read it if it is represented poorly. Book formatting is a complete skill required to set a book right according to the standard formatting guidelines, make your book readable and look professional, and get publication success on different popular platforms." },
        { question: "Can you help with book cover design in addition to formatting?", answer: "Absolutely! As an expert book publishing company, we work on various aspects that come under the publishing process. We have a dedicated team of book cover designers onboard who can craft stunning book covers that can turn your audience's head within a second." }
    ];

    return (
        <>
            <Head>
                <title>Top-notch book formatting services| Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Get Custom Book Formatting Services from Pine Book Publishing to ensure your book meets all the publishing standards. Fast, reliable, and affordable."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <BrandTopBar />
            <BrandNavbar />
            <BrandPrimaryHeader
                subtitle="Enhance Your Book's Readability With"
                title="Professional Book Formatting Services"
                desc="Are you in search of expert book formatting services to get your manuscript formatted well? If so, then we're here to help. At Pine Book Publishing, we offer professional book formatting services to blow life into your book. Our expert team of book formatters will work together with you to give your book a professional and polished look. Get a free quote now!"
            />
            <BrandBannerLogo />
            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-10">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h2 className="font-poppins text-3xl md:text-4xl uppercase font-bold">
                            Pine Book Publishing – <br></br>
                            A leading Book Formatting Company</h2>
                        <p className="font-poppins text-xl	pt-3">
                            If you have finished your manuscript and are tired of looking at the screen for many hours, struggling to bring your manuscript in a professional format that meets industry standards, hiring a professional book formatting company is the only option you should choose. We at <Link href={"https://pinebookpublishing.com/"} target="_blank">Pine Book Publishing</Link> are your trusted book formatting partner. With intense familiarity with publishing industry standards, we offer you comprehensive book formatting solutions for various popular publishing platforms.
                        </p>
                        <p className="font-poppins text-xl	pt-3">Our team of expert professionals works together to craft flawless layouts, accurate typography, and consistent formatting to help enhance your book's visual appeal. They deal with every aspect carefully, including specific table of contents, word length, number of pages, fonts, line spacing, and everything that affects the visual appearance of the book. We take pride in delivering top-notch results that always exceed our clients' expectations.</p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/Formatting.png"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                </div>
                <p className="font-poppins text-xl px-10 md:px-0" data-aos="fade-right">
                    Whether you're a first-time author, a professional writer, or a self-publishing freak, we've all-inclusive solutions for all your formatting needs.
                </p>
            </div>


            <section className="brand-process  mx-auto relative pt-10 text-center flex justify-center mb-12 overflow-hidden">
                <div className="max-w-screen-xl">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl text-black font-poppins">Our Service Workflow</h3>
                        <h2 className="font-poppins text-3xl md:text-4xl text-black font-bold" data-aos="zoom-out-down">6-Step Process of Our <br></br> Book Formatting Services</h2>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img1.png"} width={700} height={200} className=" pb-10" alt="process one" ></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Assessment:</h2>
                            <p className="para">We begin with thoroughly analyzing your<br></br> manuscript. Understand its specific style,<br></br> and choose the best formatting approach<br></br> that matches your vision.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img2.png"} width={700} height={200} className=" pb-10" alt="process two" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Formatting Design:</h2>
                            <p className="para">Then, our expert designers get to work<br></br> and craft a stunning layout that matches<br></br> your book's content and genre and <br></br> meets industry standards.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img3.png"} width={700} height={200} className=" pb-10" alt="process three" ></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Customization:</h2>
                            <p className="para">After the design, we adjust your book's <br></br> format to your specific preferences. This<br></br> includes font styles, chapter headings,<br></br> and page numbers.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img4.png"} width={700} height={200} className=" pb-10" alt="process four" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Content Organization:</h2>
                            <p className="para">In this step, we carefully structure your<br></br> book's entire content, Including your book's<br></br> chapters, sections, and headings for<br></br> excellent readability and flow.</p>
                        </div>
                    </div>

                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img5.png"} width={700} height={200} className=" pb-10" alt="process five" ></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Quality Check:</h2>
                            <p className="para">Then, our quality assurance team gets into<br></br> action. Your book goes through the keen<br></br> eyes of experts to ensure flawless formatting,<br></br> typography, and adherence to industry standards.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img6.png"} width={700} height={200} className=" pb-10" alt="process six" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Delivery:</h2>
                            <p className="para">In the last step, we deliver your perfectly<br></br> formatted book in your preferred format,<br></br> including print-ready options to satisfy<br></br> your publishing needs.</p>
                        </div>
                    </div>
                </div>

            </section>
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
                            <h2 className="text-white font-poppins text-3xl md:text-4xl uppercase mt-20 md:mt-0 font-bold" data-aos="zoom-in-left" data-aos-delay="100">Why Choose Our Book Formatting Service?</h2>
                            <p className="text-white mt-2">At Pine Book Publishing, we're passionate about what we do. Our steadfast team of professionals works tirelessly to deliver accuracy, speed, and premium quality work. </p>
                            <div className="flex gap-10 mt-6">
                                <ul>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" alt="check icon" width={13} height={13} />A Team of Experts</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" alt="check icon" width={13} height={13} />On-time Delivery</li>
                                    {/* <li className="font-poppins flex items-center gap-3 text-sm"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Expert Craftsmanship</li> */}
                                </ul>
                                <ul>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" alt="check icon" width={13} height={13} />Multiple Formats</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" alt="check icon" width={13} height={13} />Author-focus Approach</li>
                                    {/* <li className="font-poppins flex items-center gap-3 text-sm"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Pristine Publication</li> */}
                                </ul>
                            </div>
                            {/* <BrandAudioPlayer src="/brand-img/why-choose-us-voice.wav" /> */}
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
