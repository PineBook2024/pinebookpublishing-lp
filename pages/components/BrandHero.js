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

export default function BrandHero() {
    const router = useRouter();
    const { submitContactForm } = useHubspotForm();
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);


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
            setter(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await submitContactForm(
            email,
            fullName,
            phoneNumber,
            message
        );
        if (response) {
            setShowSuccess(true);
            // router.push('/thank-you'); 
            router.push('/thankyou')
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

    const settings = {
        dots: true, // Enable pagination dots
        infinite: true, // Infinite looping
        speed: 500, // Speed of the transition
        slidesToShow: 1, // Show one slide at a time
        slidesToScroll: 1, // Scroll one slide at a time
        autoplay: true, // Enable autoplay
        autoplaySpeed: 2000, // Delay between each auto transition
        fade: true, // Fade transition instead of slide
        cssEase: 'linear' // Type of easing to use
    };

    return (
        <>
            {/* <section class="bg-white dark:bg-gray-900 brand-hero-bg-img brand-hero-banner">
                <div class="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
                    <div class="mr-auto place-self-center lg:col-span-7">
                        <h3 className="text-white text-2xl mb-4"><span className="px-2 py-0">#1 Self</span> Publishing Company</h3>
                        <h1 className="font-majallab text-5xl md:text-8xl leading-3">
                            Get Self-Published <br></br> more Profitably
                        </h1>
                        <p className="text-white text-xl font-poppins">Don’t make your manuscript wait – get <br></br>
                            self-published with  Pine Book Publishing <br></br>
                            – It’s easy and ROI-positive.</p>
                    </div>
                    <div class="hidden lg:mt-0 lg:col-span-5 lg:flex brand-hero-banner-form">
                        <div className="w-full rounded-2xl px-8 py-8">
                            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="fullName"
                                        onChange={handleChange}
                                        value={fullName}
                                        required
                                        className="pl-4 pr-4 py-2 border rounded-xl w-full font-majallab text-xl shadow-xl"
                                        placeholder="Enter your Name"
                                    />
                                    <FontAwesomeIcon icon={faUser} color="#747474" className="ms-4 absolute left-0 top-3" />
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        value={phoneNumber}
                                        name="phoneNumber"
                                        required
                                        className="pl-4 pr-4 py-2 border rounded-xl w-full font-majallab text-xl shadow-xl"
                                        placeholder="Enter your Phone"
                                    />
                                    <FontAwesomeIcon icon={faPhone} color="#747474" className="ms-4 absolute left-0 top-3" />
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="email"
                                        onChange={handleChange}
                                        value={email}
                                        required
                                        className="pl-4 pr-4 py-2 border rounded-xl w-full font-majallab text-xl shadow-xl"
                                        placeholder="Enter your Email"
                                    />
                                    <FontAwesomeIcon icon={faEnvelope} color="#747474" className="ms-4 absolute left-0 top-3" />
                                </div>
                                <div className="relative">
                                    <textarea
                                        className="pl-4 pr-4 py-2 border rounded-xl w-full font-majallab text-xl shadow-xl"
                                        rows={5}
                                        onChange={handleChange}
                                        value={message}
                                        required
                                        placeholder="Enter your Message"
                                        name="message"
                                    ></textarea>
                                    <FontAwesomeIcon icon={faPen} color="#747474" className="ms-4 absolute left-0 top-3" />
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 pt-3 
                                        flex items-start  
                                        pointer-events-none"
                                    ></div>
                                </div>
                                {showSuccess && (
                                    <p className="px-1 py-2 text-green-700">
                                        Form submitted Successfully!
                                    </p>
                                )}
                                <button
                                    className="w-full p-4 text-white uppercase header-submit-btn rounded font-poppins rounded-xl shadow-xl text-xl"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="overflow-hidden brand-hero-section">
                <Slider {...settings}>
                    <div className="bg-image-1">
                        {contentSection(handleSubmit, handleChange, fullName, phoneNumber, email, message, showSuccess)}
                    </div>
                    <div className="bg-image-2">
                        {contentSection(handleSubmit, handleChange, fullName, phoneNumber, email, message, showSuccess)}
                    </div>
                    <div className="bg-image-3">
                        {contentSection(handleSubmit, handleChange, fullName, phoneNumber, email, message, showSuccess)}
                    </div>
                </Slider>
            </section>
        </>
    );
}

function contentSection(handleSubmit, handleChange, fullName, phoneNumber, email, message, showSuccess) {
    return (
        <div className="grid max-w-screen-xl px-4 pt-28 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
            <div className="mr-auto place-self-center lg:col-span-7 text-white">
                <h3 className="text-2xl mb-4"><span className="px-2 py-0">#1 Self</span> Publishing Company</h3>
                <h1 className="font-majallab text-5xl md:text-8xl">
                    Your Story Matters - Let's Publish It
                </h1>
                <p className="text-xl font-poppins">
                    From concept to completion, Pine Book Publishing provides a supportive ecosystem for authors, offering comprehensive assistance in manuscript development, publishing, and promotion, ensuring your story receives the attention it deserves.
                </p>
            </div>
            <div className="lg:col-span-5  brand-hero-banner-form">
                <div className="w-full rounded-2xl px-8 py-8">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="relative">
                            <input
                                type="text"
                                name="fullName"
                                onChange={handleChange}
                                value={fullName}
                                required
                                className="pl-4 pr-4 py-2 border rounded-xl w-full font-majallab text-xl shadow-xl"
                                placeholder="Enter your Name"
                            />
                            <Image src={"/brand-img/user-icon.png"} width={14} height={14} className="absolute left-0 top-4 ml-4" />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                name="phoneNumber"
                                onChange={handleChange}
                                value={phoneNumber}
                                required
                                className="pl-4 pr-4 py-2 border rounded-xl w-full font-majallab text-xl shadow-xl"
                                placeholder="Enter your Phone"
                            />
                            <Image src={"/brand-img/phone-icon.png"} width={14} height={14} className="absolute left-0 top-4 ml-4" />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                name="email"
                                onChange={handleChange}
                                value={email}
                                required
                                className="pl-4 pr-4 py-2 border rounded-xl w-full font-majallab text-xl shadow-xl"
                                placeholder="Enter your Email"
                            />
                            <Image src={"/brand-img/email-icon.png"} width={16} height={16} className="absolute left-0 top-4 ml-4" />
                        </div>
                        <div className="relative">
                            <textarea
                                className="pl-4 pr-4 py-2 border rounded-xl w-full font-majallab text-xl shadow-xl"
                                rows={5}
                                onChange={handleChange}
                                value={message}
                                required
                                placeholder="Enter your Message"
                                name="message"
                            ></textarea>
                            <FontAwesomeIcon icon={faPen} color="#747474" className="absolute left-0 top-3 ml-4" />
                        </div>
                        <button
                            className="w-full p-4 text-white uppercase header-submit-btn rounded font-poppins rounded-xl shadow-xl text-xl"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}