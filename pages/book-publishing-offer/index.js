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
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
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
import BrandCTA from "../components/BrandCTA";
import HeroFormBookOffer from "../components/HerformBookOffer";
import PopupBundle from "../components/PopupBundle";
import PopupBundleBookPublish from "../components/PopupBundleBookPublish";
import BrandFooter from "../components/BrandFooter";
import PortfolioSlider1 from "../components/PortfolioSlider1";
import PortfolioSlider2 from "../components/PortfolioSlider2";
import PortfolioSlider3 from "../components/PortfolioSlider3";
import PortfolioSlider4 from "../components/PortfolioSlider4";
import PortfolioSlider1LP from "../components/PortfolioSlider1LP";
import PortfolioSlider2LP from "../components/PortfolioSlider2LP";
import PortfolioSlider3LP from "../components/PortfolioSlider3LP";
import BrandFooterBook from "../components/BrandFooterBook";

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

  const [showPackages, setShowPackages] = useState(false);
  const [showPackages2, setShowPackages2] = useState(false);
  const [collapseOpen1, setCollapseOpen1] = useState(false);
  const [collapseOpen2, setCollapseOpen2] = useState(false);

  const contentRef = useRef(null);

  const togglePackages2 = () => {
    setShowPackages2(!showPackages2);
    setCollapseOpen2(!collapseOpen2);
  };

  const togglePackages = () => {
    setShowPackages(!showPackages);
    setCollapseOpen1(!collapseOpen1);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');


  const openModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


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

  const steps = [
    { title: "Editing", imgTop: "/images/p-img-top.webp", imgBottom: "/images/p-img-bottom.webp", img: "/images/p-img.webp", img1: "/images/p-img1.webp", icon: "/images/Editing.png" },
    { title: "Proofreading", imgTop: "/images/p-img-top.webp", imgBottom: "/images/p-img-bottom.webp", img: "/images/p-img.webp", img1: "/images/p-img1.webp", icon: "/images/Proofreading.png" },
    { title: "TypeSetting", imgTop: "/images/p-img-top.webp", imgBottom: "/images/p-img-bottom.webp", img: "/images/p-img.webp", img1: "/images/p-img1.webp", icon: "/images/Typesetting & Layout adjustment.png" },
    { title: "Layout Adjustment", imgTop: "/images/p-img-top.webp", imgBottom: "/images/p-img-bottom.webp", img: "/images/p-img.webp", img1: "/images/p-img1.webp", icon: "/images/Typesetting & Layout adjustment.png" },
    { title: "Formatting", imgTop: "/images/p-img-top.webp", imgBottom: "/images/p-img-bottom.webp", img: "/images/p-img.webp", img1: "/images/p-img1.webp", icon: "/images/Formatting.png" },
    { title: "Cover Designing", imgTop: "/images/p-img-top.webp", imgBottom: "/images/p-img-bottom.webp", img: "/images/p-img.webp", img1: "/images/p-img1.webp", icon: "/images/Cover Design.png" },
    { title: "Cover Adjustment", imgTop: "/images/p-img-top.webp", imgBottom: "/images/p-img-bottom.webp", img: "/images/p-img.webp", img1: "/images/p-img1.webp", icon: "/images/Cover Design.png" },
    { title: "Publishing", imgTop: "/images/p-img-top.webp", imgBottom: "/images/p-img-bottom.webp", img: "/images/p-img.webp", img1: "/images/p-img1.webp", icon: "/images/Publishing.png" },
    // ... Add other steps similarly
  ];


  const processItems = [
    { icon: '/images/Editing.png', text: 'Editing' },
    { icon: '/images/Proofreading.png', text: 'Proofreading' },
    { icon: '/images/Typesetting & Layout adjustment.png', text: 'TypeSetting' },
    { icon: '/images/Typesetting & Layout adjustment.png', text: 'Layout Adjustment' },
    { icon: '/images/Formatting.png', text: 'Formatting' },
    { icon: '/images/Cover Design.png', text: 'Cover Designing' },
    { icon: '/images/Cover Design.png', text: 'Adjustment' },
    { icon: '/images/Publishing.png', text: 'Publishing' },
  ];


  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % steps.length);
    }, 3000); // Change step every 3 seconds
    return () => clearInterval(interval);
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
      // router.push('/thankyou-offer')
      window.location.href = "thankyou-offer";
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

  const handleOpenChat = () => {
    window.zE && window.zE('webWidget', 'open');
  };

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
        <meta name="robots" content="noindex" />

        {/* Google tag Manager Script */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16471224604"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                     window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());

                      gtag('config', 'AW-16471224604');
              `,
          }}
        />
      </Head>
      <main>
        {/* <Header /> */}
        <header className="container mx-auto py-2 width-container">
          <div className="flex items-center justify-between px-2 flex-wrap md:justify-strat">
            <div className="head-logo">
              <Link className="text-center" href="/book-publishing-offer">
                <Image alt="LOGO" src={'/brand-img/logo.webp'} width={200} height={80} loading="lazy" />
              </Link>
            </div>

            <div className="flex items-center justify-end flex-col md:flex-row gap-3 flex-col-reverse">
              <button className=" btn-a items-center bg-gray-800 md:py-2 py-4 mr-2 px-3 focus:outline-none hover:bg-gray-700">
                <Link className="" href={'tel:8887867135'}>(888) 786-7135</Link>
              </button>

              <button className=" hidden btn-a items-center bg-gray-800 mr-2 md:py-2 py-4 px-3 focus:outline-none hover:bg-gray-700 md:block">
                <Link className="" href={'mailto:support@pinebookpublishing.com'}>support@pinebookpublishing.com</Link>
              </button>

              <button className="btn-a items-center bg-gray-800 md:py-2 py-4 px-3 focus:outline-none hover:bg-gray-700" onClick={handleOpenChat}>
                <Link className="" href={'javascript:;'}>Talk to an Expert</Link>
              </button>
            </div>
          </div>
        </header>
        {/* <HomePopup /> */}
        {/* <Hero  /> */}
        <HeavyComponent Component={HeroFormBookOffer} />
        {/* <HeroFormBookOffer /> */}
        <PopupBundleBookPublish isOpen={isModalOpen} onClose={closeModal} service={selectedService} />

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
                <div className="flex gap-6">
                  <button className="book-publishing-cta-btn-3 shadow-xl mt-10 cursor-pointer bg-white" onClick={handleOpenChat}><Link href={'javascript:;'}>Talk to an Expert</Link></button>
                  <button className="book-publishing-cta-btn-2 shadow-xl mt-10 cursor-pointer bg-white"><Link href="tel:(888) 786-7135">(888) 786-7135</Link></button>
                </div>
                {/* <div className="flex justify-start items-center mt-8 gap-2 md:gap-x-8 client-logo-sec about-logos-sec">
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
                </div> */}
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

        {/* <section className="portfolio overflow-hidden	 py-14">
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
                    <Image src={book.src} width={book.width} height={book.height} loading="lazy" alt={book.alt} className="book-zoom-effect glightbox" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section> */}
        <section className="portfolio-book-publishing-offer-bg">
          <PortfolioSlider3LP />
          <PortfolioSlider1LP />
          <PortfolioSlider2LP />

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
        {/* <Packages /> */}



        {/* <section className="process pt-14">
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
        </section> */}

        <section className="package pb-5 pt-12">
          <div className="container mx-auto max-w-screen-xl">
            <div className="grid items-center grid-cols-1 text-center m1-h">
              <h3 className="text-3xl font-poppins md:text-4xl font-bold">
                Book Publishing Bundles
              </h3>
              <h4 className="text-xl font-poppins md:text-xl font-bold mt-4">Limited Time Offer - Save <span className="blink_me fw-bold text-2xl">50%</span> On Book Publishing Services</h4>
            </div>

            {/* <div className="grid grid-cols-4 gap-4 items-top"> */}
            {/* <div className="grid grid-cols-1 px-6 mt-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        <div className="gap-8 brand-bundle-pack-wrap">
                            <div className="flex items-center pack-box">
                                <Image src={"/images/pp1.png"} width={40} height={50}></Image>
                                <h4 className="pl-2 text-xl font-poppins md:text-2xl">
                                    Standard
                                </h4>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                            </p>
                        </div>
                        <div className="brand-bundle-pack-wrap">
                            <div className="flex items-center pack-box">
                                <Image src={"/images/pp2.png"} width={40} height={50}></Image>
                                <h4 className="pl-2 text-xl font-poppins md:text-2xl">
                                    Professional
                                </h4>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                            </p>
                        </div>
                        <div className="brand-bundle-pack-wrap">
                            <div className="flex items-center pack-box">
                                <Image src={"/images/pp3.png"} width={40} height={50}></Image>
                                <h4 className="pl-2 text-xl font-poppins md:text-2xl">
                                    All-Inclusive
                                </h4>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                            </p>
                        </div>
                        <div className="brand-bundle-pack-wrap">
                            <div className="flex items-center pack-box">
                                <Image src={"/images/pp4.png"} width={40} height={50}></Image>
                                <h4 className="pl-2 text-xl font-poppins md:text-2xl">
                                    Traditional
                                </h4>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                            </p>
                        </div>
                    </div> */}
          </div>
        </section>

        <section className="bg-white pt-5 pb-5">
          <div className="width-container">
            <div className="container mx-auto">
              {/* <div className="text-center mb-6">
                            <h3 className="text-2xl text-black font-poppins uppercase">Publishing</h3>
                            <h2 className="font-poppins text-4xl font-bold text-black uppercase">Bundles</h2>
                        </div> */}

              <div className="packages-wrapper flex flex-col md:flex-row justify-center gap-12">
                <div className="single-packages relative">
                  {/* <span className="hover-top-vector"></span> */}

                  <h4 className="text-2xl font-poppins mb-6 text-center pt-4 pb-4 hover-top-vector relative">Basic Package
                    <br></br>
                    <div className="flex justify-center">
                      <button className="tag-50-per-off"><del className="text-red italic">$700</del> | <span className="blink_me">$349 USD</span></button>
                    </div>
                  </h4>
                  {/* <div className="flex justify-center">
                    <button className="tag-50-per-off">GRAB IT NOW: <span className="blink_me">50% OFF</span></button>
                  </div> */}
                  <div className="single-packages-content mb-5 px-10">
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Preparing Your Manuscript
                    </div>
                    {/* <div className="flex gap-2 mb-5 items-center items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Developmental Editing
                                    </div> */}
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Line by Line Editing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Proofreading
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Typesetting
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Layout Adjustment
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Formatting (50+ Platforms)
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      2 Revisions Per Draft
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Book Publishing
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Account Creation
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Account Verification
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on Kindle
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Guarantees
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      No Royalties Share
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      100% Ownership Rights
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      100% Satisfaction
                    </div>
                  </div>
                  <div className="text-center">
                    <button className="package-get-started-btn text-md mt-7" onClick={() => openModal('Basic')}>
                      START PROJECT
                    </button>
                  </div>

                  <div className="single-packages-footer flex  w-100 justify-center">
                    <div >
                      <h5 className="text-xl">Share your idea!</h5>
                      <p className="text-md text-black"><Link href="tel:(888) 786-7135">(888) 786-7135</Link></p>
                    </div>
                    <span className="border-line mx-8"></span>
                    <div>
                      <h5 className="text-xl">Want to discuss?</h5>
                      <button className="text-md text-black blink_me pl-2" onClick={handleOpenChat}>Live Chat Now</button>
                    </div>
                  </div>
                </div>
                <div className="single-packages relative">
                  <h4 className="text-2xl font-poppins mb-6 text-center pt-4 pb-4 hover-top-vector relative">Start Up Package
                    <br></br>
                    <div className="flex justify-center">
                      <button className="tag-50-per-off"><del className="text-red italic">$2,000</del> | <span className="blink_me">$999 USD</span></button>
                    </div>
                  </h4>
                  {/* <div className="flex justify-center">
                    <button className="tag-50-per-off">GRAB IT NOW: <span className="blink_me">50% OFF</span></button>
                  </div> */}
                  <div className="single-packages-content mb-5 px-10">
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Preparing Your Manuscript
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Developmental Editing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Line by Line Editing

                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Proofreading

                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Typesetting
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Layout Adjustment

                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Formatting (50+ Platforms)

                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      3 Revisions Per Draft

                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Designing your Cover
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Graphic OR Illustrated Design
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Cover Layout
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Cover Formatting
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Front, Back & Spine
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Book Publishing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Account Creation
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Account Verification
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on Amazon & Kindle
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      eBook Format
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Paperback Format
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Guarantees
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      No Royalties Share
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      100% Ownership Rights
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      100% Satisfaction
                    </div>
                  </div>
                  <div className="text-center">
                    <button className="package-get-started-btn text-md mt-7" onClick={() => openModal('Start up')}>
                      START PROJECT
                    </button>
                  </div>
                  <div className="single-packages-footer flex  w-100 justify-center">
                    <div >
                      <h5 className="text-xl">Share your idea!</h5>
                      <p className="text-md text-black"><Link href="tel:(888) 786-7135">(888) 786-7135</Link></p>
                    </div>
                    <span className="border-line mx-8"></span>
                    <div>
                      <h5 className="text-xl">Want to discuss?</h5>
                      <button className="text-md text-black blink_me pl-2" onClick={handleOpenChat}>Live Chat Now</button>
                    </div>
                  </div>
                </div>
                <div className="single-packages relative">
                  <Image src={"/images/badge.png"} className="package-badge" width={80} height={80}></Image>
                  <h4 className="text-2xl font-poppins mb-6 text-center pt-4 pb-4 hover-top-vector relative">Standard Package
                    <br></br>
                    <div className="flex justify-center">
                      <button className="tag-50-per-off"><del className="text-red italic">$3,000</del> | <span className="blink_me">$1,499 USD</span></button>
                    </div>
                  </h4>
                  {/* <div className="flex justify-center">
                    <button className="tag-50-per-off">$1000 | $499: <span className="blink_me">50% OFF</span></button>
                  </div> */}
                  <div className="single-packages-content mb-5 px-10">
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Preparing Your Manuscript
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Developmental Editing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Line by Line Editing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Proofreading

                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Typesetting

                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Layout Adjustment

                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Formatting (50+ Platforms)

                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      5 Revisions Per Draft
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Designing your Cover
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Graphic OR Illustrated Design
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Cover Layout
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Cover Formatting
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Front, Back & Spine
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      ISBN + Barcode (2X)
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Book Publishing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Account Creation
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Account Verification
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on Amazon & Kindle
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on Barnes and Noble
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      eBook Format
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Paperback Format
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Hardcover Format
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Guarantees
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      No Royalties Share
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      100% Ownership Rights
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      100% Satisfaction
                    </div>
                  </div>
                  <div className="text-center">
                    <button className="package-get-started-btn text-md mt-7" onClick={() => openModal('Standard')}>
                      START PROJECT
                    </button>
                  </div>

                  <div className="single-packages-footer flex  w-100 justify-center">
                    <div >
                      <h5 className="text-xl">Share your idea!</h5>
                      <p className="text-md text-black"><Link href="tel:(888) 786-7135">(888) 786-7135</Link></p>
                    </div>
                    <span className="border-line mx-8"></span>
                    <div>
                      <h5 className="text-xl">Want to discuss?</h5>
                      <button className="text-md text-black blink_me pl-2" onClick={handleOpenChat}>Live Chat Now</button>
                    </div>
                  </div>
                </div>
              </div>

              <section className="table-sec overflow-x-scroll max-w-screen-xl mx-auto">
                <div className="container mx-auto m1-h mt-10 text-center">
                  {/* <h3 className="mb-8 text-center font-poppins text-3xl md:text-4xl font-bold">
                        
                                </h3> */}
                  <button className="compare-now-btn mb-10 mt-5" onClick={togglePackages2}>Comparison
                    <FontAwesomeIcon
                      className="ml-2"
                      icon={collapseOpen2 ? faArrowUp : faArrowDown}
                      color="#0d0f38"
                    />
                  </button>
                </div>
                <div className="">
                  <div className={`container container-compare mx-auto transition-height duration-500 ease-in-out ${showPackages2 ? 'expanded' : 'collapsed'}`} ref={contentRef}>
                    <div className="md:w-full w-[500px] responsive-width">
                      <table className="w-full mb-14 table-auto bundle-comparison-chart table-fixed">
                        <thead className="chart-header-custom">
                          <tr>
                            <th
                              className="mainpage-regular"
                            ></th>

                            <th className="font-poppins">
                              <div className="heading">
                                Basic Package
                              </div>
                            </th >

                            <th className="font-poppins heading">
                              <div className="heading">
                                Start Up Package
                              </div>
                            </th>

                            <th className="font-poppins heading">
                              <div className="heading">
                                Standard Package
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          <tr className="m-4">
                            <th className="text-2xl md:text-2xl text-start p-3 font-bold"
                              colspan="4"
                              scope="row">Preparing Your Manuscript</th>
                          </tr>
                          <tr>
                            <td>Line by Line Editing</td>
                            <td>
                              ✔️
                            </td>
                            <td>
                              ✔️
                            </td>
                            <td>
                              ✔️
                            </td>
                          </tr>
                          <tr>
                            <td>Developmental Editing</td>
                            <td>
                              ❌
                            </td>
                            <td>
                              ✔️
                            </td>
                            <td>
                              ✔️
                            </td>
                          </tr>
                          <tr>
                            <td>Proofreading</td>
                            <td>✔️</td>
                            <td>✔️</td>
                            <td>✔️</td>
                          </tr>
                          <tr>
                            <td>Typesetting</td>
                            <td>
                              ✔️
                            </td>
                            <td>✔️</td>
                            <td>✔️</td>
                          </tr>
                          <tr>
                            <td>Layout Adjustment</td>
                            <td>
                              ✔️
                            </td>
                            <td>✔️</td>
                            <td>✔️</td>
                          </tr>
                          <tr>
                            <td>Formatting</td>
                            <td>
                              50+ Platforms
                            </td>
                            <td>50+ Platforms</td>
                            <td>50+ Platforms</td>
                          </tr>
                          <tr>
                            <td>Revisions Per Draft</td>
                            <td>
                              2
                            </td>
                            <td>3</td>
                            <td>5</td>
                          </tr>
                          <tr className="m-4">
                            <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5 lg:pl-16 md:pl-16"
                              colspan="4"
                              scope="row">Book Publishing</th>
                          </tr>
                          <tr>
                            <td>Account Creation</td>
                            <td>
                              ✔️
                            </td>
                            <td>
                              ✔️
                            </td>
                            <td>
                              ✔️
                            </td>
                          </tr>
                          <tr>
                            <td>Account Verification</td>
                            <td>
                              ✔️
                            </td>
                            <td>
                              ✔️
                            </td>
                            <td>
                              ✔️
                            </td>
                          </tr>
                          <tr>
                            <td>Kindle</td>
                            <td>✔️</td>
                            <td>✔️</td>
                            <td>✔️</td>
                          </tr>
                          <tr>
                            <td>Amazon</td>
                            <td>❌</td>
                            <td>✔️</td>
                            <td>✔️</td>
                          </tr>
                          <tr>
                            <td>Barnes and Noble</td>
                            <td>
                              ❌
                            </td>
                            <td>❌</td>
                            <td>✔️</td>
                          </tr>
                          <tr>
                            <td>eBook Format</td>
                            <td>
                              ✔️
                            </td>
                            <td>✔️</td>
                            <td>✔️</td>
                          </tr>
                          <tr>
                            <td>Paperback Format</td>
                            <td>
                              ❌
                            </td>
                            <td>✔️</td>
                            <td>✔️</td>
                          </tr>
                          <tr>
                            <td>Hardcover Format</td>
                            <td>
                              ❌
                            </td>
                            <td>❌</td>
                            <td>✔️</td>
                          </tr>

                          <tr className="m-4">
                            <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5 lg:pl-10 md:pl-10"
                              colspan="4"
                              scope="row">Designing your Cover</th>
                          </tr>
                          <tr>
                            <td>Graphic OR Illustrated Design</td>
                            <td>
                              ❌
                            </td>
                            <td>
                              ✔️
                            </td>
                            <td>
                              ✔️
                            </td>
                          </tr>
                          <tr>
                            <td>Cover Layout</td>
                            <td>
                              ❌
                            </td>
                            <td>
                              ✔️
                            </td>
                            <td>
                              ✔️
                            </td>
                          </tr>
                          <tr>
                            <td>Cover Formatting</td>
                            <td>❌</td>
                            <td>✔️</td>
                            <td>✔️</td>
                          </tr>
                          <tr>
                            <td>Front, Back & Spine</td>
                            <td>
                              ❌
                            </td>
                            <td>✔️</td>
                            <td>✔️</td>
                          </tr>
                          <tr>
                            <td>ISBN + Barcode (2X)</td>
                            <td>
                              ❌
                            </td>
                            <td>❌</td>
                            <td>✔️</td>
                          </tr>
                          <tr className="m-4">
                            <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5 lg:pl-20 md:pl-20"
                              colspan="4"
                              scope="row">Guarantees</th>
                          </tr>
                          <tr>
                            <td>No Royalties Share</td>
                            <td>
                              ✔️
                            </td>
                            <td>
                              ✔️
                            </td>
                            <td>
                              ✔️
                            </td>
                          </tr>
                          <tr>
                            <td>100% Ownership Rights</td>
                            <td>
                              ✔️
                            </td>
                            <td>
                              ✔️
                            </td>
                            <td>
                              ✔️
                            </td>
                          </tr>
                          <tr>
                            <td>100% Satisfaction</td>
                            <td>✔️</td>
                            <td>✔️</td>
                            <td>✔️</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>

              <div className="packages-wrapper flex flex-col md:flex-row justify-center gap-12 mt-0">
                <div className="single-packages relative">
                  <h4 className="text-2xl font-poppins mb-6 text-center pt-4 pb-4 hover-top-vector relative">Expert Package
                    <br></br>
                    <div className="flex justify-center">
                      <button className="tag-50-per-off"><del className="text-red italic">$7,000</del> | <span className="blink_me">$3,499 USD</span></button>
                    </div>
                  </h4>
                  {/* <div className="flex justify-center">
                    <button className="tag-50-per-off">GRAB IT NOW: <span className="blink_me">50% OFF</span></button>
                  </div> */}
                  <div className="single-packages-content mb-5 px-10">
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Preparing Your Manuscript
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Developmental Editing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Line by Line Editing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Proofreading
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Typesetting
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Layout Adjustment
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Formatting (50+ Platforms)
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      5 Revisions Per Draft
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Designing your Cover
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Graphic OR Illustrated Design
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Cover Layout
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Cover Formatting
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Front, Back & Spine
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      ISBN + Barcode (2X)
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Book Publishing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Account Creation
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Account Verification
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on Amazon & Kindle
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on Barnes and Noble
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on Google Books
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      eBook Format
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Paperback Format
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Hardcover Format
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Online Presence
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      3 - 5 Page Authors Website
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      1 - Year Domain & Hosting
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      30 - 60 Seconds Book Trailer
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Guarantees
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      No Royalties Share
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      100% Ownership Rights
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      100% Satisfaction
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <h5 className="font-poppins text-xl flex justify-center items-center gap-3">
                      EASY PAYMENT PLAN
                      <div className="tooltip">
                        <Image src={"/images/question-icon.png"} className="icon" width={20} height={20}></Image>
                        <span className="tooltip-content">
                          <ul>
                            <li> 50% PAYMENT UPFRONT.</li>
                            <li> REMAINING 50% CAN BE PAID IN 2-3 MONTHS INSTALLMENTS</li>
                            OR
                            <li> AFTER THE DELIVERY OF 3 CHAPTERS.</li>
                          </ul>
                        </span>
                      </div>
                    </h5>
                  </div>
                  <div className="text-center">
                    <button className="package-get-started-btn text-md mt-5" onClick={() => openModal('Expert')}>
                      START PROJECT
                    </button>
                  </div>

                  <div className="single-packages-footer flex  w-100 justify-center">
                    <div >
                      <h5 className="text-xl">Share your idea!</h5>
                      <p className="text-md text-black"><Link href="tel:(888) 786-7135">(888) 786-7135</Link></p>
                    </div>
                    <span className="border-line mx-8"></span>
                    <div>
                      <h5 className="text-xl">Want to discuss?</h5>
                      <button className="text-md text-black blink_me pl-2" onClick={handleOpenChat}>Live Chat Now</button>
                    </div>
                  </div>
                </div>
                <div className="single-packages relative">
                  <Image src={"/images/badge.png"} className="package-badge" width={80} height={80}></Image>
                  <h4 className="text-2xl font-poppins mb-6 text-center pt-4 pb-4 hover-top-vector relative">Premium Package
                    <br></br>
                    <div className="flex justify-center">
                      <button className="tag-50-per-off"><del className="text-red italic">$15,000</del> | <span className="blink_me">$7,499 USD</span></button>
                    </div>
                  </h4>
                  {/* <div className="flex justify-center">
                    <button className="tag-50-per-off">GRAB IT NOW: <span className="blink_me">50% OFF</span></button>
                  </div> */}
                  <div className="single-packages-content mb-5 px-10">
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Preparing Your Manuscript
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Developmental Editing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Line by Line Editing

                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Proofreading

                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Typesetting
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Layout Adjustment

                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Formatting (50+ Platforms)

                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      5 Revisions Per Draft

                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Designing your Cover
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Graphic OR Illustrated Design
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Cover Layout
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Cover Formatting
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Front, Back & Spine
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      ISBN + Barcode (2X)
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Book Publishing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Account Creation
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Account Verification
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on Amazon & Kindle
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on Barnes and Noble
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on Google Books
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on Smashwords
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      eBook Format
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Paperback Format
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Hardcover Format
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      12 Months Brand Marketing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Logo Design (Complimentary)
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      3 - 5 Page Authors Website
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      1 - Year Domain & Hosting
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      30 - 60 Seconds Book Trailer
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Organic Google Marketing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Social Media Marketing
                      (Facebook, Instagram & LinkedIn)
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Guarantees
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      No Royalties Share
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      100% Ownership Rights
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      100% Satisfaction
                    </div>
                  </div>
                  <div className="text-center">
                    <h5 className="font-poppins text-xl flex justify-center items-center gap-3">
                      EASY PAYMENT PLAN
                      <div className="tooltip">
                        <Image src={"/images/question-icon.png"} className="icon" width={20} height={20}></Image>
                        <span className="tooltip-content">
                          <ul>
                            <li> 50% PAYMENT UPFRONT.</li>
                            <li> REMAINING 50% CAN BE PAID IN 2-3 MONTHS INSTALLMENTS</li>
                            OR
                            <li> AFTER THE DELIVERY OF 3 CHAPTERS.</li>
                          </ul>
                        </span>
                      </div>
                    </h5>
                  </div>
                  <div className="text-center">
                    <button className="package-get-started-btn text-md mt-8" onClick={() => openModal('Premium')}>
                      START PROJECT
                    </button>
                  </div>
                  <div className="single-packages-footer flex  w-100 justify-center">
                    <div >
                      <h5 className="text-xl">Share your idea!</h5>
                      <p className="text-md text-black"><Link href="tel:(888) 786-7135">(888) 786-7135</Link></p>
                    </div>
                    <span className="border-line mx-8"></span>
                    <div>
                      <h5 className="text-xl">Want to discuss?</h5>
                      <button className="text-md text-black blink_me pl-2" onClick={handleOpenChat}>Live Chat Now</button>
                    </div>
                  </div>
                </div>
                <div className="single-packages relative">
                  <h4 className="text-2xl font-poppins mb-6 text-center pt-4 pb-4 hover-top-vector relative">Enterprise Package
                    <br></br>
                    <div className="flex justify-center">
                      <button className="tag-50-per-off"><del className="text-red italic">$25,000</del> | <span className="blink_me">$12,499 USD</span></button>
                    </div>
                  </h4>
                  {/* <div className="flex justify-center">
                    <button className="tag-50-per-off">GRAB IT NOW: <span className="blink_me">50% OFF</span></button>
                  </div> */}
                  <div className="single-packages-content mb-5 px-10">
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Preparing Your Manuscript
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Developmental Editing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Line by Line Editing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Proofreading

                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Typesetting

                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Layout Adjustment

                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Formatting (50+ Platforms)
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      5 Revisions Per Draft
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Designing your Cover
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Graphic OR Illustrated Design
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Cover Layout
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Cover Formatting
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Front, Back & Spine
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      ISBN + Barcode (2X)
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Book Publishing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Account Creation
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Account Verification
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on Amazon & Kindle
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on Barnes and Noble
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on Google Books
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on Smashwords
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on Draft2Digital
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Available on ACX
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      eBook Format
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Paperback Format
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Hardcover Format
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Audiobook Format
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      24 Months Brand Marketing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Logo Design (Complimentary)
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      3 - 5 Page Authors Website
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      2 - Year Domain & Hosting
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      60 - 90 Seconds Video Trailer
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Organic Google Marketing
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Blogs & Article Postings
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Press Releases (150+ Platforms)
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      Social Media Marketing
                      (Facebook, Instagram, Twitter)
                      (Pinterest, Youtube & LinkedIn)
                    </div>
                    <div className="flex gap-2 mb-5 items-center items-center text-xl">
                      Guarantees
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      No Royalties Share
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      100% Ownership Rights
                    </div>
                    <div className="flex gap-2 mb-5 items-center">
                      <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                      100% Satisfaction
                    </div>
                  </div>
                  <div className="text-center">
                    <h5 className="font-poppins text-xl flex justify-center items-center gap-3">
                      EASY PAYMENT PLAN
                      <div className="tooltip">
                        <Image src={"/images/question-icon.png"} className="icon" width={20} height={20}></Image>
                        <span className="tooltip-content">
                          <ul>
                            <li> 50% PAYMENT UPFRONT.</li>
                            <li> REMAINING 50% CAN BE PAID IN 2-3 MONTHS INSTALLMENTS</li>
                            OR
                            <li> AFTER THE DELIVERY OF 3 CHAPTERS.</li>
                          </ul>
                        </span>
                      </div>

                    </h5>
                  </div>
                  <div className="text-center">
                    <button className="package-get-started-btn font-poppins text-md mt-8" onClick={() => openModal('Enterprise')}>
                      START PROJECT
                    </button>
                  </div>

                  <div className="single-packages-footer flex  w-100 justify-center">
                    <div >
                      <h5 className="text-xl">Share your idea!</h5>
                      <p className="text-md text-black"><Link href="tel:(888) 786-7135">(888) 786-7135</Link></p>
                    </div>
                    <span className="border-line mx-8"></span>
                    <div>
                      <h5 className="text-xl">Want to discuss?</h5>
                      <button className="text-md text-black blink_me pl-2" onClick={handleOpenChat}>Live Chat Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="table-sec overflow-x-scroll max-w-screen-xl mx-auto">
          <div className="container mx-auto m1-h mt-10 text-center">
            <button className="compare-now-btn mb-10 mt-5" onClick={togglePackages}>Comparison
              <FontAwesomeIcon
                className="ml-2"
                icon={collapseOpen1 ? faArrowUp : faArrowDown}
                color="#0d0f38"
              />
            </button>
          </div>
          <div className="">
            <div className={`container container-compare mx-auto transition-height duration-500 ease-in-out ${showPackages ? 'expanded' : 'collapsed'}`} ref={contentRef}>
              <div className="md:w-full w-[500px] responsive-width">
                <table className="w-full mb-14 table-auto bundle-comparison-chart table-fixed">
                  <thead className="chart-header-custom">
                    <tr>
                      <th
                        className="mainpage-regular"
                      ></th>

                      <th className="font-poppins">
                        <div className="heading">
                          Expert Package
                        </div>
                      </th >
                      <th className="font-poppins">
                        <div className="heading">
                          Premium Package
                        </div>
                      </th>

                      <th className="font-poppins">
                        <div className="heading">
                          Enterprise Package
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr className="m-4">
                      <th className="text-2xl md:text-2xl text-start p-3 font-bold"
                        colspan="4"
                        scope="row">Preparing Your Manuscript</th>
                    </tr>
                    <tr>
                      <td>Line by Line Editing</td>
                      <td>
                        ✔️
                      </td>
                      <td>
                        ✔️
                      </td>
                      <td>
                        ✔️
                      </td>
                    </tr>
                    <tr>
                      <td>Developmental Editing</td>
                      <td>
                        ✔️
                      </td>
                      <td>
                        ✔️
                      </td>
                      <td>
                        ✔️
                      </td>
                    </tr>
                    <tr>
                      <td>Proofreading</td>
                      <td>✔️</td>
                      <td>✔️</td>
                      <td>✔️</td>
                    </tr>
                    <tr>
                      <td>Typesetting</td>
                      <td>
                        ✔️
                      </td>
                      <td>✔️</td>
                      <td>✔️</td>
                    </tr>
                    <tr>
                      <td>Layout Adjustment</td>
                      <td>
                        ✔️
                      </td>
                      <td>✔️</td>
                      <td>✔️</td>
                    </tr>
                    <tr>
                      <td>Formatting</td>
                      <td>
                        50+ Platforms
                      </td>
                      <td>50+ Platforms</td>
                      <td>50+ Platforms</td>
                    </tr>
                    <tr>
                      <td>Revisions Per Draft</td>
                      <td>
                        5
                      </td>
                      <td>5</td>
                      <td>5</td>
                    </tr>
                    <tr className="m-4">
                      <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5 lg:pl-16 md:pl-16"
                        colspan="4"
                        scope="row">Book Publishing</th>
                    </tr>
                    <tr>
                      <td>Account Creation</td>
                      <td>
                        ✔️
                      </td>
                      <td>
                        ✔️
                      </td>
                      <td>
                        ✔️
                      </td>
                    </tr>
                    <tr>
                      <td>Account Verification</td>
                      <td>
                        ✔️
                      </td>
                      <td>
                        ✔️
                      </td>
                      <td>
                        ✔️
                      </td>
                    </tr>
                    <tr>
                      <td>Kindle</td>
                      <td>✔️</td>
                      <td>✔️</td>
                      <td>✔️</td>
                    </tr>
                    <tr>
                      <td>Amazon</td>
                      <td>✔️</td>
                      <td>✔️</td>
                      <td>✔️</td>
                    </tr>
                    <tr>
                      <td>Barnes and Noble</td>
                      <td>
                        ✔️
                      </td>
                      <td>✔️</td>
                      <td>✔️</td>
                    </tr>
                    <tr>
                      <td>Google Books</td>
                      <td>✔️</td>
                      <td>✔️</td>
                      <td>✔️</td>
                    </tr>
                    <tr>
                      <td>Smashwords</td>
                      <td>
                        ❌
                      </td>
                      <td>✔️</td>
                      <td>✔️</td>
                    </tr>
                    <tr>
                      <td>Draft2Digital</td>
                      <td>
                        ❌
                      </td>
                      <td>❌</td>
                      <td>✔️</td>
                    </tr>
                    <tr>
                      <td>ACX</td>
                      <td>
                        ❌
                      </td>
                      <td>❌</td>
                      <td>✔️</td>
                    </tr>
                    <tr>
                      <td>eBook Format</td>
                      <td>
                        ✔️
                      </td>
                      <td>✔️</td>
                      <td>✔️</td>
                    </tr>
                    <tr>
                      <td>Paperback Format</td>
                      <td>
                        ✔️
                      </td>
                      <td>✔️</td>
                      <td>✔️</td>
                    </tr>
                    <tr>
                      <td>Hardcover Format</td>
                      <td>
                        ✔️
                      </td>
                      <td>✔️</td>
                      <td>✔️</td>
                    </tr>
                    <tr>
                      <td>Audiobook Format</td>
                      <td>
                        ❌
                      </td>
                      <td>❌</td>
                      <td>✔️</td>
                    </tr>
                    <tr className="m-4">
                      <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5 lg:pl-8 md:pl-8"
                        colspan="4"
                        scope="row">Designing your Cover</th>
                    </tr>
                    <tr>
                      <td>Graphic OR Illustrated Design</td>
                      <td>
                        ✔️
                      </td>
                      <td>
                        ✔️
                      </td>
                      <td>
                        ✔️
                      </td>
                    </tr>
                    <tr>
                      <td>Cover Layout</td>
                      <td>
                        ✔️
                      </td>
                      <td>
                        ✔️
                      </td>
                      <td>
                        ✔️
                      </td>
                    </tr>
                    <tr>
                      <td>Cover Formatting</td>
                      <td>✔️</td>
                      <td>✔️</td>
                      <td>✔️</td>
                    </tr>
                    <tr>
                      <td>Front, Back & Spine</td>
                      <td>
                        ✔️
                      </td>
                      <td>✔️</td>
                      <td>✔️</td>
                    </tr>
                    <tr>
                      <td>ISBN + Barcode (2X)</td>
                      <td>
                        ✔️
                      </td>
                      <td>✔️</td>
                      <td>✔️</td>
                    </tr>
                    {/* <tr className="m-4">
                                        <td className="text-2xl md:text-2xl text-start p-3 font-bold"
                                            colspan="4"
                                            scope="row">Guarantees</td>
                                    </tr>
                                    <tr>
                                        <td>No Royalties Share</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>100% Ownership Rights</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>100% Satisfaction</td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                        <td>✔️</td>
                                    </tr> */}
                    <tr className="m-4">
                      <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5 lg:pl-14 md:pl-14"
                        colspan="4"
                        scope="row">Online Presence</th>
                    </tr>
                    <tr>
                      <td>Authors Website</td>
                      <td>
                        3-5 Pages
                      </td>
                      <td>
                        3-5 Pages
                      </td>
                      <td>
                        3-5 Pages
                      </td>
                    </tr>
                    <tr>
                      <td>Domain & Hosting</td>
                      <td>
                        1 Year
                      </td>
                      <td>
                        1 Year
                      </td>
                      <td>
                        2 Year
                      </td>
                    </tr>
                    <tr className="m-4">
                      <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5 lg:pl-8 md:pl-8"
                        colspan="4"
                        scope="row">Marketing & Branding</th>
                    </tr>
                    <tr>
                      <td>Book Trailer</td>
                      <td>
                        30-60 Seconds
                      </td>
                      <td>
                        30-60 Seconds
                      </td>
                      <td>
                        60-90 Seconds
                      </td>
                    </tr>
                    <tr>
                      <td>Social Media Marketing</td>
                      <td>
                        ❌
                      </td>
                      <td>
                        3 Platforms
                      </td>
                      <td>
                        6 Platforms
                      </td>
                    </tr>
                    <tr>
                      <td>Organic Google Marketing</td>
                      <td>
                        ❌
                      </td>
                      <td>
                        6 Months
                      </td>
                      <td>
                        12 Months
                      </td>
                    </tr>
                    <tr>
                      <td>Blogs & Article Postings</td>
                      <td>
                        ❌
                      </td>
                      <td>
                        ❌
                      </td>
                      <td>
                        ✔️
                      </td>
                    </tr>
                    <tr>
                      <td>Press Releases</td>
                      <td>
                        ❌
                      </td>
                      <td>
                        ❌
                      </td>
                      <td>
                        150+ Platforms
                      </td>
                    </tr>
                    <tr className="m-4">
                      <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5 lg:pl-20 md:pl-20"
                        colspan="4"
                        scope="row">Guarantees</th>
                    </tr>
                    <tr>
                      <td>100% Royalties</td>
                      <td>
                        ✔️
                      </td>
                      <td>
                        ✔️
                      </td>
                      <td>
                        ✔️
                      </td>
                    </tr>
                    <tr>
                      <td>100% Ownership Rights</td>
                      <td>
                        ✔️
                      </td>
                      <td>
                        ✔️
                      </td>
                      <td>
                        ✔️
                      </td>
                    </tr>
                    {/* <tr>
                                        <td>100% Satisfaction</td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                        <td>
                                            ✔️
                                        </td>
                                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="my-7 py-20 overflow-hidden">
          <div className="text-center mb-6 new-lp3-why-choose-us-title">
            <h2 className="text-3xl text-black uppercase font-bold">Our Process: From Concept to Perfection</h2>
          </div>
          <div className="lg:block md:block hidden">
            <div className="new-lp3-process-wrapper max-w-screen-xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className={`process-item ${index === activeIndex ? 'active' : ''}`}>
                  <h3>{step.title}</h3>
                  <div>
                    <Image src={step.icon} width={40} height={40} alt="icon" />
                    <Image className="p-img" src={index % 2 === 0 ? step.imgTop : step.imgBottom} width={130} height={130} alt="process" />
                    <Image src={step.img} width={130} height={130} alt="process" />
                    <Image src={step.img1} width={130} height={130} alt="process" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:hidden md:hidden block">
            <div className="new-lp3-process-wrapper max-w-screen-xl mx-auto">
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                loop={true}
              >
                {processItems.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className='process-item-mob'>
                      <img src={item.icon} height={40} width={40} alt="icon" />
                      <h3 className="text-black text-2xl mt-3">{item.text}</h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

        </section>

        <Story />

        <section className="book-publishing-cta-section mx-auto px-6 py-10 md:py-0 relative">
          <div className="container flex items-center flex-col md:flex-row max-w-screen-xl mx-auto">
            <div className="basis-1/2 text-center flex justify-end">
              <Image src={"/images/book-image-big.png"} width={400} height={200} className="aos-init aos-animate book-publishing-cta-img" ></Image>
            </div>
            <div className="basis-1/2 md:ml-20">
              <h2 className="text-white font-poppins text-3xl md:text-5xl aos-init aos-animate font-bold" data-aos="flip-down">Let's Tell Your Story to the World!
              </h2>
              <p className="text-white mt-7">Ready to share your fascinating story with your potential audience? Contact Pine Book Publishing and get a free quote now!
              </p>
              <div className="flex gap-6">
                <button className="book-publishing-cta-btn-1 shadow-xl mt-10 cursor-pointer bg-white" onClick={handleOpenChat}><Link href={'javascript:;'}>Talk to an Expert</Link></button>
                <button className="book-publishing-cta-btn-2 shadow-xl mt-10 cursor-pointer bg-white"><Link href="tel:(888) 786-7135">(888) 786-7135</Link></button>
              </div>
            </div>
          </div>
        </section>

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

        {/* <Footer /> */}
        {/* <BrandFooter /> */}
        <BrandFooterBook />

        {/* <motion.p className="font-acumin text-5xl text-center text-black leading-loose font-bold hover:text-[#EBFA0B]" ref={nodeRef} >{rounded}<Counter from={100} to={1000} val={"10"} />100</motion.p> */}

      </main>
    </>
  );
}
