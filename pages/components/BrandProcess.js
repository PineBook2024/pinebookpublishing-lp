import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandProcess() {

    return (
        <>
            <section className="brand-process  mx-auto relative py-24 text-center flex justify-center">
                <div className="max-w-screen-xl">
                    <Image src={"/brand-img/process-img.png"} width={700} height={200} ></Image>
                </div>
            </section>
        </>
    );
}