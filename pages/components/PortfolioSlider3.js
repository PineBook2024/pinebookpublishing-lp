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

export default function PortfolioSlider3() {
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
                    selector: '.glightbox3'
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
            src: "/brand-img/foamy and F-01 (1).png",
        },
        // {
        //     id: 2,
        //     src: "/brand-img/im a boy-01 (1).png",
        // },
        {
            id: 2,
            src: "/brand-img/im a girl-01 (1).png",
        },
        {
            id: 3,
            src: "/brand-img/Untitled-1-01 (2).png",
        },
        {
            id: 4,
            src: "/brand-img/the phonics-01.png",
        },
        {
            id: 5,
            src: "/brand-img/robert-01.png",
        },

    ];

    return (
        <>
            <div className="w-full max-w-6xl mx-auto relative">
                <h2 className="text-3xl font-medium mb-5 text-center md:text-left">Illustrations </h2>
                {/* Custom Previous Button */}
                <div
                    className="absolute top-1/2 -left-10 transform -translate-y-1/2 bk-sil2 portfoilio-slider3-icon prev cursor-pointer"
                    onClick={() => swiperRef2.current?.slidePrev()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color="#000" width={18} />
                </div>

                {/* Swiper Slider */}
                <Swiper
                    spaceBetween={30}
                    loop={true}
                    slidesPerView={2}
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
                            <div className="relative h-full flex flex-col items-center">
                                <img
                                    src={slide.src}
                                    alt={`Slide ${slide.id}`}
                                    className="h-100 w-auto object-contain glightbox3 cursor-pointer"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Next Button */}
                <div
                    className="absolute top-1/2 -right-10 transform -translate-y-1/2 bk-sil2 portfoilio-slider3-icon next cursor-pointer"
                    onClick={() => swiperRef2.current?.slideNext()}
                >
                    <FontAwesomeIcon icon={faArrowRight} color="#000" width={18} />
                </div>
                <hr class="h-[2px] bg-gray-100 dark:bg-gray-600 mt-10 border-none" />
            </div>
        </>
    );
}