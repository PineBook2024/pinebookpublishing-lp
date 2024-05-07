import useHubspotForm from "@/hooks/hubspot";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BrandContact() {
    // Form Integration
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
            {/* <section className="brand-testimonials-section">
                <div className="max-w-screen-xl mx-auto px-4 my-20 relative py-22">
                    <div className="text-center mb-6">
                        <h2 className="font-majallab text-5xl text-black">TESTIMONIALS</h2>
                    </div>
                </div>
            </section> */}

            <section className="btm-form overflow-hidden width-container">
                <div className="max-w-screen-xl mx-auto px-8 md:px-10">
                    <div className="form-mid-wrap pt-4 bg-gray-200 connect-form-border mb-12">
                        <div className="flex flex-col md:flex-row items-end">
                            <div className="basis-1/3 hidden md:block position-relative">
                                {/* <AnimateFade type={"right"} className="position-relative"> */}
                                <Image
                                    className="text-center pt-10 contact-form-img"
                                    src={"/images/contact-user.webp"}
                                    width={550}
                                    height={250}
                                    layout="responsive"
                                    loading="lazy"
                                ></Image>
                                {/* </AnimateFade> */}
                            </div>

                            <form className="basis-1/2 px-5 mb-5  md:ml-20" onSubmit={handleSubmit}>
                                <h3 className="text-black leading-20 font-bold text-5xl md:text-7xl font-majallab text-start uppercase">
                                    Lets get in Touch
                                </h3>
                                <p className="text-black leading-6  pb-5 text-base">
                                    Lorem ipsum dolor sit amet, consectetuadipiscing elit, sed do eiusmod tempor incididunt.
                                </p>

                                <div className="relative mb-3">
                                    <input
                                        type="text"
                                        name="fullName"
                                        onChange={handleChange}
                                        value={fullName}
                                        required
                                        className="pl-4 pr-4 py-2 border rounded-lg w-full connect-form-input font-majallab"
                                        placeholder="Enter your Name"
                                    />
                                </div>

                                <div className="relative mb-3">
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        onChange={handleChange}
                                        value={phoneNumber}
                                        required
                                        className="pl-4 pr-4 py-2 border rounded-lg w-full connect-form-input font-majallab"
                                        placeholder="Enter your Number"
                                    />
                                </div>

                                <div className="relative mb-3">
                                    <input
                                        type="text"
                                        name="email"
                                        onChange={handleChange}
                                        value={email}
                                        required
                                        className="pl-4 pr-4 py-2 border rounded-lg w-full connect-form-input font-majallab"
                                        placeholder="Enter your Email"
                                    />
                                </div>

                                <div className="relative mb-3">
                                    <textarea
                                        onChange={handleChange}
                                        value={message}
                                        required
                                        placeholder="Enter your Message"
                                        name="message"
                                        className="resize-none pl-4 pr-4 py-2 border rounded-lg w-full connect-form-input font-majallab"
                                        rows={3}
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
                                <button className="p-4 bg-green-500 uppercase text-white rounded font-poppins brand-submit-btn mb-10" type="submit">
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