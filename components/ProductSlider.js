"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";
import { useCart } from "../context/StoreContext";
import "swiper/css";
import "swiper/css/effect-fade";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ProductSlider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart } = useCart();
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products?limit=5`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((res) => {
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const formatPrice = (price) => {
    if (!price || price === "0.00" || price === "0") return "$0.00";
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const getImageUrl = (product) => {
    let url = product.cover_image_url;

    if (!url && product.images && Array.isArray(product.images) && product.images.length > 0) {
      const firstImage = product.images[0];
      url = typeof firstImage === 'object' ? firstImage.image_url : firstImage;
    }

    if (!url) {
      url = product.image;
    }

    if (!url) {
      return "/images/placeholder-book.png";
    }

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    if (url.startsWith("products/") || url.startsWith("images/")) {
      return `${API_BASE_URL}/storage/${url}`;
    }

    return `${API_BASE_URL}/storage/${url}`;
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const goToSlide = (index) => {
    if (firstSwiper) firstSwiper.slideToLoop(index);
    if (secondSwiper) secondSwiper.slideToLoop(index);
  };

  // ✅ Current product memoize karo taake re-render na ho
  const currentProduct = useMemo(() => {
    return products[activeIndex] || null;
  }, [products, activeIndex]);

  if (loading) {
    return (
      <div className="relative flex items-center justify-center h-full min-h-[500px]">
        <div className="w-12 h-12 border-b-2 border-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex items-center justify-center h-full min-h-[500px]">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="relative flex items-center justify-center h-full min-h-[500px]">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <div className="relative h-full pt-16 pb-16 overflow-hidden">
      <div className="flex flex-wrap items-start">
        {/* LEFT SIDE - Text Slider */}
        <div className="relative z-10 w-full lg:w-1/2">
          <div className="pt-10 lg:pt-14">
            <Swiper
              modules={[Controller, Autoplay, EffectFade]}
              onSwiper={setFirstSwiper}
              controller={{ control: secondSwiper }}
              onSlideChange={handleSlideChange}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              slidesPerView={1}
              speed={700}
              loop={true}
            >
              {products.map((product) => (
                <SwiperSlide key={product.product_id}>
                  <div className="px-4 pb-8 lg:pl-2 lg:pr-8">
                    <h1 className="mb-5 capitalize text-4xl md:text-5xl lg:text-[60px] font-medium leading-tight">
                      {product.title || "Untitled Product"}
                    </h1>

                    <div className="flex items-center mb-8">
                      <div className="mr-8 md:mr-16">
                        <span className="block mb-1 text-sm font-semibold text-gray-600">Price</span>
                        <span className="text-3xl md:text-4xl lg:text-[45px] font-semibold inline-block">
                          {product.discount_price && parseFloat(product.discount_price) > 0 ? (
                            <>
                              <span className="text-red-500">{formatPrice(product.discount_price)}</span>
                              <span className="ml-3 text-xl text-gray-400 line-through md:text-2xl">
                                {formatPrice(product.price)}
                              </span>
                            </>
                          ) : (
                            formatPrice(product.price)
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ✅ Buttons Swiper ke bahar rakho - static rahenge */}
            <div className="flex flex-wrap gap-3 px-4 lg:pl-2 lg:pr-8">
             <button
  onClick={() => {
    if (currentProduct) {
      addToCart(currentProduct, 1);
      setCartMessage("Added to cart successfully!");
      
      setTimeout(() => {
        setCartMessage("");
      }, 2000);
    }
  }}
  className="flex-1 px-8 py-3 font-medium text-white transition-colors bg-black rounded-xl hover:bg-gray-800"
>
  ADD TO CART
</button>
              {currentProduct && (
                <Link
                  href={`/products/${encodeURIComponent(currentProduct.slug || currentProduct.product_id)}`}
                  className="inline-block px-6 py-3 text-sm font-medium text-black transition-colors duration-300 border border-black md:px-8 md:text-base rounded-xl hover:bg-black hover:text-white"
                >
                  VIEW DETAIL
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Image Slider */}
        <div className="w-full mt-8 lg:w-1/2 lg:mt-0">
          <div className="relative lg:w-[65vw] xl:w-full max-lg:w-full">
            <Swiper
              modules={[Controller, EffectFade]}
              onSwiper={setSecondSwiper}
              controller={{ control: firstSwiper }}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              slidesPerView={1}
              speed={700}
              loop={true}
              allowTouchMove={false}
            >
              {products.map((product) => {
                const imageUrl = getImageUrl(product);
                return (
                  <SwiperSlide key={product.product_id}>
                    <div className="pr-4 lg:pr-16">
                      <div className="relative">
                        <img
                          src={imageUrl}
                          alt={product.title || "Product"}
                          className="block w-full h-auto max-h-[500px] lg:max-h-[600px] object-contain rounded-3xl"
                          onError={(e) => {
                            e.target.src = "/images/placeholder-book.png";
                          }}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="relative mt-8 lg:mt-0">
        <div className="flex gap-2 mb-8 lg:mb-0 lg:absolute lg:bottom-24 lg:left-4">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-black w-8" : "bg-gray-300 w-3 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <div className="flex items-end gap-4 mt-8 lg:mt-16 lg:absolute lg:bottom-8 lg:left-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 76 76" fill="none" className="flex-shrink-0">
            <path d="M52.6617 37.6496L58.7381 40.0325L75.0609 49.0874L66.6016 63.7422L49.9214 54.6872L45.1557 50.7554L46.1088 57.1892V75.18H28.952V57.1892L30.0243 50.5171L24.9011 54.6872L8.45924 63.7422L0 49.0874L16.3228 39.7942L22.3991 37.6496L16.3228 35.1475L0 26.2117L8.45924 11.557L25.1394 20.4928L30.0243 24.6629L28.952 18.3482V0H46.1088V18.3482L45.1557 24.4246L49.9214 20.4928L66.6016 11.557L75.0609 26.2117L58.7381 35.3858L52.6617 37.6496Z" fill="black"/>
          </svg>
          <div>
            <span className="block mb-1 text-sm font-bold">Summer Collection</span>
            <h4 className="text-lg md:text-xl font-medium uppercase max-w-[200px]">Trendy and Classic for the New Season</h4>
          </div>
        </div>
      </div>

      <div className="hidden xl:block">
        <svg className="absolute top-20 left-[45%] animate-[spin_10s_linear_infinite]" width="60" height="60" viewBox="0 0 94 94" fill="none">
          <path d="M47 0L53.8701 30.4141L80.234 13.766L63.5859 40.1299L94 47L63.5859 53.8701L80.234 80.234L53.8701 63.5859L47 94L40.1299 63.5859L13.766 80.234L30.4141 53.8701L0 47L30.4141 40.1299L13.766 13.766L40.1299 30.4141L47 0Z" fill="#FEEB9D"/>
        </svg>

        <svg className="absolute top-16 right-[15%] animate-[spin_10s_linear_infinite]" width="50" height="50" viewBox="0 0 82 94" fill="none">
          <path d="M41 0L45.277 39.592L81.7032 23.5L49.554 47L81.7032 70.5L45.277 54.408L41 94L36.723 54.408L0.296806 70.5L32.446 47L0.296806 23.5L36.723 39.592L41 0Z" fill="black"/>
        </svg>

        <Link href="/shop" className="absolute top-[60%] left-[40%] group">
          <div className="relative w-[120px] h-[120px]">
            <svg viewBox="0 0 120 120" className="w-full h-full animate-[spin_10s_linear_infinite]">
              <defs>
                <path id="circlePath" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"/>
              </defs>
              <text fill="black" fontSize="11" fontWeight="500" letterSpacing="2">
                <textPath href="#circlePath">
                  MORE COLLECTION • EXPLORE • MORE COLLECTION •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" fill="black" stroke="none"/>
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}