import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import BrandFooter from "./components/BrandFooter";
import BrandNavbar from "./components/BrandNavbar";
import BrandBannerLogo from "./components/BrandBannerLogo";
import BrandChooseUs from "./components/BrandChooseUs";
import BrandPrimaryHeader from "./components/BrandPrimaryHeader";
import BrandProcess from "./components/BrandProcess";
import BrandAudioPlayer from "./components/BrandAudioPlayer";

export default function BookEditing() {
    const [openFAQ, setOpenFAQ] = useState(0);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqData = [
        { question: "How do I know if my manuscript needs editing?", answer: "How do I know if my manuscript needs editing? It is a fact that each manuscript can be improved through editing. Regardless of whether you are a first-time author or have been writing for years, having someone else look over your work may help catch mistakes, make the text easier to understand, and generally make the book more enjoyable to read." },
        { question: "What are the differences between line editing and developmental editing?", answer: "Line Editing covers precise modifications in every sentence, such as grammar, syntax, and style. It contributes to making the text clear and guarantees the proper flow of the text. On the other hand, developmental editing focuses on the overall framework and organization of events, characters, and sequences. It can be refined and is crucial for fine-tuning the material of your book." },
        { question: "Why is editorial quality so important for books?", answer: "Editorial quality should not be underestimated, as it greatly influences the books and the reading experience of your audience. Thus, improving the appearance of text, its readability, and general level contributes to higher circulation and sales." },
        { question: "Can I speak with my editor?", answer: "Yes you can but it depends on the severity of the project and the availability of the editor." },
        { question: "How long will the editor take to review my manuscript?", answer: "It may take around 1-2 weeks to get you the editorial report but, it also depends on the length and the genre of your book." },
        { question: "Can I see a before and after sample?", answer: "Yes, you can. You can simply ask out consultant to show you the before and after samples and he/she will be more than happy to provide you with that." },
        { question: "Who will be editing my manuscript? And how qualified are they?", answer: "We have a team of qualified professional who will be editing your manuscript. Some of them are either PhD holder and some of them are retired professors." },
        { question: "Is my manuscript secure?", answer: "Yes, Pine Book Publishing respects your manuscript by handling it under high confidentiality. We ensure that we have NDAs with each and every client that engage with us. Any information that you provide will only be accessed by your manuscript editor and the specific project manager working on your order." },
    ];

    return (
        <>
            <Head>
                <title>Book Editing | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Everything about Pine Book Publishing—your partner in crafting, editing, and publishing your story. Experience seamless service from manuscript to bookshelf."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <BrandNavbar />
            <BrandPrimaryHeader
                title="We Fix the Flaws, So You Take Applause!"
                desc="An error in the book could be really distracting for readers to focus. At Pine Book Publishing we identify and correct those mistakes so your readers can enjoy their reading experience. "
            />
            <BrandBannerLogo />
            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-20">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h3 className="font-poppins text-2xl md:text-3xl uppercase">
                            Our Book Editing
                        </h3>
                        <h2 className="font-poppins text-3xl md:text-4xl uppercase font-bold">Services</h2>
                        <p className="font-poppins text-xl text-justify	pt-3">
                            At Pine Book Publishing, we understand how valuable professional editing is. Mistakes and style issues can slip through the cracks, and a skilled editor can catch these, making your work more readable and impactful.
                        </p>
                        <p className="font-poppins text-xl text-justify	pt-3">We at Pine Book Publishing believe that a professional editor can significantly boost an author's chance of success. They help you get positive reviews and increase sales by ensuring your story connects with readers and stands out in the market. An editor turns a good manuscript into a great published book.</p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/Editing.png"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                </div>
                <p className="font-poppins text-xl text-justify	px-10 md:px-0" data-aos="fade-right">
                    Working with a professional editor also gives authors the chance to learn and grow, preparing them for future writing projects. At Pine Book Publishing, we support this learning process, helping authors develop their skills and reach their full potential.
                </p>
            </div>
            {/* <BrandProcess /> */}
            <section className="brand-process  mx-auto relative pt-10 text-center flex justify-center mb-12 overflow-hidden">
                <div className="max-w-screen-xl">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl text-black font-poppins">HOW WE WORK</h3>
                        <h2 className="font-poppins text-3xl md:text-4xl text-black font-bold" data-aos="zoom-out-down">How Your Journey Looks With Us?</h2>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img1.png"} width={700} height={200} className=" pb-10" ></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Consultation:</h2>
                            <p className="para">Once you send us your manuscript, we'll <br></br> get in touch with you to understand your<br></br> editing needs, goals and your vision.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img2.png"} width={700} height={200} className=" pb-10" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Manuscript Review:</h2>
                            <p className="para">Our team will analyze your writing, giving<br></br> you feedback on structure, plot, character<br></br> development, and pacing. We’ll point out what’s <br></br>working and what might need a bit of tweaking. </p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img3.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Editing:</h2>
                            <p className="para">Next, we'll roll up our sleeves and get to<br></br> work. We’ll handle line editing OR copy<br></br> editing to make sure your writing is free of errors.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img4.png"} width={700} height={200} className=" pb-10" ></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Revisions:</h2>
                            <p className="para">Our experts will be ready to make multiple<br></br> revisions based on your feedback,<br></br> ensuring your final copy reflects your<br></br> vision perfectly.</p>
                        </div>
                    </div>

                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-img5.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content text-left">
                            <h2 className="font-poppins text-2xl">Quality Assurance:</h2>
                            <p className="para">Before we wrap things up, our editors will<br></br> do a final quality check to make sure your<br></br> manuscript is completely ready for publication.</p>
                        </div>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-img6.png"} width={700} height={200} className=" pb-10"></Image>
                        <div className="brand-process-content-right text-right">
                            <h2 className="font-poppins text-2xl">Delivery:</h2>
                            <p className="para">Finally, we'll send your edited manuscript <br></br>back to you in your desired format, all set<br></br> and ready for you to share your story with<br></br> the world.</p>
                        </div>
                    </div>
                </div>

                {/* <div className="max-w-screen-xl d-block md:hidden">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl text-black font-poppins">HOW WE WORK</h3>
                        <h2 className="font-poppins text-3xl md:text-4xl text-black " data-aos="zoom-out-down">OUR PROCESS</h2>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-1.webp"} width={700} height={200} className=" pb-10" ></Image>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-2.webp"} width={700} height={200} className=" pb-10" ></Image>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-3.webp"} width={700} height={200} className=" pb-10"></Image>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-4.webp"} width={700} height={200} className=" pb-10" ></Image>
                    </div>

                    <div className="relative" data-aos="fade-left">
                        <Image src={"/brand-img/process-5.webp"} width={700} height={200} className=" pb-10"></Image>
                    </div>
                    <div className="relative" data-aos="fade-right">
                        <Image src={"/brand-img/process-6.webp"} width={700} height={200} className=" pb-10"></Image>
                    </div>
                </div> */}
            </section>
            <section className="overflow-hidden" >
                <div className="brand-choose-us-section ms-auto relative left-0 md:left-52 px-12 md:px-20 mt-20 mb-8 py-10 " >
                    <div className="flex items-center flex-col md:flex-row" data-aos="fade-right" data-aos-delay="0" data-aos-duration="500">
                        <div className="basis-1/3 brand-choose-us-vector">
                            <Image src={"/brand-img/why-choose-us-img.webp"} width={350} height={200} className="brand-choose-us-img"></Image>
                        </div>
                        <div className="basis-1/3 md:ml-20">
                            <h2 className="text-white font-poppins text-3xl md:text-4xl uppercase mt-20 md:mt-0 font-bold" data-aos="zoom-in-left" data-aos-delay="100">Why Choose Us</h2>
                            <p className="text-white mt-2">Our commitment to the client lies in the quality we deliver. By joining hands with Pine Book Publishing, you will have the following: </p>
                            <div className="flex gap-10 mt-6">
                                <ul>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Personalized Approach </li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Expert Guidance </li>
                                    <li className="font-poppins flex items-center gap-3 text-sm"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Quality Assurance </li>
                                </ul>
                                <ul>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Timely Delivery</li>
                                    <li className="font-poppins flex items-center gap-3 text-sm mb-2"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Creative Collaboration</li>
                                    {/* <li className="font-poppins flex items-center gap-3 text-sm"><Image src={"/images/check-mark.png"} className="icon" width={13} height={13} />Pristine Publication</li> */}
                                </ul>
                            </div>
                            <BrandAudioPlayer src="/brand-img/why-choose-us-voice.wav" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="brand-testimonials-section">
                <div className="max-w-screen-xl mx-auto px-4 my-20 relative py-22">
                    <div className="text-center mb-6">
                        <h2 className="font-poppins text-4xl text-black uppercase mb-3 font-bold">Frequently Asked Questions</h2>
                        {/* <h3 className="text-xl text-black font-poppins uppercase font-bold">each Out to Us for Further Assistance.</h3> */}
                    </div>
                    <div className="faq-que">
                        <div className="flex flex-col md:flex-row justify-center gap-4">
                            {Array.from({ length: 2 }).map((_, colIndex) => (
                                <div key={colIndex} className="w-full max-w-screen-sm">
                                    {faqData.slice(colIndex * 4, (colIndex + 1) * 4).map((faq, index) => {
                                        const actualIndex = index + colIndex * 4;
                                        return (
                                            <button
                                                key={actualIndex}
                                                className="w-full border-b-2 border-gray-300 p-6 text-left mt-0 focus:outline-none bg-slate-200 mb-4 rounded-2xl"
                                                onClick={() => toggleFAQ(actualIndex)}
                                            >
                                                <div className={`text-lg font-semibold flex justify-between ${openFAQ === actualIndex ? 'border-b border-gray-300' : 'border-0'}`}>
                                                    {faq.question}
                                                    <div onClick={() => toggleFAQ()}>
                                                        {openFAQ === actualIndex ? (
                                                            <Image src="/brand-img/up-arrow.png" alt="Close" className="brand-faq-icon" width={50} height={20} />
                                                        ) : (
                                                            <Image src="/brand-img/down-arrow.png" alt="Open" className="brand-faq-icon" width={50} height={20} />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={`mt-3  text-gray-700 ${openFAQ === actualIndex ? 'faq-content-open' : 'faq-content-close'}`}>
                                                    {faq.answer}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <BrandFooter />
        </>
    );
}
