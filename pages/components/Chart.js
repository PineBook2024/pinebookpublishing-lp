import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Popup from "./popup";
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Chart() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('');


    const openModal = (service) => {
        setSelectedService(service);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    // Open Chat Click
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://static.zdassets.com/ekr/snippet.js?key=6ad75b0f-d085-4cae-9a7a-48abeb69b973";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleOpenChat = () => {
        window.zE && window.zE('webWidget', 'open');
    };


    return (
        <>
            <Popup isOpen={isModalOpen} onClose={closeModal} service={selectedService} />

            <section className="table-sec overflow-x-scroll">
                <div className="container mx-auto m1-h mt-10">
                    <h3 className="mb-8 text-center font-majallab text-5xl md:text-7xl">
                        Comparison Chart
                    </h3>
                </div>
                <div className="width-container">
                    <div className="container mx-auto">
                        <div class="check-wrap">
                            <div class="check-list flex">
                                <span className="flex mx-5 items-center text-sm  md:text-xl font-bold pb-4">
                                    Included:{" "}
                                    <FontAwesomeIcon icon={faCheckCircle} color="#2c9384" className="ms-4" fontSize={20} />
                                </span>
                                <span className="flex text-sm  md:text-xl font-bold pb-4 items-center">
                                    Can be purchased as an add-on:{" "}
                                    <FontAwesomeIcon icon={faPlusCircle} color="#2c9384" className="ms-4" />
                                </span>
                            </div>
                        </div>
                        <div className="md:w-full w-[500px]">
                            <table className="w-full mb-14 table-auto">
                                <thead className="first-row">
                                    <tr>
                                        <th
                                            id="sticky-header-column-fixed"
                                            class="mainpage-regular"
                                        ></th>

                                        <th className="font-majallab">
                                            {" "}
                                            Beginners
                                            <br />
                                            <button
                                                onClick={handleOpenChat}
                                                type="button"
                                                class="text-black bg-white border border-gray-300 focus:outline-none font-lg rounded-full text-sm px-2 md:px-5 py-2.5 me-2 mb-2 font-majallab"
                                            >
                                                Talk to us
                                            </button>
                                        </th>

                                        <th className="font-majallab">
                                            Standard
                                            <br />
                                            <button
                                                onClick={handleOpenChat}
                                                type="button"
                                                class="text-black bg-white border border-gray-300 focus:outline-none font-lg rounded-full text-sm px-2 md:px-5 py-2.5 me-2 mb-2 font-majallab"
                                            >
                                                Talk to us
                                            </button>
                                        </th>

                                        <th className="font-majallab">
                                            Expert
                                            <br />
                                            <button
                                                onClick={handleOpenChat}
                                                type="button"
                                                class="text-black bg-white border border-gray-300 focus:outline-none font-lg rounded-full text-sm px-2 md:px-5 py-2.5 me-2 mb-2 font-majallab"
                                            >
                                                Talk to us
                                            </button>
                                        </th>

                                        <th className="font-majallab">
                                            Enterprise
                                            <br />
                                            <button
                                                onClick={handleOpenChat}
                                                type="button"
                                                class="text-black bg-white border border-gray-300 focus:outline-none font-lg rounded-full text-sm px-2 md:px-5 py-2.5 me-2 mb-2 font-majallab"
                                            >
                                                Talk to us
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <th
                                            className="pro text-3xl md:text-5xl text-start ml-10"
                                            colspan="5"
                                            scope="row"
                                        >
                                            PROJECT MANAGEMENT AND SUPPORT
                                        </th>
                                    </tr>
                                    <tr>
                                        <td className="">Dedicated Project Manager</td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>100% Copyright Ownership</td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Paperback Author Copy</td>
                                        <td>3</td>
                                        <td>5</td>
                                        <td>7</td>
                                        <td>10</td>
                                    </tr>
                                    <tr>
                                        <td>Hardcover Author Copy</td>
                                        <td>
                                            <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                                        </td>
                                        <td>1</td>
                                        <td>2</td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <th
                                            className="pro text-3xl md:text-5xl text-start"
                                            colspan="5"
                                            scope="row"
                                        >
                                            <span className="ml-32 md:ml-40">EDITING</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td className="">Editing &amp; Proofreading</td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">Typesetting &amp; Layout Adjustment</td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">eBook Formatting</td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">PaperBack Formatting</td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">Hardcover Formatting</td>
                                        <td>
                                            <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">Publishing Platforms</td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>4</td>
                                        <td>5</td>
                                    </tr>
                                    <tr>
                                        <td className="">Revisions Per Draft</td>
                                        <td>3 - 5</td>
                                        <td>3 - 5</td>
                                        <td>3 - 5</td>
                                        <td>3 - 5</td>
                                    </tr>

                                    <tr>
                                        <th
                                            className="pro text-3xl md:text-5xl text-start"
                                            colspan="5"
                                            scope="row"
                                        >
                                            <span className="ml-32 md:ml-40">DESIGN</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td className="">Design Consultation</td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">Cover Design</td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">Interior Layout</td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">Revision Rounds</td>
                                        <td>3</td>
                                        <td>3</td>
                                        <td>4</td>
                                        <td>5</td>
                                    </tr>
                                    <tr>
                                        <td className="">Black-and-White or Full-Color Interior</td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">Image Insertions</td>
                                        <td>10</td>
                                        <td>15</td>
                                        <td>20</td>
                                        <td>30</td>
                                    </tr>

                                    <tr>
                                        <th
                                            className="pro text-3xl md:text-5xl text-start"
                                            colspan="5"
                                            scope="row"
                                        >
                                            <span className="ml-32 md:ml-40">DISTRIBUTION</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td className="">eBook Distribution</td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">Paperback Format Distribution</td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">Hardcover Format Distribution</td>
                                        <td>
                                            <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">Print-on-Demand Availability</td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">ISBN</td>
                                        <td>1</td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td className="">Amazon Author Central</td>
                                        <td>
                                            <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th
                                            className="pro text-3xl md:text-5xl text-start"
                                            colspan="5"
                                            scope="row"
                                        >
                                            <span className="ml-32 md:ml-40">MARKETING</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td className="">Marketing Consultation</td>
                                        <td>
                                            <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">Custom Marketing Strategy</td>
                                        <td>
                                            <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faCheckCircle} color="#fff" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">Author's Dynamic Website</td>
                                        <td>
                                            <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                                        </td>
                                        <td>4 PAGES</td>
                                        <td>6 PAGES</td>
                                    </tr>
                                    <tr>
                                        <td className="">Social Media Marketing</td>
                                        <td>
                                            <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                                        </td>
                                        <td>3 MONTHS</td>
                                        <td>6 MONTHS</td>
                                    </tr>
                                    <tr>
                                        <td className="">Search Engine Optimization</td>
                                        <td>
                                            <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faPlusCircle} color="#fff" />
                                        </td>
                                        <td>3 MONTHS</td>
                                    </tr>

                                    <tr className="font-majallab">
                                        <td></td>
                                        <td className="md:w-auto w-24">
                                            <a
                                                // data-src="#popup-layout"
                                                // href="javascript:;"
                                                onClick={() => openModal('Beginners')}
                                                className="cursor-pointer md:min-w-26 w-40 text-black bg-white focus:outline-none font-medium rounded-full text-sm px-2 py-2.5 me-2 mb-2 md:px-5"
                                                data-source="Beginners Bundles"
                                            >
                                                Get a Quote
                                            </a>
                                        </td>
                                        <td className="md:w-auto w-24">
                                            <a
                                                // data-src="#popup-layout"
                                                // href="javascript:;"
                                                onClick={() => openModal('Standard')}
                                                className="cursor-pointer md:min-w-26 w-40 text-black bg-white focus:outline-none font-medium rounded-full text-sm px-2 py-2.5 me-2 mb-2 md:px-5"
                                                data-source="Beginners Bundles"
                                            >
                                                Get a Quote
                                            </a>
                                        </td>
                                        <td className="md:w-auto w-24">
                                            <a
                                                // data-src="#popup-layout"
                                                // href="javascript:;"
                                                onClick={() => openModal('Expert')}
                                                className="cursor-pointer md:min-w-26 w-40 text-black bg-white focus:outline-none font-medium rounded-full text-sm px-2 py-2.5 me-2 mb-2 md:px-5"
                                                data-source="Beginners Bundles"
                                            >
                                                Get a Quote
                                            </a>
                                        </td>
                                        <td className="md:w-auto w-24">
                                            <a
                                                // data-src="#popup-layout"
                                                // href="javascript:;"
                                                onClick={() => openModal('Enterprise')}
                                                className="cursor-pointer md:min-w-26 w-40 text-black bg-white focus:outline-none font-medium rounded-full text-sm px-2 py-2.5 me-2 mb-2 md:px-5"
                                                data-source="Beginners Bundles"
                                            >
                                                Get a Quote
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}