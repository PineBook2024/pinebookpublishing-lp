import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandCTA(props) {
    const handleOpenChat = () => {
        window.zE && window.zE('webWidget', 'open');
    };

    return (
        <>
            <section className="brand-cta-section max-w-screen-xl mx-auto px-6 md:px-20 my-20 relative py-16">
                <div className="flex items-center flex-col md:flex-row">
                    <div className="basis-1/3 brand-cta-vector">
                        <Image src={"/brand-img/cta-book.webp"} width={400} height={200} className="brand-cta-book aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000"></Image>
                    </div>
                    <div className="basis-1/2 md:ml-20">
                        <h2 className="text-white font-poppins text-3xl md:text-4xl aos-init aos-animate font-bold" data-aos="flip-down">{props.title}</h2>
                        <p className="text-white mt-10">{props.desc}</p>
                        <button className="brand-nav-btn shadow-xl mt-10 cursor-pointer" onClick={handleOpenChat}><Link href={'javascript:;'}>{props.btntext}</Link></button>
                    </div>
                </div>
            </section>
        </>
    );
}