"use client";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useHubspotForm from "/hooks/hubspot";

export default function HomePopupJuneteenth() {
  const getOfferTimeLeft = () => {
    const offerDeadline = new Date(2026, 5, 19, 23, 59, 59);
    return Math.max(0, Math.floor((offerDeadline.getTime() - Date.now()) / 1000));
  };
  const router = useRouter();
  const pathname = usePathname();
  const { submitMainContactForm } = useHubspotForm();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(getOfferTimeLeft);

  const timerParts = {
    hours: String(Math.floor(timeLeft / 3600)).padStart(2, "0"),
    minutes: String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0"),
    seconds: String(timeLeft % 60).padStart(2, "0"),
  };

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getOfferTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!Object.prototype.hasOwnProperty.call(form, name)) return;

    if (name === "phoneNumber") {
      const phoneRegex = /^\d{0,}$/;
      if (phoneRegex.test(value)) {
        setForm((prev) => ({ ...prev, [name]: value }));
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

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.phoneNumber.length < 9) {
      setPhoneError("Phone number must be at least 9 digits");
      return;
    }

    setIsSubmitting(true);

    try {
      const hubspotResponse = await submitMainContactForm(
        form.fullName,
        form.email,
        form.phoneNumber,
        form.message
      );

      if (hubspotResponse) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/thank-you");
        }, 1500);

        setTimeout(() => {
          setShowSuccess(false);
          setForm({ fullName: "", email: "", phoneNumber: "", message: "" });
        }, 3000);
      } else {
        console.error("HubSpot submission failed");
        alert("There was an error submitting your form. Please try again.");
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
        <section className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/60 p-3 md:p-6">
          <div className="relative my-auto w-full max-w-[1170px] overflow-hidden rounded-[24px] bg-[#e8e8ee] shadow-2xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
              className="popup-close-btn absolute top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#10163d] text-white transition hover:opacity-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-[490px_1fr]">
              <div className="jt-popup-image relative aspect-[841/1124] w-full bg-[#eef3ee]">
                <Image
                  src="/images/indep.png"
                  alt="independence day popup banner"
                  fill
                  className="object-cover object-center"
                  priority
                />
                {/* <div className="absolute inset-x-0 bottom-0 flex justify-start bg-gradient-to-t from-black/60 to-transparent p-5 md:p-6">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-[#0f1438] px-6 py-3 font-poppins text-sm font-semibold uppercase text-white transition hover:bg-[#1b235e]"
                  >
                    Explore Now
                  </button>
                </div> */}
              </div>

              <div className="relative bg-[#f3f4f8] p-5 md:p-8">
                <div className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-bl from-[#f39a1f] to-[#df3369] [clip-path:polygon(100%_0,0_0,100%_100%)]" />

                <form onSubmit={handleSubmit}>
                  <div className="mb-6 text-left">
                    <h2
                      className="text-2xl font-extrabold leading-tight text-[#10163d] md:text-[36px]"
                      style={{
                        fontFamily: "'Merriweather', serif",
                        letterSpacing: "0.2px",
                        textWrap: "balance",
                      }}
                    >
                      Avail 50% Discount on Publishing This Independence Day!
                    </h2>
                    <p className="mt-3 font-poppins text-sm leading-6 text-[#3b4155] md:text-[15px]">
                      Have you completed your manuscript and are ready to share your story with the world? This Independence Day, enjoy an exclusive 50% discount on all of our book publishing packages and take the next step toward becoming a published author.
                      <br />Turn your manuscript into a professionally published book for half the cost       </p>
                  </div>

                  {timeLeft > 0 && (
                    <div className="jt-offer-timer" aria-label={`${timerParts.hours} hours ${timerParts.minutes} minutes ${timerParts.seconds} seconds remaining`}>
                      <p className="jt-offer-title">LIMITED TIME OFFER</p>
                      <div className="jt-countdown">
                        {["hours", "minutes", "seconds"].map((part, partIndex) => (
                          <Fragment key={part}>
                            <div className="jt-time-group">
                              {timerParts[part].split("").map((digit, digitIndex) => (
                                <span className="jt-time-digit" key={`${part}-${digitIndex}`}>
                                  {digit}
                                </span>
                              ))}
                            </div>
                            {partIndex < 2 && <span className="jt-time-separator">:</span>}
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <input
                      type="text"
                      name="fullName"
                      onChange={handleChange}
                      value={form.fullName}
                      required
                      className="h-12 w-full rounded-lg border border-[#ced3ea] bg-white px-4 font-poppins text-sm text-[#0f1535] outline-none focus:border-[#2c9384]"
                      placeholder="Enter your Name"
                    />

                    <input
                      type="text"
                      name="phoneNumber"
                      onChange={handleChange}
                      value={form.phoneNumber}
                      required
                      className="h-12 w-full rounded-lg border border-[#ced3ea] bg-white px-4 font-poppins text-sm text-[#0f1535] outline-none focus:border-[#2c9384]"
                      placeholder="Enter your Phone"
                    />
                    {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}

                    <input
                      type="text"
                      name="email"
                      onChange={handleChange}
                      value={form.email}
                      required
                      className="h-12 w-full rounded-lg border border-[#ced3ea] bg-white px-4 font-poppins text-sm text-[#0f1535] outline-none focus:border-[#2c9384]"
                      placeholder="Enter your Email"
                    />

                    <textarea
                      onChange={handleChange}
                      value={form.message}
                      required
                      placeholder="Enter your Message"
                      name="message"
                      className="min-h-[88px] w-full resize-none rounded-lg border border-[#ced3ea] bg-white px-4 py-3 font-poppins text-sm text-[#0f1535] outline-none focus:border-[#2c9384]"
                      rows={3}
                    />

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
        .popup-close-btn {
          right: 16px;
        }
        .jt-offer-timer {
          margin: -6px 0 18px;
          padding: 14px 12px 12px;
          border-radius: 12px;
          background: #10163d;
          text-align: center;
        }
        .jt-offer-title {
          margin: 0 0 6px;
          color: #fff;
          font-family: "Poppins", sans-serif;
          font-size: 20px;
          font-weight: 800;
          line-height: 1;
        }
        .jt-countdown {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        .jt-time-group {
          display: flex;
          gap: 3px;
        }
        .jt-time-digit {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 23px;
          height: 38px;
          overflow: hidden;
          border-radius: 5px;
          background: linear-gradient(#ffc331 0 48%, #f1a900 48% 52%, #ffc331 52% 100%);
          color: #050505;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 28px;
          font-weight: 900;
          line-height: 1;
          box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.18);
        }
        .jt-time-digit::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 2px;
          background: rgba(0, 0, 0, 0.32);
          transform: translateY(-50%);
        }
        .jt-time-separator {
          color: #fff;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 29px;
          font-weight: 900;
          line-height: 1;
        }
        :global(.jt-popup-image) {
          height: 100%;
        }
        @media (min-width: 768px) {
          :global(.jt-popup-image) {
            aspect-ratio: auto;
            min-height: 100%;
          }
        }
      `}</style>
    </>
  );
}
