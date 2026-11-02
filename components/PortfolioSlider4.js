import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import "swiper/css/effect-coverflow";
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
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import dynamic from 'next/dynamic';
import 'glightbox/dist/css/glightbox.min.css';

const GLightbox = dynamic(
    () => import('glightbox').then((glightboxModule) => glightboxModule.default),
    { ssr: false }
);

export default function PortfolioSlider4() {
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
                    selector: '.glightbox4'
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
            src: "/brand-img/Editing Portfolio 1.png",
        },
        {
            id: 2,
            src: "/brand-img/Editing Portfolio 2.png",
        },
        {
            id: 3,
            src: "/brand-img/Editing Portfolio 3.png",
        },
        {
            id: 4,
            src: "/brand-img/Editing Portfolio 4.png",
        },
        {
            id: 5,
            src: "/brand-img/BF-01.png",
        },
        {
            id: 6,
            src: "/brand-img/BF-02.png",
        },
        {
            id: 7,
            src: "/brand-img/BF-03.png",
        },
        {
            id: 8,
            src: "/brand-img/BF-04.png",
        },
        {
            id: 9,
            src: "/brand-img/BF-05.png",
        },
        {
            id: 10,
            src: "/brand-img/BF-06.png",
        },
        {
            id: 11,
            src: "/brand-img/BF-07.png",
        },
        {
            id: 12,
            src: "/brand-img/BF-08.png",
        },
        {
            id: 13,
            src: "/brand-img/BF-09.png",
        },
    ];

    return (
        <>
            <div className="relative w-full max-w-6xl py-10 mx-auto">
                <h1 className="mb-20 text-4xl font-bold text-center">Our Portfolio - From Designing,<br></br> Formatting to Publishing</h1>
                <h2 className="mb-5 text-3xl font-medium">Editing, Formatting & Proofreading</h2>
                {/* Custom Previous Button */}
                <div
                    className="absolute transform -translate-y-1/2 cursor-pointer top-1/2 -left-10 bk-sil2 portfoilio-slider3-icon prev"
                    onClick={() => swiperRef2.current?.slidePrev()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color="#000" width={18} />
                </div>

                {/* Swiper Slider */}
                <Swiper
                    spaceBetween={30}
                    slidesPerView={2}
                    loop={true}
                    onSwiper={(swiper) => (swiperRef2.current = swiper)}
                    modules={[Navigation]}
                    className="mySwiper"
                    breakpoints={{
                        "@0.00": {
                            slidesPerView: 1,
                            spaceBetween: 10,
                            navigation: true,
                        },
                        "@1.00": {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {ImageSlides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative flex flex-col items-center h-full">
                                <img
                                    src={slide.src}
                                    alt={`Slide ${slide.id}`}
                                    className="object-contain w-auto cursor-pointer h-70 w-100 glightbox4"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Next Button */}
                <div
                    className="absolute transform -translate-y-1/2 cursor-pointer top-1/2 -right-10 bk-sil2 portfoilio-slider3-icon next"
                    onClick={() => swiperRef2.current?.slideNext()}
                >
                    <FontAwesomeIcon icon={faArrowRight} color="#000" width={18} />
                </div>
                <hr class="h-[2px] bg-gray-100 dark:bg-gray-600 mt-10 border-none" />
            </div>
        </>
    );
}