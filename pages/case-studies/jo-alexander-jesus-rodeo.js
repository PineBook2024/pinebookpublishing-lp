import React from "react";
import Head from "next/head";
import BrandTopBar from "../components/BrandTopBar";
import BrandNavbar from "../components/BrandNavbar";
import BrandContact from "../components/BrandContactForm";
import BrandFooter from "../components/BrandFooter";
import CaseStudyDetail from "../components/CaseStudyDetail";

const JO_ASSETS = "/brand-img/jo_alexender";

const caseData = {
    accentColor: "#1AA49F",
    altAccentColor: "#AC9974",
    hero: {
        beforeAccent: "From a Heartfelt Story to an Inspiring Faith-Based Book",
        afterAccent: "",
        background: "linear-gradient(135deg, #315f57 0%, #8b7a55 48%, #d8c99f 100%)",
        subtext:
            "Pine Book Publishing partnered with Jo Alexander to transform a meaningful Christian manuscript into a professionally published book through expert editorial support, premium book production, professional publishing, and strategic author branding. The result is an inspiring title that reflects the author's message of faith, hope, compassion, and the enduring bond between people, horses, and God's creation.",
        image: `${JO_ASSETS}/Jo Alexander Book Mockup 01.webp`,
        imageAlt: "Jesus & Rodeo book case study",
    },
    chips: [
        { label: "Client", value: "Jo Alexander" },
        { label: "Book Title", value: "Jesus & Rodeo" },
        { label: "Genre", value: "Christian Inspirational / Faith-Based Fiction / Western Fiction" },
        { label: "Timeline", value: "12-Month Publishing & Marketing Campaign" },
    ],
    author: {
        eyebrow: "About the Project",
        heading: "Jesus & Rodeo",
        image: `${JO_ASSETS}/Jo Alexander Book Mockup 01.webp`,
        name: "Jo Alexander",
        firstName: "Jo",
        lastName: "Alexander",
        bio:
            "Pine Book Publishing partnered with Jo Alexander to transform <em>Jesus & Rodeo</em> into a professionally published Christian children's book through a comprehensive 12-month publishing and marketing campaign. From manuscript refinement and premium book production to multi-format publishing, strategic branding, and promotional initiatives, we helped bring the author's heartfelt message of faith, compassion, and God's love to readers while establishing a strong foundation for long-term visibility and audience engagement.<br/><br/>Jo Alexander partnered with Pine Book Publishing for a comprehensive publishing and marketing campaign designed to transform <em>Jesus & Rodeo</em> into a professionally published and widely promoted Christian children's book. Over the course of the campaign, our team managed every stage of the publishing process, from manuscript refinement and professional book production to digital branding and promotional marketing.",
        features: [
            { icon: "*", title: "First-Time Author" },
            { icon: "*", title: "Christian Children's Book / Faith-Based Storytelling" },
            { icon: "*", title: "No Previous Publishing Experience" },
        ],
    },
    challenge: {
        beforeAccent: "Bringing a Faith-Based Story to Young Readers",
        paragraphs: [
            "As a first-time author entering the Christian children's book market, Jo Alexander faced the challenge of transforming a heartfelt manuscript into a professionally published book capable of connecting with young readers, families, and faith-based communities. While Jesus & Rodeo shared an inspiring message of faith, compassion, and God's love, bringing that vision to life required far more than simply completing the manuscript.",
            "The project required professional editorial refinement, child-friendly formatting, custom cover development, publishing preparation, and strategic positioning to ensure the book met the expectations of today's Christian children's publishing market. In addition, establishing a strong publishing foundation was essential for maximizing discoverability across major retail platforms while presenting the story in a polished, engaging format that would resonate with readers of all ages.",
            "The goal was not only to publish Jesus & Rodeo successfully, but to create a professionally produced children's book capable of inspiring families, supporting faith-based education, and helping Jo Alexander begin her journey as a published Christian author.",
        ],
        image: `${JO_ASSETS}/Jo Alexander the challange image.webp`,
    },
    solutions: {
        heading: {
            beforeAccent: "Bringing Jesus & Rodeo to Life Through Publishing, Branding, and Marketing",
        },
        intro:
            "Pine Book Publishing developed and executed a complete publishing and marketing campaign designed to transform Jesus & Rodeo into a professionally produced Christian children's book with a strong author brand and long-term promotional foundation.",
        items: [
            {
                icon: "*",
                title: "Publishing & Production",
                image: `${JO_ASSETS}/Jo Alexander Book Mockup 01.webp`,
                bullets: [
                    "Manuscript editing & proofreading",
                    "Professional formatting & typesetting",
                    "Custom book cover design",
                    "Kindle eBook publishing",
                    "Paperback publishing",
                    "Hardcover publishing",
                    "Amazon KDP setup & optimization",
                    "Barnes & Noble publishing",
                    "ISBN registration & barcode assignment",
                    "Professional print production",
                ],
            },
            {
                icon: "*",
                title: "Branding & Marketing",
                image: `${JO_ASSETS}/Jo Alexander the result image.webp`,
                bullets: [
                    "Author website development",
                    "Facebook & Instagram marketing campaigns",
                    "Promotional social media reels",
                    "Professional book video trailer",
                    "Press release distribution",
                    "Blog content creation",
                    "Search Engine Optimization (SEO)",
                    "Long-term author branding strategy",
                ],
            },
            {
                icon: "*",
                title: "Website Development",
                image: `${JO_ASSETS}/Jo Alexander the result image.webp`,
                reverseLayout: true,
                mediaLink: "https://joaalexander.com/",
                description:
                    "As part of the 12-month publishing and marketing campaign, Pine Book Publishing designed and developed a dedicated author website for Jo Alexander to establish a professional online presence and provide readers with a central destination to explore her book, author story, and latest updates. The website showcases Jesus & Rodeo, offering visitors easy access to book information, author insights, purchasing options, and contact details. Designed with a clean, family-friendly layout, the site reflects the book's Christian values while strengthening Jo Alexander's credibility as a published author and expanding her visibility beyond online bookstores.",
            },
            {
                icon: "*",
                title: "Press Release Distribution",
                pdf: `${JO_ASSETS}/EINPresswire-Report2-904615510-jo-alexander-shares-a-powerful-message-of-faith-family-and-healing-in-jesus-rodeo-1 (1).pdf`,
                reverseLayout: false,
                description:
                    "To expand awareness of Jesus & Rodeo, Pine Book Publishing developed and distributed a professionally written press release highlighting Jo Alexander's message of faith, family, healing, and compassion. The release was shared through a wide-reaching media network that included major newswires, search engines, AI databases, regional news outlets, national publications, and book-focused media platforms. This campaign strengthened the book's online presence, improved search visibility, increased Jo Alexander's credibility as a published Christian author, and helped introduce the story to readers, journalists, faith-based audiences, and publishing professionals across multiple markets.",
            },
            {
                icon: "*",
                title: "Professional Book Trailer",
                video: `${JO_ASSETS}/Jo A Alexander Trailer.mp4`,
                reverseLayout: true,
                description:
                    "To enhance the promotion of Jesus & Rodeo, Pine Book Publishing produced a professionally crafted book trailer designed to capture the heart of the story through engaging visuals, cinematic editing, and inspiring messaging. The trailer highlighted the book's themes of faith, hope, compassion, and the special bond between people and animals, creating an emotional connection with viewers while encouraging them to discover the story. The trailer was developed as a versatile marketing asset for use across the author's website, social media platforms, online advertising, and promotional campaigns.",
            },
            {
                icon: "*",
                title: "Social Media Growth",
                images: [
                    `${JO_ASSETS}/Jo Alexander Mobile Mockup 01.webp`,
                    `${JO_ASSETS}/Jo Alexander Mobile Mockup 02.webp`,
                ],
                mediaClass: "is-dual-mobile-media",
                reverseLayout: false,
                description:
                    "As part of the 12-month marketing campaign, Pine Book Publishing developed and managed a strategic social media presence for Jesus & Rodeo across Facebook and Instagram. The campaign focused on introducing Jo Alexander's inspiring Christian children's book to a broader audience through engaging visual content, consistent branding, and reader-focused promotional posts designed to increase awareness and interaction. Using professionally designed graphics, promotional campaigns, and audience engagement strategies, we helped strengthen the book's online visibility while establishing a recognizable author presence across both platforms.",
            },
            {
                icon: "*",
                title: "Strategic Engagement",
                video: `${JO_ASSETS}/Jo Alexander social media growth.webm`,
                reverseLayout: true,
                description:
                    "Through professionally designed promotional content, engaging visuals, branded campaigns, and consistent audience interaction, Pine Book Publishing helped expand the book's online reach while increasing awareness among families, Christian readers, and faith-based communities. The campaign strengthened Jo Alexander's digital presence, generated measurable audience growth and engagement, and established a lasting social media foundation to support ongoing book promotion and long-term author brand development.",
            },
        ],
    },
    result: {
        sectionedLayout: true,
        heading: {
            beforeAccent: "Building a Foundation for ",
            accent: "Long-Term",
            afterAccent: " Christian Author Growth",
        },
        sections: [
            {
                title: "Campaign Results",
                image: `${JO_ASSETS}/Jo Alexander Book Mockup 01.webp`,
                imageAlt: "Jesus & Rodeo book mockup",
                imageClass: "cs-result-book-cover",
                paragraphs: [
                    "By the conclusion of the 12-month campaign, <em>Jesus & Rodeo</em> was successfully transformed into a professionally published Christian children's book supported by a complete publishing and marketing foundation. The project included professional editorial services, custom cover design, multi-format publishing, author website development, book trailer production, press release distribution, and strategic social media marketing, creating a cohesive author brand with increased online visibility and reader engagement.",
                    "Most importantly, the campaign established Jo Alexander as a published Christian author with a strong digital presence and the marketing infrastructure needed to support continued promotion. Through strategic publishing, branded content, media exposure, and audience engagement initiatives, <em>Jesus & Rodeo</em> was positioned for long-term discoverability and sustained growth within the Christian and family reading community.",
                ],
            },
            {
                title: "The Result",
                image: `${JO_ASSETS}/Jo Alexander amazon seller image.webp`,
                imageAlt: "Jesus & Rodeo publishing campaign result",
                imageClass: "cs-result-laptop-mockup",
                imagePosition: "right",
                paragraphs: [
                    "The success of this campaign demonstrates that publishing a meaningful book is only the beginning of an author's journey. Through a carefully planned combination of professional publishing, branding, digital marketing, media outreach, and audience engagement, Pine Book Publishing helped transform <em>Jesus & Rodeo</em> into more than a published title; it became the foundation of Jo Alexander's growing author brand.",
                    "With a professional online presence, engaging promotional assets, expanded digital visibility, and a long-term marketing strategy, Jo Alexander is well positioned to continue reaching readers, inspiring families, and sharing her message of faith, hope, and compassion for years to come.",
                ],
            },
        ],
    },
};

export default function JoAlexanderJesusRodeo() {
    return (
        <>
            <Head>
                <title>
                    Jesus & Rodeo - Jo Alexander Case Study | Pine Book Publishing
                </title>
                <meta
                    name="description"
                    content="See how Pine Book Publishing helped Jo Alexander publish and promote Jesus & Rodeo through editing, publishing, website development, press release distribution, book trailer production, and social media marketing."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
                <link
                    rel="canonical"
                    href="https://www.pinebookpublishing.com/case-studies/jo-alexander-jesus-rodeo"
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
