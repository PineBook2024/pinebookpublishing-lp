import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import BrandFooter from "./components/BrandFooter";
import BrandAbout from "./components/BrandAbout";
import BrandNavbar from "./components/BrandNavbar";
import BrandBannerLogo from "./components/BrandBannerLogo";
import BrandChooseUs from "./components/BrandChooseUs";
import BrandFaqs from "./components/BrandFaqs";
import BrandContact from "./components/BrandContactForm";
import BrandPrimaryHeader from "./components/BrandPrimaryHeader";
import BrandPortfolio from "./components/BrandPortfolio";
import BrandCTA from "./components/BrandCTA";
import BrandProcess from "./components/BrandProcess";
import PortfolioSlider1 from "./components/PortfolioSlider1";
import PortfolioSlider2 from "./components/PortfolioSlider2";
import PortfolioSlider3 from "./components/PortfolioSlider3";
import PortfolioSlider4 from "./components/PortfolioSlider4";
import PortfolioSlider5 from "./components/PortfolioSlider5";

export default function Portfolio() {
    const [openFAQ, setOpenFAQ] = useState(0);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqData = [
        { question: "How frequently is the portfolio updated with new projects?", answer: "We update our portfolio regularly to highlight our latest published works. As new books are released and added to our catalogue, you can expect to see them featured in our portfolio section." },
        { question: "Can I request to see specific examples of works in a certain genre or style?", answer: "Absolutely! We understand the importance of finding examples that resonate with your interests. Whether you're interested in fiction, non-fiction, or a specific genre, we're happy to provide relevant examples from our portfolio." },
        { question: "Do you provide author testimonials or reader feedback for the books featured in your portfolio?", answer: "Yes, we often include author testimonials and reader feedback alongside the books featured in our portfolio. These testimonials offer valuable insights into the collaborative process and the impact of each published work." },
        { question: "Can I learn more about the publishing process behind the books showcased in your portfolio?", answer: "Certainly! For each book featured in our portfolio, we provide a brief overview of the publishing journey, from manuscript submission to final publication. We're committed to transparency and happy to share insights into our process." },
        { question: "Can I contact you to discuss publishing my book or to inquire about specific titles in your portfolio?", answer: "Absolutely! Whether you're an aspiring author interested in self-publishing your book or a reader curious about the titles in our portfolio, we welcome inquiries and are here to assist you. Feel free to reach out to us via email or phone, and we'll be happy to help." },
    ];

    const badges = [
        { src: "/images/bage2.png", width: 100, height: 100 },
        { src: "/images/bage13.png", width: 100, height: 100 },
        { src: "/images/bage3.png", width: 100, height: 100 },
        { src: "/images/bage14.png", width: 100, height: 100 },
        { src: "/images/bage4.png", width: 100, height: 100 },
        { src: "/images/bage12.png", width: 100, height: 100 }
    ];
    return (
        <>
            <Head>
                <title>Our Shelf-Worthy Portfolio | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Featuring the succesful books that Pine Book Publishing has published for the authors. Let us also help you to take your book to the world!"
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <BrandNavbar />
            <BrandPrimaryHeader
                title="Peek Behind the Curtains to Our Proud Achievements"
                desc="Take a closer look at the hard work and dedication that lie behind each of our proud achievements."
            />
            <BrandBannerLogo />
            <PortfolioSlider4 />
            <PortfolioSlider1 />
            <PortfolioSlider2 />
            <PortfolioSlider3 />
            <PortfolioSlider5 />
            {/* <BrandPortfolio /> */}
            {/* <BrandProcess /> */}
            {/* <BrandCTA
                title="Hey, Wanna Talk?"
                desc="Ready to Talk? Reach out with your ideas or inquiries – we’re excited to listen and engage. Your message is the highlight of our day!"
                btntext="Speak to our Consultant"
            /> */}
            {/* <section className="brand-testimonials-section">
                <div className="max-w-screen-xl mx-auto px-4 my-20 relative py-22">
                    <div className="text-center mb-6">
                        <h2 className="font-poppins text-4xl text-black uppercase mb-3">Frequently Asked Questions</h2>
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
            </section> */}
            <BrandContact />
            <BrandFooter />
        </>
    );
}
