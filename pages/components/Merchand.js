import React, { useEffect, useState, useRef } from "react";
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
import Image from "next/image";
const Merchand = () => {
    const swiperRef = useRef();
    return (

        <>
            <div className="max-w-screen-xl mx-auto marchand-slider-custom">
                <div className="grid grid-rows-2 grid-flow-col gap-2 px-4 py-4 leading-10">

                    <div className="p-2 rounded-xl row-span-2 col-span-2 w-full overflow-hidden">
                        <Swiper
                            className=""
                            spaceBetween={5}
                            slidesPerView={1}
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
                                    slidesPerView: 1,
                                    spaceBetween: 5,
                                    navigation: {
                                        enabled: false,
                                    },
                                    pagination: true,
                                    navigation: true,
                                },
                                "@1.00": {
                                    slidesPerView: 1,
                                    spaceBetween: 5,
                                },
                            }}
                        >
                            <SwiperSlide className="mx-auto text-center">
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-img-1.png"}
                                        width={800}
                                        height={800}
                                        className="w-full h-full custom-merchand-slider-1"
                                        loading="lazy"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide className="mx-auto text-center">
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-img-2.png"}
                                        width={800}
                                        height={800}
                                        className="w-full h-full custom-merchand-slider-1"
                                        loading="lazy"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide className="mx-auto text-center">
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-img-3.png"}
                                        width={800}
                                        height={800}
                                        className="w-full h-full custom-merchand-slider-1"
                                        loading="lazy"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide className="mx-auto text-center">
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-img-4.png"}
                                        width={800}
                                        height={800}
                                        className="w-full h-full custom-merchand-slider-1"
                                        loading="lazy"
                                    />
                                </a>
                            </SwiperSlide>
                        </Swiper>
                    </div>


                    <div className="p-2 w-full rounded-xl col-span-1 overflow-auto">
                        <Swiper
                            className=""
                            spaceBetween={5}
                            slidesPerView={1}
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
                                    slidesPerView: 1,
                                    spaceBetween: 5,

                                    navigation: {
                                        enabled: false,
                                    },
                                    pagination: true,
                                    navigation: true,
                                },
                                "@1.00": {
                                    slidesPerView: 1,
                                    spaceBetween: 5,
                                },
                            }}
                        >
                            <SwiperSlide className="mx-auto text-center">
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-2-img-1.png"}
                                        width={800}
                                        height={800}
                                        className="w-full h-full custom-merchand-slider-2"
                                        loading="lazy"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide className="mx-auto text-center">
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-2-img-2.png"}
                                        width={800}
                                        height={800}
                                        className="w-full h-full custom-merchand-slider-2"
                                        loading="lazy"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide className="mx-auto text-center">
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-2-img-3.png"}
                                        width={800}
                                        height={800}
                                        className="w-full h-full custom-merchand-slider-2"
                                        loading="lazy"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide className="mx-auto text-center">
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-2-img-4.png"}
                                        width={1100}
                                        height={1100}
                                        className="w-full h-full custom-merchand-slider-2"
                                        loading="lazy"
                                    />
                                </a>
                            </SwiperSlide>
                            <SwiperSlide className="mx-auto text-center">
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-2-img-5.jpg"}
                                        width={800}
                                        height={800}
                                        className="w-full h-full custom-merchand-slider-2"
                                        loading="lazy"
                                    />
                                </a>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <div className="p-2 w-full rounded-xl col-span-1 overflow-auto">
                        <Swiper
                            className=""
                            spaceBetween={5}
                            slidesPerView={1}
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
                                    slidesPerView: 1,
                                    spaceBetween: 5,

                                    navigation: {
                                        enabled: false,
                                    },
                                    pagination: true,
                                    navigation: true,
                                },
                                "@1.00": {
                                    slidesPerView: 1,
                                    spaceBetween: 5,
                                },
                            }}
                        >
                            <SwiperSlide className="mx-auto text-center">
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-3-img-1.png"}
                                        width={600}
                                        height={600}
                                        className="w-full h-full custom-merchand-slider-2"
                                        loading="lazy"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide>
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-3-img-2.png"}
                                        width={600}
                                        height={600}
                                        loading="lazy"
                                        className="w-full h-full custom-merchand-slider-2"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide>
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-3-img-3.png"}
                                        width={600}
                                        height={600}
                                        loading="lazy"
                                        className="w-full h-full custom-merchand-slider-2"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide>
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-3-img-4.png"}
                                        width={600}
                                        height={600}
                                        loading="lazy"
                                        className="w-full h-full custom-merchand-slider-2"
                                    />
                                </a>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>


                <div className="grid grid-rows-2 grid-flow-col gap-4 px-4 py-4 leading-10">

                    <div className="p-2 w-full rounded-xl col-span-1 overflow-auto">
                        <Swiper
                            className=""
                            spaceBetween={5}
                            slidesPerView={1}
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
                                    slidesPerView: 1,
                                    spaceBetween: 5,

                                    navigation: {
                                        enabled: false,
                                    },
                                    pagination: true,
                                    navigation: true,
                                },
                                "@1.00": {
                                    slidesPerView: 1,
                                    spaceBetween: 5,
                                },
                            }}
                        >
                            <SwiperSlide className="mx-auto text-center">
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-4-img-1.png"}
                                        width={600}
                                        height={600}
                                        className="w-full h-full custom-logo-size custom-merchand-slider-2"
                                        loading="lazy"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide>
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-4-img-2.png"}
                                        width={600}
                                        height={600}
                                        loading="lazy"
                                        className="w-full h-full custom-logo-size custom-merchand-slider-2"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide>
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-4-img-3.jpg"}
                                        width={600}
                                        height={600}
                                        loading="lazy"
                                        className="w-full h-full custom-logo-size custom-merchand-slider-2"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide>
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-4-img-4.jpg"}
                                        width={600}
                                        height={600}
                                        loading="lazy"
                                        className="w-full h-full custom-logo-size custom-merchand-slider-2"
                                    />
                                </a>
                            </SwiperSlide>
                            <SwiperSlide>
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-4-img-5.jpg"}
                                        width={600}
                                        height={600}
                                        loading="lazy"
                                        className="w-full h-full custom-logo-size custom-merchand-slider-2"
                                    />
                                </a>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <div className="p-2 w-full rounded-xl col-span-1 overflow-auto">
                        <Swiper
                            className=""
                            spaceBetween={5}
                            slidesPerView={1}
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
                                    slidesPerView: 1,
                                    spaceBetween: 5,

                                    navigation: {
                                        enabled: false,
                                    },
                                    pagination: true,
                                    navigation: true,
                                },
                                "@1.00": {
                                    slidesPerView: 1,
                                    spaceBetween: 5,
                                },
                            }}
                        >
                            <SwiperSlide className="mx-auto text-center">
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-5-img-1.png"}
                                        width={600}
                                        height={600}
                                        className="w-full h-full custom-logo-size custom-merchand-slider-2"
                                        loading="lazy"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide>
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-5-img-2.png"}
                                        width={600}
                                        height={600}
                                        loading="lazy"
                                        className="w-full h-full custom-logo-size custom-merchand-slider-2"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide>
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-5-img-3.png"}
                                        width={600}
                                        height={600}
                                        loading="lazy"
                                        className="w-full h-full custom-logo-size custom-merchand-slider-2"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide>
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-5-img-4.jpg"}
                                        width={600}
                                        height={600}
                                        loading="lazy"
                                        className="w-full h-full custom-logo-size custom-merchand-slider-2"
                                    />
                                </a>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <div className="p-2 rounded-xl row-span-2 col-span-2 w-full overflow-auto">

                        <Swiper
                            className=""
                            spaceBetween={5}
                            slidesPerView={1}
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
                                    slidesPerView: 1,
                                    spaceBetween: 5,

                                    navigation: {
                                        enabled: false,
                                    },
                                    pagination: true,
                                    navigation: true,
                                },
                                "@1.00": {
                                    slidesPerView: 1,
                                    spaceBetween: 5,
                                },
                            }}
                        >
                            <SwiperSlide className="mx-auto text-center">
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-6-img-1.png"}
                                        width={600}
                                        height={600}
                                        className="w-full h-full custom-merchand-slider-1"
                                        loading="lazy"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide>
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-6-img-2.png"}
                                        width={1100}
                                        height={1100}
                                        loading="lazy"
                                        className="w-full h-full custom-merchand-slider-1"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide>
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-6-img-3.png"}
                                        width={600}
                                        height={600}
                                        loading="lazy"
                                        className="w-full h-full custom-merchand-slider-1"
                                    />
                                </a>
                            </SwiperSlide>

                            <SwiperSlide>
                                <a href="#">
                                    <Image
                                        alt="LOGO"
                                        src={"/brand-img/merchandise-slider-6-img-4.png"}
                                        width={800}
                                        height={800}
                                        loading="lazy"
                                        className="w-full h-full custom-merchand-slider-1"
                                    />
                                </a>
                            </SwiperSlide>
                        </Swiper>

                    </div>
                </div>
            </div>
        </>

    )
}

export default Merchand
