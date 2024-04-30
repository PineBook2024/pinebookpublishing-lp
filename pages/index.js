import useHubspotForm from "@/hooks/hubspot";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css/effect-coverflow";
import Header from "./components/header";
import Hero from "./components/hero";
import HeroForm from "./components/herform";
import Footer from "./components/Footer";
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
import AnimateFade from "./components/fade";
import { useRouter } from 'next/navigation';

library.add(faArrowLeft, faArrowRight);
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  nodeRef,
  rounded,
} from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";



export default function Home() {
  const router = useRouter();
  // Form Integration
  const { submitContactForm } = useHubspotForm();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    const setters = {
      fullName: setFullName,
      email: setEmail,
      message: setMessage,
      phoneNumber: setPhoneNumber,
    };

    const setter = setters[name];
    if (setter) {
      setter(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await submitContactForm(
      email,
      fullName,
      phoneNumber,
      message
    );
    if (response) {
      setShowSuccess(true);
      router.push('/thankyou') 
      setTimeout(() => {
        setShowSuccess(false);
        setEmail("");
        setFullName("");
        setPhoneNumber("")
        setMessage("");
      }, 3000);
    }

    console.log("response", response);
  };
  const swiperRef = useRef();
  const swiperRef2 = useRef();

  const [openFAQ, setOpenFAQ] = useState(0);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Open Chat Click
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://static.zdassets.com/ekr/snippet.js?key=6ad75b0f-d085-4cae-9a7a-48abeb69b973";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleOpenChat = () => {
    window.zE && window.zE('webWidget', 'open');
  };


  const faqData = [
    { question: "How do I self-publish my book?", answer: "Self-publishing your book with Pine Book Publishing is simple. Start by submitting your manuscript, and our team will guide you through the editing, formatting, and cover design process." },
    { question: "Is publishing a book difficult?", answer: "Publishing a book doesn't have to be difficult, especially with Pine Book Publishing's support." },
    { question: "What is an ISBN and do I need one?", answer: "An ISBN (International Standard Book Number) is a unique identifier for your book used by retailers, libraries, and distributors." },
    { question: "Will I need to have my book copyrighted?", answer: "While your book is automatically copyrighted upon creation, registering your copyright provides additional legal protection." },
    { question: "Do you offer design services?", answer: "Yes, Pine Book Publishing offers comprehensive design services, including cover design, typesetting, and layout adjustment." },
    { question: "How do you handle distribution and marketing of books?", answer: "Pine Book Publishing handles distribution and marketing for your books, ensuring they reach the widest audience possible." }
  ];




  const settings = {
    // slidesPerView: 3,
    // speed: 500,
    // loop: true,
    // speed:1000,
    // arrows:true,
    // autoplay:true,
    // autoplay: {
    //   delay: 300
    // },
    breakpoints: {
      414: {
        slidesPerView: 2,
        navigation: false,
        Pagination: false,
      },
      768: {
        slidesPerView: 2,
        navigation: false,
        Pagination: false,
      },
      1024: {
        slidesPerView: 3,
        autoplay: {
          delay: 200,
        },
      },
    },
  };

  function Counter({ from, to, val }) {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => {
      return Math.round(latest) + val;
    });
    const nodeRef = useRef(null);
    const inView = useInView(nodeRef);

    useEffect(() => {
      if (inView) {
        animate(count, to, { duration: 2 });
      }
    }, [count, inView, to]);
    return (
      <motion.p className="font-majallab text-black" ref={nodeRef}>
        {rounded}
      </motion.p>
    );
  }

  return (
    <>
      <Head>
        <title>Book Publishing Services | Pine Book Publishing</title>
        <meta
          name="description"
          content="Hire Professional Book Publishing company. At Pine Book Publishing, we provide to comprehensive book publishing services. Your Trusted Book Writing Partners In The USA And Canada."
        />
         <link rel="shortcut icon" href="/images/fav.png" />
      </Head>
      <main>
        <Header />
        <Hero Component={HeroForm} />

        <section className="brnd-slider bg-black overflow-hidden">
          <AnimateFade type={"right"}>
            <div className="container grid grid-cols-1 width-container position-relative">
              <div className="container mx-auto position-relative">
                <div className="book-sell-text ">
                  <h3 className="font-majallab text-xl md:text-2xl leading-3 font-bold">Sell Your <br></br> <span>Book With</span></h3>
                </div>
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
                        pagination: false,
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
                        <a href="https://goo.gl/maps/D6kJBoXBJYwcZWkP7">
                          <Image
                            alt="LOGO"
                            src={"/images/logo1.png"}
                            width={100}
                            height={80}
                            className="custom-logo-size"
                          />
                        </a>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="flex justify-center">
                        <a href="https://www.bbb.org/ca/on/richmond-hill/profile/publishers-book/pine-book-writing-inc-0107-1406919">
                          <Image
                            alt="LOGO"
                            src={"/images/logo2.png"}
                            width={100}
                            height={80}
                          />
                        </a>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="flex justify-center">
                        <a href="https://www.trustpilot.com/review/pinebookwriting.com">
                          <Image
                            alt="LOGO"
                            src={"/images/logo3.png"}
                            width={100}
                            height={80}
                          />
                        </a>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="flex justify-center">
                        <a href="https://www.yelp.com/biz/pine-book-writing-richmond-hill">
                          <Image
                            alt="LOGO"
                            src={"/images/logo4.png"}
                            width={100}
                            height={120}
                            className="custom-logo-size"
                          />
                        </a>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="flex justify-center">
                        <a href="https://clutch.co/profile/pine-book-writing">
                          <Image
                            alt="LOGO"
                            src={"/images/logo5.png"}
                            width={100}
                            height={80}
                          />
                        </a>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="flex justify-center">
                        <a href="https://clutch.co/profile/pine-book-writing">
                          <Image
                            alt="LOGO"
                            src={"/images/logo6.png"}
                            width={100}
                            height={80}
                          />
                        </a>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="flex justify-center">
                        <a href="https://clutch.co/profile/pine-book-writing">
                          <Image
                            alt="LOGO"
                            src={"/images/logo7.png"}
                            width={100}
                            height={80}
                          />
                        </a>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="flex justify-center">
                        <a href="https://clutch.co/profile/pine-book-writing">
                          <Image
                            alt="LOGO"
                            src={"/images/logo8.png"}
                            width={100}
                            height={80}
                          />
                        </a>
                      </div>
                    </SwiperSlide>


                    {/* <SwiperSlide>
                  <div>
                    <a href="https://clutch.co/profile/pine-book-writing">
                      <Image
                        alt="LOGO"
                        src={"/images/s1.png"}
                        width={150}
                        height={60}
                      />
                    </a>
                  </div>
                </SwiperSlide> */}
                  </Swiper>
                </div>
              </div>
            </div>
          </AnimateFade>
        </section>


        <section className="about pt-14 overflow-hidden">
          <div className="container mx-auto px-5 md:px-0 w-100 lg:w-5/6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center">
              <AnimateFade type={"top"}>
                <div className="abt-txt m1-h p1">
                  <h3 className="font-majallab text-3xl md:text-7xl" >
                    About Us<span>Pine Book Publishing</span>
                  </h3>
                  <p>
                    Celebrate your tales with Pine Book Publishing, a book
                    publishing company that specializes in bringing authors' visions
                    to life through professional book publishing services. Our team
                    of skilled professionals is committed to guide you through every
                    step of the publishing process, ensuring your book captivates
                    readers and makes an everlasting impact worldwide.
                  </p>
                </div>
              </AnimateFade>
              <div className="abt-pic text-center">
                <AnimateFade type={"left"}>
                  <Image src={"/images/abt-pic.png"} width={500} height={570} />
                </AnimateFade>
              </div>
            </div>

            <div className="book-joun relative p-5 rounded-lg md:p-10 mb-9">
              <div className="text-center">
                <Swiper
                  className="px-20"
                  spaceBetween={15}
                  slidesPerView={3}
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
                      spaceBetween: 10,
                      navigation: {
                        enabled: true,
                      },
                      pagination: false,
                      navigation: true,
                    },
                    "@1.00": {
                      slidesPerView: 3,
                      spaceBetween: 15,
                    },
                  }}
                >
                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row justify-between items-center">
                      <Image
                        src={"/images/b1.png"}
                        width={100}
                        height={100}
                      ></Image>
                      <p className="p-4">
                        Indulge in tales of love, passion, and heartwarming
                        connections.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row items-center">
                      <Image
                        src={"/images/b2.png"}
                        width={100}
                        height={100}
                      ></Image>
                      <p className="p-4">
                        Indulge in tales of love, passion, and heartwarming
                        connections.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row items-center">
                      <Image
                        src={"/images/b3.png"}
                        width={100}
                        height={100}
                      ></Image>
                      <p className="p-4">
                        Indulge in tales of love, passion, and heartwarming
                        connections.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row items-center">
                      <Image
                        src={"/images/b4.png"}
                        width={100}
                        height={100}
                      ></Image>
                      <p className="p-4">
                        Indulge in tales of love, passion, and heartwarming
                        connections.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row items-center">
                      <Image
                        src={"/images/b5.png"}
                        width={100}
                        height={100}
                      ></Image>
                      <p className="p-4">
                        Indulge in tales of love, passion, and heartwarming
                        connections.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row items-center">
                      <Image
                        src={"/images/b6.png"}
                        width={100}
                        height={100}
                      ></Image>
                      <p className="p-4">
                        Indulge in tales of love, passion, and heartwarming
                        connections.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row items-center">
                      <Image
                        src={"/images/b7.png"}
                        width={100}
                        height={100}
                      ></Image>
                      <p className="p-4">
                        Indulge in tales of love, passion, and heartwarming
                        connections.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row items-center">
                      <Image
                        src={"/images/b8.png"}
                        width={100}
                        height={100}
                      ></Image>
                      <p className="p-4">
                        Indulge in tales of love, passion, and heartwarming
                        connections.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row items-center">
                      <Image
                        src={"/images/b9.png"}
                        width={100}
                        height={100}
                      ></Image>
                      <p className="p-4">
                        Indulge in tales of love, passion, and heartwarming
                        connections.
                      </p>
                    </div>
                  </SwiperSlide>
                </Swiper>
                <div class="bk-sil prev cursor-pointer" onClick={() => swiperRef.current?.slidePrev()}><FontAwesomeIcon icon={faArrowLeft} /></div>
                <div class="bk-sil next cursor-pointer" onClick={() => swiperRef.current?.slideNext()}><FontAwesomeIcon icon={faArrowRight} /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="portfolio overflow-hidden	 py-14 bg-[url('/images/port-banner.png')]">
          <div className="grid grid-cols-1 ">
            <div className="container mx-auto text-center">
              <div className="portfolio-h m1-h">
                <h3 className="font-majallab text-3xl md:text-7xl">
                  Unveiling Our Authors’ Creations:
                  <br />
                  <span>Book Showcase</span>
                </h3>
              </div>

              <div className="block md:hidden lg:hidden">
                <Swiper
                  className="px-20 gap-x-32 "
                  spaceBetween={15}
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
                      spaceBetween: 10,

                      navigation: {
                        enabled: false,
                      },
                      pagination: false,
                      navigation: true,
                    },
                    "@1.00": {
                      slidesPerView: 1,
                      spaceBetween: 15,
                    },
                  }}
                >
                  <SwiperSlide className="mx-auto text-center">
                    <div className="flex justify-center">
                      <Image src={"/images/bb1-min.webp"} width={260} height={289} data-aos="fade-right" data-aos-delay="200" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="flex justify-center">
                      <Image src={"/images/bb5-min.webp"} width={260} height={289} data-aos="fade-up" data-aos-delay="200" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="flex justify-center">
                      <Image src={"/images/bb8-min.webp"} width={260} height={289} data-aos="fade-up" data-aos-delay="200" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="flex justify-center">
                      <Image src={"/images/bb4-min.webp"} width={260} height={289} data-aos="fade-left" data-aos-delay="200" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="flex justify-center">
                      <Image src={"/images/bb3-min.webp"} width={260} height={289} data-aos="fade-right" data-aos-delay="200" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="flex justify-center">
                      <Image src={"/images/bb6-min.webp"} width={260} height={289} data-aos="fade-up" data-aos-delay="200" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="flex justify-center">
                      <Image src={"/images/bb7-min.webp"} width={260} height={289} data-aos="fade-up" data-aos-delay="200" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="flex justify-center">
                      <Image src={"/images/bb2-min.webp"} width={260} height={289} data-aos="fade-right" data-aos-delay="200" />
                    </div>
                  </SwiperSlide>
                </Swiper>

              </div>


              <div className="grid grid-cols-4 gap-4 width-container books-collage">
                <div>
                  <Image src={"/images/bb1-min.webp"} width={260} height={289} data-aos="fade-right" data-aos-delay="200" />
                </div>
                <div>
                  <Image src={"/images/bb5-min.webp"} width={260} height={289} data-aos="fade-up" data-aos-delay="200" />
                </div>
                <div>
                  <Image src={"/images/bb8-min.webp"} width={260} height={289} data-aos="fade-up" data-aos-delay="200" />
                </div>
                <div>
                  <Image src={"/images/bb4-min.webp"} width={260} height={289} data-aos="fade-left" data-aos-delay="200" />
                </div>
                <div>
                  <Image src={"/images/bb3-min.webp"} width={260} height={289} data-aos="fade-right" data-aos-delay="200" />
                </div>
                <div>
                  <Image src={"/images/bb6-min.webp"} width={260} height={289} data-aos="fade-up" data-aos-delay="200" />
                </div>
                <div>
                  <Image src={"/images/bb7-min.webp"} width={260} height={289} data-aos="fade-up" data-aos-delay="200" />
                </div>
                <div>
                  <Image src={"/images/bb2-min.webp"} width={260} height={289} data-aos="fade-right" data-aos-delay="200" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="package py-14 overflow-hidden">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 mb-14 items-center m1-h text-center">
              <h3 className="font-majallab text-5xl md:text-7xl">
                Publishing Packages
              </h3>
            </div>

            {/* <div className="grid grid-cols-4 gap-4  items-top"> */}
            <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 width-container">
              <div className="pack-wrap gap-8" data-aos="fade-right" data-aos-delay="200">
                <div className="pack-box flex items-center">
                  <Image src={"/images/pp1.png"} width={40} height={50}></Image>
                  <h4 className="pl-2 font-majallab text-2xl md:text-3xl">
                    Beginner
                  </h4>
                </div>
                <p>
                  Launch your book with our Beginner Package, offering
                  comprehensive editing, custom cover art, multi-platform
                  formatting, Amazon optimization, 1 ISBN, and full royalties with
                  a few paperback copies.
                </p>
              </div>

              <div className="pack-wrap" data-aos="fade-down" data-aos-delay="200">
                <div className="pack-box flex items-center">
                  <Image src={"/images/pp2.png"} width={40} height={50}></Image>
                  <h4 className="pl-2 font-majallab text-2xl md:text-3xl">
                    Standard
                  </h4>
                </div>
                <p>
                  Enhance your publishing experience with our Standard Package,
                  which ensures meticulous editing, versatile publishing options
                  and 2 ISBNs, complete with a full suite of formats and copies
                  for distribution.
                </p>
              </div>

              <div className="pack-wrap" data-aos="fade-up" data-aos-delay="200">
                <div className="pack-box flex items-center">
                  <Image src={"/images/pp3.png"} width={40} height={50}></Image>
                  <h4 className="pl-2 font-majallab text-2xl md:text-3xl">
                    Expert
                  </h4>
                </div>
                <p>
                  Propel your project to new peaks with our Expert Package, which
                  includes advanced editing, 3 ISBNs, a dynamic website, a video
                  trailer, and widespread distribution, ensuring full ownership
                  and royalties.
                </p>
              </div>

              <div className="pack-wrap" data-aos="fade-left" data-aos-delay="200">
                <div className="pack-box flex items-center">
                  <Image src={"/images/pp4.png"} width={40} height={50}></Image>
                  <h4 className="pl-2 font-majallab text-2xl md:text-3xl">
                    Enterprise
                  </h4>
                </div>
                <p>
                  Embark on your authorial journey with our Enterprise Package,
                  which encompasses detailed editing, captivating cover design,
                  strategic marketing, 3 ISBNs, and extensive distribution to
                  bring your book to readers worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="table-sec overflow-x-scroll">
          <div className="container mx-auto m1-h mt-10">
            <h3 className="mb-8 text-center font-majallab text-5xl md:text-7xl" data-aos="zoom-in" data-aos-delay="200">
              Comparison Chart
            </h3>
          </div>
          <div className="width-container">
            <div className="container mx-auto">
              <div class="check-wrap">
                <div class="check-list flex">
                  <span className="flex mx-5 items-center text-sm  md:text-xl font-bold pb-4">
                    Included:{" "}
                    <FontAwesomeIcon icon={faCheckCircle} color="#2c9384" className="ms-4" />
                    {/* <Image
                    className="ml-4"
                    src={"/images/c.png"}
                    alt=""
                    height={20}
                    width={25}
                  ></Image> */}
                  </span>
                  <span className="flex text-sm  md:text-xl font-bold pb-4 items-center">
                    Can be purchased as an add-on:{" "}
                    <FontAwesomeIcon icon={faPlusCircle} color="#2c9384" className="ms-4" />
                    {/* <Image
                    className="ml-4"
                    src={"/images/plus.webp"}
                    alt=""
                    height={20}
                    width={25}
                  ></Image> */}
                  </span>
                </div>
              </div>
              <div className="md:w-full w-[500px]">
                <table className="w-full mb-14 table-auto">
                  <thead className="first-row">
                    <tr>
                      <th
                        id="sticky-header-column-fixed"
                        class="mainpage-regular"
                      ></th>

                      <th className="font-majallab">
                        {" "}
                        Beginners
                        <br />
                        <button
                          onClick={handleOpenChat}
                          type="button"
                          class="text-black bg-white border border-gray-300 focus:outline-none font-lg rounded-full text-sm px-2 md:px-5 py-2.5 me-2 mb-2 font-majallab"
                        >
                          Talk to us
                        </button>
                      </th>

                      <th className="font-majallab">
                        Standard
                        <br />
                        <button
                          onClick={handleOpenChat}
                          type="button"
                          class="text-black bg-white border border-gray-300 focus:outline-none font-lg rounded-full text-sm px-2 md:px-5 py-2.5 me-2 mb-2 font-majallab"
                        >
                          Talk to us
                        </button>
                      </th>

                      <th className="font-majallab">
                        Expert
                        <br />
                        <button
                          onClick={handleOpenChat}
                          type="button"
                          class="text-black bg-white border border-gray-300 focus:outline-none font-lg rounded-full text-sm px-2 md:px-5 py-2.5 me-2 mb-2 font-majallab"
                        >
                          Talk to us
                        </button>
                      </th>

                      <th className="font-majallab">
                        Enterprise
                        <br />
                        <button
                          onClick={handleOpenChat}
                          type="button"
                          class="text-black bg-white border border-gray-300 focus:outline-none font-lg rounded-full text-sm px-2 md:px-5 py-2.5 me-2 mb-2 font-majallab"
                        >
                          Talk to us
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <th
                        className="pro text-3xl md:text-5xl text-start ml-10"
                        colspan="5"
                        scope="row"
                      >
                        PROJECT MANAGEMENT AND SUPPORT
                      </th>
                    </tr>
                    <tr>
                      <td className="">Dedicated Project Manager</td>
                      <td>
                        {/* <Image
                        className=""
                        src={"/images/c.svg"}
                        alt=""
                        height={20}
                        width={25}
                      ></Image> */}
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        {/* <Image
                        className=""
                        src={"/images/c.svg"}
                        alt=""
                        height={20}
                        width={25}
                      ></Image> */}
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        {/* <Image
                        className=""
                        src={"/images/c.svg"}
                        alt=""
                        height={20}
                        width={25}
                      ></Image> */}
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        {/* <Image
                        className=""
                        src={"/images/c.svg"}
                        alt=""
                        height={20}
                        width={25}
                      ></Image> */}
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td>100% Copyright Ownership</td>
                      <td>
                        {/* <Image
                        className=""
                        src={"/images/c.svg"}
                        alt=""
                        height={20}
                        width={25}
                      ></Image> */}
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td>Paperback Author Copy</td>
                      <td>3</td>
                      <td>5</td>
                      <td>7</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Hardcover Author Copy</td>
                      <td>
                        <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                      </td>
                      <td>1</td>
                      <td>2</td>
                      <td>4</td>
                    </tr>

                    <tr>
                      <th
                        className="pro text-3xl md:text-5xl text-start"
                        colspan="5"
                        scope="row"
                      >
                        <span className="ml-32 md:ml-40">EDITING</span>
                      </th>
                    </tr>
                    <tr>
                      <td className="">Editing &amp; Proofreading</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td className="">Typesetting &amp; Layout Adjustment</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td className="">eBook Formatting</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td className="">PaperBack Formatting</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td className="">Hardcover Formatting</td>
                      <td>
                        <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td className="">Publishing Platforms</td>
                      <td>2</td>
                      <td>3</td>
                      <td>4</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td className="">Revisions Per Draft</td>
                      <td>3 - 5</td>
                      <td>3 - 5</td>
                      <td>3 - 5</td>
                      <td>3 - 5</td>
                    </tr>

                    <tr>
                      <th
                        className="pro text-3xl md:text-5xl text-start"
                        colspan="5"
                        scope="row"
                      >
                        <span className="ml-32 md:ml-40">DESIGN</span>
                      </th>
                    </tr>
                    <tr>
                      <td className="">Design Consultation</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td className="">Cover Design</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td className="">Interior Layout</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td className="">Revision Rounds</td>
                      <td>3</td>
                      <td>3</td>
                      <td>4</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td className="">Black-and-White or Full-Color Interior</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td className="">Image Insertions</td>
                      <td>10</td>
                      <td>15</td>
                      <td>20</td>
                      <td>30</td>
                    </tr>

                    <tr>
                      <th
                        className="pro text-3xl md:text-5xl text-start"
                        colspan="5"
                        scope="row"
                      >
                        <span className="ml-32 md:ml-40">DISTRIBUTION</span>
                      </th>
                    </tr>
                    <tr>
                      <td className="">eBook Distribution</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td className="">Paperback Format Distribution</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td className="">Hardcover Format Distribution</td>
                      <td>
                        <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td className="">Print-on-Demand Availability</td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td className="">ISBN</td>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <td className="">Amazon Author Central</td>
                      <td>
                        <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>

                    <tr>
                      <th
                        className="pro text-3xl md:text-5xl text-start"
                        colspan="5"
                        scope="row"
                      >
                        <span className="ml-32 md:ml-40">MARKETING</span>
                      </th>
                    </tr>
                    <tr>
                      <td className="">Marketing Consultation</td>
                      <td>
                        <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td className="">Custom Marketing Strategy</td>
                      <td>
                        <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                      </td>
                    </tr>
                    <tr>
                      <td className="">Author's Dynamic Website</td>
                      <td>
                        <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                      </td>
                      <td>4 PAGES</td>
                      <td>6 PAGES</td>
                    </tr>
                    <tr>
                      <td className="">Social Media Marketing</td>
                      <td>
                        <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                      </td>
                      <td>3 MONTHS</td>
                      <td>6 MONTHS</td>
                    </tr>
                    <tr>
                      <td className="">Search Engine Optimization</td>
                      <td>
                        <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                      </td>
                      <td>3 MONTHS</td>
                    </tr>

                    <tr className="font-majallab">
                      <td></td>
                      <td className="md:w-auto w-24">
                        <a
                          // data-src="#popup-layout"
                          // href="javascript:;"
                          onClick={handleOpenChat}
                          className="cursor-pointer md:min-w-26 w-40 text-black bg-white focus:outline-none font-medium rounded-full text-sm px-2 py-2.5 me-2 mb-2 md:px-5"
                          data-source="Beginners Bundles"
                        >
                          Get a Quote
                        </a>
                      </td>
                      <td className="md:w-auto w-24">
                        <a
                          // data-src="#popup-layout"
                          // href="javascript:;"
                          onClick={handleOpenChat}
                          className="cursor-pointer md:min-w-26 w-40 text-black bg-white focus:outline-none font-medium rounded-full text-sm px-2 py-2.5 me-2 mb-2 md:px-5"
                          data-source="Beginners Bundles"
                        >
                          Get a Quote
                        </a>
                      </td>
                      <td className="md:w-auto w-24">
                        <a
                          // data-src="#popup-layout"
                          // href="javascript:;"
                          onClick={handleOpenChat}
                          className="cursor-pointer md:min-w-26 w-40 text-black bg-white focus:outline-none font-medium rounded-full text-sm px-2 py-2.5 me-2 mb-2 md:px-5"
                          data-source="Beginners Bundles"
                        >
                          Get a Quote
                        </a>
                      </td>
                      <td className="md:w-auto w-24">
                        <a
                          // data-src="#popup-layout"
                          // href="javascript:;"
                          onClick={handleOpenChat}
                          className="cursor-pointer md:min-w-26 w-40 text-black bg-white focus:outline-none font-medium rounded-full text-sm px-2 py-2.5 me-2 mb-2 md:px-5"
                          data-source="Beginners Bundles"
                        >
                          Get a Quote
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="process pt-14">
          <div className="container mx-auto text-center m1-h ">
            <h3 className="font-majallab text-5xl md:text-7xl">
              Our Book Publishing Process
            </h3>
            <p>
              At Pine Book Publishing, we've streamlined Our Book Publishing
              Process to ensure authors have a seamless experience from start to
              finish.
            </p>
            <Image
              className="py-10 book-publishing-infograph-img"
              src={"/images/processs.gif"}
              width={1280}
              height={400}
              data-aos="fade-up" data-aos-delay="200"
            ></Image>
          </div>

          <div className="counter -mb-16">
            <div className="container mx-auto">
              {/* <div className="grid grid-cols-4 gap-4"></div> */}
              <div className="mt-6 grid grid-cols-1 px-6 gap-y-10 sm:grid-cols-2 mx-5 lg:grid-cols-4 xl:gap-x-8">
                <div className="conter-box rounded-lg bg-white py-8 px-5 text-center content-center" data-aos="fade-up" data-aos-delay="200">
                  <h2>
                    <Counter from={0} to={15} val={"+"} />
                  </h2>
                  <span className="font-majallab">
                    Years of industry experience
                  </span>
                </div>

                <div className="conter-box rounded-lg bg-white py-8 px-5 text-center content-center" data-aos="fade-up" data-aos-delay="200">
                  <h2>
                    <Counter from={0} to={500} val={"+"} />
                  </h2>
                  <span className="font-majallab">Published Books</span>
                </div>

                <div className="conter-box rounded-lg bg-white py-8 px-5 text-center content-center" data-aos="fade-up" data-aos-delay="200">
                  <h2>
                    <Counter from={0} to={100} val={"+"} />
                  </h2>
                  <span className="font-majallab">Ongoing Clients</span>
                </div>

                <div className="conter-box rounded-lg bg-white py-8 px-5 text-center content-center" data-aos="fade-up" data-aos-delay="200">
                  <h2>
                    <Counter from={0} to={99} val={"+"} />
                  </h2>
                  <span className="font-majallab">Client Satisfaction Rate</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="story-sec py-20">
          <div className="container mx-auto text-center m1-h">
            <h3 className="mb-8 text-white text-5xl md:text-7xl font-majallab">
              Our Success Stories
            </h3>
            <p className="text-white">
              Explore our Success Stories to see how Pine Book Publishing has
              empowered authors in their self-publishing journey and stands out
              among self-book publishers.
            </p>
          </div>

          <section className="testimonials pt-8 ">
            <div className="container mx-auto relative  w-[80%]">
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                loop={true}
                initialSlide={1}
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
                pagination={false}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
                breakpoints={{
                  "@0.00": {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    navigation: {
                      enabled: false,
                    },
                    pagination: false,
                    navigation: true,
                  },
                  "@1.00": {
                    slidesPerView: 3,
                    spaceBetween: 5,
                  },
                }}
              >
                <SwiperSlide>
                  <video
                    loop=""
                    controls="true"
                    muted=""
                    poster=""
                    loading="lazy"
                    preload=""
                  >
                    <source
                      src={"https://imperiumdesigners.com/assets/images/v1.mp4"}
                      type="video/mp4"
                    ></source>
                  </video>
                </SwiperSlide>
                <SwiperSlide>
                  <video
                    loop=""
                    controls="true"
                    muted=""
                    poster=""
                    loading="lazy"
                    preload=""
                  >
                    <source
                      src={"https://imperiumdesigners.com/assets/images/v6.mp4"}
                      type="video/mp4"
                    ></source>
                  </video>
                </SwiperSlide>
                <SwiperSlide>
                  <video
                    loop=""
                    controls="true"
                    muted=""
                    poster=""
                    loading="lazy"
                    preload=""
                  >
                    <source
                      src={"https://imperiumdesigners.com/assets/images/v5.mp4"}
                      type="video/mp4"
                    ></source>
                  </video>
                </SwiperSlide>
                <SwiperSlide>
                  <video
                    loop=""
                    controls="true"
                    muted=""
                    poster=""
                    loading="lazy"
                    preload=""
                  >
                    <source
                      src={"https://imperiumdesigners.com/assets/images/v3.mp4"}
                      type="video/mp4"
                    ></source>
                  </video>
                </SwiperSlide>
                <SwiperSlide>
                  <video
                    loop=""
                    controls="true"
                    muted=""
                    poster=""
                    loading="lazy"
                    preload=""
                  >
                    <source
                      src={"https://imperiumdesigners.com/assets/images/v4.mp4"}
                      type="video/mp4"
                    ></source>
                  </video>
                </SwiperSlide>
              </Swiper>
              <div
                class="bk-sil2 prev"
                onClick={() => swiperRef2.current?.slidePrev()}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <div
                class="bk-sil2 next"
                onClick={() => swiperRef2.current?.slideNext()}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>
          </section>
        </section>

        <section className="faqs width-container">
          <div className="container mx-auto m1-h">
            <h3 className="text-center pt-16 font-majallab text-5xl md:text-7xl  md:pb-4">
              Looking for Answers?
            </h3>

            {/* <div className="faq-que">
            <div className="flex flex-col md:flex-row justify-center gap-4">
              {Array.from({ length: 2 }).map((_, colIndex) => (
                <div key={colIndex} className="w-full max-w-screen-sm">
                  {faqQuestions.slice(colIndex * 3, (colIndex + 1) * 3).map((question, index) => {
                    const actualIndex = index + colIndex * 3;
                    return (
                      <button
                        key={actualIndex}
                        className="w-full border-b-2 border-gray-300 p-6 text-left group mt-0 focus:outline-none bg-slate-200 mb-4"
                        onClick={() => toggleFAQ(actualIndex)}
                      >
                        <div className="text-lg font-semibold flex justify-between">
                          {actualIndex + 1}. {question}
                          <FontAwesomeIcon icon={openFAQ === actualIndex ? faMinusCircle : faPlusCircle} color="#2c9384" />
                        </div>
                        <div className={`mt-3 text-gray-700 transition-max-height duration-500 ease-in-out ${openFAQ === actualIndex ? 'max-h-40' : 'max-h-0 overflow-hidden'}`}>
                          {faqAnswers[actualIndex]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div> */}

            <div className="faq-que">
              <div className="flex flex-col md:flex-row justify-center gap-4">
                {Array.from({ length: 2 }).map((_, colIndex) => (
                  <div key={colIndex} className="w-full max-w-screen-sm">
                    {faqData.slice(colIndex * 3, (colIndex + 1) * 3).map((faq, index) => {
                      const actualIndex = index + colIndex * 3;
                      return (
                        <button
                          key={actualIndex}
                          className="w-full border-b-2 border-gray-300 p-6 text-left mt-0 focus:outline-none bg-slate-200 mb-4"
                          onClick={() => toggleFAQ(actualIndex)}
                        >
                          <div className="text-lg font-semibold flex justify-between">
                            {faq.question}
                            <FontAwesomeIcon icon={openFAQ === actualIndex ? faMinusCircle : faPlusCircle} color="#2c9384" />
                          </div>
                          <div className={`mt-3 text-gray-700 transition-all duration-700 ease-in-out ${openFAQ === actualIndex ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                            {faq.answer}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="bages-pic flex flex-wrap items-center justify-center py-10 gap-x-32">
              <Swiper
                className=""
                spaceBetween={15}
                slidesPerView={5}
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
                    pagination: false,
                    navigation: true,
                  },
                  "@1.00": {
                    slidesPerView: 5,
                    spaceBetween: 15,
                  },
                }}
              >
                <SwiperSlide className="mx-auto text-center">
                  <div className="flex justify-between items-center">
                    <Image src={"/images/bage2.png"} width={100} height={100} data-aos="zoom-in" data-aos-delay="200"></Image>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="mx-auto text-center">
                  <div className="flex flex-row justify-between items-center">
                    <Image src={"/images/bage13.png"} width={100} height={100} data-aos="zoom-in" data-aos-delay="200"></Image>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="mx-auto text-center">
                  <div className="flex flex-row justify-between items-center">
                    <Image src={"/images/bage3.png"} width={100} height={100} data-aos="zoom-in" data-aos-delay="200"></Image>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="mx-auto text-center">
                  <div className="flex flex-row justify-between items-center">
                    <Image src={"/images/bage14.png"} width={100} height={100} data-aos="zoom-in" data-aos-delay="200"></Image>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="mx-auto text-center">
                  <div className="flex flex-row justify-between items-center">
                    <Image src={"/images/bage4.png"} width={100} height={100} data-aos="zoom-in" data-aos-delay="200"></Image>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="mx-auto text-center">
                  <div className="flex flex-row justify-between items-center">
                    <Image src={"/images/bage12.png"} width={100} height={100} data-aos="zoom-in" data-aos-delay="200"></Image>
                  </div>
                </SwiperSlide>
              </Swiper>
              {/* <Image src={"/images/bage2.png"} width={100} height={100} data-aos="zoom-in" data-aos-delay="200"></Image>
            <Image src={"/images/bage13.png"} width={100} height={100} data-aos="zoom-in" data-aos-delay="200"></Image>
            <Image src={"/images/bage3.png"} width={100} height={100} data-aos="zoom-in" data-aos-delay="200"></Image>
            <Image src={"/images/bage14.png"} width={100} height={100} data-aos="zoom-in" data-aos-delay="200"></Image>
            <Image src={"/images/bage4.png"} width={100} height={100} data-aos="zoom-in" data-aos-delay="200"></Image>
            <Image src={"/images/bage12.png"} width={100} height={100} data-aos="zoom-in" data-aos-delay="200"></Image> */}
            </div>
          </div>
        </section>

        <section className="btm-form overflow-hidden width-container">
          <div className="container mx-auto px-8 md:px-20">
            <div className="form-mid-wrap pt-12 bg-gray-200 connect-form-border mb-12">
              <div className="flex flex-col md:flex-row items-end">
                <div className="basis-1/3 hidden md:block">
                  <AnimateFade type={"right"}>
                    <Image
                      className="text-center pt-10 contact-form-img"
                      src={"/images/boy.png"}
                      width={550}
                      height={250}
                    ></Image>
                  </AnimateFade>
                </div>

                <form className="basis-1/2 px-5 mb-5  md:ml-20" onSubmit={handleSubmit}>
                  <h3 className="text-black leading-20 font-bold text-5xl md:text-7xl font-majallab text-start">
                    Connect Us Now!
                  </h3>
                  <p className="text-black leading-6  pb-5 text-base">
                    Have questions? Reach out to Pine Book Publishing for
                    personalized assistance.
                  </p>

                  <div className="relative mb-3">
                    <input
                      type="text"
                      name="fullName"
                      onChange={handleChange}
                      value={fullName}
                      required
                      className="pl-4 pr-4 py-2 border rounded-lg w-full connect-form-input font-majallab"
                      placeholder="Enter your Name"
                    />
                  </div>

                  <div className="relative mb-3">
                    <input
                      type="text"
                      name="phoneNumber"
                      onChange={handleChange}
                      value={phoneNumber}
                      required
                      className="pl-4 pr-4 py-2 border rounded-lg w-full connect-form-input font-majallab"
                      placeholder="Enter your Number"
                    />
                  </div>

                  <div className="relative mb-3">
                    <input
                      type="text"
                      name="email"
                      onChange={handleChange}
                      value={email}
                      required
                      className="pl-4 pr-4 py-2 border rounded-lg w-full connect-form-input font-majallab"
                      placeholder="Enter your Email"
                    />
                  </div>

                  <div className="relative mb-3">
                    <textarea
                      onChange={handleChange}
                      value={message}
                      required
                      placeholder="Enter your Message"
                      name="message"
                      className="resize-none pl-4 pr-4 py-2 border rounded-lg w-full connect-form-input font-majallab"
                      rows={5}
                    ></textarea>
                    <div
                      className="absolute inset-y-0 left-0 pl-3 pt-3 
                              flex items-start  
                              pointer-events-none"
                    ></div>
                  </div>
                  {showSuccess && (
                    <p className="px-1 py-2 text-green-700">
                      Form submitted Successfully!
                    </p>
                  )}
                  <button className="p-4 w-full bg-green-500 uppercase text-white rounded font-poppins submit-btn" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <Footer />

        {/* <motion.p className="font-acumin text-5xl text-center text-black leading-loose font-bold hover:text-[#EBFA0B]" ref={nodeRef} >{rounded}<Counter from={100} to={1000} val={"10"} />100</motion.p> */}

      </main>
    </>
  );
}
