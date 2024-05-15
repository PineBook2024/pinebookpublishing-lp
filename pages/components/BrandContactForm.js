import useHubspotForm from "@/hooks/hubspot";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle, faUser, faPhone, faEnvelope, faPen } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimateFade from "./fade";
import { useRouter } from 'next/navigation';


export default function BrandContact() {
    const router = useRouter();
    // Form Integration
    const { submitBrandMainContactForm } = useHubspotForm();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

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
            email,
            username,
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



    return (
        <>

            <section className="btm-form overflow-hidden relative">
                <div className="contact-form-bg-img"></div>
                <div className="max-w-screen-xl mx-auto px-8 md:px-10">
                    <div className="form-mid-wrap pt-4 bg-gray-200 connect-form-border mb-12">
                        <div className="flex flex-col md:flex-row items-end">
                            <div className="basis-1/3 hidden md:block position-relative">
                                <AnimateFade type={"right"} className="position-relative">
                                    <Image
                                        className="text-center pt-10 contact-form-img"
                                        src={"/images/contact-user.webp"}
                                        width={600}
                                        height={300}
                                        loading="lazy"
                                    ></Image>
                                </AnimateFade>
                            </div>

                            <form className="basis-1/2 px-5 mb-5  md:ml-20" onSubmit={handleSubmit}>
                                <h3 className="text-black leading-20 font-bold text-5xl md:text-6xl font-majallab text-start uppercase">
                                    We Are Here to Hear You!
                                </h3>
                                <p className="text-black leading-6  pb-5 text-base">
                                    Got questions? Let's find the answers together - shoot us a message!
                                </p>

                                <div className="relative mb-3">
                                    <input
                                        type="text"
                                        name="username"
                                        onChange={handleChange}
                                        value={username}
                                        required
                                        className="pl-4 pr-4 py-2 border rounded-lg w-full brand-connect-form-input font-majallab shadow-xl"
                                        placeholder="Enter your Name"
                                    />
                                    <Image src={"/brand-img/user-icon.png"} width={16} height={16} className="absolute left-0 top-4 ml-4" />
                                </div>

                                <div className="relative mb-3">
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        onChange={handleChange}
                                        value={phoneNumber}
                                        required
                                        className="pl-4 pr-4 py-2 border rounded-lg w-full brand-connect-form-input font-majallab shadow-xl"
                                        placeholder="Enter your Number"
                                    />
                                    <Image src={"/brand-img/phone-icon.png"} width={16} height={16} className="absolute left-0 top-4 ml-4" />
                                </div>

                                <div className="relative mb-3">
                                    <input
                                        type="text"
                                        name="email"
                                        onChange={handleChange}
                                        value={email}
                                        required
                                        className="pl-4 pr-4 py-2 border rounded-lg w-full brand-connect-form-input font-majallab shadow-xl"
                                        placeholder="Enter your Email"
                                    />
                                    <Image src={"/brand-img/email-icon.png"} width={16} height={16} className="absolute left-0 top-5 ml-4" />
                                </div>

                                <div className="relative mb-3">
                                    <textarea
                                        onChange={handleChange}
                                        value={message}
                                        required
                                        placeholder="Enter your Message"
                                        name="message"
                                        className="resize-none pl-4 pr-4 py-2 border rounded-lg w-full brand-connect-form-input font-majallab shadow-xl"
                                        rows={4}
                                    ></textarea>
                                    <FontAwesomeIcon icon={faPen} color="#000" className="absolute left-0 top-3 ml-4" width={14} />
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