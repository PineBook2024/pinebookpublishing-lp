import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import BrandTopBar from "./components/BrandTopBar";
import BrandFooter from "./components/BrandFooter";
import BrandAbout from "./components/BrandAbout";
import BrandNavbar from "./components/BrandNavbar";
import BrandHero from "./components/BrandHero";
import BrandBannerLogo from "./components/BrandBannerLogo";
import BrandCTA from "./components/BrandCTA";
import BrandServices from "./components/BrandServices";
import BrandChooseUs from "./components/BrandChooseUs";
import BrandTestimonial from "./components/BrandTestimonial";
import BrandFaqs from "./components/BrandFaqs";
import LazyYouTube from "./components/LazyYouTube";
import BrandContact from "./components/BrandContactForm";
import BrandLogo from "./components/BrandLogo";
import BrandProcess from "./components/BrandProcess";
import BrandBannerVideo from "./components/BrandBannerVideo";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/navigation";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Navigation, Pagination } from "swiper";
import BrandHeroFriday from "./components/BrandHeroFriday";
import BrandHeroFridayUpdate from "./components/BrandHeroFridayUpdate";
import PortfolioSlider5 from "./components/PortfolioSlider5";
import HomeBookSlider from "./components/HomeBookSlider";
import HomePopupNew from "./components/HomePopupNew";
import HomePopupNNew from "../components/HomePopupNNew";

const videoClient = [
    {
        id: 1,
        src: "https://www.youtube.com/embed/xUTyiqPY6Oo",
        type: "video/mp4",
        BookTitle: "Love And Laughter",
        Consultant: "Damon Peters",
        ProjectManager: "Amara Johnson & Ryan Peters",
        clientname: "Lesvi Ferrel"
    },

    {
        id: 2,
        src: "https://www.youtube.com/embed/QMirTma0Wf4",
        type: "video/mp4",
        BookTitle: "Rising 2 B’Come",
        Consultant: "Damon Peters",
        ProjectManager: "Amara Johnson & Melissa",
        clientname: "Stacey L. Joiner"
    },
    {
        id: 3,
        src: "https://www.youtube.com/embed/Tv3_r0EMVH4",
        type: "video/mp4",
        BookTitle: "Stewart, BC History",
        Consultant: "Damon Peters",
        ProjectManager: "Amara Johnson & Ryan Peters",
        clientname: "Robert A. Eckess"
    },
    {
        id: 4,
        src: "https://www.youtube.com/embed/fX2J8iMy4z4",
        type: "video/mp4",
        BookTitle: "Free Yourself From Pain",
        Consultant: "Damon Peters",
        ProjectManager: "Ryan Peters",
        clientname: "Lesvi Ferrel"
    },
    {
        id: 5,
        src: "https://www.youtube.com/embed/gWW43Tfa8gA",
        type: "video/mp4",
        BookTitle: "The 2023 Elections in Nigeria: Actors, Intrigues, and Winners",
        Consultant: "Damon Peters",
        ProjectManager: "Lia Sinclair & Ryan Peters",
        clientname: "Edward Agbai"
    },
]


