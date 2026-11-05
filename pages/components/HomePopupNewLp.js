"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Head from "next/head";
import CountryPhoneInput from "../../components/CountryPhoneInput";
import useHubspotForm from "/hooks/hubspot";

const initialForm = {
  fulName: "",
  email: "",
  phoneNumber: "",
  message: "",
};

const getWeeklyOfferState = (respectSchedule = true) => {
  const now = new Date();

  // November 3–26, 2026, inclusive (America/Los_Angeles, PST).
  const offerStart = new Date("2026-11-03T00:00:00-08:00");
  const offerEnd = new Date("2026-11-27T00:00:00-08:00");

  const isActive = !respectSchedule || (now.getTime() >= offerStart.getTime() && now.getTime() < offerEnd.getTime());

  return {
    isActive,
    secondsLeft: isActive
      ? Math.max(
        0,
        Math.floor((offerEnd.getTime() - now.getTime()) / 1000)
      )
      : 0,
  };
};

const formatTimePart = (value) =>
  String(value).padStart(2, "0");

export default function HomePopupNewLp({ openOnLoad = true, respectSchedule = true } = {}) {
  const { submitPopupContactFormScreen } = useHubspotForm();
  const [offerState, setOfferState] = useState(() => getWeeklyOfferState(respectSchedule));
  const [form, setForm] = useState(initialForm);
  const [isOpen, setIsOpen] = useState(() => openOnLoad && getWeeklyOfferState(respectSchedule).isActive);
  const [showTab, setShowTab] = useState(() => !openOnLoad && getWeeklyOfferState(respectSchedule).isActive);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [artworkReady, setArtworkReady] = useState(false);
  const [artworkSrc, setArtworkSrc] = useState("/brand-img/THANKSGIVING.png");
  const previousActiveRef = useRef(offerState.isActive);

  const timeParts = {
    days: formatTimePart(Math.floor(offerState.secondsLeft / 86400)),
    hours: formatTimePart(Math.floor((offerState.secondsLeft % 86400) / 3600)),
    minutes: formatTimePart(Math.floor((offerState.secondsLeft % 3600) / 60)),
    seconds: formatTimePart(offerState.secondsLeft % 60),
  };

  useEffect(() => {
    const updateOffer = () => {
      const nextOfferState = getWeeklyOfferState(respectSchedule);
      setOfferState(nextOfferState);

      if (!nextOfferState.isActive) {
        setIsOpen(false);
        setShowTab(false);
      } else if (!previousActiveRef.current) {
        setIsOpen(openOnLoad);
        setShowTab(!openOnLoad);
      }

      previousActiveRef.current = nextOfferState.isActive;
    };

    updateOffer();
    const timer = setInterval(updateOffer, 1000);

    return () => clearInterval(timer);
  }, [openOnLoad, respectSchedule]);

  useEffect(() => {
    if (!offerState.isActive) return undefined;

    let cancelled = false;
    const artwork = new Image();
    artwork.fetchPriority = "high";
    artwork.onload = async () => {
      try {
        await artwork.decode();
        if (!cancelled) setArtworkReady(true);
      } catch {
        // Keep the form hidden until the fallback artwork is ready too.
        if (!cancelled) setArtworkSrc("/brand-img/THANKSGIVING.png");
      }
    };
    artwork.onerror = () => {
      if (!cancelled) setArtworkSrc("/brand-img/THANKSGIVING.png");
    };
    artwork.src = artworkSrc;

    return () => {
      cancelled = true;
      artwork.onload = null;
      artwork.onerror = null;
    };
  }, [offerState.isActive, artworkSrc]);

  useEffect(() => {
    if (!isOpen || !artworkReady) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, artworkReady]);

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
            service: "30% Publishing Discount",
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
      <Head>
        <link key="thanksgiving-popup-artwork" rel="preload" as="image" href={artworkSrc} fetchPriority="high" />
      </Head>
      {isOpen && artworkReady && (
        <section className="hnlp-overlay" role="dialog" aria-modal="true" aria-labelledby="hnlp-title">
          <div className="hnlp-modal">
            <div className="hnlp-form-column">
            <div className="hnlp-content">
              <h2 id="hnlp-title">Got a Book Waiting to Be Published? Save 30% on This <span className="hnlp-title-highlight">Thanksgiving!</span></h2>
              <p className="hnlp-copy">If publishing your book has been on your to-do list for a while, here's a little reason to get back to it. We're offering <strong>30% OFF</strong> our book publishing services this Thanksgiving. Whether your manuscript is finished or just needs a few things sorted out, we're here to help you with the publishing process.</p>
            <div className="hnlp-countdown" role="timer" aria-live="off" aria-label={`Offer ends November 26 at 11:59 PM Pacific time. ${timeParts.days} days, ${timeParts.hours} hours, ${timeParts.minutes} minutes, ${timeParts.seconds} seconds remaining.`}>
              <span className="hnlp-countdown-label">OFFER ENDS</span>
              <div className="hnlp-countdown-digits">
                {[["days", "Days"], ["hours", "Hours"], ["minutes", "Mins"], ["seconds", "Secs"]].map(([key, label], index) => (
                  <Fragment key={key}>
                    {index > 0 && <span className="hnlp-countdown-colon" aria-hidden="true">:</span>}
                    <span className="hnlp-countdown-unit"><strong>{timeParts[key]}</strong><small>{label}</small></span>
                  </Fragment>
                ))}
              </div>
            </div>
              <form className="hnlp-form" onSubmit={handleSubmit}>
                <label className="hnlp-field">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7" r="4" /><path d="M3 22v-2a9 7 0 0 1 18 0v2Z" /></svg>
                  <input aria-label="Full Name" name="fulName" value={form.fulName} onChange={handleChange} placeholder="Full Name*" required />
                </label>
                <label className="hnlp-field">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="1" /><path d="m2 5 10 8L22 5" /></svg>
                  <input aria-label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address*" required />
                </label>
                <div className="hnlp-phone">
                  <CountryPhoneInput aria-label="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
                  {phoneError && <p className="hnlp-error" role="alert">{phoneError}</p>}
                </div>
                <label className="hnlp-field hnlp-message">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5C9 2 5 2 2 4v17c3-2 7-2 10 0 3-2 7-2 10 0V4c-3-2-7-2-10 1Zm0 0v16" /></svg>
                  <textarea aria-label="Manuscript / Project Details" name="message" value={form.message} onChange={handleChange} placeholder="Manuscript / Project Details*" rows={3} required />
                </label>
                <button className="hnlp-submit" type="submit" disabled={isSubmitting}>CLAIM MY 30% DISCOUNT <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m9 5 7 7-7 7M3 12h13" /></svg></button>
                {showSuccess && (
                  <div className="hnlp-success" role="status" aria-live="polite"><strong>Thank you!</strong> Your request has been submitted successfully.</div>
                )}
              </form>
            </div>
            </div>
            <div className="hnlp-art"><img src={artworkSrc} width="468" height="666" alt="Thanksgiving special: get 30% off publishing" fetchPriority="high" /></div>
            <button type="button" className="hnlp-close" onClick={handleClose} aria-label="Close popup"><span /><span /></button>
          </div>
          <button type="button" className="hnlp-mobile-close" onClick={handleClose} aria-label="Close popup">×</button>
        </section>
      )}
      {showTab && !isOpen && (
        <button type="button" className="hnlp-tab" aria-label="Open Thanksgiving offer: 30% off book publishing" onClick={() => { setShowTab(false); setIsOpen(true); }}>
          <span className="hnlp-tab-badge">30%<small>OFF</small></span>
          <span><strong>Thanksgiving Offer</strong>{offerState.secondsLeft > 0 && <span className="hnlp-tab-timer" aria-label={`Offer ends in ${timeParts.days} days ${timeParts.hours} hours ${timeParts.minutes} minutes ${timeParts.seconds} seconds`}>
            {[["days", "D"], ["hours", "H"], ["minutes", "M"], ["seconds", "S"]].map(([key, label], index) => (
              <Fragment key={key}>{index > 0 && <span>:</span>}<span>{timeParts[key]}<small>{label}</small></span></Fragment>
            ))}
          </span>}</span>
        </button>
      )}
      <style jsx>{`
        .hnlp-overlay { position: fixed; inset: 0; z-index: 2147483647; display: flex; align-items: center; justify-content: center; padding: 24px; overflow-y: auto; background: rgba(7, 16, 29, .72); backdrop-filter: blur(7px); }
        .hnlp-modal { position: relative; isolation: isolate; container-type: inline-size; display: grid; grid-template-columns: 1.1fr 1fr; width: min(1100px, 100%); margin: auto; border-radius: 24px; background: #dcfff2; box-shadow: 0 22px 70px #07101d66; }
        .hnlp-form-column { min-width: 0; padding: 28px; background: linear-gradient(135deg, #126b60, #1e5958); border-radius: 24px 0 0 24px; }
        .hnlp-art { display: flex; align-items: center; min-width: 0; overflow: hidden; border-radius: 0 24px 24px 0; }
        .hnlp-art img { display: block; width: 100%; height: auto; }
        .hnlp-countdown { position: relative; margin: 0 0 20px; padding: 12px; border-radius: 10px; background: #ffffff; text-align: center; color: #000000; }
        .hnlp-countdown-label { display: block; margin-bottom: .35cqw; font: 700 .8cqw/1.2 Arial, sans-serif; letter-spacing: .12em; }
        .hnlp-countdown-digits { display: flex; align-items: center; justify-content: center; gap: .6cqw; }
        .hnlp-countdown-unit { display: flex; flex-direction: column; align-items: center; min-width: 3.5cqw; padding: .3cqw .5cqw; border: 1px solid #299081; border-radius: .5cqw; background: #ffffff; box-shadow: 0 2px 6px #0f113d22; }
        .hnlp-countdown-unit strong { color: #000000; font: 700 1.8cqw/1.05 'Courier New', monospace; font-variant-numeric: tabular-nums; }
        .hnlp-countdown-unit small { margin-top: .15cqw; color: #000000; font: 700 .6cqw/1.2 Arial, sans-serif; text-transform: uppercase; letter-spacing: .06em; }
        .hnlp-countdown-colon { font: 700 1.7cqw/1 monospace; }
        .hnlp-content { position: relative; color: #ffffff; text-align: center; }
        .hnlp-content h2 { margin: 0 0 1cqw; font: 400 2.5cqw/1.12 Georgia, 'Times New Roman', serif; letter-spacing: -.03cqw; color: #ffffff; text-wrap: balance; }
        .hnlp-title-highlight { padding: 0 .15em; border-radius: .12em; background: linear-gradient(115deg, #299081, #1a8273 40%, #147d6e 85%); color: #ffffff; white-space: nowrap; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
        .hnlp-copy { margin: 0 0 1.3cqw; color: #edf7f4; font: 400 1.1cqw/1.5 Arial, sans-serif; }
        .hnlp-copy strong { display: inline-block; padding: 2px 6px; border-radius: 4px; background: #ffe18a; color: #10163d; font-weight: 800; animation: hnlp-discount-blink 1.2s ease-in-out infinite; }
        @keyframes hnlp-discount-blink {
          0%, 100% { background: #ffe18a; color: #10163d; box-shadow: 0 0 0 transparent; }
          50% { background: #ffffff; color: #126b60; box-shadow: 0 0 10px #ffe18a99; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hnlp-copy strong { animation: none; }
        }
        .hnlp-form { display: flex; flex-direction: column; gap: .85cqw; }
        .hnlp-field { display: flex; align-items: center; gap: 1.5cqw; width: 100%; height: 3.9cqw; margin: 0; padding: 0 1.75cqw; border: 1px solid #fff; border-radius: 1cqw; background: linear-gradient(115deg, #f7f7f7, #f4f4f4); box-shadow: 0 5px 10px #0f113d18; box-sizing: border-box; }
        .hnlp-field svg { flex: 0 0 2.2cqw; width: 2.2cqw; height: 2.2cqw; fill: none; stroke: #585858; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
        .hnlp-field input, .hnlp-field textarea { width: 100%; min-width: 0; height: 100%; padding: 0; border: 0; outline: 0; border-radius: 0; background: transparent; color: #444; font: 400 1.55cqw/1.4 Arial, sans-serif; box-shadow: none; }
        .hnlp-field input::placeholder, .hnlp-field textarea::placeholder { font-size: 1.2cqw; opacity: 1; color: #555; }
        .hnlp-field:focus-within, .hnlp-phone:focus-within { outline: 3px solid #63b5a7; outline-offset: 2px; }
        .hnlp-message { height: 10cqw; padding-top: 1cqw; padding-bottom: .5cqw; align-items: flex-start; }
        .hnlp-message textarea { resize: vertical; min-height: 100%; max-height: 10cqw; }
        .hnlp-phone { position: relative; border-radius: 1cqw; }
        .hnlp-phone :global(.country-phone-shell) { height: 3.9cqw !important; min-height: 3.9cqw !important; max-height: 3.9cqw !important; border: 1px solid #fff; border-radius: 1cqw; background: #f5f5f5; box-shadow: 0 5px 10px #0f113d18; }
        .hnlp-phone :global(.country-phone-country) { flex-basis: 4.6cqw; padding: 0 .7cqw; gap: .4cqw; background: transparent; border-color: #ddd; }
        .hnlp-phone :global(.country-phone-country svg) { width: 1.6cqw; height: 1.1cqw; }
        .hnlp-phone :global(.country-phone-code) { padding: 0 .6cqw; font: 400 1.3cqw Arial, sans-serif; color: #555; }
        .hnlp-phone :global(.country-phone-number) { height: 100% !important; font: 400 1.55cqw Arial, sans-serif; color: #444; }
        .hnlp-phone :global(.country-phone-number::placeholder) { font-size: 1.2cqw; color: #555; }
        .hnlp-error { position: absolute; z-index: 2; top: 100%; left: 0; margin: 0; padding: 3px 7px; border-radius: 4px; background: #fff1e7; color: #9b1b0e; font: 12px/1.3 Arial, sans-serif; }
        .hnlp-submit { display: flex; justify-content: center; align-items: center; gap: .65cqw; margin: .35cqw -.35cqw 0; min-height: 4.7cqw; border: .13cqw solid #63b5a7; border-radius: 1.35cqw; background: linear-gradient(115deg, #299081, #1a8273 40%, #147d6e 85%); box-shadow: inset 0 2px 2px #59ac9d, 0 7px 14px #07101d44; color: #ffffff; font: 700 2.08cqw/1 Arial, sans-serif; cursor: pointer; }
        .hnlp-submit svg { flex: 0 0 auto; width: 1em; height: 1em; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
        .hnlp-submit:hover { filter: brightness(1.06); }
        .hnlp-submit:disabled { opacity: .65; cursor: wait; }
        .hnlp-success { position: static; margin-top: 4px; padding: 12px; border: 1px solid #63b5a7; border-radius: 8px; background: #edf7f4; color: #0f113d; font: 14px/1.4 Arial, sans-serif; box-shadow: 0 4px 18px #0f113d44; }
        .hnlp-close { position: absolute; right: -.1%; top: -1.2%; z-index: 5; width: 40px; height: 40px; border: 0; border-radius: 50%; background: #fff; box-shadow: 0 3px 7px #0f113d33; cursor: pointer; }
        .hnlp-close span { position: absolute; left: 27%; top: 48%; width: 46%; height: 2px; border-radius: 2px; background: #121212; transform: rotate(45deg); }
        .hnlp-close span:last-child { transform: rotate(-45deg); }
        .hnlp-mobile-close { display: none; }
        button:focus-visible { outline: 3px solid #63b5a7; outline-offset: 4px; }
        .hnlp-tab { position: fixed; bottom: 20px; left: 20px; z-index: 2147483646; display: flex; align-items: center; gap: 12px; padding: 10px 16px 10px 10px; border: 2px solid #63b5a7; border-radius: 16px; background: linear-gradient(135deg, #147d6e, #0f113d); color: #ffffff; box-shadow: 0 8px 28px #07101d44; cursor: pointer; font: 14px Arial, sans-serif; text-align: left; }
        .hnlp-tab-badge { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 54px; height: 54px; border-radius: 10px; background: linear-gradient(135deg, #299081, #147d6e); color: #ffffff; font-size: 22px; font-weight: 800; }
        .hnlp-tab-badge small { font-size: 11px; }
        .hnlp-tab-timer { display: flex; align-items: center; gap: 7px; margin-top: 6px; font-variant-numeric: tabular-nums; }
        .hnlp-tab-timer small { margin-left: 2px; font-size: 9px; }
        @media (max-width: 700px) {
          .hnlp-overlay { padding: 16px 12px; align-items: flex-start; }
          .hnlp-modal { width: min(460px, 100%); grid-template-columns: 1fr; border-radius: 22px; overflow: hidden; }
          .hnlp-form-column { padding: 28px 20px 24px; border-radius: 0; }
          .hnlp-art { border-radius: 0; }
          .hnlp-countdown-label { font-size: 10px; margin-bottom: 5px; }
          .hnlp-countdown-digits { gap: 6px; }
          .hnlp-countdown-unit { min-width: 42px; padding: 4px 7px; border-radius: 5px; }
          .hnlp-countdown-unit strong { font-size: 22px; }
          .hnlp-countdown-unit small { font-size: 8px; }
          .hnlp-countdown-colon { font-size: 18px; }
          .hnlp-content h2 { margin-bottom: 16px; font-size: 8.8cqw; letter-spacing: -.1cqw; }
          .hnlp-copy { margin-bottom: 22px; font-size: 3.8cqw; }
          .hnlp-form { gap: 12px; }
          .hnlp-field { height: 54px; padding: 0 14px; gap: 12px; border-radius: 10px; }
          .hnlp-field svg { flex-basis: 24px; width: 24px; height: 24px; }
          .hnlp-field input, .hnlp-field textarea { font-size: 16px; }
          .hnlp-message { height: 150px; padding-top: 14px; padding-bottom: 8px; }
          .hnlp-message textarea { max-height: 180px; }
          .hnlp-phone, .hnlp-phone :global(.country-phone-shell) { border-radius: 10px; }
          .hnlp-phone :global(.country-phone-shell) { height: 54px !important; min-height: 54px !important; max-height: 54px !important; }
          .hnlp-phone :global(.country-phone-country) { flex-basis: 48px; padding: 0 6px; gap: 5px; }
          .hnlp-phone :global(.country-phone-country svg) { width: 22px; height: 15px; }
          .hnlp-phone :global(.country-phone-code) { padding: 0 6px; font-size: 14px; }
          .hnlp-phone :global(.country-phone-number) { font-size: 16px; }
          .hnlp-field input::placeholder, .hnlp-field textarea::placeholder, .hnlp-phone :global(.country-phone-number::placeholder) { font-size: 13px; }
          .hnlp-submit { margin: 4px 0 0; min-height: 57px; gap: 7px; border-width: 1px; border-radius: 13px; font-size: 4.25cqw; }
          .hnlp-leaves { display: none; }
          .hnlp-close { display: none; }
          .hnlp-mobile-close { display: block; position: fixed; z-index: 6; right: max(18px, calc((100vw - 460px) / 2 + 8px)); top: 16px; width: 44px; height: 44px; padding: 0; border: 0; border-radius: 50%; background: #fff; color: #111; font: 36px/1 Arial, sans-serif; box-shadow: 0 3px 7px #0f113d33; cursor: pointer; }
          .hnlp-tab { bottom: 12px; left: 12px; }
        }
      `}</style>
    </>
  );
}
