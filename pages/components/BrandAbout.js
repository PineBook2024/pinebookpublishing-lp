import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandAbout(props) {

    return (
        <>
            <div className="container mx-auto max-w-screen-xl overflow-hidden">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h3 className="font-majallab text-3xl md:text-6xl">
                            Who are We?
                        </h3>
                        <p className="font-poppins text-xl ">
                            {props.subdescone}
                        </p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-end">
                        <Image src={"/brand-img/about-img-1.webp"} width={500} height={470}
                            loading="lazy"
                            alt="about img"
                            className="pt-12 aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center flex-col-reverse md:flex-row lg:flex-row px-10 md:px-0">
                    <div className="basis-1/2 abt-pic text-center justify-center md:justify-start mt-12 md:mt-12">
                        <Image src={"/brand-img/about-img-2.webp"} width={500} height={470}
                            loading="lazy"
                            alt="about img"
                            data-aos="zoom-in-left" data-aos-duration="1000"
                            className="aos-init aos-animate"
                        />
                    </div>
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate"  data-aos="fade-left" data-aos-duration="1000">
                        <p className="font-poppins text-xl mb-8">
                            {props.subdesctwo}
                        </p>
                        <Link href={"/about"} className="brand-about-btn font-majallab">READ MORE</Link>
                    </div>
                </div>
                <p className="font-poppins mt-14 text-xl w-4/5 mx-auto text-center mb-6">{props.subdescthree}</p>
            </div>
        </>
    );
}