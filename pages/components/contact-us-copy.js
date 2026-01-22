import {React , useRef} from "react";
import Image from "next/image";
import Head from "next/head";
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
      




export default function ContactCopy() {

  
        const swiperRef2 = useRef(null);
          const ImageSlides = [
              {
                  id: 1,
                  src: "/images/b1.png",
              },
              {
                  id: 2,
                  src: "/images/b2.png",
              },
              {
                  id: 3,
                  src: "/images/b3.png",
              },
              {
                id: 4,
                src: "/images/b3.png",
            }
              

          ];


          const swiperRefThree = useRef(null);
          const ImageSlidesThree = [
              {
                  id: 1,
                  src: "/images/big1.png",
              },
              {
                  id: 2,
                  src: "/images/big2.png",
              },
              {
                  id: 3,
                  src: "/images/big3.png",
              },
              {
                id: 4,
                src: "/images/big1.png",
                }
        
          ];  
      



    return (
        <>
            <Head>
                <title>Get in Touch | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Our team of experts are ready to assist you with all your queries. Contact us now and get all your questions answered in no time. "
                />
                <link rel="shortcut icon" href="/images/fav.webp" />
            </Head>
            

            
            <section className="firstslider pt-8">

                <div className="container mx-auto relative w-[80%]">
                    <h1 className="text-5xl font-bold mb-28 text-center">Browse our design portfolio</h1>

                    <h2 className="text-3xl font-medium mb-5 ml-16">Book Cover Design</h2>
                <Swiper
                    
                    grabCursor={true}
                    slidesPerView={3}
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
                    <div className="bk-sil2 prev" onClick={() => swiperRef2.current?.slidePrev()}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <div className="bk-sil2 next" onClick={() => swiperRef2.current?.slideNext()}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>

                    <hr class="h-[2px] bg-gray-100 dark:bg-gray-600 my-10 border-none" />

                </div>

                
            </section>




            <section className="Secondslider pt-8">
                    <div className="container mx-auto relative w-[80%]">
                    <h2 className="text-3xl font-medium mb-5 mr-16 text-right">Author Websites</h2>

                    <Swiper
                        
                        grabCursor={true}
                        slidesPerView={3}
                        loop={true}
                        coverflowEffect={{
                            stretch: 0,
                        }}
                        onBeforeInit={(swiper) => {
                            swiperRefThree.current = swiper;
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation]}
                        className="mySwiper3"
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
                            {ImageSlidesThree.map((Secslider) => (
                                <SwiperSlide key={Secslider.id} className="text-center">
                                        <Image className='inline pb-4' src={Secslider.src} height={260} width={370}></Image>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="bk-sil3 prev" onClick={() => swiperRefThree.current?.slidePrev()}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </div>
                        <div className="bk-sil3 next" onClick={() => swiperRefThree.current?.slideNext()}>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                        <hr class="h-[2px] bg-gray-100 dark:bg-gray-600 my-10 border-none" />

                    </div>
            </section>
        
            


            
        </>
    );
}
