import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import dynamic from 'next/dynamic';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import 'glightbox/dist/css/glightbox.min.css';

const GLightbox = dynamic(
    () => import('glightbox').then((glightboxModule) => glightboxModule.default),
    { ssr: false }
);

export default function PortfolioSlider5() {
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
                    selector: '.glightbox5'
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
            src: "/brand-img/Group 1.png",
            title: 'Free Yourself From Pain',
            author: 'Author: Lesvi Ferrel',
            logo1: '/brand-img/Amazon Icon.png',
            logo2: '/brand-img/Barnes Noble Icon.png',
        },
        {
            id: 2,
            src: "/brand-img/Group 2.png",
            title: 'My Life in Poetry',
            author: 'Author: Tonya Richardson',
            logo1: '/brand-img/Amazon Icon.png',
            logo3: '/brand-img/google books icon.png',
        },
        {
            id: 3,
            src: "/brand-img/Group 2-1.png",
            title: 'My Phonics Book',
            author: 'Author: Terry-Ann Reid',
            logo1: '/brand-img/Amazon Icon.png',
            logo2: '/brand-img/Barnes Noble Icon.png',
        },
        {
            id: 4,
            src: "/brand-img/Group 2-2.png",
            title: "There's no Middle Ground",
            author: 'Author: Ready Witer',
            logo1: '/brand-img/Amazon Icon.png',
            logo2: '/brand-img/Barnes Noble Icon.png',
            logo3: '/brand-img/google books icon.png',
            logo4: '/brand-img/Smashwords Icons.png',
        },
        {
            id: 5,
            src: "/brand-img/Group 2-3.png",
            title: 'I am a Girl',
            author: 'Author: Pamela Avis Harry',
            logo1: '/brand-img/Amazon Icon.png',
        },
        {
            id: 6,
            src: "/brand-img/Group 4.png",
            title: 'Imposter Syndrome',
            author: 'Author: Joshan Flowers, DSL',
            logo1: '/brand-img/Amazon Icon.png',
            logo2: '/brand-img/Barnes Noble Icon.png',
            logo3: '/brand-img/google books icon.png',
        },
        {
            id: 7,
            src: "/brand-img/Group 5.png",
            title: 'Love and Laughter',
            author: 'Author: Lesvi Ferrel',
            logo1: '/brand-img/Amazon Icon.png',
            logo2: '/brand-img/Barnes Noble Icon.png',
        },
    ];

    return (
        <>
            <div className="w-full max-w-6xl mx-auto py-10 relative">
                <h2 className="text-3xl font-medium mb-10">Book Publishing</h2>
                {/* Custom Previous Button */}
                <div
                    className="absolute top-1/2 -left-10 transform -translate-y-1/2 bk-sil2 portfoilio-slider5-icon prev cursor-pointer"
                    onClick={() => swiperRef2.current?.slidePrev()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color="#000" width={18} />
                </div>

                {/* Swiper Slider */}
                <Swiper
                    spaceBetween={30}
                    slidesPerView={2}
                    loop={true}
                    onSwiper={(swiper) => (swiperRef2.current = swiper)}
                    className="mySwiper"
                    breakpoints={{
                        "@0.00": {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        "@1.00": {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {ImageSlides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative h-full flex items-center gap-6">
                                <div>
                                    <img
                                        src={slide.src}
                                        alt={`Slide ${slide.id}`}
                                        className="h-70 w-auto object-contain w-100"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-size-custom">{slide.title}</h4>
                                    <h4 className="text-size-custom">{slide.author}</h4>
                                    <p className="mt-4 font-bold">Available On:</p>
                                    <div className="mt-4 cursor-pointer flex gap-4">
                                        {slide.logo1 && (
                                            <img
                                                src={slide.logo1}
                                                alt={`Logo 1`}
                                                className="w-auto object-contain icon-logo-portfolio"
                                            />
                                        )}
                                        {slide.logo2 && (
                                            <img
                                                src={slide.logo2}
                                                alt={`Logo 2`}
                                                className="w-auto object-contain icon-logo-portfolio"
                                            />
                                        )}
                                        {slide.logo3 && (
                                            <img
                                                src={slide.logo3}
                                                alt={`Logo 3`}
                                                className="w-auto object-contain icon-logo-portfolio"
                                            />
                                        )}
                                        {slide.logo4 && (
                                            <img
                                                src={slide.logo4}
                                                alt={`Logo 4`}
                                                className="w-auto object-contain icon-logo-portfolio"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Next Button */}
                <div
                    className="absolute top-1/2 -right-10 transform -translate-y-1/2 bk-sil2 portfoilio-slider5-icon next cursor-pointer"
                    onClick={() => swiperRef2.current?.slideNext()}
                >
                    <FontAwesomeIcon icon={faArrowRight} color="#000" width={18} />
                </div>
                <hr className="h-[2px] bg-gray-100 dark:bg-gray-600 mt-10 border-none" />
            </div>
        </>
    );
}
