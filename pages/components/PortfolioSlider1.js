import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bookCoverPaths = [
  "/brand-img/new-lp/book-covers/B&NPB 2.jpg",
  "/brand-img/new-lp/book-covers/Chhavyvann So 2-01.jpg",
  "/brand-img/new-lp/book-covers/Christopher Allen PB.jpg",
  "/brand-img/new-lp/book-covers/Hosea James Givan Paperback.jpg",
  "/brand-img/new-lp/book-covers/Jean Bosco N.jpg",
  "/brand-img/new-lp/book-covers/Jerimy Des Paperback.jpg",
  "/brand-img/new-lp/book-covers/Jerry Schaffe LULU PB.jpg",
  "/brand-img/new-lp/book-covers/Katie Loftis (Book 2) PB 2.jpg",
  "/brand-img/new-lp/book-covers/Kyle Climer 4.jpg",
  "/brand-img/new-lp/book-covers/Leslie Sundahl-Vick PB.jpg",
  "/brand-img/new-lp/book-covers/Max Miller Paper back Amazon-01.jpg",
  "/brand-img/new-lp/book-covers/Odell Furtick Paperback 2.jpg",
  "/brand-img/new-lp/book-covers/PAPERBACK-4.jpg",
  "/brand-img/new-lp/book-covers/PAPERBACK_2.jpg",
  "/brand-img/new-lp/book-covers/PAPERBACK_6.000x9.jpg",
  "/brand-img/new-lp/book-covers/Reginald Wade PB B&N.jpg",
  "/brand-img/new-lp/book-covers/Sandee Juicey Gordon Paperback-2.jpg",
  "/brand-img/new-lp/book-covers/Sonya Miranda 2_Front Cover copy 5.jpg",
  "/brand-img/new-lp/book-covers/Stewart BC 8.jpg",
  "/brand-img/new-lp/book-covers/Theodore A Anderson Paperback B&N.jpg",
  "/brand-img/new-lp/book-covers/Time & The River 7.jpg",
  "/brand-img/new-lp/book-covers/Unique Moore Part 1- Paperback.jpg",
  "/brand-img/new-lp/book-covers/Zulfi PB.jpg",
];

const imageSlides = bookCoverPaths.map((src, index) => ({
  id: index + 1,
  src,
}));

const rowSplitIndex = Math.ceil(imageSlides.length / 2);
const firstRowSlides = imageSlides.slice(0, rowSplitIndex);
const secondRowSlides = imageSlides.slice(rowSplitIndex);

const baseSliderSettings = {
  arrows: false,
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 0,
  speed: 7000,
  cssEase: "linear",
  pauseOnHover: false,
  pauseOnFocus: false,
  swipe: false,
  draggable: false,
  touchMove: false,
  variableWidth: false,
  slidesToShow: 5,
  slidesToScroll: 1,
};

function CoverRow({ slides, rtl = false }) {
  return (
    <Slider {...baseSliderSettings} rtl={rtl} className="portfolio-slick-row">
      {slides.concat(slides).map((slide, index) => (
        <div
          key={`${slide.id}-${index}`}
          className="portfolio-slick-slide px-2"
        >
          <div className="h-full overflow-hidden bg-[#0e1b3f] w-full">
            <a
              href={slide.src}
              className="portfolio1-glightbox block h-full w-full h-full"
              data-gallery="portfolio1-covers"
            >
              <img
                src={slide.src}
                alt={`Book cover ${slide.id}`}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default function PortfolioSlider1() {
  const lightboxRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    import("glightbox").then((GLightboxModule) => {
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
      }

      const GLightbox = GLightboxModule.default;
      lightboxRef.current = GLightbox({
        selector: ".portfolio1-glightbox",
      });
    });

    return () => {
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
      }
    };
  }, []);

  return (
    <section className="w-full pb-10 border-y border-[#193166] bg-[#071638] mb-10">
      <div className="mx-auto w-full">
        <div className="mb-5 px-4 pt-10 md:px-6">
          <h2 className="bg-gradient-to-r from-[#f5d27a] via-[#fff2c8] to-[#d9a441] bg-clip-text text-center text-3xl font-semibold tracking-[0.08em] text-transparent drop-shadow-[0_2px_12px_rgba(245,210,122,0.35)] md:text-3xl">
            Book Cover Design
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-[150px] rounded-full bg-gradient-to-r from-transparent via-[#f2cf79] to-transparent md:w-[190px]" />
        </div>

        <div className="overflow-hidden py-3">
          <CoverRow slides={firstRowSlides} rtl />
        </div>

        <div className="mt-3 overflow-hidden py-3">
          <CoverRow slides={secondRowSlides} />
        </div>
      </div>
    </section>
  );
}
