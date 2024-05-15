import React, { useEffect } from "react";
import Footer from "./components/Footer";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";

export default function Home() {
    return (

        <>
            <Head>
                <title>Thank You | Pine Book Writing</title>
                <meta
                    name="description"
                    content=""
                />
                <meta name="google-site-verification" content="v2pKJGIZnMWCWw2QC5nuRPYT5gvDQlUtT0lZYFIhHYo" />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <section>
                <div className="flex items-center justify-center py-28">
                    <div>
                        <div className="flex flex-col items-center space-y-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h1 className="text-4xl font-bold">Thank You !</h1>
                            <p>Thank you for your interest!</p>
                            <Link href={'/'}
                                className="inline-flex items-center px-4 py-2 header-submit-btn border border-indigo-300 rounded rounded-full hover:text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                                <span className="text-sm font-medium">
                                    Home
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}