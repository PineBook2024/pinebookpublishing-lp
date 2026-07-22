"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import useHubspotForm from "/hooks/hubspot";

const initialForm = {
  fulName: "",
  email: "",
  phoneNumber: "",
  message: "",
};

const getWeeklyOfferState = () => {
  const now = new Date();
  const day = now.getDay();
  const isActive = day >= 1 && day <= 5;
  const offerEnd = new Date(now);
  offerEnd.setDate(now.getDate() + (5 - day));
  offerEnd.setHours(23, 59, 59, 999);

  return {
    isActive,
    secondsLeft: isActive ? Math.max(0, Math.floor((offerEnd.getTime() - now.getTime()) / 1000)) : 0,
  };
};

const formatTimePart = (value) => String(value).padStart(2, "0");

function AnimatedTimeValue({ value }) {
  return (
    <span className="hnlp-digit-group" aria-label={value}>
      {value.split("").map((digit, index) => (
        <span className="hnlp-digit-window" aria-hidden="true" key={index}>
          <span
            className="hnlp-digit-track"
            style={{ transform: `translateY(-${Number(digit) * 10}%)` }}
          >
            {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map((number) => (
              <span className="hnlp-digit" key={number}>
                {number}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function HomePopupNewLp() {
  const { submitPopupContactFormScreen } = useHubspotForm();
  const [offerState, setOfferState] = useState(getWeeklyOfferState);
  const [form, setForm] = useState(initialForm);
  const [isOpen, setIsOpen] = useState(() => getWeeklyOfferState().isActive);
  const [showTab, setShowTab] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const previousActiveRef = useRef(offerState.isActive);

  const timeParts = {
    days: formatTimePart(Math.floor(offerState.secondsLeft / 86400)),
    hours: formatTimePart(Math.floor((offerState.secondsLeft % 86400) / 3600)),
    minutes: formatTimePart(Math.floor((offerState.secondsLeft % 3600) / 60)),
    seconds: formatTimePart(offerState.secondsLeft % 60),
  };

  useEffect(() => {
    const updateOffer = () => {
      const nextOfferState = getWeeklyOfferState();
      setOfferState(nextOfferState);

      if (!nextOfferState.isActive) {
        setIsOpen(false);
        setShowTab(false);
      } else if (!previousActiveRef.current) {
        setIsOpen(true);
        setShowTab(false);
      }

      previousActiveRef.current = nextOfferState.isActive;
    };

    updateOffer();
    const timer = setInterval(updateOffer, 1000);

    return () => clearInterval(timer);
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
    if (!offerState.isActive) return;
    setIsOpen(false);
    setShowTab(true);
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
      const [hubspotResult, emailResult] = await Promise.allSettled([
        submitPopupContactFormScreen(
          form.fulName,
          form.email,
          form.phoneNumber,
          "",
          form.message
        ),
        fetch("/api/popup-signup-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            fullName: form.fulName,
            email: form.email,
            phoneNumber: form.phoneNumber,
            service: "50% Publishing Discount Popup",
            message: form.message,
            referringPage: document.referrer || "Direct visit",
            currentPage: window.location.href,
          }),
        }).then(async (response) => {
          const data = await response.json().catch(() => ({}));

          if (!response.ok || data?.success === false) {
            throw new Error(data?.message || "SMTP email submission failed");
          }

          return data;
        }),
      ]);

      const hubspotSucceeded =
        hubspotResult.status === "fulfilled" && Boolean(hubspotResult.value);
      const emailSucceeded =
        emailResult.status === "fulfilled" && emailResult.value?.success === true;

      if (hubspotSucceeded && emailSucceeded) {
        setShowSuccess(true);
        setForm(initialForm);
        setTimeout(() => setShowSuccess(false), 4000);
      } else {
        console.error("Popup submission failed", {
          hubspot: hubspotResult,
          email: emailResult,
        });
        alert("There was an error submitting your form. Please try again.");
      }
    } catch (error) {
      console.error("Popup form submission error:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!offerState.isActive) return null;

  return (
    <>
      {isOpen && (
        <section
          className="hnlp-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="hnlp-title"
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
          <div className="hnlp-modal">
            <button type="button" className="hnlp-close" onClick={handleClose} aria-label="Close popup">
              <span />
              <span />
            </button>

            <div className="hnlp-visual">
              <div className="hnlp-visual-motion" aria-hidden="true">
                <span className="hnlp-orbit hnlp-orbit-one" />
                <span className="hnlp-orbit hnlp-orbit-two" />
                <span className="hnlp-line hnlp-line-one" />
                <span className="hnlp-line hnlp-line-two" />
                <span className="hnlp-line hnlp-line-three" />
                <span className="hnlp-spark hnlp-spark-one" />
                <span className="hnlp-spark hnlp-spark-two" />
                <span className="hnlp-spark hnlp-spark-three" />
              </div>
              <span className="hnlp-pill">Limited Time Offer</span>
              <div className="hnlp-books" aria-hidden="true">
                <img className="hnlp-book hnlp-book-a" src="/brand-img/book1.webp" alt="" />
                <img className="hnlp-book hnlp-book-b" src="/brand-img/book2.webp" alt="" />
                <img className="hnlp-book hnlp-book-c" src="/brand-img/independence-day-banner.jpg" alt="" />
              </div>
              <div className="hnlp-badge">
                <small>Save</small>
                <strong>50%</strong>
              </div>
            </div>

            <div className="hnlp-content">
              <span className="hnlp-eyebrow">Avail Discount</span>
              <h2 id="hnlp-title">Avail 50% Discount on Publishing This Independence Day!
              </h2>
              <p className="hnlp-copy">
                Have you completed your manuscript and are ready to share your story with the world? This Independence Day, enjoy an exclusive <span className="hnlp-copy-highlight">50%</span> discount on all of our book publishing packages and take the next step toward becoming a published author.
                Turn your manuscript into a professionally published book for half the cost.
              </p>

              <div className="hnlp-countdown" aria-label={`Offer ends in ${timeParts.days} days ${timeParts.hours} hours ${timeParts.minutes} minutes ${timeParts.seconds} seconds`}>
                <span className="hnlp-countdown-label">Offer Ends In</span>
                <div className="hnlp-countdown-row">
                  {[
                    ["days", "Days"],
                    ["hours", "Hrs"],
                    ["minutes", "Min"],
                    ["seconds", "Sec"],
                  ].map(([key, label], index) => (
                    <Fragment key={key}>
                      <div className="hnlp-time-box">
                        <strong>
                          <AnimatedTimeValue value={timeParts[key]} />
                        </strong>
                        <span>{label}</span>
                      </div>
                      {index < 3 && <span className="hnlp-time-colon">:</span>}
                    </Fragment>
                  ))}
                </div>
              </div>

              <form className="hnlp-form" onSubmit={handleSubmit}>
                <div className="hnlp-grid">
                  <input name="fulName" value={form.fulName} onChange={handleChange} placeholder="Your name" required />
                  <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone number" required />
                </div>

                {phoneError && <p className="hnlp-error">{phoneError}</p>}

                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email address" required />

                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your book" rows={3} required />

                {showSuccess && (
                  <div className="hnlp-success" role="status" aria-live="polite">
                    <span>✓</span>
                    <div>
                      <strong>Thank you!</strong>
                      <p>Your request has been submitted successfully.</p>
                    </div>
                  </div>
                )}

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Claim My 50% Publishing Discount"}
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {showTab && !isOpen && (
        <button
          type="button"
          className="hnlp-tab"
          onClick={() => {
            setShowTab(false);
            setIsOpen(true);
          }}
        >
          <span className="hnlp-tab-book" aria-hidden="true">
            <span className="hnlp-tab-flag" />
            <span className="hnlp-tab-firework" />
          </span>
          <span className="hnlp-tab-badge">50%</span>
          <span className="hnlp-tab-copy">
            <small>Limited Offer</small>
            <span className="hnlp-tab-timer" aria-label={`Offer ends in ${timeParts.days} days ${timeParts.hours} hours ${timeParts.minutes} minutes ${timeParts.seconds} seconds`}>
              {[
                ["days", "D"],
                ["hours", "H"],
                ["minutes", "M"],
                ["seconds", "S"],
              ].map(([key, label], index) => (
                <Fragment key={key}>
                  <span className="hnlp-tab-time-box">
                    <strong>{timeParts[key]}</strong>
                    <em>{label}</em>
                  </span>
                  {index < 3 && <span className="hnlp-tab-time-colon">:</span>}
                </Fragment>
              ))}
            </span>
          </span>
        </button>
      )}

      <style jsx>{`
        .hnlp-modal {
          position: relative;
          display: grid;
          grid-template-columns: 0.92fr 1.08fr;
          width: min(1040px, 100%);
          max-height: calc(100vh - 36px);
          overflow: hidden;
          border-radius: 22px;
          background: #fff;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.42);
        }

        .hnlp-close {
          position: absolute;
          right: 16px;
          top: 16px;
          z-index: 3;
          width: 38px;
          height: 38px;
          border: 0;
          border-radius: 50%;
          background: #10163d;
          cursor: pointer;
        }

        .hnlp-close span {
          position: absolute;
          left: 10px;
          top: 18px;
          width: 18px;
          height: 2px;
          border-radius: 99px;
          background: #fff;
        }

        .hnlp-close span:first-child {
          transform: rotate(45deg);
        }

        .hnlp-close span:last-child {
          transform: rotate(-45deg);
        }

        .hnlp-visual {
          position: relative;
          min-height: 520px;
          overflow: visible;
          padding: 34px;
          background:
            radial-gradient(circle at 24% 18%, rgba(242, 181, 65, 0.24), transparent 28%),
            radial-gradient(circle at 78% 74%, rgba(78, 154, 142, 0.2), transparent 26%),
            linear-gradient(145deg, #10163d, #223053 58%, #182042);
          color: #fff;
        }

        .hnlp-pill {
          position: relative;
          z-index: 2;
          display: inline-flex;
          border: 1px solid rgba(255, 255, 255, 0.34);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          padding: 8px 14px;
          font: 700 12px "Poppins", sans-serif;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        }

        .hnlp-visual-motion {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .hnlp-orbit {
          position: absolute;
          border: 1px solid rgba(242, 181, 65, 0.18);
          border-radius: 50%;
          opacity: 0.8;
          transform: rotate(-18deg);
        }

        .hnlp-orbit-one {
          left: 44px;
          top: 116px;
          width: 350px;
          height: 190px;
          animation: hnlpFloatOrbit 9s ease-in-out infinite;
        }

        .hnlp-orbit-two {
          right: -72px;
          top: 188px;
          width: 250px;
          height: 138px;
          border-color: rgba(255, 255, 255, 0.16);
          animation: hnlpFloatOrbit 10s ease-in-out 1.3s infinite reverse;
        }

        .hnlp-line {
          position: absolute;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.48), transparent);
          opacity: 0;
          animation: hnlpDriftLine 5.4s ease-in-out infinite;
        }

        .hnlp-line-one {
          left: -70px;
          top: 158px;
          width: 170px;
        }

        .hnlp-line-two {
          right: -64px;
          top: 280px;
          width: 150px;
          animation-delay: 1.4s;
        }

        .hnlp-line-three {
          left: 48px;
          bottom: 98px;
          width: 130px;
          animation-delay: 2.6s;
        }

        .hnlp-spark {
          position: absolute;
          width: 9px;
          height: 9px;
          opacity: 0.85;
          animation: hnlpSparkle 2.8s ease-in-out infinite;
        }

        .hnlp-spark::before,
        .hnlp-spark::after {
          content: "";
          position: absolute;
          inset: 0;
          margin: auto;
          border-radius: 999px;
          background: #f2b541;
        }

        .hnlp-spark::before {
          width: 2px;
          height: 9px;
        }

        .hnlp-spark::after {
          width: 9px;
          height: 2px;
        }

        .hnlp-spark-one {
          left: 74px;
          top: 100px;
        }

        .hnlp-spark-two {
          right: 82px;
          top: 122px;
          animation-delay: 0.9s;
        }

        .hnlp-spark-three {
          left: 88px;
          bottom: 126px;
          animation-delay: 1.8s;
        }

        .hnlp-books {
          position: absolute;
          left: 50%;
          top: 52%;
          z-index: 2;
          width: 360px;
          height: 335px;
          margin: 0;
          transform: translate(-50%, -50%);
        }

        .hnlp-book {
          position: absolute;
          top: 0;
          width: 210px;
          height: 310px;
          border-radius: 9px 15px 15px 9px;
          object-fit: cover;
          object-position: center;
          box-shadow: 0 24px 50px rgba(0, 0, 0, 0.34);
        }

        .hnlp-book-a {
          left: 16px;
          z-index: 1;
          transform: rotate(-10deg) translateY(24px);
        }

        .hnlp-book-b {
          right: 16px;
          z-index: 2;
          transform: rotate(8deg) translateY(18px);
        }

        .hnlp-book-c {
          left: 50%;
          z-index: 3;
          transform: translateX(-50%) rotate(-2deg);
        }

        .hnlp-badge {
          position: absolute;
          right: 34px;
          top: calc(52% + 86px);
          z-index: 4;
          display: flex;
          width: 116px;
          height: 116px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 5px solid #fff;
          border-radius: 50%;
          background: #f2b541;
          color: #10163d;
          animation: hnlpBlink 1s ease-in-out infinite;
          box-shadow:
            0 0 0 10px rgba(242, 181, 65, 0.22),
            0 18px 36px rgba(0, 0, 0, 0.28);
        }

        .hnlp-badge small {
          font: 800 13px "Poppins", sans-serif;
          text-transform: uppercase;
        }

        .hnlp-badge strong {
          font: 900 40px/0.95 "Poppins", sans-serif;
        }

        .hnlp-visual p {
          max-width: 340px;
          margin: 18px 0 0;
          color: rgba(255, 255, 255, 0.86);
          font: 400 13px/1.7 "Poppins", sans-serif;
        }

        .hnlp-content {
          overflow-y: auto;
          padding: 46px 42px 38px;
          background: linear-gradient(180deg, #fff 0%, #f6f7fb 100%);
        }

        .hnlp-eyebrow {
          color: #2f7d70;
          font: 800 12px "Poppins", sans-serif;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .hnlp-content h2 {
          margin: 10px 36px 12px 0;
          color: #10163d;
          font: 900 clamp(30px, 30px, 30px) / 1.08 "Merriweather", serif;
        }

        .hnlp-copy {
          margin: 0 0 16px;
          color: #51596d;
          font-size: 14px !important;
        }

        .hnlp-copy-highlight {
          display: inline-block;
          border-radius: 4px;
          background: #315bc8;
          color: #fff;
          font-weight: 800;
          line-height: 1.2;
          padding: 1px 5px 2px;
          animation: hnlpTextBlink 900ms ease-in-out infinite;
        }

        .hnlp-countdown {
          margin: 0 0 18px;
          border: 1px solid rgba(16, 22, 61, 0.1);
          border-radius: 14px;
          background: #10163d;
          padding: 13px 14px 14px;
          box-shadow: 0 14px 28px rgba(16, 22, 61, 0.16);
        }

        .hnlp-countdown-label {
          display: block;
          margin-bottom: 8px;
          color: #f2b541;
          font: 800 12px "Poppins", sans-serif;
          letter-spacing: 1.8px;
          text-align: center;
          text-transform: uppercase;
        }

        .hnlp-countdown-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
        }

        .hnlp-time-box {
          display: flex;
          min-width: 58px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          background: linear-gradient(180deg, #ffffff 0%, #eef1f8 100%);
          padding: 8px 6px 7px;
          box-shadow: inset 0 -2px 0 rgba(16, 22, 61, 0.08);
        }

        .hnlp-time-box strong {
          display: block;
          color: #10163d;
          font: 900 24px/1 "Poppins", sans-serif;
          font-variant-numeric: tabular-nums;
        }

        :global(.hnlp-digit-group) {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1px;
        }

        :global(.hnlp-digit-window) {
          position: relative;
          display: inline-block;
          width: 16px;
          height: 25px;
          overflow: hidden;
          border-radius: 5px;
          background: linear-gradient(85deg, #FFC107, #edb34a);
        }

        :global(.hnlp-digit-window)::before,
        :global(.hnlp-digit-window)::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          z-index: 2;
          height: 7px;
          pointer-events: none;
        }

        :global(.hnlp-digit-window)::before {
          top: 0;
          background: linear-gradient(180deg, rgba(238, 241, 248, 0.95), rgba(238, 241, 248, 0));
        }

        :global(.hnlp-digit-window)::after {
          bottom: 0;
          background: linear-gradient(0deg, rgba(238, 241, 248, 0.95), rgba(238, 241, 248, 0));
        }

        :global(.hnlp-digit-track) {
          display: flex;
          flex-direction: column;
          height: 250px;
          transition: transform 720ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }

        :global(.hnlp-digit) {
          display: flex;
          height: 25px;
          flex: 0 0 25px;
          align-items: center;
          justify-content: center;
          color: #000;
          font: inherit;
          letter-spacing: 0;
        }

        .hnlp-time-box > span {
          margin-top: 4px;
          color: #566077;
          font: 800 10px/1 "Poppins", sans-serif;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .hnlp-time-colon {
          color: #f2b541;
          font: 900 22px/1 "Poppins", sans-serif;
        }

        .hnlp-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .hnlp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .hnlp-form input,
        .hnlp-form select,
        .hnlp-form textarea {
          width: 100%;
          border: 1px solid #d9deea;
          border-radius: 10px;
          background: #fff;
          color: #10163d;
          font: 400 14px "Poppins", sans-serif;
          outline: none;
        }

        .hnlp-form input,
        .hnlp-form select {
          height: 48px;
          padding: 0 14px;
        }

        .hnlp-form textarea {
          min-height: 94px;
          resize: none;
          padding: 13px 14px;
        }

        .hnlp-form button {
          min-height: 52px;
          border: 0;
          border-radius: 10px;
          background: linear-gradient(135deg, #10163d, #263072);
          color: #fff;
          cursor: pointer;
          font: 800 14px "Poppins", sans-serif;
          letter-spacing: 0.4px;
          text-transform: uppercase;
        }

        .hnlp-form button:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }

        .hnlp-error {
          margin: -4px 2px 0;
          color: #d12f2f;
          font: 400 13px "Poppins", sans-serif;
        }

        .hnlp-success {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin: 0;
          border: 1px solid rgba(35, 135, 87, 0.22);
          border-radius: 10px;
          background: linear-gradient(180deg, #effaf4 0%, #e7f7ee 100%);
          color: #176c43;
          padding: 10px 12px;
          box-shadow: 0 10px 22px rgba(35, 135, 87, 0.12);
          animation: hnlpToastIn 240ms ease-out;
        }

        .hnlp-success > span {
          display: inline-flex;
          width: 22px;
          height: 22px;
          flex: 0 0 22px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #238757;
          color: #fff;
          font: 900 13px/1 "Poppins", sans-serif;
        }

        .hnlp-success strong {
          display: block;
          margin-bottom: 2px;
          font: 800 13px/1.15 "Poppins", sans-serif;
        }

        .hnlp-success p {
          margin: 0;
          color: #2c7553;
          font: 400 12px/1.35 "Poppins", sans-serif;
        }

        .hnlp-tab {
          position: fixed;
          left: 18px;
          bottom: 18px;
          z-index: 2147483647;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          overflow: visible;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 18px;
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 38%),
            linear-gradient(135deg, #10163d 0%, #18225b 55%, #263072 100%);
          color: #fff;
          cursor: pointer;
          padding: 9px 16px 9px 9px;
          animation: hnlpTabBlink 1s ease-in-out infinite;
          box-shadow:
            0 0 0 6px rgba(242, 181, 65, 0.16),
            0 18px 42px rgba(16, 22, 61, 0.38);
        }

        .hnlp-tab-book {
          position: absolute;
          left: 28px;
          top: -54px;
          z-index: 3;
          display: block;
          width: 68px;
          height: 48px;
          overflow: visible;
          background:
            radial-gradient(circle at 18px 14px, #ffffff 0 1px, transparent 2px),
            radial-gradient(circle at 27px 10px, #ffffff 0 1px, transparent 2px),
            radial-gradient(circle at 25px 21px, #ffffff 0 1px, transparent 2px),
            linear-gradient(135deg, #263072 0 35%, transparent 35%),
            linear-gradient(90deg, #fff8e8 0 47%, #e6d4aa 47% 53%, #fff8e8 53% 100%);
          border: 2px solid rgba(16, 22, 61, 0.9);
          border-radius: 6px 10px 8px 6px;
          box-shadow:
            inset 0 -5px 0 rgba(242, 181, 65, 0.35),
            0 10px 18px rgba(16, 22, 61, 0.22);
          transform: rotate(-8deg);
          transform-origin: bottom center;
        }

        .hnlp-tab-flag {
          position: absolute;
          right: -26px;
          top: 2px;
          z-index: -1;
          width: 46px;
          height: 28px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 2px 9px 9px 2px;
          background:
            repeating-linear-gradient(
              180deg,
              #bf2132 0 2.15px,
              #ffffff 2.15px 4.3px
            );
          box-shadow: -3px 0 0 #263072, 0 7px 12px rgba(16, 22, 61, 0.18);
          transform: rotate(13deg);
          transform-origin: left center;
          animation: hnlpFlagWave 1.8s ease-in-out infinite;
        }

        .hnlp-tab-flag::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 20px;
          height: 15px;
          background:
            radial-gradient(circle, #fff 0 0.8px, transparent 1px) 2px 2px / 6px 5px,
            radial-gradient(circle, #fff 0 0.8px, transparent 1px) 5px 4.5px / 6px 5px,
            #263072;
        }

        .hnlp-tab-flag::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), transparent 42%, rgba(16, 22, 61, 0.12));
          pointer-events: none;
        }

        .hnlp-tab-firework {
          position: absolute;
          left: -15px;
          top: -10px;
          width: 18px;
          height: 18px;
          opacity: 0.95;
          animation: hnlpMiniFirework 2s ease-in-out infinite;
        }

        .hnlp-tab-firework::before,
        .hnlp-tab-firework::after {
          content: "";
          position: absolute;
          inset: 0;
          margin: auto;
          border-radius: 999px;
          background: #f2b541;
          box-shadow:
            0 -10px 0 #f2b541,
            0 10px 0 #f2b541,
            10px 0 0 #c92a3a,
            -10px 0 0 #c92a3a;
        }

        .hnlp-tab-firework::before {
          width: 3px;
          height: 3px;
        }

        .hnlp-tab-firework::after {
          width: 3px;
          height: 3px;
          transform: rotate(45deg);
        }

        .hnlp-tab-book::before,
        .hnlp-tab-book::after {
          content: "";
          position: absolute;
          top: 5px;
          left: 33px;
          width: 28px;
          height: 35px;
          border: 1px solid rgba(16, 22, 61, 0.38);
          border-left: 0;
          border-radius: 0 8px 7px 0;
          background:
            linear-gradient(90deg, rgba(230, 212, 170, 0.75), rgba(255, 248, 232, 0.98) 22%, #fffdfa 100%);
          box-shadow: 2px 3px 7px rgba(16, 22, 61, 0.16);
          transform-origin: left center;
          will-change: transform, opacity;
        }

        .hnlp-tab-book::before {
          animation: hnlpPageFlip 2.4s cubic-bezier(0.45, 0, 0.2, 1) infinite;
        }

        .hnlp-tab-book::after {
          animation: hnlpPageFlip 2.4s cubic-bezier(0.45, 0, 0.2, 1) 0.7s infinite;
          opacity: 0.78;
        }

        .hnlp-tab::before {
          content: "";
          position: absolute;
          inset: -60% auto -60% -40%;
          z-index: 0;
          width: 60%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.22), transparent);
          transform: rotate(18deg);
          animation: hnlpTabShimmer 2.8s ease-in-out infinite;
        }

        .hnlp-tab-badge {
          position: relative;
          z-index: 1;
          display: inline-flex;
          width: 54px;
          height: 54px;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.9);
          border-radius: 15px;
          background: linear-gradient(180deg, #ffd56c 0%, #f2b541 100%);
          color: #10163d;
          font: 900 19px "Poppins", sans-serif;
          box-shadow: inset 0 -3px 0 rgba(16, 22, 61, 0.12);
        }

        .hnlp-tab-copy {
          position: relative;
          z-index: 1;
          display: flex;
          min-width: 178px;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
        }

        .hnlp-tab-copy small {
          color: #f2b541;
          font: 800 10px/1 "Poppins", sans-serif;
          letter-spacing: 1.3px;
          text-transform: uppercase;
        }

        .hnlp-tab-timer {
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .hnlp-tab-time-box {
          display: inline-flex;
          min-width: 33px;
          height: 31px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          background: linear-gradient(180deg, #ffffff 0%, #eef1f8 100%);
          box-shadow: inset 0 -2px 0 rgba(16, 22, 61, 0.1);
        }

        .hnlp-tab-time-box strong {
          color: #10163d;
          font: 900 14px/1 "Poppins", sans-serif;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0;
        }

        .hnlp-tab-time-box em {
          margin-top: 2px;
          color: #566077;
          font: 900 7px/1 "Poppins", sans-serif;
          font-style: normal;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .hnlp-tab-time-colon {
          color: #f2b541;
          font: 900 13px/1 "Poppins", sans-serif;
        }

        @keyframes hnlpBlink {
          0%,
          100% {
            transform: scale(1);
            filter: brightness(1);
            box-shadow:
              0 0 0 10px rgba(242, 181, 65, 0.18),
              0 18px 36px rgba(0, 0, 0, 0.28);
          }

          50% {
            transform: scale(1.08);
            filter: brightness(1.08);
            box-shadow:
              0 0 0 16px rgba(242, 181, 65, 0.08),
              0 24px 46px rgba(0, 0, 0, 0.36);
          }
        }

        @keyframes hnlpFloatOrbit {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(-18deg) scale(1);
          }

          50% {
            transform: translate3d(10px, -12px, 0) rotate(-14deg) scale(1.03);
          }
        }

        @keyframes hnlpDriftLine {
          0% {
            opacity: 0;
            transform: translateX(-26px);
          }

          28%,
          62% {
            opacity: 0.72;
          }

          100% {
            opacity: 0;
            transform: translateX(78px);
          }
        }

        @keyframes hnlpSparkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.72) rotate(0deg);
          }

          50% {
            opacity: 0.95;
            transform: scale(1.18) rotate(45deg);
          }
        }

        @keyframes hnlpTabBlink {
          0%,
          100% {
            transform: translateY(0) scale(1);
            filter: brightness(1);
          }

          50% {
            transform: translateY(-2px) scale(1.04);
            filter: brightness(1.12);
          }
        }

        @keyframes hnlpTabShimmer {
          0%,
          58% {
            left: -45%;
          }

          100% {
            left: 130%;
          }
        }

        @keyframes hnlpPageFlip {
          0%,
          18% {
            opacity: 0;
            transform: perspective(120px) rotateY(0deg) skewY(0deg);
          }

          28% {
            opacity: 1;
          }

          58% {
            opacity: 1;
            transform: perspective(120px) rotateY(-142deg) skewY(-2deg);
          }

          78%,
          100% {
            opacity: 0;
            transform: perspective(120px) rotateY(-176deg) skewY(-2deg);
          }
        }

        @keyframes hnlpFlagWave {
          0%,
          100% {
            transform: rotate(13deg) skewY(0deg);
          }

          50% {
            transform: rotate(16deg) skewY(-5deg);
          }
        }

        @keyframes hnlpMiniFirework {
          0%,
          100% {
            opacity: 0.45;
            transform: scale(0.72) rotate(0deg);
          }

          50% {
            opacity: 1;
            transform: scale(1.05) rotate(45deg);
          }
        }

        @keyframes hnlpToastIn {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hnlpTextBlink {
          0%,
          100% {
            background: #315bc8;
            box-shadow: 0 0 0 rgba(49, 91, 200, 0);
          }

          50% {
            background: #10163d;
            box-shadow: 0 0 0 4px rgba(49, 91, 200, 0.18);
          }
        }

        @media (max-width: 900px) {
          .hnlp-overlay {
            align-items: flex-start !important;
            padding: 10px !important;
          }

          .hnlp-modal {
            display: block;
            width: min(560px, 100%);
            max-height: calc(100vh - 20px);
            max-height: calc(100dvh - 20px);
            overflow-x: hidden;
            overflow-y: auto;
            border-radius: 16px;
            overscroll-behavior: contain;
            -webkit-overflow-scrolling: touch;
          }

          .hnlp-close {
            position: sticky;
            display: block;
            right: auto;
            top: 12px;
            width: 36px;
            height: 36px;
            margin: 12px 12px -48px auto;
          }

          .hnlp-close span {
            left: 9px;
            top: 17px;
          }

          .hnlp-visual {
            min-height: 238px;
            overflow: hidden;
            padding: 18px 20px;
          }

          .hnlp-pill {
            padding: 7px 12px;
            font-size: 10px;
          }

          .hnlp-books {
            width: 238px;
            height: 176px;
            left: 50%;
            top: 59%;
            margin: 0;
            transform: translate(-50%, -50%);
          }

          .hnlp-book {
            width: 122px;
            height: 170px;
          }

          .hnlp-book-a {
            left: 8px;
          }

          .hnlp-book-b {
            right: 8px;
          }

          .hnlp-book-c {
            left: 50%;
          }

          .hnlp-badge {
            right: max(18px, calc(50% - 142px));
            top: 130px;
            width: 78px;
            height: 78px;
            border-width: 4px;
          }

          .hnlp-badge strong {
            font-size: 27px;
          }

          .hnlp-badge small {
            font-size: 10px;
          }

          .hnlp-content {
            overflow: visible;
            padding: 24px 20px 20px;
          }

          .hnlp-content h2 {
            margin-right: 0;
          }

          .hnlp-countdown-row {
            gap: 4px;
          }

          .hnlp-time-box {
            min-width: 50px;
          }

          .hnlp-time-box strong {
            font-size: 20px;
          }

          :global(.hnlp-digit-window) {
            width: 14px;
            height: 21px;
          }

          :global(.hnlp-digit-track) {
            height: 210px;
          }

          :global(.hnlp-digit) {
            height: 21px;
            flex-basis: 21px;
          }
        }

        @media (max-width: 560px) {
          .hnlp-overlay {
            padding: 6px !important;
          }

          .hnlp-modal {
            max-height: calc(100vh - 12px);
            max-height: calc(100dvh - 12px);
            border-radius: 13px;
          }

          .hnlp-close {
            top: 9px;
            width: 34px;
            height: 34px;
            margin: 9px 9px -43px auto;
          }

          .hnlp-close span {
            left: 8px;
            top: 16px;
          }

          .hnlp-visual {
            display: none;
          }

          .hnlp-pill {
            max-width: calc(100% - 48px);
            padding: 6px 10px;
            font-size: 9px;
            letter-spacing: 1px;
          }

          .hnlp-books {
            top: 60%;
            width: 205px;
            height: 148px;
          }

          .hnlp-book {
            width: 105px;
            height: 145px;
            border-radius: 6px 10px 10px 6px;
          }

          .hnlp-book-a {
            left: 6px;
            transform: rotate(-9deg) translateY(15px);
          }

          .hnlp-book-b {
            right: 6px;
            transform: rotate(7deg) translateY(12px);
          }

          .hnlp-badge {
            right: max(10px, calc(50% - 124px));
            top: 116px;
            width: 66px;
            height: 66px;
            border-width: 3px;
          }

          .hnlp-badge strong {
            font-size: 23px;
          }

          .hnlp-badge small {
            font-size: 9px;
          }

          .hnlp-content {
            padding: 48px 14px 15px;
          }

          .hnlp-eyebrow {
            font-size: 10px;
            letter-spacing: 1.4px;
          }

          .hnlp-grid {
            grid-template-columns: 1fr;
            gap: 9px;
          }

          .hnlp-content h2 {
            margin: 7px 0 8px;
            font-size: 23px;
            line-height: 1.12;
          }

          .hnlp-copy {
            margin-bottom: 12px;
            font-size: 12px !important;
            line-height: 1.55;
          }

          .hnlp-countdown {
            margin-bottom: 12px;
            padding: 10px 7px 11px;
            border-radius: 11px;
          }

          .hnlp-countdown-label {
            margin-bottom: 7px;
            font-size: 10px;
            letter-spacing: 1.4px;
          }

          .hnlp-countdown-row {
            gap: 3px;
          }

          .hnlp-time-box {
            min-width: 42px;
            padding: 6px 3px 5px;
            border-radius: 7px;
          }

          .hnlp-time-box strong {
            font-size: 17px;
          }

          .hnlp-time-box > span {
            font-size: 8px;
            letter-spacing: 0.5px;
          }

          .hnlp-time-colon {
            font-size: 16px;
          }

          .hnlp-form {
            gap: 9px;
          }

          .hnlp-form input,
          .hnlp-form select {
            height: 44px;
            padding: 0 12px;
          }

          .hnlp-form input,
          .hnlp-form select,
          .hnlp-form textarea {
            border-radius: 8px;
            font-size: 13px;
          }

          .hnlp-form textarea {
            min-height: 76px;
            padding: 11px 12px;
          }

          .hnlp-form button {
            min-height: 48px;
            border-radius: 8px;
            padding: 9px 12px;
            font-size: 12px;
            line-height: 1.3;
          }

          :global(.hnlp-digit-window) {
            width: 13px;
            height: 19px;
          }

          :global(.hnlp-digit-track) {
            height: 190px;
          }

          :global(.hnlp-digit) {
            height: 19px;
            flex-basis: 19px;
          }

          .hnlp-tab {
            left: 9px;
            right: 9px;
            bottom: 10px;
            width: fit-content;
            max-width: calc(100vw - 18px);
            gap: 7px;
            border-radius: 14px;
            padding: 7px 10px 7px 7px;
          }

          .hnlp-tab-badge {
            width: 46px;
            height: 46px;
            border-radius: 12px;
            font-size: 16px;
          }

          .hnlp-tab-copy {
            min-width: 0;
            gap: 4px;
          }

          .hnlp-tab-copy small {
            font-size: 8px;
            letter-spacing: 1px;
          }

          .hnlp-tab-time-box {
            min-width: 28px;
            height: 28px;
            border-radius: 6px;
          }

          .hnlp-tab-time-box strong {
            font-size: 12px;
          }

          .hnlp-tab-time-box em {
            font-size: 6px;
          }

          .hnlp-tab-book {
            left: 22px;
            top: -46px;
            width: 58px;
            height: 41px;
            transform: rotate(-8deg) scale(0.88);
          }
        }
      `}</style>
    </>
  );
}
