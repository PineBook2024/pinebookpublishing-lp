import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import 'glightbox/dist/css/glightbox.min.css';

const GLightbox = dynamic(
    () => import('glightbox').then((glightboxModule) => glightboxModule.default),
    { ssr: false }
);

export default function HomeBookSlider() {
    const swiperRef2 = useRef(null);
    const lightboxRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (lightboxRef.current) {
                lightboxRef.current.destroy();
            }
            import('glightbox').then((GLightboxModule) => {
                const GLightbox = GLightboxModule.default;
                lightboxRef.current = GLightbox({
                    selector: '.glightbox5'
                });
            });
        }

        return () => {
            if (lightboxRef.current) {
                lightboxRef.current.destroy();
            }
        };
    }, []);

    const ImageSlides = [
        {
            id: 1,
            src: "/brand-img/01.png",
            title: "Anders and Maren Larsen and Descendants' Life Histories and Stories",
            author: 'by: Ronald A Larson',
            url: 'https://a.co/d/1Y5YQs4'
        },
        {
            id: 2,
            src: "/brand-img/02.png",
            title: "Facing Challenges: A Warrior's Story of Overcoming ",
            author: 'by: Lesvi Ferrel',
            url: 'https://a.co/d/fyPMmAq'
        },
        {
            id: 3,
            src: "/brand-img/03.png",
            title: 'A Day of Play with Foamy and Friends',
            author: 'by: Kristin Kramer',
            url: 'https://a.co/d/b5Xi3E1'
        },
        {
            id: 4,
            src: "/brand-img/05.png",
            title: "Ella's Songs",
            author: 'by: David D. Van Fleet',
            url: 'https://a.co/d/7mlkkL9'
        },
        {
            id: 5,
            src: "/brand-img/06.png",
            title: 'Cataclysm: The Rise of Teatrie Part 2',
            author: 'by: K. C. Climer',
            url: 'https://a.co/d/1WnuVhJ'
        },
        {
            id: 6,
            src: "/brand-img/07.png",
            title: 'Healing In Africa: Exploring Health and Wellness Across the Continent',
            author: 'by: Christian Ehiobuche',
            url: 'https://a.co/d/enWp3KC'

        },
        {
            id: 7,
            src: "/brand-img/08.png",
            title: 'Shadows of Valor: Navigating Imposter Syndrome While Serving in the U.S. Military',
            author: 'by: Dr. Joshan A. Flowers, DSL',
            url: 'https://a.co/d/c7ux0mD'
        },
        {
            id: 8,
            src: "/brand-img/10.png",
            title: 'My Journey : Vol 1',
            author: 'by: John M Suits',
            url: 'https://a.co/d/9KUT5WH'
        },
        {
            id: 9,
            src: "/brand-img/11.png",
            title: 'Love and Laughter',
            author: 'by: Lesvi Ferrel',
            logo1: '/brand-img/Amazon Icon.png',
            logo2: '/brand-img/Barnes Noble Icon.png',
        },
        {
            id: 10,
            src: "/brand-img/12.png",
            title: "A Heart's Desire",
            author: 'by: Queen Starasia',
            url: 'https://a.co/d/eRFpsZR'
        },
        {
            id: 11,
            src: "/brand-img/13.png",
            title: 'Genesis ',
            author: 'by:Max O. Miller',
            url: 'https://a.co/d/jhbP3PW'
        },
        {
            id: 12,
            src: "/brand-img/14.png",
            title: 'The Well of Hope: Bloodlines',
            author: 'by: Angel Mercado',
            url: 'https://a.co/d/8H81GS7'
        },
        {
            id: 13,
            src: "/brand-img/15.png",
            title: 'Love and Laughter',
            author: 'by: Lesvi Ferrel',
            logo1: '/brand-img/Amazon Icon.png',
            logo2: '/brand-img/Barnes Noble Icon.png',
        },
        {
            id: 14,
            src: "/brand-img/16.png",
            title: 'Love and Laughter',
            author: 'by: Lesvi Ferrel',
            logo1: '/brand-img/Amazon Icon.png',
            logo2: '/brand-img/Barnes Noble Icon.png',
        },
        {
            id: 15,
            src: "/brand-img/18.png",
            title: 'Love and Laughter',
            author: 'by: Lesvi Ferrel',
            logo1: '/brand-img/Amazon Icon.png',
            logo2: '/brand-img/Barnes Noble Icon.png',
        },
        {
            id: 16,
            src: "/brand-img/19.png",
            title: 'Love and Laughter',
            author: 'by: Lesvi Ferrel',
            logo1: '/brand-img/Amazon Icon.png',
            logo2: '/brand-img/Barnes Noble Icon.png',
        },
    ];

    return (
        <>
            <div className="w-full max-w-6xl mx-auto py-10 relative">
                <h2 className="text-3xl font-medium mb-10">Book Publishing</h2>
                {/* Custom Previous Button */}
                <div
                    className="absolute top-1/2 -left-10 transform -translate-y-1/2 bk-sil2 portfoilio-slider5-icon prev cursor-pointer"
                    onClick={() => swiperRef2.current?.slidePrev()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color="#000" width={18} />
                </div>

                {/* Swiper Slider */}
                <Swiper
                    spaceBetween={30}
                    slidesPerView={4}
                    loop={true}
                    onSwiper={(swiper) => (swiperRef2.current = swiper)}
                    className="mySwiper"
                    breakpoints={{
                        "@0.00": {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        "@1.00": {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {ImageSlides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <Link href="#" className="relative h-full flex flex-col items-center gap-6">
                                <div>
                                    <img
                                        src={slide.src}
                                        alt={`Slide ${slide.id}`}
                                        className="h-70 w-auto object-contain w-100"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-size-custom">{slide.title}</h4>
                                    <h4>{slide.author}</h4>

                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Next Button */}
                <div
                    className="absolute top-1/2 -right-10 transform -translate-y-1/2 bk-sil2 portfoilio-slider5-icon next cursor-pointer"
                    onClick={() => swiperRef2.current?.slideNext()}
                >
                    <FontAwesomeIcon icon={faArrowRight} color="#000" width={18} />
                </div>
                <hr className="h-[2px] bg-gray-100 dark:bg-gray-600 mt-10 border-none" />
            </div>
        </>
    );
}