export default function Home() {
    const swiperRef2 = useRef(null);
    return (
        <>
            <Head>
                <title>Best Book Publishing company | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="A Best Book Publishing company dedicated to turning your writing dreams into reality. We make it happen for you, from text to market!"
                />
                <link rel="shortcut icon" href="/images/fav.png" />
                <meta name="google-site-verification" content="v2pKJGIZnMWCWw2QC5nuRPYT5gvDQlUtT0lZYFIhHYo" />


                {/* Google tag Manager Script */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16471224604"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'AW-16471224604');`,
                            }}
                />


            </Head>
            <BrandTopBar />
            <BrandNavbar />
            {/* <BrandHero /> */}
            {/* <BrandHeroFriday /> */}
            <BrandBannerVideo Component={BrandHeroFridayUpdate} />
            {/* <BrandBannerVideo Component={BrandHeroFriday} /> */}
            <BrandBannerLogo />
            <BrandAbout
                subdesctwo="Don’t feel overwhelmed; Pine Book Publishing is here to help you meet your publishing needs. We have self-published hundreds of books since our inception on 22nd February 2023. Our experts have 10-15 years of experience and are masters in their fields, even though we haven't been in the market long. We know the difficulties faced by authors worldwide and understand how frustrating the writing journey can be! So, we are here to fill this gap and simplify the entire editing and publishing process, offering customized solutions specifically to your needs and requirements."
                subdescthree=""
            />
            <HomeBookSlider />
            <BrandServices />
            <BrandCTA
                title="Do You Have Concerns? "
                desc="It’s okay to have questions since we understand that your book is close to your heart. Why not just get into a quick discussion?"
                btntext="Speak to our Consultant"
            />
            <BrandProcess />
            <BrandChooseUs />
            <BrandTestimonial />
            <section className='sec-test max-w-screen-xl mx-auto pb-20 pt-0 relative overflow-hidden'>
                <div className="container mx-auto text-center m1-h mb-10 ">
                    <h3 className="mb-4 text-white text-2xl md:text-4xl font-poppins  font-bold">
                        VIDEOS TESTIMONIALS
                    </h3>
                    {/* <p className="text-black">
                        Explore our Success Stories to see how Pine Book Publishing has
                        empowered authors <br></br> in their self-publishing journey and stands out
                        among self-book publishers.
                    </p> */}
                </div>
                {/* Custom Previous Button */}
                <div className="flex justify-end gap-4">
                    <div
                        className=" top-1/2 -left-10 transform -translate-y-1/2  portfoilio-slider4-icon prev cursor-pointer"
                        onClick={() => swiperRef2.current?.slidePrev()}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} color="#000" width={18} />
                    </div>
                    {/* Custom Next Button */}
                    <div
                        className=" top-1/2 -right-10 transform -translate-y-1/2  portfoilio-slider4-icon next cursor-pointer"
                        onClick={() => swiperRef2.current?.slideNext()}
                    >
                        <FontAwesomeIcon icon={faArrowRight} color="#000" width={18} />
                    </div>
                </div>

                {/* Swiper Slider */}
                <Swiper
                    spaceBetween={30}
                    slidesPerView={3}
                    loop={true}
                    onSwiper={(swiper) => (swiperRef2.current = swiper)}
                    className="mySwiper"
                    breakpoints={{
                        "@0.00": {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        "@1.00": {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                    }}
                >
                    <div className='testimonials-wrap grid grid-cols-1 md:grid-cols-3 gap-10'>
                        {/* {videoClient.map((videoClient) => (
                            <SwiperSlide>
                                <Link href={videoClient.src} className="glightbox block">
                                    <div className='' key={videoClient.id}>
                                        <h2 className="font-bold text-xl text-black" >{videoClient.clientname}</h2>
                                        <iframe className='py-4 client-testi-video' height={225} width={415} src={videoClient.src} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                        <h4 className='text-black'> <span className='font-bold leading-normal'>Book Title:</span> {videoClient.BookTitle}</h4>
                                        <h4 className='text-black'><span className='font-bold leading-normal '>Consultant:</span> {videoClient.Consultant}</h4>
                                        <h4 className='text-black'><span className='font-bold leading-normal '>Project Manager: </span>{videoClient.ProjectManager}</h4>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))} */}
                        {videoClient.map((videoClient) => {
                            // Extract YouTube video ID from the URL
                            const videoUrl = new URL(videoClient.src);
                            const videoId = videoUrl.pathname.split('/embed/')[1].split('?')[0];

                            return (
                                <SwiperSlide>
                                    <div key={videoClient.id} className="mb-8 max-w-xl mx-auto border p-4 rounded">
                                        <h2 className="font-bold text-xl text-black mb-2">{videoClient.clientname}</h2>

                                        <div className="py-4">
                                            <LazyYouTube videoId={videoId} />
                                        </div>
                                        <h4 className="text-black">
                                            <span className="font-bold leading-normal">Book Title:</span> {videoClient.BookTitle}
                                        </h4>
                                        <h4 className="text-black">
                                            <span className="font-bold leading-normal">Consultant:</span> {videoClient.Consultant}
                                        </h4>
                                        <h4 className="text-black">
                                            <span className="font-bold leading-normal">Project Manager:</span> {videoClient.ProjectManager}
                                        </h4>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </div>
                </Swiper>

                <div className="text-center mt-14">
                    <Link href="/testimonials" className="brand-about-btn font-poppins">VIEW MORE TESTIMONIALS</Link>
                </div>
            </section>

            <BrandFaqs />
            <BrandContact />
            <BrandLogo />
            <BrandFooter />
            {/* <HomePopupNew /> */}
            <HomePopupNNew />

            {/* Floating Shop Button */}
            <style jsx global>{`
                @keyframes shopPulse {
                    0%, 100% { box-shadow: 0 8px 22px -5px rgba(19, 124, 109, 0.55), 0 0 0 0 rgba(48, 150, 135, 0.65); }
                    50% { box-shadow: 0 8px 22px -5px rgba(19, 124, 109, 0.65), 0 0 0 10px rgba(48, 150, 135, 0); }
                }
                @keyframes shopShine {
                    0% { transform: translateX(-120%) skewX(-20deg); }
                    100% { transform: translateX(220%) skewX(-20deg); }
                }
                .floating-shop-btn {
                    position: fixed;
                    top: 120px;
                    right: 22px;
                    z-index: 9999;
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 9px 18px;
                    border-radius: 999px;
                    color: #fff;
                    font-family: 'Poppins', sans-serif;
                    font-weight: 600;
                    font-size: 13px;
                    letter-spacing: 0.3px;
                    text-decoration: none;
                    background: linear-gradient(90deg, rgba(19, 124, 109, 1) 0%, rgba(48, 150, 135, 1) 100%);
                    overflow: hidden;
                    animation: shopPulse 2.2s ease-in-out infinite;
                    transition: transform 0.25s ease, filter 0.25s ease;
                    border: 1.5px solid rgba(255, 255, 255, 0.22);
                }
                .floating-shop-btn:hover {
                    transform: translateY(-2px) scale(1.03);
                    filter: brightness(1.08);
                    color: #fff;
                }
                .floating-shop-btn::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 40%;
                    height: 100%;
                    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent);
                    animation: shopShine 2.8s ease-in-out infinite;
                    pointer-events: none;
                }
                .floating-shop-btn .badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 18px;
                    height: 18px;
                    padding: 0 5px;
                    border-radius: 999px;
                    background: #fff;
                    color: #137c6d;
                    font-size: 9px;
                    font-weight: 800;
                    margin-left: 2px;
                    letter-spacing: 0.5px;
                }
                @media (max-width: 640px) {
                    .floating-shop-btn {
                        top: auto;
                        bottom: 18px;
                        right: 14px;
                        padding: 8px 14px;
                        font-size: 12px;
                    }
                }
            `}</style>
            <Link href="/shop" aria-label="Shop Now" className="floating-shop-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 1 }}>
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span style={{ position: 'relative', zIndex: 1 }}>Shop Now</span>
                <span className="badge">NEW</span>
            </Link>
        </>
    );
}
