import React, { useEffect, useState, useRef } from "react";
import useHubspotForm from "@/hooks/hubspot";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import CountDown from "../components/CountDown";
import dynamic from 'next/dynamic';
import 'glightbox/dist/css/glightbox.min.css';
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle, faPhone, faEnvelope, faLocationArrow, faLocation, faMapLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

export default function Lp() {
    const [activeCategory, setActiveCategory] = useState('Fiction');
    const swiperRef = useRef();
    const router = useRouter();
    const { submitBookPublishingServiceForm } = useHubspotForm();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [phone, setPhone] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [phoneError, setPhoneError] = useState("");

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);

    const handleOpenChat = () => {
        window.zE && window.zE('webWidget', 'open');
    };

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
            if (name === 'phone') {
                const phoneRegex = /^\d{0,10}$/;
                if (phoneRegex.test(value)) {
                    setter(value);
                    setPhoneError("");
                } else {
                    setPhoneError("Phone number must be exactly 10 digits");
                }
            } else {
                setter(value);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (phone.length !== 10) {
            setPhoneError("Phone number must be exactly 10 digits");
            return;
          }
        const response = await submitBookPublishingServiceForm(
            firstName,
            email,
            phone,
        );
        if (response) {
            setShowSuccess(true);
            router.push('/thank-you-page')
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

    // Object
    const aboutLogos = [
        {
            href: "https://goo.gl/maps/D6kJBoXBJYwcZWkP7",
            src: "/images/s1.png",
            alt: "LOGO",
            width: 130,
            height: 60
        },
        {
            href: "https://www.bbb.org/ca/on/richmond-hill/profile/publishers-book/pine-book-writing-inc-0107-1406919",
            src: "/images/s2.png",
            alt: "LOGO",
            width: 130,
            height: 60
        },
        {
            href: "https://www.trustpilot.com/review/pinebookwriting.com",
            src: "/images/s3.png",
            alt: "LOGO",
            width: 130,
            height: 60
        },
        {
            href: "https://www.yelp.com/biz/pine-book-writing-richmond-hill",
            src: "/images/s4.png",
            alt: "LOGO",
            width: 130,
            height: 60
        },
        {
            href: "https://clutch.co/profile/pine-book-writing",
            src: "/images/s6.png",
            alt: "LOGO",
            width: 130,
            height: 60
        }
    ];


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
            <BookPublishingLp isOpen={isOpen} setIsOpen={setIsOpen} />
            <header className="py-2 new-lp-header">
                <div className="flex items-center justify-between px-2 flex-wrap md:justify-strat max-w-screen-xl mx-auto">
                    <div className="head-logo">
                        <Link className="text-center" href="/publishing-offer">
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

                        <button className="items-center md:py-2 py-4 px-3 get-started">
                            <Link className="font-poppins" href={'javascript:;'} onClick={handleOpenChat}>Talk to an Expert</Link>
                        </button>
                    </div>
                </div>
            </header>
            <section className="new-lp-banner">
                <div className="max-w-screen-xl mx-auto pt-20">
                    <div>
                        <div className="mb-4">
                            <CountDown />
                            <h1 className="font-poppins text-4xl md:text-5xl font-bold">
                                PUBLISH YOUR BOOK AND GET NOTICED!
                            </h1>
                            <h2 className="font-poppins text-xl md:text-2xl font-bold mt-3">Hire Experts from Pine Book Publishing at <span className="powered-by-text">50% Discount.</span></h2>
                            <ul className="banner-features flex flex-col lg:flex-row mt-8 gap-6 justify-center">
                                <li className="first"><i className="fa fa-check" aria-hidden="true"></i>93% Client Retention Rate</li>
                                <li><i className="fa fa-check" aria-hidden="true"></i>2.5K+ books published</li>
                                <li><i className="fa fa-check" aria-hidden="true"></i>100% Satisfaction Guaranteed </li>
                                <li className="last"><i className="fa fa-check" aria-hidden="true"></i>Industry-Leading Publishers.</li>
                            </ul>
                        </div>
                        <div className="flex gap-5 justify-center mt-5">
                            <Link href={'javascript:;'} className="new-lp-banner-btn font-poppins" onClick={() => setIsOpen(true)}>ACTIVATE YOUR COUPON</Link>
                            <Link href={'javascript:;'} className="new-lp-banner-btn new-lp-banner-btn-chat font-poppins" onClick={handleOpenChat}>CHAT NOW TO GET 50% OFF</Link>
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
                                    <Link key={index} href={'javascript:;'}>
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

            <section className="new-lp-banner-btm flex flex-col lg:flex-row justify-center items-center">
                <div className="basis-1/2 box box-1 flex items-center justify-center gap-4 w-100">
                    <Image alt="LOGO" src={'/images/dollar.png'} width={40} height={80} loading="lazy" />
                    <h6>Affordable Prices</h6>
                </div>
                <div className="basis-1/2 box box-2 flex items-center justify-center gap-4">
                    <Image alt="LOGO" src={'/images/count.png'} width={40} height={80} loading="lazy" />
                    <h6>Quickest Turnaround Time </h6>
                </div>
                <div className="basis-1/2 box box-3 flex items-center justify-center gap-4">
                    <Image alt="LOGO" src={'/images/phone.png'} width={40} height={80} loading="lazy" />
                    <h6 className="">24/7 Professional Support</h6>
                </div>
            </section>


            <section className="new-lp-about-book flex flex-col lg:flex-row justify-center items-start py-24 max-w-screen-xl mx-auto gap-6 md:gap-32 lg:px-0 px-5">
                <div className="basis-1/2">
                    <h3 className="font-poppins text-3xl md:text-4xl font-bold mb-4">PEOPLE OF THE WORLD ARE EAGER TO READ YOUR BOOK</h3>
                    <p className="mb-4">As said, every significant advancement begins with a fascinating work of imagination, at Pine Book Publishing, we will do that for you: we will take that step forward. There is no story that should go unnoticed. Therefore, we offer you a range of services of the most skilled and innovative writers, editors & publishers in the industry, all in a single place.</p>
                    <p>We have published thousands of successful books – from writing, editing, design, and production. Most of the books we have published for our clients have grabbed a lot of attention in the sphere of literature and are among the best sellers. Through Pine Book Publishing, your ideas will be put on paper by none other than the best. Our team can assist you in writing & publishing your story, be it in the fiction or nonfiction genre.</p>
                    <Link href={'javascript:;'} className="btn mt-6 font-poppins" onClick={() => setIsOpen(true)}>LET'S GET STARTED</Link>
                </div>
                <div className="basis-1/2 mt-24">
                    <ul>
                        <li class="first"><i class="fa fa-check" aria-hidden="true"></i> Fiction</li>
                        <li><i class="fa fa-check" aria-hidden="true"></i> Non-Fiction</li>
                        <li><i class="fa fa-check" aria-hidden="true"></i> Biography</li>
                        <li><i class="fa fa-check" aria-hidden="true"></i> Informative</li>
                        <li><i class="fa fa-check" aria-hidden="true"></i> Autobiography</li>
                        <li><i class="fa fa-check" aria-hidden="true"></i> Memoirs</li>
                        <li><i class="fa fa-check" aria-hidden="true"></i> Action &amp; Adventure</li>
                        <li><i class="fa fa-check" aria-hidden="true"></i> Western</li>
                        <li><i class="fa fa-check" aria-hidden="true"></i> Anthology</li>
                        <li class="last"><i class="fa fa-check" aria-hidden="true"></i> Romance</li>
                    </ul>

                    <div className="flex justify-center items-center mt-28 gap-2 md:gap-x-8 logos">
                        {aboutLogos.map((logo, index) => (
                            <Link key={index} href={logo.href} target="_blank">
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
            </section>

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

            <PublishingOfferPackages />

            <section className="py-12 overflow-hidden">
                <div className="max-w-screen-xl mx-auto ">
                    <div className="text-center mb-6">
                        <h2 className=" text-3xl text-black uppercase font-poppins font-bold">Our book publishing services are available at a premium <br></br> to help you meet your publishing needs.</h2>
                        <div className="flex justify-center items-center pt-12">
                            <Image alt="LOGO" src={'/images/features-img.jpg'} width={900} height={900} loading="lazy" data-aos="fade-left" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="new-lp-cta-sec">
                <div className="flex justify-center flex-col lg:flex-row items-start  max-w-screen-xl mx-auto gap-6 lg:px-0 px-5">
                    <div className="basis-1/2 flex justify-center">
                        <Image alt="LOGO" src={'/brand-img/cta-book.webp'} width={440} height={440} loading="lazy" data-aos="fade-right" />
                    </div>
                    <div className="basis-1/2 mt-12">
                        <h4>Don't worry, we will assist you to publish your book that could become a next bestseller.</h4>
                        <h3 className="font-poppins text-3xl md:text-5xl font-bold mb-4 mt-4">Get your best seller published at <span>50% </span>OFF</h3>
                        <div className="flex items-start">
                            <FontAwesomeIcon icon={faEnvelope} className="me-3 mt-1" />
                            <div>
                                <p>
                                    DISCUSS YOUR IDEAS
                                </p>
                                <Link href="maito:support@pinebookpublishing.com">support@pinebookpublishing.com</Link>
                            </div>
                        </div>
                        <Link href={'javascript:;'} className="new-lp-banner-btn new-lp-banner-btn-chat font-poppins" onClick={() => setIsOpen(true)}>ACTIVATE COUPON NOW</Link>
                    </div>
                </div>
            </section>
            <section className="new-lp-testimonials new-lp-about-book flex flex-col lg:flex-row justify-center items-start py-24 max-w-screen-xl mx-auto gap-6 md:gap-32 relative lg:px-0 px-5">
                <div className="w-full lg:w-6/12 content">
                    <h3 className="font-poppins text-3xl md:text-4xl font-bold mb-4 mt-5">We are proud of our esteemed clients’ list, which proves our commitment.</h3>
                    <p className="mb-4 text-gray-600">This is what we have been doing for decades and that’s why our company is one of the leading publishers in the market.</p>
                </div>
                <div className="w-full lg:w-7/12">
                    <Swiper
                        // className="px-20 gap-x-32"
                        spaceBetween={15}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={false}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        modules={[Navigation, Autoplay, Pagination]}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                                navigation: {
                                    enabled: false,
                                },
                                pagination: true,
                            },
                            1000: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <div className="brand-testimonials-card relative">
                                <Link href="https://www.trustpilot.com/reviews/65e634c30515c28c7a696898" target="_blank">
                                    <div className="flex justify-between items-center mb-5">
                                        <Image src="/brand-img/stars.png" width={90} height={100} alt="Stars" />
                                        <div className="flex items-center relative left-2">
                                            <FontAwesomeIcon icon={faLocationDot} color="#fff" className="me-2" width={20} />
                                            <span className="text-white">US</span>
                                        </div>
                                    </div>
                                    <h2 className="font-poppins text-xl">They care about your work and your dream.</h2>
                                    <p className="mb-5 pt-2">Finally a publisher that cares about your work instead of how much money you have. This has to be one of the smoothest processes in my life. They were very attentive to my vision and treated my work with care. I’ll be using them again they earned every cent.</p>
                                    <span className="absolute bottom-0 mb-2">Angel Raices, Mar 4, 2024</span>
                                </Link>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="brand-testimonials-card relative aos-animate">
                                <Link href={"https://www.trustpilot.com/reviews/65cfa55b11cc649a184c90bb"} target="_blank">
                                    <div className="flex justify-between items-center mb-5">
                                        <Image src={"/brand-img/stars.png"} width={90} height={100}></Image>
                                        <div className="flex items-center relative left-2">
                                            <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
                                            <span className="text-white">US</span>
                                        </div>
                                    </div>
                                    <h2 className="font-poppins text-xl">Good Work on Publishing</h2>
                                    <p className="mb-5 pt-2">Pine Book Writing did a good job on printing and delivering copies of my book of poetry written in Russian. They did it expeditiously and in promised time, actually, a bit faster. The quality of the paper used and printing was quite adequate. Ryan Peters, the publication manager, was very approachable, friendly, and quick to reply to my requests and questions. Dealing with Damon, the owner, was a good experience as well.</p>
                                    <span className="absolute bottom-0 mb-2">Fima, Feb 16, 2024</span>
                                </Link>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="brand-testimonials-card relative aos-animate">
                                <Link href={"https://www.trustpilot.com/reviews/65b05e047f36b28f2c54c185"} target="_blank">
                                    <div className="flex justify-between items-center mb-5">
                                        <Image src={"/brand-img/stars.png"} width={90} height={100}></Image>
                                        <div className="flex items-center relative left-2">
                                            <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
                                            <span className="text-white">US</span>
                                        </div>
                                    </div>
                                    <h2 className="font-poppins text-xl ">Pine Book Writers A+</h2>
                                    <p className="mb-5 pt-2">Steve, Ryan & the team has been helpful getting my book together. The whole team is easy to work with. Steve is great, at explaining the packages and the steps moving forward, so you can accomplish your goal. They’re also very responsive with any questions you may have. I can definitely see myself having a long time partnership with Pine. I spoke with the owner Damon, very nice guy, he has passion for this line of work. If you’re looking for a company that can help with self publishing , marketing & promotion. Pine Book Writers is definitely the company you want & need.</p>
                                    <span className="absolute bottom-0 mb-2">Re-G Wade, Jan 23, 2024</span>
                                </Link>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="brand-testimonials-card relative aos-animate">
                                <Link href={"https://www.trustpilot.com/users/64ed33d046ee6200126f1c6c"} target="_blank">
                                    <div className="flex justify-between items-center mb-5">
                                        <Image src={"/brand-img/stars.png"} width={90} height={100}></Image>
                                        <div className="flex items-center relative left-2">
                                            <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
                                            <span className="text-white">US</span>
                                        </div>
                                    </div>
                                    <h2 className="font-poppins text-xl ">Pine books and their associates are…</h2>
                                    <p className="mb-5 pt-2">Pine books and their associates are excellent. Everyone is helpful and care about you, your ideas, and how hard you've worked with your manuscript. Steve, Lia, Ryan, and David go beyond their job. They deserve a raise. I recommend Pine books for all your writing needs.</p>
                                    <span className="absolute bottom-0 mb-2">Katie Loftis, Dec 7, 2023</span>
                                </Link>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="brand-testimonials-card relative aos-animate" >
                                <Link href={"https://www.trustpilot.com/users/655d16952309f20012b30090"} target="_blank">
                                    <div className="flex justify-between items-center mb-5">
                                        <Image src={"/brand-img/stars.png"} width={90} height={100}></Image>
                                        <div className="flex items-center relative left-2">
                                            <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
                                            <span className="text-white">US</span>
                                        </div>
                                    </div>
                                    <h2 className="font-poppins text-xl ">Awesome Publishing Company</h2>
                                    <p className="mb-5 pt-2">The team at Pine Book Writing are the best!!!! They were so professional and friendly throughout the entire process. I "LOVE" the outcome of my book and I look forward to working with them again on my next project.</p>
                                    <span className="absolute bottom-0 mb-2">Stacey, Nov 21, 2023</span>
                                </Link>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="brand-testimonials-card relative aos-animate">
                                <Link href={"https://www.trustpilot.com/reviews/65046b6a51ad4908c7039d10"} target="_blank">
                                    <div className="flex justify-between items-center mb-5">
                                        <Image src={"/brand-img/stars.png"} width={90} height={100}></Image>
                                        <div className="flex items-center relative left-2">
                                            <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
                                            <span className="text-white">CA</span>
                                        </div>
                                    </div>
                                    <h2 className="font-poppins text-xl">
                                        Timely review of the proof reading process</h2>
                                    <p className="mb-5 pt-2">I got timely feedback on the proof reading process. The project was on schedule and I got useful tips on how to improve the overall quality of my writing</p>
                                    <span className="absolute bottom-0 mb-2">Edward Agbai, Sep 15, 2023</span>
                                </Link>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
            <section className="new-lp-footer-logo py-8">
                <div className="flex justify-center flex-col lg:flex-row items-center gap-7 md:gap-x-12 max-w-screen-xl mx-auto">
                    <Image alt="LOGO" src={'/images/bakertaylor.png'} width={130} height={130} loading="lazy" />
                    <Image alt="LOGO" src={'/images/Ingram_logo.png'} width={130} height={130} loading="lazy" />
                    <Image alt="LOGO" src={'/images/alibris.png'} width={130} height={130} loading="lazy" />
                    <Image alt="LOGO" src={'/images/barnes.png'} width={130} height={130} loading="lazy" />
                    <Image alt="LOGO" src={'/images/amazon.png'} width={130} height={130} loading="lazy" />
                    <Image alt="LOGO" src={'/images/Google-icon.png'} width={130} height={130} loading="lazy" />
                </div>
            </section>


            <footer className="text-white body-font new-lp-footer">
                <div className="container px-5 pt-10 pb-10 md:pt-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col position-relative">
                    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center justify-between">
                        <div className="lg:w-1/2 md:w-1/4 w-full px-4 pb-10">
                            <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                                <Image src={"/brand-img/logo.png"} width={250} height={200}></Image>
                            </a>
                            <p className="mt-2 text-sm text-white leading-7">
                                Pine Book Publishing is a team of passionate book publishers that believe in the power of storytelling and the importance of writers' ability to tell their tales. Our streamlined process and dedicated support make book publishing service a realistic and rewarding goal for any author.
                            </p>
                        </div>
                        <div className="lg:w-1/3 md:w-1/4 w-full px-4">
                            <nav className="list-none mb-10 mt-8">
                                <li>
                                    <Link
                                        href="tel:8668417469"
                                        className="text-white text-sm hover:text-white font-poppins flex justify-center md:justify-start"
                                    >
                                        <FontAwesomeIcon icon={faPhone} className="me-3" color="#1e8677" />
                                        (866) 841-7469
                                    </Link>
                                </li>
                                <li className="mt-8">
                                    <Link
                                        href="mailto:support@pinebookpublishing.com"
                                        className="text-white hover:text-white font-poppins text-sm flex justify-center md:justify-start"
                                    >
                                        <FontAwesomeIcon icon={faEnvelope} className="me-3" color="#1e8677" />
                                        {" "}
                                        support@pinebookpublishing.com{" "}
                                    </Link>
                                </li>
                                <li className="flex items-center justify-center md:justify-start mt-8 text-md ">
                                    <FontAwesomeIcon icon={faMapLocation} className="me-3" color="#1e8677" />
                                    <div>
                                        <p className="text-white text-md"><b>CANADA ADDRESS: </b> R-10225 Yonge St, Suite #250, Richmond Hill, ON L4C 3B2</p>
                                    </div>
                                </li>
                                <li className="flex items-center justify-center md:justify-start mt-5 text-md">
                                    <FontAwesomeIcon icon={faMapLocation} className="me-3" color="#1e8677" />
                                    <div>
                                        <p className="text-white text-md"><b>USA ADDRESS: </b>211 E 43rd St, 7th Floor, Suite #424, New York City, NY 10017</p>
                                    </div>
                                </li>

                            </nav>
                        </div>
                    </div>
                </div>
                <div className="new-lp-copyright-sec">
                    <div className="container text-center mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
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
                                Privacy Policy | {" "}
                            </Link>
                            Powered by <span className="powered-by-text">Pine Book Writing Inc.</span>
                        </p>

                    </div>
                </div>
            </footer>





            {/* <BrandPortfolio /> */}


        </>
    );
}
