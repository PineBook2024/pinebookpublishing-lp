import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandCTA() {

    return (
        <>
            <section className="brand-cta-section max-w-screen-xl mx-auto px-6 md:px-20 my-20 relative py-24">
                <div className="flex items-center flex-col md:flex-row">
                    <div className="basis-1/3 brand-cta-vector">
                        <Image src={"/brand-img/cta-book.png"} width={500} height={200} className="brand-cta-book"></Image>
                    </div>
                    <div className="basis-1/2 md:ml-20">
                        <h2 className="text-white font-majallab text-6xl">Hey, Wanna Talk?</h2>
                        <p className="text-white text-xl font-poppins mt-10">Ready to Chat? Reach out with your ideas or inquiries – we’re excited to listen and engage. Your message is the highlight of our day!</p>
                        <button className="brand-nav-btn shadow-xl mt-10 cursor-pointer"><Link href="#">Let's Talk</Link></button>
                    </div>
                </div>
            </section>
        </>
    );
}