import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle, faPhone, faEnvelope, faLocationArrow, faLocation, faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BrandTopBar() {

    return (
        <>
            <div className="nav-top-bar text-center py-2 ">
                {/* <h3 className="text-white font-poppins text-md md:text-xl font-thin"><b>From Manuscript to Marketplace: We Make It Happen for YOU.</b></h3> */}
                <div className="max-w-screen-xl flex justify-center md:justify-end gap-6 mx-auto items-center">
                    <Link
                        href="tel:8668417469"
                        className="text-white text-sm hover:text-white font-poppins flex justify-center items-center"
                    >
                        {/* <FontAwesomeIcon icon={faPhone} className="me-3" /> */}
                        (866) 841-7469
                    </Link>
                    <Link
                        href="mailto:info@pinebookpublishing.com"
                        className="text-white hover:text-white font-poppins text-sm flex justify-center md:justify-start items-center"
                    >
                        {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                        info@pinebookpublishing.com{" "}
                    </Link>
                </div>
            </div>
        </>
    );
}