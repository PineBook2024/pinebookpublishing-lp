"use client";
import { useState } from "react";
import CountryPhoneInput from "./CountryPhoneInput";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function BookPublishingLp({ isOpen, setIsOpen }) {
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
    const setters = {
      fullName: setFullName,
      email: setEmail,
      phoneNumber: setPhoneNumber,
      message: setMessage,
    };

    const setter = setters[name];
    if (!setter) return;

    if (name === "phoneNumber") {
      const phoneRegex = /^\d{0,}$/;
      if (phoneRegex.test(value)) {
        setter(value);
        if (value.length < 9) setPhoneError("Phone number must be at least 9 digits");
        else setPhoneError("");
      } else {
        setPhoneError("Invalid phone number format");
      }
    } else {
      setter(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.length < 9) {
      setPhoneError("Phone number must be at least 9 digits");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-popup-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          message,
          currentPage: typeof window !== "undefined" ? window.location.href : "",
          referringPage:
            typeof document !== "undefined" ? document.referrer || "Direct visit" : "Direct visit",
        }),
      });

      const result = await response.json();

      if (result?.success) {
        setShowSuccess(true);
        setTimeout(() => router.push("/thank-you-page"), 1500);
        setTimeout(() => {
          setShowSuccess(false);
          setEmail("");
          setFullName("");
          setPhoneNumber("");
          setMessage("");
          setIsOpen(false);
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
      {isOpen && (
        <section className="fixed inset-0 z-50 flex flex-col items-center justify-center w-auto bg-black bg-opacity-50 btm-form md:flex-row">
          <div className="my-20">
            <div className="relative mb-12 bg-gray-200 new-lp-popup-form">
              <div className="relative flex flex-col items-center justify-start gap-10 px-3 py-5 mx-0 md:flex-row md:mx-5">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 ml-4 text-black bg-gray-300 rounded home-close-btn-modal hover:bg-gray-400"
                >
                  <svg width="100px" height="30px" viewBox="0 0 24 24" fill="none">
                    <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"></path>
                  </svg>
                </button>

                <form onSubmit={handleSubmit}>
                  <div className="text-start">
                    <h2 className="mt-2 text-xl font-bold text-black font-poppins coupon-text">
                      ACTIVATE YOUR PINE BOOK PUBLISHING <br /> COUPON TO AVAIL 50% DISCOUNT!
                    </h2>
                    <h3 className="mt-2 text-2xl font-bold font-poppins coupon-text-2">LAST 9 COUPONS LEFT</h3>
                  </div>

                  <div className="py-5">
                    <div className="relative mb-3">
                      <input
                        type="text"
                        name="fullName"
                        onChange={handleChange}
                        value={fullName}
                        required
                        className="w-full py-2 pl-4 pr-4 border rounded-lg home-connect-form-input font-poppins"
                        placeholder="Full Name *"
                      />
                      <Image src="/brand-img/user-icon.png" width={16} height={16} className="absolute left-0 ml-3 top-3" />
                    </div>

                    <div className="flex gap-4">
                      <div className="relative mb-3">
                        <input
                          type="text"
                          name="email"
                          onChange={handleChange}
                          value={email}
                          required
                          className="w-full py-2 pl-4 pr-4 border rounded-lg home-connect-form-input font-poppins"
                          placeholder="Email Address *"
                        />
                        <Image src="/brand-img/email-icon.png" width={16} height={16} className="absolute left-0 ml-3 top-4" />
                      </div>

                      <div className="relative flex flex-col mb-3">
                        <CountryPhoneInput
                          name="phoneNumber"
                          onChange={handleChange}
                          value={phoneNumber}
                          required
                          className="w-full py-2 pl-4 pr-4 border rounded-lg home-connect-form-input font-poppins"
                          placeholder="Phone No. *"
                        />
                        <Image src="/brand-img/phone-icon.png" width={16} height={16} className="absolute left-0 ml-3 top-3" />
                        {phoneError && <span className="mt-1 text-red-500 text-md">{phoneError}</span>}
                      </div>
                    </div>

                    <div className="relative mb-3">
                      <textarea
                        onChange={handleChange}
                        value={message}
                        required
                        placeholder="Enter a brief description about your book"
                        name="message"
                        className="w-full py-2 pl-4 pr-4 border rounded-lg resize-none home-connect-form-input font-poppins"
                        rows={4}
                      ></textarea>
                      <FontAwesomeIcon icon={faPen} color="#000" className="absolute left-0 ml-4 top-3" width={14} />
                    </div>

                    {showSuccess && <p className="px-1 py-2 text-green-700">Form submitted Successfully!</p>}

                    <button
                      className="w-full p-4 text-white uppercase bg-green-500 rounded font-poppins submit-btn new-lp-popup-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "ACTIVATE COUPON NOW"}
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
