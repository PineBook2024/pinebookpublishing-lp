import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Autoplay,
    Pagination,
    Navigation,
    EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function BrandFaqs() {
    const swiperRef = useRef();

    const [openFAQ, setOpenFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqData = [
        { question: "How do I self-publish my book?", answer: "Self-publishing your book with Pine Book Publishing is simple. Start by submitting your manuscript, and our team will guide you through the editing, formatting, and cover design process." },
        { question: "Is publishing a book difficult?", answer: "Publishing a book doesn't have to be difficult, especially with Pine Book Publishing's support." },
        { question: "What is an ISBN and do I need one?", answer: "An ISBN (International Standard Book Number) is a unique identifier for your book used by retailers, libraries, and distributors." },
        { question: "Will I need to have my book copyrighted?", answer: "While your book is automatically copyrighted upon creation, registering your copyright provides additional legal protection." },
        { question: "Do you offer design services?", answer: "Yes, Pine Book Publishing offers comprehensive design services, including cover design, typesetting, and layout adjustment." },
        { question: "How do you handle distribution and marketing of books?", answer: "Pine Book Publishing handles distribution and marketing for your books, ensuring they reach the widest audience possible." }
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
            <section className="brand-testimonials-section">
                <div className="max-w-screen-xl mx-auto px-4 my-20 relative py-22">
                    <div className="text-center mb-6">
                        <h2 className="font-majallab text-5xl text-black uppercase mb-3">Frequently Asked Questions</h2>
                        <h3 className="text-xl text-black font-poppins uppercase font-bold">each Out to Us for Further Assistance.</h3>
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
                                                    {/* <FontAwesomeIcon icon={openFAQ === actualIndex ? faMinusCircle : faArrowDown} color="#2c9384" /> */}
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
        </>
    );
}