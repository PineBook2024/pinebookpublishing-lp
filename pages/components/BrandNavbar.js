import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="bg-transparent absolute top-10 left-0 w-full flex justify-between items-center p-4 max-w-screen-xl mx-auto">
                <div>
                    <Link href="/" className="text-xl font-bold text-white">
                        <Image src={'/brand-img/logo.png'} width={200} height={80} alt="brand logo" loading="lazy" />
                    </Link>
                </div>
                {/* Toggle Button for Mobile */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
                        aria-label="Toggle navigation"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                </div>
                {/* Navigation Menu */}
                <nav className={`${isOpen ? 'block' : 'hidden'} absolute flex flex-col bg-gray-900 text-center items-center self-end py-8 mt-10 space-y-6 font-semibold w-full right-0 left-0 md:space-y-0 md:flex md:flex-row md:relative md:bg-transparent md:space-x-4 md:mt-0 md:py-0 md:w-auto md:block`}>
                    <ul className="md:flex items-center space-x-4">
                        <li><Link href="/" className="text-white hover:text-gray-300">Home</Link></li>
                        <li><Link href="/about" className="text-white hover:text-gray-300">About Us</Link></li>
                        <li><Link href="/services" className="text-white hover:text-gray-300">Service</Link></li>
                        <li><Link href="/pricing" className="text-white hover:text-gray-300">Pricing</Link></li>
                        <li><Link href="/contact" className="text-white hover:text-gray-300">Contact</Link></li>
                        <li><Link href="/consult" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 brand-nav-btn font-majallab">Talk to Expert</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    );
}