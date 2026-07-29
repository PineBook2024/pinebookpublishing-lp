import React from "react";
import Image from "next/image";

export default function BrandBannerLogo() {
    return (
        <>
            <section className="brnd-slider bg-black overflow-hidden">
                <div className="container max-w-screen-xl grid grid-cols-1 width-container position-relative max-w-screen-xl">
                    <div className="book-sell-text ">
                        <h3 className="font-poppins text-xl md:text-xl leading-3 font-bold">Sell Your <br></br> <span>Book With</span></h3>
                    </div>
                    <div className="container mx-auto">
                        <div className="bnd-slider offer-logo-marquee flex py-7">
                            <div className="offer-logo-track">
                                {[0, 1, 2].map((group) => (
                                    <div key={`home-logo-set-${group}`} className="offer-logo-set">
                                        {[
                                            { src: "/images/Smashwords.png", width: 110, height: 80, className: "custom-logo-size" },
                                            { src: "/images/Barnes-and-Noble.png", width: 70, height: 80 },
                                            { src: "/images/Google-Books.png", width: 100, height: 80 },
                                            { src: "/images/Draft2digital.png", width: 100, height: 120, className: "custom-logo-size" },
                                            { src: "/images/logo5.png", width: 100, height: 80 },
                                            { src: "/images/logo6.png", width: 100, height: 80 },
                                            { src: "/images/logo7.png", width: 100, height: 80 },
                                            { src: "/images/logo8.png", width: 100, height: 80 },
                                        ].map((logo, idx) => (
                                            <a key={`home-logo-${group}-${idx}`} href="#" className="offer-logo-item">
                                                <Image
                                                    alt="LOGO"
                                                    src={logo.src}
                                                    width={logo.width}
                                                    height={logo.height}
                                                    className={logo.className}
                                                    loading="lazy"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
