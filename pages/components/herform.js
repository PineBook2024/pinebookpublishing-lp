import useHubspotForm from "@/hooks/hubspot";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';


export default function HeroForm() {
  const router = useRouter();
  const { submitContactForm } = useHubspotForm();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Object
  const clientLogos = [
    {
      href: "https://goo.gl/maps/D6kJBoXBJYwcZWkP7",
      src: "/images/s1.png",
      alt: "LOGO",
      width: 130,
      height: 60
    },
    {
      href: "https://www.bbb.org/ca/on/richmond-hill/profile/publishers-book/pine-book-writing-inc-0107-1406919",
      src: "/images/s2.png",
      alt: "LOGO",
      width: 130,
      height: 60
    },
    {
      href: "https://www.trustpilot.com/review/pinebookwriting.com",
      src: "/images/s3.png",
      alt: "LOGO",
      width: 130,
      height: 60
    },
    {
      href: "https://www.yelp.com/biz/pine-book-writing-richmond-hill",
      src: "/images/s4.png",
      alt: "LOGO",
      width: 130,
      height: 60
    },
    {
      href: "https://clutch.co/profile/pine-book-writing",
      src: "/images/s6.png",
      alt: "LOGO",
      width: 130,
      height: 60
    }
  ];


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
      // router.push('/thank-you'); 
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
    <div className="container mx-4 pt-20 md:mx-32">
      <div className="grid grid-cols-1 sm:gap-8 sm:py-0 md:grid-cols-2 text-left items-start justify-between md:gap-8 md:py-36">
        <div className="mb-4">
          {/* <h2 className="text-sm md:base scroll-animation">
            <span> #1 SELF </span> PUBLISHING COMPANY
          </h2> */}
          <h1 className="font-majallab text-5xl md:text-8xl">
            Publish Your Dreams!
          </h1>
          <p>Our comprehensive<span>KDP (Kindle Direct Publishing) and Self-Publishing Services</span>transform your manuscript from editing to distribution, ensuring it is accessible to readers globally.</p>
          {/* <button className="get-premium-btn" onClick={handleOpenChat}>Get premium book publishing services</button> */}
          <div className="flex justify-start items-center mt-8 gap-2 md:gap-x-8 client-logo-sec">
            {clientLogos.map((logo, index) => (
              <a key={index} href={logo.href}>
                <Image
                  alt={logo.alt}
                  src={logo.src}
                  width={logo.width}
                  height={logo.height}
                />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="w-full rounded-2xl px-8 py-8 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border-gray-100">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div class="relative">
                <input
                  type="text"
                  name="fullName"
                  onChange={handleChange}
                  value={fullName}
                  required
                  class="pl-4 pr-4 py-2 border rounded-lg w-full font-majallab text-xl"
                  placeholder="Enter your Name"
                />
              </div>
              <div class="relative">
                <input
                  type="text"
                  onChange={handleChange}
                  value={phoneNumber}
                  name="phoneNumber"
                  required
                  class="pl-4 pr-4 py-2 border rounded-lg w-full font-majallab text-xl"
                  placeholder="Enter your Phone"
                />
              </div>
              <div class="relative">
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={email}
                  required
                  class="pl-4 pr-4 py-2 border rounded-lg w-full font-majallab text-xl"
                  placeholder="Enter your Email"
                />
              </div>
              <div class="relative">
                <textarea
                  class="pl-4 pr-4 py-2 border rounded-lg w-full font-majallab text-xl"
                  rows={5}
                  onChange={handleChange}
                  value={message}
                  required
                  placeholder="Enter your Message"
                  name="message"
                ></textarea>
                <div
                  class="absolute inset-y-0 left-0 pl-3 pt-3 
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
                className="w-full p-4 text-white uppercase header-submit-btn rounded font-poppins"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
