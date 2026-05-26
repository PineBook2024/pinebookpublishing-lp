// import useHubspotForm from "/hooks/hubspot";
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
    // const { submitMainContactForm } = useHubspotForm();
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
            const response = await fetch('/api/popup-signup-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    service: 'Brand Contact - Let’s Get In Touch',
                    message: formData.message,
                    currentPage: typeof window !== 'undefined' ? window.location.href : '',
                    referringPage: typeof document !== 'undefined' ? (document.referrer || 'Direct visit') : '',
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
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/leads/from-website`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.fullName,
                        email: formData.email,
                        phone: formData.phoneNumber,
                        message: formData.message,
                        service: "Book Publishing",
                    }),
                }
            );

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
            const emailResult = await sendEmailNotification(formData);

            const emailOk = emailResult?.success === true;

            if (emailOk) {
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

            <section className="relative overflow-hidden btm-form">
                <div className="contact-form-bg-img"></div>
                <div className="max-w-screen-xl px-8 mx-auto md:px-10">
                    <div className="pt-4 mb-12 bg-gray-200 form-mid-wrap connect-form-border">
                        <div className="flex flex-col items-end md:flex-row">
                            <div className="hidden basis-1/3 md:block position-relative">
                                <AnimateFade type={"right"} className="position-relative">
                                    <Image
                                        className="pt-10 text-center contact-form-img"
                                        src={"/brand-img/cheerful-smiling-female-professional-posing-near-office.png"}
                                        width={600}
                                        height={300}
                                        loading="lazy"
                                    ></Image>
                                </AnimateFade>
                            </div>

                            <form className="px-5 mb-5 basis-1/2 md:ml-20" onSubmit={handleSubmit}>
                                <h3 className="text-3xl font-bold text-black uppercase leading-20 md:text-4xl font-poppins text-start">
                                    Let’s Get in Touch
                                </h3>
                                <p className="pt-4 pb-5 text-base leading-6 text-black">
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
                                            className="w-full py-2 pl-4 pr-4 border rounded-lg shadow-xl brand-connect-form-input"
                                            placeholder="Enter your Name"
                                        />
                                        <Image src={"/brand-img/user-icon.png"} width={16} height={16} className="absolute left-0 ml-4 top-4" />
                                    </div>

                                    <div className="relative mb-3">
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            onChange={handleChange}
                                            value={phoneNumber}
                                            required
                                            className="w-full py-2 pl-4 pr-4 border rounded-lg shadow-xl brand-connect-form-input"
                                            placeholder="Enter your Number"
                                        />
                                        <Image src={"/brand-img/phone-icon.png"} width={16} height={16} className="absolute left-0 ml-4 top-4" />
                                        {phoneError && (
                                            <p className="mt-1 text-sm text-red-500">{phoneError}</p>
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
                                        className="w-full py-2 pl-4 pr-4 border rounded-lg shadow-xl brand-connect-form-input"
                                        placeholder="Enter your Email"
                                    />
                                    <Image src={"/brand-img/email-icon.png"} width={16} height={16} className="absolute left-0 ml-4 top-5" />
                                </div>

                                <div className="relative mb-3">
                                    <textarea
                                        onChange={handleChange}
                                        value={message}
                                        required
                                        placeholder="Enter your Message"
                                        name="message"
                                        className="w-full py-2 pl-4 pr-4 border rounded-lg shadow-xl resize-none brand-connect-form-input"
                                        rows={4}
                                    ></textarea>
                                    <FontAwesomeIcon icon={faPen} color="#000" className="absolute left-0 ml-4 top-3" width={14} />
                                    <div
                                        className="absolute inset-y-0 left-0 flex items-start pt-3 pl-3 pointer-events-none //"
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
                                    <button disabled={isSubmitting} className="p-4 mb-10 text-white uppercase bg-green-500 rounded brand-submit-btn" type="submit">
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