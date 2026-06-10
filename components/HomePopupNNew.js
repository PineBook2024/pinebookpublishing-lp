"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
        <div className="jt-overlay">
          <div className="jt-modal">
            <button
              type="button"
              className="jt-close"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="jt-grid">
              {/* Image side */}
              <div className="jt-image">
                <img src="/brand-img/JuneTeenth.jpg" alt="Juneteenth popup banner" />
                <div className="jt-image-footer">
                  <button type="button" className="jt-explore">Explore Now</button>
                </div>
              </div>

              {/* Form side */}
              <div className="jt-form-side">
                <span className="jt-corner" />
                <form onSubmit={handleSubmit}>
                  <h2 className="jt-title">Avail 50% Discount On Publishing This Juneteenth!</h2>
                  <p className="jt-text">
                    Have you completed your manuscript and want it published now? On Juneteenth,
                    get an exclusive 50% discount on all of our book publishing packages.
                  </p>

                  <div className="jt-fields">
                    <input
                      type="text"
                      name="fullName"
                      value={fullName}
                      onChange={handleChange}
                      placeholder="Enter your Name"
                      required
                    />
                    <input
                      type="text"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter your Phone"
                      required
                    />
                    {phoneError && <p className="jt-error">{phoneError}</p>}
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="Enter your Email"
                      required
                    />
                    <textarea
                      name="message"
                      rows={3}
                      value={message}
                      onChange={handleChange}
                      placeholder="Enter your Message"
                      required
                    />
                    {showSuccess && (
                      <p className="jt-success">Form submitted Successfully!</p>
                    )}
                    <button type="submit" className="jt-submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Activate Your 50% Discount"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .jt-overlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow-y: auto;
          padding: 24px;
          background: rgba(0, 0, 0, 0.6);
        }
        .jt-modal {
          position: relative;
          margin: auto;
          width: 100%;
          max-width: 1024px;
          background: #e8e8ee;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .jt-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 0;
          border-radius: 9999px;
          background: #10163d;
          color: #fff;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .jt-close:hover {
          opacity: 0.9;
        }
        .jt-close :global(svg) {
          width: 20px;
          height: 20px;
        }

        .jt-grid {
          display: grid;
          grid-template-columns: 1fr;
        }

        /* Image side */
        .jt-image {
          position: relative;
          width: 100%;
          aspect-ratio: 841 / 1124;
          background: #eef3ee;
        }
        .jt-image :global(img) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .jt-image-footer {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: flex-start;
          padding: 20px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
        }
        .jt-explore {
          display: inline-flex;
          align-items: center;
          padding: 12px 24px;
          border: 0;
          border-radius: 6px;
          background: #0f1438;
          color: #fff;
          cursor: pointer;
          font: 600 14px/1 "Poppins", sans-serif;
          text-transform: uppercase;
          transition: background 0.2s;
        }
        .jt-explore:hover {
          background: #1b235e;
        }

        /* Form side */
        .jt-form-side {
          position: relative;
          background: #f3f4f8;
          padding: 20px;
        }
        .jt-corner {
          position: absolute;
          top: 0;
          right: 0;
          width: 80px;
          height: 80px;
          background: linear-gradient(to bottom left, #f39a1f, #df3369);
          clip-path: polygon(100% 0, 0 0, 100% 100%);
        }
        .jt-title {
          margin: 0;
          color: #10163d;
          font: 800 28px/1.15 "Merriweather", serif;
          letter-spacing: 0.2px;
          text-wrap: balance;
        }
        .jt-text {
          margin: 12px 0 24px;
          color: #3b4155;
          font: 400 14px/1.5 "Poppins", sans-serif;
        }

        .jt-fields {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .jt-fields :global(input),
        .jt-fields :global(textarea) {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #ced3ea;
          border-radius: 8px;
          background: #fff;
          color: #0f1535;
          font: 400 14px "Poppins", sans-serif;
          outline: none;
        }
        .jt-fields :global(input) {
          height: 48px;
          padding: 0 16px;
        }
        .jt-fields :global(textarea) {
          min-height: 88px;
          padding: 12px 16px;
          resize: none;
        }
        .jt-fields :global(input):focus,
        .jt-fields :global(textarea):focus {
          border-color: #2c9384;
        }
        .jt-error {
          margin: 0;
          color: #ef4444;
          font: 400 13px "Poppins", sans-serif;
        }
        .jt-success {
          margin: 0;
          padding: 4px 0;
          color: #15803d;
          font: 500 14px "Poppins", sans-serif;
        }

        .jt-submit {
          width: 100%;
          padding: 12px;
          border: 0;
          border-radius: 8px;
          background: #10163d;
          color: #fff;
          cursor: pointer;
          font: 600 14px "Poppins", sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          transition: background 0.2s;
        }
        .jt-submit:hover {
          background: #17205a;
        }
        .jt-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Desktop: two columns, fixed-height image filling the wider panel */
        @media (min-width: 768px) {
          .jt-grid {
            grid-template-columns: 540px 1fr;
          }
          .jt-image {
            aspect-ratio: auto;
            height: 600px;
          }
          .jt-form-side {
            padding: 32px;
          }
          .jt-title {
            font-size: 34px;
          }
          .jt-text {
            font-size: 15px;
          }
          .jt-image-footer {
            padding: 24px;
          }
        }
      `}</style>
    </>
  );
}
