import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandPrimaryHeader(props) {

    return (
        <>
            <section class="brand-primary-header-bg py-5">
                <div class="container max-w-screen-xl mx-auto">
                    <div class="row py-5">
                        <div class="col-12 px-5 w-100 md:w-3/5">
                            {/* <h2 className="text-white  font-poppins text-2xl">{props.subtitle}</h2> */}
                            <h1 class="text-3xl text-white  font-poppins pt-10">
                            {props.subtitle}<br></br>
                                {props.title}</h1>
                            <p class="text-xl text-white pt-2">{props.desc}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}