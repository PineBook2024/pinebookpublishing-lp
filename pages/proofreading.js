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

export default function Proofreading() {
    const [openFAQ, setOpenFAQ] = useState(0);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const handleOpenChat = () => {
        window.zE && window.zE('webWidget', 'open');
    };

    const faqData = [
        { question: "What is the difference between book editing and book proofreading?", answer: "Book editing and book proofreading are two different phases of book production. Book Editing entails a critical evaluation of your book by professional editors, though the main concern is the arrangement and presentation of the book. On the other hand, book proofreading is the last stage and includes checking for grammar, punctuation or spelling mistakes before going to the publishing house." },
        { question: "Which software will you use to proofread my book?", answer: "When it comes to such kind of work, our proofreaders do not need to use special software. They go through it to ensure that the various points raised in the manuscript have been appropriately formatted." },
        { question: "Do I need a proofreading service if I’ve already signed up for editing?", answer: "Yes! Nevertheless, proofreading is vital even when the document has been edited. It checks for remaining errors and makes the final product as perfect as possible." },
        { question: "Can I proofread my book by myself?", answer: "While self-proofreading is indeed possible, it could sometimes result in missing some errors, given that the person is already familiar with the text. Professional proofreading services can offer detailed feedback and extensive error detection." },
        { question: "How quickly can I get my book to be proofread?", answer: "Our professionals take a few days or weeks to proofread a book. However, the exact time depends on the length and complexity of your manuscript.	" },
        { question: "Are your Proofreading Services confidential?", answer: "Yes, Pine Book Publishing respects your manuscript by handling it under high confidentiality. We ensure that we have NDAs with every client who engages with us. Any information you provide will only be accessed by your proofreader and the specific project manager working on your order." }
    ];

    return (
        <>
            <Head>
                <title>Professional book proofreading Services | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Your work can be improved with the help of a professional book proofreading service. Our professional proofreaders guarantee that your book is perfect and free of errors."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <BrandTopBar />
            <BrandNavbar />
            <BrandPrimaryHeader
                title="Your Words, Our Expertise – Expert Book proofreading services"
                desc="Your reader might be distracted by even the slightest spelling error. To prevent this problem, you need to hire a professional proofreading service to help you identify the issues that cause your book to have a bumpy ride and ensure its maximum readability. You can count on us to make your manuscript flawless."
            />
            <BrandBannerLogo />
            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-10">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h2 className="font-poppins text-3xl md:text-4xl uppercase font-bold">
                            Perfect Your Manuscript with Flawless <br></br>
                            Grammar & Zero Typos</h2>
                        <p className="font-poppins text-xl	pt-3">
                            Have you ever been reading a book and come across a typo or an awkward construction that pulled you out of the story? It is important to do everything possible to eliminate even minor errors that can distract the reader from the material. Writing a book is a big thing, and after spending so much time on your story, you don’t want readers to be distracted by errors. Pine Book Publishing is here to help you avoid these problems. We know you want your book to look its best and be easy to read. Our team of experienced proofreaders will catch the mistakes you might miss. We give your text a careful look to make sure it’s clean and polished.
                        </p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/Proofreading.png"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                </div>
                <p className="font-poppins text-xl	px-10 md:px-0" data-aos="fade-right">
                    Choosing our Book proofreading service is a smart investment in your book. Let us take care of the fine details to present your book in the manner that it deserves. It is our mission to assist you in creating a book that people are going to read over and over and recommend to their friends.                </p>
            </div>
            {/* <BrandProcess /> */}
            <section className="brand-process  mx-auto relative pt-10 text-center flex justify-center mb-12 overflow-hidden">
                <div className="max-w-screen-xl">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl text-black font-poppins">Our Service Workflow</h3>
                        <h2 className="font-poppins text-3xl md:text-4xl text-black font-bold" data-aos="zoom-out-down">6-Step Process of Our<br></br> Book Proofreading Services</h2>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img1.png"} width={700} height={200} className=" pb-10" ></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Manuscript Submission:</h2>
                            <p className="para">Share your document with us, and we'll match<br></br> it with one of our expert proofreaders for a<br></br> thorough review and constructive feedback.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img2.png"} width={700} height={200} className=" pb-10" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Assessment:</h2>
                            <p className="para">Our proofreaders will analyze your document,<br></br> identifying its strengths and areas for improvement<br></br> while examining its structure, flow, and clarity.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img3.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Revisions:</h2>
                            <p className="para">Post-assessment, we'll refine your document,<br></br> correcting any spelling, grammar, punctuation,<br></br> or syntax issues, and ensuring everything is<br></br> consistent and cohesive.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img4.png"} width={700} height={200} className=" pb-10" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Quality Check:</h2>
                            <p className="para">The team conducts a quality check, reviewing<br></br> your document with fresh eyes to ensure<br></br> it meets the highest standards of accuracy<br></br> and excellence.</p>
                        </div>
                    </div>

                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img5.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Final Check & Delivery:</h2>
                            <p className="para">Before we wrap things up, our editors<br></br> will do a final quality check to make sure<br></br> your manuscript is completely ready for<br></br> publication.</p>
                        </div>
                    </div>
                    {/* <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img6.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Delivery:</h2>
                            <p className="para">Finally, we perform a last review to ensure<br></br> your document is error-free and perfectly<br></br> polished, ready for publication.</p>
                        </div>
                    </div> */}
                </div>

                {/* <div className="max-w-screen-xl d-block md:hidden">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl text-black font-poppins">HOW WE WORK</h3>
                        <h2 className="font-poppins text-3xl md:text-4xl text-black " data-aos="zoom-out-down">OUR PROCESS</h2>
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
                <div className="brand-choose-us-section ms-auto relative left-0 md:left-52 px-12 md:px-20 mt-20 mb-8" >
                    <div className="flex items-center flex-col md:flex-row" data-aos="fade-right" data-aos-delay="0" data-aos-duration="500">
                        <div className="basis-1/3 brand-choose-us-vector">
                            <Image src={"/brand-img/Why Choose Us 2.png"} width={750} height={750}
                                loading="lazy"
                                alt="about img"
                                className="brand-about-img"
                            />
                        </div>
                        <div className="basis-1/3 md:ml-20">
                            <h2 className="text-white font-poppins text-3xl md:text-4xl uppercase mt-20 md:mt-0 font-bold" data-aos="zoom-in-left" data-aos-delay="100">Why Choose Our Book Proofreading Services?</h2>
                            <p className="text-white mt-2">Our expert team of proofreaders will certainly give that professional touch to your book to make it both absolutely error-free and of the highest impact. Precisely, you get:</p>
                            <div className="flex gap-10 mt-6">
                                <ul>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Expert Proofreaders & Editors</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Timely Turnaround</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Personalized Feedback</li>
                                </ul>
                                <ul>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Rigorous Quality Checks</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />24/7 Customer Support</li>
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
