import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AnimateFade from "../components/fade";

export default function About(props) {

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center">
                <AnimateFade type={"top"}>
                    <div className="abt-txt m1-h p1">
                        <h3 className="font-poppins text-3xl md:text-7xl">
                            About Us<span>Pine Book Publishing</span>
                        </h3>
                        <p>
                            Celebrate your tales with Pine Book Publishing, a book
                            publishing company that specializes in bringing authors' visions
                            to life through professional book publishing services. Our team
                            of skilled professionals is committed to guide you through every
                            step of the publishing process, ensuring your book captivates
                            readers and makes an everlasting impact worldwide.
                        </p>
                    </div>
                </AnimateFade>
                <div className="abt-pic text-center">
                    <AnimateFade type={"left"}>
                        <Image src={"/images/abt-pic.png"} width={500} height={570}
                            layout="responsive"
                            loading="lazy"
                            alt="about img"
                        />
                    </AnimateFade>
                </div>
            </div>

        </>
    );
}