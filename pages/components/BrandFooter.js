import Link from "next/link";
import Image from "next/image";
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BrandFooter() {

    return (
        <>
            <footer className="text-white body-font">
                <div className="container px-5 pt-10 pb-10 md:pt-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col position-relative">
                    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center justify-center">
                        <div className="lg:w-1/3 md:w-1/4 w-full px-4">
                            <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                                <Image src={"/images/f-logo.png"} width={250} height={200}></Image>
                            </a>
                            <p className="mt-2 text-sm text-white">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            </p>
                            <nav className="list-none mb-10 mt-5">
                                <li>
                                    <Link
                                        href="tel:8668417469"
                                        className="text-white text-xl hover:text-white font-majallab flex justify-center md:justify-start"
                                    >
                                        <FontAwesomeIcon icon={faPhone} className="me-3" />
                                        (866) 841-7469
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    <Link
                                        href="mailto:info@pinebookpublishing.com"
                                        className="text-white hover:text-white font-majallab text-2xl md:text-2xl flex justify-center md:justify-start"
                                    >
                                        <FontAwesomeIcon icon={faEnvelope} className="me-3" />
                                        {" "}
                                        info@pinebookpublishing.com{" "}
                                    </Link>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/4 w-full px-4">
                            <h2 className="title-font text-white tracking-widest text-2xl md:text-3xl mb-3 font-majallab font-bold	">
                                Pages
                            </h2>
                            <nav className="list-none mb-10 mt-5">
                                <li>
                                    <Link href="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="mt-3">
                                    About Us
                                </li>
                                <li className="mt-3">
                                    Services
                                </li>
                                <li className="mt-3">
                                    Testimonials
                                </li>
                                <li className="mt-3">
                                    Contact Us
                                </li>
                            </nav>
                        </div>

                        <div className="lg:w-1/3 md:w-1/4 w-full px-4">
                            <h2 className="title-font text-white tracking-widest text-2xl md:text-3xl mb-3 font-majallab font-bold	">
                                Services
                            </h2>
                            <nav className="list-none mb-10 mt-5">
                                <li>
                                    Editing
                                </li>
                                <li className="mt-3">
                                    Proofreading
                                </li>
                                <li className="mt-3">
                                    Formatting
                                </li>
                                <li className="mt-3">
                                    Typesetting & Layout adjustment
                                </li>
                                <li className="mt-3">
                                    Cover Design
                                </li>
                                <li className="mt-3">
                                    Publishing
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="copyright-sec">
                    <div className="container text-center mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-white w-full md:text-start text-sm sm:text-left md:ml-36">
                            <Link
                                href="/privacy-policy"
                                rel="noopener noreferrer"
                                className="text-white ml-1"
                                target="_blank"
                            >
                                <b>Privacy Policy</b>
                            </Link>
                            {" "}
                            /
                            <Link
                                href="/terms-and-conditions"
                                rel="noopener noreferrer"
                                className="text-white ml-1"
                                target="_blank"
                            >
                                <b>Terms & Conditions</b>
                            </Link>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}