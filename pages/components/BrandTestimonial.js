import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BrandTestimonial() {

    return (
        <>
            <section className="brand-testimonials-section">
                <div className="max-w-screen-xl mx-auto px-4 my-20 relative py-22">
                    <div className="text-center mb-6">
                        <h2 className="font-majallab text-5xl text-black">TESTIMONIALS</h2>
                    </div>
                    <div className="flex justify-center gap-5 flex-col md:flex-row">
                        <div className="brand-testimonials-card relative">
                            <Link href={"https://www.trustpilot.com/reviews/65e634c30515c28c7a696898"} target="_blank">
                                <div className="flex justify-between items-center mb-5">
                                    <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faLocation} color="#2c9384" className="me-2" />
                                        <span>US</span>
                                    </div>
                                </div>
                                <h2 className="font-majallab text-3xl text-black">They care about your work and your dream.</h2>
                                <p className="font-poppins mb-5">Finally a publisher that cares about your work instead of how much money you have. This has to be one of the smoothest processes in my life. They were very attentive to my vision and treated my work with care. I’ll be using them again they earned every cent.</p>
                                <span className="absolute bottom-0 mb-2">Angel Raices, Mar 4, 2024</span>
                            </Link>
                        </div>
                        <div className="brand-testimonials-card relative">
                            <Link href={"https://www.trustpilot.com/reviews/65cfa55b11cc649a184c90bb"} target="_blank">
                                <div className="flex justify-between items-center mb-5">
                                    <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faLocation} color="#2c9384" className="me-2" />
                                        <span>US</span>
                                    </div>
                                </div>
                                <h2 className="font-majallab text-3xl text-black">Good Work on Publishing</h2>
                                <p className="font-poppins mb-5">Pine Book Writing did a good job on printing and delivering copies of my book of poetry written in Russian. They did it expeditiously and in promised time, actually, a bit faster. The quality of the paper used and printing was quite adequate. Ryan Peters, the publication manager, was very approachable, friendly, and quick to reply to my requests and questions. Dealing with Damon, the owner, was a good experience as well.</p>
                                <span className="absolute bottom-0 mb-2">Fima, Feb 16, 2024</span>
                            </Link>
                        </div>
                        <div className="brand-testimonials-card relative">
                            <Link href={"https://www.trustpilot.com/reviews/65b05e047f36b28f2c54c185"} target="_blank">
                                <div className="flex justify-between items-center mb-5">
                                    <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faLocation} color="#2c9384" className="me-2" />
                                        <span>US</span>
                                    </div>
                                </div>
                                <h2 className="font-majallab text-3xl text-black">Pine Book Writers A+</h2>
                                <p className="font-poppins mb-5">Steve, Ryan & the team has been helpful getting my book together. The whole team is easy to work with. Steve is great, at explaining the packages and the steps moving forward, so you can accomplish your goal. They’re also very responsive with any questions you may have. I can definitely see myself having a long time partnership with Pine. I spoke with the owner Damon, very nice guy, he has passion for this line of work. If you’re looking for a company that can help with self publishing , marketing & promotion. Pine Book Writers is definitely the company you want & need.</p>
                                <span className="absolute bottom-0 mb-2">Re-G Wade, Jan 23, 2024</span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-center gap-5 mt-5 flex-col md:flex-row">
                        <div className="brand-testimonials-card relative">
                            <Link href={"https://www.trustpilot.com/users/64ed33d046ee6200126f1c6c"} target="_blank">
                                <div className="flex justify-between items-center mb-5">
                                    <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faLocation} color="#2c9384" className="me-2" />
                                        <span>US</span>
                                    </div>
                                </div>
                                <h2 className="font-majallab text-3xl text-black">Pine books and their associates are…</h2>
                                <p className="font-poppins mb-5">Pine books and their associates are excellent. Everyone is helpful and care about you, your ideas, and how hard you've worked with your manuscript. Steve, Lia, Ryan, and David go beyond their job. They deserve a raise. I recommend Pine books for all your writing needs.</p>
                                <span className="absolute bottom-0 mb-2">Katie Loftis, Dec 7, 2023</span>
                            </Link>
                        </div>
                        <div className="brand-testimonials-card relative">
                            <Link href={"https://www.trustpilot.com/users/655d16952309f20012b30090"} target="_blank">
                                <div className="flex justify-between items-center mb-5">
                                    <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faLocation} color="#2c9384" className="me-2" />
                                        <span>US</span>
                                    </div>
                                </div>
                                <h2 className="font-majallab text-3xl text-black">Awesome Publishing Company</h2>
                                <p className="font-poppins mb-5">The team at Pine Book Writing are the best!!!! They were so professional and friendly throughout the entire process. I "LOVE" the outcome of my book and I look forward to working with them again on my next project.</p>
                                <span className="absolute bottom-0 mb-2">Stacey, Nov 21, 2023</span>
                            </Link>
                        </div>
                        <div className="brand-testimonials-card relative">
                            <Link href={"https://www.trustpilot.com/reviews/65046b6a51ad4908c7039d10"} target="_blank">
                                <div className="flex justify-between items-center mb-5">
                                    <Image src={"/brand-img/stars.png"} width={140} height={100}></Image>
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faLocation} color="#2c9384" className="me-2" />
                                        <span>CA</span>
                                    </div>
                                </div>
                                <h2 className="font-majallab text-3xl text-black">
                                    Timely review of the proof reading process</h2>
                                <p className="font-poppins mb-5">I got timely feedback on the proof reading process. The project was on schedule and I got useful tips on how to improve the overall quality of my writing</p>
                                <span className="absolute bottom-0 mb-2">Edward Agbai, Sep 15, 2023</span>
                            </Link>
                        </div>
                    </div>
                    <p className="font-majallab mb-2 text-center mt-8 text-3xl">Rated 4.2 / 5 Based on 9 Reviews. Showing our latest reviews.</p>
                </div>
            </section>
        </>
    );
}