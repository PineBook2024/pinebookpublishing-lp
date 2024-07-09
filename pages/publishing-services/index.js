import React, { useEffect, useState, useRef } from "react";
import useHubspotForm from "@/hooks/hubspot";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import CountDown from "../components/CountDown";
import dynamic from 'next/dynamic';
import 'glightbox/dist/css/glightbox.min.css';
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle, faPhone, faEnvelope, faLocationArrow, faLocation, faMapLocation, faLocationDot, faMessage } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Script from 'next/script';
import {
    animate,
    motion,
    useInView,
    useMotionValue,
    useTransform,
    nodeRef,
    rounded,
} from "framer-motion";
import {
    Autoplay,
    Pagination,
    Navigation,
    EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from 'next/navigation';
import BookPublishingLp from "../components/BookPublishingLp";
import Packages from "../components/Packages";
import PublishingOfferPackages from "../components/PublishingOfferPackages";
import Story from "../components/Story";
import BookPublishingLpService from "../components/BookPublishingLpService";

const GLightbox = dynamic(
    () => import('glightbox').then((glightboxModule) => glightboxModule.default),
    { ssr: false }
);
const books = [
    // { id: 1, title: 'Book One', category: 'Fiction', imageUrl: '/brand-img/fiction-1.png' },
    { id: 1, title: 'Book Two', category: 'Fiction', imageUrl: '/brand-img/fiction-2.webp' },
    { id: 2, title: 'Book Three', category: 'Fiction', imageUrl: '/brand-img/fiction-3.webp' },
    { id: 3, title: 'Book Four', category: 'Fiction', imageUrl: '/brand-img/fiction-4.webp' },
    { id: 4, title: 'Book Five', category: 'Fiction', imageUrl: '/brand-img/fiction-5.webp' },
    { id: 5, title: 'Book Six', category: 'Fiction', imageUrl: '/brand-img/fiction-6.webp' },
    { id: 6, title: 'Book Seven', category: 'Fiction', imageUrl: '/brand-img/fiction-7.webp' },
    { id: 7, title: 'Book Eight', category: 'Fiction', imageUrl: '/brand-img/fiction-8.webp' },
    { id: 8, title: 'Book Nine', category: 'Fiction', imageUrl: '/brand-img/fiction-9.webp' },
    { id: 9, title: 'Book Ten', category: 'Fiction', imageUrl: '/brand-img/fiction-10.webp' },
    { id: 10, title: 'Book Eleven', category: 'Fiction', imageUrl: '/brand-img/fiction-11.webp' },
    { id: 11, title: 'Book Thirdteen', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-1.webp' },
    { id: 12, title: 'Book Fourteen', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-2.webp' },
    { id: 13, title: 'Book Fifteen', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-3.webp' },
    { id: 14, title: 'Book Sixteen', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-4.webp' },
    { id: 15, title: 'Book Seventeen', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-5.webp' },
    { id: 16, title: 'Book Eighteen', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-6.webp' },
    { id: 17, title: 'Book Nineteen', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-7.webp' },
    { id: 18, title: 'Book Twenty', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-8.webp' },
    { id: 19, title: 'Book TwentyOne', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-9.webp' },
    { id: 20, title: 'Book TwentyTwo', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-10.webp' },
    { id: 21, title: 'Book TwentyThree', category: 'Fiction', imageUrl: '/brand-img/fiction-12.webp' },
    { id: 22, title: 'Book TwentyFour', category: 'Fiction', imageUrl: '/brand-img/fiction-13.webp' },
    { id: 23, title: 'Book TwentyFive', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-11.webp' },
    { id: 24, title: 'Book TwentySix', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-12.webp' },
];

const tabs = [
    { name: "Book Publishing", icon: '/images/tab-icon-1.webp' },
    { name: "Ghostwriting Service", icon: '/images/tab-icon-2.webp' },
    { name: "Book Marketing", icon: '/images/tab-icon-3.webp' },
    { name: "E-Book", icon: '/images/tab-icon-4.webp' },
    { name: "Book Cover Design", icon: '/images/tab-icon-5.webp' },
    { name: "E-Book Editing", icon: '/images/tab-icon-6.webp' },
];

const steps = [
    { title: "Editing", imgTop: "/images/p-img-top.webp", imgBottom: "/images/p-img-bottom.webp", img: "/images/p-img.webp", img1: "/images/p-img1.webp", icon: "/images/Editing.png" },
    { title: "Proofreading", imgTop: "/images/p-img-top.webp", imgBottom: "/images/p-img-bottom.webp", img: "/images/p-img.webp", img1: "/images/p-img1.webp", icon: "/images/Proofreading.png" },
    { title: "TypeSetting", imgTop: "/images/p-img-top.webp", imgBottom: "/images/p-img-bottom.webp", img: "/images/p-img.webp", img1: "/images/p-img1.webp", icon: "/images/Typesetting & Layout adjustment.png" },
    { title: "Layout Adjustment", imgTop: "/images/p-img-top.webp", imgBottom: "/images/p-img-bottom.webp", img: "/images/p-img.webp", img1: "/images/p-img1.webp", icon: "/images/Typesetting & Layout adjustment.png" },
    { title: "Formatting", imgTop: "/images/p-img-top.webp", imgBottom: "/images/p-img-bottom.webp", img: "/images/p-img.webp", img1: "/images/p-img1.webp", icon: "/images/Formatting.png" },
    { title: "Cover Designing", imgTop: "/images/p-img-top.webp", imgBottom: "/images/p-img-bottom.webp", img: "/images/p-img.webp", img1: "/images/p-img1.webp", icon: "/images/Cover Design.png" },
    { title: "Adjustment", imgTop: "/images/p-img-top.webp", imgBottom: "/images/p-img-bottom.webp", img: "/images/p-img.webp", img1: "/images/p-img1.webp", icon: "/images/Cover Design.png" },
    { title: "Publishing", imgTop: "/images/p-img-top.webp", imgBottom: "/images/p-img-bottom.webp", img: "/images/p-img.webp", img1: "/images/p-img1.webp", icon: "/images/Publishing.png" },
    // ... Add other steps similarly
];

const processItems = [
    { icon: '/images/Editing.png', text: 'Editing' },
    { icon: '/images/Proofreading.png', text: 'Proofreading' },
    { icon: '/images/Typesetting & Layout adjustment.png', text: 'TypeSetting' },
    { icon: '/images/Typesetting & Layout adjustment.png', text: 'Layout Adjustment' },
    { icon: '/images/Formatting.png', text: 'Formatting' },
    { icon: '/images/Cover Design.png', text: 'Cover Designing' },
    { icon: '/images/Cover Design.png', text: 'Adjustment' },
    { icon: '/images/Publishing.png', text: 'Publishing' },
];
export default function PublishingLpNew() {
    const [activeTab, setActiveTab] = useState(0);
    const [activeCategory, setActiveCategory] = useState('Fiction');
    const swiperRef = useRef();
    const swiperRef3 = useRef();
    const router = useRouter();
    const { submitBookPublishingHeaderForm } = useHubspotForm();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [phone, setPhone] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);

    const handleOpenChat = () => {
        window.zE && window.zE('webWidget', 'open');
    };

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex + 1) % steps.length);
        }, 3000); // Change step every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const setters = {
            firstName: setFirstName,
            email: setEmail,
            phone: setPhone,
        };

        console.log(value);

        const setter = setters[name];
        if (setter) {
            setter(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await submitBookPublishingHeaderForm(
            firstName,
            email,
            phone,
        );
        if (response) {
            setShowSuccess(true);
            router.push('/thank-u')
            setTimeout(() => {
                setShowSuccess(false);
                setEmail("");
                setFirstName("");
                setPhone("");
            }, 3000);
        }

        console.log("response", response);
    };

    const filteredBooks = books.filter(book => book.category === activeCategory);

    const lightboxRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined" && !lightboxRef.current) {
            import('glightbox').then((GLightboxModule) => {
                const GLightbox = GLightboxModule.default;
                lightboxRef.current = GLightbox({
                    selector: '.glightbox'
                });
            });
        }

        return () => {
            if (lightboxRef.current) {
                lightboxRef.current.destroy();
            }
        };
    }, []);

    // Object
    const clientLogos = [
        {
            src: "/images/logo-img1.png",
            alt: "LOGO",
            width: 130,
            height: 60
        },
        {
            src: "/images/logo-img2.png",
            alt: "LOGO",
            width: 130,
            height: 60
        },
        {
            src: "/images/logo-img3.png",
            alt: "LOGO",
            width: 130,
            height: 60
        },
        {
            src: "/images/logo-img4.png",
            alt: "LOGO",
            width: 130,
            height: 60
        },
    ];

    const badges = [
        { src: "/images/lp3-brand-logo-1.webp", width: 140, height: 100 },
        { src: "/images/lp3-brand-logo-2.webp", width: 140, height: 100 },
        { src: "/images/lp3-brand-logo-3.webp", width: 140, height: 100 },
        { src: "/images/lp3-brand-logo-4.webp", width: 140, height: 100 },
        { src: "/images/lp3-brand-logo-5.webp", width: 140, height: 100 },
        { src: "/images/lp3-brand-logo-6.webp", width: 140, height: 100 },
        { src: "/images/lp3-brand-logo-7.webp", width: 140, height: 100 },
        { src: "/images/lp3-brand-logo-8.webp", width: 140, height: 100 }
    ];

    function Counter({ from, to, val }) {
        const count = useMotionValue(from);
        const rounded = useTransform(count, (latest) => {
            return Math.round(latest) + val;
        });
        const nodeRef = useRef(null);
        const inView = useInView(nodeRef);

        useEffect(() => {
            if (inView) {
                animate(count, to, { duration: 2 });
            }
        }, [count, inView, to]);
        return (
            <motion.p className="font-poppins text-black" ref={nodeRef}>
                {rounded}
            </motion.p>
        );
    }
    return (
        <>
            <Head>
                <title>Book Publishing Services | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Hire Professional Book Publishing company. At Pine Book Publishing, we provide to comprehensive book publishing services. Your Trusted Book Writing Partners In The USA And Canada."
                />
               <meta name="google-site-verification" content="v2pKJGIZnMWCWw2QC5nuRPYT5gvDQlUtT0lZYFIhHYo" />
                <link rel="shortcut icon" href="/images/fav.png" />

                {/* Google tag Manager Script */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-9X52J8V8NK"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-9X52J8V8NK');
              `,
                    }}
                />
            </Head>
            <BookPublishingLpService isOpen={isOpen} setIsOpen={setIsOpen}/>
            <header className="py-2 new-lp-header">
                <div className="flex items-center justify-between px-2 flex-wrap md:justify-strat max-w-screen-xl mx-auto">
                    <div className="head-logo">
                        <Link className="text-center" href="/publishing-services">
                            <Image alt="LOGO" src={'/brand-img/logo.webp'} width={200} height={80} loading="lazy" />
                        </Link>
                    </div>

                    <div className="flex items-center justify-end flex-col md:flex-row gap-3 flex-col-reverse">
                        {/* <button className=" btn-a items-center bg-gray-800 md:py-2 py-4 mr-2 px-3 focus:outline-none hover:bg-gray-700">
                            <Link className="" href={'tel:8668417469'}>(866)-841-7469</Link>
                        </button>

                        <button className=" hidden btn-a items-center bg-gray-800 mr-2 md:py-2 py-4 px-3 focus:outline-none hover:bg-gray-700 md:block">
                            <Link className="" href={'mailto:info@pinebookpublishing.com'}>info@pinebookpublishing.com</Link>
                        </button> */}
                        <Link className="text-white flex" href={'tel:8668417469'}><FontAwesomeIcon icon={faPhone} className="me-3" color="#fff" width={20} /><span>(866)-841-7469</span></Link>

                        <button className="items-center md:py-2 py-4 px-3 get-started" onClick={handleOpenChat}>
                            <Link className="font-poppins" href="#" >Talk to an Expert</Link>
                        </button>
                    </div>
                </div>
            </header>
            <section className="new-lp3-banner-section relative">
                <Image alt="LOGO" src={'/brand-img/book1.webp'} className="lp3-banner-left-side-book" width={200} height={80} loading="lazy" />
                <Image alt="LOGO" src={'/brand-img/book2.webp'} className="lp3-banner-right-side-book" width={200} height={80} loading="lazy" />
                <div className="max-w-screen-xl mx-auto pt-20">
                    <div>
                        <div className="mb-4 new-lp3-why-choose-us-title">
                            <h3 className="mb-5">Are you trying to find a publishing house for books?
                            </h3>
                            <h1 className="font-poppins text-3xl md:text-4xl font-bold mb-5">
                                Providing Top Book Publishers to <br></br>Authors to Help Them Succeed
                            </h1>
                            <h2 className="font-poppins text-md md:text-md mt-3">Put your trust in our team of expert book publishers from the top book publishing<br></br> houses to deliver a flawless publication experience meant to boost the sales of your book.</h2>
                            <div>
                                <ul className="banner-features lp3-banner-list flex flex-col lg:flex-row mt-8 gap-6 justify-center">
                                    <li>publication by professionals
                                    </li>
                                    <li>More than 10,000 Publishing Platforms.
                                    </li>
                                </ul>
                                <ul className="banner-features lp3-banner-list flex flex-col lg:flex-row mt-3 gap-6 justify-center mb-10">
                                    <li>Author advice.
                                    </li>
                                    <li className="last">Fast turnaround time.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="new-lp-banner-form-wrapper">
                            <form className="flex justify-center flex-col lg:flex-row new-lp-banner-form gap-4" onSubmit={handleSubmit}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="firstName"
                                        onChange={handleChange}
                                        value={firstName}
                                        required
                                        className="pl-4 pr-4 py-2 border rounded-lg w-full text-md text-black"
                                        placeholder="Enter your Name"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        value={email}
                                        name="email"
                                        required
                                        className="pl-4 pr-4 py-2 border rounded-lg w-full text-md text-black"
                                        placeholder="Enter your Email"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="phone"
                                        onChange={handleChange}
                                        value={phone}
                                        required
                                        className="pl-4 pr-4 py-2 border rounded-lg w-full text-md text-black"
                                        placeholder="Enter your Phone"
                                    />
                                </div>

                                <button
                                    className=" new-lp-header-submit-btn font-poppins"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                            <div className="block">
                                {showSuccess && (
                                    <p className="px-1 py-2 text-white text-start">
                                        Form submitted Successfully!
                                    </p>
                                )}
                            </div>

                        </div>
                        <div>
                            <div className="flex justify-center items-center mt-8 gap-2 md:gap-x-8 client-logo-sec">
                                {clientLogos.map((logo, index) => (
                                    <Link key={index} href="#">
                                        <Image
                                            alt={logo.alt}
                                            src={logo.src}
                                            width={logo.width}
                                            height={logo.height}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand Logos */}
            <div className="max-w-screen-xl mx-auto bages-pic flex flex-wrap items-center justify-center py-10 gap-x-32">
                <Swiper
                    className=""
                    spaceBetween={15}
                    slidesPerView={6}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    modules={[Navigation, Autoplay, Pagination]}
                    breakpoints={{
                        "@0.00": {
                            slidesPerView: 3,
                            spaceBetween: 10,
                            navigation: false,
                            pagination: false
                        },
                        "@1.00": {
                            slidesPerView: 6,
                            spaceBetween: 15,
                        },
                    }}
                >
                    {badges.map((badge, index) => (
                        <SwiperSlide key={index} className="mx-auto text-center">
                            <div className="flex justify-center items-center">
                                <Image src={badge.src} width={badge.width} height={badge.height} loading="lazy" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* tabs section */}

            <section className="new-lp3-tabs-section max-w-screen-xl mx-auto mt-5">
                <div className="text-center new-lp3-why-choose-us-title">
                    <h2 className=" text-3xl text-black uppercase font-bold">What Takes Place?
                    </h2>
                    <p className="mt-3 text-gray-600">To assist authors in releasing their books, Book Writing Verse provides an extensive array of book publishing options.With ten years of experience, our self-book publishing specialists are dedicated to exceeding all of your expectations.</p>
                </div>
                <div className=" p-8 tabs">
                    <div className="">
                        {/* {tabs.map((tab, index) => (
                            <button
                                key={index}
                                className={`tab-btn px-4 py-2 rounded flex flex-col items-center space-x-2 space-y-2 ${activeTab === index ? 'active' : 'in-active'}`}
                                onClick={() => setActiveTab(index)}
                            >
                                <Image src={tab.icon} alt="icons" width={70} height={70} />
                                <span>{tab.name}</span>
                            </button>
                        ))} */}
                        <Swiper
                            className=""
                            spaceBetween={15}
                            slidesPerView={6}
                            loop={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            modules={[Navigation, Autoplay, Pagination]}
                            breakpoints={{
                                "@0.00": {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                    navigation: false,
                                    pagination: false
                                },
                                "@1.00": {
                                    slidesPerView: 6,
                                    spaceBetween: 15,
                                },
                            }}
                        >
                            {tabs.map((tab, index) => (
                                <SwiperSlide key={index}>
                                    <button
                                        className={`tab-btn px-4 py-2 rounded flex flex-col items-center space-x-2 space-y-2 ${activeTab === index ? 'active' : 'in-active'}`}
                                        onClick={() => setActiveTab(index)}
                                    >
                                        <Image src={tab.icon} alt="icons" width={70} height={70} />
                                        <span>{tab.name}</span>
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>




                    {activeTab === 0 && (
                        <div className="flex flex-col lg:flex-row md:flex-row mt-10">
                            <div className="basis-1/2">
                                <Image src={"/images/About-us-img.png"} width={500} height={570}
                                    loading="lazy"
                                    alt="about img"
                                />
                            </div>
                            <div className="basis-1/2">
                                <div className="mb-4 new-lp3-why-choose-us-title">
                                    <h2 className="font-poppins text-2xl md:text-3xl font-bold mb-5">
                                        Publish Your Writing and Make Your Dream Come True.
                                    </h2>
                                    <p className="font-poppins text-md md:text-md mt-3">We have established ourselves as one of the top providers of book publishing services because to our quality. We guarantee that the quality of your book is exceptional. Allow us to assist you in realizing your ambition of releasing your own book on Amazon.
                                    </p>
                                    <ul className="banner-features lp3-banner-list flex flex-col lg:flex-row mt-8 gap-6 justify-start">
                                        <li>Book Formatting & Design
                                        </li>
                                        <li>Production & Printing
                                        </li>

                                    </ul>
                                    <ul className="banner-features lp3-banner-list flex flex-col lg:flex-row mt-3 gap-6 justify-start mb-10">
                                        <li>Independent Publishing
                                        </li>
                                        <li className="last">Author Assistance
                                        </li>
                                    </ul>
                                    <section className="tab-one-content flex flex-col lg:flex-row justify-between items-start max-w-screen-xl mx-auto">
                                        <div className="flex items-start justify-center gap-4">
                                            <div className="icon">
                                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="#fff" stroke-width="1.7" />
                                                </svg>
                                            </div>
                                            <div className="content">
                                                <h3>Chat With Us</h3>
                                                <p>Let's Talk</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center gap-4">
                                            <div className="icon">
                                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <div className="content">
                                                <h3>Call Now</h3>
                                                <p>(866)-841-7469</p>
                                            </div>
                                        </div>
                                        <div className="get-quote-btn">
                                            <button onClick={() => setIsOpen(true)}>REQUEST QUOTE</button>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 1 && (
                        <div>
                        </div>
                    )}
                    {activeTab === 2 && (
                        <div>
                        </div>
                    )}
                    {activeTab === 3 && (
                        <div>
                        </div>
                    )}
                    {activeTab === 4 && (
                        <div>
                        </div>
                    )}
                    {activeTab === 5 && (
                        <div>
                        </div>
                    )}
                </div>
            </section>

            {/* Portfolio section  */}
            <section className="brand-portfolio-books new-lp-portfolio py-12">
                <div className="max-w-screen-xl mx-auto ">
                    <div className="text-center mb-6">
                        {/* <h3 className="text-2xl text-black font-poppins">Get your Book</h3> */}
                        <h2 className=" text-4xl text-black uppercase font-poppins font-bold">We Have Assisted Thousands Of Authors <br></br> To Publish Their Book</h2>
                        <p className="mt-3 text-gray-600">The convenience of having a versatile team with multiple sets of skills has allowed us to expand into <br></br> various genres and fulfil the Publishing needs of clients across different industries and professions.</p>
                    </div>
                    <div className="flex space-x-4 justify-center mb-12">
                        {['Fiction', 'Non-Fiction'].map(category => (
                            <button
                                key={category}
                                className={`px-4 py-2 font-poppins rounded-lg ${activeCategory === category ? 'active' : 'in-active'}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {filteredBooks.map(book => (
                            <div key={book.id} className="border">
                                <Link href={book.imageUrl} className="">
                                    <img src={book.imageUrl} alt={book.title} className="w-full h-100 glightbox" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CAT section  */}
            <section className="new-lp3-cta-sec new-lp-about-book flex flex-col lg:flex-row justify-between items-center max-w-screen-xl mx-auto my-10">
                <div className="text-start new-lp3-why-choose-us-title">
                    <h2 className=" text-3xl text-black uppercase font-bold">Publish Your Own Book
                    </h2>
                    <p className="mt-3 text-gray-600">Don't put off telling the world about your tale for much<br></br> longer. We make it inexpensive and simple.</p>
                </div>
                <div className="flex gap-10">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                        <div className="icon">
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="#fff" stroke-width="1.7" />
                            </svg>
                        </div>
                        <div className="content" onClick={handleOpenChat}>
                            <h3>Chat With Us</h3>
                            <p>Let's Talk</p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                        <div className="icon">
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className="content">
                            <h3>Call Now</h3>
                            <p><Link className="" href={'tel:8668417469'}>(866)-841-7469</Link></p>
                        </div>
                    </div>
                </div>
                <div className="get-quote-btn">
                    <button onClick={() => setIsOpen(true)}>REQUEST QUOTE</button>
                </div>
            </section>

            {/* Our Process  */}

            {/* <section className="my-7 py-20 overflow-hidden">
                <div className="text-center mb-6 new-lp3-why-choose-us-title">
                    <h2 className=" text-4xl text-black uppercase font-bold">Our Process: From Concept to Perfection</h2>
                </div>
                <div className="new-lp3-process-wrapper">
                    <div class="process-item">
                        <h3>Idea Sharing</h3>
                        <div>
                            <Image src={"/images/p-1.webp"} width={40} height={40} />
                            <Image className="p-img" src={"/images/p-img-top.webp"} width={130} height={130} />
                            <Image src={"/images/p-img.webp"} width={130} height={130} />
                            <Image src={"/images/p-img1.webp"} width={130} height={130} />
                        </div>
                    </div>
                    <div class="process-item">
                        <h3>Idea Sharing</h3>
                        <div>
                            <Image src={"/images/p-1.webp"} width={40} height={40} />
                            <Image className="p-img" src={"/images/p-img-bottom.webp"} width={130} height={130} />
                            <Image src={"/images/p-img.webp"} width={130} height={130} />
                            <Image src={"/images/p-img1.webp"} width={130} height={130} />
                        </div>
                    </div>
                    <div class="process-item">
                        <h3>Idea Sharing</h3>
                        <div>
                            <Image src={"/images/p-1.webp"} width={40} height={40} />
                            <Image className="p-img" src={"/images/p-img-top.webp"} width={130} height={130} />
                            <Image src={"/images/p-img.webp"} width={130} height={130} />
                            <Image src={"/images/p-img1.webp"} width={130} height={130} />
                        </div>
                    </div>
                    <div class="process-item">
                        <h3>Idea Sharing</h3>
                        <div>
                            <Image src={"/images/p-1.webp"} width={40} height={40} />
                            <Image className="p-img" src={"/images/p-img-bottom.webp"} width={130} height={130} />
                            <Image src={"/images/p-img.webp"} width={130} height={130} />
                            <Image src={"/images/p-img1.webp"} width={130} height={130} />
                        </div>
                    </div>
                    <div class="process-item">
                        <h3>Idea Sharing</h3>
                        <div>
                            <Image src={"/images/p-1.webp"} width={40} height={40} />
                            <Image className="p-img" src={"/images/p-img-top.webp"} width={130} height={130} />
                            <Image src={"/images/p-img.webp"} width={130} height={130} />
                            <Image src={"/images/p-img1.webp"} width={130} height={130} />
                        </div>
                    </div>
                    <div class="process-item">
                        <h3>Idea Sharing</h3>
                        <div>
                            <Image src={"/images/p-1.webp"} width={40} height={40} />
                            <Image className="p-img" src={"/images/p-img-bottom.webp"} width={130} height={130} />
                            <Image src={"/images/p-img.webp"} width={130} height={130} />
                            <Image src={"/images/p-img1.webp"} width={130} height={130} />
                        </div>
                    </div>
                    <div class="process-item">
                        <h3>Idea Sharing</h3>
                        <div>
                            <Image src={"/images/p-1.webp"} width={40} height={40} />
                            <Image className="p-img" src={"/images/p-img-top.webp"} width={130} height={130} />
                            <Image src={"/images/p-img.webp"} width={130} height={130} />
                            <Image src={"/images/p-img1.webp"} width={130} height={130} />
                        </div>
                    </div>
                    <div class="process-item">
                        <h3>Idea Sharing</h3>
                        <div>
                            <Image src={"/images/p-1.webp"} width={40} height={40} />
                            <Image className="p-img" src={"/images/p-img-top.webp"} width={130} height={130} />
                            <Image src={"/images/p-img.webp"} width={130} height={130} />
                            <Image src={"/images/p-img1.webp"} width={130} height={130} />
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="my-7 py-20 overflow-hidden">
                <div className="text-center mb-6 new-lp3-why-choose-us-title">
                    <h2 className="text-3xl text-black uppercase font-bold">Our Process: From Concept to Perfection</h2>
                </div>
                <div className="lg:block md:block hidden">
                    <div className="new-lp3-process-wrapper max-w-screen-xl mx-auto">
                        {steps.map((step, index) => (
                            <div key={index} className={`process-item ${index === activeIndex ? 'active' : ''}`}>
                                <h3>{step.title}</h3>
                                <div>
                                    <Image src={step.icon} width={40} height={40} alt="icon" />
                                    <Image className="p-img" src={index % 2 === 0 ? step.imgTop : step.imgBottom} width={130} height={130} alt="process" />
                                    <Image src={step.img} width={130} height={130} alt="process" />
                                    <Image src={step.img1} width={130} height={130} alt="process" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:hidden md:hidden block">
                    <div className="new-lp3-process-wrapper max-w-screen-xl mx-auto">
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            loop={true}
                        >
                            {processItems.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className='process-item-mob'>
                                        <img src={item.icon} height={40} width={40} alt="icon" />
                                        <h3 className="text-black text-2xl mt-3">{item.text}</h3>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

            </section>

            {/* Why choose Us */}
            <section className="my-7">
                <div className="text-center mb-6 new-lp3-why-choose-us-title">
                    <h2 className=" text-3xl text-black uppercase font-bold">Why Opt for Us?
                    </h2>
                    <p className="mt-3 text-gray-600">To assist authors in releasing their books, Book Writing Verse providesan extensive array of book publishing options.<br></br> With ten years of experience, our self-book publishing specialists are dedicated to exceeding all of your expectations.
                    </p>
                </div>
            </section>
            <section className="new-lp3-why-choose-us new-lp-about-book flex flex-col lg:flex-row justify-center items-start pb-24 max-w-screen-xl mx-auto gap-6 md:gap-32 lg:px-0 px-5">
                <div className="basis-1/2">
                    <div className="flex items-center gap-5 mb-3">
                        <div className="new-lp3-why-choose-us-number">
                            01
                        </div>
                        <div className="new-lp3-why-choose-us-title">
                            <h4 className="text-2xl">Full Ownership</h4>
                            <p>You are the sole owner. We exert all of our effort. With our professional assistance with book publishing, you acquire everything.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 mb-3">
                        <div className="new-lp3-why-choose-us-number">
                            02
                        </div>
                        <div className="new-lp3-why-choose-us-title">
                            <h4 className="text-2xl">Cost-effectiveness
                            </h4>
                            <p>Being perfectionists, we are adamant that your life savings shouldn't be sacrificed for excellence. Our professional book publishing online services are unparalleled, and our pricing are reasonable.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 mb-3">
                        <div className="new-lp3-why-choose-us-number">
                            03
                        </div>
                        <div className="new-lp3-why-choose-us-title">
                            <h4 className="text-2xl">Fast Delivery
                            </h4>
                            <p>Our excellent work not only meets your requirements, but we also adhere to all deadlines with professional book publishing assistance because we recognize that time is money.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 mb-3">
                        <div className="new-lp3-why-choose-us-number">
                            04
                        </div>
                        <div className="new-lp3-why-choose-us-title">
                            <h4 className="text-2xl">Contentment of the Client</h4>
                            <p>Since customer satisfaction is the most important aspect of any organization, it is our top concern. We have consistently demonstrated that we never sacrifice the caliber and standards of our work.</p>
                        </div>
                    </div>

                </div>
                <div className="basis-1/2 mt-24 flex gap-6">
                    <div className="w-full">
                        <div className="new-lp3-why-choose-us-counter-box rounded-lg bg-white py-8 px-5 text-center content-center" >
                            <h2>
                                <Counter from={0} to={500} val={"+"} />
                            </h2>
                            <span className="text-sm text-white mt-3">Books Published</span>
                        </div>
                        <div className="new-lp3-why-choose-us-counter-box rounded-lg bg-white py-8 px-5 text-center content-center mt-5" >
                            <h2>
                                <Counter from={0} to={50} val={"+"} />
                            </h2>
                            <span className="text-sm text-white">Publishing Experts</span>
                        </div>
                    </div>
                    <div className="w-full mt-5">
                        <div className="new-lp3-why-choose-us-counter-box rounded-lg bg-white py-8 px-5 text-center content-center" >
                            <h2>
                                <Counter from={0} to={12} val={"+"} />
                            </h2>
                            <span className="text-sm text-white">Year of Experience</span>
                        </div>
                        <div className="new-lp3-why-choose-us-counter-box rounded-lg bg-white py-8 px-5 text-center content-center mt-5" >
                            <h2>
                                <Counter from={0} to={99} val={"+"} />
                            </h2>
                            <span className="text-sm text-white">Satisfaction Rate</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CAT section  */}
            <section className="new-lp3-cta-sec new-lp-about-book flex flex-col lg:flex-row justify-between items-center max-w-screen-xl mx-auto mb-10">
                <div className="text-start new-lp3-why-choose-us-title">
                    <h2 className=" text-3xl text-black uppercase font-bold">Publish Your Own Book
                    </h2>
                    <p className="mt-3 text-gray-600">Don't put off telling the world about your tale for<br></br> much longer. We make it inexpensive and simple.</p>
                </div>
                <div className="flex gap-10">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                        <div className="icon">
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="#fff" stroke-width="1.7" />
                            </svg>
                        </div>
                        <div className="content" onClick={handleOpenChat}>
                            <h3>Chat With Us</h3>
                            <p>Let's Talk</p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                        <div className="icon">
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className="content">
                            <h3>Call Now</h3>
                            <p><Link className="" href={'tel:8668417469'}>(866)-841-7469</Link></p>
                        </div>
                    </div>
                </div>

                <div className="get-quote-btn">
                    <button onClick={() => setIsOpen(true)}>REQUEST QUOTE</button>
                </div>
            </section>

            {/* Testimonial section  */}
            <Story />
            {/* <section className="new-lp3-testimonials new-lp-about-book max-w-screen-xl mx-auto my-16 overflow-hidden">
                <div className="text-center new-lp3-why-choose-us-title">
                    <h2 className=" text-3xl text-black uppercase font-bold">What Our Clients Say
                    </h2>
                    <p className="mt-3 text-gray-600">We have been in the industry for a long period, allowing us to gather a bunch of customers who praise our work. Don’t just believe it, read it yourself.</p>
                </div>
                <div className="mt-10 relative">
                    <Swiper
                        // className="px-20 gap-x-32"
                        spaceBetween={15}
                        slidesPerView={2}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={false}
                        onBeforeInit={(swiper) => {
                            swiperRef3.current = swiper;
                        }}
                        modules={[Navigation, Autoplay, Pagination]}
                        breakpoints={{
                            "@0.00": {
                                slidesPerView: 1,
                                spaceBetween: 10,
                                navigation: {
                                    enabled: false,
                                },
                                pagination: false,
                                navigation: true,
                            },
                            "@1.00": {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <div className="card flex justify-center flex-col items-center text-center">
                                <Image src={"/images/testimonial-img1.png"} alt="icons" width={70} height={70} />
                                <h3 className="mt-4">Lara Simmons</h3>
                                <p className="text-white">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card flex justify-center flex-col items-center text-center">
                                <Image src={"/images/testimonial-img1.png"} alt="icons" width={70} height={70} />
                                <h3 className="mt-4">Lara Simmons</h3>
                                <p className="text-white">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card flex justify-center flex-col items-center text-center">
                                <Image src={"/images/testimonial-img1.png"} alt="icons" width={70} height={70} />
                                <h3 className="mt-4">Lara Simmons</h3>
                                <p className="text-white">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.</p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <div className="bk-sil prev cursor-pointer" onClick={() => swiperRef3.current?.slidePrev()}><FontAwesomeIcon icon={faArrowLeft} /></div>
                    <div className="bk-sil next cursor-pointer" onClick={() => swiperRef3.current?.slideNext()}><FontAwesomeIcon icon={faArrowRight} /></div>
                </div>
            </section > */}

            {/* Footer  */}

            <footer className="text-white body-font new-lp3-footer pt-12 pb-4">
                <div className="container pt-10 pb-10 md:pt-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col position-relative">
                    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center justify-center">
                        <div className="">
                            <h3 className="mb-6">We Would Love To Hear From You
                            </h3>
                            <div className="flex justify-center">
                                <form className="flex justify-center flex-col new-lp-banner-form gap-4" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-0 lg:mb-4">
                                        <input
                                            type="text"
                                            name="firstName"
                                            onChange={handleChange}
                                            value={firstName}
                                            required
                                            className="pl-4 pr-4 py-2 border rounded-lg w-full text-md text-black"
                                            placeholder="Enter your Name"
                                        />
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            value={email}
                                            name="email"
                                            required
                                            className="pl-4 pr-4 py-2 border rounded-lg w-full text-md text-black"
                                            placeholder="Enter your Email"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input
                                            type="text"
                                            name="phone"
                                            onChange={handleChange}
                                            value={phone}
                                            required
                                            className="pl-4 pr-4 py-2 border rounded-lg w-full text-md text-black"
                                            placeholder="Enter your Phone"
                                        />


                                        <button
                                            className=" new-lp-header-submit-btn font-poppins border-white border-2"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                                <div className="block">
                                    {showSuccess && (
                                        <p className="px-1 py-2 text-white text-start">
                                            Form submitted Successfully!
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 md:w-1/3 w-full px-4">
                            <div className="flex items-start justify-start gap-4">
                                <div className="icon">
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <div className="content">
                                    <h3>Call Now</h3>
                                    <p className="mt-2">
                                        <Link
                                            href="tel:8668417469"
                                            className="text-white text-md hover:text-white flex justify-center md:justify-start"
                                        >
                                            (866) 841-7469
                                        </Link>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start justify-start gap-4 mt-8">
                                <div className="icon">
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 8L17.4392 9.97822C15.454 11.0811 14.4614 11.6326 13.4102 11.8488C12.4798 12.0401 11.5202 12.0401 10.5898 11.8488C9.53864 11.6326 8.54603 11.0811 6.5608 9.97822L3 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <div className="content">
                                    <h3>Mail Us</h3>
                                    <p className="mt-2">
                                        <Link
                                            href="mailto:support@pinebookpublishing.com"
                                            className="text-white hover:text-white text-md flex justify-center md:justify-start"
                                        >
                                            {" "}
                                            support@pinebookpublishing.com{" "}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start justify-start gap-4 mt-8">
                                <div className="icon">
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <div className="content">
                                    <h3>Find Us</h3>
                                    <p className="mt-2">USA ADDRESS: 211 E 43rd St, 7th Floor, Suite #424, New York City, NY 10017
                                    </p>
                                    <p className="mt-2">CANADA ADDRESS: R-10225 Yonge St, Suite #250, Richmond Hill, ON L4C 3B2</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="pt-20">
                    <div className="container text-center mx-auto px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-white w-full md:text-center text-sm sm:text-left">
                            Copyright © 2024 |
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
                                Privacy Policy {" "}
                            </Link>

                        </p>

                    </div>
                </div>
            </footer>

        </>
    );
}
