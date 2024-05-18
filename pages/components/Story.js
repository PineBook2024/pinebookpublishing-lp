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

export default function Story() {
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
        }
    ];


    return (
        <>
            <section className="story-sec py-20">
                <div className="container mx-auto text-center m1-h">
                    <h3 className="mb-4 text-white text-4xl md:text-5xl font-poppins mt-5">
                        Our Success Stories
                    </h3>
                    <p className="text-white">
                        Explore our Success Stories to see how Pine Book Publishing has
                        empowered authors <br></br> in their self-publishing journey and stands out
                        among self-book publishers.
                    </p>
                </div>

                <section className="testimonials pt-8">
                    <div className="container mx-auto relative w-[80%]">
                        <Swiper
                            effect={"coverflow"}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={3}
                            loop={true}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            onBeforeInit={(swiper) => {
                                swiperRef2.current = swiper;
                            }}
                            modules={[EffectCoverflow, Pagination]}
                            className="mySwiper"
                            breakpoints={{
                                "@0.00": {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                    navigation: true,
                                },
                                "@1.00": {
                                    slidesPerView: 3,
                                    spaceBetween: 5,
                                },
                            }}
                        >
                            {videoSlides.map((video) => (
                                <SwiperSlide key={video.id}>
                                    <video loop controls muted loading="lazy">
                                        <source src={video.src} type={video.type} />
                                    </video>
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