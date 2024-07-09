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
        { src: "/images/bage2.png", width: 100, height: 100, title: "Top eBook Content Writing", desc: "Clutch recognized our team and organization for being one of the top eBook Content Writing companies."  },
        { src: "/images/bage13.png", width: 100, height: 100, title: "Literary Excellence in Children Book", desc: "Pencraft recognized our team and organization for being the top Children Book Writing company." },
        { src: "/images/bage3.png", width: 100, height: 100, title: "Top Content Editing & Proofreading Service", desc: "Clutch recognized our team and organization for being one of the top Content Editing & Proofreading companies." },
        { src: "/images/bage14.png", width: 100, height: 100, title: "2023 Book Award Winner: Non-Fiction Book", desc: "Page Turner recognized our team and organization as the best Book Writing Company in the Non-Fiction Category." },
        { src: "/images/bage4.png", width: 100, height: 100, title: "Top Product Marketing", desc: "Clutch recognized our team and organization for being one of the top Product Marketing companies." },
        { src: "/images/bage12.png", width: 100, height: 100, title: "Book Award Gold Winner: Fiction", desc: "Our team and organization was recognized as the Gold Winner in Fiction Category." }
    ];

    return (
        <>
            {/* <div className="max-w-screen-xl mx-auto bages-pic flex flex-wrap items-center justify-center py-10 gap-x-32">
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
            </div> */}
            <section className="body-font bg-white max-w-screen-xl mx-auto">
                <div className="px-14 py-14">
                    <div className="flex flex-wrap">
                        {badges.map((badge, index) => (
                            <div key={index} className="lg:w-1/6 md:w-1/2 p-4 text-center border-dashed border-2">
                                <a className="block relative rounded overflow-hidden">
                                    <Image alt="ecommerce" className="object-cover object-center mx-auto" src={badge.src} style={{ width: badge.width, height: badge.height }} width={badge.width} height={badge.height} />
                                </a>
                                <div className="mt-4">
                                    <h3 className="text-black text-sm title-font mb-1 font-bold font-poppins">{badge.title}</h3>
                                    <h2 className="text-black title-font text-xs">{badge.desc}</h2>
                                </div>
                            </div>
                        ))} 
                    </div>
                </div>
            </section>
        </>
    );
}