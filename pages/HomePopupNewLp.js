"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CountryPhoneInput from "../components/CountryPhoneInput";
import useHubspotForm from "/hooks/hubspot";

const initialForm = {
  fulName: "",
  email: "",
  phoneNumber: "",
  budget: "",
  message: "",
};

const budgetOptions = [
  "$500 - $1000",
  "$1001 - $2000",
  "$2001 - $3000",
  "$3001 - $4000",
  "$4001 - $5000",
  "$5001 - $6000",
  "$6001 - $7000",
  "$7001 - $8000",
  "$8001 - $9000",
  "$9001 - $10000",
];

export default function HomePopupNewLp() {
  const router = useRouter();
  const { submitPopupContactFormScreen } = useHubspotForm();
  const [form, setForm] = useState(initialForm);
  const [isOpen, setIsOpen] = useState(true);
  const [showOfferTab, setShowOfferTab] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    setIsOpen(true);
    setShowOfferTab(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setShowOfferTab(true);
  };

  const handleReopen = () => {
    setShowOfferTab(false);
    setIsOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (!Object.prototype.hasOwnProperty.call(form, name)) return;

    if (name === "phoneNumber") {
      if (!/^\d*$/.test(value)) {
        setPhoneError("Only numbers are allowed");
        return;
      }

      setPhoneError(value.length > 0 && value.length < 9 ? "Phone number must be at least 9 digits" : "");
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.phoneNumber.length < 9) {
      setPhoneError("Phone number must be at least 9 digits");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitPopupContactFormScreen(
        form.fulName,
        form.email,
        form.phoneNumber,
        form.budget,
        form.message
      );

      if (response) {
        setShowSuccess(true);
        setForm(initialForm);
        setTimeout(() => router.push("/thank-you"), 900);
      } else {
        alert("There was an error submitting your form. Please try again.");
      }
    } catch (error) {
      console.error("Popup form submission error:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isOpen && (
        <section
          className="lp-popup-overlay"
          aria-modal="true"
          role="dialog"
          aria-labelledby="publishing-offer-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2147483647,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflowY: "auto",
            padding: "18px",
            background: "rgba(6, 10, 28, 0.82)",
          }}
        >
          <div
            className="lp-popup-shell"
            style={{
              position: "relative",
              display: "grid",
              width: "min(1040px, 100%)",
              maxHeight: "calc(100vh - 36px)",
              gridTemplateColumns: "0.92fr 1.08fr",
              overflow: "hidden",
              borderRadius: "22px",
              background: "#fff",
              boxShadow: "0 30px 90px rgba(0, 0, 0, 0.42)",
            }}
          >
            <button type="button" className="lp-popup-close" onClick={handleClose} aria-label="Close popup">
              <span />
              <span />
            </button>

            <div className="lp-popup-art">
              <div className="lp-offer-pill">Limited Offer</div>
              <div className="lp-book-stack" aria-hidden="true">
                <div className="lp-book lp-book-back" />
                <div className="lp-book lp-book-mid" />
                <div className="lp-book lp-book-front">
                  <span>Pine</span>
                  <strong>Author Launch</strong>
                </div>
              </div>
              <div className="lp-discount-badge">
                <span>Save</span>
                <strong>50%</strong>
              </div>
              <p>Publishing, editing, cover design, formatting, and launch support in one guided author package.</p>
            </div>

            <div className="lp-popup-content">
              <div className="lp-popup-copy">
                <span className="lp-eyebrow">Book Publishing Offer</span>
                <h2 id="publishing-offer-title">Publish Your Book With 50% Off Today</h2>
                <p>
                  Get a professional publishing plan tailored for your manuscript. Share your details and our author
                  consultant will help you claim the discount.
                </p>
              </div>

              <form className="lp-popup-form" onSubmit={handleSubmit}>
                <div className="lp-field-grid">
                  <input
                    type="text"
                    name="fulName"
                    value={form.fulName}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                  <CountryPhoneInput
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="Phone number"
                  />
                </div>

                {phoneError && <p className="lp-field-error">{phoneError}</p>}

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Email address"
                />

                <select name="budget" value={form.budget} onChange={handleChange} required>
                  <option value="">Select budget range</option>
                  {budgetOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Tell us about your book"
                />

                {showSuccess && <p className="lp-success">Form submitted successfully.</p>}

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Claim My 50% Publishing Discount"}
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {showOfferTab && !isOpen && (
        <button
          type="button"
          className="lp-offer-tab"
          onClick={handleReopen}
          aria-label="Reopen 50 percent discount popup"
          style={{
            position: "fixed",
            left: "18px",
            bottom: "18px",
            zIndex: 2147483647,
            display: "inline-flex",
          }}
        >
          <span>50%</span>
          <strong>Publishing Offer</strong>
        </button>
      )}

      <style jsx>{`
        .lp-popup-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow-y: auto;
          padding: 18px;
          background:
            radial-gradient(circle at 18% 22%, rgba(246, 181, 75, 0.28), transparent 28%),
            rgba(6, 10, 28, 0.72);
          backdrop-filter: blur(8px);
        }

        .lp-popup-shell {
          position: relative;
          display: grid;
          width: min(1040px, 100%);
          max-height: calc(100vh - 36px);
          grid-template-columns: 0.92fr 1.08fr;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 22px;
          background: #fff;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.42);
        }

        .lp-popup-close {
          position: absolute;
          right: 16px;
          top: 16px;
          z-index: 3;
          display: inline-flex;
          height: 38px;
          width: 38px;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 50%;
          background: #10163d;
          cursor: pointer;
          transition: transform 180ms ease, background 180ms ease;
        }

        .lp-popup-close:hover {
          background: #1c245f;
          transform: rotate(90deg);
        }

        .lp-popup-close span {
          position: absolute;
          height: 2px;
          width: 17px;
          border-radius: 999px;
          background: #fff;
        }

        .lp-popup-close span:first-child {
          transform: rotate(45deg);
        }

        .lp-popup-close span:last-child {
          transform: rotate(-45deg);
        }

        .lp-popup-art {
          position: relative;
          display: flex;
          min-height: 590px;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          padding: 34px;
          background:
            radial-gradient(circle at 24% 18%, rgba(242, 181, 65, 0.24), transparent 28%),
            radial-gradient(circle at 78% 74%, rgba(78, 154, 142, 0.2), transparent 26%),
            linear-gradient(145deg, #10163d, #223053 58%, #182042);
          background-position: center;
          background-size: cover;
          color: #fff;
        }

        .lp-popup-art::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 42px 42px;
          opacity: 0.35;
        }

        .lp-popup-art > * {
          position: relative;
          z-index: 1;
        }

        .lp-offer-pill {
          width: max-content;
          border: 1px solid rgba(255, 255, 255, 0.34);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          padding: 8px 14px;
          font-family: "Poppins", sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.6px;
          text-transform: uppercase;
        }

        .lp-book-stack {
          position: relative;
          height: 300px;
          margin: 26px auto;
          width: 260px;
        }

        .lp-book {
          position: absolute;
          inset: 0;
          border-radius: 10px 16px 16px 10px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.28);
        }

        .lp-book-back {
          transform: rotate(-10deg) translate(-32px, 16px);
          background: linear-gradient(135deg, #f0b44d, #d76648);
        }

        .lp-book-mid {
          transform: rotate(7deg) translate(30px, 10px);
          background: linear-gradient(135deg, #4e9a8e, #123d52);
        }

        .lp-book-front {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          transform: rotate(-2deg);
          background:
            linear-gradient(90deg, rgba(255, 255, 255, 0.24) 0 8%, transparent 8%),
            linear-gradient(145deg, #fff8e8, #f0d9a8);
          color: #10163d;
        }

        .lp-book-front span {
          font-family: "Poppins", sans-serif;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .lp-book-front strong {
          margin-top: 5px;
          max-width: 150px;
          font-family: "Merriweather", serif;
          font-size: 30px;
          line-height: 1.05;
        }

        .lp-discount-badge {
          position: absolute;
          bottom: 112px;
          right: 24px;
          z-index: 2;
          display: flex;
          height: 126px;
          width: 126px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 5px solid #fff;
          border-radius: 50%;
          background: #f2b541;
          color: #10163d;
          box-shadow: 0 18px 36px rgba(0, 0, 0, 0.24);
        }

        .lp-discount-badge span {
          font-family: "Poppins", sans-serif;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .lp-discount-badge strong {
          font-family: "Poppins", sans-serif;
          font-size: 44px;
          font-weight: 900;
          line-height: 0.95;
        }

        .lp-popup-art p {
          max-width: 330px;
          margin: 0;
          font-family: "Poppins", sans-serif;
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.86);
        }

        .lp-popup-content {
          overflow-y: auto;
          padding: 46px 42px 38px;
          background: linear-gradient(180deg, #fff 0%, #f6f7fb 100%);
        }

        .lp-popup-copy {
          padding-right: 34px;
        }

        .lp-eyebrow {
          display: inline-flex;
          margin-bottom: 10px;
          color: #2f7d70;
          font-family: "Poppins", sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .lp-popup-copy h2 {
          margin: 0;
          color: #10163d;
          font-family: "Merriweather", serif;
          font-size: clamp(30px, 4vw, 44px);
          font-weight: 900;
          line-height: 1.08;
        }

        .lp-popup-copy p {
          margin: 12px 0 22px;
          color: #51596d;
          font-family: "Poppins", sans-serif;
          font-size: 15px;
          line-height: 1.7;
        }

        .lp-popup-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .lp-field-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .lp-popup-form input,
        .lp-popup-form select,
        .lp-popup-form textarea {
          width: 100%;
          border: 1px solid #d9deea;
          border-radius: 10px;
          background: #fff;
          color: #10163d;
          font-family: "Poppins", sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }

        .lp-popup-form input,
        .lp-popup-form select {
          height: 48px;
          padding: 0 14px;
        }

        .lp-popup-form textarea {
          min-height: 94px;
          resize: none;
          padding: 13px 14px;
        }

        .lp-popup-form input:focus,
        .lp-popup-form select:focus,
        .lp-popup-form textarea:focus {
          border-color: #2f7d70;
          box-shadow: 0 0 0 3px rgba(47, 125, 112, 0.14);
        }

        .lp-field-error,
        .lp-success {
          margin: -4px 2px 0;
          font-family: "Poppins", sans-serif;
          font-size: 13px;
        }

        .lp-field-error {
          color: #d12f2f;
        }

        .lp-success {
          color: #238757;
        }

        .lp-popup-form button {
          min-height: 52px;
          border: 0;
          border-radius: 10px;
          background: linear-gradient(135deg, #10163d, #263072);
          color: #fff;
          cursor: pointer;
          font-family: "Poppins", sans-serif;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          transition: transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease;
          box-shadow: 0 14px 28px rgba(16, 22, 61, 0.24);
        }

        .lp-popup-form button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 18px 34px rgba(16, 22, 61, 0.3);
        }

        .lp-popup-form button:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }

        .lp-offer-tab {
          position: fixed;
          left: 18px;
          bottom: 18px;
          z-index: 9999;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 0;
          border-radius: 14px;
          background: #10163d;
          color: #fff;
          cursor: pointer;
          padding: 10px 14px 10px 10px;
          box-shadow: 0 16px 36px rgba(16, 22, 61, 0.32);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .lp-offer-tab:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 42px rgba(16, 22, 61, 0.4);
        }

        .lp-offer-tab span {
          display: inline-flex;
          height: 48px;
          width: 48px;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: #f2b541;
          color: #10163d;
          font-family: "Poppins", sans-serif;
          font-size: 18px;
          font-weight: 900;
        }

        .lp-offer-tab strong {
          max-width: 96px;
          font-family: "Poppins", sans-serif;
          font-size: 12px;
          font-weight: 800;
          line-height: 1.15;
          text-align: left;
          text-transform: uppercase;
        }

        @media (max-width: 900px) {
          .lp-popup-shell {
            grid-template-columns: 1fr;
          }

          .lp-popup-art {
            min-height: 270px;
            padding: 24px;
          }

          .lp-book-stack {
            height: 155px;
            margin: 10px auto;
            width: 138px;
          }

          .lp-book-front {
            padding: 14px;
          }

          .lp-book-front strong {
            font-size: 18px;
          }

          .lp-discount-badge {
            bottom: 44px;
            height: 88px;
            width: 88px;
          }

          .lp-discount-badge strong {
            font-size: 30px;
          }

          .lp-popup-art p {
            max-width: 100%;
            font-size: 13px;
          }

          .lp-popup-content {
            padding: 28px 20px 24px;
          }

          .lp-popup-copy {
            padding-right: 36px;
          }
        }

        @media (max-width: 560px) {
          .lp-popup-overlay {
            align-items: flex-start;
            padding: 10px;
          }

          .lp-popup-shell {
            max-height: none;
            border-radius: 16px;
          }

          .lp-popup-close {
            right: 10px;
            top: 10px;
          }

          .lp-field-grid {
            grid-template-columns: 1fr;
          }

          .lp-popup-copy h2 {
            font-size: 28px;
          }

          .lp-offer-tab {
            left: 10px;
            bottom: 10px;
            padding: 8px 10px 8px 8px;
          }

          .lp-offer-tab span {
            height: 42px;
            width: 42px;
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}
