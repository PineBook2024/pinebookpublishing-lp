"use client";
import React, { useState } from "react";
import CountryPhoneInput from "./CountryPhoneInput";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FadeIn from "./FadeIn";
// import SnowFall from "./SnowFall"; // optional, uncomment if needed

export default function BrandHeroFriday() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [phoneError, setPhoneError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const clientLogos = [
        { href: "https://goo.gl/maps/D6kJBoXBJYwcZWkP7", src: "/images/Google Partner.png", alt: "LOGO", width: 150, height: 120 },
        { href: "https://www.bbb.org/ca/on/richmond-hill/profile/publishers-book/pine-book-writing-inc-0107-1406919", src: "/images/s2.png", alt: "LOGO", width: 130, height: 60 },
        { href: "https://www.trustpilot.com/review/pinebookwriting.com", src: "/images/s3.png", alt: "LOGO", width: 130, height: 60 },
        { href: "https://www.yelp.com/biz/pine-book-writing-richmond-hill", src: "/images/s4.png", alt: "LOGO", width: 130, height: 60 },
        { href: "https://clutch.co/profile/pine-book-writing", src: "/images/s6.png", alt: "LOGO", width: 130, height: 60 },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        const setters = { fullName: setFullName, email: setEmail, message: setMessage, phoneNumber: setPhoneNumber };

        if (setters[name]) {
            if (name === "phoneNumber") {
                const phoneRegex = /^\d{0,}$/;
                if (phoneRegex.test(value)) {
                    setters[name](value);
                    setPhoneError(value.length < 9 ? "Phone number must be at least 9 digits" : "");
                } else {
                    setPhoneError("Invalid phone number format");
                }
            } else {
                setters[name](value);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (phoneNumber.length < 9) {
            setPhoneError("Phone number must be at least 9 digits");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/send-contact-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, phoneNumber, message }),
            });
            const result = await res.json();

            if (result?.success) {
                setShowSuccess(true);
                setTimeout(() => router.push("/thank-you"), 1500);
                setTimeout(() => {
                    setShowSuccess(false);
                    setFullName("");
                    setEmail("");
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
        <div className="relative w-full overflow-hidden" style={{ zIndex: 1 }}>
            {/* <SnowFall /> */}
            <div className="container relative z-10 max-w-screen-xl px-4 pt-20 mx-auto tablet-margin-banner brand-hero-section">
                <div className="grid items-center justify-between grid-cols-1 text-left sm:gap-8 sm:py-0 md:grid-cols-2 md:gap-8 md:py-36">
                    <div className="mb-4">
                        <h3 className="mb-4 text-2xl text-white font-poppins">
                            <span className="px-2 py-0">#1 Self</span> Publishing Company
                        </h3>
                        <FadeIn>
                            <h1 className="text-3xl font-bold text-white font-poppins md:text-3xl">
                                DO YOU HAVE A MANUSCRIPT READY TO BE PUBLISHED?
                            </h1>
                        </FadeIn>
                        <p className="pt-4 text-xl text-white">
                            Pine Book Publishing makes self-publishing easy, with hands-on support from the first word to the final cover.
                            Our process includes Proofreading, Editing, Formatting, Book Cover Design, and global print-on-demand.
                        </p>
                        <h4 className="mt-8 text-2xl font-bold text-white uppercase font-poppins">
                            Our Credibility
                        </h4>
                        <div className="flex items-center justify-start gap-2 mt-8 md:gap-x-8 client-logo-sec">
                            {clientLogos.map((logo, index) => (
                                <Link key={index} href={logo.href} target="_blank">
                                    <Image alt={logo.alt} src={logo.src} width={logo.width} height={logo.height} />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="relative w-full px-4 px-8 py-3 py-8 bg-gray-400 bg-opacity-50 border-gray-100 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm">
                            <Image className="text-center header-form-off-badge" src={"/brand-img/christmas-tag.png"} width={140} height={180} loading="lazy" alt="Christmas Tag" />
                            <Image className="text-center christmas-cap-form" src={"/brand-img/christmas-cap.png"} width={300} height={300} loading="lazy" alt="Christmas Cap" />
                            <div className="text-start">
                                <h4 className="text-2xl font-bold text-white font-poppins md:text-4xl christmas-banner-title">
                                    Avail Discount
                                </h4>
                                <h5 className="mb-3 text-lg text-white font-poppins christmas-banner-desc">
                                    Holiday Season Sale: Expert Book Publishing at <span className="text-blink">50% Off</span> – Your Story Deserves to be Heard!
                                </h5>
                            </div>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                <div className="relative w-full col-span-2">
                                    <form className="flex flex-col items-start justify-start gap-4" onSubmit={handleSubmit}>
                                        <input type="text" name="fullName" value={fullName} onChange={handleChange} placeholder="Enter your Name" required className="w-full py-2 pl-4 pr-4 text-sm border shadow-xl rounded-xl" />
                                        <CountryPhoneInput name="phoneNumber" value={phoneNumber} onChange={handleChange} placeholder="Enter your Phone" required inputClassName="text-sm" />
                                        {phoneError && <p className="mt-1 text-sm text-red-500">{phoneError}</p>}
                                        <input type="text" name="email" value={email} onChange={handleChange} placeholder="Enter your Email" required className="w-full py-2 pl-4 pr-4 text-sm border shadow-xl rounded-xl" />
                                        <textarea name="message" rows={3} value={message} onChange={handleChange} placeholder="Enter your Message" required className="w-full py-2 pl-4 pr-4 text-sm border shadow-xl rounded-xl"></textarea>
                                        {showSuccess && <p className="px-1 py-1 text-green-700">Form submitted Successfully!</p>}
                                        <button type="submit" disabled={isSubmitting} className="w-full p-4 py-2 text-xl text-white uppercase shadow-xl header-submit-btn rounded-xl">
                                            {isSubmitting ? "Submitting..." : "Submit"}
                                        </button>
                                    </form>
                                </div>
                                <div className="flex items-center justify-center col-span-1">
                                    <Image className="text-center christmas-banner-img" src={"/brand-img/crishtmis-img.png"} width={250} height={500} loading="lazy" alt="Christmas Image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
