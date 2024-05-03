import useHubspotForm from "@/hooks/hubspot";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

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

    return (
        <>
            <section class="bg-white dark:bg-gray-900 brand-hero-bg-img">
                <div class="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
                    <div class="mr-auto place-self-center lg:col-span-7">
                        <h3 className="text-white text-2xl mb-4"><span className="px-2 py-0">#1 Self</span> Publishing Company</h3>
                        <h1 className="font-majallab text-5xl md:text-8xl leading-3">
                            Get Self-Published <br></br> more Profitably
                        </h1>
                        <p className="text-white text-xl">Don’t make your manuscript wait – get <br></br>
                            self-published with  Pine Book Publishing <br></br>
                            – It’s easy and ROI-positive.</p>
                    </div>
                    <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        {/* <img src="./images/hero.png" alt="hero image"> */}
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
            </section>
        </>
    );
}