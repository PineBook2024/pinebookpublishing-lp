import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandAbout(props) {

    return (
        <>
            <div className="container mx-auto max-w-screen-xl">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1">
                        <h3 className="font-majallab text-3xl md:text-6xl">
                            Who are We?
                        </h3>
                        <p className="font-poppins">
                            {props.subdescone}
                        </p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-end">
                        <Image src={"/brand-img/about-img-1.png"} width={470} height={470}
                            loading="lazy"
                            alt="about img"
                            className="pt-12"
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center flex-col-reverse md:flex-row lg:flex-row px-10 md:px-0">
                    <div className="basis-1/2 abt-pic text-center justify-center md:justify-start">
                        <Image src={"/brand-img/about-img-2.png"} width={470} height={470}
                            loading="lazy"
                            alt="about img"
                        />
                    </div>
                    <div className="basis-1/2 abt-txt m1-h p1">
                        <p className="font-poppins">
                            {props.subdesctwo}
                        </p>
                        <button className="brand-about-btn font-majallab">READ MORE</button>
                    </div>
                </div>
                <p className="font-poppins mt-14">{props.subdescthree}</p>
            </div>

        </>
    );
}