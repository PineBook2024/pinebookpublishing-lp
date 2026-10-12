import Link from "next/link";
import { ArrowRight, BookOpen, ChartNoAxesColumnIncreasing, FileSearch, PenTool } from "lucide-react";
import styles from "./GlobalAuthorSection.module.css";

const services = [
    { title: "Book Editing", description: "Refine your manuscript with expert editorial guidance.", href: "/book-editing", Icon: PenTool },
    { title: "Proofreading", description: "Polish your work for clarity, accuracy, and a professional finish.", href: "/proofreading", Icon: FileSearch },
    { title: "Book Formatting", description: "Beautiful, industry-standard formatting for print and eBook.", href: "/book-formatting", Icon: BookOpen },
    { title: "Publishing & Distribution", description: "Get your book to readers worldwide with ease.", href: "/book-publishing", Icon: ChartNoAxesColumnIncreasing },
];

export default function GlobalAuthorSection({ videoSrc = "/brand-img/Global-Author-Section.mp4", poster }) {
    return (
        <section className={styles.section} aria-label="From manuscript to published success">
            <svg className={styles.decoration} viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true">
                <path d="M1340 0H1672V208C1570 104 1430 159 1340 0Z" fill="#f4f0e7" />
                <path d="M1418 0H1672V208C1580 105 1460 133 1418 0Z" fill="#1b1d43" />
                <path d="M1280 0C1400 179 1540 82 1672 205" fill="none" stroke="#1a8273" />
                <path d="M0 465C200 560 206 749 443 798S690 858 845 941H0Z" fill="#e4ecec" />
                <path d="M0 591C200 620 193 852 381 849S561 874 641 941H0Z" fill="#f4f0e7" />
                <path d="M0 618C231 684 159 831 371 879S504 899 568 941H0Z" fill="#1b1d43" />
                <path d="M0 699C176 769 244 858 386 849S562 870 638 941" fill="none" stroke="#1a8273" />
                <path d="M0 809C145 836 181 866 276 941H0Z" fill="#1a8273" opacity=".22" />
                <path d="M1590 115Q1582 56 1655 10Q1630 65 1636 89ZM1590 115Q1549 53 1495 51Q1520 102 1590 115Z" fill="#fff" opacity=".07" />
                <path d="M60 174V5M60 145L12 105M60 122L107 80M60 92L26 63M60 69L89 42M60 45L42 27" fill="none" stroke="#1a8273" strokeWidth="15" opacity=".045" />
            </svg>
            <div className={styles.layout}>
                <div className={styles.videoFrame}>
                    <video className={styles.video} autoPlay muted loop playsInline controls={false} controlsList="nodownload" disablePictureInPicture onContextMenu={(event) => event.preventDefault()} preload="auto" poster={poster} aria-label="Pine Book Publishing — from manuscript to published success">
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support video playback.
                    </video>
                </div>
                <div className={styles.content}>
                    <div className={styles.eyebrow}><BookOpen aria-hidden="true" /><span>Pine Book Publishing</span></div>
                    <h2 className={styles.heading}>Our Work Reaches Authors <span>Around the World<svg viewBox="0 0 500 20" preserveAspectRatio="none" aria-hidden="true"><path d="M2 15C116 1 423 1 487 9Q507 12 488 18" /></svg></span></h2>
                    <p className={styles.description}>We work with authors from different countries and continents, helping them bring their books to life. Wherever you are, we're here to support your writing or publishing needs.</p>
                    {/* <div className={styles.services}>
                        {services.map(({ title, description, href, Icon }, index) => <Link className={styles.card} href={href} key={title}>
                            <div className={styles.cardTop}><span className={`${styles.serviceIcon} ${index === 1 || index === 2 ? styles.alternate : ""}`}><Icon aria-hidden="true" /></span><span className={styles.arrow}><ArrowRight aria-hidden="true" /></span></div>
                            <h3>{title}</h3><p>{description}</p>
                        </Link>)}
                    </div> */}
                </div>
            </div>
        </section>
    );
}
