"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import AnimateFade from "./fade";
import { useRouter } from "next/navigation";

export default function BrandContact() {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          message,
          currentPage: typeof window !== "undefined" ? window.location.href : "",
          referringPage: typeof document !== "undefined" ? document.referrer || "Direct visit" : "Direct visit",
        }),
      });

      const result = await response.json();

      if (result?.success) {
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
                  alt="Contact Illustration"
                />
              </AnimateFade>
            </div>

            <form className="px-5 mb-5 basis-1/2 md:ml-20" onSubmit={handleSubmit}>
              <h3 className="text-3xl font-bold text-black uppercase leading-20 md:text-4xl font-poppins text-start">
                Let’s Get in Touch
              </h3>
              <p className="pt-4 pb-5 text-base leading-6 text-black">
                Are you still hesitant about self book publishing and don’t know where to start? Just submit your query and let us guide you.
              </p>

              <div className="grid gap-3 md:grid-cols-2">
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
                  <Image src={"/brand-img/user-icon.png"} width={16} height={16} className="absolute left-0 ml-4 top-4" alt="User Icon"/>
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
                  <Image src={"/brand-img/phone-icon.png"} width={16} height={16} className="absolute left-0 ml-4 top-4" alt="Phone Icon"/>
                  {phoneError && <p className="mt-1 text-sm text-red-500">{phoneError}</p>}
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
                <Image src={"/brand-img/email-icon.png"} width={16} height={16} className="absolute left-0 ml-4 top-5" alt="Email Icon"/>
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
              </div>

              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input id="remember" type="checkbox" required className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                </div>
                <label htmlFor="remember" className="text-sm font-medium text-gray-600 ms-2">
                  By checking this box, I consent to receive text messages related to Follow Up Messages and Appointment Reminders from Pine Book Writing and Publishing. You can reply "STOP" at any time to opt-out. Message and data rates may apply. Text Help to <Link href="tel:(866)841-7469" className="text-blue-500">(866) 841-7469</Link> for assistance. For more info, refer to our <Link href="privacy-policy" className="text-blue-500" target="_blank">PRIVACY POLICY</Link> and <Link href="terms-and-conditions" className="text-blue-500" target="_blank">TERMS AND CONDITIONS</Link>.
                </label>
              </div>

              {showSuccess && <p className="px-1 py-2 text-green-700">Form submitted Successfully!</p>}

              <div className="flex justify-center">
                <button className="p-4 mb-10 text-white uppercase bg-green-500 rounded brand-submit-btn" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
