"use client";
import { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import useHubspotForm from "@/hooks/hubspot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function BookPublishingLp({ isOpen, setIsOpen }) {
    const router = useRouter();
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
            phoneNumber: setPhoneNumber,
            message: setMessage,
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
            router.push('/thank-you-page')
            setTimeout(() => {
                setShowSuccess(false);
                setEmail("");
                setFullName("");
                setPhoneNumber("");
                setMessage("");
                setIsOpen(false); // Close the popup after successful submission
            }, 3000);
        }

        console.log("response", response);
    };

    return (
        <>
            {isOpen && (
                <section className="btm-form flex-col md:flex-row fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center w-auto">
                    <div className="my-20">
                        <div className="new-lp-popup-form bg-gray-200 mb-12 relative">
                            <div className="flex flex-col md:flex-row items-center justify-start gap-10 relative mx-0 md:mx-5 px-3 py-5">
                                <button type="button" onClick={() => setIsOpen(false)} className="home-close-btn-modal ml-4 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded">
                                    <svg width="100px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"></path> </g></svg>
                                </button>
                                <form onSubmit={handleSubmit}>
                                    <div className="text-start">
                                        <h2 className="font-poppins text-black text-xl mt-2 font-bold coupon-text">ACTIVATE YOUR PINE BOOK PUBLISHING <br></br> COUPON TO AVAIL 50% DISCOUNT!</h2>
                                        <h3 className="font-poppins mt-2 text-2xl coupon-text-2 font-bold">LAST 9 COUPONS LEFT</h3>
                                    </div>

                                    <div className="py-5">
                                        <div className="relative mb-3">
                                            <input
                                                type="text"
                                                name="fullName"
                                                onChange={handleChange}
                                                value={fullName}
                                                required
                                                className="pl-4 pr-4 py-2 border rounded-lg w-full home-connect-form-input font-poppins"
                                                placeholder="Full Name *"
                                            />
                                            <Image src={"/brand-img/user-icon.png"} width={16} height={16} className="absolute left-0 top-3 ml-3" />
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="relative mb-3">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    onChange={handleChange}
                                                    value={email}
                                                    required
                                                    className="pl-4 pr-4 py-2 border rounded-lg w-full home-connect-form-input font-poppins"
                                                    placeholder="Email Address *"
                                                />
                                                <Image src={"/brand-img/email-icon.png"} width={16} height={16} className="absolute left-0 top-4 ml-3" />
                                            </div>
                                            <div className="relative mb-3 flex flex-col">
                                                <input
                                                    type="text"
                                                    name="phoneNumber"
                                                    onChange={handleChange}
                                                    value={phoneNumber}
                                                    required
                                                    className="pl-4 pr-4 py-2 border rounded-lg w-full home-connect-form-input font-poppins"
                                                    placeholder="Phone No. *"
                                                />
                                                <Image src={"/brand-img/phone-icon.png"} width={16} height={16} className="absolute left-0 top-3 ml-3" />
                                                {phoneError && (
                                                    <span className="text-red-500 text-md mt-1">{phoneError}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="relative mb-3">
                                            <textarea
                                                onChange={handleChange}
                                                value={message}
                                                required
                                                placeholder="Enter a brief description about your book"
                                                name="message"
                                                className="resize-none pl-4 pr-4 py-2 border rounded-lg w-full home-connect-form-input font-poppins"
                                                rows={4}
                                            ></textarea>
                                            <FontAwesomeIcon icon={faPen} color="#000" className="absolute left-0 top-3 ml-4" width={14} />
                                        </div>
                                        {showSuccess && (
                                            <p className="px-1 py-2 text-green-700">
                                                Form submitted Successfully!
                                            </p>
                                        )}
                                        <button className="p-4 w-full bg-green-500 uppercase text-white rounded font-poppins submit-btn new-lp-popup-submit-btn" type="submit">
                                            ACTIVATE COUPON NOW
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default BookPublishingLp;
