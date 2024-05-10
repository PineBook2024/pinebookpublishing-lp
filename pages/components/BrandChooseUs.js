import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandChooseUs() {

    return (
        <>
            <section className="overflow-hidden">
                <div className="brand-choose-us-section max-w-screen-xl ms-auto relative left-0 md:left-12 px-12 md:px-20 mt-20 mb-8 py-24">
                    <div className="flex items-center flex-col md:flex-row">
                        <div className="basis-1/3 brand-choose-us-vector">
                            <Image src={"/brand-img/why-choose-us-img.webp"} width={350} height={200} className="brand-choose-us-img"></Image>
                        </div>
                        <div className="basis-1/2 md:ml-20">
                            <h2 className="text-white font-majallab text-5xl md:text-6xl uppercase mt-20 md:mt-0">Why Choose Us</h2>
                            <p className="text-white text-xl font-poppins mt-2">Because at Pine Book Publishing, your success is our priority, and we're committed to helping you achieve your literary goals with confidence and ease. With us, you get: </p>
                            <div className="flex gap-10 mt-6">
                                <ul>
                                    <li className="font-majallab flex items-center gap-3"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Affordable Price</li>
                                    <li className="font-majallab flex items-center gap-3"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Tailored Creativity</li>
                                    <li className="font-majallab flex items-center gap-3"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Expert Craftsmanship</li>
                                </ul>
                                <ul>
                                    <li className="font-majallab flex items-center gap-3"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Engaging Narratives</li>
                                    <li className="font-majallab flex items-center gap-3"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />On-Time Deliveries</li>
                                    <li className="font-majallab flex items-center gap-3"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Pristine Publication</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}