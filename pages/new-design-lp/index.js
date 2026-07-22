"use client"
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import CountryPhoneInput from "../../components/CountryPhoneInput";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomePage() {
  const aboutSectionRef = useRef(null);
  const pageAnimRef = useRef(null);
  const [activeBookTab, setActiveBookTab] = useState("published");
  const [bookPage, setBookPage] = useState(0);
  const [portfolioIndex, setPortfolioIndex] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [eventIndex, setEventIndex] = useState(0);
  const [processPage, setProcessPage] = useState(0);
  const testiContentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
            gsap.from(".about-anim-title", {
                y: 26,
                opacity: 0,
                duration: 0.75,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".about-anim-title",
                    start: "top 82%",
                },
            });

            gsap.from(".about-anim-text", {
                y: 24,
                opacity: 0,
                duration: 0.75,
                delay: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".about-anim-text",
                    start: "top 84%",
                },
            });

      gsap.from(".about-card-anim", {
        y: 42,
        opacity: 0,
                duration: 0.85,
                ease: "power3.out",
                stagger: 0.18,
                scrollTrigger: {
                    trigger: ".about-cards-wrap",
                    start: "top 83%",
        },
      });

      gsap.from(".books-anim-head", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".books-anim-head",
          start: "top 86%",
        },
      });

      gsap.from(".books-anim-grid .book-card", {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".books-anim-grid",
          start: "top 84%",
        },
      });

      gsap.from(".portfolio-anim-left", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".portfolio-anim-wrap",
          start: "top 84%",
        },
      });

      gsap.from(".portfolio-anim-right", {
        x: 40,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".portfolio-anim-wrap",
          start: "top 84%",
        },
      });

      gsap.from(".publishing-anim-head", {
        y: 22,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".publishing-anim-head",
          start: "top 86%",
        },
      });

      gsap.from(".publishing-anim-card-left", {
        y: 34,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".publishing-anim-wrap",
          start: "top 84%",
        },
      });

      gsap.from(".publishing-anim-card-right", {
        y: 34,
        opacity: 0,
        duration: 0.85,
        delay: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".publishing-anim-wrap",
          start: "top 84%",
        },
      });

      gsap.from(".hero-anim", {
        y: 26,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".hero-anim",
          start: "top 82%",
        },
      });

      gsap.from(".brand-anim", {
        y: 24,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".brand-anim",
          start: "top 86%",
        },
      });

      gsap.from(".story-anim", {
        y: 26,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".story-anim",
          start: "top 84%",
        },
      });

      gsap.from(".testi-anim-wrap", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testi-anim-wrap",
          start: "top 84%",
        },
      });

      gsap.from(".event-anim-wrap", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".event-anim-wrap",
          start: "top 84%",
        },
      });

      gsap.from(".process-anim-wrap", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-anim-wrap",
          start: "top 84%",
        },
      });

      gsap.from(".packages-anim-wrap .package-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".packages-anim-wrap",
          start: "top 84%",
        },
      });

      gsap.from(".services-anim-title", {
        y: 24,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-anim-wrap",
          start: "top 84%",
        },
      });

      gsap.from(".service-pill", {
        y: 22,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: ".services-anim-wrap",
          start: "top 82%",
        },
      });
    }, pageAnimRef);

    return () => ctx.revert();
  }, []);

    const brandItems = [
        { src: "/brand-img/google books icon.png", alt: "Google Books", width: 116, height: 40 },
        { src: "/brand-img/amazon-icon.png", alt: "Amazon", width: 148, height: 44 },
        { src: "/brand-img/kobo.png", alt: "Kobo", width: 110, height: 40 },
        { type: "bam" },
        { src: "/brand-img/Hardcover%20lulu.png", alt: "Lulu", width: 132, height: 44 },
        { src: "/images/Draft2digital.png", alt: "Draft2Digital", width: 184, height: 36 },
    ];

    const publishedBooks = [
        { title: "Simple Way Of Piece Life", author: "Armor Ramsey", cover: "/brand-img/new-lp/book-covers/PAPERBACK_2.jpg" },
        { title: "Great Travel At Desert", author: "Sanchit Howdy", cover: "/brand-img/new-lp/book-covers/PAPERBACK-4.jpg" },
        { title: "The Lady Beauty Scarlett", author: "Arthur Doyle", cover: "/brand-img/new-lp/book-covers/PAPERBACK_6.000x9.jpg" },
        { title: "Once Upon A Time", author: "Klien Marry", cover: "/brand-img/new-lp/book-covers/Stewart BC 8.jpg" },
        { title: "Silent Fear", author: "Chhavyvann So", cover: "/brand-img/new-lp/book-covers/Chhavyvann So 2-01.jpg" },
        { title: "River of Time", author: "Rosetta Khalideen", cover: "/brand-img/new-lp/book-covers/Time & The River 7.jpg" },
        { title: "Unique Moore", author: "Unique Moore", cover: "/brand-img/new-lp/book-covers/Unique Moore Part 1- Paperback.jpg" },
        { title: "Christopher Allen", author: "Christopher Allen", cover: "/brand-img/new-lp/book-covers/Christopher Allen PB.jpg" },
    ];

    const comingSoonBooks = [
        { title: "Winds Of Future", author: "Elyan James", cover: "/brand-img/coming-soon-book1.png" },
        { title: "Desert Memory", author: "Lina Porter", cover: "/brand-img/coming-soon-book2.png" },
        { title: "Broken Compass", author: "Tyler Hope", cover: "/brand-img/coming-soon-book3.png" },
        { title: "House of Silence", author: "Mila Cooper", cover: "/brand-img/coming-soon-book4.png" },
        { title: "Hidden Oath", author: "Shawn Miller", cover: "/brand-img/coming-soon-book5.png" },
        { title: "Kingdom Dust", author: "Amir Stone", cover: "/brand-img/coming-soon-book6.png" },
        { title: "Misty Dawn", author: "Holly Craig", cover: "/brand-img/coming-soon-book7.png" },
        { title: "Northern Flame", author: "Ariana Cole", cover: "/brand-img/coming-soon-book8.png" },
    ];

    const currentBooks = activeBookTab === "published"
        ? [...publishedBooks, ...publishedBooks]
        : [...comingSoonBooks, ...comingSoonBooks];
    const totalBookPages = Math.ceil(currentBooks.length / 4);
    const visibleBooks = currentBooks.slice(bookPage * 4, bookPage * 4 + 4);

    useEffect(() => {
        const interval = setInterval(() => {
            setBookPage((prev) => (prev + 1) % totalBookPages);
        }, 3500);
        return () => clearInterval(interval);
    }, [totalBookPages]);

  useEffect(() => {
    setBookPage(0);
  }, [activeBookTab]);

  const portfolioSlides = [
    {
      src: "/brand-img/new-lp/10.webp",
      alt: "Illustration Portfolio",
      pill: "Illustration",
      bg: "#f6dce8",
    },
    {
      src: "/brand-img/new-lp/9.webp",
      alt: "Website Design Portfolio",
      pill: "Website Design",
      bg: "#efd9be",
    },
    {
      src: "/brand-img/new-lp/8.webp",
      alt: "Book Cover Design Portfolio",
      pill: "Book Cover Design",
      bg: "#22131f",
    },
    {
      src: "/brand-img/new-lp/7.webp",
      alt: "Proofreading & Editing Portfolio",
      pill: "Proofreading & Editing",
      bg: "#e8e2d8",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPortfolioIndex((prev) => (prev + 1) % portfolioSlides.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [portfolioSlides.length]);

  const testimonials = [
    {
      name: "Alex Carter",
      role: "Author",
      text: "Elementum delivered the site within the timeline as they requested. In the end, the client found a 50% increase in traffic within days since its launch. They also had an impressive ability to use technologies that the company hasn’t used, which have also proved to be easy to use and reliable.",
      image: "/brand-img/team-1.webp",
    },
    {
      name: "Mark Jules",
      role: "Writer",
      text: "The publishing workflow was clear, organized, and fast. Their team kept communication strong from manuscript edits to final launch, and the result looked premium on every platform.",
      image: "/brand-img/team-2.webp",
    },
    {
      name: "Noah Griffin",
      role: "Client",
      text: "We saw noticeable traction after release. The cover, formatting, and listing optimization were handled professionally, and every step felt transparent and collaborative.",
      image: "/brand-img/team-3.webp",
    },
    {
      name: "Riyan Scott",
      role: "Bestselling Author",
      text: "From concept to publication, the service quality stayed consistent. Their experts solved issues quickly and helped us hit deadlines without compromising quality.",
      image: "/brand-img/team-4.webp",
    },
    {
      name: "Chris Dean",
      role: "Publisher",
      text: "The team delivered excellent support and practical advice throughout the process. We felt confident at every milestone and the final output exceeded expectations.",
      image: "/brand-img/team-5.webp",
    },
  ];
  const testimonialCount = testimonials.length;

  useEffect(() => {
    const t = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialCount);
    }, 4200);
    return () => clearInterval(t);
  }, [testimonialCount]);

  useEffect(() => {
    if (!testiContentRef.current) return;
    gsap.fromTo(
      ".testi-anim-target",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }
    );
    gsap.fromTo(
      ".testi-photo-active",
      { scale: 0.92, opacity: 0.7 },
      { scale: 1, opacity: 1, duration: 0.55, ease: "power2.out" }
    );
  }, [activeTestimonial]);

  const eventSlides = [
    { title: "Book Publishing", image: "/brand-img/new-lp/event-1.webp" },
    { title: "Manuscript", image: "/brand-img/new-lp/event-2.webp" },
    { title: "Publishing Process", image: "/brand-img/new-lp/event-3.webp" },
    { title: "Author Branding", image: "/brand-img/new-lp/1.webp" },
    { title: "Editing Session", image: "/brand-img/new-lp/2.webp" },
  ];
  const eventTotalSteps = eventSlides.length;
  const visibleEventSlides = [0, 1, 2].map((offset) => eventSlides[(eventIndex + offset) % eventTotalSteps]);

  const prevEvents = () => {
    setEventIndex((prev) => (prev - 1 + eventTotalSteps) % eventTotalSteps);
  };
  const nextEvents = () => {
    setEventIndex((prev) => (prev + 1) % eventTotalSteps);
  };

  const processSlides = [
    [
      { title: "Editing", icon: "monitor", active: true },
      { title: "Formatting", icon: "screen" },
      { title: "Typesetting", icon: "chart" },
      { title: "Layout Adjustment", icon: "monitor", active: true },
      { title: "Proofreading", icon: "screen" },
      { title: "Cover Designing", icon: "chart" },
      { title: "Cover Adjustment", icon: "monitor", active: true },
      { title: "Publishing", icon: "screen" },
      { title: "Typesetting", icon: "chart" },
    ],
    [
      { title: "Developmental Edit", icon: "monitor", active: true },
      { title: "Interior Design", icon: "screen" },
      { title: "Book Layout", icon: "chart" },
      { title: "Line Editing", icon: "monitor", active: true },
      { title: "Copy Editing", icon: "screen" },
      { title: "Cover Art", icon: "chart" },
      { title: "Final Polish", icon: "monitor", active: true },
      { title: "Global Release", icon: "screen" },
      { title: "Optimization", icon: "chart" },
    ],
    [
      { title: "Content Review", icon: "monitor", active: true },
      { title: "Book Structure", icon: "screen" },
      { title: "Print Setup", icon: "chart" },
      { title: "Chapter Styling", icon: "monitor", active: true },
      { title: "Language Polish", icon: "screen" },
      { title: "Cover Mockups", icon: "chart" },
      { title: "Final Adjustment", icon: "monitor", active: true },
      { title: "Publishing QA", icon: "screen" },
      { title: "Distribution", icon: "chart" },
    ],
  ];

  useEffect(() => {
    const p = setInterval(() => {
      setProcessPage((prev) => (prev + 1) % processSlides.length);
    }, 4200);
    return () => clearInterval(p);
  }, [processSlides.length]);

    return (
        <>
            <Head>
                <title>Pine Book Publishing | Book Publishing Offer</title>
                <meta
                    name="description"
                    content="Hire Professional Book Publishing company. At Pine Book Publishing, we provide to comprehensive book publishing services. Your Trusted Book Writing Partners In The USA And Canada."
                />
                <meta name="google-site-verification" content="v2pKJGIZnMWCWw2QC5nuRPYT5gvDQlUtT0lZYFIhHYo" />
                <link rel="shortcut icon" href="/images/fav.png" />
                <meta name="robots" content="noindex" />
            </Head>

      <main ref={pageAnimRef} className="font-sans">
                <section className="hero-anim pbp-hero relative overflow-hidden text-white">
                    <div className="pbp-overlay" />
                    <div className="pbp-glow" />
                    <div className="relative z-[2] mx-auto max-w-[1240px] px-4 md:px-8 pt-7 md:pt-8 pb-24 md:pb-36">
                        <header className="flex flex-wrap items-center justify-between gap-6">
                            <Link href="/" className="inline-flex items-center">
                                <Image
                                    src="/brand-img/logo_.png"
                                    alt="Pine Book Publishing"
                                    width={228}
                                    height={80}
                                    className="h-auto w-[175px] md:w-[228px]"
                                />
                            </Link>

                            <div className="flex flex-wrap items-center gap-4 md:gap-7 text-[14px] leading-none text-[#e8fffb]">
                                <a href="tel:+18887867315" className="hover:text-white transition-colors">(888) 786-7135</a>
                                <a href="mailto:support@pinebookpublishing.com" className="hover:text-white transition-colors">support@pinebookpublishing.com</a>
                                <button type="button" className="hover:text-white transition-colors">Talk To An Expert</button>
                                <button type="button" className="h-[40px] min-w-[145px] rounded-full bg-[#3cc7b6]" aria-label="Get Started" />
                            </div>
                        </header>

                        <div className="mt-12 md:mt-14 grid items-start gap-12 lg:grid-cols-[1fr_380px]">
                            <div className="max-w-[630px]">
                                <p className="text-[36px] leading-[1.1] text-[#74f0b0]">#1 Self <span className="text-white">Publishing Company</span></p>
                                <h1 className="mt-3 text-[58px] md:text-[56px] leading-[1.06] font-[800] tracking-[-0.2px] uppercase">
                                    Do You Have A
                                    <br />
                                    Manuscript Ready To
                                    <br />
                                    Be <span className="text-[#78f2b6]">Published?</span>
                                </h1>
                                <p className="mt-5 max-w-[610px] text-[33px] leading-[1.45] text-[#d5efea]">
                                    Pine Book Publishing has made it much easier to self-publish a book, with hands-on support from the first word to the final cover. Our process involves Proofreading, Editing, Formatting, Book Cover Design, Publishing, and print-on-demand through a vast network of global outlets.
                                </p>

                                <div className="mt-9 flex items-center gap-5">
                                    <button type="button" className="h-[52px] min-w-[148px] rounded-full bg-[#41c8b7]" />
                                    <button
                                        type="button"
                                        className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white text-[#2b9b90]"
                                        aria-label="Play"
                                    >
                                        <span className="ml-[2px] inline-block h-0 w-0 border-y-[9px] border-y-transparent border-l-[14px] border-l-[#2b9b90]" />
                                    </button>
                                    <span className="text-[33px] text-[#e9fffb]">Live Chat</span>
                                </div>
                            </div>

                            <div className="mx-auto mt-2 w-full max-w-[380px] rounded-[4px] bg-white p-4 text-[#3b3b3b] shadow-[0_18px_40px_rgba(0,0,0,0.23)]">
                                <h3 className="text-[34px] leading-none font-[700] text-[#0f7e73]">Avail Discount</h3>
                                <p className="mt-2 text-[19px] leading-[1.3] text-[#4c4c4c]">
                                    Expert Book Publishing at <span className="font-semibold text-[#2e9f8c]">50% Off</span> -
                                    <br />
                                    Your Story Deserves to be Heard!
                                </p>

                                <form className="mt-4 space-y-2.5">
                                    <input type="text" placeholder="Your name" className="pbp-input" />
                                    <input type="email" placeholder="Your email address" className="pbp-input" />
                                    <CountryPhoneInput name="phone" placeholder="Your phone number" inputClassName="pbp-input" />
                                    <select className="pbp-input text-[#7e7e7e]">
                                        <option>Select Course</option>
                                        <option>Book Publishing</option>
                                        <option>Book Editing</option>
                                        <option>Book Marketing</option>
                                    </select>
                                    <button type="button" className="rounded-[3px] bg-[#0f7e73] px-4 py-2 text-[11px] font-semibold text-white">
                                        Get In Touch +
                                    </button>
                                </form>

                                <div className="mt-4 border-t border-[#e9e9e9] pt-3">
                                    <h4 className="text-[34px] leading-none font-[700] text-[#117d6b]">Our Credibility</h4>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <span className="rounded bg-[#f0f3f7] px-2 py-1 text-[10px] font-semibold text-[#2f4057]">Partner</span>
                                        <span className="rounded bg-[#e9f4ff] px-2 py-1 text-[10px] font-semibold text-[#245f9a]">BBB A+</span>
                                        <span className="rounded bg-[#edfdf6] px-2 py-1 text-[10px] font-semibold text-[#008a5d]">Trustpilot</span>
                                        <span className="rounded bg-[#111] px-2 py-1 text-[10px] font-semibold text-white">Clutch</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pbp-curve" />
                </section>

                <section className="brand-anim bg-[#f3f3f3] py-10 md:py-12">
                    <div className="mx-auto max-w-[1240px] px-4 md:px-8">
                        <h2 className="text-center text-[52px] font-[700] leading-none text-[#1c7b6f]">
                            Sell Your Book With
                        </h2>

                        <div className="mt-8 overflow-hidden">
                            <div className="brand-track">
                                {[...brandItems, ...brandItems].map((item, idx) => (
                                    <div key={`brand-${idx}`} className="flex h-[52px] min-w-[200px] items-center justify-center">
                                        {item.type === "bam" ? (
                                            <div className="text-center leading-none">
                                                <div className="text-[54px] font-[800] tracking-[-1px] text-[#23459b]">BAM!</div>
                                                <div className="mt-[1px] text-[18px] font-[700] tracking-[0.1em] text-[#23306f]">BOOKS-A-MILLION</div>
                                            </div>
                                        ) : (
                                            <Image
                                                src={item.src}
                                                alt={item.alt}
                                                width={item.width}
                                                height={item.height}
                                                className="h-auto w-auto max-h-[42px] object-contain"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section ref={aboutSectionRef} className="bg-[#f3f3f3] pb-12 md:pb-16">
                    <div className="mx-auto max-w-[1240px] px-4 md:px-8">
                        <h3 className="about-anim-title text-center text-[52px] font-[700] leading-none text-[#1e2c6b]">
                            <span className="text-[#1f8d7f]">About</span> Pine Book Publishing
                        </h3>
                        <p className="about-anim-text mx-auto mt-8 max-w-[1140px] text-center text-[18px] leading-[1.6] text-[#667084]">
                            Pine Book Publishing has been helping new to seasoned writers for years with the mission of providing quality writing,
                            editing, and publishing services worldwide, with the mission of providing quality editing and publishing services for authors
                            worldwide. Our founders understood that many authors need support in editing and publishing their works to make them distinct
                            from the rest in the crowded marketplace. They had a vision of creating a company that would help these authors bring their
                            ideas to life and turn them into successful books. That was when Pine Book Publishing was officially established with a mission
                            of providing authors with the best book publishing experience.
                            <br />
                            We have a qualified team of professionals who will work hand in hand with you from the moment you decide to publish your book
                            to the moment your book is known to the world.
                        </p>

                        <div className="about-cards-wrap mt-12 grid gap-8 md:grid-cols-2 md:gap-12">
                            <div className="about-card-anim group relative overflow-hidden rounded-[16px]">
                                <Image
                                    src="/brand-img/about-img-1.webp"
                                    alt="Talk To An Expert"
                                    width={581}
                                    height={443}
                                    className="h-[250px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                                />
                                <div className="about-overlay-left absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                    <h4 className="text-[23px] font-[700] leading-none text-white">Talk To An Expert</h4>
                                    <button type="button" className="about-outline-btn mt-6">Make A Call Now!</button>
                                </div>
                            </div>

                            <div className="about-card-anim group relative overflow-hidden rounded-[16px]">
                                <Image
                                    src="/brand-img/about-img-2.webp"
                                    alt="24/7 support"
                                    width={581}
                                    height={443}
                                    className="h-[250px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                                />
                                <div className="about-overlay-right absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                    <h4 className="text-[23px] font-[700] leading-none text-white">24/7 support</h4>
                                    <button type="button" className="about-solid-btn mt-6">(888) 20786-7135</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="story-anim bg-[#f3f3f3] pb-14 md:pb-16">
                    <div className="slider-shell mx-auto max-w-[1240px] px-0 md:px-0">
                        <div className="story-track">
                            {[
                                { icon: "/brand-img/new-lp/ser-1.webp", name: "Lorem Ipsum", tag: "@loremip_", body: "Journey through the lives and experiences of others." },
                                { icon: "/brand-img/new-lp/test-1.webp", name: "Lorem Ipsum", tag: "@loremip_", body: "Journey through the lives and experiences of others." },
                                { icon: "/brand-img/new-lp/test-2.webp", name: "Lorem Ipsum", tag: "@loremip_", body: "Journey through the lives and experiences of others." },
                                { icon: "/brand-img/new-lp/test-3.webp", name: "Lorem Ipsum", tag: "@loremip_", body: "Journey through the lives and experiences of others." },
                            ].concat([
                                { icon: "/brand-img/new-lp/ser-1.webp", name: "Lorem Ipsum", tag: "@loremip_", body: "Journey through the lives and experiences of others." },
                                { icon: "/brand-img/new-lp/test-1.webp", name: "Lorem Ipsum", tag: "@loremip_", body: "Journey through the lives and experiences of others." },
                                { icon: "/brand-img/new-lp/test-2.webp", name: "Lorem Ipsum", tag: "@loremip_", body: "Journey through the lives and experiences of others." },
                                { icon: "/brand-img/new-lp/test-3.webp", name: "Lorem Ipsum", tag: "@loremip_", body: "Journey through the lives and experiences of others." },
                            ]).map((card, idx) => (
                                <article key={`story-${idx}`} className="story-card">
                                    <div className="flex items-center gap-3">
                                        <Image src={card.icon} alt={card.name} width={34} height={34} className="h-[34px] w-[34px] rounded-[4px] object-cover" />
                                        <div>
                                            <h4 className="text-[16px] leading-none font-[600] text-[#4f5358]">{card.name}</h4>
                                            <p className="mt-1 text-[13px] leading-none text-[#7f848c]">{card.tag}</p>
                                        </div>
                                    </div>
                                    <p className="mt-7 max-w-[330px] text-[40px] leading-[1.25] font-[500] text-[#4e5257]">{card.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

        <section className="bg-[#f3f3f3] pb-16 md:pb-20">
          <div className="mx-auto max-w-[1240px] px-4 md:px-8">
            <div className="books-anim-head mx-auto flex w-fit rounded-full border border-[#d8d8d8] bg-white p-[3px]">
                            <button
                                type="button"
                                onClick={() => setActiveBookTab("published")}
                                className={`book-tab-btn ${activeBookTab === "published" ? "book-tab-active" : ""}`}
                            >
                                Published Book
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveBookTab("coming")}
                                className={`book-tab-btn ${activeBookTab === "coming" ? "book-tab-active" : ""}`}
                            >
                                Coming Soon
                            </button>
                        </div>

            <div className="books-anim-grid mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
                            {visibleBooks.map((book, idx) => (
                                <article key={`${activeBookTab}-${bookPage}-${idx}`} className="book-card">
                                    <div className="book-cover-wrap">
                                        <Image
                                            src={book.cover}
                                            alt={book.title}
                                            width={230}
                                            height={320}
                                            className="book-cover-img"
                                        />
                                    </div>
                                    <h4 className="mt-6 text-center text-[20px] leading-[1.2] font-[700] text-[#2c8b80]">{book.title}</h4>
                                    <p className="mt-2 text-center text-[16px] leading-none text-[#5e6470]">{book.author}</p>
                                </article>
                            ))}
                        </div>

                        <div className="mt-8 border-t border-[#7ab6ae]" />
                        <div className="mt-6 flex items-center justify-center gap-5">
                            {Array.from({ length: totalBookPages }).map((_, idx) => (
                                <button
                                    key={`dot-${idx}`}
                                    type="button"
                                    onClick={() => setBookPage(idx)}
                                    className={`book-dot ${idx === bookPage ? "book-dot-active" : ""}`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                >
                                    <span className="book-dot-progress" />
                                </button>
                            ))}
                        </div>
          </div>
        </section>

        <section className="bg-[#f3f3f3] pb-20 md:pb-24">
          <div className="portfolio-anim-wrap mx-auto grid max-w-[1240px] items-center gap-10 px-4 md:grid-cols-[0.9fr_1.1fr] md:px-8">
            <div className="portfolio-anim-left max-w-[480px]">
              <h3 className="text-[58px] font-[700] leading-none text-[#2d8f82]">Our Portfolio</h3>
              <p className="mt-6 text-[38px] leading-[1.45] text-[#5d6678]">
                With thousands of successful publications delivered, we&apos;ve built a reputation for excellence in writing,
                editing, design, and publishing. Many of our clients&apos; books have gained traction in the literary world and
                achieved bestseller status.
              </p>
              <button type="button" className="mt-7 rounded-[5px] border border-[#7ea59e] px-4 py-2 text-[13px] font-semibold text-[#2e8f83] transition hover:bg-[#2e8f83] hover:text-white">
                Explore More →
              </button>
            </div>

            <div className="portfolio-anim-right relative overflow-hidden rounded-[2px] bg-[#edf0f4] px-10 py-8">
              <div className="relative h-[355px]">
                {portfolioSlides.map((slide, idx) => {
                  const offset = (idx - portfolioIndex + portfolioSlides.length) % portfolioSlides.length;
                  const position =
                    offset === 0 ? "is-center" : offset === 1 ? "is-right" : offset === portfolioSlides.length - 1 ? "is-left" : "is-hidden";
                  return (
                    <div key={slide.alt} className={`portfolio-card ${position}`} style={{ background: slide.bg }}>
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        width={280}
                        height={330}
                        className="h-full w-full object-cover"
                      />
                      <span className="portfolio-pill">{slide.pill}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="testi-anim-wrap bg-[#f3f3f3] pb-20 md:pb-24">
          <div className="mx-auto max-w-[1240px] px-4 md:px-8">
            <h3 className="publishing-anim-head text-center text-[60px] font-[700] leading-none text-[#222a66]">
              <span className="text-[#2a9587]">Book</span> Publishing
            </h3>

            <div className="publishing-anim-wrap mt-12 grid gap-8 lg:grid-cols-[2fr_1fr]">
              <article className="publishing-anim-card-left rounded-[16px] bg-[#2c8b7d] px-8 py-7 text-white">
                <h4 className="text-[34px] font-[700] leading-none">Publishing Platforms</h4>
                <p className="mt-4 max-w-[760px] text-[28px] leading-[1.45] text-[#d6eeea]">
                  Pine Book Publishing has been helping new to seasoned writers for years with the mission of providing quality writing, editing, and publishing services worldwide.
                </p>

                <div className="mt-12 space-y-10">
                  <div className="flex flex-wrap items-end gap-12">
                    <Image src="/brand-img/google books icon.png" alt="Google Books" width={190} height={58} className="h-auto w-[190px] object-contain brightness-0 invert" />
                    <Image src="/brand-img/kobo.png" alt="Kobo" width={120} height={54} className="h-auto w-[120px] object-contain brightness-0 invert" />
                    <div className="leading-none">
                      <div className="text-[72px] font-[800] tracking-[-1px]">BAM!</div>
                      <div className="mt-1 text-[24px] font-[700] tracking-[0.09em]">BOOKS-A-MILLION</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-end gap-12">
                    <Image src="/brand-img/amazon-icon.png" alt="Amazon" width={210} height={62} className="h-auto w-[210px] object-contain brightness-0 invert" />
                    <Image src="/images/Draft2digital.png" alt="Draft2Digital" width={255} height={54} className="h-auto w-[255px] object-contain brightness-0 invert" />
                  </div>
                </div>
              </article>

              <article className="publishing-anim-card-right relative rounded-[16px] bg-[#2c8b7d] px-6 pt-7 text-white">
                <h4 className="text-[34px] font-[700] leading-[1.12]">Cataclysm: The Rise of Teatrie Part 1</h4>
                <p className="mt-3 text-[28px] leading-[1.45] text-[#d6eeea]">
                  We have a qualified team of professionals who will work hand in hand with you from the moment you decide to publish your book to the moment your book is known to the world.
                </p>
                <div className="pointer-events-none mt-4 flex justify-center">
                  <Image
                    src="/brand-img/new-lp/book-covers/Kyle Climer 4.jpg"
                    alt="Cataclysm Book Cover"
                    width={230}
                    height={320}
                    className="relative bottom-[-28px] h-auto w-[200px] rounded-[4px] object-cover shadow-[0_16px_24px_rgba(0,0,0,0.35)]"
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="event-anim-wrap bg-[#f3f3f3] pb-20 md:pb-24">
          <div className="mx-auto max-w-[1240px] px-4 md:px-8">
            <h3 className="text-center text-[62px] font-[700] leading-[1.05] text-[#212a67]">
              <span className="text-[#2b9285]">What</span> our customer
              <br />
              <span className="text-[#2b9285]">says About Us</span>
            </h3>

            <div className="relative mx-auto mt-10 max-w-[1120px] min-h-[340px]">
              <div className="testi-float testi-left-top">
                <Image src="/brand-img/team-6.png" alt="Client" width={88} height={88} className="h-[88px] w-[88px] rounded-full object-cover" />
              </div>
              <div className="testi-float testi-left-mid">
                <Image src="/brand-img/team-7.png" alt="Client" width={180} height={180} className="h-[180px] w-[180px] rounded-full object-cover" />
              </div>
              <div className="testi-float testi-left-bottom">
                <Image src="/brand-img/team-8.png" alt="Client" width={74} height={74} className="h-[74px] w-[74px] rounded-full object-cover" />
              </div>
              <div className="testi-float testi-right-top-sm">
                <Image src="/brand-img/team-9.png" alt="Client" width={72} height={72} className="h-[72px] w-[72px] rounded-full object-cover" />
              </div>
              <div className="testi-float testi-right-top">
                <Image src="/brand-img/team-5.webp" alt="Client" width={112} height={112} className="h-[112px] w-[112px] rounded-full object-cover" />
              </div>
              <div className="testi-float testi-right-bottom testi-photo-active">
                <Image
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  width={224}
                  height={224}
                  className="h-[224px] w-[224px] rounded-full object-cover"
                />
              </div>

              <div ref={testiContentRef} className="mx-auto mt-10 max-w-[640px] rounded-[34px] bg-[#e7ece9] px-8 py-8 text-center">
                <p className="testi-anim-target relative text-[43px] leading-[1.42] text-[#2f3437]">
                  <span className="absolute left-0 top-[-10px] text-[90px] leading-none text-[#b7bdb9]">&ldquo;</span>
                  <span className="block px-8">{testimonials[activeTestimonial].text}</span>
                  <span className="absolute right-2 bottom-[-20px] text-[90px] leading-none text-[#b7bdb9]">&rdquo;</span>
                </p>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3">
                {testimonials.map((_, idx) => (
                  <button
                    key={`testi-${idx}`}
                    type="button"
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-3.5 w-3.5 rounded-full border border-[#4d9890] transition ${idx === activeTestimonial ? "bg-[#2b9a8c]" : "bg-transparent"}`}
                    aria-label={`Testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f3f3f3] pb-20 md:pb-24">
          <div className="mx-auto max-w-[1240px] px-4 md:px-8">
            <div className="flex items-center justify-between">
              <h3 className="text-[62px] font-[700] leading-none text-[#2b9285]">Exclusive Book Signing Events</h3>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prevEvents}
                  className="event-arrow event-arrow-muted"
                  aria-label="Previous events"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={nextEvents}
                  className="event-arrow event-arrow-active"
                  aria-label="Next events"
                >
                  →
                </button>
              </div>
            </div>

            <div className="mt-8 overflow-hidden">
              <div className="event-track">
                {visibleEventSlides.map((slide, idx) => (
                  <article key={`event-${slide.title}-${idx}`} className="event-card">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={386}
                      height={450}
                      className="h-full w-full object-cover"
                    />
                    <div className="event-overlay" />
                    <div className="event-bottom">
                      <div className="flex items-center gap-3">
                        <h4 className="text-[34px] font-[500] leading-none text-white">{slide.title}</h4>
                        <button type="button" className="event-play-btn" aria-label={`Play ${slide.title}`}>
                          <span className="ml-[2px] inline-block h-0 w-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-[#2c9a8c]" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="process-anim-wrap process-wrap bg-[#f3f3f3] pb-20 md:pb-24">
          <div className="process-streak" />
          <div className="relative z-[2] mx-auto max-w-[1240px] px-4 md:px-8">
            <h3 className="text-center text-[66px] font-[700] leading-[1.05] text-[#232a67]">
              <span className="text-[#2b9a8c]">Our Process</span>
              <br />
              From Concept to Perfection
            </h3>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {processSlides[processPage].map((item, idx) => (
                <article
                  key={`process-${processPage}-${idx}`}
                  className={`process-card ${item.active ? "process-card-active" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`process-icon ${item.icon === "screen" ? "process-icon-blue" : item.icon === "chart" ? "process-icon-pink" : ""}`}>
                      {item.icon === "monitor" ? "🖥" : item.icon === "screen" ? "▣" : "⤴"}
                    </span>
                    <h4 className={`text-[39px] font-[700] leading-none ${item.active ? "text-white" : "text-[#252c68]"}`}>
                      {item.title}
                    </h4>
                  </div>
                  <p className={`mt-5 max-w-[320px] text-[26px] leading-[1.45] ${item.active ? "text-[#e8fffb]" : "text-[#525b86]"}`}>
                    Lessons on design that cover the most recent.
                  </p>
                  <button
                    type="button"
                    className={`mt-6 text-[32px] font-[600] ${item.active ? "text-white" : "text-[#1c887c]"}`}
                  >
                    Learn More <span className="ml-2">›</span>
                  </button>
                </article>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-4">
              {processSlides.map((_, idx) => (
                <button
                  key={`process-dot-${idx}`}
                  type="button"
                  onClick={() => setProcessPage(idx)}
                  className={`process-dot ${idx === processPage ? "process-dot-active" : ""}`}
                  aria-label={`Process slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="packages-anim-wrap bg-[#f3f3f3] pb-20 md:pb-24">
          <div className="mx-auto max-w-[1240px] px-4 md:px-8">
            <h3 className="text-center text-[62px] font-[700] leading-none text-[#232a67]">
              <span className="text-[#2b9a8c]">Book</span> Publishing Bundles
            </h3>
            <p className="mt-3 text-center text-[35px] text-[#4a5267]">
              Limited Time Offer - Save <span className="font-[700] text-[#2b9a8c]">50%</span> On Book Publishing Services
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { plan: "Individual", price: "$48", requests: "1000 requests", primary: true },
                { plan: "Team", price: "$97", requests: "2000 requests" },
                { plan: "Team", price: "$97", requests: "2000 requests" },
                { plan: "Individual", price: "$48", requests: "1000 requests", primary: true },
                { plan: "Team", price: "$97", requests: "2000 requests" },
                { plan: "Team", price: "$97", requests: "2000 requests" },
              ].map((pkg, idx) => (
                <article key={`pkg-${idx}`} className="package-card rounded-[12px] bg-[#f0f1f4] px-6 py-6">
                  <p className="text-[15px] font-[700] text-[#1f2530]">{pkg.plan}</p>
                  <h4 className="mt-2 text-[50px] font-[800] leading-none text-[#1f2530]">{pkg.price}</h4>
                  <p className="mt-3 max-w-[290px] text-[18px] leading-[1.45] text-[#666f84]">
                    A single license for solo designers, freelancers and developers.
                  </p>
                  <ul className="mt-4 space-y-2 text-[18px] text-[#586173]">
                    <li>✅ {pkg.requests}</li>
                    <li>✅ Suport by Author</li>
                    <li>✅ Imaginary feature</li>
                  </ul>
                  <button
                    type="button"
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        y: -2,
                        scale: 1.01,
                        boxShadow: "0 10px 18px rgba(46, 76, 255, 0.28)",
                        duration: 0.22,
                        ease: "power2.out",
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        y: 0,
                        scale: 1,
                        boxShadow: "0 0 0 rgba(0,0,0,0)",
                        duration: 0.22,
                        ease: "power2.out",
                      });
                    }}
                    className={`package-btn mt-6 h-[44px] w-full rounded-[8px] text-[28px] font-[600] transition ${
                      pkg.primary
                        ? "bg-[#3d4cff] text-white hover:bg-[#3342ef]"
                        : "border border-[#d4d8e2] bg-white text-[#252a35]"
                    }`}
                  >
                    Get started
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services-anim-wrap bg-[#329d8f] py-20 md:py-24">
          <div className="mx-auto max-w-[1240px] px-4 md:px-8">
            <h3 className="services-anim-title text-[74px] font-[700] leading-none text-white">Our Service</h3>

            <div className="mt-10 flex flex-wrap gap-4">
              {[
                "Book Publishing",
                "Book Editing",
                "Proofreading",
                "ISBN & Barcode",
                "Book Formatting",
                "Print on Demand",
                "Document Processing",
                "Book Marketing",
                "Children's Book Illustration",
                "Book Translation",
              ].map((service) => (
                <button key={service} type="button" className="service-pill">
                  {service}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

            <style jsx>{`
        .pbp-hero {
          background: radial-gradient(1100px 620px at 52% 78%, #084539 0%, #0f7165 30%, #267e73 61%, #2a8378 100%);
        }
        .pbp-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 90px 90px, 90px 90px;
          pointer-events: none;
        }
        .pbp-glow {
          position: absolute;
          right: -170px;
          top: -110px;
          width: 700px;
          height: 700px;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 28%, rgba(104, 238, 208, 0.25), rgba(6, 75, 64, 0) 64%);
          pointer-events: none;
        }
        .pbp-curve {
          position: absolute;
          left: -12%;
          right: -12%;
          bottom: -220px;
          height: 360px;
          background: #fff;
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
          z-index: 1;
        }
        .pbp-input {
          width: 100%;
          height: 34px;
          border: 1px solid #ececec;
          border-radius: 2px;
          padding: 0 9px;
          font-size: 10px;
          color: #4a4a4a;
          outline: none;
        }
        .pbp-input:focus {
          border-color: #8fd4ca;
          box-shadow: 0 0 0 2px rgba(23, 131, 117, 0.12);
        }
        .brand-track {
          display: flex;
          align-items: center;
          gap: 12px;
          width: max-content;
          animation: brandScroll 22s linear infinite;
        }
        @keyframes brandScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .about-overlay-left {
          background: linear-gradient(90deg, rgba(144, 233, 220, 0.82) 0%, rgba(122, 211, 197, 0.55) 52%, rgba(74, 153, 146, 0.16) 100%);
          transition: background 0.35s ease;
        }
        .about-overlay-right {
          background: linear-gradient(90deg, rgba(20, 32, 45, 0.45) 0%, rgba(28, 39, 57, 0.3) 55%, rgba(14, 26, 41, 0.55) 100%);
          transition: background 0.35s ease;
        }
        .group:hover .about-overlay-left {
          background: linear-gradient(90deg, rgba(117, 224, 205, 0.88) 0%, rgba(90, 201, 183, 0.66) 55%, rgba(52, 126, 116, 0.25) 100%);
        }
        .group:hover .about-overlay-right {
          background: linear-gradient(90deg, rgba(16, 27, 40, 0.62) 0%, rgba(22, 34, 51, 0.45) 55%, rgba(13, 23, 35, 0.66) 100%);
        }
        .about-outline-btn {
        //   min-width: 260px;
        //   height: 58px;
        padding: 5px 10px;
          border-radius: 999px;
          border: 2px solid rgba(255, 255, 255, 0.75);
          font-size: 20px;
          font-weight: 500;
          color: #fff;
          background: rgba(255, 255, 255, 0.07);
          transition: all 0.25s ease;
        }
        .about-outline-btn:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.2);
          border-color: #fff;
        }
        .about-solid-btn {
        //   min-width: 265px;
        //   height: 58px;
        padding: 5px 10px;
          border-radius: 999px;
          border: none;
          font-size: 20px;
          font-weight: 500;
          color: #fff;
          background: #2ca898;
          transition: all 0.25s ease;
          box-shadow: 0 7px 18px rgba(20, 58, 53, 0.32);
        }
        .about-solid-btn:hover {
          transform: translateY(-2px);
          background: #37b9a7;
          box-shadow: 0 10px 22px rgba(16, 52, 49, 0.36);
        }
        .slider-shell {
          overflow: hidden;
        }
        .story-track {
          display: flex;
          align-items: stretch;
          gap: 28px;
          width: max-content;
          animation: storyScroll 24s linear infinite;
          padding: 2px 0;
        }
        .story-card {
          width: 380px;
          min-height: 220px;
          border: 2px solid #747a80;
          border-radius: 14px;
          background: transparent;
          padding: 28px 24px 22px;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .story-card:hover {
          transform: translateY(-4px);
          border-color: #4f5f6d;
          box-shadow: 0 12px 24px rgba(33, 42, 51, 0.08);
        }
        @keyframes storyScroll {
          from {
            transform: translateX(-12%);
          }
          to {
            transform: translateX(-62%);
          }
        }
        .book-tab-btn {
          min-width: 150px;
          height: 42px;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 600;
          color: #38425a;
          transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .book-tab-active {
          background: #2ea595;
          color: #fff;
          box-shadow: 0 6px 14px rgba(42, 137, 123, 0.22);
        }
        .book-card {
          animation: fadeBookIn 0.45s ease;
        }
        .book-cover-wrap {
          min-height: 420px;
          border: 2px solid #7ab6ae;
          border-radius: 22px;
          background: #f6f7f7;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 22px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .book-cover-wrap:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(49, 113, 106, 0.16);
        }
        .book-cover-img {
          width: 100%;
          max-width: 215px;
          height: 300px;
          border-radius: 20px;
          border: 2px solid #82bcb4;
          object-fit: cover;
          box-shadow: -6px 10px 15px rgba(0, 0, 0, 0.14);
        }
        .book-dot {
          position: relative;
          overflow: hidden;
          width: 14px;
          height: 14px;
          border-radius: 999px;
          border: 2px solid #5ea9a0;
          background: #d6ece8;
          transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, background 0.35s ease, transform 0.35s ease;
        }
        .book-dot-active {
          width: 34px;
          background: #fff;
          box-shadow: inset 0 0 0 2px #2ea595;
          transform: scale(1.03);
        }
        .book-dot-progress {
          position: absolute;
          left: 2px;
          top: 2px;
          height: 6px;
          width: calc(100% - 4px);
          border-radius: 999px;
          background: #2ea595;
          transform: scaleX(0);
          transform-origin: left center;
          opacity: 0;
        }
        .book-dot-active .book-dot-progress {
          opacity: 1;
          animation: dotFill 3.5s linear forwards;
        }
        @keyframes dotFill {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        @keyframes fadeBookIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .portfolio-card {
          position: absolute;
          top: 12px;
          width: 280px;
          height: 330px;
          border: 1px solid rgba(78, 90, 107, 0.35);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease, z-index 0.01s linear;
          opacity: 0;
          overflow: hidden;
        }
        .portfolio-card.is-left {
          left: 10px;
          opacity: 1;
          transform: scale(0.93);
          z-index: 2;
        }
        .portfolio-card.is-center {
          left: 155px;
          opacity: 1;
          transform: scale(1.03);
          z-index: 4;
          box-shadow: 0 16px 28px rgba(0, 0, 0, 0.25);
        }
        .portfolio-card.is-right {
          right: 10px;
          opacity: 1;
          transform: scale(0.93);
          z-index: 1;
        }
        .portfolio-card.is-hidden {
          left: 50%;
          transform: translateX(-50%) scale(0.86);
          opacity: 0;
          z-index: 0;
        }
        .portfolio-pill {
          position: absolute;
          left: 50%;
          bottom: 22px;
          transform: translateX(-50%);
          white-space: nowrap;
          padding: 10px 28px;
          border-radius: 999px;
          border: 2px solid rgba(255, 255, 255, 0.58);
          background: #2ca896;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          line-height: 1;
        }
        .testi-float {
          position: absolute;
          z-index: 1;
        }
        .testi-left-top {
          left: 10px;
          top: -4px;
        }
        .testi-left-mid {
          left: 38px;
          top: 98px;
        }
        .testi-left-bottom {
          left: -12px;
          bottom: 36px;
        }
        .testi-right-top-sm {
          right: 186px;
          top: 6px;
        }
        .testi-right-top {
          right: 30px;
          top: -6px;
        }
        .testi-right-bottom {
          right: -4px;
          bottom: -6px;
        }
        .event-arrow {
          width: 54px;
          height: 54px;
          border-radius: 999px;
          border: none;
          font-size: 28px;
          line-height: 1;
          font-weight: 700;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .event-arrow:hover {
          transform: translateY(-1px);
        }
        .event-arrow-muted {
          background: #e4e9e8;
          color: #4a8e84;
        }
        .event-arrow-active {
          background: #2a9587;
          color: #fff;
          box-shadow: 0 7px 16px rgba(34, 123, 111, 0.2);
        }
        .event-track {
          display: flex;
          gap: 14px;
          width: 100%;
          transition: opacity 0.35s ease;
        }
        .event-card {
          position: relative;
          flex: 0 0 calc((100% - 28px) / 3);
          height: 450px;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 18px rgba(13, 33, 29, 0.12);
        }
        .event-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 4%, rgba(0, 0, 0, 0.18) 36%, rgba(0, 0, 0, 0) 64%);
        }
        .event-bottom {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .event-play-btn {
          width: 46px;
          height: 46px;
          border-radius: 999px;
          border: none;
          background: #ecf0f2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .process-wrap {
          position: relative;
          overflow: hidden;
        }
        .process-streak {
          position: absolute;
          right: -220px;
          top: 180px;
          width: 720px;
          height: 520px;
          background:
            radial-gradient(circle at 30% 50%, rgba(88, 232, 64, 0.65) 0%, rgba(88, 232, 64, 0) 45%),
            radial-gradient(circle at 50% 60%, rgba(43, 92, 255, 0.6) 0%, rgba(43, 92, 255, 0) 45%),
            radial-gradient(circle at 60% 80%, rgba(217, 112, 255, 0.58) 0%, rgba(217, 112, 255, 0) 40%);
          filter: blur(2px);
          transform: rotate(-18deg);
          pointer-events: none;
        }
        .process-card {
          min-height: 220px;
          border: 1px solid #e6e8eb;
          border-radius: 12px;
          background: #fff;
          padding: 24px 22px 22px;
          box-shadow: 0 12px 28px rgba(19, 32, 41, 0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          animation: fadeBookIn 0.4s ease;
        }
        .process-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 30px rgba(18, 30, 38, 0.09);
        }
        .process-card-active {
          background: linear-gradient(135deg, #63cfbb 0%, #58c1ae 100%);
          border-color: transparent;
        }
        .process-icon {
          width: 30px;
          height: 30px;
          border-radius: 7px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #2f9f92;
          background: #e7faf6;
        }
        .process-icon-blue {
          color: #7594ff;
          background: #ebf0ff;
        }
        .process-icon-pink {
          color: #dc75c8;
          background: #fcebfa;
        }
        .process-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: none;
          background: #cfd2d8;
          transition: all 0.25s ease;
        }
        .process-dot-active {
          width: 42px;
          background: #2c9487;
        }
        .package-btn:hover {
          background: #3d4cff !important;
          color: #fff !important;
          border-color: #3d4cff !important;
        }
        .service-pill {
          height: 78px;
          border-radius: 999px;
          border: 2px solid rgba(225, 248, 243, 0.95);
          background: transparent;
          color: #ffffff;
          padding: 0 34px;
          font-size: 49px;
          font-weight: 500;
          line-height: 1;
          transition: all 0.25s ease;
        }
        .service-pill:hover {
          background: rgba(255, 255, 255, 0.13);
          transform: translateY(-2px);
        }
      `}</style>
        </>
    );
}
