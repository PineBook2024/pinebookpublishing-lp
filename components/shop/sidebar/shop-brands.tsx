import React from "react";
import Image from "next/image";
import Link from "next/link";

// brand images from public folder (direct URLs)
const brand_images = [
  "/assets/alibris.png",
  "/assets/amazon.png",
  "/assets/Amazons.png",
  "/assets/bakertaylor.png",
  "/assets/BAM.png",
  "/assets/badge.png",
  "/assets/bage2.png",
  "/assets/bage3.png",
];

export default function ShopBrands() {
  return (
    <div className="tp-shop-widget mb-50">
      <h3 className="tp-shop-widget-title">Popular Brands</h3>
      <div className="tp-shop-widget-content">
        <div className="flex-wrap tp-shop-widget-brand-list d-flex align-items-center justify-content-between">
          {brand_images.map((item, i) => (
            <div className="tp-shop-widget-brand-item" key={i}>
              <Link href="#">
                <Image 
                  src={item} 
                  alt="brand-img" 
                  width={100} 
                  height={50} 
                  style={{ height: "auto" }} 
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}