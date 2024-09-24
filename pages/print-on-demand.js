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

export default function PrintDemand() {
    const [openFAQ, setOpenFAQ] = useState(0);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqData = [
        { question: "What does book print on demand mean?", answer: "In our book print-on-demand (POD) services, we print your book as per your reader’s demand. Whether you require a single book or a bundle of 1000 books, we print and deliver the book(s) at the doorstep of the reader." },
        { question: "How do your book print-on-demand services work?", answer: "Our process starts with your signup. Then, you simply upload your book with all the necessary assets. When your reader orders the book, we immediately take it to the printing process, bind it, and ship it to your reader’s destination." },
        { question: "How long will it take for my order to be delivered?", answer: "Our order processing and delivery time may vary depending on different factors like your book’s size, binding type, and your customer’s delivery address. Usually, our orders are delivered within 4 to 8 business days. In order to get an estimate of the delivery time, you may contact our customer service team." },
        { question: "How much does your book Print on demand services cost?", answer: "The cost of our book print on demand services may differ based on your book’s size, paper & binding type, as well as the delivery address. However, we provide transparent and competitive pricing before proceeding with your order." },
        { question: "Which binding options are available at Pine Book Publishing?", answer: "At Pine Book Publishing, we have a complete range of binding options to choose from. You may choose from paperback and hardcover to saddle stitch and spiral binding. Each option has its own specialty and feel." },
        // { question: "What pricing options are available for your services?", answer: "We offer competitive pricing packages tailored to fit your budget and project needs. Our rates are transparent, and we're happy to provide a detailed quote based on the specific services you require." }
    ];

    return (
        <>
            <Head>
                <title>Print On Demand Services | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Want a physical copy of your book? Pine Book Publishing's print on demand services is all you need. We deliver the quality with speed. "
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <BrandNavbar />
            <BrandPrimaryHeader
                title="Maximize Your Book Sales with Expert Print On-Demand Services"
                desc="Don't let your book sales stop anywhere by hiring our fast and efficient book print-on-demand services to ensure your books are always in stock for your readers. At Pine Book Publishing, we handle everything from designing, editing, printing, and shipping within the promised delivery time."
            />
            <BrandBannerLogo />
            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-10">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h3 className="font-poppins text-2xl md:text-3xl uppercase">
                            Hassle-Free Print-On-Demand
                        </h3>
                        <h2 className="font-poppins text-3xl md:text-4xl uppercase font-bold">Services</h2>
                        <p className="font-poppins text-xl pt-3">
                            Print On Demand (POD) is specially designed for self-published authors who want to avoid seeing their readers long-awaited for the next stock in bulk and want to stock a huge quantity of books every once. At Pine Book Publishing, we offer fast and efficient Print-On-Demand services to help authors focus on their writing and increase their profitability without any hassle.
                        </p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/Print on Demand.png"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                </div>
                <p className="font-poppins text-xl text-justify	px-10 md:px-0" data-aos="fade-right">
                    Our POD services eliminate the need to invest extra money in stock in order to minimize financial risks. Once you receive an order from your customer, we will print your book and ship it directly to your customer. You can order as many or as few books (minimum 1) on your readers’ order. This incredible service not only saves you storing a bulk of books and shipping costs but also the time that you require the most for your writing. By hiring our Print On Demand services, you can ensure that your book is always available for your audience, regardless of where they are worldwide.
                </p>
            </div>
            {/* Process */}
            <section className="brand-process  mx-auto relative pt-10 text-center flex justify-center mb-12 overflow-hidden">
                <div className="max-w-screen-xl">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl text-black font-poppins">Our Service Workflow</h3>
                        <h2 className="font-poppins text-3xl md:text-4xl text-black font-bold" data-aos="zoom-out-down">6-Step Process of Our Book<br></br> Print On Demand Services</h2>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img1.png"} width={700} height={200} className=" pb-10" ></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Project Signup:</h2>
                            <p className="para">Sign up for book print-on-demand services.<br></br> Our customer services specialist will get to<br></br> you to understand your book printing needs.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img2.png"} width={700} height={200} className=" pb-10" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Format Selection:</h2>
                            <p className="para">Next, you choose the format in which you<br></br> want your book printed, such as paperback,<br></br> hardcover, picturebook, comic, or magazine.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img3.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Asset Collection:</h2>
                            <p className="para">In this step, you provide us with your book<br></br> cover and other graphical assets. We also<br></br> help design the required assets for you.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img4.png"} width={700} height={200} className=" pb-10" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Manuscript Refining:</h2>
                            <p className="para">Once we discover your project, we format<br></br> your manuscript according to the<br></br> standards of book printing.</p>
                        </div>
                    </div>

                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img5.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-xl">Book Printing:</h2>
                            <p className="para">Then, our team of professionals takes your<br></br> book to the printing process using<br></br> premium-quality materials.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img6.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-xl">Delivery:</h2>
                            <p className="para">In the last step, we carefully pack your<br></br> books in robust packaging and ship them <br></br>directly to your customer’s doorstep.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* <BrandChooseUs /> */}
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
                            <h2 className="text-white font-poppins text-3xl md:text-4xl uppercase mt-20 md:mt-0 font-bold" data-aos="zoom-in-left" data-aos-delay="100">Why Choose Our Book Pring On Demand Services?</h2>
                            <p className="text-white mt-2">Take full advantage of our fast and efficient book Print-On-Demand services to simplify your book writing and publishing journey. At Pine Book Publishing, we offer seamless book printing solutions, enabling you to focus on writing while we handle the rest.</p>
                            <div className="flex gap-10 mt-6">
                                <ul>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />No Inventory</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Low Startup Costs</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Global Reach</li>
                                </ul>
                                <ul>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Fast Turnaround Time</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />High-Quality Printing</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Excellent Customer Support</li>
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
