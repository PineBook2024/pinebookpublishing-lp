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


export default function PortfolioSlider1LP() {
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
                    selector: '.glightbox1'
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
        // {
        //     id: 1,
        //     src: "/brand-img/1 PAPERBACK_8.500x8.500_25_PREMIUM_WHITE_en_US.png",
        // },
        {
            id: 1,
            src: "/brand-img/Chhavyvann So 2-01.png",
        },
        {
            id: 2,
            src: "/brand-img/full cover-01 (1).png",
        },
        {
            id: 3,
            src: "/brand-img/Hardcover lulu.png",
        },
        {
            id: 4,
            src: "/brand-img/Katie Loftis (Book 2) PB 2.png",
        },
        {
            id: 5,
            src: "/brand-img/PAPERBACK-01.png",
        },
        {
            id: 6,
            src: "/brand-img/PAPERBACK-4 compressed.png",
        },
        {
            id: 7,
            src: "/brand-img/Vikki LeBeau PB 3.png",
        },
        {
            id: 8,
            src: "/brand-img/Jean Bosco N. Ruhashya Full cover.png",
        },
    ];

    return (
        <>
            {/* <section className="pt-8 firstslider">

                <div className="container mx-auto relative w-[80%]">
                    <h1 className="text-5xl font-bold text-center mb-28">Browse our design portfolio</h1>

                    <h2 className="mb-5 ml-8 text-3xl font-medium">Book Cover Design</h2>
                    <Swiper
                        grabCursor={true}
                        slidesPerView={3}
                        navigation={true}
                        loop={true}
                        coverflowEffect={{
                            stretch: 0,
                        }}
                        onBeforeInit={(swiper) => {
                            swiperRef2.current = swiper;
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation]}
                        className="mySwiper"
                        breakpoints={{
                            "@0.00": {
                                slidesPerView: 1,
                                spaceBetween: 10,
                                navigation: true,
                            },
                            "@1.00": {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                        }}
                    >
                        {ImageSlides.map((Fslider) => (
                            <SwiperSlide key={Fslider.id} className="text-center">
                                <Image className='inline pb-4' src={Fslider.src} height={260} width={370}></Image>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="bk-sil2 portfoilio-slider-icon prev" onClick={() => swiperRef2.current?.slidePrev()}>
                        <FontAwesomeIcon icon={faArrowLeft} color="#000" width={18} />
                    </div>
                    <div className="bk-sil2 portfoilio-slider-icon next" onClick={() => swiperRef2.current?.slideNext()}>
                        <FontAwesomeIcon icon={faArrowRight} color="#000" width={18} />
                    </div>

                    <hr class="h-[2px] bg-gray-100 dark:bg-gray-600 my-10 border-none" />

                </div>


            </section> */}


            <div className="relative w-full max-w-6xl pb-10 mx-auto">
                

                <h2 className="mb-5 text-3xl font-medium text-center text-white md:text-left">Book Cover Design</h2>
                {/* Custom Previous Button */}
                <div
                    className="absolute transform -translate-y-1/2 cursor-pointer top-1/2 -left-10 bk-sil2 portfoilio-slider-icon prev hide-btn-responsive"
                    onClick={() => swiperRef2.current?.slidePrev()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color="#000" width={18} />
                </div>

                {/* Swiper Slider */}
                <Swiper
                    spaceBetween={30}
                    loop={true}
                    slidesPerView={3}
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
                            slidesPerView: 3,
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
                                    className="object-contain w-auto cursor-pointer h-72 glightbox1"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Next Button */}
                <div
                    className="absolute transform -translate-y-1/2 cursor-pointer top-1/2 -right-10 bk-sil2 portfoilio-slider-icon next hide-btn-responsive"
                    onClick={() => swiperRef2.current?.slideNext()}
                >
                    <FontAwesomeIcon icon={faArrowRight} color="#000" width={18} />
                </div>
                <hr class="h-[2px] bg-gray-100 dark:bg-gray-600 mt-10 border-none" />

            </div>
        </>
    );
}