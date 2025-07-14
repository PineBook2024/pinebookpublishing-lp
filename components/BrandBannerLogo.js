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

    return (
        <>
            <section className="brnd-slider bg-black overflow-hidden">
                <div className="container max-w-screen-xl grid grid-cols-1 width-container position-relative max-w-screen-xl">
                    <div className="book-sell-text ">
                        <h3 className="font-poppins text-xl md:text-xl leading-3 font-bold">Sell Your <br></br> <span>Book With</span></h3>
                    </div>
                    <div className="container mx-auto">
                        <div className="bnd-slider flex py-7 justify-center">
                            <Swiper
                                className="px-20 gap-x-32"
                                spaceBetween={15}
                                slidesPerView={6}
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

                                        navigation: {
                                            enabled: false,
                                        },
                                        pagination: true,
                                        navigation: true,
                                    },
                                    "@1.00": {
                                        slidesPerView: 6,
                                        spaceBetween: 15,
                                    },
                                }}
                            >
                                <SwiperSlide className="mx-auto text-center">
                                    <div className="flex justify-center">
                                        <a href="#">
                                            <Image
                                                alt="LOGO"
                                                src={"/images/Smashwords.png"}
                                                width={110}
                                                height={80}
                                                className="custom-logo-size"
                                                loading="lazy"
                                            />
                                        </a>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="flex justify-center">
                                        <a href="#">
                                            <Image
                                                alt="LOGO"
                                                src={"/images/Barnes-and-Noble.png"}
                                                width={70}
                                                height={80}
                                                loading="lazy"
                                            />
                                        </a>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="flex justify-center">
                                        <a href="#">
                                            <Image
                                                alt="LOGO"
                                                src={"/images/Google-Books.png"}
                                                width={100}
                                                height={80}
                                                loading="lazy"
                                            />
                                        </a>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="flex justify-center">
                                        <a href="#">
                                            <Image
                                                alt="LOGO"
                                                src={"/images/Draft2digital.png"}
                                                width={100}
                                                height={120}
                                                loading="lazy"
                                                className="custom-logo-size"
                                            />
                                        </a>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="flex justify-center">
                                        <a href="#">
                                            <Image
                                                alt="LOGO"
                                                src={"/images/logo5.png"}
                                                width={100}
                                                height={80}
                                                loading="lazy"
                                            />
                                        </a>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="flex justify-center">
                                        <a href="#">
                                            <Image
                                                alt="LOGO"
                                                src={"/images/logo6.png"}
                                                width={100}
                                                height={80}
                                                loading="lazy"
                                            />
                                        </a>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="flex justify-center">
                                        <a href="#">
                                            <Image
                                                alt="LOGO"
                                                src={"/images/logo7.png"}
                                                width={100}
                                                height={80}
                                                loading="lazy"
                                            />
                                        </a>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="flex justify-center">
                                        <a href="#">
                                            <Image
                                                alt="LOGO"
                                                src={"/images/logo8.png"}
                                                width={100}
                                                height={80}
                                                loading="lazy"
                                            />
                                        </a>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}