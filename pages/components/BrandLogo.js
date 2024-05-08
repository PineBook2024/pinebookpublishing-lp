import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
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

export default function BrandLogo() {
    const swiperRef = useRef();
    const badges = [
        { src: "/images/bage2.png", width: 100, height: 100 },
        { src: "/images/bage13.png", width: 100, height: 100 },
        { src: "/images/bage3.png", width: 100, height: 100 },
        { src: "/images/bage14.png", width: 100, height: 100 },
        { src: "/images/bage4.png", width: 100, height: 100 },
        { src: "/images/bage12.png", width: 100, height: 100 }
    ];

    return (
        <>
            <div className="max-w-screen-xl mx-auto bages-pic flex flex-wrap items-center justify-center py-10 gap-x-32">
                <Swiper
                    className=""
                    spaceBetween={15}
                    slidesPerView={5}
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
                            slidesPerView: 5,
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
        </>
    );
}