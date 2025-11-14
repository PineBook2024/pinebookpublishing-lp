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
            // Send to both email and HubSpot in parallel
            const [emailResult, hubspotResponse] = await Promise.all([
                // Send email notification
                sendEmailNotification(formData),

                // Submit to HubSpot
                submitMainContactForm(
                    fullName,
                    email,
                    phoneNumber,
                    message
                )
            ]);

            // Check if both submissions were successful
            if (emailResult.success && hubspotResponse) {
                console.log('Both email and HubSpot submissions successful');
                setShowSuccess(true);

                // Redirect to thank you page
                setTimeout(() => {
                    router.push("/thank-you");
                }, 1500);

                // Clear form after delay
                setTimeout(() => {
                    setShowSuccess(false);
                    setEmail("");
                    setFullName("");
                    setPhoneNumber("");
                    setMessage("");
                }, 3000);
            } else {
                // Handle partial failure
                if (!emailResult.success) {
                    console.error('Email submission failed:', emailResult.message);
                }
                if (!hubspotResponse) {
                    console.error('HubSpot submission failed');
                }

                // Still show success if at least one succeeded
                if (emailResult.success || hubspotResponse) {
                    setShowSuccess(true);
                    setTimeout(() => {
                        router.push("/thank-you");
                    }, 1500);
                } else {
                    alert('There was an error submitting your form. Please try again.');
                }
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error submitting your form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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
                        <p className="text-white"><Link href="tel:(888) 786-7135">Sales: (888) 786-7135</Link></p>
                        <p className="text-white mb-5"><Link href="tel:(866) 841-7469">Support: (866) 841-7469</Link></p>
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
                            <div class="grid gap-3 md:grid-cols-2">

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
                                <button disabled={isSubmitting} className="p-4 bg-green-500 uppercase text-white rounded font-poppins brand-submit-btn mb-10" type="submit">
                                     {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

               <section className="max-w-screen-xl mx-auto mt-20 mb-8">
                <div className="flex justify-around md:flex-row">
                    <div className="brand-meet-team-container text-center flex justify-center flex-col items-center">
                        <Image src={"/brand-img/team-6.png"} width={210} height={200} className="mb-5" />
                        <h3 className="text-black leading-20 text-3xl md:text-3xl font-poppins uppercase">Kenneth Snyder</h3>
                        <h4 className="text-black text-xl font-poppins">Head of Operations</h4>
                        <p className="text-black font-bold text-xl">Kenneth@pinebookwriting.com</p>
                        <p className="text-black leading-20 font-bold text-xl md:text-4xl uppercase">289-809-7142</p>
                    </div>
                    <div className="brand-meet-team-container text-center flex justify-center flex-col items-center">
                        <Image src={"/brand-img/team-7.png"} width={210} height={200} className="mb-5" />
                        <h3 className="text-black leading-20 text-3xl md:text-3xl font-poppins uppercase">Emily Jones</h3>
                        <h4 className="text-black text-xl font-poppins">Project Manager</h4>
                        <p className="text-black font-bold text-xl">emily@pinebookwriting.com</p>
                        <p className="text-black leading-20 font-bold text-xl md:text-4xl uppercase">(289) 372-0660</p>
                    </div>
                    <div className="brand-meet-team-container text-center flex justify-center flex-col items-center">
                        <Image src={"/brand-img/team-3.webp"} width={210} height={200} className="mb-5" />
                        <h3 className="text-black leading-20 text-3xl md:text-3xl font-poppins uppercase">Steve Hayes</h3>
                        <h4 className="text-black text-xl font-poppins">Senior Project Consultant</h4>
                        <p className="text-black font-bold text-xl">steve@pinebookwriting.com</p>
                        <p className="text-black leading-20 font-bold text-xl md:text-4xl uppercase">289-809-6209</p>
                    </div>
                </div>

                <div className="flex justify-around flex-col md:flex-row">
                    <div className="w-1/2 brand-meet-team-container text-center flex justify-center flex-col items-center mt-5">
                        <Image src={"/brand-img/team-9.png"} width={210} height={200} className="mb-5" />
                        <h3 className="text-black leading-20 text-3xl md:text-3xl font-poppins uppercase">REX BROWN</h3>
                        <h4 className="text-black text-xl font-poppins">SENIOR PROJECT MANAGER</h4>
                        <p className="text-black font-bold text-xl">Rex.brown@pinebookwriting.com</p>
                        <p className="text-black leading-20 font-bold text-xl md:text-4xl uppercase">+1 (289) 809 7044</p>
                    </div>
                    <div className="w-1/2 brand-meet-team-container text-center flex justify-center flex-col items-center mt-5">
                        <Image src={"/brand-img/team-5.webp"} width={210} height={200} className="mb-5" />
                        <h3 className="text-black leading-20 text-3xl md:text-3xl font-poppins uppercase">Lia Sinclair</h3>
                        <h4 className="text-black text-xl font-poppins">Publishing Consultant</h4>
                        <p className="text-black font-bold text-xl">lia@pinebookwriting.com</p>
                        <p className="text-black leading-20 font-bold text-xl md:text-4xl uppercase">289-379-7913</p>
                    </div>
                     <div className="w-1/2 brand-meet-team-container text-center flex justify-center flex-col items-center mt-5">
                        <Image src={"/brand-img/team-8.png"} width={210} height={200} className="mb-5" />
                        <h3 className="text-black leading-20 text-3xl md:text-3xl font-poppins uppercase">Jerome Preston</h3>
                        <h4 className="text-black text-xl font-poppins">Senior Consultant & Outreach Manager</h4>
                        <p className="text-black font-bold text-xl">jerome@pinebookwriting.com</p>
                        <p className="text-black leading-20 font-bold text-xl md:text-4xl uppercase">(289) 809-1995</p>
                    </div>
                </div>
            </section>
        </>
    );
}