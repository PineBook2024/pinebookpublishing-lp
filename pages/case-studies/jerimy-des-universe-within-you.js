import React from "react";
import Head from "next/head";
import BrandTopBar from "../components/BrandTopBar";
import BrandNavbar from "../components/BrandNavbar";
import BrandContact from "../components/BrandContactForm";
import BrandFooter from "../components/BrandFooter";
import CaseStudyDetail from "../components/CaseStudyDetail";

const JERIMY_ASSETS = "/brand-img/CaseStudy Jerimybell";
const PLACEHOLDER_ASSETS = "/brand-img/jo_alexender";

const caseData = {
    accentColor: "#16BBD3",
    altAccentColor: "#F5A623",
    hero: {
        beforeAccent: "From Inner Reflection to an Inspiring Self-Discovery Journey",
        afterAccent: "",
        background: "radial-gradient(circle at 72% 42%, rgba(245, 166, 35, 0.72) 0%, rgba(245, 166, 35, 0.18) 18%, rgba(7, 14, 31, 0) 34%), linear-gradient(135deg, #05070f 0%, #071c33 46%, #0b4a5a 100%)",
        subtext:
            "Pine Book Publishing partnered with Jerimy Des to transform Universe Within You into a professionally published personal development book through expert publishing, professional branding, website development, media outreach, social media marketing, and long-term digital visibility initiatives.",
        image: `${JERIMY_ASSETS}/Jerimybell Book Mockup 01.webp`,
        imageAlt: "Universe Within You book case study",
    },
    chips: [
        { label: "Client", value: "Jerimy Des" },
        { label: "Book Title", value: "Universe Within You" },
        { label: "Genre", value: "Personal Development / Self-Help / Spirituality / Psychology" },
        { label: "Timeline", value: "6-Month Project" },
    ],
    author: {
        image: `${JERIMY_ASSETS}/Jerimybell Book Mockup 01.webp`,
        name: "Jerimy Des",
        firstName: "Jerimy",
        lastName: "Des",
        bio:
            "Jerimy Des is a thought-provoking writer passionate about exploring the relationship between human emotions, consciousness, spirituality, and personal growth. Through <em>Universe Within You</em>, he encourages readers to reflect on their thoughts, emotions, and life experiences while examining the connection between science, psychology, philosophy, and the human spirit. His unique perspective invites readers to challenge conventional thinking and discover a deeper understanding of themselves and the world around them.<br/><br/>Pine Book Publishing partnered with Jerimy Des to transform <em>Universe Within You</em> from a completed manuscript into a professionally published and market-ready title through our Expert Publishing Package. Beyond publication, the campaign included the development of a professional author website, cinematic book trailer production, press release distribution, Facebook and Instagram marketing, promotional video content, and long-term digital branding initiatives.",
        features: [
            { icon: "*", title: "First-Time Author" },
            { icon: "*", title: "Personal Development / Self-Help / Spirituality" },
            { icon: "*", title: "No Previous Publishing Experience" },
        ],
    },
    challenge: {
        beforeAccent: "Transforming a Thought-Provoking Manuscript into a Professional Author Brand",
        paragraphs: [
            "Bringing Universe Within You to market required more than simply publishing a manuscript. As a first-time author presenting original perspectives on human consciousness, emotions, spirituality, and personal transformation, Jerimy Des needed a professional publishing strategy capable of presenting these complex ideas in a polished, accessible, and credible format for today's readers.",
            "The project required editorial refinement, professional formatting, custom cover development, multi-platform publishing, and a comprehensive branding strategy that would strengthen the author's credibility while expanding discoverability across major online bookstores and digital platforms.",
            "The objective was not only to publish the book successfully, but to establish Jerimy Des as a credible new voice within the personal development space while creating a long-term foundation for future audience growth and continued author success.",
        ],
        image: `${JERIMY_ASSETS}/Jerimybell the challange image.webp`,
    },
    solutions: {
        heading: {
            beforeAccent: "Transforming a Powerful Manuscript into a Professional Publishing Brand",
        },
        intro:
            "Pine Book Publishing developed and executed a comprehensive publishing and branding campaign designed to transform Universe Within You into a professionally published book supported by long-term marketing and digital visibility initiatives.",
        items: [
            {
                icon: "*",
                title: "Publishing & Production",
                image: `${JERIMY_ASSETS}/Jerimybell Book Mockup 01.webp`,
                bullets: [
                    "Developmental editing & editorial support",
                    "Professional proofreading",
                    "Publishing-standard formatting & typesetting",
                    "Layout adjustments",
                    "Five manuscript revisions",
                    "Custom cover design",
                    "Front, back & spine cover formatting",
                    "Kindle eBook publishing",
                    "Paperback publishing",
                    "Hardcover publishing",
                    "Amazon KDP setup & optimization",
                    "Barnes & Noble publishing",
                    "Google Books publishing",
                    "ISBN registration & barcode assignment",
                ],
            },
            {
                icon: "*",
                title: "Branding & Marketing",
                image: `${JERIMY_ASSETS}/Jerimybell the result image.webp`,
                bullets: [
                    "Professional author website development",
                    "One-year domain & hosting",
                    "Professional book trailer production",
                    "Press release distribution",
                    "Facebook & Instagram marketing campaigns",
                    "Promotional social media reels",
                    "Long-term author branding strategy",
                ],
            },
            {
                icon: "*",
                title: "Website Development",
                image: `${JERIMY_ASSETS}/Jerimybell the result image.webp`,
                mediaLink: "https://jerimydes.com/",
                reverseLayout: true,
                description:
                    "As part of the publishing and marketing campaign, Pine Book Publishing designed and developed a dedicated author website for Jerimy Des to establish a professional online presence and provide readers with a central destination to explore Universe Within You. The website was created to showcase the book, share the author's vision, and offer visitors easy access to book information, purchasing options, and future updates. Beyond promoting the book, the website strengthened Jerimy Des' credibility as a published author while improving online discoverability and supporting long-term brand development.",
            },
            {
                icon: "*",
                title: "Professional Book Trailer",
                video: `${JERIMY_ASSETS}/Jerimy Des Trailer.mp4`,
                reverseLayout: true,
                description:
                    "To complement the publishing campaign, Pine Book Publishing produced a professionally crafted cinematic book trailer for Universe Within You. Designed to visually communicate the book's central themes of consciousness, emotion, spirituality, and personal transformation, the trailer created an engaging introduction that encouraged viewers to explore the author's unique perspective. The trailer became a versatile promotional asset used across the author's website, social media platforms, and digital marketing campaigns.",
            },
            {
                icon: "*",
                title: "Digital Presence Beyond Publication",
                images: [
                    `${JERIMY_ASSETS}/Jerimybell Mobile Mockup 01.webp`,
                    `${JERIMY_ASSETS}/Jerimybell Mobile Mockup 02.webp`,
                ],
                mediaClass: "is-dual-mobile-media",
                reverseLayout: false,
                description:
                    "Publishing Universe Within You marked the beginning of Jerimy Des' author journey. Pine Book Publishing developed a comprehensive digital marketing strategy designed to increase the book's visibility, strengthen the author's online presence, and connect with readers interested in personal growth, spirituality, psychology, and self-discovery. Every initiative was designed to build credibility, improve discoverability, and expand reader engagement.",
            },
            {
                icon: "*",
                title: "Social Media Growth",
                video: `${JERIMY_ASSETS}/Jerimybell social media growth.webm`,
                reverseLayout: true,
                description:
                    "Pine Book Publishing developed and managed a strategic social media presence across Facebook and Instagram to build awareness for Universe Within You. Through professionally designed graphics, promotional reels, branded content, and consistent audience engagement, the campaign introduced the book to readers interested in spirituality, psychology, self-improvement, and philosophical exploration while strengthening Jerimy Des' online presence.",
            },
        ],
    },
    result: {
        sectionedLayout: true,
        heading: {
            beforeAccent: "Building a Foundation for ",
            accent: "Long-Term",
            afterAccent: " Author Growth",
        },
        sections: [
            {
                title: "Campaign Results",
                image: `${JERIMY_ASSETS}/Jerimybell Book Mockup 01.webp`,
                imageAlt: "Universe Within You book mockup",
                imageClass: "cs-result-book-cover",
                paragraphs: [
                    "By the conclusion of the campaign, <em>Universe Within You</em> successfully evolved from a completed manuscript into a professionally published book supported by a comprehensive publishing and marketing strategy. The project included editorial refinement, custom cover design, professional formatting, multi-platform publication, website development, media outreach, promotional video production, social media marketing, and strategic digital branding.",
                    "Most importantly, the campaign established Jerimy Des as a published author with a professional online presence and a complete marketing infrastructure designed to support long-term visibility. Through strategic publishing, media exposure, audience engagement, and digital promotion, <em>Universe Within You</em> gained increased discoverability while building a strong foundation for continued growth within the personal development and self-help market.",
                ],
            },
            {
                title: "The Result",
                image: `${JERIMY_ASSETS}/Jerimybell amazon seller image.webp`,
                imageAlt: "Universe Within You publishing campaign result",
                imageClass: "cs-result-laptop-mockup",
                imagePosition: "right",
                paragraphs: [
                    "The success of this campaign demonstrates that publishing a book is only the beginning of building a lasting author brand. Through a carefully structured combination of professional publishing, digital branding, media visibility, social media marketing, promotional content, and long-term audience engagement, Pine Book Publishing helped transform <em>Universe Within You</em> into more than a published title.",
                    "With a professional digital presence, expanded media exposure, engaging marketing assets, and a comprehensive promotional strategy, Jerimy Des is well positioned to continue reaching new readers, growing his audience, and sharing the powerful ideas behind <em>Universe Within You</em> for years to come.",
                ],
            },
        ],
    },
};

export default function JerimyDesUniverseWithinYou() {
    return (
        <>
            <Head>
                <title>
                    Universe Within You - Jerimy Des Case Study | Pine Book Publishing
                </title>
                <meta
                    name="description"
                    content="See how Pine Book Publishing helped Jerimy Des publish and promote Universe Within You through expert publishing, branding, website development, press releases, book trailer production, and social media marketing."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
                <link
                    rel="canonical"
                    href="https://www.pinebookpublishing.com/case-studies/jerimy-des-universe-within-you"
                />
            </Head>

            <div className="case-study-detail-page">
                <BrandTopBar />
                <BrandNavbar />

                <CaseStudyDetail data={caseData} />

                <BrandContact />
                <BrandFooter />
            </div>
        </>
    );
}
