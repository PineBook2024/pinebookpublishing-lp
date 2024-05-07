import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandCTA() {

    return (
        <>
            <section className="brand-cta-section max-w-screen-xl mx-auto px-20 my-20 relative py-24">
                <div className="flex items-center">
                    <div className="basis-1/3 brand-cta-vector">
                        <Image src={"/brand-img/cta-book.png"} width={500} height={200} className="brand-cta-book"></Image>
                    </div>
                    <div className="basis-1/2 md:ml-20">
                        <h2 className="text-white font-majallab text-6xl">Connect with Us</h2>
                        <p className="text-white text-xl font-poppins mt-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse </p>
                        <button className="brand-nav-btn shadow-xl mt-10 cursor-pointer"><Link href="#">Lets Talk to Expert</Link></button>
                    </div>
                </div>
            </section>
        </>
    );
}