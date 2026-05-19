"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Static images from your original design (fallback)
const DEFAULT_IMAGES = [
  "/images/bb-01.png",
  "/images/bb1-min.webp", 
  "/images/bb-02.png",
  "/images/bb2-min.webp",
  "/images/bb-03.png",
  "/images/bb3-min.webp",
  "/images/bb-04.png",
];

export default function FeaturedCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Refs for navigation buttons - IMPORTANT for Swiper to work
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/categories`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((res) => {
        console.log("Categories API Response:", res);
        // Merge API data with default images if image_url is missing
        const enrichedData = (res.data || []).map((cat, index) => ({
          ...cat,
          image_url: cat.image_url || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length],
        }));
        setCategories(enrichedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        // Fallback to static data with images
        setCategories([
          { category_id: 1, name: "Shirts", slug: "shirts", image_url: "/images/bb-01.png" },
          { category_id: 2, name: "Shorts", slug: "shorts", image_url: "/images/bb1-min.webp" },
          { category_id: 3, name: "t-Shirt", slug: "t-shirt", image_url: "/images/bb-02.png" },
          { category_id: 4, name: "t-Jeans", slug: "t-jeans", image_url: "/images/bb2-min.webp" },
          { category_id: 5, name: "t-Jeans", slug: "t-jeans-2", image_url: "/images/bb-03.png" },
          { category_id: 6, name: "Shorts", slug: "shorts-2", image_url: "/images/bb3-min.webp" },
          { category_id: 7, name: "t-Shirt", slug: "t-shirt-2", image_url: "/images/bb-04.png" },
        ]);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (category) => {
    let url = category.image_url;

    if (!url) {
      return "/images/placeholder-category.png";
    }

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    return `${API_BASE_URL}/storage/${url}`;
  };

  if (loading) {
    return (
      <section className="overflow-hidden shop-section">
        <div className="container-fluid !p-0">
          <div className="flex items-center justify-center py-20 row">
            <div className="w-10 h-10 border-b-2 border-black rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden shop-section">
      <div className="container-fluid !p-0">
        <div className="row">
          {/* LEFT SIDE - Categories Slider */}
          <div className="lg:w-2/3 w-full !px-25 max-lg:!px-7.5 py-20 max-sm:py-13.5 bg-light2 relative overflow-hidden z-1 left-box">
            <Swiper
              modules={[Navigation]}
              slidesPerView={2}
              spaceBetween={20}
              breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 20 },
                768: { slidesPerView: 4, spaceBetween: 25 },
                1024: { slidesPerView: 5, spaceBetween: 30 },
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className="swiper swiper-shop"
            >
              {categories.map((category, index) => (
                <SwiperSlide key={category.category_id || index}>
                  <div className="shop-box style-1 wow fadeInUp" data-wow-delay={`${0.2 + index * 0.2}s`}>
                    <div className="mb-7.5 text-center relative overflow-hidden">
                      <img
                        src={getImageUrl(category)}
                        alt={category.name || "Category"}
                        className="w-40 h-[170px] object-contain"
                        onError={(e) => {
                          e.target.src = DEFAULT_IMAGES[index % DEFAULT_IMAGES.length] || "/images/placeholder-category.png";
                        }}
                      />
                    </div>
                    <h6 className="text-base font-medium bg-white text-center w-fit m-auto py-1.1 px-5 rounded-3.5xl border border-black">
                      <Link 
                        href={`/shop-with-category/${category.slug || category.category_id}`}
                        className="transition-colors hover:text-primary"
                      >
                        {category.name || "Category"}
                      </Link>
                    </h6>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Left Badge - More Collection */}
            <Link
              className="w-[140px] p-2.5 absolute rounded-full inline-block right-[-75px] top-1/2 max-3xl:hidden icon-button"
              href="/shop-standard.html"
              style={{ transform: "translate(-8%, -50%)" }}
            >
              <div className="flex items-center justify-center size-[140px] rounded-full animate-rotate text-center text-row word-rotate-box c-black border-secondary">
                <span className="word-rotate">More Collection Explore </span>
                <svg
                  className="block [animation-direction:reverse] animate-rotate badge__emoji"
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 35 35"
                  fill="none"
                >
                  <path
                    d="M32.2645 16.9503H4.08145L10.7508 10.4669C11.2604 9.97176 10.5046 9.1837 9.98813 9.68289C9.98815 9.68286 2.35193 17.1063 2.35193 17.1063C2.12911 17.3092 2.14686 17.6755 2.35196 17.8903C2.35193 17.8903 9.98815 25.3169 9.98815 25.3169C10.5021 25.81 11.2622 25.0367 10.7508 24.5328C10.7508 24.5329 4.07897 18.0441 4.07897 18.0441H32.2645C32.9634 18.0375 32.9994 16.9636 32.2645 16.9503Z"
                    fill="#000"
                  />
                </svg>
              </div>
            </Link>
          </div>

          {/* RIGHT SIDE - Featured Categories Info */}
          <div className="lg:w-1/3 w-full py-20 max-xl:p-10 max-xl:[align-items:unset] bg-black relative overflow-hidden z-1 flex flex-col justify-center items-center">
            <div>
              <h3
                className="w-4/5 mb-2 text-4xl font-medium text-white max-sm:text-2xxl max-sm:w-full wow fadeInUp"
                data-wow-delay="1.2s"
              >
                Featured Categories
              </h3>
              <p className="mb-7.5 w-[70%] text-[#ffffffcc] wow fadeInUp" data-wow-delay="1.4s">
                Discover the most trending products in Pixio.
              </p>
              
              {/* Custom Navigation Buttons - WORKING */}
              <div className="flex items-center gap-7 wow fadeInUp" data-wow-delay="1.6s">
                <button 
                  ref={prevRef}
                  className="flex items-center justify-center w-12 h-12 transition-colors border rounded-full cursor-pointer shop-button-prev border-white/30 hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                    <path
                      d="M32.2645 16.9503H4.08145L10.7508 10.4669C11.2604 9.97176 10.5046 9.1837 9.98813 9.68289C9.98815 9.68286 2.35193 17.1063 2.35193 17.1063C2.12911 17.3092 2.14686 17.6755 2.35196 17.8903C2.35193 17.8903 9.98815 25.3169 9.98815 25.3169C10.5021 25.81 11.2622 25.0367 10.7508 24.5328C10.7508 24.5329 4.07897 18.0441 4.07897 18.0441H32.2645C32.9634 18.0375 32.9994 16.9636 32.2645 16.9503Z"
                      fill="white"
                    />
                  </svg>
                </button>

                <button 
                  ref={nextRef}
                  className="flex items-center justify-center w-12 h-12 transition-colors border rounded-full cursor-pointer shop-button-next border-white/30 hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                    <path
                      d="M2.73549 16.9503H30.9186L24.2492 10.4669C23.7396 9.97176 24.4954 9.1837 25.0119 9.68289L32.6481 17.1063C32.8709 17.3092 32.8531 17.6755 32.648 17.8903L25.0118 25.3169C24.4979 25.81 23.7378 25.0367 24.2492 24.5328L30.921 18.0441H2.73549C2.03663 18.0375 2.00064 16.9636 2.73549 16.9503Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Badge - More Collection */}
            <Link
              className="w-[140px] p-2.5 absolute rounded-full inline-block left-[-65px] top-1/2 max-3xl:hidden icon-button"
              href="/shop-standard.html"
              style={{ transform: "translate(-10%, -50%)" }}
            >
              <div className="flex items-center justify-center size-[140px] rounded-full animate-rotate text-center text-row word-rotate-box c-black border-white">
                <span className="text-white word-rotate">More Collection Explore </span>
                <svg
                  className="block [animation-direction:reverse] animate-rotate badge__emoji"
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 35 35"
                  fill="none"
                >
                  <path
                    d="M32.2645 16.9503H4.08145L10.7508 10.4669C11.2604 9.97176 10.5046 9.1837 9.98813 9.68289C9.98815 9.68286 2.35193 17.1063 2.35193 17.1063C2.12911 17.3092 2.14686 17.6755 2.35196 17.8903C2.35193 17.8903 9.98815 25.3169 9.98815 25.3169C10.5021 25.81 11.2622 25.0367 10.7508 24.5328C10.7508 24.5329 4.07897 18.0441 4.07897 18.0441H32.2645C32.9634 18.0375 32.9994 16.9636 32.2645 16.9503Z"
                    fill="white"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}