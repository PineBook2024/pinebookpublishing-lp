import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const caseStudies = [
    {
        title: "Angel of Death",
        subtitle: "Mark E. Hammond",
        description: "A supernatural thriller shaped through publishing, author branding, and long-term marketing.",
        image: "/brand-img/MarkEHammondCaseStudy/Mark E Hammond Book Mockup 01.webp",
        background: "/brand-img/MarkEHammondCaseStudy/Mark E Hammond the challange image.webp",
        link: "/case-studies/mark-e-hammond-angel-of-death",
    },
    {
        title: "Jesus & Rodeo",
        subtitle: "Jo Alexander",
        description: "A faith-based children's book brought to market with editorial support, publishing, and branding.",
        image: "/brand-img/jo_alexender/Jo Alexander Book Mockup 01.webp",
        background: "/brand-img/jo_alexender/Jo Alexander the challange image.webp",
        link: "/case-studies/jo-alexander-jesus-rodeo",
    },
    {
        title: "Universe Within You",
        subtitle: "Jerimy Des",
        description: "A personal development book launched with expert publishing, website development, and media outreach.",
        image: "/brand-img/CaseStudy Jerimybell/Jerimybell Book Mockup 01.webp",
        background: "/brand-img/CaseStudy Jerimybell/Jerimybell the challange image.webp",
        link: "/case-studies/jerimy-des-universe-within-you",
    },
];

const wrap = (value, max) => (value + max) % max;

export default function HomeCaseStudiesCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((index) => wrap(index + 1, caseStudies.length));
        }, 3500);

        return () => clearInterval(timer);
    }, []);

    const changeSlide = (direction) => {
        setCurrentIndex((index) => wrap(index + direction, caseStudies.length));
    };

    const visibleCases = [
        { ...caseStudies[wrap(currentIndex - 1, caseStudies.length)], position: "side" },
        { ...caseStudies[currentIndex], position: "center" },
        { ...caseStudies[wrap(currentIndex + 1, caseStudies.length)], position: "side" },
    ];

    return (
        <section className="home-case-carousel-section">
            <div className="home-case-carousel-box">
                <div className="home-case-carousel-heading">
                    <span>Case Studies</span>
                    <h2>Recent Author Success Stories</h2>
                </div>

                <div className="home-case-carousel">
                    <button
                        type="button"
                        className="home-case-carousel-btn home-case-carousel-btn-prev"
                        onClick={() => changeSlide(-1)}
                        aria-label="Previous case study"
                    >
                        <ChevronLeft size={22} strokeWidth={2.4} />
                    </button>

                    <div className="home-case-visible-cards">
                        {visibleCases.map((caseStudy, index) => (
                            <article
                                className="home-case-slide-panel"
                                data-position={caseStudy.position}
                                key={`${caseStudy.link}-${index}`}
                            >
                                <Link href={caseStudy.link} className="home-case-card-link">
                                    <div className="home-case-slide-media">
                                        <img
                                            className="home-case-slide-image"
                                            src={caseStudy.image}
                                            alt={`${caseStudy.title} case study`}
                                        />
                                    </div>
                                    <div className="home-case-slide-content">
                                        <p>{caseStudy.subtitle}</p>
                                        <h3>{caseStudy.title}</h3>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="home-case-carousel-btn home-case-carousel-btn-next"
                        onClick={() => changeSlide(1)}
                        aria-label="Next case study"
                    >
                        <ChevronRight size={22} strokeWidth={2.4} />
                    </button>
                </div>

                <div className="home-case-carousel-dots" aria-label="Case study slides">
                    {caseStudies.map((caseStudy, index) => (
                        <button
                            key={caseStudy.link}
                            type="button"
                            className={index === currentIndex ? "is-active" : ""}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Show ${caseStudy.title}`}
                            aria-current={index === currentIndex ? "true" : undefined}
                        />
                    ))}
                </div>

                <div className="home-case-view-all-wrap">
                    <Link href="/case-studies" className="home-case-view-all-btn">
                        View All
                    </Link>
                </div>
            </div>
        </section>
    );
}
