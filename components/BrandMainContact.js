"use client";
import React, { useState } from "react";
import CountryPhoneInput from "./CountryPhoneInput";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function BrandMainContact() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [phoneError, setPhoneError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const setters = { fullName: setFullName, email: setEmail, message: setMessage, phoneNumber: setPhoneNumber };

        if (setters[name]) {
            if (name === "phoneNumber") {
                const phoneRegex = /^\d{0,15}$/;
                if (phoneRegex.test(value)) {
                    setters[name](value);
                    setPhoneError("");
                } else {
                    setPhoneError("Phone number must be digits only (up to 10 digits)");
                }
            } else {
                setters[name](value);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (phoneNumber.length < 9 || phoneNumber.length > 15) {
            setPhoneError("Enter a valid international phone number");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/send-contact-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, phoneNumber, message }),
            });

            const result = await res.json();

            if (result?.success) {
                setShowSuccess(true);
                setTimeout(() => router.push("/thank-you"), 1500);
                setTimeout(() => {
                    setShowSuccess(false);
                    setFullName("");
                    setEmail("");
                    setPhoneNumber("");
                    setMessage("");
                }, 3000);
            } else {
                alert("Form submission failed. Please try again.");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            alert("Form submission error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section>
                <div className="flex flex-col max-w-screen-xl p-1 mx-auto mt-20 mb-8 md:flex-row brand-main-contact-wrapper">
                    {/* Contact Info */}
                    <div className="px-10 py-16 text-white basis-1/3">
                        <h3 className="mb-5 text-2xl font-bold uppercase md:text-3xl font-poppins">CONTACT INFO</h3>
                        <h4 className="text-xl font-bold uppercase font-poppins">Canada Address:</h4>
                        <p className="mb-5">R-10225 Yonge St, Suite #250, Richmond Hill, ON L4C 3B2</p>
                        <h4 className="text-xl font-bold uppercase font-poppins">USA Address:</h4>
                        <p className="mb-5">211 E 43rd St, 7th Floor, Suite #424, New York City, NY 10017</p>
                        <h4 className="text-xl font-bold uppercase font-poppins">PHONE NO:</h4>
                        <p><Link href="tel:(888)786-7135">Sales: (888) 786-7135</Link></p>
                        <p className="mb-5"><Link href="tel:(866)841-7469">Support: (866) 841-7469</Link></p>
                        <h4 className="text-xl font-bold uppercase font-poppins">EMAIL ADDRESS:</h4>
                        <p><Link href="mailto:support@pinebookpublishing.com">support@pinebookpublishing.com</Link></p>
                    </div>

                    {/* Contact Form */}
                    <div className="basis-full brand-main-contact-form">
                        <form className="px-10 py-12 md:px-20" onSubmit={handleSubmit}>
                            <h3 className="mb-3 text-4xl font-bold uppercase font-poppins">Let's Publish Your First Book!</h3>
                            <p className="pb-5 text-base">Make your dream book a literary success with our dedicated publishing assistance. Initiate the process with this form:</p>

                            <div className="grid gap-3 md:grid-cols-2">
                                <div className="relative mb-3">
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your Name"
                                        required
                                        className="w-full py-2 pl-10 pr-4 border rounded-lg shadow-xl font-poppins"
                                    />
                                    <Image src="/brand-img/user-icon.png" width={16} height={16} alt="user" className="absolute left-3 top-2.5" />
                                </div>

                                <div className="relative mb-3">
                                    <CountryPhoneInput
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Enter your Number"
                                        required
                                        className="w-full py-2 pl-10 pr-4 border rounded-lg shadow-xl font-poppins"
                                    />
                                    <Image src="/brand-img/phone-icon.png" width={16} height={16} alt="phone" className="absolute left-3 top-2.5" />
                                    {phoneError && <p className="mt-1 text-sm text-red-500">{phoneError}</p>}
                                </div>
                            </div>

                            <div className="relative mb-3">
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    placeholder="Enter your Email"
                                    required
                                    className="w-full py-2 pl-10 pr-4 border rounded-lg shadow-xl font-poppins"
                                />
                                <Image src="/brand-img/email-icon.png" width={16} height={16} alt="email" className="absolute left-3 top-2.5" />
                            </div>

                            <div className="relative mb-3">
                                <textarea
                                    name="message"
                                    value={message}
                                    onChange={handleChange}
                                    placeholder="Enter your Message"
                                    rows={4}
                                    required
                                    className="w-full py-2 pl-10 pr-4 border rounded-lg shadow-xl resize-none font-poppins"
                                />
                                <FontAwesomeIcon icon={faPen} color="#000" className="absolute left-3 top-3" />
                            </div>

                            <div className="flex items-start mb-5">
                                <input id="consent" type="checkbox" required className="w-4 h-4 mt-1 mr-2" />
                                <label htmlFor="consent" className="text-sm text-gray-600">
                                    By checking this box, I consent to receive text messages related to Follow Up Messages and Appointment Reminders from Pine Book Writing and Publishing. Message & data rates may apply. Reply "STOP" to opt-out. See our <Link href="privacy-policy" className="text-blue-500" target="_blank">Privacy Policy</Link> and <Link href="terms-and-conditions" className="text-blue-500" target="_blank">Terms & Conditions</Link>.
                                </label>
                            </div>

                            {showSuccess && <p className="px-1 py-2 text-green-700">Form submitted Successfully!</p>}

                            <div className="flex justify-center">
                                <button type="submit" disabled={isSubmitting} className="p-4 mb-10 text-white uppercase bg-green-500 rounded font-poppins">
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="max-w-screen-xl mx-auto mt-20 mb-8">
                <div className="flex flex-col justify-center gap-32 md:flex-row">
                    {[
                        { name: "Damon Peters", role: "Head of Operations", email: "damon@pinebookpublishing.com", phone: "289-809-7465", img: "/brand-img/team-1.webp" },
                        { name: "Steve Hayes", role: "Senior Project Consultant", email: "steve@pinebookpublishing.com", phone: "289-809-6209", img: "/brand-img/team-3.webp" },
                        { name: "Lia Sinclair", role: "Senior Publishing Manager", email: "lia@pinebookpublishing.com", phone: "289-379-7913", img: "/brand-img/team-5.webp" },
                        { name: "Amara Johnson", role: "Senior Project Manager", email: "amara@pinebookpublishing.com", phone: "289-809-7044", img: "/brand-img/team-4.webp" },
                    ].map((member, index) => (
                        <div key={index} className="flex flex-col items-center justify-center text-center brand-meet-team-container">
                            <Image src={member.img} width={210} height={200} alt={member.name} className="mb-5" />
                            <h3 className="text-3xl text-black uppercase font-poppins">{member.name}</h3>
                            <h4 className="text-xl text-black font-poppins">{member.role}</h4>
                            <p className="text-xl font-bold text-black">{member.email}</p>
                            <p className="text-xl font-bold text-black uppercase md:text-4xl">{member.phone}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
