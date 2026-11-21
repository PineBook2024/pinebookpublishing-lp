import styles from "./GlobalAuthorSection.module.css";

export function openExpertChat() {
    if (typeof window === "undefined") return;

    window.$zoho = window.$zoho || {};
    const salesiq = window.$zoho.salesiq = window.$zoho.salesiq || {};
    if (typeof salesiq.floatwindow?.visible === "function") {
        salesiq.floatwindow.visible("show");
        return;
    }

    // Honor a click made while the chat widget is still loading.
    const previousReady = salesiq.ready;
    salesiq.ready = function (...args) {
        if (typeof previousReady === "function") previousReady.apply(this, args);
        salesiq.floatwindow?.visible("show");
    };
}

export default function OfferActionButtons({ onTalkToExpert, onGreen = false, label = "Get a Quote", alignLeft = false, allGreen = false }) {
    return (
        <div className={`${styles.sectionActions} ${alignLeft ? styles.leftActions : ""}`}>
            <button type="button" className={`${styles.expertButton} ${onGreen ? styles.whiteButton : ""}`} onClick={onTalkToExpert}>{label}</button>
            <a className={allGreen ? styles.expertButton : styles.phoneButton} href="tel:8887867135">Call Now</a>
            <button type="button" className={`${styles.expertButton} ${onGreen ? styles.whiteButton : ""}`} onClick={openExpertChat}>Talk to an Expert</button>
        </div>
    );
}
