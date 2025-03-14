import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

export default function BrandAbout(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const router = useRouter();
    const isHomePage = router.pathname === "/";

    return (
        <>
            <div className="container mx-auto max-w-screen-lg overflow-hidden pt-0 md:pt-20 pb-10">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h2 className="font-poppins text-3xl md:text-5xl font-bold">
                            About Us
                        </h2>
                        <h2 className="font-poppins text-3xl md:text-5xl uppercase font-bold">Pine Book Publishing</h2>
                        {/* <FadeIn> */}
                        <p className="font-poppins text-xl pt-4">
                        Have you ever tried publishing a book but don’t know where to start? Did you ever plan to consult a book publishing company? We get it – there are more <Link href={"https://pinebookpublishing.com/"}> book publishing companies </Link> out there than stars in the sky (okay, maybe not that many, but you get the idea).
                        </p>
                        <p className="font-poppins text-xl mb-5">
                            {props.subdesctwo}
                        </p>
                        <p className="font-poppins text-xl mb-8">
                            {props.subdescthree}
                        </p>
                        {isHomePage && (
                            <Link href="/about" className="brand-about-btn font-poppins">READ MORE</Link>
                        )}
                        {/* </FadeIn> */}
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-end">
                        <motion.div
                            initial={false}
                            animate={
                                isLoaded && isInView
                                    ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                                    : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
                            }
                            transition={{ duration: 1, delay: 0 }}
                            viewport={{ once: true }}
                            onViewportEnter={() => setIsInView(true)}
                        >
                            {/* <Image src={"/brand-img/about-img-1.webp"} width={400} height={470}
                                loading="lazy"
                                alt="about img"
                                className="pt-12"
                                onLoad={() => setIsLoaded(true)}
                            /> */}
                            <Image src={"/images/About-us-img.png"} width={500} height={570}
                                layout="responsive"
                                loading="lazy"
                                alt="about img"
                                onLoad={() => setIsLoaded(true)}
                            />
                        </motion.div>
                    </div>
                </div>
                {/* <div className="flex justify-center items-center flex-col-reverse md:flex-row lg:flex-row px-10 md:px-0">
                    <div className="basis-1/2 abt-pic text-center justify-center md:justify-start mt-12 md:mt-12">
                        <FadeIn>
                            <Image src={"/brand-img/happy-professional-multiethnic-business-team.png"} width={400} height={470}
                                loading="lazy"
                                alt="about img"
                            />
                        </FadeIn>
                    </div>
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-left" data-aos-duration="1000">
                        <p className="font-poppins text-xl mb-8 pt-20">
                            {props.subdesctwo}
                        </p>
                        {isHomePage && (
                            <Link href="/about" className="brand-about-btn font-poppins">READ MORE</Link>
                        )}
                    </div>
                </div> */}
                {/* <p className="font-poppins mt-14 text-xl w-4/5 mx-auto text-center mb-6">{props.subdescthree}</p> */}
            </div>
        </>
    );
}
