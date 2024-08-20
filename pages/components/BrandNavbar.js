import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { faArrowRight, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BrandNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [serviceDropdown, setServiceDropdown] = useState(false);
    const [hoveredService, setHoveredService] = useState(1);

    const services = [
        { name: 'Book Editing', href: '/book-editing', icon: '/brand-img/service-icon1.png', image: '/brand-img/service-img1.webp' },
        { name: 'Proofreading', href: '/proofreading', icon: '/brand-img/service-icon2.png', image: '/brand-img/service-img2.webp' },
        { name: 'Book Formatting', href: '/book-formatting', icon: '/brand-img/service-icon3.png', image: '/brand-img/service-img3.webp' },
        { name: 'Typesetting & Layout', href: '/typesetting-layout-adjustment', icon: '/brand-img/service-icon4.png', image: '/brand-img/service-img4.webp' },
        { name: 'Book Publishing', href: '/book-publishing', icon: '/brand-img/service-icon6.png', image: '/brand-img/service-img6.webp' },
        // { name: 'Audio Book', href: '/audio-book', icon: faArrowRight, image: '/brand-img/audio-book-icon.webp' },
        { name: 'Print On Demand', href: '/print-on-demand', icon: '/brand-img/Printing Icon.png', image: '/brand-img/Print on Demand.jpg' },
        // { name: 'Document Processing', href: '/document-processing', icon: '/brand-img/service-icon1.png', image: '/brand-img/service-img6.webp' },
    ];

    // Function to handle the service dropdown toggle
    const toggleServiceDropdown = () => {
        setServiceDropdown(!serviceDropdown);
    };

    const openServiceDropdown = () => {
        setServiceDropdown(true);
    };

    const closeServiceDropdown = () => {
        setServiceDropdown(false);
        setHoveredService(null);
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
                            <Image src={'/brand-img/logo.webp'} width={200} height={80} alt="brand logo" loading="lazy" />
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
                            <li className='mb-3 md:mb-0'><Link href="/" onClick={(e) => { e.preventDefault(); window.location.href = "/"; }} className="text-white hover:text-gray-300">Home</Link></li>
                            <li className='mb-3 md:mb-0'><Link href="/about" onClick={(e) => { e.preventDefault(); window.location.href = "/about"; }} className="text-white hover:text-gray-300">About Us</Link></li>
                            {/* <li className='mb-3 md:mb-0'><Link href="/services" onClick={(e) => { e.preventDefault(); window.location.href = "/services"; }} className="text-white hover:text-gray-300">Services</Link></li> */}
                            <li
                                // onMouseEnter={openServiceDropdown}
                                // onMouseLeave={closeServiceDropdown}
                                onClick={toggleServiceDropdown}
                            // className="relative"
                            >
                                <div className='flex items-center gap-2'>
                                    <Link href="/services" className="cursor-pointer text-white hover:text-gray-300 flex items-center gap-2">
                                        Services
                                    </Link>
                                    <Image src="/brand-img/down-arrow.png" alt="Open" className='service-dropdown-icon cursor-pointer' width={10} height={10} />
                                </div>

                                {serviceDropdown && (
                                    <div className="absolute mt-1 w-full bg-white text-black rounded shadow-lg brand-custom-dropdown-menu flex justify-between">
                                        <ul className="py-1 text-start px-4 py-2">
                                            {services.map((service, index) => (
                                                <li
                                                    key={index}
                                                    className='mb-3 flex items-center'
                                                    onMouseEnter={() => setHoveredService(index)}
                                                    onMouseLeave={() => setHoveredService(null)}
                                                >
                                                    <Link href={service.href} className='flex items-center w-full'>
                                                        {typeof service.icon === 'string' ? (
                                                            <Image src={service.icon} className="me-3" width={16} height={16} alt={service.name} />
                                                        ) : (
                                                            <FontAwesomeIcon icon={service.icon} className="me-3" width={12} />
                                                        )}
                                                        {service.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex-shrink-0">
                                            {hoveredService !== null && (
                                                <Image
                                                    src={services[hoveredService].image}
                                                    alt={services[hoveredService].name}
                                                    className='h-full w-full object-cover nav-link-hover-img rounded shadow-lg'
                                                    width={160}
                                                    height={160}
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </li>
                            <li className='mb-3 md:mb-0'><Link href="/packages" onClick={(e) => { e.preventDefault(); window.location.href = "/testimonials"; }} className="text-white hover:text-gray-300">Testimonials</Link></li>
                            <li className='mb-3 md:mb-0'><Link href="/packages" onClick={(e) => { e.preventDefault(); window.location.href = "/packages"; }} className="text-white hover:text-gray-300">Packages</Link></li>
                            <li className='mb-3 md:mb-0'><Link href="/portfolio" onClick={(e) => { e.preventDefault(); window.location.href = "/portfolio"; }} className="text-white hover:text-gray-300">Portfolio</Link></li>
                            <li className='mb-3 md:mb-0'><Link href="/contact-us" onClick={(e) => { e.preventDefault(); window.location.href = "/contact-us"; }} className="text-white hover:text-gray-300">Contact</Link></li>
                            <li><Link href={'javascript:;'} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 brand-nav-btn font-poppins text-sm" onClick={handleOpenChat}>Talk to an Expert</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}
