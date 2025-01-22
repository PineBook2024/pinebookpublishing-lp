// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { faLocation } from "@fortawesome/free-solid-svg-icons";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// export default function BrandTestimonial() {

//     return (
//         <>
//             <section className="brand-testimonials-section overflow-hidden">
//                 <div className="max-w-screen-xl mx-auto px-4 my-20 relative py-22">
//                     <div className="text-center mb-6">
//                         <h2 className="font-poppins text-4xl text-black font-bold">TESTIMONIALS</h2>
//                     </div>
//                     <div className="flex justify-center gap-5 flex-col md:flex-row">
//                         <div className="brand-testimonials-card relative aos-init aos-animate" data-aos="flip-left">
//                             <Link href={"https://www.trustpilot.com/reviews/65e634c30515c28c7a696898"} target="_blank">
//                                 <div className="flex justify-between items-center mb-5">
//                                     <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
//                                     <div className="flex items-center relative left-2">
//                                         <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
//                                         <span className="text-white">US</span>
//                                     </div>
//                                 </div>
//                                 <h2 className="font-poppins text-xl font-bold pt-3">They care about your work and your dream.</h2>
//                                 <p className="mb-5 pt-2">Finally a publisher that cares about your work instead of how much money you have. This has to be one of the smoothest processes in my life. They were very attentive to my vision and treated my work with care. I’ll be using them again they earned every cent.</p>
//                                 <span className="absolute bottom-0 mb-2">Angel Raices, Mar 4, 2024</span>
//                             </Link>
//                         </div>
// <div className="brand-testimonials-card relative aos-animate" data-aos="flip-right">
//     <Link href={"https://www.trustpilot.com/reviews/65cfa55b11cc649a184c90bb"} target="_blank">
//         <div className="flex justify-between items-center mb-5">
//             <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
//             <div className="flex items-center relative left-2">
//                 <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
//                 <span className="text-white">US</span>
//             </div>
//         </div>
//         <h2 className="font-poppins text-xl font-bold pt-3">Good Work on Publishing</h2>
//         <p className="mb-5 pt-2">Pine Book Writing did a good job on printing and delivering copies of my book of poetry written in Russian. They did it expeditiously and in promised time, actually, a bit faster. The quality of the paper used and printing was quite adequate. Ryan Peters, the publication manager, was very approachable, friendly, and quick to reply to my requests and questions. Dealing with Damon, the owner, was a good experience as well.</p>
//         <span className="absolute bottom-0 mb-2">Fima, Feb 16, 2024</span>
//     </Link>
// </div>
// <div className="brand-testimonials-card relative aos-animate" data-aos="flip-left">
//     <Link href={"https://www.trustpilot.com/reviews/65b05e047f36b28f2c54c185"} target="_blank">
//         <div className="flex justify-between items-center mb-5">
//             <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
//             <div className="flex items-center relative left-2">
//                 <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
//                 <span className="text-white">US</span>
//             </div>
//         </div>
//         <h2 className="font-poppins text-xl font-bold pt-3">Pine Book Writers A+</h2>
//         <p className="mb-5 pt-2">Steve, Ryan & the team has been helpful getting my book together. The whole team is easy to work with. Steve is great, at explaining the packages and the steps moving forward, so you can accomplish your goal. They’re also very responsive with any questions you may have. I can definitely see myself having a long time partnership with Pine. I spoke with the owner Damon, very nice guy, he has passion for this line of work. If you’re looking for a company that can help with self publishing , marketing & promotion. Pine Book Writers is definitely the company you want & need.</p>
//         <span className="absolute bottom-0 mb-2">Re-G Wade, Jan 23, 2024</span>
//     </Link>
// </div>
//                     </div>
//                     <div className="flex justify-center gap-5 mt-5 flex-col md:flex-row">
// <div className="brand-testimonials-card relative aos-animate" data-aos="flip-up" data-aos-delay="0" data-aos-duration="500">
//     <Link href={"https://www.trustpilot.com/users/64ed33d046ee6200126f1c6c"} target="_blank">
//         <div className="flex justify-between items-center mb-5">
//             <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
//             <div className="flex items-center relative left-2">
//                 <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
//                 <span className="text-white">US</span>
//             </div>
//         </div>
//         <h2 className="font-poppins text-xl font-bold pt-3">Pine books and their associates are…</h2>
//         <p className="mb-5 pt-2">Pine books and their associates are excellent. Everyone is helpful and care about you, your ideas, and how hard you've worked with your manuscript. Steve, Lia, Ryan, and David go beyond their job. They deserve a raise. I recommend Pine books for all your writing needs.</p>
//         <span className="absolute bottom-0 mb-2">Katie Loftis, Dec 7, 2023</span>
//     </Link>
// </div>
//                         <div className="brand-testimonials-card relative aos-animate" data-aos="flip-right"  data-aos-easing="ease-out-cubic" data-aos-delay="0" data-aos-duration="500">
//                             <Link href={"https://www.trustpilot.com/users/655d16952309f20012b30090"} target="_blank">
//                                 <div className="flex justify-between items-center mb-5">
//                                     <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
//                                     <div className="flex items-center relative left-2">
//                                         <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
//                                         <span className="text-white">US</span>
//                                     </div>
//                                 </div>
//                                 <h2 className="font-poppins text-xl font-bold pt-3">Awesome Publishing Company</h2>
//                                 <p className="mb-5 pt-2">The team at Pine Book Writing are the best!!!! They were so professional and friendly throughout the entire process. I "LOVE" the outcome of my book and I look forward to working with them again on my next project.</p>
//                                 <span className="absolute bottom-0 mb-2">Stacey, Nov 21, 2023</span>
//                             </Link>
//                         </div>
//                         <div className="brand-testimonials-card relative aos-animate" data-aos="flip-down" data-aos-delay="0" data-aos-duration="500">
//                             <Link href={"https://www.trustpilot.com/reviews/65046b6a51ad4908c7039d10"} target="_blank">
//                                 <div className="flex justify-between items-center mb-5">
//                                     <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
//                                     <div className="flex items-center relative left-2">
//                                         <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
//                                         <span className="text-white">CA</span>
//                                     </div>
//                                 </div>
//                                 <h2 className="font-poppins text-xl font-bold pt-3">
//                                     Timely review of the proof reading process</h2>
//                                 <p className="mb-5 pt-2">I got timely feedback on the proof reading process. The project was on schedule and I got useful tips on how to improve the overall quality of my writing</p>
//                                 <span className="absolute bottom-0 mb-2">Edward Agbai, Sep 15, 2023</span>
//                             </Link>
//                         </div>
//                     </div>
//                     <p className="font-poppins mb-2 text-center mt-8 text-3xl">Rated 4.5 / 5 Based on 21 Reviews. Showing our latest reviews.</p>
//                 </div>
//             </section>
//         </>
//     );
// }

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/navigation";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Navigation, Pagination, Autoplay } from "swiper";

