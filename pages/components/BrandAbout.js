import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandAbout() {

    return (
        <>
            <div className="container mx-auto py-12 max-w-screen-xl">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row">
                    <div className="basis-1/2 abt-txt m1-h p1">
                        <h3 className="font-majallab text-3xl md:text-5xl">
                            ABOUT PINE BOOK
                        </h3>
                        <h3 className="font-majallab text-3xl md:text-7xl">
                            PUBLISHING
                        </h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        </p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-end">
                        <Image src={"/brand-img/about-img-1.png"} width={470} height={470}
                            loading="lazy"
                            alt="about img"
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row">
                    <div className="basis-1/2 abt-pic text-center justify-center md:justify-start">
                        <Image src={"/brand-img/about-img-2.png"} width={470} height={470}
                            loading="lazy"
                            alt="about img"
                        />
                    </div>
                    <div className="basis-1/2 abt-txt m1-h p1">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        </p>
                        <button className="brand-about-btn font-majallab">READ MORE</button>
                    </div>

                </div>
            </div>

        </>
    );
}