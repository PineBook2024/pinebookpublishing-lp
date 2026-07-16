import React from "react";
import Head from "next/head";
import BrandTopBar from "../components/BrandTopBar";
import BrandNavbar from "../components/BrandNavbar";
import BrandCaseStudies from "../components/BrandCaseStudies";
import BrandFooter from "../components/BrandFooter";

export default function CaseStudiesPage() {
    return (
        <>
            <Head>
                <title>Case Studies | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Explore Pine Book Publishing case studies and author success stories across publishing, branding, and book marketing."
                />
                <link rel="canonical" href="https://pinebookpublishing.com/case-studies" />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>

            <div className="case-studies-listing-page">
                <BrandTopBar />
                <BrandNavbar />
                <BrandCaseStudies />
                <BrandFooter />
            </div>
        </>
    );
}
