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
import { A11y } from "swiper/modules";
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BrandServices() {
    const swiperRef = useRef(null);
    return (
        <>
            <section className="brand-service-section overflow-hidden lg:block md:block hidden">
                <div className="max-w-screen-xl mx-auto px-4 my-20 relative">
                    <div className="text-center mb-6">
                        <h3 className="text-xl text-white font-poppins">Our Publishing</h3>
                        <h2 className="font-poppins text-5xl md:text-5xl text-white font-bold">Services</h2>
                        <p className="text-white pt-3">At Pine Book Publishing, we take your story from a rough draft to bookshelf-ready with our expert editing, publishing, and marketing services<br></br> Whether you want Self Publishing Services, lulu self publishing, or want to get your book published on any other retailer. We have covered all your needs. </p>
                    </div>

                    {/* 1 of 2 */}
                    <div className="brand-service-content flex gap-4 flex-col md:flex-row aos-init aos-animate" data-aos="fade-left" data-aos-duration="1000">
                        <div className="brand-service-card flex gap-4">
                            <div className="brand-service-card-content basis-1/2 relative">
                                <span className="right"></span>
                                <span className="bottom"></span>
                                <div className="flex justify-between mb-12">
                                    <Image src={"/brand-img/service-icon1.png"} className="icon" width={50} height={50}></Image>
                                    <span className="font-poppins text-4xl">01</span>
                                </div>
                                <p >We turn your drafts into masterpieces.</p>
                                <h4 className="mt-4 font-poppins text-2xl">BOOK EDITING</h4>
                            </div>
                            <div className="basis-1/2 brand-service-card-img relative">
                                <span class="square">
                                    <Link href="/book-editing">Read More</Link>
                                </span>
                                <div className="service-card-img">
                                    <Image src={"/brand-img/service-img1.png"} width={250} height={200}></Image>
                                </div>
                            </div>
                        </div>
                        <div className="brand-service-card flex gap-4">
                            <div className="brand-service-card-content basis-1/2 relative">
                                <span className="right"></span>
                                <span className="bottom"></span>
                                <div className="flex justify-between mb-12">
                                    <Image src={"/brand-img/service-icon2.png"} className="icon" width={50} height={50}></Image>
                                    <span className="font-poppins text-4xl">02</span>
                                </div>
                                <p >Catching every typo, ensuring perfection</p>
                                <h4 className="mt-4 font-poppins text-2xl break-words">PROOFREADING</h4>
                            </div>
                            <div className="basis-1/2 brand-service-card-img relative">
                                <span class="square">
                                    <Link href="/proofreading">Read More</Link>
                                </span>
                                <div className="service-card-img">
                                    <Image src={"/brand-img/service-img2.png"} width={250} height={200}></Image>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 2 of 4 */}
                    <div className="brand-service-content flex mt-4 gap-4 flex-col md:flex-row aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <div className="brand-service-card flex gap-4">
                            <div className="basis-1/2 brand-service-card-img relative">
                                <span class="square">
                                    <Link href="/book-formatting">Read More</Link>
                                </span>
                                <div className="service-card-img">
                                    <Image src={"/brand-img/service-img3.webp"} width={270} height={200}></Image>
                                </div>
                            </div>
                            <div className="brand-service-card-content basis-1/2 relative">
                                <span className="right-4"></span>
                                <span className="bottom-4"></span>
                                <div className="flex justify-between mb-12">
                                    <Image src={"/brand-img/service-icon3.png"} className="icon" width={50} height={50}></Image>
                                    <span className="font-poppins text-4xl">03</span>
                                </div>
                                <p >Giving your words the perfect structure.</p>
                                <h4 className="mt-4 font-poppins text-2xl">BOOK FORMATTING</h4>
                            </div>
                        </div>
                        <div className="brand-service-card flex gap-4">
                            <div className="basis-1/2 brand-service-card-img relative">
                                <span class="square">
                                    <Link href="/typesetting-layout-adjustment">Read More</Link>
                                </span>
                                <div className="service-card-img">
                                    <Image src={"/brand-img/service-img4.webp"} width={250} className="icon" height={200}></Image>
                                </div>
                            </div>
                            <div className="brand-service-card-content gap-4 basis-1/2 relative">
                                <span className="right-4"></span>
                                <span className="bottom-4"></span>
                                <div className="flex justify-between mb-12">
                                    <Image src={"/brand-img/service-icon4.png"} className="icon" width={50} height={50}></Image>
                                    <span className="font-poppins text-4xl">04</span>
                                </div>
                                <p >Aligning your content with professional precision.</p>
                                <h4 className="mt-4 font-poppins text-2xl uppercase">Typesetting & Layout adjustment</h4>
                            </div>

                        </div>
                    </div>

                    {/* 4 of 6 */}
                    <div className="brand-service-content flex gap-4 mt-4 flex-col md:flex-row aos-init aos-animate" data-aos="fade-left" data-aos-duration="1000">
                        <div className="brand-service-card flex gap-4">
                            <div className="brand-service-card-content basis-1/2 relative">
                                <span className="right-5"></span>
                                <span className="bottom-5"></span>
                                <div className="flex justify-between mb-12">
                                    <Image src={"/brand-img/service-icon6.png"} width={50} className="icon" height={50}></Image>
                                    <span className="font-poppins text-4xl">05</span>
                                </div>
                                <p >Bringing your story to the shelves and screens of the world.</p>
                                <h4 className="mt-4 font-poppins text-2xl">BOOK PUBLISHING</h4>
                            </div>
                            <div className="basis-1/2 brand-service-card-img relative">
                                <span class="square">
                                    <Link href="/book-publishing">Read More</Link>
                                </span>
                                <div className="service-card-img">
                                    <Image src={"/brand-img/service-img6.webp"} width={250} height={200}></Image>
                                </div>
                            </div>
                        </div>
                        <div className="brand-service-card flex gap-4">
                            <div className="brand-service-card-content basis-1/2 relative">
                                <span className="right-5"></span>
                                <span className="bottom-5"></span>
                                <div className="flex justify-between mb-12">
                                    <Image src={"/brand-img/Printing Icon.png"} width={50} className="icon" height={50}></Image>
                                    <span className="font-poppins text-4xl">06</span>
                                </div>
                                <p>Streamline your book printing process with our expert Print-On-Demand Services</p>
                                <h4 className="mt-4 font-poppins text-2xl uppercase">Print On Demand</h4>
                            </div>
                            <div className="basis-1/2 brand-service-card-img relative">
                                <span class="square">
                                    <Link href="/print-on-demand">Read More</Link>
                                </span>
                                <div className="service-card-img">
                                    <Image src={"/brand-img/Print on Demand.jpg"} width={250} height={200}></Image>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="text-center">
                        <p className="font-poppins text-white mt-6 text-md">Discover the Difference: Our Publishing Service Puts Your Story Front and Center, <br></br> Guiding It from Conception to Bookshelf Success.</p>
                    </div> */}
                </div>
            </section>

            <section className="brand-service-section overflow-hidden block sm:block md:hidden lg:hidden ">
                <div className="max-w-screen-xl mx-auto px-4 my-20 relative">
                    <div className="text-center mb-6">
                        <h3 className="text-xl text-white font-poppins">Our Publishing</h3>
                        <h2 className="font-poppins text-5xl md:text-5xl text-white font-bold">Services</h2>
                        <p className="text-white pt-3">At Pine Book Publishing, we take your story from a rough draft to bookshelf-ready with our expert editing, publishing, and marketing services<br></br> Whether you want Self Publishing Services, lulu self publishing, or want to get your book published on any other retailer. We have covered all your needs. </p>
                    </div>

                    {/* 1 of 2 */}
                    <Swiper
                        // effect={"coverflow"}
                        // grabCursor={true}
                        // centeredSlides={true}
                        Autoplay={true}
                        slidesPerView={1}
                        loop={true}
                        className="mySwiper"
                        autoplay={{
                            delay: 2000,
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
                                spaceBetween: 10,
                                navigation: true,
                            },
                            "@1.00": {
                                slidesPerView: 1,
                                spaceBetween: 5,
                            },
                        }}
                    >




                        <div className="brand-service-content flex gap-4 flex-col md:flex-row aos-init aos-animate" data-aos="fade-left" data-aos-duration="1000">
                            <SwiperSlide>
                                <div className="brand-service-card flex gap-4">
                                    <div className="brand-service-card-content basis-1/2 relative">
                                        <span className="right"></span>
                                        <span className="bottom"></span>
                                        <div className="flex justify-between mb-12">
                                            <Image src={"/brand-img/service-icon1.png"} className="icon" width={50} height={50}></Image>
                                            <span className="font-poppins text-4xl">01</span>
                                        </div>
                                        <p >We turn your drafts into masterpieces.</p>
                                        <h4 className="mt-4 font-poppins text-2xl">BOOK EDITING</h4>
                                    </div>
                                    <div className="basis-1/2 brand-service-card-img relative">
                                        <span class="square">
                                            <Link href="/book-editing">Read More</Link>
                                        </span>
                                        <div className="service-card-img">
                                            <Image src={"/brand-img/service-img1.png"} width={250} height={200}></Image>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="brand-service-card flex gap-4">
                                    <div className="brand-service-card-content basis-1/2 relative">
                                        <span className="right"></span>
                                        <span className="bottom"></span>
                                        <div className="flex justify-between mb-12">
                                            <Image src={"/brand-img/service-icon2.png"} className="icon" width={50} height={50}></Image>
                                            <span className="font-poppins text-4xl">02</span>
                                        </div>
                                        <p >Catching every typo, ensuring perfection</p>
                                        <h4 className="mt-4 font-poppins text-2xl break-words">PROOFREADING</h4>
                                    </div>
                                    <div className="basis-1/2 brand-service-card-img relative">
                                        <span class="square">
                                            <Link href="/proofreading">Read More</Link>
                                        </span>
                                        <div className="service-card-img">
                                            <Image src={"/brand-img/service-img2.png"} width={250} height={200}></Image>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </div>
                        {/* 2 of 4 */}
                        <div className="brand-service-content flex mt-4 gap-4 flex-col md:flex-row aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                            <SwiperSlide>
                                <div className="brand-service-card flex gap-4">
                                    <div className="basis-1/2 brand-service-card-img relative">
                                        <span class="square">
                                            <Link href="/book-formatting">Read More</Link>
                                        </span>
                                        <div className="service-card-img">
                                            <Image src={"/brand-img/service-img3.webp"} width={270} height={200}></Image>
                                        </div>
                                    </div>
                                    <div className="brand-service-card-content basis-1/2 relative">
                                        <span className="right-4"></span>
                                        <span className="bottom-4"></span>
                                        <div className="flex justify-between mb-12">
                                            <Image src={"/brand-img/service-icon3.png"} className="icon" width={50} height={50}></Image>
                                            <span className="font-poppins text-4xl">03</span>
                                        </div>
                                        <p >Giving your words the perfect structure.</p>
                                        <h4 className="mt-4 font-poppins text-2xl">BOOK FORMATTING</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="brand-service-card flex gap-4">
                                    <div className="basis-1/2 brand-service-card-img relative">
                                        <span class="square">
                                            <Link href="/typesetting-layout-adjustment">Read More</Link>
                                        </span>
                                        <div className="service-card-img">
                                            <Image src={"/brand-img/service-img4.webp"} width={250} className="icon" height={200}></Image>
                                        </div>
                                    </div>
                                    <div className="brand-service-card-content gap-4 basis-1/2 relative">
                                        <span className="right-4"></span>
                                        <span className="bottom-4"></span>
                                        <div className="flex justify-between mb-12">
                                            <Image src={"/brand-img/service-icon4.png"} className="icon" width={50} height={50}></Image>
                                            <span className="font-poppins text-4xl">04</span>
                                        </div>
                                        <p >Aligning your content with professional precision.</p>
                                        <h4 className="mt-4 font-poppins text-2xl uppercase">Typesetting & Layout adjustment</h4>
                                    </div>

                                </div>
                            </SwiperSlide>
                        </div>

                        {/* 4 of 6 */}
                        <div className="brand-service-content flex gap-4 mt-4 flex-col md:flex-row aos-init aos-animate" data-aos="fade-left" data-aos-duration="1000">
                            <SwiperSlide>
                                <div className="brand-service-card flex gap-4">
                                    <div className="brand-service-card-content basis-1/2 relative">
                                        <span className="right-5"></span>
                                        <span className="bottom-5"></span>
                                        <div className="flex justify-between mb-12">
                                            <Image src={"/brand-img/service-icon6.png"} width={50} className="icon" height={50}></Image>
                                            <span className="font-poppins text-4xl">05</span>
                                        </div>
                                        <p >Bringing your story to the shelves and screens of the world.</p>
                                        <h4 className="mt-4 font-poppins text-2xl">BOOK PUBLISHING</h4>
                                    </div>
                                    <div className="basis-1/2 brand-service-card-img relative">
                                        <span class="square">
                                            <Link href="/book-publishing">Read More</Link>
                                        </span>
                                        <div className="service-card-img">
                                            <Image src={"/brand-img/service-img6.webp"} width={250} height={200}></Image>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="brand-service-card flex gap-4">
                                    <div className="brand-service-card-content basis-1/2 relative">
                                        <span className="right-5"></span>
                                        <span className="bottom-5"></span>
                                        <div className="flex justify-between mb-12">
                                            <Image src={"/brand-img/Printing Icon.png"} width={50} className="icon" height={50}></Image>
                                            <span className="font-poppins text-4xl">06</span>
                                        </div>
                                        <p>Streamline your book printing process with our expert Print-On-Demand Services</p>
                                        <h4 className="mt-4 font-poppins text-2xl uppercase">Print On Demand</h4>
                                    </div>
                                    <div className="basis-1/2 brand-service-card-img relative">
                                        <span class="square">
                                            <Link href="/print-on-demand">Read More</Link>
                                        </span>
                                        <div className="service-card-img">
                                            <Image src={"/brand-img/Print on Demand.jpg"} width={250} height={200}></Image>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </div>
                    </Swiper>

                    {/* <div className="text-center">
                        <p className="font-poppins text-white mt-6 text-md">Discover the Difference: Our Publishing Service Puts Your Story Front and Center, <br></br> Guiding It from Conception to Bookshelf Success.</p>
                    </div> */}
                </div>
            </section>
        </>
    );
}