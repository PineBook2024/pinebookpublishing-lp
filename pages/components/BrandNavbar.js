import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle, faPhone, faEnvelope, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BrandNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [serviceDropdown, setServiceDropdown] = useState(true);

    // Function to handle the service dropdown toggle
    const toggleServiceDropdown = () => {
        setServiceDropdown(!serviceDropdown);
    };

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.pageYOffset > navbar.offsetTop) {
                    navbar.classList.add('fixed-top');
                } else {
                    navbar.classList.remove('fixed-top');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleOpenChat = () => {
        window.zE && window.zE('webWidget', 'open');
    };

    return (
        <>
            <header id="navbar" className="bg-transparent absolute top-10 left-0 flex justify-between items-center p-4 z-10">
                <div className='max-w-screen-xl flex justify-between items-center mx-auto w-full mx-auto'>
                    <div>
                        <Link href="/" className="text-xl font-bold text-white">
                            <Image src={'/brand-img/logo.png'} width={200} height={80} alt="brand logo" loading="lazy" />
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
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
                    <nav className={`${isOpen ? 'block' : 'hidden'} absolute flex flex-col bg-gray-900 text-center items-center self-end py-8 mt-2 space-y-6 font-semibold w-full mb-8 top-20 md:top-0 right-0 left-0 md:space-y-0 md:flex md:flex-row md:relative md:bg-transparent md:space-x-4 md:mt-0 md:py-0 md:w-auto md:block`}>
                        <ul className="md:flex items-center space-x-4">
                            <li className='mb-3 md:mb-0'><Link href="/" className="text-white hover:text-gray-300">Home</Link></li>
                            <li className='mb-3 md:mb-0'><Link href="/about" className="text-white hover:text-gray-300">About Us</Link></li>
                            {/* <li onMouseEnter={() => setServiceDropdown(true)} onMouseLeave={() => setServiceDropdown(false)}>
                                <Link href={"/services"} className="cursor-pointer text-white hover:text-gray-300 flex items-center gap-2">
                                    Services  <Image src="/brand-img/down-arrow.png" alt="Open" className='service-dropdown-icon' width={10} height={10} />
                                </Link>
                                {serviceDropdown && (
                                    <div className="absolute mt-1 w-40 bg-white text-black rounded shadow-lg">
                                        <ul className="py-1 text-start px-4 py-2">
                                            <li className='mb-2'><Link href="#">Editing</Link></li>
                                            <li className='mb-2'><Link href="#">Proofreading</Link></li>
                                            <li className='mb-2'><Link href="#">Formatting</Link></li>
                                            <li className='mb-2'><Link href="#">Typesetting & Layout adjustment</Link></li>
                                            <li className='mb-2'><Link href="#">Cover Design</Link></li>
                                            <li className='mb-2'><Link href="#">Publishing</Link></li>
                                        </ul>
                                    </div>
                                )}
                            </li> */}
                            <li className='mb-3 md:mb-0'><Link href="/portfolio" className="text-white hover:text-gray-300">Portfolio</Link></li>
                            {/* <li className='mb-3 md:mb-0'><Link href="/bundles" className="text-white hover:text-gray-300">Bundles</Link></li> */}
                            {/* <li><Link href="/" className="text-white hover:text-gray-300">Pricing</Link></li> */}
                            <li className='mb-3 md:mb-0'><Link href="/contact-us" className="text-white hover:text-gray-300">Contact</Link></li>
                            <li><Link href={'javascript:;'} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 brand-nav-btn font-majallab" onClick={handleOpenChat}>Talk to Expert</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}