export default function BrandTestimonial() {
    const swiperRef2 = useRef(null);
    return (
        <section className="brand-testimonials-section overflow-hidden">
            <div className="max-w-screen-xl mx-auto px-4 mt-20 mb-10 relative py-22">
                <div className="text-center mb-6">
                    <h2 className="font-poppins text-4xl text-black font-bold">TESTIMONIALS</h2>
                </div>
                {/* Custom Previous Button */}
                <div
                    className="absolute top-1/2 -left-10 transform -translate-y-1/2 bk-sil3 portfoilio-slider4-icon prev cursor-pointer"
                    onClick={() => swiperRef2.current?.slidePrev()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color="#000" width={18} />
                </div>
                {/* Swiper Slider */}
                <Swiper
                    spaceBetween={30}
                    slidesPerView={3}
                    loop={true}
                    autoplay={true}
                    onSwiper={(swiper) => (swiperRef2.current = swiper)}
                    className="mySwiper"
                    breakpoints={{
                        "@0.00": {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        "@1.00": {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                    }}
                >
                    <SwiperSlide>
                        <div className="brand-testimonials-card relative aos-init aos-animate" data-aos="flip-left">
                            <Link href={"https://www.trustpilot.com/reviews/670ebb76b0812c1bb50e9102"} target="_blank">
                                <div className="flex justify-between items-center mb-5">
                                    <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
                                    <div className="flex items-center relative left-2">
                                        <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
                                        <span className="text-white">US</span>
                                    </div>
                                </div>
                                <h2 className="font-poppins text-xl font-bold pt-3">Aside from issues on what I wanted…</h2>
                                <p className="mb-5 pt-2">Aside from issues on what I wanted regarding cover art and stuff regarding my first PM, I’ve been enjoying working with Pine Book. Thanks to my new PM Amara I’m feeling more confident about my book once it’s done as like with any soon to be publisher/author they’ll wonder if their work will do well and make many want to read it. Whatever happens I’m confident that things will go well especially with my continued partnership with Pine Book.</p>
                                <span className="absolute bottom-0 mb-2">EvanF, Oct 16, 2024</span>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="brand-testimonials-card relative aos-animate" data-aos="flip-right">
                            <Link href={"https://www.trustpilot.com/reviews/670ec0c34bd9530b421c7a35"} target="_blank">
                                <div className="flex justify-between items-center mb-5">
                                    <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
                                    <div className="flex items-center relative left-2">
                                        <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
                                        <span className="text-white">US</span>
                                    </div>
                                </div>
                                <h2 className="font-poppins text-xl font-bold pt-3">I came to Pine Book Writing to…</h2>
                                <p className="mb-5 pt-2">I came to Pine Book Writing to re-launch my books. My project manager was Lia and she helped me so much with the editing process which, is by far the hardest thing to do. She then helped me with my covers and I know it wasn’t easy but, Lia knew I had a vision and she helped me recreate it! Thank you to everyone that assisted on this project!!!</p>
                                <span className="absolute bottom-0 mb-2">Unique Spencer, Oct 16, 2024</span>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="brand-testimonials-card relative aos-animate" data-aos="flip-left">
                            <Link href={"https://www.trustpilot.com/reviews/66d8f839c119e14570f3cc3a"} target="_blank">
                                <div className="flex justify-between items-center mb-5">
                                    <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
                                    <div className="flex items-center relative left-2">
                                        <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
                                        <span className="text-white">US</span>
                                    </div>
                                </div>
                                <h2 className="font-poppins text-xl font-bold pt-3">Highly recommended</h2>
                                <p className="mb-5 pt-2">After two disappointing experiences with other publishers, I finally found Pine Book Writing, and it was a game-changer. Their professionalism was outstanding, and working with them was a pleasure. Steve, Ryan, and Fiona were exceptional, guiding me through every step of the project with expertise and care. I highly recommend Pine Book Writing for anyone seeking a top-notch publishing experience.</p>
                                <span className="absolute bottom-0 mb-2">Mary Gunn, Sep 5, 2024</span>
                            </Link>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="brand-testimonials-card relative aos-animate" data-aos="flip-up" data-aos-delay="0" data-aos-duration="500">
                            <Link href={"https://www.trustpilot.com/users/64ed33d046ee6200126f1c6c"} target="_blank">
                                <div className="flex justify-between items-center mb-5">
                                    <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
                                    <div className="flex items-center relative left-2">
                                        <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
                                        <span className="text-white">US</span>
                                    </div>
                                </div>
                                <h2 className="font-poppins text-xl font-bold pt-3">Top notch from beginning to end</h2>
                                <p className="mb-5 pt-2">Top notch from beginning to end. Finally found a publishing company who does what they promise. Lia and the group at Pine book is the real deal. I'm not easy to work with, because I expect to get what I pay for. Let me tell you I got everything and more. They delivered my book when they said they would and followed up even after the release to make sure I was still happy with everything. They made this more enjoyable by keeping me in the loop the whole time. Also they weren’t pushy, they did it the way I asked. Will definitely turn to them for my second book. If you want a fair price and the best service look no further. Thank you Pine book.</p>
                                <span className="absolute bottom-0 mb-2">BigKid Gamez, Sep 13, 2024</span>
                            </Link>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="brand-testimonials-card relative aos-animate" data-aos="flip-right" data-aos-easing="ease-out-cubic" data-aos-delay="0" data-aos-duration="500">
                            <Link href={"https://www.trustpilot.com/reviews/6659123899d40666a7b06b45"} target="_blank">
                                <div className="flex justify-between items-center mb-5">
                                    <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
                                    <div className="flex items-center relative left-2">
                                        <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
                                        <span className="text-white">US</span>
                                    </div>
                                </div>
                                <h2 className="font-poppins text-xl font-bold pt-3">This is John Bowman</h2>
                                <p className="mb-5 pt-2">This is John Bowman. I would just love to give a shout out to Pine Book Writing, my experience with them has really been beyond words. From.Lia Sinclair, Damon Peters for taking me on. I am a Christian and it has been an answer to my prayers after 4 1/2 years looking for an honest publisher thank you all so much.</p>
                                <span className="absolute bottom-0 mb-2">John Bowman, May 30, 2024</span>
                            </Link>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="brand-testimonials-card relative aos-animate" data-aos="flip-down" data-aos-delay="0" data-aos-duration="500">
                            <Link href={"https://www.trustpilot.com/reviews/669d127512bc98c19572c5d1"} target="_blank">
                                <div className="flex justify-between items-center mb-5">
                                    <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
                                    <div className="flex items-center relative left-2">
                                        <FontAwesomeIcon icon={faLocation} color="#fff" className="me-2" width={20} />
                                        <span className="text-white">CA</span>
                                    </div>
                                </div>
                                <h2 className="font-poppins text-xl font-bold pt-3">
                                    results for value.</h2>
                                <p className="mb-5 pt-2">I had a great experience because as a first-time author I didn't really know the process. They helped walk me through the process step by step. Whenever I needed to talk with them, they made time for me. We had a big project, and they helped me finish it. My time spent with Pine Book Publishing produced results. They helped me finish my project and for that I am very thankful.</p>
                                <span className="absolute bottom-0 mb-2">kyle climer, Jul 21, 2024</span>
                            </Link>
                        </div>
                    </SwiperSlide>
                    
                </Swiper>
                {/* Custom Next Button */}
                <div
                    className="absolute top-1/2 -right-10 transform -translate-y-1/2 bk-sil3 portfoilio-slider4-icon next cursor-pointer"
                    onClick={() => swiperRef2.current?.slideNext()}
                >
                    <FontAwesomeIcon icon={faArrowRight} color="#000" width={18} />
                </div>
                <p className="font-poppins mb-2 text-center mt-8 text-3xl">Rated 4.5 / 5 Based on 21 Reviews. Showing our latest reviews.</p>
            </div>
        </section>
    );
}
