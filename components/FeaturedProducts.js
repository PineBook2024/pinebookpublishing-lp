"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products?is_featured=1`)
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

  const getImageUrl = (product) => {
    // Try multiple possible image fields from database
    let url = product.image || product.image_url || product.primary_image || product.thumbnail || product.cover_image || product.photo;

    if (!url) {
      return "/images/placeholder-product.png";
    }

    // Agar URL already complete hai (http/https)
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // Agar URL already / se start hoti hai (public folder se)
    if (url.startsWith("/")) {
      return url;
    }

    // Agar relative path hai toh storage URL prepend karo
    return `${API_BASE_URL}/storage/${url}`;
  };

  const calculateDiscount = (product) => {
    if (product.discount_price && product.price) {
      const discount = ((product.price - product.discount_price) / product.price) * 100;
      return Math.round(discount);
    }
    if (product.discount_percentage) {
      return product.discount_percentage;
    }
    if (product.discount_amount && product.price) {
      const discount = (product.discount_amount / product.price) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  // Get first 2 featured products for the 2 banners
  const bannerProducts = products.slice(0, 2);

  // Fallback data if API fails or less than 2 products
  const fallbackProducts = [
    {
      product_id: 1,
      name: "Summer Collection 2024",
      slug: "summer-collection-2024",
      price: 100,
      discount_price: 50,
      discount_percentage: 50,
      image: "/images/bb-01.png",
      badge_text: "Sale Up to 50% Off",
      title_line1: "Summer",
      title_line2: "2024",
      button_text: "Shop Now",
      style: "centered"
    },
    {
      product_id: 2,
      name: "New Summer Collection",
      slug: "new-summer-collection",
      price: 150,
      discount_price: 75,
      discount_percentage: 50,
      image: "/images/book-image-big.png",
      badge_text: "Sale Up to 50% Off",
      title_line1: "New Summer",
      title_line2: "Collection",
      button_text: "Shop Now",
      style: "left"
    }
  ];

  const displayProducts = bannerProducts.length >= 2 ? bannerProducts : fallbackProducts;

  if (loading) {
    return (
      <section className="adv-area">
        <div className="container-fluid !px-0">
          <div className="flex items-center justify-center row product-style2 g-0" style={{ height: '550px' }}>
            <div className="w-10 h-10 border-b-2 border-black rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="adv-area">
      <div className="container-fluid !px-0">
        <div className="row product-style2 g-0">
          {/* LEFT BANNER - Centered Overlay Style */}
          <div className="w-full lg:w-1/2 wow fadeInUp" data-wow-delay="0.1s">
            <div className="h-[550px] max-xl:h-[400px] max-sm:!h-[280px] relative overflow-hidden product-box style-4">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url('${getImageUrl(displayProducts[0])}')` }}
              ></div>

              {/* Centered Overlay Content */}
              <div className="absolute text-center top-1/2 right-1/4 [transform:translate(50%,_-50%)] p-[65px] max-xl:p-[55px] max-md:!p-10 max-4xl:right-[30%] sale-box">
                {/* Discount Badge */}
                <div className="mb-1 text-base font-black uppercase max-sm:text-xs">
                  {displayProducts[0].badge_text || `Sale Up to ${calculateDiscount(displayProducts[0])}% Off`}
                </div>

                {/* Title */}
                <h2 className="text-4.5xl max-xl:text-3xl max-sm:!text-base tracking-[8px] max-sm:!leading-[1.4] mb-2 uppercase">
                  {displayProducts[0].title_line1 || displayProducts[0].name?.split(' ')[0] || "Summer"}
                  <span className="text-8.5xl max-xl:text-7xl max-sm:!text-5xl !leading-[1] block font-semibold tracking-normal">
                    {displayProducts[0].title_line2 || "2024"}
                  </span>
                </h2>

                {/* Shop Now Button */}
                <Link
                  href={`/shop-list`}
                  className="btn py-3.6 px-[35px] max-sm:py-2 max-sm:px-4 text-base max-sm:text-2xs inline-block font-medium font-Lufga leading-[1.2] border border-secondary rounded-xl bg-white duration-700 hover:bg-secondary hover:text-white relative overflow-hidden uppercase"
                >
                  {displayProducts[0].button_text || "Shop Now"}
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT BANNER - Left-Aligned Overlay Style */}
          <div className="w-full lg:w-1/2 wow fadeInUp" data-wow-delay="0.2s">
            <div className="h-[550px] max-xl:h-[400px] max-sm:!h-[280px] relative overflow-hidden">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url('${getImageUrl(displayProducts[1])}')` }}
              ></div>

              {/* Left-Aligned Overlay Content */}
              <div className="flex items-start justify-center absolute size-full left-0 bottom-0 flex-col p-17 max-4xl:p-13.5 max-sm:!p-[15px] z-1">
                <div className="main-content">
                  {/* Discount Badge */}
                  <div className="mb-4 text-base font-black uppercase max-sm:text-xl">
                    {displayProducts[1].badge_text || `Sale Up to ${calculateDiscount(displayProducts[1])}% Off`}
                  </div>

                  {/* Title */}
                  <h2 className="text-6xl max-xl:text-4.5xl max-sm:!text-3xl mb-7.5 max-w-[540px] leading-[1.1] uppercase">
                    {displayProducts[1].title_line1 || "New Summer"}
                    <br />
                    {displayProducts[1].title_line2 || "Collection"}
                  </h2>
                </div>

                {/* Shop Now Button */}
                <Link
                  href={`/shop-list`}
                  className="btn py-3.6 px-[35px] text-base font-Lufga inline-block font-medium leading-[1.2] border border-secondary bg-secondary text-white rounded-xl duration-700 relative overflow-hidden uppercase"
                >
                  {displayProducts[1].button_text || "Shop Now"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}