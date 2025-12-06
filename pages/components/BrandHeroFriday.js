import useHubspotForm from "/hooks/hubspot";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FadeIn from "./FadeIn";
import SnowFall from "./SnowFall";

export default function BrandHeroFriday() {
    const router = useRouter();
    const { submitMainContactForm } = useHubspotForm();
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [phoneError, setPhoneError] = useState("");

    const clientLogos = [
        {
            href: "https://goo.gl/maps/D6kJBoXBJYwcZWkP7",
            src: "/images/Google Partner.png",
            alt: "LOGO",
            width: 150,
            height: 120,
        },
        {
            href: "https://www.bbb.org/ca/on/richmond-hill/profile/publishers-book/pine-book-writing-inc-0107-1406919",
            src: "/images/s2.png",
            alt: "LOGO",
            width: 130,
            height: 60,
        },
        {
            href: "https://www.trustpilot.com/review/pinebookwriting.com",
            src: "/images/s3.png",
            alt: "LOGO",
            width: 130,
            height: 60,
        },
        {
            href: "https://www.yelp.com/biz/pine-book-writing-richmond-hill",
            src: "/images/s4.png",
            alt: "LOGO",
            width: 130,
            height: 60,
        },
        {
            href: "https://clutch.co/profile/pine-book-writing",
            src: "/images/s6.png",
            alt: "LOGO",
            width: 130,
            height: 60,
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        const setters = {
            fullName: setFullName,
            email: setEmail,
            message: setMessage,
            phoneNumber: setPhoneNumber,
        };

        const setter = setters[name];
        if (setter) {
            if (name === "phoneNumber") {
                const phoneRegex = /^\d{0,}$/;
                if (phoneRegex.test(value)) {
                    setter(value);
                    if (value.length < 9) {
                        setPhoneError("Phone number must be at least 9 digits");
                    } else {
                        setPhoneError("");
                    }
                } else {
                    setPhoneError("Invalid phone number format");
                }
            } else {
                setter(value);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (phoneNumber.length < 9) {
            setPhoneError("Phone number must be at least 9 digits");
            return;
        }
        const response = await submitMainContactForm(
            fullName,
            email,
            phoneNumber,
            message
        );
        if (response) {
            setShowSuccess(true);
            router.push("/thank-you");
            setTimeout(() => {
                setShowSuccess(false);
                setEmail("");
                setFullName("");
                setPhoneNumber("");
                setMessage("");
            }, 3000);
        }

        console.log("response", response);
    };

    return (
        <>
         <video
          className="brand-video"
          id="brandVideo"
          autoPlay={true}
          loop={true}
          muted
          controls={false}
        >
          <source src="/brand-img/brand-vid-new.mp4" />
          {/* <source src="https://videos.ctfassets.net/0g2c0d4v74kt/7JddRckDmiDTFoj2zkuibz/19a06bc6173d8b205ead99ba8b0a0307/brand-vid.mp4" /> */}
  
        </video>
        
            {/* Snowfall Background */}
            <div className="relative overflow-hidden w-full" style={{ zIndex: 1 }}>
                {/* <SnowFall /> */}
                <div className="container px-4 pt-20 tablet-margin-banner mx-auto max-w-screen-xl brand-hero-section relative z-10">
                    <div className="grid grid-cols-1 sm:gap-8 sm:py-0 md:grid-cols-2 text-left items-center justify-between md:gap-8 md:py-36">
                        <div className="mb-4">
                            <h3 className="font-poppins text-2xl mb-4 aos-init aos-animate text-white">
                                <span className="px-2 py-0">#1 Self</span> Publishing Company
                            </h3>
                            <FadeIn>
                                <h1 className="font-poppins text-3xl md:text-3xl text-white font-bold">
                                    DO YOU HAVE A MANUSCRIPT READY TO BE PUBLISHED?
                                </h1>
                            </FadeIn>
                            <p className="text-xl text-white pt-4">
                                Pine Book Publishing has made it much more easier to self-publish a
                                book, with hands-on support from the first word to the final cover.
                                Our process involves Proofreading, Editing, Formatting, Book Cover
                                Design and print-on-demand through a vast network of global outlets.
                            </p>
                            <h4 className="font-poppins text-2xl mt-8 text-white uppercase font-bold">
                                Our Credibility
                            </h4>
                            <div className="flex justify-start items-center mt-8 gap-2 md:gap-x-8 client-logo-sec">
                                {clientLogos.map((logo, index) => (
                                    <Link key={index} href={logo.href} target="_blank">
                                        <Image
                                            alt={logo.alt}
                                            src={logo.src}
                                            width={logo.width}
                                            height={logo.height}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="px-4 py-3 w-full rounded-2xl px-8 py-8 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border-gray-100 relative">
                                <Image
                                    className="text-center header-form-off-badge"
                                    src={"/brand-img/christmas-tag.png"}
                                    width={140}
                                    height={180}
                                    loading="lazy"
                                ></Image>
                                <Image
                                    className="text-center christmas-cap-form"
                                    src={"/brand-img/christmas-cap.png"}
                                    width={300}
                                    height={300}
                                    loading="lazy"
                                ></Image>
                                <div className="text-start">
                                    <h4 className="font-poppins text-white text-2xl md:text-4xl font-bold christmas-banner-title">
                                        Avail Discount
                                    </h4>
                                    <h5 className="font-poppins text-white text-lg mb-3 christmas-banner-desc">
                                        Holiday Season Sale: Expert Book Publishing at{" "}
                                        <span className="text-blink">50% Off</span> – <br />
                                        Your Story Deserves to be Heard!
                                    </h5>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="col-span-2 w-full relative">
                                        <form className="flex flex-col gap-4 justify-start items-start" onSubmit={handleSubmit}>
                                            <div className="relative w-full">
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    onChange={handleChange}
                                                    value={fullName}
                                                    required
                                                    className="pl-4 pr-4 py-2 border rounded-xl w-full text-sm shadow-xl"
                                                    placeholder="Enter your Name"
                                                />
                                            </div>
                                            <div className="relative w-full">
                                                <input
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={phoneNumber}
                                                    name="phoneNumber"
                                                    required
                                                    className="pl-4 pr-4 py-2 border rounded-xl w-full text-sm shadow-xl"
                                                    placeholder="Enter your Phone"
                                                />
                                                {phoneError && (
                                                    <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                                                )}
                                            </div>
                                            <div className="relative w-full">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    onChange={handleChange}
                                                    value={email}
                                                    required
                                                    className="pl-4 pr-4 py-2 border rounded-xl w-full text-sm shadow-xl"
                                                    placeholder="Enter your Email"
                                                />
                                            </div>
                                            <div className="relative w-full">
                                                <textarea
                                                    className="pl-4 pr-4 py-2 border rounded-xl w-full text-sm shadow-xl"
                                                    rows={3}
                                                    onChange={handleChange}
                                                    value={message}
                                                    required
                                                    placeholder="Enter your Message"
                                                    name="message"
                                                ></textarea>
                                            </div>
                                            {showSuccess && (
                                                <p className="px-1 py-1 text-green-700">
                                                    Form submitted Successfully!
                                                </p>
                                            )}
                                            <div className="w-full">
                                                <button
                                                    className="w-full p-4 py-2 text-white uppercase header-submit-btn rounded rounded-xl shadow-xl text-xl"
                                                    type="submit"
                                                >
                                                    Submit
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                    <div className="col-span-1 flex justify-center items-center">
                                        <Image
                                            className="text-center christmas-banner-img"
                                            src={"/brand-img/crishtmis-img.png"}
                                            width={250}
                                            height={500}
                                            loading="lazy"
                                        ></Image>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
