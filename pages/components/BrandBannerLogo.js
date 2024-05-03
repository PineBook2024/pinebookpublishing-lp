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

export default function BrandBannerLogo() {
    const swiperRef = useRef();

    const logos = [
        { id: 1, src: "/brand-img/banner-logo2.png", alt: "LOGO 1", width: 180, height: 180 },
        { id: 2, src: "/images/s6.png", alt: "LOGO 2", width: 120, height: 120 },
        { id: 3, src: "/images/s4.png", alt: "LOGO 3", width: 110, height: 120 },
        { id: 4, src: "/images/s3.png", alt: "LOGO 4", width: 150, height: 120 },
        { id: 5, src: "/brand-img/banner-logo1.png", alt: "LOGO 5", width: 140, height: 120 },
    ];

    return (
        <>
            <section className="brand-banner-slider bg-black overflow-hidden">
                <div className="container grid grid-cols-1 width-container position-relative max-w-screen-xl">
                    <div className="container mx-auto">
                        <div className="bnd-slider flex py-7 justify-center">
                            <Swiper
                                className="px-20 gap-x-32"
                                spaceBetween={15}
                                slidesPerView={5}
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
                                    "@0.00": {
                                        slidesPerView: 3,
                                        spaceBetween: 10,
                                        navigation: true,
                                        pagination: true
                                    },
                                    "@1.00": {
                                        slidesPerView: 5,
                                        spaceBetween: 15
                                    },
                                }}
                            >
                                {logos.map(logo => (
                                    <SwiperSlide key={logo.id} className="mx-auto text-center">
                                        <div className="flex justify-center items-center">
                                            <a href="#">
                                                <Image
                                                    alt={logo.alt}
                                                    src={logo.src}
                                                    width={logo.width}
                                                    height={logo.height}
                                                    loading="lazy"
                                                />
                                            </a>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}