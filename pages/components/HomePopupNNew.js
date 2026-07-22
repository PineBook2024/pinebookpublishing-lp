"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import CountryPhoneInput from "../../components/CountryPhoneInput";
import useHubspotForm from "/hooks/hubspot";

export default function HomePopupNNew() {
  const router = useRouter();
  const pathname = usePathname();
  const { submitPopupContactFormScreen } = useHubspotForm();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const setters = {
      fullName: setFullName,
      phoneNumber: setPhoneNumber,
      email: setEmail,
      message: setMessage,
    };

    if (name === "phoneNumber") {
      if (/^\d*$/.test(value)) {
        setPhoneNumber(value);
        setPhoneError(value.length > 0 && value.length < 9 ? "Phone number must be at least 9 digits" : "");
      }
      return;
    }

    const setter = setters[name];
    if (setter) setter(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber.length < 9) {
      setPhoneError("Phone number must be at least 9 digits");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitPopupContactFormScreen(
        fullName,
        email,
        phoneNumber,
        "",
        message
      );

      if (response) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/thank-you");
        }, 1500);
        setTimeout(() => {
          setShowSuccess(false);
          setFullName("");
          setPhoneNumber("");
          setEmail("");
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
                    <input type="text" name="fullName" value={fullName} onChange={handleChange} placeholder="Enter your Name" required />
                    <CountryPhoneInput name="phoneNumber" value={phoneNumber} onChange={handleChange} placeholder="Enter your Phone" required />
                    {phoneError && <p className="jt-error">{phoneError}</p>}
                    <input type="email" name="email" value={email} onChange={handleChange} placeholder="Enter your Email" required />
                    <textarea name="message" rows={3} value={message} onChange={handleChange} placeholder="Enter your Message" required />
                    {showSuccess && <p className="jt-success">Form submitted Successfully!</p>}
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
          max-width: 1040px;
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
        .jt-close svg {
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
        .jt-image img {
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
        .jt-fields input,
        .jt-fields textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #ced3ea;
          border-radius: 8px;
          background: #fff;
          color: #0f1535;
          font: 400 14px "Poppins", sans-serif;
          outline: none;
        }
        .jt-fields input {
          height: 48px;
          padding: 0 16px;
        }
        .jt-fields textarea {
          min-height: 88px;
          padding: 12px 16px;
          resize: none;
        }
        .jt-fields input:focus,
        .jt-fields textarea:focus {
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
            grid-template-columns: 479px 1fr;
          }
          .jt-image {
            aspect-ratio: 841 / 1124;
            height: auto;
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
