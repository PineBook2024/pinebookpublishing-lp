import useHubspotForm from "@/hooks/hubspot";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle, faUser, faPhone, faEnvelope, faPen } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimateFade from "./fade";
import { useRouter } from 'next/navigation';

export default function BrandMainContact() {
    const router = useRouter();
    // Form Integration
    const { submitMainContactForm } = useHubspotForm();
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [phoneError, setPhoneError] = useState("");


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
                const phoneRegex = /^\d{0,10}$/; 
                if (phoneRegex.test(value)) {
                    setter(value);
                    setPhoneError("");
                } else {
                    setPhoneError("Phone number must be exactly 10 digits");
                }
            } else {
                setter(value);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (phoneNumber.length !== 10) {
            setPhoneError("Phone number must be exactly 10 digits");
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
            <section className="">
                <div className="flex flex-col md:flex-row brand-main-contact-wrapper max-w-screen-xl mx-auto mt-20 mb-8 p-1">
                    <div className="basis-1/3 px-10 py-16">
                        <h3 className="text-white leading-20 font-bold text-2xl md:text-3xl font-poppins text-start uppercase mb-5">
                            CONTACT INFO
                        </h3>
                        <h4 className="text-white leading-20 font-bold text-xl md:text-xl font-poppins text-start uppercase">
                            Canada Address:
                        </h4>
                        <p className="text-white mb-5"> R-10225 Yonge St, Suite #250, Richmond Hill, ON L4C 3B2</p>
                        <h4 className="text-white leading-20 font-bold text-xl md:text-xl font-poppins text-start uppercase">
                            USA Address:
                        </h4>
                        <p className="text-white mb-5">211 E 43rd St, 7th Floor, Suite #424, New York City, NY 10017</p>
                        <h4 className="text-white leading-20 font-bold text-xl md:text-xl font-poppins text-start uppercase">
                            PHONE NO:
                        </h4>
                        <p className="text-white mb-5"><Link href="tel:(866) 841-7469">(866) 841-7469</Link></p>
                        <h4 className="text-white leading-20 font-bold text-xl md:text-xl font-poppins text-start uppercase">
                            EMAIL ADDRESS:
                        </h4>
                        <p className="text-white "><Link href={"mailto:support@pinebookpublishing.com"}>support@pinebookpublishing.com</Link></p>
                    </div>
                    <div className="basis-full brand-main-contact-form">
                        <form className="px-10 md:px-20 py-12" onSubmit={handleSubmit}>
                            <h3 className="text-black leading-20 font-bold text-4xl  font-poppins text-start uppercase aos-init aos-animate" data-aos="zoom-out">
                                Let's Publish Your First Book!
                            </h3>
                            <p className="text-black leading-6  pb-5 text-base">
                                Make your dream book a literary success with our dedicated publishing assistance. Initiate the process with this form:
                            </p>

                            <div className="relative mb-3">
                                <input
                                    type="text"
                                    name="fullName"
                                    onChange={handleChange}
                                    value={fullName}
                                    required
                                    className="pl-4 pr-4 py-2 border rounded-lg w-full brand-connect-form-input font-poppins shadow-xl"
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
                                    className="pl-4 pr-4 py-2 border rounded-lg w-full brand-connect-form-input font-poppins shadow-xl"
                                    placeholder="Enter your Number"
                                />
                                <Image src={"/brand-img/phone-icon.png"} width={16} height={16} className="absolute left-0 top-4 ml-4" />
                                {phoneError && (
                                    <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                                )}
                            </div>
                            <div className="relative mb-3">
                                <input
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    value={email}
                                    required
                                    className="pl-4 pr-4 py-2 border rounded-lg w-full brand-connect-form-input font-poppins shadow-xl"
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
                                    className="resize-none pl-4 pr-4 py-2 border rounded-lg w-full brand-connect-form-input font-poppins shadow-xl"
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
            </section>

            <section className="max-w-screen-xl mx-auto mt-20 mb-8">
                <div className="flex justify-center gap-32 flex-col md:flex-row">
                    <div className="brand-meet-team-container text-center flex justify-center flex-col items-center">
                        <Image src={"/brand-img/team-1.webp"} width={250} height={200} className="mb-5" />
                        <h3 className="text-black leading-20 text-3xl md:text-3xl font-poppins uppercase">Damon Peters</h3>
                        <h4 className="text-black text-xl font-poppins">Head of Operations</h4>
                        <p className="text-black font-bold text-xl">damon@pinebookpublishing.com</p>
                        <p className="text-black leading-20 font-bold text-xl md:text-4xl uppercase">289-809-7465</p>
                    </div>
                    <div className="brand-meet-team-container text-center flex justify-center flex-col items-center">
                        <Image src={"/brand-img/team-3.webp"} width={250} height={200} className="mb-5" />
                        <h3 className="text-black leading-20 text-3xl md:text-3xl font-poppins uppercase">Steve Hayes</h3>
                        <h4 className="text-black text-xl font-poppins">Senior Project Consultant</h4>
                        <p className="text-black font-bold text-xl">steve@pinebookpublishing.com</p>
                        <p className="text-black leading-20 font-bold text-xl md:text-4xl uppercase">289-809-6209</p>
                    </div>
                    <div className="brand-meet-team-container text-center flex justify-center flex-col items-center">
                        <Image src={"/brand-img/team-2.webp"} width={250} height={200} className="mb-5" />
                        <h3 className="text-black leading-20 text-3xl md:text-3xl font-poppins uppercase">Ryan Peters</h3>
                        <h4 className="text-black text-xl font-poppins">Publishing Consultant</h4>
                        <p className="text-black font-bold text-xl">ryan@pinebookpublishing.com</p>
                        <p className="text-black leading-20 font-bold text-xl md:text-4xl uppercase">289-809-5612</p>
                    </div>
                </div>
            </section>
        </>
    );
}