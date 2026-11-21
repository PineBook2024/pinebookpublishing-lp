import styles from "./GlobalAuthorSection.module.css";

export default function OfferActionButtons({ onTalkToExpert, onGreen = false }) {
    return (
        <div className={styles.sectionActions}>
            <button type="button" className={`${styles.expertButton} ${onGreen ? styles.whiteButton : ""}`} onClick={onTalkToExpert}>Get a Quote</button>
            <a className={styles.phoneButton} href="tel:8887867135">(888) 786-7135</a>
        </div>
    );
}
