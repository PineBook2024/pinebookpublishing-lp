import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "./popup";


export default function Packages({ isOpen, onClose, service }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('');


    const openModal = (service) => {
        setSelectedService(service);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    const handleOpenChat = () => {
        window.zE && window.zE('webWidget', 'open');
    };


    return (
        <>
            <Popup isOpen={isModalOpen} onClose={closeModal} service={selectedService} />
            <section className="packages pt-8 pb-24">
                <div className="width-container">
                    <div className="container mx-auto">
                        <div className="text-center mb-6">
                            <h3 className="text-3xl text-white font-poppins uppercase">Publishing</h3>
                            <h2 className="font-majallab text-7xl text-white uppercase">Bundles</h2>
                        </div>

                        <div className="packages-wrapper flex justify-center gap-12">
                            <div className="single-packages relative">
                                <h4 className="text-4xl text-white font-majallab mb-6 text-center pt-12">Basic Package</h4>
                                <div className="single-packages-content mb-5 px-10">
                                    <div className="flex gap-2 mb-5 items-center items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Editing & Proofreading
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Typesetting & Layout Adjustment
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Formatting (for 50+ Platforms)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Multiple Revisions
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Royalties & Ownership Rights
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Publishing on Kindle
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        eBook Format
                                    </div>
                                </div>
                                <div className="text-center mb-6">
                                    <button className="package-get-started-btn font-majallab text-2xl" onClick={() => openModal('Beginners')}>
                                        STARTED PROJECT
                                    </button>
                                </div>

                                <div className="single-packages-footer flex  w-100 justify-center">
                                    <div >
                                        <h5 className="font-majallab text-xl">Share your idea!</h5>
                                        <p className="text-md text-black"><Link href="tel:(866)-841-7469">(866)-841-7469</Link></p>
                                    </div>
                                    <span className="border-line mx-4"></span>
                                    <div>
                                        <h5 className="font-majallab text-xl">Want to discuss?</h5>
                                        <button className="text-md text-black blink_me" onClick={handleOpenChat}>Live Chat Now...</button>
                                    </div>
                                </div>
                            </div>
                            <div className="single-packages relative">
                                <h4 className="text-4xl text-white font-majallab mb-6 text-center pt-12">Start Up Package</h4>
                                <div className="single-packages-content mb-5 px-10">
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Editing & Proofreading
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Typesetting & Layout Adjustment

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Formatting (for 50+ Platforms)

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Multiple Revisions
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Royalties & Ownership Rights

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Creative Cover Art

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Publishing on Amazon and Kindle (with Optimization)

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        eBook and Paperback Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        5 Paperback Copies
                                    </div>
                                </div>
                                <div className="text-center mb-6">
                                    <button className="package-get-started-btn font-majallab text-2xl" onClick={() => openModal('Beginners')}>
                                        STARTED PROJECT
                                    </button>
                                </div>
                                <div className="single-packages-footer flex  w-100 justify-center">
                                    <div >
                                        <h5 className="font-majallab text-xl">Share your idea!</h5>
                                        <p className="text-md text-black"><Link href="tel:(866)-841-7469">(866)-841-7469</Link></p>
                                    </div>
                                    <span className="border-line mx-4"></span>
                                    <div>
                                        <h5 className="font-majallab text-xl">Want to discuss?</h5>
                                        <button className="text-md text-black blink_me" onClick={handleOpenChat}>Live Chat Now...</button>
                                    </div>
                                </div>
                            </div>
                            <div className="single-packages relative">
                                <Image src={"/images/badge.png"} className="package-badge" width={80} height={80}></Image>
                                <h4 className="text-4xl text-white font-majallab mb-6 text-center pt-12">Standard Package</h4>
                                <div className="single-packages-content mb-5 px-10">
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Editing & Proofreading
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Typesetting & Layout Adjustment
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Formatting (for 50+ Platforms)

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Multiple Revisions

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Royalties & Ownership Rights

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Creative Cover Art

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Price Encrypted Barcode
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        ISBN (International Standard Book Number)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Publishing on Amazon, Kindle and Barnes & Noble (with Optimization)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        eBook, Paperback & Hardcover Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        10 Paperback Copies
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        2 Hardcover Copies
                                    </div>
                                </div>
                                <div className="text-center mb-6">
                                    <button className="package-get-started-btn font-majallab text-2xl" onClick={() => openModal('Beginners')}>
                                        STARTED PROJECT
                                    </button>
                                </div>

                                <div className="single-packages-footer flex  w-100 justify-center">
                                    <div >
                                        <h5 className="font-majallab text-xl">Share your idea!</h5>
                                        <p className="text-md text-black"><Link href="tel:(866)-841-7469">(866)-841-7469</Link></p>
                                    </div>
                                    <span className="border-line mx-4"></span>
                                    <div>
                                        <h5 className="font-majallab text-xl">Want to discuss?</h5>
                                        <button className="text-md text-black blink_me" onClick={handleOpenChat}>Live Chat Now...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="packages-wrapper flex justify-center gap-12 mt-12">
                            <div className="single-packages relative">
                                <h4 className="text-4xl text-white font-majallab mb-6 text-center pt-12">Expert Package</h4>
                                <div className="single-packages-content mb-5 px-10">
                                    <div className="flex gap-2 mb-5 items-center items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Editing & Proofreading
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Typesetting & Layout Adjustment
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Formatting (for 50+ Platforms)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Multiple Revisions
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Royalties & Ownership Rights
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Creative Cover Art
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Price Encrypted Barcode
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        ISBN (International Standard Book Number)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Publishing on Amazon, Kindle, Barnes & Noble and Google Books (with Optimization)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        4 pages Authors Dynamic Website
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        1 Year Domain & Hosting
                                    </div>
                                </div>
                                <div className="text-center mb-4">
                                    <h5 className="font-majallab text-2xl flex justify-center items-center gap-3">
                                        EASY PAYMENT PLAN
                                        <Image src={"/images/question-icon.png"} className="icon" width={20} height={20}></Image>
                                    </h5>
                                </div>
                                <div className="text-center mb-6">
                                    <button className="package-get-started-btn font-majallab text-2xl" onClick={() => openModal('Beginners')}>
                                        STARTED PROJECT
                                    </button>
                                </div>

                                <div className="single-packages-footer flex  w-100 justify-center">
                                    <div >
                                        <h5 className="font-majallab text-xl">Share your idea!</h5>
                                        <p className="text-md text-black"><Link href="tel:(866)-841-7469">(866)-841-7469</Link></p>
                                    </div>
                                    <span className="border-line mx-4"></span>
                                    <div>
                                        <h5 className="font-majallab text-xl">Want to discuss?</h5>
                                        <button className="text-md text-black blink_me" onClick={handleOpenChat}>Live Chat Now...</button>
                                    </div>
                                </div>
                            </div>
                            <div className="single-packages relative">
                                <Image src={"/images/badge.png"} className="package-badge" width={80} height={80}></Image>
                                <h4 className="text-4xl text-white font-majallab mb-6 text-center pt-12">Premium Package</h4>
                                <div className="single-packages-content mb-5 px-10">
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Editing & Proofreading
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Typesetting & Layout Adjustment

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Formatting (for 50+ Platforms)

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Multiple Revisions
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Royalties & Ownership Rights

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Creative Cover Art

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Price Encrypted Barcode

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        60 - 90 Seconds Video Trailer
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        ISBN (International Standard Book Number)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Publishing on Amazon, Kindle, Barnes & Noble, Google Books and Smashwords (with Optimization)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        4 Pages Authors Dynamic Website
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        1 Years Free Domain and Hosting
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        12 Months Brand Marketing & Advertising (SEO + Google Marketing)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        12 Months Social Media Advertising (Facebook, Instagram & Linkedin)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        eBook, Paperback & Hardcover Format
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        20 Paperback Copies
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        7 Hardcover Copies
                                    </div>
                                </div>
                                <div className="text-center mb-4">
                                    <h5 className="font-majallab text-2xl flex justify-center items-center gap-3">
                                        EASY PAYMENT PLAN
                                        <Image src={"/images/question-icon.png"} className="icon" width={20} height={20}></Image>
                                    </h5>
                                </div>
                                <div className="text-center mb-6">
                                    <button className="package-get-started-btn font-majallab text-2xl" onClick={() => openModal('Beginners')}>
                                        STARTED PROJECT
                                    </button>
                                </div>
                                <div className="single-packages-footer flex  w-100 justify-center">
                                    <div >
                                        <h5 className="font-majallab text-xl">Share your idea!</h5>
                                        <p className="text-md text-black"><Link href="tel:(866)-841-7469">(866)-841-7469</Link></p>
                                    </div>
                                    <span className="border-line mx-4"></span>
                                    <div>
                                        <h5 className="font-majallab text-xl">Want to discuss?</h5>
                                        <button className="text-md text-black blink_me" onClick={handleOpenChat}>Live Chat Now...</button>
                                    </div>
                                </div>
                            </div>
                            <div className="single-packages relative">
                                <h4 className="text-4xl text-white font-majallab mb-6 text-center pt-12">Enterprise Package
                                </h4>
                                <div className="single-packages-content mb-5 px-10">
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Editing & Proofreading
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Typesetting & Layout Adjustment
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Formatting (for 50+ Platforms)

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Multiple Revisions

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        100% Royalties & Ownership Rights

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Creative Cover Art

                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Price Encrypted Barcode
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        ISBN (International Standard Book Number)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Publishing on Amazon, Kindle, Barnes & Noble, Google Books and Smashwords (with Optimization)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        4 Pages Authors Dynamic Website
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        2 Years Free Domain and Hosting
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        60 - 90 Seconds Video Trailer
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        24 Months NYT Bestseller Advance Marketing & Advertising (SEO + Google Marketing)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        24 Months Social Media Advertising (Facebook, Instagram, Twitter, Pinterest, Youtube & Linkedin)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Blogs & Article Postings
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        Press Releases (100+ Platforms)
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        25 Paperback Copies
                                    </div>
                                    <div className="flex gap-2 mb-5 items-center">
                                        <Image src={"/images/check-mark.png"} className="icon" width={13} height={13}></Image>
                                        10 Hardcover Copies
                                    </div>
                                </div>
                                <div className="text-center mb-4">
                                    <h5 className="font-majallab text-2xl flex justify-center items-center gap-3">
                                        EASY PAYMENT PLAN
                                        <Image src={"/images/question-icon.png"} className="icon" width={20} height={20}></Image>
                                    </h5>
                                </div>
                                <div className="text-center mb-6">
                                    <button className="package-get-started-btn font-majallab text-2xl" onClick={() => openModal('Beginners')}>
                                        STARTED PROJECT
                                    </button>
                                </div>

                                <div className="single-packages-footer flex  w-100 justify-center">
                                    <div >
                                        <h5 className="font-majallab text-xl">Share your idea!</h5>
                                        <p className="text-md text-black"><Link href="tel:(866)-841-7469">(866)-841-7469</Link></p>
                                    </div>
                                    <span className="border-line mx-4"></span>
                                    <div>
                                        <h5 className="font-majallab text-xl">Want to discuss?</h5>
                                        <button className="text-md text-black blink_me" onClick={handleOpenChat}>Live Chat Now...</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}