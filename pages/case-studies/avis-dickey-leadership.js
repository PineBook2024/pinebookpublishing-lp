import React from "react";
import Head from "next/head";
import BrandTopBar from "../components/BrandTopBar";
import BrandNavbar from "../components/BrandNavbar";
import BrandContact from "../components/BrandContactForm";
import BrandFooter from "../components/BrandFooter";
import CaseStudyDetail from "../components/CaseStudyDetail";

const caseData = {
    accentColor: "#1AA49F",
    altAccentColor: "#AC9974",
    hero: {
        beforeAccent: "From Executive Insights to a Multi-Platform Leadership Brand ",

        afterAccent: "",
        subtext:
            "Pine Book Publishing partnered with Dr. Avis D. Dickey to transform Stellar Leadership: Igniting Excellence Beyond the C-Suite into a professionally published leadership brand through Amazon Best Seller campaigns, Times Square exposure, social media growth strategies, influencer marketing, and international visibility initiatives.",
        image: "/brand-img/Avis Deskey Book Mockup 01.png",
        imageAlt: "Stellar Leadership book cover by Dr. Avis D. Dickey",
    },
    chips: [
        { label: "Client", value: "Dr. Avis D. Dickey" },
        { label: "Genre", value: "Leadership / Business / Executive Development" },
        { label: "Timeline", value: "12-Month Publishing & Branding Campaign" },
        { label: "Book Format", value: "Kindle eBook / Paperback / Hardcover" },
    ],
    author: {
        image: "/brand-img/Avis Deskey Book Mockup 01 image.jpg",
        name: "Dr. Avis D. Dickey",
        firstName: "Dr. Avis D.",
        lastName: "Dickey",
        bio:
            "Dr. Avis D. Dickey partnered with Pine Book Publishing for a 12-month writing, publishing, and branding campaign centred on her leadership book, Stellar Leadership: Igniting Excellence Beyond the C-Suite. The project was developed across Kindle eBook, paperback, and hardcover formats with the goal of transforming the book into a recognizable leadership brand while positioning Dr. Avis D. Dickey as a credible voice in the business and executive leadership space.",
        features: [
            { icon: "★", title: "First-Time Author" },
            { icon: "✦", title: "	Leadership / Business / Executive Development" },
            { icon: "✎", title: "	No Publishing Experience" },
        ],
    },
    challenge: {
        beforeAccent: "Building an Executive Author Brand",
        // accent: "Editorial Work",
        // afterAccent: " Was Not.",
        paragraphs: [
            "Before partnering with Pine Book Publishing, Dr. Avis D. Dickey had a professionally written manuscript with strong leadership insights but lacked the publishing strategy, branding structure, media visibility, and audience positioning needed to compete in the highly competitive leadership and business category.",
            "The project required more than publishing support. It required a complete branding and visibility strategy capable of building authority, increasing discoverability, generating engagement, and creating a recognizable leadership presence across multiple platforms.",
            "The goal was not simply to launch a book online. The goal was to establish Dr. Avis D. Dickey as a growing leadership authority within today’s evolving business environment.",
        ],
        image: "/brand-img/Avis Deskey the challange image.png",
    },
    solutions: {
        heading: {
            beforeAccent: "Transforming a Leadership Book Into a Recognizable Brand",
            // accent: "Pine Book Publishing ",
            // afterAccent: "Took the Memoir From Draft to Published",
        },
        intro:
            "Pine Book Publishing developed and executed a multi-phase publishing and branding campaign that included:",
        items: [
            {
                icon: "✎",
                title: "Publishing & Production",
                image: "/brand-img/Avis Deskey Book Mockup 01.png",
                bullets: [
                    "Manuscript editing & proofreading",
                    "Professional formatting & typesetting",
                    "Custom cover design",
                    "Kindle eBook publishing",
                    "Paperback publishing",
                    "Hardcover publishing",
                    "Amazon KDP setup & optimization",
                    "ISBN registration",
                ],
            },
            {
                icon: "✦",
                title: "Branding & Visibility",
                image: "/brand-img/Avis Deskey  Header Image 01.jpg",
                bullets: [
                    "Author branding strategy",
                    "Website development",
                    "Press release distribution",
                    "Times Square billboard campaign",
                    "Social media marketing campaigns",
                    "Influencer video marketing",
                    "Amazon Best Seller campaign strategy",
                    "London Book Fair feature campaign",
                ],
            },
            {
                icon: "❑",
                title: "Website & Brand Development",
                image: "/brand-img/Avis Deskey the result image.png",
                description:
                    "Built avisdickey.com as the central branding hub — a leadership-focused platform with dedicated book sales pages, promotional media integration, author positioning, and audience engagement features designed for long-term authority, not just a standard author site.",
            },
            {
                icon: "★",
                title: "Amazon Best Seller Success",
                image: "/brand-img/Avis-Deskey-amazon-seller-image.png",
                description:
                    "Two #1 Best Seller rankings in Business Ethics on the Kindle Store (January and April 2026), #1 in Business Ethics (Books), #10 in Business Communication Skills, a Top #1,500 overall Kindle ranking, and a sustained 4.4-star customer rating across campaign periods.",
            },
            {
                icon: "▤",
                title: "NYC Times Square Campaign",
                video: "/brand-img/videos/avis-billboard.webm",
                rowClass: "cs-row-mb",
                description:
                    "As part of the executive branding strategy, Pine Book Publishing launched a Times Square billboard campaign for Dr. Avis D. Dickey on January 14, 2026. The campaign positioned Stellar Leadership: Igniting Excellence Beyond the C- Suite within one of the world’s most recognizable advertising locations, helping elevate the visibility and professional positioning of both the book and the author. The campaign included branded billboard placements, professionally designed promotional creatives, campaign videos, and leadership - focused advertising assets developed to strengthen public recognition, audience engagement, and overall brand authority. Rather than functioning as a standalone promotion, the Times Square campaign was strategically integrated into the broader publishing and branding initiative.",
            },
            {
                icon: "✈",
                title: "Press Release Campaign",
                pdf: "/brand-img/press-release-pdf.pdf",
                description:
                    "A large-scale EIN Presswire campaign secured placement across 125+ media and publishing platforms, with Google News, Bing, and Yahoo indexing, AP News exposure, and syndication through major media affiliates — strengthening online discoverability and leadership credibility.",
            },
            {
                icon: "❖",
                title: "Social Media Growth",
                image: "/brand-img/Avis-Deskey-growth.png",
                description:
                    "Facebook delivered 12.6K+ views, 8.6K interactions, and 4.5K profile visits. Instagram reached 7.2K with 5.6K+ views and 2.6K+ interactions. X generated 9.5K+ impressions and 1,870 engagements. Pinterest added branded leadership visuals that drove further visibility.",
            },
            {
                icon: "▶",
                title: "Influencer Marketing",
                image: "/brand-img/marketing-influencer.png",
                mediaClass: "is-compact-media",
                mediaLink: "https://www.linkedin.com/feed/update/urn:li:activity:7428148989247754240",
                description:
                    "Branded promotional reels, influencer-driven engagement content, and leadership-focused messaging modernized the promotional strategy — strengthening audience familiarity with Dr. Avis D. Dickey and Stellar Leadership while building a more recognizable digital brand presence.",
            },
            {
                icon: "✧",
                title: "London Book Fair Feature",
                image: "/brand-img/Avis-Deskey-london.png",
                description:
                    "Stellar Leadership was featured at the London Book Fair, positioning the book in front of publishing professionals, literary audiences, distributors, business readers, and global publishing networks — adding international visibility and reinforcing the author's leadership authority.",
            },
        ],
    },
    result: {
        heading: {
            beforeAccent: "Building a Lasting Leadership ",
            accent: "Brand ",
            afterAccent: "Presence",
        },
        sections: [
            {
                title: "Campaign Results",
                paragraphs: [
                    "By the conclusion of the campaign, Dr. Avis D. Dickey successfully achieved two separate Amazon Best Seller rankings, multiple #1 category placements, expanded international visibility, measurable social media growth, multi-platform audience engagement, ongoing sales and royalty generation, media platform exposure, Times Square promotional visibility, and long-term branding infrastructure capable of supporting future growth and recognition.",
                    "Most importantly, the campaign successfully transformed <em>Stellar Leadership: Igniting Excellence Beyond the C-Suite</em> from a professionally written manuscript into a recognizable leadership brand supported by strategic publishing, audience engagement, media visibility, social growth campaigns, influencer marketing, and long-term digital discoverability initiatives.",
                ],
            },
            {
                title: "The Result",
                paragraphs: [
                    "The success of this campaign demonstrated how modern publishing extends far beyond simply releasing a book online.",
                    "Through a carefully structured combination of publishing strategy, branding development, media visibility, platform optimization, influencer marketing, social engagement, and executive positioning, Pine Book Publishing helped establish Dr. Avis D. Dickey not only as a published author, but as a growing leadership authority within today’s competitive business and executive development space.",
                ],
            },
        ],
        image: "/brand-img/Avis-Deskey-the-result.png",
    },
    review: {
        image: "/brand-img/Avis Deskey Book Mockup 01 image.jpg",
        name: "Dr. Avis D. Dickey",
        firstName: "Dr. Avis D. ",
        lastName: "Dickey",
        quote:
            "My experience with the Pine Book Publishing team has been phenomenal!  They are insightful and have paid close attention to details. They have been very responsive on this journey in publishing and marketing my very first book. ",
        link: "https://ca.trustpilot.com/reviews/698670388fb9fc1fd1c093e3",
        linkLabel: "Read on Trustpilot",
    },
};

export default function AvisDickeyLeadership() {
    return (
        <>
            <Head>
                <title>
                    Stellar Leadership – Dr. Avis D. Dickey Case Study | Pine Book Publishing
                </title>
                <meta
                    name="description"
                    content="See how Pine Book Publishing transformed Dr. Avis D. Dickey's Stellar Leadership into a multi-platform leadership brand through publishing, branding, and marketing campaigns."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
                <link
                    rel="canonical"
                    href="https://www.pinebookpublishing.com/case-studies/avis-dickey-leadership"
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












