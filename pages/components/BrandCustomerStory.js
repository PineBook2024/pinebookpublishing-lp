import React, { useEffect, useRef } from "react";
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
import { A11y } from "swiper/modules";
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BrandCustomerStory() {
    const swiperRef2 = useRef(null);

    const videoSlides = [
        {
            id: 1,
            src: "/images/v1.mp4",
            type: "video/mp4"
        },
        {
            id: 2,
            src: "/images/v6.mp4",
            type: "video/mp4"
        },
        {
            id: 3,
            src: "/images/v5.mp4",
            type: "video/mp4"
        },
        {
            id: 4,
            src: "/images/v3.mp4",
            type: "video/mp4"
        },
        {
            id: 5,
            src: "/images/v4.mp4",
            type: "video/mp4"
        },
        {
            id: 6,
            src: "/images/v4.mp4",
            type: "video/mp4"
        },
        {
            id: 7,
            src: "/images/v4.mp4",
            type: "video/mp4"
        }
    ];


    return (
        <>
            <section className="story-sec brand-story-sec py-28 relative">
                <div className="container mx-auto text-center m1-h">
                    <h3 className="mb-8 text-white text-3xl md:text-4xl font-poppins font-bold">
                        Our Success Stories
                    </h3>
                    <p className="text-white">
                        Explore our Success Stories to see how Pine Book Publishing has
                        empowered authors in their <br></br> self-publishing journey and stands out
                        among self-book publishers.
                    </p>
                </div>

                <section className="testimonials pt-8">
                    <div className="container mx-auto relative w-[80%]">
                    <Swiper
                        effect={"coverflow"}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={4}
                        loop={true}
                        coverflowEffect={{
                            rotate: -10,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
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
                            {videoSlides.map((video) => (
                                <SwiperSlide key={video.id}>

                                    {/* <div className="slideContent"> */}
                                        <video loop controls muted loading="lazy" className="brand-story-slider">
                                            <source src={video.src} type={video.type} />
                                        </video>
                                        {/* <div className="imageOverlay">
                                            <p>Hello World</p>
                                        </div>
                                    </div> */}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="bk-sil2 prev" onClick={() => swiperRef2.current?.slidePrev()}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </div>
                        <div className="bk-sil2 next" onClick={() => swiperRef2.current?.slideNext()}>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
}