import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandServices() {

    return (
        <>
            <section className="brand-service-section">
                <div className="max-w-screen-xl mx-auto px-4 my-20 relative py-32">
                    <div className="text-center mb-6">
                        <h3 className="text-3xl text-white font-poppins">Our Publishing</h3>
                        <h2 className="font-majallab text-8xl text-white">Services</h2>
                    </div>

                    {/* 1 of 2 */}
                    <div className="brand-service-content flex gap-4">
                        <div className="brand-service-card flex gap-4">
                            <div className="brand-service-card-content basis-1/2 relative">
                                <span className="right"></span>
                                <span className="bottom"></span>
                                <div className="flex justify-between mb-12">
                                    <Image src={"/brand-img/service-icon1.png"} className="icon" width={50} height={50}></Image>
                                    <span className="font-majallab text-5xl">01</span>
                                </div>
                                <p className="font-poppins">Lorem ipsum dolor sit amet, <br></br> consectetur adipiscing elit, sed<br></br> eiusmod tempor incididunt </p>
                                <h4 className="mt-4 font-majallab text-3xl">EDITING</h4>
                            </div>
                            <div className="basis-1/2 brand-service-card-img relative">
                                <span class="square">
                                    <Link href="#">Read More</Link>
                                </span>
                                <Image src={"/brand-img/service-img1.png"} width={250} height={200}></Image>
                            </div>
                        </div>
                        <div className="brand-service-card flex gap-4">
                            <div className="brand-service-card-content basis-1/2 relative">
                                <span className="right"></span>
                                <span className="bottom"></span>
                                <div className="flex justify-between mb-12">
                                    <Image src={"/brand-img/service-icon2.png"} className="icon" width={50} height={50}></Image>
                                    <span className="font-majallab text-5xl">02</span>
                                </div>
                                <p className="font-poppins">Lorem ipsum dolor sit amet, <br></br> consectetur adipiscing elit, sed<br></br> eiusmod tempor incididunt </p>
                                <h4 className="mt-4 font-majallab text-3xl">PROOFREADING</h4>
                            </div>
                            <div className="basis-1/2 brand-service-card-img relative">
                                <span class="square">
                                    <Link href="#">Read More</Link>
                                </span>
                                <Image src={"/brand-img/service-img2.png"} width={250} height={200}></Image>
                            </div>
                        </div>
                    </div>
                    {/* 2 of 4 */}
                    <div className="brand-service-content flex mt-4 gap-4">
                        <div className="brand-service-card flex gap-4">
                            <div className="basis-1/2 brand-service-card-img relative">
                                <span class="square">
                                    <Link href="#">Read More</Link>
                                </span>
                                <Image src={"/brand-img/service-img3.png"} width={270} height={200}></Image>
                            </div>
                            <div className="brand-service-card-content basis-1/2 relative">
                            <span className="right"></span>
                                <span className="bottom"></span>
                                <div className="flex justify-between mb-12">
                                    <Image src={"/brand-img/service-icon3.png"} className="icon" width={50} height={50}></Image>
                                    <span className="font-majallab text-5xl">03</span>
                                </div>
                                <p className="font-poppins">Lorem ipsum dolor sit amet, <br></br> consectetur adipiscing elit, sed <br></br> eiusmod tempor incididunt </p>
                                <h4 className="mt-4 font-majallab text-3xl">FORMATTING</h4>
                            </div>
                        </div>
                        <div className="brand-service-card flex gap-4">
                            <div className="basis-1/2 brand-service-card-img relative">
                            <span class="square">
                                    <Link href="#">Read More</Link>
                                </span>
                                <Image src={"/brand-img/service-img4.png"} width={250} className="icon" height={200}></Image>
                            </div>
                            <div className="brand-service-card-content gap-4 basis-1/2 relative">
                            <span className="right-4"></span>
                                <span className="bottom-4"></span>
                                <div className="flex justify-between mb-12">
                                    <Image src={"/brand-img/service-icon4.png"} className="icon" width={50} height={50}></Image>
                                    <span className="font-majallab text-5xl">04</span>
                                </div>
                                <p className="font-poppins">Lorem ipsum dolor sit amet, <br></br> consectetur adipiscing elit, sed<br></br> eiusmod tempor incididunt </p>
                                <h4 className="mt-4 font-majallab text-3xl uppercase">Typesetting & Layout adjustment</h4>
                            </div>

                        </div>
                    </div>

                    {/* 4 of 6 */}
                    <div className="brand-service-content flex gap-4 mt-4">
                        <div className="brand-service-card flex gap-4">
                            <div className="brand-service-card-content basis-1/2 relative">
                            <span className="right"></span>
                                <span className="bottom"></span>
                                <div className="flex justify-between mb-12">
                                    <Image src={"/brand-img/service-icon1.png"} width={50} className="icon" height={50}></Image>
                                    <span className="font-majallab text-5xl">05</span>
                                </div>
                                <p className="font-poppins">Lorem ipsum dolor sit amet, <br></br> consectetur adipiscing elit, sed<br></br> eiusmod tempor incididunt </p>
                                <h4 className="mt-4 font-majallab text-3xl">COVER DESIGN</h4>
                            </div>
                            <div className="basis-1/2 brand-service-card-img relative">
                            <span class="square">
                                    <Link href="#">Read More</Link>
                                </span>
                                <Image src={"/brand-img/service-img1.png"} width={250} height={200}></Image>
                            </div>
                        </div>
                        <div className="brand-service-card flex gap-4">
                            <div className="brand-service-card-content basis-1/2 relative">
                            <span className="right"></span>
                                <span className="bottom"></span>
                                <div className="flex justify-between mb-12">
                                    <Image src={"/brand-img/service-icon2.png"} width={50} className="icon" height={50}></Image>
                                    <span className="font-majallab text-5xl">06</span>
                                </div>
                                <p className="font-poppins">Lorem ipsum dolor sit amet, <br></br> consectetur adipiscing elit, sed<br></br> eiusmod tempor incididunt </p>
                                <h4 className="mt-4 font-majallab text-3xl">PUBLISHING</h4>
                            </div>
                            <div className="basis-1/2 brand-service-card-img relative">
                            <span class="square">
                                    <Link href="#">Read More</Link>
                                </span>
                                <Image src={"/brand-img/service-img2.png"} width={250} height={200}></Image>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="font-poppins text-white mt-6 text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                    </div>
                </div>
            </section>
        </>
    );
}