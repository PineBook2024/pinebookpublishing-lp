import React from "react";
import Head from "next/head";
import BrandTopBar from "../components/BrandTopBar";
import BrandNavbar from "../components/BrandNavbar";
import BrandContact from "../components/BrandContactForm";
import BrandFooter from "../components/BrandFooter";
import CaseStudyDetail from "../components/CaseStudyDetail";

const ASSETS = "/images/Viktor Ujkic Case Study Assetts";

const caseData = {
    accentColor: "#1AA49F",
    altAccentColor: "#AC9974",
    hero: {
        beforeAccent: "From a Debut Crime Thriller to a Compelling Author Brand",
        afterAccent: "",
        background:
            "radial-gradient(circle at 69% 31%, rgba(238, 192, 88, 0.28) 0%, rgba(238, 192, 88, 0.12) 21%, rgba(238, 192, 88, 0) 40%), linear-gradient(135deg, #071121 0%, #0D1D36 44%, #142A4C 100%)",
        subtext:
            "Pine Book Publishing partnered with Viktor Ujkic to transform Justice Died at Dawn into a professionally published crime thriller through strategic publishing, professional book development, audience-building initiatives, and long-term brand positioning designed to introduce a new voice to the crime and legal thriller genre.",
        image: `${ASSETS}/Viktor Ujkic Book Mockup 01.png`,
        imageAlt: "Justice Died at Dawn book cover by Viktor Ujkic",
    },
    chips: [
        { label: "Client", value: "Viktor Ujkic" },
        { label: "Book Title", value: "Justice Died at Dawn" },
        { label: "Genre", value: "Crime Thriller / Legal Thriller / Mystery Fiction" },
        { label: "Timeline", value: "12-Month Publishing & Branding Campaign" },
    ],
    author: {
        image: `${ASSETS}/Viktor Ujkic About The Author.png`,
        name: "Viktor Ujkic",
        firstName: "Viktor",
        lastName: "Ujkic",
        bio:
            "Pine Book Publishing partnered with Viktor Ujkic to transform Justice Died at Dawn into a professionally published crime thriller. Through a 12-month publishing and branding campaign, we helped position the book within the crime and legal thriller genre while building visibility, credibility, and a strong foundation for long-term author growth and audience engagement.",
        features: [
            { icon: "★", title: "First-Time Author" },
            { icon: "✦", title: "Crime Thriller / Legal Thriller / Mystery Fiction" },
            { icon: "✎", title: "No Publishing Experience" },
        ],
    },
    challenge: {
        beforeAccent: "Turning a Debut Manuscript into a Market-Ready Crime Thriller",
        paragraphs: [
            "As a debut author entering the highly competitive crime and thriller market, Viktor Ujkic faced the challenge of transforming a compelling manuscript into a professionally published book capable of attracting readers and standing out among established authors. While Justice Died at Dawn delivered a gripping narrative filled with legal intrigue, corruption, suspense, and moral conflict, bringing the story to market required far more than simply completing the manuscript.",
            "The project required professional editorial refinement, industry-standard formatting, cover development, publishing preparation, and strategic positioning to ensure the book met reader expectations within the crime and legal thriller genre. In addition, establishing a strong publishing foundation was essential for maximizing discoverability across major retail platforms while creating a professional presentation capable of competing in today's crowded marketplace.",
            "The goal was not only to publish the book successfully, but to ensure that Justice Died at Dawn was positioned as a polished, professionally produced thriller capable of engaging readers and supporting Viktor Ujkic's long-term growth as an author.",
        ],
        image: `${ASSETS}/Viktor Ujkic the challange image.png`,
    },
    solutions: {
        heading: {
            beforeAccent: "Transforming a Debut Manuscript Into a Published Crime Thriller",
        },
        intro:
            "Pine Book Publishing developed and executed a complete publishing and branding campaign that included:",
        items: [
            {
                icon: "✎",
                title: "Publishing & Production",
                image: `${ASSETS}/Viktor Ujkic Book Mockup 01.png`,
                bullets: [
                    "Editorial Support",
                    "Manuscript Proofreading",
                    "Typesetting & Interior Layout Design",
                    "Publishing Standard Formatting",
                    "Custom Cover Design",
                    "Front, Back & Spine Cover Development",
                    "ISBN & Barcode Registration",
                    "Kindle eBook Publishing",
                    "Paperback Publishing",
                    "Hardcover Publishing",
                    "Amazon KDP Setup & Optimization",
                    "Barnes & Noble Distribution",
                ],
            },
            {
                icon: "✦",
                title: "Branding & Visibility",
                image: `${ASSETS}/Viktor Ujkic the result image.png`,
                bullets: [
                    "Account Creation & Verification",
                    "Account Optimization",
                    "Five Revision Rounds Per Draft",
                    "Publishing Consultation & Project Management",
                    "Multi-Format Book Production",
                    "100% Ownership Rights Retained",
                    "No Royalty Sharing",
                    "Satisfaction-Focused Publishing Process",
                ],
            },
            {
                icon: "❑",
                title: "Website Development",
                image: `${ASSETS}/Viktor Ujkic the result image.png`,
                reverseLayout: true,
                mediaLink: "https://viktorujkiclibrary.com/",
                description:
                    "As part of the publishing campaign, Pine Book Publishing developed a dedicated author website, viktorujkiclibrary.com, to establish a professional online presence and give readers a central destination for information about Justice Died at Dawn and Viktor Ujkic's author journey. Beyond promoting the book, the website strengthened his credibility as an author, improved his visibility beyond online bookstores, and provided a strong foundation for future marketing and publishing efforts.",
            },
            {
                icon: "✈",
                title: "Press Release Distribution",
                pdf: "/viktor-ujkic-press-release.pdf",
                reverseLayout: false,
                description:
                    "As part of the book launch strategy, Pine Book Publishing developed and distributed a professional press release announcing the release of Justice Died at Dawn. The campaign introduced Viktor Ujkic's debut crime thriller to media outlets, journalists, news platforms, and online audiences. Distributed through major newswire channels and media networks, the release helped increase visibility, strengthen the author's credibility, and expand awareness of the book across multiple markets, generating broad media exposure for both the author and the title.",
            },
            {
                icon: "❖",
                title: "Social Media Growth & Audience Engagement",
                image: `${ASSETS}/Viktor Ujkic the challange image.png`,
                reverseLayout: true,
                description:
                    "To strengthen Viktor Ujkic's online presence and increase awareness for Justice Died at Dawn, Pine Book Publishing implemented a targeted social media marketing campaign across Facebook, Instagram, X (Twitter), and Pinterest. Through strategic content creation, audience engagement, and organic growth initiatives, the campaign expanded the book's reach, increased content interactions, and attracted readers interested in crime fiction and legal thrillers — establishing a growing author platform with consistent visibility across multiple channels.",
            },
            {
                icon: "★",
                title: "Amazon Publishing & Distribution",
                image: `${ASSETS}/Viktor Ujkic amazon seller image2.png`,
                mediaClass: "is-raised-media",
                reverseLayout: false,
                description:
                    "Justice Died at Dawn was published and optimized across Amazon Kindle, paperback, and hardcover formats, with wide distribution extended through Barnes & Noble. Strategic account setup and platform optimization maximized discoverability across major retail channels while ensuring Viktor Ujkic retained 100% ownership rights and royalties.",
            },
        ],
    },
    result: {
        heading: {
            beforeAccent: "Building a Foundation for ",
            accent: "Long-Term",
            afterAccent: " Author Growth",
        },
        sections: [
            {
                title: "Campaign Results",
                paragraphs: [
                    "By the conclusion of the 12-month campaign, Viktor Ujkic successfully established a professional publishing foundation for <em>Justice Died at Dawn</em>, supported by strategic publishing, digital branding, media exposure, and audience engagement initiatives. The project delivered a professionally published crime thriller available in multiple formats, expanded online visibility through a dedicated author website, generated media coverage through press release distribution, and achieved measurable growth across Facebook, Instagram, X, and Pinterest.",
                    "Most importantly, the campaign successfully transformed <em>Justice Died at Dawn</em> from a completed manuscript into a professionally published and market-ready crime thriller. Through a combination of editorial development, publishing strategy, platform optimization, social media growth campaigns, and long-term author branding efforts, the project helped introduce Viktor Ujkic to readers while establishing a strong foundation for future publishing success.",
                ],
            },
            {
                title: "The Result",
                paragraphs: [
                    "The success of this campaign demonstrated how professional publishing extends beyond simply releasing a book online.",
                    "Through a carefully structured combination of manuscript development, professional production, platform distribution, digital branding, media exposure, and audience-building strategies, Pine Book Publishing helped position Viktor Ujkic not only as a published author, but as an emerging voice within the crime, mystery, and legal thriller genre. The campaign created the infrastructure needed to support long-term discoverability, reader engagement, and future growth throughout his publishing journey.",
                ],
            },
        ],
        image: `${ASSETS}/Viktor Ujkic Book Mockup 01.png`,
    },
};

export default function ViktorUjkicJustice() {
    return (
        <>
            <Head>
                <title>
                    Justice Died at Dawn – Viktor Ujkic Case Study | Pine Book Publishing
                </title>
                <meta
                    name="description"
                    content="See how Pine Book Publishing helped debut author Viktor Ujkic publish and brand his crime thriller Justice Died at Dawn through strategic publishing, a dedicated author website, and multi-platform audience growth."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
                <link
                    rel="canonical"
                    href="https://www.pinebookpublishing.com/case-studies/viktor-ujkic-justice"
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
