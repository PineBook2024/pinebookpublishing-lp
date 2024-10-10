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

export default function PortfolioSlider2() {
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
                    selector: '.glightbox2'
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
            src: "/brand-img/Artboard 1.png",
        },
        {
            id: 2,
            src: "/brand-img/Artboard 1-1.png",
        },
        {
            id: 3,
            src: "/brand-img/Artboard 1-2.png",
        },
        {
            id: 4,
            src: "/brand-img/Artboard 2.png",
        },
        {
            id: 5,
            src: "/brand-img/Draft 02.png",
        },
        {
            id: 6,
            src: "/brand-img/Efrain Castillos Barber Studio.png",
        },
        {
            id: 7,
            src: "/brand-img/John H Bowman 2.png",
        }

    ];

    return (
        <>
            {/* <section className="firstslider pt-8">

                <div className="container mx-auto relative w-[80%]">
                    <h1 className="text-5xl font-bold mb-28 text-center">Browse our design portfolio</h1>

                    <h2 className="text-3xl font-medium mb-5 ml-8">Book Cover Design</h2>
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


            <div className="w-full max-w-6xl mx-auto pb-10 relative">
                <h2 className="text-3xl font-medium mb-5">Author Websites</h2>
                {/* Custom Previous Button */}
                <div
                    className="absolute top-1/2 -left-10 transform -translate-y-1/2 bk-sil2 portfoilio-slider2-icon prev cursor-pointer"
                    onClick={() => swiperRef2.current?.slidePrev()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color="#000" width={18} />
                </div>

                {/* Swiper Slider */}
                <Swiper
                    spaceBetween={30}
                    slidesPerView={3}
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
                            slidesPerView: 3,
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
                                    className=" w-auto object-contain h-100 w-100 glightbox2 cursor-pointer"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Next Button */}
                <div
                    className="absolute top-1/2 -right-10 transform -translate-y-1/2 bk-sil2 portfoilio-slider2-icon next cursor-pointer"
                    onClick={() => swiperRef2.current?.slideNext()}
                >
                    <FontAwesomeIcon icon={faArrowRight} color="#000" width={18} />
                </div>
                <hr class="h-[2px] bg-gray-100 dark:bg-gray-600 mt-10 border-none" />
            </div>
        </>
    );
}