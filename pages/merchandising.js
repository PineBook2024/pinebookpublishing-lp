import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import BrandFooter from "./components/BrandFooter";
import BrandNavbar from "./components/BrandNavbar";
import BrandBannerLogo from "./components/BrandBannerLogo";
import BrandChooseUs from "./components/BrandChooseUs";
import BrandPrimaryHeader from "./components/BrandPrimaryHeader";
import BrandProcess from "./components/BrandProcess";
import BrandAudioPlayer from "./components/BrandAudioPlayer";
import BrandTopBar from "./components/BrandTopBar";
import Merchand from "./components/Merchand";
import BrandCTA from "./components/BrandCTA";

export default function BookFormatting() {
    const [openFAQ, setOpenFAQ] = useState(0);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };
    const handleOpenChat = () => {
        window.zE && window.zE('webWidget', 'open');
    };

    const faqData = [
        { question: "What is book formatting and why is it important?", answer: "Book formatting is the method of converting your manuscript into a fascinating and readable book. We work closely on all aspects, like font styling, chapter layouts, and line spacing. A well-formatted book looks professional and takes the reader to its last page." },
        { question: "How long does the book formatting process take?", answer: "The exact duration of the book formatting completely depends on your book's length, complexity, and other preferences. However, it usually takes anywhere from 4 to 7 working days. We always strive to deliver your project within the promised timeline." },
        { question: "How much does e-book and print book formatting cost?", answer: "The pricing of book formatting completely depends on your specific needs and requirements. We consider multiple factors like book length, genre, complexity, as well as the desired timeline to decide the exact cost. However, we offer transparent yet competitive pricing to cater to the formatting needs of every level." },
        { question: "Do you offer book formatting software or templates?", answer: "No, we do not offer any book formatting software. However, our team of experts leverages advanced tools to achieve top-notch outcomes. We also do not provide any book formatting templates, as every book has different attributes and requires a unique formatting method." },
        { question: "Why do I need to have my book professionally formatted?", answer: "Your book's story might be fascinating, but nobody would want to read it if it is represented poorly. Book formatting is a complete skill required to set a book right according to the standard formatting guidelines, make your book readable and look professional, and get publication success on different popular platforms." },
        { question: "Can you help with book cover design in addition to formatting?", answer: "Absolutely! As an expert book publishing company, we work on various aspects that come under the publishing process. We have a dedicated team of book cover designers onboard who can craft stunning book covers that can turn your audience's head within a second." }
    ];

    return (
        <>
            <Head>
                <title>Custom Merchandises | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Elevate your brand with bespoke merchandise! Stand out with personalized print-on-demand accessories. Boost visibility and style effortlessly. Explore now!"
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <BrandTopBar />
            <BrandNavbar />
            <BrandPrimaryHeader
                subtitle=""
                title="Custom Merchandises"
                desc="Want to improve your product visibility? Our personalized print-on-demand accessories can help you create a unique style for your marketing."
            />
            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-10">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/merchandise-img-1.png"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h3 className="font-poppins text-xl md:text-xl uppercase font-bold">
                            APPARELS
                        </h3>
                        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-green-700	">Wear Your Style</h2>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">
                            Printed apparel is among one of the most popular categories of promotional, branded items. Style your brand's appearance with personalized T-shirts, caps, and hoodies.
                        </p>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">Pine Digital Hub specializes in personalized apparel that tells your story. Let our skilled team transform your logo or design into high-quality shirts, hoodies, and caps. From comfortable everyday wear to premium brands, we craft garments you'll be proud to share, sell, or wear. Don't have a design? Our expert graphic designers are here to create a unique look for you.</p>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">Confused about your design? Consult our expert designers at Pine Digital Hub. We're dedicated to making your team look exceptional, ensuring peak performance.</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-screen-xl overflow-hidden">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h3 className="font-poppins text-xl md:text-xl uppercase font-bold">
                            CUPS & MUGS
                        </h3>
                        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-green-700">Recall with Every Sip
                        </h2>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">
                            At Pine Digital Hub, we offer a wide range of customized mugs, flask bottles, and tumblers that are sure to meet your every need.
                        </p>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">From personalized ceramic mugs adorned with print-on-demand designs to sleek and durable stainless steel flask bottles that keep your beverages hot or cold for hours, we have the perfect option for every occasion. Our products are crafted with the highest quality materials, ensuring both durability and style. With a wide range of sizes and colors, you can find the perfect product to match your style.</p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/merchandise-img-2.png"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                </div>
            </div>
            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-10">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/merchandise-img-3.png"} width={700} height={400}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h3 className="font-poppins text-xl md:text-xl uppercase font-bold">
                            BANNERS
                        </h3>
                        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-green-700	">Capture Immediate Attention</h2>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">
                            Are you planning to stand out from your competitors and boost visibility?
                        </p>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">The perfect personalized banner can captivate the audience's attention and give your brand a powerful visual voice. At Pine Digital Hub, we specialize in creating signboards, wall banners, and standees specifically tailored to showcase your brand's identity. With our array of high-quality, full-colour designs, your personalized banner will effectively convey your product/service offering and help you stand out in high-traffic settings and events.</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-screen-xl overflow-hidden">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h3 className="font-poppins text-xl md:text-2xl uppercase font-bold">
                            PENS
                        </h3>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">
                            A personalized stationery design from Pine Digital Hub can do wonders for your business. With our expertise in creating unique and eye-catching designs, we can help your stationery make a lasting impression on your clients and customers. Whether you're looking for a professional and sophisticated design or something more playful and creative, our team can tailor the design to represent your brand and message perfectly. Stand out from competitors and elevate your business with our custom stationery design services.
                        </p>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">Currently, we are dealing with designing pens, but there is always room to discuss more ideas. So don't hesitate to message us and discuss your ideas.</p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/merchandise-img-4.png"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-10">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/merchandise-img-5.webp"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h3 className="font-poppins text-xl md:text-2xl uppercase font-bold">
                            CALENDERS
                        </h3>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">
                            Enhance your year with a touch of elegance by selecting our custom calendars featuring an array of captivating designs. Whether you desire a calendar for your office, home, or business, it is an essential addition that will elevate your daily routine.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-screen-xl overflow-hidden mb-24">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate" data-aos="fade-right" data-aos-duration="1000">
                        <h3 className="font-poppins text-xl md:text-2xl uppercase font-bold">
                            BOOKSMARKS
                        </h3>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">
                            Adding a bookmark to a novel or notebook is the perfect way to add that final, unique touch to a gift or keepsake. If your business wants to promote an upcoming sale or book release, custom bookmarks can be a highly effective tool to spread the word and generate excitement.
                        </p>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">Currently, we are dealing with designing pens, but there is always room to discuss more ideas. So don't hesitate to message us and discuss your ideas.</p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/merchandise-img-6.webp"} width={700} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                            data-aos="fade-left" data-aos-duration="1000"
                        />
                    </div>
                </div>
            </div>

            <Merchand />
            <BrandCTA
                title="Do You Know?"
                desc="Giving customers a tangible item to keep and use creates a lasting reminder of their experience with your brand. Experts at Pine Digital Hub can further contribute to this experience by delivering your unique brand story with print-on-demand items."
                btntext="Speak to our Consultant"
            />

            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-10">
                <h2 className="font-poppins text-xl md:text-2xl uppercase font-bold text-center">
                    How Do We Get This Done?
                </h2>
                <p className="font-poppins text-xl	pt-3 text-gray-500 text-center mb-14">We have comprehensively designed our work process in easy steps to ensure a smooth customer experience.</p>
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/merchandise-img-7.webp"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"

                        />
                    </div>
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate">
                        <h3 className="font-poppins text-xl md:text-2xl uppercase font-bold">
                            Step 1: Choose Your Merchandise
                        </h3>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">
                            Choose what you need to give away as an accurate resemblance to your brand. It is suggested to scrutinize your target audience and choose a product that captures most of their attention.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-10">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate">
                        <h3 className="font-poppins text-xl md:text-2xl uppercase font-bold">
                            Step 2: Get on Your Creative Hats
                        </h3>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">
                            Once you choose your print-on-demand merchandise, it's time to skyrocket your creativity and develop the design idea you want to imprint. At this stage, you can also engage with our design experts to further polish your ideas.</p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/merchandise-img-8.webp"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                        />
                    </div>
                </div>
            </div>
            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-10">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/merchandise-img-9.webp"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"
                        />
                    </div>
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate">
                        <h3 className="font-poppins text-xl md:text-2xl uppercase font-bold">
                            Step 3: Get Mockups
                        </h3>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">
                            Once you have selected the design, our design team will send you various sample articles to choose from. We believe in delivering products that perfectly define your brand identity and vision.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-10">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate">
                        <h3 className="font-poppins text-xl md:text-2xl uppercase font-bold">
                            Step 4: Making It Better
                        </h3>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">
                            At this stage, our experts welcome constructive criticism and scrutinize how the design could be improved. You are welcome to share your concerns and ideas to improve.</p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/merchandise-img-10.webp"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"

                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-10">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/merchandise-img-11.webp"} width={470} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"

                        />
                    </div>
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate">
                        <h3 className="font-poppins text-xl md:text-2xl uppercase font-bold">
                            Step 5: Printing the Finalized Designs
                        </h3>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">
                            The finalized designs are set to be printed. During this stage, we ensure that all the products are of high quality and deliver top-notch value to the customers.</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-screen-xl overflow-hidden py-10 md:py-10">
                <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row px-10 md:px-0 py-10 md:py-0">
                    <div className="basis-1/2 abt-txt m1-h p1 aos-init aos-animate">
                        <h3 className="font-poppins text-xl md:text-2xl uppercase font-bold">
                            Step 6: Getting Your Ordered Delivered
                        </h3>
                        <p className="font-poppins text-xl	pt-3 text-gray-500">
                            We collaborate with the best delivery services to ensure your order is handled with care and delivered on time.</p>
                    </div>
                    <div className="basis-1/2 abt-pic text-center flex justify-center md:justify-center">
                        <Image src={"/brand-img/merchandise-img-12.png"} width={600} height={300}
                            loading="lazy"
                            alt="about img"
                            className="aos-init aos-animate"

                        />
                    </div>
                </div>
            </div>

            <BrandFooter />
        </>
    );
}
