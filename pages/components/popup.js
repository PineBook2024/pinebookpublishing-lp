
"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle, faCross, faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useHubspotForm from "@/hooks/hubspot";

export default function popup({ isOpen, onClose, service }) {
    // const searchParams = useSearchParams();
    // const modal = searchParams.get("modal-digital-design");
    // const pathname = usePathname();
    const router = useRouter();

    const { submitContactForm } = useHubspotForm();
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        setTimeout(() => {
          router.push('/publishing-lp');
        }, 3000);
      }, [router]);

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
            {isOpen && (
                //   <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                //     <div className="bg-white p-5 rounded-lg max-w-sm w-full">
                //       <h2 className="text-xl font-bold">Request a Quote</h2>
                //       <p className="mb-4">You are requesting a quote for: <strong>{service}</strong></p>
                //       <form onSubmit={(e) => {
                //         e.preventDefault();
                //         alert(`Submitting form for ${service}`);
                //         onClose();
                //       }}>
                //         {/* Include your form fields here */}
                //         <input type="text" placeholder="Your Name" className="border p-2 w-full mb-4"/>
                //         <input type="email" placeholder="Your Email" className="border p-2 w-full mb-4"/>
                //         <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                //           Send Request
                //         </button>
                //         <button type="button" onClick={onClose} className="ml-4 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded">
                //           Cancel
                //         </button>
                //       </form>
                //     </div>
                //   </div>
                <section className="btm-form flex-col md:flex-row fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center w-auto">

                    <div className="popup-modal-wrapper">
                        <div className="form-mid-wrap bg-gray-200 connect-form-border mb-12 relative">
                            <div className="flex flex-col md:flex-row items-center justify-center relative">
                                <button type="button" onClick={onClose} className="close-btn-modal ml-4 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded">
                                    {/* <FontAwesomeIcon icon={faCross} color="#fff" /> */}
                                    <svg width="100px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"></path> </g></svg>
                                </button>
                                <div className="basis-1/2 text-center">
                                    <Image
                                        className="text-center hidden md:block popup-img-bg"
                                        src={"/images/popup-img.webp"}
                                        width={550}
                                        height={600}
                                        loading="lazy"
                                    ></Image>
                                </div>

                                <form className="basis-1/2 mb-5  md:ml-10 md:mr-10 pt-20" onSubmit={handleSubmit}>

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
                                            name="phoneNumber"
                                            onChange={handleChange}
                                            value={phoneNumber}
                                            required
                                            className="pl-4 pr-4 py-2 border rounded-lg w-full connect-form-input font-majallab hidden"
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
                                    <button className="p-4 w-full bg-green-500 uppercase text-white rounded font-poppins submit-btn mb-10" type="submit">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}