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
                            <h3 class="text-5xl text-white  font-majallab">
                                {props.title}</h3>
                            <p class="text-xl text-white  font-poppins ">{props.desc}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}