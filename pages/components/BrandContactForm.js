import useHubspotForm from "/hooks/hubspot";
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
    const { submitMainContactForm } = useHubspotForm();
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [phoneError, setPhoneError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get user location info
    const [userInfo, setUserInfo] = useState({
        ip: '',
        city: '',
        region: '',
        country: ''
    });

    useEffect(() => {
        fetchUserRegion();
    }, []);

    const fetchUserRegion = async () => {
        try {
            const response = await fetch("https://ipwhois.app/json/");
            const data = await response.json();

            setUserInfo({
                ip: data.ip || '',
                city: data.city || '',
                region: data.region || '',
                country: data.country || ''
            });
        } catch (error) {
            console.error("Failed to fetch user region:", error);
        }
    };

    const sendEmailNotification = async (formData) => {
        try {
            const response = await fetch('/api/brand-signup-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    message: formData.message,
                    currentPage: window.location.href,
                    referringPage: document.referrer || 'Direct visit',
                    userIP: userInfo.ip,
                    userCity: userInfo.city,
                    userRegion: userInfo.region,
                    userCountry: userInfo.country
                }),
            });

            const result = await response.json();

            if (!result.success) {
                console.error('Email sending failed:', result.message);
            } else {
                console.log('Email sent successfully');
            }

            return result;
        } catch (error) {
            console.error('Error sending email:', error);
            return { success: false, error: error.message };
        }
    };


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

    const submitLeadToCRM = async (formData) => {
        try {
            const response = await fetch("/api/lead-capture", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    message: formData.message,
                    // optional service:
                    // service: formData.service || "",
                }),
            });

            const data = await response.json().catch(() => ({}));

            return {
                success: response.ok && data?.success !== false,
                status: response.status,
                data,
            };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (phoneNumber.length < 9) {
            setPhoneError("Phone number must be at least 9 digits");
            return;
        }

        setIsSubmitting(true);

        const formData = {
            fullName,
            email,
            phoneNumber,
            message,
        };

        try {
            const [emailResult, hubspotResult, crmResult] = await Promise.allSettled([
                sendEmailNotification(formData),
                submitMainContactForm(fullName, email, phoneNumber, message),
                submitLeadToCRM(formData),
            ]);

            const emailOk =
                emailResult.status === "fulfilled" && emailResult.value?.success === true;

            const hubspotOk =
                hubspotResult.status === "fulfilled" && !!hubspotResult.value;

            const crmOk =
                crmResult.status === "fulfilled" && crmResult.value?.success === true;

            console.log({ emailResult, hubspotResult, crmResult });

            if (emailOk || hubspotOk || crmOk) {
                setShowSuccess(true);

                setTimeout(() => {
                    router.push("/thank-you");
                }, 1500);

                setTimeout(() => {
                    setShowSuccess(false);
                    setEmail("");
                    setFullName("");
                    setPhoneNumber("");
                    setMessage("");
                }, 3000);
            } else {
                alert("There was an error submitting your form. Please try again.");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            alert("There was an error submitting your form. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
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
                                        src={"/brand-img/cheerful-smiling-female-professional-posing-near-office.png"}
                                        width={600}
                                        height={300}
                                        loading="lazy"
                                    ></Image>
                                </AnimateFade>
                            </div>

                            <form className="basis-1/2 px-5 mb-5  md:ml-20" onSubmit={handleSubmit}>
                                <h3 className="text-black leading-20 font-bold text-3xl md:text-4xl font-poppins text-start uppercase">
                                    Let’s Get in Touch
                                </h3>
                                <p className="text-black leading-6  pb-5 text-base pt-4">
                                    Are you still hesitant about self book publishing and don’t know where to start? Just submit your query and let us guide you.
                                </p>
                                <div class="grid gap-3 md:grid-cols-2">

                                    <div className="relative mb-3">
                                        <input
                                            type="text"
                                            name="fullName"
                                            onChange={handleChange}
                                            value={fullName}
                                            required
                                            className="pl-4 pr-4 py-2 border rounded-lg w-full brand-connect-form-input shadow-xl"
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
                                            className="pl-4 pr-4 py-2 border rounded-lg w-full brand-connect-form-input shadow-xl"
                                            placeholder="Enter your Number"
                                        />
                                        <Image src={"/brand-img/phone-icon.png"} width={16} height={16} className="absolute left-0 top-4 ml-4" />
                                        {phoneError && (
                                            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="relative mb-3">
                                    <input
                                        type="text"
                                        name="email"
                                        onChange={handleChange}
                                        value={email}
                                        required
                                        className="pl-4 pr-4 py-2 border rounded-lg w-full brand-connect-form-input shadow-xl"
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
                                        className="resize-none pl-4 pr-4 py-2 border rounded-lg w-full brand-connect-form-input shadow-xl"
                                        rows={4}
                                    ></textarea>
                                    <FontAwesomeIcon icon={faPen} color="#000" className="absolute left-0 top-3 ml-4" width={14} />
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 pt-3 
                              flex items-start  
                              pointer-events-none"
                                    ></div>
                                </div>
                                <div class="flex items-start mb-5">
                                    <div class="flex items-center h-5">
                                        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                    </div>
                                    <label for="remember" class="ms-2 text-sm font-medium text-gray-600 dark:text-gray-300">By checking this box, I consent to received text messages related to Follow Up Messages and Appointment Reminders from Pine Book Writing and Publishing. you can reply "STOP" at any time to opt-out. Message and data rates may apply. Message Frequency may vary, text Help to <Link href="tel:(866) 841-7469" className="text-blue-500">(866) 841-7469</Link> for assistance. For more information, please refer to our <Link href="privacy-policy" className="text-blue-500" target="_blank">PRIVACY POLICY</Link> and SMS <Link href="terms-and-conditions" className="text-blue-500" target="_blank"> TERMS and CONDITIONS </Link> on our website</label>
                                </div>
                                {showSuccess && (
                                    <p className="px-1 py-2 text-green-700">
                                        Form submitted Successfully!
                                    </p>
                                )}
                                <div className="flex justify-center">
                                    <button disabled={isSubmitting} className="p-4 bg-green-500 uppercase text-white rounded brand-submit-btn mb-10" type="submit">
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}