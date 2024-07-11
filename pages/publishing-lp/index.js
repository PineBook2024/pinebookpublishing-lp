import useHubspotForm from "@/hooks/hubspot";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import "swiper/css/effect-coverflow";
import Header from "../components/header";
import Hero from "../components/hero";
import Popup from "../components/popup";
import HeroForm from "../components/herform";
import Footer from "../components/Footer";
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
import AnimateFade from "../components/fade";
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
import Story from "../components/Story";
import Chart from "../components/Chart";
import Faq from "../components/Faq";
import dynamic from 'next/dynamic';
import Packages from "../components/Packages";
import HomePopup from "../components/HomePopup";
import 'glightbox/dist/css/glightbox.min.css';

const HeavyComponent = dynamic(() => import('../components/hero'), {
  loading: () => <p>Loading...</p>,
});

const GLightbox = dynamic(
  () => import('glightbox').then((glightboxModule) => glightboxModule.default),
  { ssr: false }
);


export default function Home() {
  const router = useRouter();
  const swiperRef = useRef();
  const swiperRef2 = useRef();
  const swiperRef3 = useRef();
  // Form Integration
  const { submitMainContactForm } = useHubspotForm();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const lightboxRef = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined" && !lightboxRef.current) {
      import('glightbox').then((GLightboxModule) => {
        const GLightbox = GLightboxModule.default;
        lightboxRef.current = GLightbox({
          selector: '.glightbox'
        });
      });
    }

    return () => {
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
      }
    };
  }, []);

  // Object
  const packagesCard = [
    {
      id: 1,
      image: "/images/pp1.png",
      title: "Beginner",
      description: "Launch your book with our Beginner Package, offering comprehensive editing, custom cover art, multi-platform formatting, Amazon optimization, 1 ISBN, and full royalties with a few paperback copies."
    },
    {
      id: 2,
      image: "/images/pp2.png",
      title: "Standard",
      description: "Enhance your publishing experience with our Standard Package, which ensures meticulous editing, versatile publishing options and 2 ISBNs, complete with a full suite of formats and copies for distribution."
    },
    {
      id: 3,
      image: "/images/pp3.png",
      title: "Expert",
      description: "Propel your project to new peaks with our Expert Package, which includes advanced editing, 3 ISBNs, a dynamic website, a video trailer, and widespread distribution, ensuring full ownership and royalties."
    },
    {
      id: 4,
      image: "/images/pp4.png",
      title: "Enterprise",
      description: "Embark on your authorial journey with our Enterprise Package, which encompasses detailed editing, captivating cover design, strategic marketing, 3 ISBNs, and extensive distribution to bring your book to readers worldwide."
    }
  ];

  // Books Object
  const books = [
    { src: "/images/bb-01.png", width: 260, height: 700, type: "right", alt: "book mobile img ten" },
    { src: "/images/bb-02.png", width: 260, height: 700, type: "top", alt: "book mobile img eleven" },
    { src: "/images/bb-03.png", width: 260, height: 700, type: "top", alt: "book mobile img twelve" },
    { src: "/images/bb-04.png", width: 260, height: 500, type: "right", alt: "book mobile img thirteen" },
    { src: "/images/bb-05.png", width: 260, height: 289, type: "top", alt: "book mobile img fifteen" },
    { src: "/images/bb-06.png", width: 260, height: 289, type: "bottom", alt: "book mobile img sixteen" },
    { src: "/images/bb-07.png", width: 260, height: 289, type: "left", alt: "book mobile img seventeen" },
    { src: "/images/bb-08.png", width: 260, height: 289, type: "top", alt: "book mobile img eighteen" }
  ];


  // Object
  const clientLogos = [
    {
      href: "https://goo.gl/maps/D6kJBoXBJYwcZWkP7",
      src: "/images/Google Partner.png",
      alt: "LOGO",
      width: 130,
      height: 60
    },
    {
      href: "https://www.bbb.org/ca/on/richmond-hill/profile/publishers-book/pine-book-writing-inc-0107-1406919",
      src: "/images/BBB.png",
      alt: "LOGO",
      width: 130,
      height: 60
    },
    {
      href: "https://www.trustpilot.com/review/pinebookwriting.com",
      src: "/images/Trustpilot.png",
      alt: "LOGO",
      width: 130,
      height: 60
    },
    {
      href: "https://www.yelp.com/biz/pine-book-writing-richmond-hill",
      src: "/images/Yelp.png",
      alt: "LOGO",
      width: 130,
      height: 60
    },
    {
      href: "https://clutch.co/profile/pine-book-writing",
      src: "/images/Clutch.png",
      alt: "LOGO",
      width: 130,
      height: 60
    }
  ];


  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push('/publishing-lp');
  //   }, 3000);
  // }, [router]);


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
      if (name === 'phoneNumber') {
        const phoneRegex = /^\d{0,10}$/;
        if (phoneRegex.test(value)) {
          setter(value);
          setPhoneError("");
        } else {
          setPhoneError("Phone number must be exactly 10 digits");
        }
      } else {
        setter(value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }
    const response = await submitMainContactForm(
      fullName,
      email,
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




  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
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
      <motion.p className="font-poppins text-black" ref={nodeRef}>
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
        <meta name="google-site-verification" content="v2pKJGIZnMWCWw2QC5nuRPYT5gvDQlUtT0lZYFIhHYo" />
        <link rel="shortcut icon" href="/images/fav.png" />

        {/* Google tag Manager Script */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9X52J8V8NK"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-9X52J8V8NK');
              `,
          }}
        />
      </Head>
      <main>
        <Header />
        {/* <HomePopup /> */}
        {/* <Hero  /> */}
        <HeavyComponent Component={HeroForm} />

        <section className="brnd-slider bg-black overflow-hidden">
          {/* <AnimateFade type={"right"}> */}
          <div className="container grid grid-cols-1 width-container position-relative">
            <div className="container mx-auto position-relative">
              <div className="book-sell-text ">
                <h3 className="font-poppins text-xl md:text-xl leading-3 font-bold">Sell Your <br></br> <span>Book With</span></h3>
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
          {/* </AnimateFade> */}
        </section>


        <section className="about pt-14 overflow-hidden">
          <div className="container mx-auto px-5 md:px-0 w-100 lg:w-5/6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center">
              {/* <AnimateFade type={"top"}> */}
              <div className="abt-txt m1-h p1">
                <h3 className="font-poppins text-3xl md:text-5xl font-bold">
                  About<span>Pine Book Publishing</span>
                </h3>
                <p className="pt-3">
                  Pine Book Publishing was founded on February 22, 2023, with the mission of providing quality editing and publishing services for the authors worldwide.
                  Our founders understood that many authors need support in editing and publishing their works to make them distinct from the rest in the crowded marketplace. They had a vision of creating a company that would help these authors bring their ideas to life and turn them into successful books. That was when Pine Book Publishing was officially established with a mission of providing authors with the best book publishing experience.<br></br>
                  We have a qualified team of professionals who will work hand in hand with you from the moment you decide to publish your book to the moment your book in known to the world.
                </p>
                <div className="flex justify-start items-center mt-8 gap-2 md:gap-x-8 client-logo-sec about-logos-sec">
                  {clientLogos.map((logo, index) => (
                    <Link key={index} href={logo.href} target="_blank">
                      <Image
                        alt={logo.alt}
                        src={logo.src}
                        width={logo.width}
                        height={logo.height}
                      />
                    </Link>
                  ))}
                </div>
              </div>
              {/* </AnimateFade> */}
              <div className="abt-pic text-center">
                {/* <AnimateFade type={"left"}> */}
                <Image src={"/images/About-us-img.png"} width={500} height={570}
                  layout="responsive"
                  loading="lazy"
                  alt="about img"
                />
                {/* </AnimateFade> */}
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
                    swiperRef3.current = swiper;
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
                      slidesPerView: 3,
                      spaceBetween: 15,
                    },
                  }}
                >
                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row justify-between items-center border-about-card">
                      <Image
                        src={"/images/b1.png"}
                        width={100}
                        height={100}
                        loading="lazy"
                        alt="book img one"
                      ></Image>
                      <p className="p-4">
                        Explore worlds of knowledge and discovery.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row items-center border-about-card">
                      <Image
                        src={"/images/b2.png"}
                        width={100}
                        height={100}
                        loading="lazy"
                        alt="book img two"
                      ></Image>
                      <p className="p-4">
                        Journey through the lives and experiences of others.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row items-center border-about-card">
                      <Image
                        src={"/images/b3.png"}
                        width={100}
                        height={100}
                        loading="lazy"
                        alt="book img three"
                      ></Image>
                      <p className="p-4">
                        Get lost in imaginary worlds and captivating narratives.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row items-center border-about-card">
                      <Image
                        src={"/images/b4.png"}
                        width={100}
                        height={100}
                        loading="lazy"
                        alt="book img four"
                      ></Image>
                      <p className="p-4">
                        Discover the truth and reality behind fascinating topics.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row items-center border-about-card">
                      <Image
                        src={"/images/b5.png"}
                        width={100}
                        height={100}
                        loading="lazy"
                        alt="book img five"
                      ></Image>
                      <p className="p-4">
                        Dive into the personal stories and reflections of individuals.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row items-center border-about-card">
                      <Image
                        src={"/images/b6.png"}
                        width={100}
                        height={100}
                        loading="lazy"
                        alt="book img six"
                      ></Image>
                      <p className="p-4">
                        Learn about the lives and achievements of remarkable figures.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row items-center border-about-card">
                      <Image
                        src={"/images/b7.png"}
                        width={100}
                        height={100}
                        loading="lazy"
                        alt="book img seven"
                      ></Image>
                      <p className="p-4">
                        Embark on thrilling quests and adrenaline-pumping escapades.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row items-center border-about-card">
                      <Image
                        src={"/images/b8.png"}
                        width={100}
                        height={100}
                        loading="lazy"
                        alt="book img eight"
                      ></Image>
                      <p className="p-4">
                        Indulge in tales of love, passion, and heartwarming connections.
                      </p>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="bg-white rounded-xl flex flex-row items-center border-about-card">
                      <Image
                        src={"/images/b9.png"}
                        width={100}
                        loading="lazy"
                        alt="book img nine"
                        height={100}
                      ></Image>
                      <p className="p-4">
                        Experience a collection of diverse stories and perspectives.
                      </p>
                    </div>
                  </SwiperSlide>
                </Swiper>
                <div className="bk-sil prev cursor-pointer" onClick={() => swiperRef3.current?.slidePrev()}><FontAwesomeIcon icon={faArrowLeft} /></div>
                <div className="bk-sil next cursor-pointer" onClick={() => swiperRef3.current?.slideNext()}><FontAwesomeIcon icon={faArrowRight} /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="portfolio overflow-hidden	 py-14">
          <div className="grid grid-cols-1 ">
            <div className="container mx-auto text-center">
              <div className="portfolio-h m1-h">
                <h3 className="font-poppins text-3xl md:text-4xl">
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
                      <Image src={"/images/bb1-min.webp"} width={260} height={289} loading="lazy" className="glightbox" layout="responsive" alt="book img ten" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="flex justify-center">
                      <Image src={"/images/bb5-min.webp"} width={260} height={289} loading="lazy" className="glightbox" layout="responsive" alt="book img eleven" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="flex justify-center">
                      <Image src={"/images/bb8-min.webp"} width={260} height={289} loading="lazy" className="glightbox" layout="responsive" alt="book img twoelve" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="flex justify-center">
                      <Image src={"/images/bb4-min.webp"} width={260} height={289} loading="lazy" className="glightbox" layout="responsive" alt="book img thirteen" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="flex justify-center">
                      <Image src={"/images/bb3-min.webp"} width={260} height={289} loading="lazy" className="glightbox" layout="responsive" alt="book img fifteen" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="flex justify-center">
                      <Image src={"/images/bb6-min.webp"} width={260} height={289} loading="lazy" className="glightbox" layout="responsive" alt="book img sixteen" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="flex justify-center">
                      <Image src={"/images/bb7-min.webp"} width={260} height={289} loading="lazy" className="glightbox" layout="responsive" alt="book img seventeen" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="flex justify-center">
                      <Image src={"/images/bb2-min.webp"} width={260} height={289} loading="lazy" className="glightbox" layout="responsive" alt="book img eighteen" />
                    </div>
                  </SwiperSlide>
                </Swiper>

              </div>


              <div className="grid grid-cols-4 gap-4 width-container books-collage">
                {books.map((book, index) => (
                  <div key={index}>
                    {/* <AnimateFade type={book.type}> */}
                    <Image src={book.src} width={book.width} height={book.height} loading="lazy" alt={book.alt} className="book-zoom-effect glightbox" />
                    {/* </AnimateFade> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* <section className="package py-14 overflow-hidden">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 mb-14 items-center m1-h text-center">
              <h3 className="font-poppins text-5xl md:text-7xl">
                Publishing Packages
              </h3>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 width-container">
              {packagesCard.map((pkg) => (
                <div key={pkg.id} className="pack-wrap gap-8">
                  <div className="pack-box flex items-center">
                    <Image src={pkg.image} width={40} height={50} loading="lazy" alt="icon" />
                    <h4 className="pl-2 font-poppins text-2xl md:text-3xl">
                      {pkg.title}
                    </h4>
                  </div>
                  <p>
                    {pkg.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* <Chart /> */}
        <Packages />

        <section className="process pt-14">
          <div className="container mx-auto text-center m1-h ">
            <h3 className="font-poppins text-3xl md:text-4xl">
              Our Book Publishing Process
            </h3>
            <p className="pt-2">
              At Pine Book Publishing, we've streamlined Our Book Publishing
              Process to <br></br>ensure authors have a seamless experience from start to
              finish.
            </p>
            <Image
              className="py-10 book-publishing-infograph-img"
              src={"/images/processs.gif"}
              width={1280}
              height={400}
              loading="lazy"
              alt="process"
            ></Image>
          </div>

          <div className="counter -mb-16">
            <div className="container mx-auto">
              {/* <div className="grid grid-cols-4 gap-4"></div> */}
              <div className="mt-6 grid grid-cols-1 px-6 gap-y-10 sm:grid-cols-2 mx-5 lg:grid-cols-4 xl:gap-x-8">
                <div className="conter-box rounded-lg bg-white py-8 px-5 text-center content-center" >
                  <h2 className="text-xl">
                    <Counter from={0} to={15} val={"+"} />
                  </h2>
                  <span className="text-sm">
                    Years of industry experience
                  </span>
                </div>

                <div className="conter-box rounded-lg bg-white py-8 px-5 text-center content-center" >
                  <h2>
                    <Counter from={0} to={500} val={"+"} />
                  </h2>
                  <span className="text-sm">Published Books</span>
                </div>

                <div className="conter-box rounded-lg bg-white py-8 px-5 text-center content-center" >
                  <h2>
                    <Counter from={0} to={100} val={"+"} />
                  </h2>
                  <span className="text-sm">Ongoing Clients</span>
                </div>

                <div className="conter-box rounded-lg bg-white py-8 px-5 text-center content-center" >
                  <h2>
                    <Counter from={0} to={99} val={"+"} />
                  </h2>
                  <span className="text-sm">Client Satisfaction Rate</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Story />

        <Faq />

        <section className="btm-form overflow-hidden width-container">
          <div className="container mx-auto px-8 md:px-20">
            <div className="form-mid-wrap pt-4 bg-gray-200 connect-form-border mb-12">
              <div className="flex flex-col md:flex-row items-end">
                <div className="basis-1/3 hidden md:block position-relative">
                  {/* <AnimateFade type={"right"} className="position-relative"> */}
                  <Image
                    className="text-center pt-10 contact-form-img"
                    src={"/images/contact-user.webp"}
                    width={550}
                    height={250}
                    layout="responsive"
                    loading="lazy"
                  ></Image>
                  {/* </AnimateFade> */}
                </div>

                <form className="basis-1/2 px-5 mb-5  md:ml-20" onSubmit={handleSubmit}>
                  <h3 className="text-black leading-20 font-bold text-4xl md:text-4xl font-poppins text-start">
                    Connect Us Now!
                  </h3>
                  <p className="text-black leading-6  pb-5 text-base pt-2">
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
                      className="pl-4 pr-4 py-2 border rounded-lg w-full connect-form-input"
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
                      className="pl-4 pr-4 py-2 border rounded-lg w-full connect-form-input"
                      placeholder="Enter your Number"
                    />
                    {phoneError && (
                      <span className="text-red-500 text-md mt-1">{phoneError}</span>
                    )}
                  </div>

                  <div className="relative mb-3">
                    <input
                      type="text" 
                      name="email"
                      onChange={handleChange}
                      value={email}
                      required
                      className="pl-4 pr-4 py-2 border rounded-lg w-full connect-form-input"
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
                      className="resize-none pl-4 pr-4 py-2 border rounded-lg w-full connect-form-input"
                      rows={3}
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
                  <button className="p-4 w-full bg-green-500 uppercase text-white rounded submit-btn mb-10" type="submit">
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
