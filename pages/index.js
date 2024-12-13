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
            <BrandTopBar />
            <BrandNavbar />
            {/* <BrandHero /> */}
            {/* <BrandHeroFriday /> */}
            <BrandBannerVideo Component={BrandHeroFridayUpdate} />
            <BrandBannerLogo />
            <BrandAbout
                subdescone="Have you ever tried publishing a book but don’t know where to start? Did you ever plan to consult a book publishing company? We get it – there are more book publishing companies out there than stars in the sky (okay, maybe not that many, but you get the idea)."
                subdesctwo="Don’t feel overwhelmed; Pine Book Publishing is here to help you meet your publishing needs. We have self-published 100s of books since our inception on 22nd February 2023. Even though we may not have been in the market for too long, but our experts have at least 10-15 years of experience and are masters of their designated fields. We know the difficulties faced by authors worldwide and understand how frustrating the writing journey can be! So, we are here to fill this gap and simplify the entire editing and publishing process, offering customized solutions specifically to your needs and requirements."
                subdescthree=""
            />
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
                        {videoClient.map((videoClient) => (
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
                        ))}
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
        </>
    );
}
