"use client"
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useRef, useState, useEffect } from "react";
import CountUp from "react-countup";
import BrandTestimonial from "@/components/BrandTestimonial";




export default function HomePage() {

  const handleOpenChat = () => {
    window.zE && window.zE('webWidget', 'open');
  };

  //  Counter state
  const counterRef = useRef(null);
  const [startCounter, setStartCounter] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCounter(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  },
    []);

  //  Tabs list
  const tabs = ["Fiction", "Non-Fiction", "Biography", "Children", "Informative"];

  //  Active tab state
  const [activeTab, setActiveTab] = useState("Fiction");

  //  Slides data for each tab
  const slidesData = {
    "Fiction": [
      {
        id: 1,
        img: "/brand-img/new-lp/ser-1.webp",
        alt: "fiction1",
        tags: ["HTML", "CSS", "AI Concept", "3D GenAI"]
      },
      {
        id: 2,
        img: "/brand-img/new-lp/ser-1.webp",
        alt: "fiction2",
        tags: ["Creative", "Design", "Visual Story"]
      }
    ],
    "Non-Fiction": [
      {
        id: 1,
        img: "/brand-img/new-lp/ser-1.webp",
        alt: "fiction1",
        tags: ["HTML", "CSS", "AI Concept", "3D GenAI"]
      },
      {
        id: 2,
        img: "/brand-img/new-lp/ser-1.webp",
        alt: "fiction2",
        tags: ["Creative", "Design", "Visual Story"]
      },
      {
        id: 3,
        img: "/brand-img/new-lp/ser-1.webp",
        alt: "nonfiction2",
        tags: ["Rapid branding", "Concept", "Art"]
      }
    ],
    "Biography": [
      {
        id: 1,
        img: "/brand-img/new-lp/ser-1.webp",
        alt: "fiction1",
        tags: ["HTML", "CSS", "AI Concept", "3D GenAI"]
      },
      {
        id: 2,
        img: "/brand-img/new-lp/ser-1.webp",
        alt: "fiction2",
        tags: ["Creative", "Design", "Visual Story"]
      }
    ],
    "Children": [
      {
        id: 1,
        img: "/brand-img/new-lp/ser-1.webp",
        alt: "fiction1",
        tags: ["HTML", "CSS", "AI Concept", "3D GenAI"]
      },
      {
        id: 2,
        img: "/brand-img/new-lp/ser-1.webp",
        alt: "fiction2",
        tags: ["Creative", "Design", "Visual Story"]
      },
      {
        id: 3,
        img: "/brand-img/new-lp/ser-1.webp",
        alt: "fiction1",
        tags: ["HTML", "CSS", "AI Concept", "3D GenAI"]
      },
      {
        id: 4,
        img: "/brand-img/new-lp/ser-1.webp",
        alt: "fiction2",
        tags: ["Creative", "Design", "Visual Story"]
      }
    ],
    "Informative": [
      {
        id: 1,
        img: "/brand-img/new-lp/ser-1.webp",
        alt: "info1",
        tags: ["Educational", "Content", "Facts"]
      }
    ],
  };

  const slides = slidesData[activeTab] || [];


  return (
    <main className="font-sans text-gray-800">


      {/* ------------------ HEADER ------------------ */}

      <header>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 gap-10">
          <div className="flex flex-row justify-between items-center py-6">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="PineBookPublishing Logo"
                width={200}
                height={60}
              />
            </Link>

            <button onClick={() => setIsOpen(true)} className="
            px-5 py-2 text-sm          
    sm:px-6 sm:py-2.5 sm:text-base 
    md:px-5 md:py-3 md:text-lg 
    lg:px-5 lg:py-2 lg:text-lg  
    rounded-full font-semibold
    bg-transparent text-white border-2 border-white
    transition-ease duration-300
    hover:bg-white hover:text-[#117d6b] hover:border-[#15184c]
    hover:opacity-100

            ">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* ------------------ HERO SECTION ------------------ */}
      <section className="relative bg-[#0a2c24] text-white md:min-h-[90vh] py-36 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.webp"
            alt="Hero Background"
            fill
            className="object-cover opacity-30"
          />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          {/* Left Text */}
          <div className="flex flex-col justify-center md:space-y-6 space-y-5">
            <h5 className="text-2xl text-bold">#1 Self Publishing Company</h5>
            <h1 className="text-2xl md:text-5xl font-bold leading-snug">
              DO YOU HAVE A MANUSCRIPT READY TO BE PUBLISHED?
            </h1>
            <p className="text-lg text-gray-200 uppercase">
              Pine Book Publishing has made it much easier to self-publish a book, with hands-on support from the first word to the final cover. Our process involves Proofreading, Editing, Formatting, Book Cover Design, Publishing, and print-on-demand through a vast network of global outlets.</p>
            <div className="flex gap-4 mt-6">
              {/* Primary Button */}
              <button onClick={() => setIsOpen(true)} className="bg-[#15184c] border-2 border-[#fff] transition-ease text-[#fff] font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-[#fff] hover:text-black hover:shadow-2xl duration-300 flex items-center">
                Get Started
              </button>

              {/* Secondary Button */}
              <button onClick={handleOpenChat} className="px-8 py-3 rounded-full font-semibold bg-transparent text-[#fff] border-2 border-[#fff]  duration-300 hover:bg-[#fff] hover:text-[#117d6b] hover:border-[#15184c] hover:opacity-100">
                Live Chat
              </button>
            </div>

            <Image
              src="/brand-img/new-lp/badge.webp"
              alt="PineBookPublishing badge"
              width={500}
              height={60}
            />
          </div>

          <div
            className="w-full flex flex-col justify-center p-8 bg-white rounded-2xl shadow-xl duration-500 hover:shadow-2xl"
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-[#117d6b] uppercase">Up to 50% Off On</h2>
              <h5 className="text-xl font-semibold text-[#15184c] mt-2 uppercase">
                Book Publishing Packages
              </h5>
            </div>

            <form action="mail" method="post" className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Enter your Name *"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#15184c] focus:border-transparent outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your Email *"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#15184c] focus:border-transparent outline-none"
              />

              <input
                name="phone"
                type="tel"
                minlength="10"
                maxlength="10"
                pattern="[0-9]{10}"
                placeholder="Enter your Phone No"
                title="Please Enter Valid Phone No."
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#15184c] focus:border-transparent outline-none"
              />

              <textarea
                name="msg"
                placeholder="Tell me about your book"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 h-28 resize-none focus:ring-2 focus:ring-[#15184c] focus:border-transparent outline-none"
              ></textarea>

              <label className="flex items-start space-x-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="subscribe"
                  value="yes"
                  className="mt-1 accent-[#15184c]"
                />
                <span>
                  I agree to the <a href="#" className="text-[#15184c] underline">Privacy Policy</a>
                  and allow contact for service-related communication.
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-[#117d6b] text-white font-semibold py-3 rounded-lg hover:bg-[#15184c] hover:text-[#fff] duration-300"
              >
                Submit
              </button>

            </form>
          </div>

        </div>
      </section>




      {/* ------------------ COUNTER SECTION ------------------ */}
      <section ref={counterRef} className="bg-[#117d6b] text-white py-12 text-center">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            {/* <h2 className="text-4xl font-bold">2500</h2> */}
            <span className="text-4xl font-bold">
              {startCounter && (
                <CountUp
                  start={0}
                  end={2500}
                  duration={3}
                  separator=","
                />
              )}
              +
            </span>
            <p className="text-sm text-gray-200 mt-1">Published Authors</p>
          </div>

          <div>
            {/* <h2 className="text-4xl font-bold">400</h2> */}
            <span className="text-4xl font-bold">
              {startCounter && (
                <CountUp
                  start={0}
                  end={400}
                  duration={3}
                  separator=","
                />
              )}
              +
            </span>
            <p className="text-sm text-gray-200 mt-1">Editing Experts</p>
          </div>

          <div>
            {/* <h2 className="text-4xl font-bold">25000</h2> */}
            <span className="text-4xl font-bold">
              {startCounter && (
                <CountUp
                  start={0}
                  end={25000}
                  duration={3}
                  separator=","
                />
              )}
              +
            </span>
            <p className="text-sm text-gray-200 mt-1">Books Published</p>
          </div>

          <div>
            {/* <h2 className="text-4xl font-bold">2 </h2> */}
            <span className="text-4xl font-bold">
              {startCounter && (
                <CountUp
                  start={0}
                  end={2}
                  duration={3}
                  separator=","
                />
              )}
              Mil +

            </span>
            <p className="text-sm text-gray-200 mt-1">Happy Readers</p>
          </div>

        </div>
      </section>



      {/* ------------------ PORTFOLIO SECTION ------------------ */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-2">Our Portfolio</h2>
          <p className="text-gray-600 mb-8">
            A few of the bestselling books we’ve proudly published for our
            amazing authors.
          </p>
        </div>

        {/* <div>
          <Marquee pauseOnHover={true}>
            <ul className="flex space-x-3 gap-2 pr-4 py-10">
              {slides.map((slide) => (
                <li
                  key={slide.id}
                  className="transition-ease duration-700 hover:-mt-3 cursor-pointer"
                >
                  <a href="#">
                    <div className="ser-box relative">
                      <Image
                        className="rounded-xl"
                        src={slide.img}
                        width={500}
                        height={300}
                        alt={slide.alt}
                      />
                      <div className="ser-items">
                        <ul className="ser-list flex flex-wrap absolute gap-2.5 left-[5%] bottom-[10%]">
                          {slide.tags.map((tag, index) => (
                            <li
                              key={index}
                              className="text-white font-light text-[10px] rounded-full border border-white p-1.5"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </Marquee>
        </div> */}

        <div className="py-10">
          {/* Tabs Section */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm sm:px-6 sm:py-2.5 sm:text-base px-4 py-2 rounded-full font-semibold border transition-ease duration-300 
        ${activeTab === tab
                    ? "bg-[#117d6b] text-white border-[#117d6b]"
                    : "bg-transparent border-gray-400 text-gray-600 hover:bg-gray-100"
                  }
        w-[48%] sm:w-auto
      `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Marquee Slider */}
          <Marquee pauseOnHover={true}>
            <ul className="flex space-x-3 gap-2 pr-4 py-10">
              {slides.map((slide) => (
                <li
                  key={slide.id}
                  className="transition-ease duration-700 hover:-mt-3 cursor-pointer"
                >
                  <a href="#">
                    <div className="ser-box relative">
                      <Image
                        className="rounded-xl"
                        src={slide.img}
                        width={500}
                        height={300}
                        alt={slide.alt}
                      />
                      {/* Tags */}
                      <div className="ser-items">
                        <ul className="ser-list flex flex-wrap absolute gap-2.5 left-[5%] bottom-[10%]">
                          {slide.tags.map((tag, index) => (
                            <li
                              key={index}
                              className="text-white font-light text-[10px] rounded-full border border-white p-1.5"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </Marquee>
        </div>


      </section>

      {/* ------------------ CUSTOMER REVIEWS ------------------ */}


      <section className="bg-[#f9fafb]">
        <BrandTestimonial />
      </section>


      {/* 
      <section className="py-16 bg-gray-50" data-aos="fade-up" data-aos-duration="1500">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#117d6b] uppercase tracking-wide">
              Customer Reviews
            </h2>
            <div className="w-20 h-1 bg-[#15184c] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex justify-center">
              <Image
                src="/brand-img/new-lp/whatsapp.webp"
                alt="WhatsApp"
                className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                width={400}
                height={400}
              />
            </div>

            <div className="flex flex-col justify-center gap-6">
              <Image
                src="/brand-img/new-lp/test-1.webp"
                alt="Customer Review 1"
                className="w-full h-full object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                width={400}
                height={400}

              />
              <Image
                src="/brand-img/new-lp/test-2.webp"
                alt="Customer Review 2"
                className="w-full h-full object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                width={400}
                height={400}
              />
              <Image
                src="/brand-img/new-lp/test-3.webp"
                alt="Customer Review 3"
                className="w-full h-full object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-16 bg-white" data-aos="fade-up" data-aos-duration="1500">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* <!-- Heading --> */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#117d6b] uppercase tracking-wide">
              Exclusive Book Signing Events
            </h2>
            <div className="w-24 h-1 bg-[#15184c] mx-auto mt-4 rounded-full"></div>
          </div>

          {/* <!-- Events Wrapper --> */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

            <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl duration-300">
              <Image
                src="/brand-img/new-lp/event-1.webp"
                alt="Event 1"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                width={400}
                height={400}
              />

            </div>

            <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl duration-300">
              <Image
                src="/brand-img/new-lp/event-2.webp"
                alt="Event 2"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                width={400}
                height={400}

              />
            </div>

            <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl duration-300">
              <Image
                src="/brand-img/new-lp/event-3.webp"
                alt="Event 3"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                width={400}
                height={400}
              />
            </div>

          </div>
        </div>
      </section>

      <section
        className="py-20 bg-[#117d6b] bg-cover bg-center bg-no-repeat text-white relative"
        style={{ backgroundImage: "url('/brand-img/new-lp/cta-bg.webp')" }}
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          {/* <!-- Left Side Image --> */}
          <div class="w-full md:w-1/2 flex justify-center">
            <Image
              src="/brand-img/new-lp/cta_img.webp"
              alt="Author writing a book"
              width="500"
              height="400"
              class="rounded-2xl shadow-2xl object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* <!-- Right Side Content --> */}
          <div class="w-full md:w-1/2 space-y-6">
            <h2 class="text-3xl md:text-4xl font-bold text-[#fff]">
              How Can We Help?
            </h2>
            <p class="text-gray-100 leading-relaxed">
              At <span class="font-semibold text-white">Pine Book Publishing</span>, we transform your ideas
              into professionally written and published books. Our team of experienced writers covers a wide range
              of genres, ensuring your voice is heard authentically.
            </p>
            <p class="text-gray-100 leading-relaxed">
              With thousands of successful publications delivered, we’ve built a reputation for excellence in
              writing, editing, design, and publishing. Many of our clients’ books have gained traction in the
              literary world and achieved bestseller status.
            </p>

            {/* <!-- CTA Buttons --> */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
              {/* Primary Button */}
              <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="bg-[#15184c] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-white hover:text-black hover:shadow-2xl duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Publish Your Book Now
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                >
                  <path
                    d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3
        0s-12.5 32.8 0 45.3L402.7 224H32c-17.7 0-32
        14.3-32 32s14.3 32 32 32h370.7L297.4
        393.4c-12.5 12.5-12.5 32.8 0
        45.3s32.8 12.5 45.3 0l160-160z"
                  ></path>
                </svg>
              </button>

              {/* Secondary Button */}
              <button
                type="button"
                onClick={handleOpenChat}
                className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#15184c] hover:text-white duration-300 w-full sm:w-auto"
              >
                Live Chat
              </button>
            </div>

          </div>
        </div>
      </section>

      <section class="py-20 bg-gray-50" data-aos="fade-up" data-aos-duration="1500">
        <div class="max-w-6xl mx-auto px-6 text-center">
          {/* <!-- Heading --> */}
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-[#117d6b] uppercase tracking-wide">
              Our Process: From Concept to Perfection
            </h2>
            <div class="w-20 h-1 bg-[#15184c] mx-auto mt-4 rounded-full"></div>
          </div>

          {/* <!-- Process Steps --> */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* <!-- Step 1 --> */}
            <div
              class="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#15184c]"
            >
              <h2 class="text-2xl font-bold text-[#15184c] mb-2 transition-colors duration-300 group-hover:text-[#117d6b]">
                Step 1
              </h2>
              <h6 class="text-lg font-semibold text-[#117d6b] mb-2">
                Manuscript Review & Publishing Strategy
              </h6>
              <p class="text-gray-600 text-sm leading-relaxed">
                We assess your book’s needs and recommend the best publishing path —
                self-publishing or hybrid publishing.
              </p>
            </div>

            {/* <!-- Step 2 --> */}
            <div
              class="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#15184c]"
            >
              <h2 class="text-2xl font-bold text-[#15184c] mb-2 transition-colors duration-300 group-hover:text-[#117d6b]">
                Step 2
              </h2>
              <h6 class="text-lg font-semibold text-[#117d6b] mb-2">
                Editing, Formatting & Cover Design
              </h6>
              <p class="text-gray-600 text-sm leading-relaxed">
                Our team edits, formats, and designs a professional book layout to
                ensure high-quality publishing.
              </p>
            </div>

            {/* <!-- Step 3 --> */}
            <div
              class="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#15184c]"
            >
              <h2 class="text-2xl font-bold text-[#15184c] mb-2 transition-colors duration-300 group-hover:text-[#117d6b]">
                Step 3
              </h2>
              <h6 class="text-lg font-semibold text-[#117d6b] mb-2">
                Publishing & Distribution Setup
              </h6>
              <p class="text-gray-600 text-sm leading-relaxed">
                We publish your book across eBook, print, and audiobook platforms,
                ensuring wide availability and seamless distribution.
              </p>
            </div>

            {/* <!-- Step 4 --> */}
            <div
              class="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#15184c]"
            >
              <h2 class="text-2xl font-bold text-[#15184c] mb-2 transition-colors duration-300 group-hover:text-[#117d6b]">
                Step 4
              </h2>
              <h6 class="text-lg font-semibold text-[#117d6b] mb-2">
                Book Launch & Marketing Support
              </h6>
              <p class="text-gray-600 text-sm leading-relaxed">
                We help with launch strategies, marketing campaigns, and ongoing book
                promotions to maximize your book’s success.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section style={{ backgroundImage: "url('/brand-img/new-lp/pack-bg.webp')" }}
        className="py-20 bg-gray-50"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#117d6b] uppercase">
            Book Publishing Bundles
          </h2>
          <div className="w-24 h-1 bg-[#15184c] mx-auto mt-4 rounded-full"></div>
          <h4 class="text-xl font-poppins md:text-xl font-bold mt-4">Limited Time Offer - Save <span class="blink_me fw-bold text-2xl">50%</span> On Book Publishing Services</h4>


          {/* Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            {/* Package 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:border-[#15184c] duration-500">
              <h3 className="text-xl font-semibold text-[#117d6b] mb-3">
                Startup Authors Package
              </h3>
              <h2 className="text-3xl font-bold text-[#15184c] mb-5">
                Flat <span className="text-[#117d6b]">30%</span> Off
              </h2>
              <ul className="text-gray-600 text-sm text-left space-y-2 mb-8">
                <li>Dedicated Project Manager</li>
                <li>Technical Assistance & Author Support</li>
                <li>Manuscript Compilation & Overview</li>
                <li>Formatting (as per international guidelines)</li>
                <li>Layout Adjustment (text and illustrations)</li>
                <li>Registered ISBN</li>
                <li>Amazon KDP Ebook Publishing</li>
                <li>Listing Copy (SEO Optimized)</li>
                <li>Author/Book Profiling & Ratings Setup</li>
              </ul>

              <button onClick={() => setIsOpen(true)} className="w-full py-3 bg-[#15184c] text-[#fff] font-semibold rounded-full duration-300 hover:bg-[#117d6b] hover:text-[#fff]">
                Get A Quote
              </button>

              <div className="mt-6 text-sm">
                <p className="font-semibold text-gray-700">Need more info?</p>
                <div className="flex justify-center gap-6 mt-2 text-[#117d6b] font-medium">
                  <a href="tel:+1-307-243-1331" className="hover:text-[#15184c] transition">
                    📞 Talk to Us
                  </a>
                  <a href="javascript:;" className="hover:text-[#15184c] transition">
                    💬 Chat With Us
                  </a>
                </div>
              </div>
            </div>

            {/* Package 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:border-[#15184c] duration-500">
              <h3 className="text-xl font-semibold text-[#117d6b] mb-3">
                Standard Authors Package
              </h3>
              <h2 className="text-3xl font-bold text-[#15184c] mb-5">
                Flat <span className="text-[#117d6b]">40%</span> Off
              </h2>
              <ul className="text-gray-600 text-sm text-left space-y-2 mb-8">
                <li>Dedicated Project Manager</li>
                <li>Technical Assistance & Author Support</li>
                <li>Formatting & Layout Adjustment</li>
                <li>Registered ISBN</li>
                <li>Amazon KDP Ebook Publishing</li>
                <li>Comprehensive Proofreading</li>
                <li>Custom Cover Design</li>
                <li>Paperback & Hardcover Publishing</li>
                <li>Print on Demand Setup</li>
              </ul>

              <button onClick={() => setIsOpen(true)} className="w-full py-3 bg-[#15184c] text-[#fff] font-semibold rounded-full duration-300 hover:bg-[#117d6b] hover:text-[#fff]">
                Get A Quote
              </button>

              <div className="mt-6 text-sm">
                <p className="font-semibold text-gray-700">Need more info?</p>
                <div className="flex justify-center gap-6 mt-2 text-[#117d6b] font-medium">
                  <a href="tel:+1-307-243-1331" className="hover:text-[#15184c] transition">
                    📞 Talk to Us
                  </a>
                  <a href="javascript:;" className="hover:text-[#15184c] transition">
                    💬 Chat With Us
                  </a>
                </div>
              </div>
            </div>

            {/* Package 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:border-[#15184c] duration-500">
              <h3 className="text-xl font-semibold text-[#117d6b] mb-3">
                Complete Authors Package
              </h3>
              <h2 className="text-3xl font-bold text-[#15184c] mb-5">
                Flat <span className="text-[#117d6b]">50%</span> Off
              </h2>
              <ul className="text-gray-600 text-sm text-left space-y-2 mb-8">
                <li>Dedicated Project Manager</li>
                <li>Full Editing & Proofreading</li>
                <li>Formatting & Layout Adjustment</li>
                <li>Custom Cover Design</li>
                <li>ISBN & Amazon KDP Publishing</li>
                <li>Print on Demand Setup</li>
                <li>Publishing on 50+ Platforms</li>
                <li>10 Printed Copies</li>
              </ul>

              <button onClick={() => setIsOpen(true)} className="w-full py-3 bg-[#15184c] text-[#fff] font-semibold rounded-full duration-300 hover:bg-[#117d6b] hover:text-[#fff]">
                Get A Quote
              </button>

              <div className="mt-6 text-sm">
                <p className="font-semibold text-gray-700">Need more info?</p>
                <div className="flex justify-center gap-6 mt-2 text-[#117d6b] font-medium">
                  <a href="tel:+1-307-243-1331" className="hover:text-[#15184c] transition">
                    📞 Talk to Us
                  </a>
                  <a href="javascript:;" className="hover:text-[#15184c] transition">
                    💬 Chat With Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section
        className="my-20"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#117d6b] uppercase">
            Our Services for You
          </h2>
          <div className="w-24 h-1 bg-[#15184c] mx-auto mt-4 rounded-full"></div>

          {/* Service Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-16">
            {[
              { img: "/brand-img/new-lp/1.webp", title: "Book Publishing" },
              { img: "/brand-img/new-lp/10.webp", title: "GhostWriting" },
              { img: "/brand-img/new-lp/2.webp", title: "Proofreading" },
              { img: "/brand-img/new-lp/3.webp", title: "Publication" },
              { img: "/brand-img/new-lp/4.webp", title: "Book Writing" },
              { img: "/brand-img/new-lp/5.webp", title: "Novel Writing" },
              { img: "/brand-img/new-lp/6.webp", title: "e-Book Writing" },
              { img: "/brand-img/new-lp/7.webp", title: "Book Promotion" },
              { img: "/brand-img/new-lp/8.webp", title: "Book Marketing" },
              { img: "/brand-img/new-lp/9.webp", title: "Book Editing" },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl duration-500 hover:-translate-y-2 flex flex-col items-center justify-between p-6 border border-gray-100 hover:border-[#15184c]"
              >
                <Image
                  src={service.img}
                  alt={service.title}
                  width={50}
                  height={50}
                  className="mx-auto mb-4 transition-transform duration-500 group-hover:scale-110"
                />
                <h5 className="text-lg font-semibold text-[#117d6b] mb-3">
                  {service.title}
                </h5>
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="px-5 py-2 bg-[#15184c] text-[#ffff] rounded-full font-medium text-sm duration-300 hover:bg-[#117d6b] hover:text-[#fff] flex items-center gap-2"
                >
                  Get Info
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section
        className="py-20 bg-white text-[#117d6b]"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="max-w-7xl mx-auto text-center px-4 grid md:grid-cols-2 gap-10">
          {/* Left Side */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Bring Your Book to Life with Pine Book Publishing
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At Pine Book Publishing, we believe that every story deserves to
              be told — and told beautifully, with the care, passion, and
              professionalism it deserves. Whether you're beginning with a single
              spark of an idea, struggling through the early stages of a rough
              draft, or holding a completed manuscript ready for the world, we are
              here to help transform your vision into a masterpiece.
            </p>

            <ul className="grid grid-cols-2 gap-2 text-sm">
              {[
                "Book Writing",
                "eBook Publishing",
                "Editing & Proofreading",
                "Print-on-Demand",
                "Cover Design & Formatting",
                "ISBN Help",
                "Publishing Services",
                "Book Distribution",
                "Audiobook Creation",
                "Author Branding & Websites",
                "Press Releases",
                "Ghostwriting",
                "Social Media Ads",
                "Book Consulting",
                "Book Trailers",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Image
                    src="/brand-img/new-lp/check.webp"
                    alt="check"
                    width={16}
                    height={16}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Form */}
          <div className="bg-[#117d6b] text-white rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6">
              Tell Us About Your Project Needs
            </h2>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Book Publishing",
                  "Cover Design",
                  "Illustration",
                  "Book Editing",
                  "Printing",
                  "Interior Formatting",
                ].map((label, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input type="checkbox" name="services" value={label} />
                    {label}
                  </label>
                ))}
              </div>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-2 rounded text-black"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-2 rounded text-black"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Enter your Phone No"
                pattern="[0-9]{10}"
                className="w-full p-2 rounded text-black"
                required
              />

              <select
                name="manuscript"
                className="w-full p-2 rounded text-black"
                required
              >
                <option value="">Do You Have a Completed Manuscript?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="inprogress">In Progress</option>
              </select>

              <select name="genre" className="w-full p-2 rounded text-black" required>
                <option value="">What Genre Is Your Book?</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Memoir">Memoir</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </select>

              <textarea
                name="msg"
                placeholder="Message"
                className="w-full p-2 rounded text-black"
                rows="4"
              ></textarea>

              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" required />
                I agree to receive communications by text message about my
                inquiry. Message and data rates may apply.
              </label>

              <button
                type="submit"
                className="bg-white w-full text-[#117d6b] font-semibold px-6 py-2 rounded hover:bg-gray-100 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>


      <section
        style={{ backgroundImage: "url('/brand-img/new-lp/pack-bg.webp')" }}
        className="pt-20 pb-[15%] cover bg-center bg-no-repeat bg-cover"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          {/* Left Side Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <Image
                src="/brand-img/new-lp/Our.webp"
                alt="Our Services"
                width={600}
                height={500}
                className="rounded-lg object-contain"
              />
            </div>
          </div>

          {/* Right Side Text */}
          <div className="text-white space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold leading-snug">
              Achieve Best-Selling <br /> Status at 70% Off
            </h2>
            <p className="text-lg">We’ll help turn your manuscript into a best-seller!</p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 content-center">
              {/* Button 1 */}
              <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="bg-[#15184c]  text-[#fff] font-semibold px-6 py-3 rounded-full flex items-center gap-2  duration-300 hover:bg-white hover:text-black"
              >
                Publish Your Book Now
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 
                0s-12.5 32.8 0 45.3L402.7 224H32c-17.7 
                0-32 14.3-32 32s14.3 32 32 32h370.7L297.4 
                393.4c-12.5 12.5-12.5 32.8 0 
                45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </button>

              {/* Button 2 */}
              <button
                type="button"
                onClick={handleOpenChat}
                className="bg-[#15184c] text-[#fff] font-semibold px-6 py-3 rounded-full flex items-center gap-2  duration-300 hover:bg-white hover:text-black"
              >
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="  text-[#117d6b] relative ">
        <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center shadow-[0_0_10px_#212529] rounded-[30px] px-[30px] py-[40px] md:mt-[-15%] bg-white z-30">
          {/* Left Content */}
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold leading-snug">
              Excited to Publish Your Manuscript?
            </h2>

            <p className="text-gray-700">
              We’re here to help. At Pine Book Publishing, we offer end-to-end
              book writing and publishing services, including:
            </p>

            <ul className="space-y-2 text-gray-800">
              {[
                "E-book publication",
                "Audiobooks",
                "Website Design, Development, & SEO",
                "Video Book Trailers",
                "Branding & Publicity",
                "Cover Design & Typesetting",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Image
                    src="/brand-img/new-lp/check.webp"
                    alt="Check icon"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  {item}
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
              <button
                type="button"
                className="px-5 py-4 flex gap-2 items-center bg-[#15184c] text-[#ffff] rounded-full font-medium text-sm duration-300 hover:bg-[#117d6b] hover:text-[#fff]"
              >
                Publish Your Book Now
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M502.6 278.6c12.5-12.5 12.5-32.8 
                  0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 
                  0s-12.5 32.8 0 45.3L402.7 224H32c-17.7 
                  0-32 14.3-32 32s14.3 32 32 32h370.7L297.4 
                  393.4c-12.5 12.5-12.5 32.8 0 
                  45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleOpenChat}
                className="bg-[#117d6b] text-white font-semibold py-3 rounded-full hover:bg-[#15184c] hover:text-[#fff] duration-300 px-5 py-2"
              >
                Live Chat
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <Image
              src="/brand-img/new-lp/Our.webp"
              alt="Books stack"
              width={400}
              height={300}
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      </section>



      <section className="py-20 bg-[#f9f9f9]  bg-cover" style={{ backgroundImage: "url('/brand-img/new-lp/footer.webp')" }}>
        <div className="container mx-auto px-4">
          <div data-aos="fade-up" data-aos-duration="1500" className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#117d6b] mb-4">Connect Us Now!</h2>
            <p className="text-gray-600 mb-10">
              Have questions? Reach out to Pine Book Publishing for personalized assistance.
            </p>

            <form className="space-y-6 bg-white shadow-[0_0_10px_#212529] rounded-[30px] px-[30px] py-[40px]">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your Name *"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#117d6b]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email *"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#117d6b]"
                  required
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your Phone No"
                pattern="[0-9]{10}"
                title="Please Enter Valid Phone No."
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#117d6b]"
              />

              <textarea
                name="msg"
                placeholder="Enter a brief description about your book"
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#117d6b]"
                required
              ></textarea>

              <label className="flex items-start text-sm text-black space-x-2">
                <input type="checkbox" name="subscribe" value="yes" className="mt-1" required />
                <span>
                  I agree to receive communications by text message about my inquiry. You may opt-out by replying STOP or ask
                  for more information by replying HELP. Message frequency varies. Message and data rates may apply.
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-[#117d6b] text-white font-semibold py-3 rounded-lg hover:bg-[#0a7a61] transition-ease"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>


      <footer className="bg-[#117d6b] py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">

            {/* Left Side */}
            <p className="text-center md:text-left text-sm">
              © Copyright 2025. All Rights Reserved.
            </p>

            {/* Right Side */}
            <ul className="flex items-center space-x-4 mt-3 md:mt-0">
              <li>
                <a
                  href="/term-condition.php"
                  target="_blank"
                  className="hover:text-[#15184c] transition-colors duration-300"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className="hover:text-[#15184c] transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>


      {/* Button to Open Modal */}
      {/* <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Open Form
      </button> */}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-lg p-6 rounded-3xl shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4 text-center">We are here to help!</h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Enter your Phone No"
                pattern="[0-9]{10}"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email Address *"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Describe your project..."
                required
                className="w-full border border-gray-300 rounded-lg p-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full #117d6b text-white py-2 rounded-lg hover:#117d6b transition"
              >
                Submit
              </button>
            </form>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}


    </main>
  );
}
