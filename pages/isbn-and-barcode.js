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
import BrandTopBar from "./components/BrandTopBar";

export default function ISBN() {
    const [openFAQ, setOpenFAQ] = useState(0);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqData = [
        { question: "What is an ISBN?", answer: "An ISBN (International Standard Book Number) is a unique 13-digit numeric commercial book identifier assigned to each digitally or traditionally published book. It helps retailers, libraries, and bookstores track books globally." },
        { question: "How long does the ISBN & barcode registration process take?", answer: "The exact time of the ISBN and barcode registration process depends on your country's ISBN registration agency's response. However, once the agency receives it, it usually takes a few business days. Our dedicated executive will keep you updated on the status of your ISBN application." },
        { question: "What is a barcode and why is it important?", answer: "A barcode is a traditional scannable representation of your book's ISBN, comprising black lines and white spaces of different widths. It helps quickly identify, track and manage your book using electronic scanners." },
        { question: "How much does your ISBN & barcode registration service cost?", answer: "We provide our ISBN & barcode registration service cost based on the details you provided and the number of ISBN (s) required. However, our pricing is affordable and transparent." },
        { question: "How many ISBNs do I need for a book?", answer: "Generally, you need one unique ISBN for each version or format of your book. For instance, if you publish your book in three formats, like Hardcover, paperback, and eBook, you will need three separate ISBNs. And if you will release a new edition (with significant changes or additions) of any format, you will need another ISBN. Feel free to contact us for further information." },
        { question: "Do ISBNs expire?", answer: "The answer is simple: ISBNs never expire." }
    ];

    return (
        <>
            <Head>
                <title>ISBN and Barcode Generation | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Need ISBN and Barcode for your book? Pine Book Publishing got you covered. Get the ISBN for your book right now in an affordable price with us."
                />
                <link rel="shortcut icon" href="/images/fav.png" />

            </Head>
            <BrandTopBar />
            <BrandNavbar />
            <BrandPrimaryHeader
                title="Identify Your Book with an Expert ISBN & Barcode Registration Services"
                desc="Are you a self-published author, a publishing company, or anyone struggling with ISBN and barcode acquisition for a book? If yes, don't go anywhere; we're here to handle this job's complexities. Our efficient yet fast-paced service ensures your book is uniquely identified and ready for publication and distribution. Contact us and experience a hassle-free process!"
            />
            <BrandBannerLogo />
            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-20">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h3 className="font-poppins text-2xl md:text-3xl uppercase">
                            ISBN & Barcode Simplified
                        </h3>
                        <h2 className="font-poppins text-3xl md:text-4xl uppercase font-bold">Offering Book Identification Solutions for Every Format</h2>
                        <p className="font-poppins text-xl	pt-3">
                            If you are a self-published author or a publishing company, you need an ISBN (International Standard Book Number) and barcode (derived from ISBN) to classify your book and simplify its distribution. These identifiers are crucial for bookstores, libraries, and online retailers to properly track and manage your book.
                        </p>
                        <p className="font-poppins text-xl	pt-3">
                            Pine Book Publishing takes pride in offering reliable and fast ISBN & barcode generation to help individual authors and publishing firms worldwide. Whether your book is in paperback, Hardcover, or eBook format and whether you require a single ISBN & barcode image or in bulk, we're here to help. Our experienced professionals will guide you through every step of the way and ensure that your book precisely acquires a unique identity and is ready for publication on many popular publishing platforms, such as Amazon, Barnes & Noble, Lulu, IngramSpark, and others. We maintain our result-driven approach and commitment to customer satisfaction to make our services hassle-free for everyone. Contact Pine Book Publishing to learn more about our services.                         </p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/isbn-img.png"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                </div>
            </div>
            {/* <BrandProcess /> */}
            <section className="brand-process  mx-auto relative pt-10 text-center flex justify-center mb-12 overflow-hidden">
                <div className="max-w-screen-xl">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl text-black font-poppins">Our Service Workflow</h3>
                        <h2 className="font-poppins text-3xl md:text-4xl text-black font-bold" data-aos="zoom-out-down">6-Step Process of Our <br></br>ISBN & Barcode Registration Service</h2>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img1.png"} width={700} height={200} className=" pb-10" ></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">  Initial Consultation:</h2>
                            <p className="para">Our process begins with a consultation to<br></br> understand your needs, including book<br></br> format, number of ISBN(s), and the genre.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img2.png"} width={700} height={200} className=" pb-10" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Data Collection:</h2>
                            <p className="para">We'll ask you to provide the essential<br></br> elements to create a unique ISBN and<br></br> barcode to give your book a unique identity.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img3.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">ISBN Assignment:</h2>
                            <p className="para">One of our Professionals will assign a unique<br></br> ISBN to your book. We'll also ensure it<br></br> complies with international standards.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img4.png"} width={700} height={200} className=" pb-10" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Barcode Generation:</h2>
                            <p className="para">Next, we merge your book's assigned<br></br> ISBN with a scannable barcode that will be<br></br> compatible with various retail systems.</p>
                        </div>
                    </div>

                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img5.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Quality Assurance:</h2>
                            <p className="para">Before the delivery, we thoroughly review<br></br> your ISBN to ensure its functionality and<br></br> accuracy across different platforms.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img6.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">  Delivery & Support:</h2>
                            <p className="para">You'll receive your Print-ready ISBN and<br></br> barcode files for your book. We also<br></br> offer ongoing support to integrate it properly.</p>
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
                            <h2 className="text-white font-poppins text-3xl md:text-4xl uppercase mt-20 md:mt-0 font-bold" data-aos="zoom-in-left" data-aos-delay="100">Why Choose Us for ISBN & Barcode Registration?</h2>
                            <p className="text-white mt-2">At Pine Book Publishing, we offer a hassle-free, swift and expert ISBN & barcode registeration process. We utilize our expertise and bespoke approach to ensure your book is correctly identified and ready for distribution in on-go. By leveraging our expertise, you can feel free to focus on your writing while we handle all the technicalities.</p>
                            <div className="flex gap-10 mt-6">
                                <ul>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Expert Guidance</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Efficient Process</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Accurate Registeration</li>
                                </ul>
                                <ul>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Competitive Pricing</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Hassle-free Experience</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Ongoing Support</li>
                                </ul>
                            </div>
                            <BrandAudioPlayer src="/brand-img/why-choose-us-voice.wav" />
                            {/* <button className="brand-nav-btn-white bg-white shadow-xl md:mt-10 mt-4 cursor-pointer ml-2 md:ml-3"><Link href='tel:(888) 786-7135'>Call Now</Link></button> */}
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
