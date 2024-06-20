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
    const { submitBrandMainContactForm } = useHubspotForm();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    // Object
    const clientLogos = [
        {
            href: "https://goo.gl/maps/D6kJBoXBJYwcZWkP7",
            src: "/brand-img/banner-logo2.png",
            alt: "LOGO",
            width: 180,
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
            username: setUsername,
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
        const response = await submitBrandMainContactForm(
            username,
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
                setUsername("");
                setPhoneNumber("")
                setMessage("");
            }, 3000);
        }

        console.log("response", response);
    };

    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
    //     fade: true,
    //     cssEase: 'linear'
    // };

    return (
        <>
            <section class="brand-hero-section">
                <div class="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28 pt-28">
                    <div class="mr-auto place-self-center lg:col-span-7">
                        <h3 className="font-poppins text-2xl mb-4 aos-init aos-animate text-white" data-aos="zoom-in-left"><span className="px-2 py-0">#1 Self</span> Publishing Company</h3>
                        {/* <h1 className="font-poppins text-3xl md:text-6xl text-white font-bold">
                            Looking to Publish <br></br> Your Own Book
                        </h1> */}
                        <WavyText text="Do you Have a Great Story? Let's Publish It" replay={true} style={{ color: 'white' }} className="font-poppins text-3xl md:text-6xl text-white font-bold" />
                        {/* <FadeIn> */}
                            <p className="text-xl text-white pt-4">
                                Have you started penning your story idea, but got stuck on your story’s next chapter? Nevermind! Self publishing a book can be sometimes a nightmare even for some great writers. However, Pine Book Publishing is your creative partner, offering hands-on support from the first word to the final cover.
                            </p>
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
                    <div class="lg:mt-0 lg:col-span-5 lg:flex brand-hero-banner-form">
                        <div className="w-full rounded-2xl px-8 py-8">
                            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="username"
                                        onChange={handleChange}
                                        value={username}
                                        required
                                        className="pl-4 pr-4 py-2 border rounded-xl w-full text-sm shadow-xl"
                                        placeholder="Enter your Name"
                                    />
                                    <Image src={"/brand-img/user-icon.png"} width={14} height={14} className="absolute left-0 top-3 ml-4" />
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
                                    <Image src={"/brand-img/phone-icon.png"} width={14} height={14} className="absolute left-0 top-3 ml-4" />
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
                                    <Image src={"/brand-img/email-icon.png"} width={16} height={16} className="absolute left-0 top-3 ml-4" />
                                </div>
                                <div className="relative">
                                    <textarea
                                        className="pl-4 pr-4 py-2 border rounded-xl w-full text-sm shadow-xl"
                                        rows={5}
                                        onChange={handleChange}
                                        value={message}
                                        required
                                        placeholder="Enter your Message"
                                        name="message"
                                    ></textarea>
                                    <FontAwesomeIcon icon={faPen} color="#747474" className="absolute left-0 top-3 ml-4" width={16} />
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
                                    className="w-full p-4 text-white uppercase header-submit-btn rounded rounded-xl shadow-xl text-xl"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="overflow-hidden brand-hero-section">
                <Slider {...settings}>
                    <div className="bg-image-1">
                        {contentSection(handleSubmit, handleChange, username, phoneNumber, email, message, showSuccess)}
                    </div>
                    <div className="bg-image-2">
                        {contentSection(handleSubmit, handleChange, username, phoneNumber, email, message, showSuccess)}
                    </div>
                    <div className="bg-image-3">
                        {contentSection(handleSubmit, handleChange, username, phoneNumber, email, message, showSuccess)}
                    </div>
                </Slider>
            </section> */}
        </>
    );
}

// function contentSection(handleSubmit, handleChange, username, phoneNumber, email, message, showSuccess) {
//     return (
//         <div className="grid max-w-screen-xl px-4 pt-28 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
//             <div className="mr-auto place-self-center lg:col-span-7 text-white">
//                 <h3 className="text-2xl mb-4 aos-init aos-animate" data-aos="zoom-in-left"><span className="px-2 py-0">#1 Self</span> Publishing Company</h3>
//                 <h1 className="font-poppins text-5xl md:text-6xl">
//                     Your Story Matters - Let's Publish It
//                 </h1>
//                 <p className="text-xl font-poppins">
//                     From concept to completion, Pine Book Publishing provides a supportive ecosystem for authors, offering comprehensive assistance in manuscript development, publishing, and promotion, ensuring your story receives the attention it deserves.
//                 </p>
//             </div>
//             <div className="lg:col-span-5  brand-hero-banner-form">
//                 <div className="w-full rounded-2xl px-8 py-8">
//                     <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 name="username"
//                                 onChange={handleChange}
//                                 value={username}
//                                 required
//                                 className="pl-4 pr-4 py-2 border rounded-xl w-full font-poppins text-xl shadow-xl"
//                                 placeholder="Enter your Name"
//                             />
//                             <Image src={"/brand-img/user-icon.png"} width={14} height={14} className="absolute left-0 top-4 ml-4" />
//                         </div>
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 name="phoneNumber"
//                                 onChange={handleChange}
//                                 value={phoneNumber}
//                                 required
//                                 className="pl-4 pr-4 py-2 border rounded-xl w-full font-poppins text-xl shadow-xl"
//                                 placeholder="Enter your Phone"
//                             />
//                             <Image src={"/brand-img/phone-icon.png"} width={14} height={14} className="absolute left-0 top-4 ml-4" />
//                         </div>
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 name="email"
//                                 onChange={handleChange}
//                                 value={email}
//                                 required
//                                 className="pl-4 pr-4 py-2 border rounded-xl w-full font-poppins text-xl shadow-xl"
//                                 placeholder="Enter your Email"
//                             />
//                             <Image src={"/brand-img/email-icon.png"} width={16} height={16} className="absolute left-0 top-4 ml-4" />
//                         </div>
//                         <div className="relative">
//                             <textarea
//                                 className="pl-4 pr-4 py-2 border rounded-xl w-full font-poppins text-xl shadow-xl"
//                                 rows={5}
//                                 onChange={handleChange}
//                                 value={message}
//                                 required
//                                 placeholder="Enter your Message"
//                                 name="message"
//                             ></textarea>
//                             <FontAwesomeIcon icon={faPen} color="#747474" className="absolute left-0 top-3 ml-4" width={16} />
//                         </div>
//                         <button
//                             className="w-full p-4 text-white uppercase header-submit-btn rounded font-poppins rounded-xl shadow-xl text-xl"
//                             type="submit"
//                         >
//                             Submit
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }