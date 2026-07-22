"use client";
import React, { useState } from "react";
import CountryPhoneInput from "./CountryPhoneInput";
import Image from "next/image";
import Link from "next/link";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/navigation';
import WavyText from "./WavyText";
import FadeIn from "./FadeIn";

export default function BrandHero() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Client Logos
    const clientLogos = [
        { href: "https://goo.gl/maps/D6kJBoXBJYwcZWkP7", src: "/brand-img/banner-logo2.png", alt: "LOGO", width: 180, height: 120 },
        { href: "https://www.bbb.org/ca/on/richmond-hill/profile/publishers-book/pine-book-writing-inc-0107-1406919", src: "/images/s2.png", alt: "LOGO", width: 130, height: 60 },
        { href: "https://www.trustpilot.com/review/pinebookwriting.com", src: "/images/s3.png", alt: "LOGO", width: 130, height: 60 },
        { href: "https://www.yelp.com/biz/pine-book-writing-richmond-hill", src: "/images/s4.png", alt: "LOGO", width: 130, height: 60 },
        { href: "https://clutch.co/profile/pine-book-writing", src: "/images/s6.png", alt: "LOGO", width: 130, height: 60 },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        const setters = { username: setUsername, email: setEmail, message: setMessage, phoneNumber: setPhoneNumber };
        if (setters[name]) setters[name](value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/send-contact-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    email,
                    phoneNumber,
                    message,
                    currentPage: typeof window !== "undefined" ? window.location.href : "",
                    referringPage: typeof document !== "undefined" ? document.referrer || "Direct visit" : "Direct visit",
                }),
            });

            const result = await res.json();

            if (result?.success) {
                setShowSuccess(true);
                setTimeout(() => router.push("/thank-you"), 1500);
                setTimeout(() => {
                    setShowSuccess(false);
                    setEmail("");
                    setUsername("");
                    setPhoneNumber("");
                    setMessage("");
                }, 3000);
            } else {
                alert("Error submitting form. Please try again.");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            alert("Error submitting form. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section className="brand-hero-section">
                <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28 pt-28">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h3 className="mb-4 text-2xl text-white font-poppins">
                            <span className="px-2 py-0">#1 Self</span> Publishing Company
                        </h3>
                        <WavyText text="Do you Have a Great Story? Let's Publish It" replay={true} className="text-3xl font-bold text-white font-poppins md:text-6xl" />
                        <p className="pt-4 text-xl text-white">
                            Have you started penning your story idea, but got stuck on your story’s next chapter? Nevermind! Self publishing a book can be sometimes a nightmare even for some great writers. However, Pine Book Publishing is your creative partner, offering hands-on support from the first word to the final cover.
                        </p>
                        <div className="flex items-center justify-start gap-2 mt-8 md:gap-x-8 client-logo-sec">
                            {clientLogos.map((logo, index) => (
                                <Link key={index} href={logo.href} target="_blank">
                                    <Image alt={logo.alt} src={logo.src} width={logo.width} height={logo.height} />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="lg:mt-0 lg:col-span-5 lg:flex brand-hero-banner-form">
                        <div className="w-full px-8 py-8 rounded-2xl">
                            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="username"
                                        onChange={handleChange}
                                        value={username}
                                        required
                                        className="w-full py-2 pl-4 pr-4 text-sm border shadow-xl rounded-xl"
                                        placeholder="Enter your Name"
                                    />
                                    <Image src="/brand-img/user-icon.png" width={14} height={14} className="absolute left-0 ml-4 top-3" alt="User Icon" />
                                </div>
                                <div className="relative">
                                    <CountryPhoneInput
                                        name="phoneNumber"
                                        onChange={handleChange}
                                        value={phoneNumber}
                                        required
                                        className="w-full py-2 pl-4 pr-4 text-sm border shadow-xl rounded-xl"
                                        placeholder="Enter your Phone"
                                    />
                                    <Image src="/brand-img/phone-icon.png" width={14} height={14} className="absolute left-0 ml-4 top-3" alt="Phone Icon" />
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="email"
                                        onChange={handleChange}
                                        value={email}
                                        required
                                        className="w-full py-2 pl-4 pr-4 text-sm border shadow-xl rounded-xl"
                                        placeholder="Enter your Email"
                                    />
                                    <Image src="/brand-img/email-icon.png" width={16} height={16} className="absolute left-0 ml-4 top-3" alt="Email Icon" />
                                </div>
                                <div className="relative">
                                    <textarea
                                        name="message"
                                        rows={5}
                                        onChange={handleChange}
                                        value={message}
                                        required
                                        placeholder="Enter your Message"
                                        className="w-full py-2 pl-4 pr-4 text-sm border shadow-xl rounded-xl"
                                    ></textarea>
                                    <FontAwesomeIcon icon={faPen} color="#747474" className="absolute left-0 ml-4 top-3" width={16} />
                                </div>
                                {showSuccess && <p className="px-1 py-2 text-green-700">Form submitted Successfully!</p>}
                                <button
                                    className="w-full p-4 text-xl text-white uppercase rounded shadow-xl header-submit-btn rounded-xl"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
