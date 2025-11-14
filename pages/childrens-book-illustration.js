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

export default function BookMarketing() {
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
                <title>Expert Children’s Book Illustration Services </title>
                <meta
                    name="description"
                    content="Bring your story to life with beautiful children’s book illustrations. Our artists create visuals that inspire and captivate young readers."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <BrandTopBar />
            <BrandNavbar />
            <BrandPrimaryHeader
                title="Children’s Book Illustration Services That Bring Stories to Life"
                desc="Make your children’s story shine with warm, colorful illustrations that capture hearts. Our talented illustrators create art that fits your book’s tone, age group, and message, helping young readers fall in love with every page they turn. Get a FREE quote today!"
            />
            <BrandBannerLogo />
            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-10">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h2 className="font-poppins text-3xl md:text-3xl uppercase font-bold">
                            Professional Children’s Book Illustration for Authors Worldwide</h2>
                        <p className="font-poppins text-xl	pt-3">
                            Every children’s book deserves pictures that tell as much as the words. At Pine Book Publishing, our illustrators specialize in creating expressive characters, vibrant scenes, and gentle tones that make young readers connect emotionally. We tailor the art style to your story’s theme, ensuring consistency and charm throughout.
                        </p>
                        <p className="font-poppins text-xl	pt-3">Whether you’re writing a bedtime story, a moral tale, or a fun adventure, our illustration team makes your vision come alive. With years of experience and top-quality design tools, we promise visuals that match your imagination and delight every reader. Still waiting? Contact our experts at Pine Book Publishing right away!</p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/childrens-book.png"} width={470} height={300}
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
                        <h2 className="font-poppins text-3xl md:text-4xl text-black font-bold" data-aos="zoom-out-down">6-Step Process of Our <br></br>Children’s Book Illustration</h2>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img1.png"} width={700} height={200} className=" pb-10" alt="process one" ></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Story & Style Discussion:</h2>
                            <p className="para">We begin by learning your story, tone, and<br></br> target age group to decide the right art style<br></br> and color palette.
                            </p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img2.png"} width={700} height={200} className=" pb-10" alt="process two" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Character Sketching:</h2>
                            <p className="para">Our illustrators design expressive character<br></br> sketches, showing emotions, features,<br></br> and charm that attract young readers.

                            </p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img3.png"} width={700} height={200} className=" pb-10" alt="process three"></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Scene Planning:</h2>
                            <p className="para">We carefully plan each scene through<br></br> detailed storyboards that ensure smooth<br></br> storytelling and perfect visual flow.
                            </p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img4.png"} width={700} height={200} className=" pb-10" alt="process four" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Final Illustrations:</h2>
                            <p className="para">Once sketches are approved, our artists<br></br> create high-resolution, full-color illustrations<br></br> that reflect your story’s heart.
                            </p>
                        </div>
                    </div>

                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img5.png"} width={700} height={200} className=" pb-10" alt="process five" ></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Revisions & Adjustments:</h2>
                            <p className="para">We value your feedback, refining each image<br></br> until the illustrations perfectly match your<br></br> creative expectations.

</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img6.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Final Delivery:</h2>
                            <p className="para">You receive polished illustrations in preferred <br></br>print or digital formats, ready for<br></br> publishing worldwide.</p>
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
