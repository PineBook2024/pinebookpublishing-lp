import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle, faPhone, faEnvelope, faLocationArrow, faLocation, faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BrandTopBar() {

    return (
        <>
            <div className="nav-top-bar text-center py-2 mt-3">
                {/* <h3 className="text-white font-poppins text-md md:text-xl font-thin"><b>From Manuscript to Marketplace: We Make It Happen for YOU.</b></h3> */}
                <div className="max-w-screen-xl flex md:flex-row flex-col justify-center md:justify-end gap-0 lg:gap-6 mx-auto items-center">
                    <Link
                        href="tel:8887867135"
                        className="text-white text-sm hover:text-white font-poppins flex justify-center items-center font-bold"
                    >
                        <FontAwesomeIcon icon={faPhone} className="me-3" width={16} />
                        Sales: (888) 786-7135
                    </Link>
                    <Link
                        href="tel:8668417469"
                        className="text-white text-sm hover:text-white font-poppins flex justify-center items-center font-bold"
                    >
                        <FontAwesomeIcon icon={faPhone} className="me-3" width={16} />
                        Support: (866) 841-7469
                    </Link>
                    <Link
                        href="mailto:support@pinebookpublishing.com"
                        className="text-white hover:text-white font-poppins text-sm flex justify-center md:justify-start items-center font-bold"
                    >
                        <FontAwesomeIcon icon={faEnvelope} className="me-3" width={16} />
                        support@pinebookpublishing.com{" "}
                    </Link>
                </div>
            </div>
        </>
    );
}