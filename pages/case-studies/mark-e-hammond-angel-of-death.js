import React from "react";
import Head from "next/head";
import BrandTopBar from "../components/BrandTopBar";
import BrandNavbar from "../components/BrandNavbar";
import BrandContact from "../components/BrandContactForm";
import BrandFooter from "../components/BrandFooter";
import CaseStudyDetail from "../components/CaseStudyDetail";

const ASSETS = "/brand-img/MarkEHammondCaseStudy";

const caseData = {
    accentColor: "#1AA49F",
    altAccentColor: "#AC9974",
    hero: {
        beforeAccent: "From a Dark Vision to a Gripping Supernatural Thriller",
        afterAccent: "",
        background:
            "radial-gradient(circle at 82% 38%, rgba(196, 19, 35, 0.72) 0%, rgba(196, 19, 35, 0.22) 17%, rgba(8, 10, 14, 0) 36%), radial-gradient(circle at 66% 84%, rgba(255, 192, 119, 0.28) 0%, rgba(255, 192, 119, 0.08) 14%, rgba(8, 10, 14, 0) 30%), linear-gradient(135deg, #050609 0%, #151820 38%, #2f333b 68%, #090a0d 100%)",
        subtext:
            "Pine Book Publishing partnered with Mark E. Hammond to transform Angel of Death into a professionally published supernatural thriller through comprehensive manuscript development, professional editing, cover design, publishing, multi-format distribution, strategic branding, and long-term author marketing over a 12-month publishing campaign.",
        image: `${ASSETS}/Mark E Hammond Book Mockup 01.webp`,
        imageAlt: "Angel of Death book case study",
    },
    chips: [
        { label: "Client", value: "Mark E. Hammond" },
        { label: "Book Title", value: "Angel of Death" },
        { label: "Genre", value: "Supernatural Horror / Psychological Thriller / Dark Fantasy" },
        { label: "Timeline", value: "12-Month Publishing & Author Branding Campaign" },
    ],
    author: {
        image: `${ASSETS}/Mark E Hammond About The Author.webp`,
        name: "Mark E. Hammond",
        firstName: "Mark E.",
        lastName: "Hammond",
        bio:
            "Mark E. Hammond is a fiction author with a passion for supernatural horror and psychological thrillers that explore the darker aspects of human nature. Through suspenseful storytelling, compelling characters, and morally complex themes, he crafts stories that blend horror, mystery, and emotional depth to keep readers engaged from beginning to end.<br/><br/>His debut novel, <em>Angel of Death</em>, explores the thin line between justice, redemption, and vengeance, taking readers on a chilling journey through supernatural forces, psychological conflict, and the consequences of life's choices. With a cinematic writing style and fast-paced narrative, Mark Hammond delivers an immersive reading experience that challenges readers to question the nature of good, evil, and the price of redemption.",
        features: [
            { icon: "*", title: "First-Time Author" },
            { icon: "*", title: "Supernatural Horror / Psychological Thriller" },
            { icon: "*", title: "12-Month Publishing & Branding Campaign" },
        ],
    },
    challenge: {
        beforeAccent: "Transforming a Debut Manuscript into a Market-Ready Thriller",
        paragraphs: [
            "Before partnering with Pine Book Publishing, Mark E. Hammond had written a compelling supernatural horror novel with a gripping storyline, suspenseful pacing, and emotionally driven characters, but lacked the professional publishing guidance, editorial refinement, production expertise, and distribution strategy needed to successfully introduce the book to a competitive marketplace.",
            "The project required far more than simply publishing the manuscript. It demanded comprehensive developmental editing, professional formatting, custom cover design, publishing preparation, and strategic positioning to ensure Angel of Death met industry standards while delivering a polished reading experience across multiple formats.",
            "The goal was not simply to publish a book online. The goal was to transform Angel of Death into a professionally produced supernatural thriller while establishing Mark E. Hammond as a published author with a strong foundation for long-term growth and future publishing success.",
        ],
        image: `${ASSETS}/Mark E Hammond the challange image.webp`,
    },
    solutions: {
        heading: {
            beforeAccent: "Transforming a Supernatural Thriller into a Professionally Published Book",
        },
        intro:
            "Pine Book Publishing developed and executed a comprehensive publishing and production strategy designed to transform Angel of Death from a completed manuscript into a professionally published supernatural horror novel. The project included:",
        items: [
            {
                icon: "*",
                title: "Publishing & Production",
                image: `${ASSETS}/Mark E Hammond Book Mockup 01.webp`,
                bullets: [
                    "Developmental Editing",
                    "Line-by-Line Editing",
                    "Professional Proofreading",
                    "Typesetting & Interior Layout Design",
                    "Publishing-Standard Formatting",
                    "Five Revision Rounds Per Draft",
                    "Custom Cover Design",
                    "Front, Back & Spine Cover Development",
                    "Kindle eBook Publishing",
                    "Paperback Publishing",
                    "Hardcover Publishing",
                    "Amazon KDP Account Setup & Optimization",
                    "Barnes & Noble Publishing",
                ],
            },
            {
                icon: "*",
                title: "Publishing Support",
                image: `${ASSETS}/Mark E Hammond the result image.webp`,
                bullets: [
                    "Author Account Creation",
                    "Account Verification",
                    "Account Optimization",
                    "Multi-Format Book Production",
                    "Global Retail Distribution Through Amazon Kindle & Barnes & Noble",
                    "100% Ownership Rights",
                    "No Royalty Sharing",
                    "Satisfaction-Focused Publishing Process",
                ],
            },
            {
                icon: "*",
                title: "Website Development",
                image: `${ASSETS}/Mark E Hammond the result image.webp`,
                reverseLayout: true,
                mediaLink: "https://markehammond.com/",
                description:
                    "As part of the 12-month publishing campaign, Pine Book Publishing designed and developed a dedicated author website for Mark E. Hammond to establish a professional online presence and create a central destination for readers to explore his work. The website, markehammond.com, showcases Angel of Death, introduces the author, and provides visitors with easy access to book information, updates, and purchasing options. Beyond promoting a single title, the website strengthens Mark Hammond's author brand, improves discoverability, and provides a solid foundation for future book launches and long-term audience engagement.",
            },
            {
                icon: "*",
                title: "Cinematic Book Trailer",
                video: "/brand-img/videos/Render.mp4",
                reverseLayout: false,
                description:
                    "To enhance the book's promotional campaign, Pine Book Publishing produced a cinematic book trailer for Angel of Death that captured the novel's dark atmosphere, suspense, and supernatural themes. Combining compelling visuals, dramatic pacing, and immersive storytelling, the trailer was designed to give potential readers a powerful first impression of the book while generating excitement ahead of its release. The trailer serves as a versatile marketing asset across the author's website, social media platforms, and digital promotional campaigns.",
            },
            {
                icon: "*",
                title: "Social Media Growth",
                video: "/brand-img/videos/Mark E Hammond social media growth.webm",
                reverseLayout: true,
                description:
                    "As part of the 12-month marketing campaign, Pine Book Publishing developed and managed a targeted social media strategy across Facebook and Instagram to increase awareness of Angel of Death and strengthen Mark E. Hammond's online presence. Through consistent promotional content, engaging visuals, and audience-focused campaigns, we helped introduce the book to new readers while building a professional author profile.",
            },
            {
                icon: "*",
                title: "Sales & Distribution",
                image: `${ASSETS}/Mark E Hammond amazon seller image.webp`,
                reverseLayout: false,
                description:
                    "The publishing and branding campaign generated measurable commercial performance across both Amazon KDP and IngramSpark distribution channels. Between January and April 2026, the project generated more than 750 Kindle eBook sales, over 48 paperback sales, hardcover purchases, Kindle Unlimited engagement, and recurring royalty generation across multiple campaign periods. IngramSpark distribution further expanded the book's retail availability and print accessibility while supporting broader multi-channel fulfillment and long-term discoverability outside Amazon alone.",
            },
            {
                icon: "*",
                title: "Book Marketing & Promotion",
                images: [
                    `${ASSETS}/Mark E Hammond Mobile Mockup 01.webp`,
                    `${ASSETS}/Mark E Hammond Mobile Mockup 01-2.webp`,
                ],
                mediaClass: "is-dual-mobile-media",
                reverseLayout: true,
                description:
                    "Publishing a book is only the first step toward reaching readers. As part of the 12-month campaign, Pine Book Publishing developed a marketing strategy designed to increase awareness of Angel of Death and strengthen Mark E. Hammond's author presence. The campaign combined digital marketing initiatives, promotional assets, and audience engagement strategies to introduce the book to readers across multiple online platforms.",
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
                image: `${ASSETS}/Mark E Hammond Book Mockup 01.webp`,
                imageAlt: "Angel of Death book mockup",
                imageClass: "cs-result-book-cover",
                paragraphs: [
                    "By the conclusion of the 12-month campaign, Mark E. Hammond successfully transformed <em>Angel of Death</em> into a professionally published supernatural thriller supported by comprehensive editorial development, professional production, multi-format publishing, and strategic digital marketing. The campaign established a strong online presence through a dedicated author website, cinematic book trailer, Facebook and Instagram marketing, ISBN registration, and distribution across major publishing platforms, creating a solid foundation for long-term visibility and reader engagement.",
                    "Most importantly, the campaign successfully transformed <em>Angel of Death</em> from a completed manuscript into a professionally published novel supported by strategic publishing, professional branding, digital marketing, and audience engagement initiatives. Through a carefully executed publishing strategy, Pine Book Publishing helped position Mark E. Hammond as a published author while creating the infrastructure needed to support future growth, discoverability, and continued success.",
                ],
            },
            {
                title: "The Result",
                image: `${ASSETS}/Mark E Hammond amazon seller image02.webp`,
                imageAlt: "Mark E. Hammond Amazon seller campaign result",
                imageClass: "cs-result-laptop-mockup",
                imagePosition: "right",
                paragraphs: [
                    "The success of this campaign demonstrated that professional publishing extends far beyond simply releasing a book online.",
                    "Through a carefully structured combination of developmental editing, professional production, publishing strategy, digital branding, website development, promotional video creation, and social media marketing, Pine Book Publishing helped establish Mark E. Hammond not only as a published author but as an emerging voice in the supernatural horror and psychological thriller genre. The campaign created a professional publishing and marketing foundation designed to support long-term visibility, reader engagement, and future publishing opportunities.",
                ],
            },
        ],
    },
};

export default function MarkEHammondAngelOfDeath() {
    return (
        <>
            <Head>
                <title>
                    Angel of Death - Mark E. Hammond Case Study | Pine Book Publishing
                </title>
                <meta
                    name="description"
                    content="See how Pine Book Publishing helped Mark E. Hammond publish and brand Angel of Death through editing, publishing, website development, book marketing, and social media growth."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
                <link
                    rel="canonical"
                    href="https://www.pinebookpublishing.com/case-studies/mark-e-hammond-angel-of-death"
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
