import useHubspotForm from "@/hooks/hubspot";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle, faUser, faPhone, faEnvelope, faPen } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WavyText from "./WavyText";
import FadeIn from "./FadeIn";

export default function BrandHero() {
    const router = useRouter();
    // Form Integration
    const { submitMainContactForm } = useHubspotForm();
    const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [phoneError, setPhoneError] = useState("");

    // Object
    const clientLogos = [
        {
            href: "https://goo.gl/maps/D6kJBoXBJYwcZWkP7",
            src: "/images/Google Partner.png",
            alt: "LOGO",
            width: 150,
            height: 120
        },
        {
            href: "https://www.bbb.org/ca/on/richmond-hill/profile/publishers-book/pine-book-writing-inc-0107-1406919",
            src: "/images/s2.png",
            alt: "LOGO",
            width: 130,
            height: 60
        },
        {
            href: "https://www.trustpilot.com/review/pinebookwriting.com",
            src: "/images/s3.png",
            alt: "LOGO",
            width: 130,
            height: 60
        },
        {
            href: "https://www.yelp.com/biz/pine-book-writing-richmond-hill",
            src: "/images/s4.png",
            alt: "LOGO",
            width: 130,
            height: 60
        },
        {
            href: "https://clutch.co/profile/pine-book-writing",
            src: "/images/s6.png",
            alt: "LOGO",
            width: 130,
            height: 60
        }
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
            if (name === 'phoneNumber') {
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
            router.push('/thank-you')
            setTimeout(() => {
                setShowSuccess(false);
                setEmail("");
                setFullName("");
                setPhoneNumber("")
                setMessage("");
            }, 3000);
        }

        console.log("response", response);
    };

    return (
        <>


            {/* <section class=""> */}
            <div className="container mx-4 pt-20 md:mx-32 tablet-margin-banner max-w-screen-xl brand-hero-section">
                <div className="grid grid-cols-1 sm:gap-8 sm:py-0 md:grid-cols-2 text-left items-center justify-between md:gap-8 md:py-36">
                    <div className="mb-4">
                        <h3 className="font-poppins text-2xl mb-4 aos-init aos-animate text-white"><span className="px-2 py-0">#1 Self</span> Publishing Company</h3>
                        <FadeIn>
                        <h1 className="font-poppins text-3xl md:text-5xl text-white font-bold">
                            DO YOU HAVE A MANUSCRIPT READY TO BE PUBLISHED?
                        </h1>
                        </FadeIn>
                        {/* <WavyText text="DO YOU HAVE A MANUSCRIPT READY TO BE PUBLISHED?" replay={true} style={{ color: 'white' }} className="font-poppins text-3xl md:text-5xl text-white font-bold" /> */}
                        {/* <FadeIn> */}
                        <p className="text-xl text-white pt-4">
                            Pine Book Publishing has made it much more easier to self-publish a book, with hands-on support from the first word to the final cover. Our process involves Proofreading, Editing, Formatting, Book Cover Design and print-on-demand through a vast network of global outlets.
                        </p>
                        <h4 className="font-poppins text-2xl mt-8 text-white uppercase font-bold">Our Credibility</h4>
                        {/* </FadeIn> */}
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

                        <div className="w-full rounded-2xl px-8 py-8 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border-gray-100 relative">
                            <Image
                                className="text-center header-form-off-badge"
                                src={"/images/form-badge.png"}
                                width={160}
                                height={200}
                                loading="lazy"
                            ></Image>
                            <div className="text-center">
                                <h4 className="font-poppins text-white text-2xl md:text-2xl">Avail Discount</h4>
                                <h5 className="font-poppins text-white text-lg mb-3">Exclusive Offer: Expert Book Publishing at <span className="text-blink">50% Off</span> – <br></br>Your Story Deserves to be Heard!</h5>
                            </div>
                            <div>

                            </div>
                            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="fullName"
                                        onChange={handleChange}
                                        value={fullName}
                                        required
                                        className="pl-4 pr-4 py-2 border rounded-xl w-full text-sm shadow-xl"
                                        placeholder="Enter your Name"
                                    />
                                    {/* <Image src={"/brand-img/user-icon.png"} width={14} height={14} className="absolute left-0 top-3 ml-4" /> */}
                                </div>
                                <div className="relative">
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
                                    {/* <Image src={"/brand-img/phone-icon.png"} width={14} height={14} className="absolute left-0 top-3 ml-4" /> */}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="email"
                                        onChange={handleChange}
                                        value={email}
                                        required
                                        className="pl-4 pr-4 py-2 border rounded-xl w-full text-sm shadow-xl"
                                        placeholder="Enter your Email"
                                    />
                                    {/* <Image src={"/brand-img/email-icon.png"} width={16} height={16} className="absolute left-0 top-3 ml-4" /> */}
                                </div>
                                <div className="relative">
                                    <textarea
                                        className="pl-4 pr-4 py-2 border rounded-xl w-full text-sm shadow-xl"
                                        rows={3}
                                        onChange={handleChange}
                                        value={message}
                                        required
                                        placeholder="Enter your Message"
                                        name="message"
                                    ></textarea>
                                    {/* <FontAwesomeIcon icon={faPen} color="#747474" className="absolute left-0 top-3 ml-4" width={16} /> */}
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 pt-3 
                                            flex items-start  
                                            pointer-events-none"
                                    ></div>
                                </div>
                                {showSuccess && (
                                    <p className="px-1 py-1 text-green-700">
                                        Form submitted Successfully!
                                    </p>
                                )}
                                <button
                                    className="w-full p-4 py-2 text-white uppercase header-submit-btn rounded rounded-xl shadow-xl text-xl"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* </section> */}

        </>
    );
}
