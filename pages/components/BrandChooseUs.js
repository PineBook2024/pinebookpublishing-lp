import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandChooseUs() {

    return (
        <>
             <section className="brand-choose-us-section max-w-screen-xl ms-auto px-20 my-20 relative py-24 relative left-12">
                <div className="flex items-center">
                    <div className="basis-1/3 brand-choose-us-vector">
                        <Image src={"/brand-img/why-choose-us-img.png"} width={350} height={200} className="brand-choose-us-img"></Image>
                    </div>
                    <div className="basis-1/2 md:ml-20">
                        <h2 className="text-white font-majallab text-6xl uppercase">Why Choose Us</h2>
                        <p className="text-white text-xl font-poppins mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className="flex gap-10 mt-6">
                            <ul>
                                <li className="font-majallab">Lorem ipsum</li>
                                <li className="font-majallab">Lorem ipsum</li>
                                <li className="font-majallab">Lorem ipsum</li>
                            </ul>
                            <ul>
                                <li className="font-majallab">Lorem ipsum</li>
                                <li className="font-majallab">Lorem ipsum</li>
                                <li className="font-majallab">Lorem ipsum</li>
                            </ul>
                        </div>
                        {/* <div className="brand-choose-us-audio-wrapper">
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    );
}