import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandProcess() {

    return (
        <>
            <section className="brand-process  mx-auto relative pt-10 text-center flex justify-center mb-12 overflow-hidden">
                <div className="max-w-screen-xl">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl text-black font-poppins">HOW WE WORK</h3>
                        <h2 className="font-majallab text-5xl md:text-7xl text-black aos-init aos-animate" data-aos="zoom-out-down">OUR PROCESS</h2>
                    </div>
                    <Image src={"/brand-img/process-img.png"} width={700} height={200} className="aos-init aos-animate pb-10" data-aos="fade-left" data-aos-duration="1000"></Image>
                </div>
            </section>
        </>
    );
}