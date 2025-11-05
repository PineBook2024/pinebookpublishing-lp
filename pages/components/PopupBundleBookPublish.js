"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import useHubspotForm from "@/hooks/hubspot";

export default function PopupBundleBookPublish({ isOpen, onClose, service }) {
    const router = useRouter();
    const { submitPopupContactForm } = useHubspotForm();
    const [email, setEmail] = useState("");
    const [fulName, setFulName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [serviceState, setServiceState] = useState(service);
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
                    message: formData.message,
                    service: formData.service,
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
            fulName: setFulName,
            email: setEmail,
            message: setMessage,
            service: setServiceState,
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

        setIsSubmitting(true);

        const formData = {
            fullName: fulName,
            email,
            phoneNumber,
            service,
            message,
        };

        try {
            // Send to both email and HubSpot in parallel
            const [emailResult, hubspotResponse] = await Promise.all([
                // Send email notification
                sendEmailNotification(formData),
                
                // Submit to HubSpot
                submitPopupContactForm(
                    fulName,
                    email,
                    phoneNumber,
                    service,
                    message
                )
            ]);

            // Check if both submissions were successful
            if (emailResult.success && hubspotResponse) {
                console.log('Both email and HubSpot submissions successful');
                setShowSuccess(true);
                
                // Redirect to thank you page
                setTimeout(() => {
                    window.location.href = "/thankyou-offer";
                }, 1500);
                
                // Clear form after delay
                setTimeout(() => {
                    setShowSuccess(false);
                    setEmail("");
                    setFulName("");
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
                        window.location.href = "/thankyou-offer";
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
            {isOpen && (
                <section className="btm-form dark-form-bg flex-col md:flex-row fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center w-auto">
                    <div className="home-popup-modal-wrapper relative my-20">
                        <Image
                            className="text-center form-off-badge"
                            src={"/images/form-badge.png"}
                            width={130}
                            height={130}
                            loading="lazy"
                        ></Image>
                        <div className="form-mid-wrap bg-gray-200 connect-form-border mb-12 relative transparent-connect-form-border">
                            <div className="flex flex-col md:flex-row items-center justify-start gap-10 relative mx-0 md:mx-10 px-3">
                                <button type="button" onClick={onClose} className="home-close-btn-modal ml-4 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded">
                                    <svg width="100px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"></path> </g></svg>
                                </button>
                                <div className="text-center">
                                    <Image
                                        className="text-center hidden md:block home-popup-img-bg"
                                        src={"/images/pop-img.png"}
                                        width={690}
                                        height={200}
                                        loading="lazy"
                                    ></Image>
                                </div>

                                <form className="popup-form-wrapper" onSubmit={handleSubmit}>
                                    <div className="text-center">
                                        <h2 className="font-poppins text-white text-2xl mt-2">Avail Discount</h2>
                                        <p className="font-poppins text-white text-2xl">Exclusive Offer: Expert Book Publishing at <span className="text-blink">50% Off</span> – Your Story Deserves to be Heard!</p>
                                    </div>

                                    <div className="py-5">
                                        <div className="relative mb-3">
                                            <input
                                                type="text"
                                                name="fulName"
                                                onChange={handleChange}
                                                value={fulName}
                                                required
                                                className="pl-4 pr-4 py-2 border rounded-lg w-full home-connect-form-input"
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
                                                className="pl-4 pr-4 py-2 border rounded-lg w-full home-connect-form-input"
                                                placeholder="Enter your Number"
                                            />
                                            {phoneError && (
                                                <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                                            )}
                                        </div>

                                        <div className="relative mb-3">
                                            <input
                                                type="text"
                                                name="service"
                                                value={service}
                                                readOnly
                                                required
                                                className="pl-4 pr-4 py-2 border rounded-lg w-full home-connect-form-input hidden"
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
                                                className="pl-4 pr-4 py-2 border rounded-lg w-full home-connect-form-input"
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
                                                className="resize-none pl-4 pr-4 py-2 border rounded-lg w-full home-connect-form-input"
                                                rows={2}
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
                                            className="p-4 w-full bg-green-500 uppercase text-white rounded submit-btn disabled:opacity-50 disabled:cursor-not-allowed" 
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit'}
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