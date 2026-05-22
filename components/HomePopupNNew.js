"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useHubspotForm from "/hooks/hubspot";

export default function HomePopupNew() {
  const router = useRouter();
  const pathname = usePathname();
  const { submitMainContactForm } = useHubspotForm();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const [userInfo, setUserInfo] = useState({
    ip: "",
    city: "",
    region: "",
    country: "",
  });

  useEffect(() => {
    fetchUserRegion();
  }, []);

  const fetchUserRegion = async () => {
    try {
      const response = await fetch("https://ipwhois.app/json/");
      const data = await response.json();

      setUserInfo({
        ip: data.ip || "",
        city: data.city || "",
        region: data.region || "",
        country: data.country || "",
      });
    } catch (error) {
      console.error("Failed to fetch user region:", error);
    }
  };

  const sendEmailNotification = async (formData) => {
    try {
      const response = await fetch("/api/brand-signup-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          message: formData.message,
          currentPage: window.location.href,
          referringPage: document.referrer || "Direct visit",
          userIP: userInfo.ip,
          userCity: userInfo.city,
          userRegion: userInfo.region,
          userCountry: userInfo.country,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        console.error("Email sending failed:", result.message);
      }

      return result;
    } catch (error) {
      console.error("Error sending email:", error);
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
    if (!setter) return;

    if (name === "phoneNumber") {
      const phoneRegex = /^\d{0,}$/;
      if (phoneRegex.test(value)) {
        setter(value);
        if (value.length > 0 && value.length < 9) {
          setPhoneError("Phone number must be at least 9 digits");
        } else {
          setPhoneError("");
        }
      } else {
        setPhoneError("Invalid phone number format");
      }
      return;
    }

    setter(value);
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
      const [emailResult, hubspotResponse, crmResult] = await Promise.all([
        sendEmailNotification(formData),
        submitMainContactForm(fullName, email, phoneNumber, message),
        fetch("/api/lead-capture", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }).then((r) => r.json()),
      ]);

      const crmOk = crmResult?.success === true;
      console.log(crmOk);

      if (emailResult.success && hubspotResponse) {
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
        if (!emailResult.success) {
          console.error("Email submission failed:", emailResult.message);
        }
        if (!hubspotResponse) {
          console.error("HubSpot submission failed");
        }

        if (emailResult.success || hubspotResponse) {
          setShowSuccess(true);
          setTimeout(() => {
            router.push("/thank-you");
          }, 1500);
        } else {
          alert("There was an error submitting your form. Please try again.");
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (pathname === "/thank-you") return null;

  return (
    <>
      {isOpen && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 md:p-6">
          <div className="relative w-full max-w-6xl overflow-hidden rounded-[24px] bg-[#e8e8ee] shadow-2xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#10163d] text-white transition hover:opacity-90"
            >
              ×
            </button>

            <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr]">
              <div className="relative min-h-[260px] md:min-h-[700px]">
                <Image
                  src="/brand-img/01-02.jpg"
                  alt="Memorial Day popup banner"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-5 md:p-8">
                  <h3 className="max-w-[420px] font-poppins text-3xl font-bold leading-tight text-white md:text-[56px]">
                    <span className="popup-typewriter">Get 50% OFF</span>
                  </h3>
                  <button
                    type="button"
                    className="mt-5 inline-flex items-center rounded-md bg-[#0f1438] px-6 py-3 font-poppins text-sm font-semibold uppercase text-white transition hover:bg-[#1b235e]"
                  >
                    Explore Now
                  </button>
                </div>
              </div>

              <div className="relative bg-[#f3f4f8] p-5 md:p-8">
                <div className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-bl from-[#f39a1f] to-[#df3369] [clip-path:polygon(100%_0,0_0,100%_100%)]" />

                <form onSubmit={handleSubmit}>
                  <div className="mb-6 text-left">
                    <h2
                      className="text-2xl font-extrabold leading-tight text-[#10163d] md:text-[34px]"
                      style={{
                        fontFamily: "'Merriweather', serif",
                        letterSpacing: "0.2px",
                        textWrap: "balance",
                      }}
                    >
                      Memorial Day Special - Get 50% OFF on Your Book Project
                    </h2>
                    <p className="mt-3 font-poppins text-sm leading-6 text-[#3b4155] md:text-[15px]">
                      Have you completed your manuscript and want it published now? On this Memorial Day, get an exclusive 50% discount on all of our book publishing packages.                    </p>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      name="fullName"
                      onChange={handleChange}
                      value={fullName}
                      required
                      className="h-12 w-full rounded-lg border border-[#ced3ea] bg-white px-4 font-poppins text-sm text-[#0f1535] outline-none focus:border-[#2c9384]"
                      placeholder="Enter your Name"
                    />

                    <input
                      type="text"
                      name="phoneNumber"
                      onChange={handleChange}
                      value={phoneNumber}
                      required
                      className="h-12 w-full rounded-lg border border-[#ced3ea] bg-white px-4 font-poppins text-sm text-[#0f1535] outline-none focus:border-[#2c9384]"
                      placeholder="Enter your Phone"
                    />
                    {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}

                    <input
                      type="text"
                      name="email"
                      onChange={handleChange}
                      value={email}
                      required
                      className="h-12 w-full rounded-lg border border-[#ced3ea] bg-white px-4 font-poppins text-sm text-[#0f1535] outline-none focus:border-[#2c9384]"
                      placeholder="Enter your Email"
                    />

                    <textarea
                      onChange={handleChange}
                      value={message}
                      required
                      placeholder="Enter your Message"
                      name="message"
                      className="min-h-[88px] w-full resize-none rounded-lg border border-[#ced3ea] bg-white px-4 py-3 font-poppins text-sm text-[#0f1535] outline-none focus:border-[#2c9384]"
                      rows={3}
                    />

                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="popup-consent"
                          type="checkbox"
                          className="h-4 w-4 rounded-sm border border-gray-300 bg-gray-50"
                          required
                        />
                      </div>
                      <label htmlFor="popup-consent" className="ms-2 text-xs font-medium text-[#3b4155]">
                        By checking this box, I consent to received text messages related to Follow Up Messages and Appointment Reminders from Pine Book Writing and Publishing. you can reply "STOP" at any time to opt-out. Message and data rates may apply. Message Frequency may vary, text Help to <Link href="tel:(866) 841-7469" className="text-blue-600">(866) 841-7469</Link> for assistance. For more information, please refer to our <Link href="privacy-policy" className="text-blue-600" target="_blank">PRIVACY POLICY</Link> and SMS <Link href="terms-and-conditions" className="text-blue-600" target="_blank"> TERMS and CONDITIONS </Link> on our website.
                      </label>
                    </div>

                    {showSuccess && (
                      <p className="px-1 py-2 text-green-700">Form submitted Successfully!</p>
                    )}

                    <button
                      className="w-full rounded-lg bg-[#10163d] p-3 font-poppins text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#17205a] disabled:cursor-not-allowed disabled:opacity-50"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Activate Your 50% Discount"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
      <style jsx>{`
        .popup-typewriter {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #ffffff;
          width: 0;
          animation: typing 2.4s steps(11, end) infinite, blink 0.8s step-end infinite;
        }

        @keyframes typing {
          0% {
            width: 0;
          }
          45% {
            width: 11ch;
          }
          70% {
            width: 11ch;
          }
          100% {
            width: 0;
          }
        }

        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }
      `}</style>
    </>
  );
}
