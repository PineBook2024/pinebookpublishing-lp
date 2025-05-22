import useHubspotForm from "@/hooks/hubspot";
import React, { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BrandFooter from "./components/BrandFooter";
import Link from "next/link";
import BrandAbout from "./components/BrandAbout";
import BrandNavbar from "./components/BrandNavbar";
import BrandBannerLogo from "./components/BrandBannerLogo";
import BrandChooseUs from "./components/BrandChooseUs";
import BrandContact from "./components/BrandContactForm";
import BrandPrimaryHeader from "./components/BrandPrimaryHeader";
import BrandServices from "./components/BrandServices";
import BrandTestimonial from "./components/BrandTestimonial";
import BrandTopBar from "./components/BrandTopBar";
import BrandHeroFridayUpdate from "./components/BrandHeroFridayUpdate";

export default function Services() {
    const swiperRef2 = useRef(null);
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
            width: 125,
            height: 125,
        },
        {
            href: "https://www.bbb.org/ca/on/richmond-hill/profile/publishers-book/pine-book-writing-inc-0107-1406919",
            src: "/images/s2.png",
            alt: "LOGO",
            width: 125,
            height: 125,
        },
        {
            href: "https://www.trustpilot.com/review/pinebookwriting.com",
            src: "/images/s3.png",
            alt: "LOGO",
            width: 125,
            height: 125,
        },
        // {
        //     href: "https://www.yelp.com/biz/pine-book-writing-richmond-hill",
        //     src: "/images/s4.png",
        //     alt: "LOGO",
        //     width: 125,
        //     height: 125,
        // },
        {
            href: "https://clutch.co/profile/pine-book-writing",
            src: "/images/s6.png",
            alt: "LOGO",
            width: 125,
            height: 125,
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
            <Head>
                <title>Signup | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Everything about Pine Book Publishing—your partner in crafting, editing, and publishing your story. Experience seamless service from manuscript to bookshelf."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <BrandTopBar />
            <BrandNavbar />
            <section class="brand-primary-header-bg-signup py-5">
                <div class="container max-w-screen-xl mx-auto">
                    <div class="row py-5">
                        <div class="col-12 px-5 w-100 md:w-3/5">
                            <h1 class="text-3xl text-white  font-poppins pt-10 opacity-0">
                                Connect with Publishing Experts Now!</h1>
                            <p class="text-xl text-white pt-2 opacity-0">Pine Book Publishing brings you the expert insights to kickstart your publishing journey. Reach out to us today!</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="relative overflow-hidden w-full" style={{ zIndex: 1 }}>
                {/* <SnowFall /> */}
                <div className="container px-4 pt-10 pb-10 tablet-margin-banner mx-auto max-w-screen-xl brand-hero-section relative z-10">
                    <div className="grid grid-cols-1 sm:gap-8 sm:py-0 md:grid-cols-2 text-left items-center justify-between md:gap-8">
                        <div className="mb-4">
                            <img src="./brand-img/contact page moc.png" />
                        </div>
                        <div>
                            <div className="px-4 py-3 w-full rounded-2xl px-8 py-4 bg-[#0d0f38] bg-clip-padding backdrop-filter backdrop-blur-sm border-gray-100 relative">
                               
                                <div className="text-start">
                                    <h4 className="font-poppins text-white text-2xl md:text-3xl font-bold christmas-banner-title">
                                        Avail Discount
                                    </h4>
                                    <h5 className="font-poppins text-white text-sm mb-3 christmas-banner-desc">
                                        Holiday Season Sale: Expert Book Publishing at{" "}
                                        <span className="text-blink">50% Off</span> – <br />
                                        Your Story Deserves to be Heard!
                                    </h5>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                                    <div className="col-span-2 w-full relative">
                                        <form className="flex flex-col gap-3 justify-start items-start" onSubmit={handleSubmit}>
                                            <div class="grid gap-3 md:grid-cols-2 w-full">
                                                <div className="relative w-full">
                                                    <input
                                                        type="text"
                                                        name="fullName"
                                                        onChange={handleChange}
                                                        value={fullName}
                                                        required
                                                        className="pl-4 pr-4 py-2 border rounded-md w-full text-sm shadow-xl"
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
                                                        className="pl-4 pr-4 py-2 border rounded-md w-full text-sm shadow-xl"
                                                        placeholder="Enter your Phone"
                                                    />
                                                    {phoneError && (
                                                        <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="relative w-full">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    onChange={handleChange}
                                                    value={email}
                                                    required
                                                    className="pl-4 pr-4 py-2 border rounded-md w-full text-sm shadow-xl"
                                                    placeholder="Enter your Email"
                                                />
                                            </div>
                                            <div className="relative w-full">
                                                <textarea
                                                    className="pl-4 pr-4 py-2 border rounded-md w-full text-sm shadow-xl"
                                                    rows={2}
                                                    onChange={handleChange}
                                                    value={message}
                                                    required
                                                    placeholder="Enter your Message"
                                                    name="message"
                                                ></textarea>
                                            </div>
                                            <div class="flex items-start mb-5">
                                                <div class="flex items-center h-5">
                                                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                                </div>
                                                <label for="remember" class="ms-2 text-sm font-medium text-white dark:text-gray-300">By checking this box, I consent to received text messages related to Follow Up Messages and Appointment Reminders from Pine Book Writing and Publishing. you can reply "STOP" at any time to opt-out. Message and data rates may apply. Message Frequency may vary, text Help to <Link href="tel:(866) 841-7469" className="text-blue-400">(866) 841-7469</Link> for assistance. For more information, please refer to our <Link href="privacy-policy" className="text-blue-400" target="_blank">PRIVACY POLICY</Link> and SMS <Link href="terms-and-conditions" className="text-blue-400" target="_blank"> TERMS and CONDITIONS </Link> on our website</label>
                                            </div>
                                            {showSuccess && (
                                                <p className="px-1 py-1 text-green-700">
                                                    Form submitted Successfully!
                                                </p>
                                            )}
                                            <div className="w-full">
                                                <button
                                                    className="w-full p-4 py-2 text-white uppercase header-submit-btn rounded rounded-md shadow-xl text-xl"
                                                    type="submit"
                                                >
                                                    Submit
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                    {/* <div className="col-span-1 flex justify-center items-center">
                                        <Image
                                            className="text-center christmas-banner-img"
                                            src={"/brand-img/crishtmis-img.png"}
                                            width={250}
                                            height={500}
                                            loading="lazy"
                                        ></Image>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BrandFooter />
        </>
    );
}
