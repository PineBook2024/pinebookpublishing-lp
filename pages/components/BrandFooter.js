import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle, faPhone, faEnvelope, faLocationArrow, faLocation, faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import WhatsAppChat from "./WhatsAppChat";

export default function BrandFooter() {
    const [isVisible, setIsVisible] = useState(false);

    // Function to toggle visibility based on scroll position
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Function to scroll to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);


    return (
        <>
            <footer className="text-white body-font brand-footer">
                <div className="container px-5 pt-10 pb-10 md:pt-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col position-relative">
                    <div className="flex-grow flex flex-wrap -mb-10 md:mt-0 mt-10 md:text-left text-center justify-evenly py-10">
                        <div className="lg:w-1/3 md:w-1/4 w-full px-4 widget-2 relative">
                            <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                                <Image src={"/brand-img/PBP-logo.gif"} width={250} height={200}></Image>
                            </a>
                            <p className="mt-2 text-sm text-white leading-7 px-4">
                                Pine Book Publishing is a team of passionate book publishers that believe in the power of storytelling and the importance of writers' ability to tell their tales. Our streamlined process and dedicated support make book publishing service a realistic and rewarding goal for any author.
                            </p>
                            {/* <nav className="list-none mb-10 mt-5">
                                <li>
                                    <Link
                                        href="tel:8668417469"
                                        className="text-white text-sm hover:text-white font-poppins flex justify-center md:justify-start"
                                    >
                                        <FontAwesomeIcon icon={faPhone} className="me-3" />
                                        (888) 786-7135
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link
                                        href="mailto:support@pinebookpublishing.com"
                                        className="text-white hover:text-white font-poppins text-sm flex justify-center md:justify-start"
                                    >
                                        <FontAwesomeIcon icon={faEnvelope} className="me-3" />
                                        {" "}
                                        support@pinebookpublishing.com{" "}
                                    </Link>
                                </li>
                            </nav> */}
                        </div>
                        <div className="lg:w-1/5 md:w-1/5 w-full px-4 widget-2 relative">
                            <h2 className="title-font text-white tracking-widest text-2xl md:text-2xl mb-3 font-poppins font-bold	">
                                Quick Links
                            </h2>
                            <nav className="list-none mb-10 mt-5">
                                <li>
                                    <Link href="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href="/about" onClick={(e) => { e.preventDefault(); window.location.href = "/about"; }}>
                                        About Us
                                    </Link>
                                </li>
                                {/* <li className="mt-3">
                                    Services
                                </li> */}
                                <li className="mt-3">
                                    <Link href="/testimonials" onClick={(e) => { e.preventDefault(); window.location.href = "/testimonials"; }}>
                                        Testimonials
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href="/packages" onClick={(e) => { e.preventDefault(); window.location.href = "/packages"; }}>
                                        Packages
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href="/portfolio" onClick={(e) => { e.preventDefault(); window.location.href = "/portfolio"; }}>
                                        Portfolio
                                    </Link>
                                </li>
                                {/* <li className="mt-3">
                                    Testimonials
                                </li> */}
                                <li className="mt-3">
                                    <Link href="/blog" onClick={(e) => { e.preventDefault(); window.location.href = "/blog"; }}>
                                        Blog
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href="/contact-us" onClick={(e) => { e.preventDefault(); window.location.href = "/contact-us"; }}>
                                        Contact Us
                                    </Link>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/5 md:w-1/5 w-full px-4 widget-2 relative">
                            <h2 className="title-font text-white tracking-widest text-2xl md:text-2xl mb-3 font-poppins font-bold	">
                                Services
                            </h2>
                            <nav className="list-none mb-10 mt-5">
                                <li>
                                    <Link href="/book-publishing" onClick={(e) => { e.preventDefault(); window.location.href = "/book-publishing"; }}>
                                        Book Publishing
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href="/book-editing" onClick={(e) => { e.preventDefault(); window.location.href = "/book-editing"; }}>
                                        Book Editing
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href="/proofreading" onClick={(e) => { e.preventDefault(); window.location.href = "/proofreading"; }}>
                                        Proofreading
                                    </Link>
                                </li>
                                {/* <li className="mt-3">
                                    Services
                                </li> */}
                                <li className="mt-3">
                                    <Link href="/book-formatting" onClick={(e) => { e.preventDefault(); window.location.href = "/book-formatting"; }}>
                                        Book Formatting
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href="/typesetting-layout-adjustment" onClick={(e) => { e.preventDefault(); window.location.href = "/typesetting-layout-adjustment"; }}>
                                        Typesetting & Layout
                                    </Link>
                                </li>

                                {/* <li className="mt-3">
                                    Testimonials
                                </li> */}
                                <li className="mt-3">
                                    <Link href="/print-on-demand" onClick={(e) => { e.preventDefault(); window.location.href = "/print-on-demand"; }}>
                                        Print On Demand
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href="/document-processing" onClick={(e) => { e.preventDefault(); window.location.href = "/document-processing"; }}>
                                        Document Processing
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href="/audio-book" onClick={(e) => { e.preventDefault(); window.location.href = "/audio-book"; }}>
                                        Audio Book
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href="/isbn-and-barcode" onClick={(e) => { e.preventDefault(); window.location.href = "/isbn-and-barcode"; }}>
                                        ISBN & Barcode
                                    </Link>
                                </li>
                            </nav>
                        </div>


                        <div className="lg:w-1/4 md:w-1/4 w-full px-4 widget-3 relative">
                            <h2 className="title-font text-white tracking-widest text-2xl md:text-2xl mb-3 font-poppins font-bold	">
                                Contact Info
                            </h2>
                            <Link
                                href="tel:8887867135"
                                className="text-white text-sm hover:text-white font-poppins flex justify-center md:justify-start mb-5"
                            >
                                <FontAwesomeIcon icon={faPhone} className="me-3" />
                                Sales: (888) 786-7135
                            </Link>
                            <Link
                                href="tel:(866) 841-7469"
                                className="text-white text-sm hover:text-white font-poppins flex justify-center md:justify-start mb-5"
                            >
                                <FontAwesomeIcon icon={faPhone} className="me-3" />
                                Support: (866) 841-7469
                            </Link>
                            <Link
                                href="mailto:support@pinebookpublishing.com"
                                className="text-white hover:text-white font-poppins text-sm flex justify-center md:justify-start mb-5"
                            >
                                <FontAwesomeIcon icon={faEnvelope} className="me-3" />
                                {" "}
                                support@pinebookpublishing.com{" "}
                            </Link>
                            <h4 className="text-white leading-20 font-bold text-xl md:text-md font-poppins text-center lg:text-start uppercase">
                                Canada Address:
                            </h4>
                            <p className="text-white mb-5"> R-10225 Yonge St, Suite #250, Richmond Hill, ON L4C 3B2</p>
                            <h4 className="text-white leading-20 font-bold text-xl md:text-md font-poppins text-center lg:text-start uppercase">
                                USA Address:
                            </h4>
                            <p className="text-white mb-5">211 E 43rd St, 7th Floor, Suite #424, New York City, NY 10017</p>
                            {/* <div>
                                <Link href="https://www.facebook.com/pinebookwriting0" target="_blank">
                                    <FontAwesomeIcon icon={faFacebook} className="me-3" />
                                </Link>
                                <Link href="https://www.instagram.com/pinebookwriting/" target="_blank">
                                    <FontAwesomeIcon icon={faInstagram} className="me-3" />
                                </Link>
                                <Link href="https://x.com/pinebookwriting" target="_blank">
                                    <FontAwesomeIcon icon={faXTwitter} className="me-3" />
                                </Link>
                                <Link href="https://www.youtube.com/@Pinebookwriting" target="_blank">
                                    <FontAwesomeIcon icon={faYoutube} className="me-3" />
                                </Link>
                            </div> */}
                            {/* <nav className="list-none mb-10 mt-5">
                                <li>
                                    <Link href="/book-editing" onClick={(e) => { e.preventDefault(); window.location.href = "/book-editing"; }}>
                                        Book Editing
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href="/proofreading" onClick={(e) => { e.preventDefault(); window.location.href = "/proofreading"; }}>
                                        Proofreading
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href={'javascript:;'}>
                                        Book Formatting
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href={'javascript:;'}>
                                        Typesetting & Layout
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href="/book-publishing" onClick={(e) => { e.preventDefault(); window.location.href = "/book-publishing"; }}>
                                        Book Publishing
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href={'javascript:;'}>
                                        Audio Book
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href={'javascript:;'}>
                                        Print on Demand
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link href={'javascript:;'}>
                                        Document Processing
                                    </Link>
                                </li>
                            </nav> */}
                        </div>
                    </div>

                </div>
                <div className="copyright-sec">
                    <div className="container text-center mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-white w-full md:text-center text-sm sm:text-left">
                            Copyright © 2025 |
                            <Link
                                href="/terms-and-conditions"
                                rel="noopener noreferrer"
                                className="text-white ml-1"
                                target="_blank"
                            >
                                Terms & Conditions |
                            </Link>
                            
                            <Link
                                href="/privacy-policy"
                                rel="noopener noreferrer"
                                className="text-white ml-1"
                                target="_blank"
                            >
                                Privacy Policy | {" "}
                            </Link>
                            Powered by <span className="powered-by-text"><Link href="https://www.pinebookwriting.com/" target="_blank">Pine Book Writing Inc.</Link></span>
                        </p>
                    </div>
                </div>
            </footer>

            <div>
                {isVisible && (
                    <button onClick={scrollToTop} className="responsive-back-to-top" style={{
                        position: 'fixed',
                        bottom: '29px',
                        right: '120px',
                        height: '40px',
                        width: '40px',
                        textAlign: 'center',
                        backgroundColor: '#fff',
                        color: '#000',
                        borderRadius: '50%',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        boxShadow: '0 0px 5px #191b42',
                        border: '1px solid #288e7f',
                        zIndex: 9999999999,
                    }}>
                        <Image src={"/brand-img/top-arrow.png"} width={15} height={15}></Image>
                    </button>
                )}
            </div>
            {/* <WhatsAppChat /> */}
            <div id="fixed-social">
                <div>
                    <a href="https://www.facebook.com/pinebookwriting0" class="fixed-facebook" target="_blank"><FontAwesomeIcon icon={faFacebook} color="#316FF6" width={20} /> <span>Facebook</span></a>
                </div>
                <div>
                    <a href="https://www.linkedin.com/company/pine-book-writing-inc" className="fixed-facebook"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" class="svg-inline--fa fa-linkedin text-blue-600" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg></a>
                </div>
                <div>
                    <a href="https://x.com/pinebookwriting" class="fixed-twitter" target="_blank"> <FontAwesomeIcon icon={faXTwitter} color="#14171A" width={20} /><span>Twitter</span></a>
                </div>
                <div>
                    <a href="https://www.instagram.com/pinebookwriting/" class="fixed-instagrem" target="_blank"><Image src={"/brand-img/insta-icon.png"} width={30} height={30}></Image><span>Instagram</span></a>
                </div>
                <div>
                    <a href="https://www.youtube.com/@Pinebookwriting" class="fixed-tumblr" target="_blank"><FontAwesomeIcon icon={faYoutube} color="#FF0000" width={20} /><span>Youtube</span></a>
                </div>
            </div>
        </>
    );
}