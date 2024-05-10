import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandProcess() {

    return (
        <>
            <section className="brand-process  mx-auto relative pt-10 text-center flex justify-center mb-12">
                <div className="max-w-screen-xl">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl text-black font-poppins">HOW WE WORK</h3>
                        <h2 className="font-majallab text-5xl md:text-7xl text-black">OUR PROCESS</h2>
                    </div>
                    <Image src={"/brand-img/process-img.webp"} width={700} height={200}></Image>
                </div>
            </section>
        </>
    );
}