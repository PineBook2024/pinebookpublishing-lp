import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import {
    Autoplay,
    Pagination,
    Navigation,
    EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import 'glightbox/dist/css/glightbox.min.css';

const GLightbox = dynamic(
    () => import('glightbox').then((glightboxModule) => glightboxModule.default),
    { ssr: false }
);

export default function HomeBookSlider() {
    const swiperRef2 = useRef(null);
    const lightboxRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState('Published Books');

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (lightboxRef.current) {
                lightboxRef.current.destroy();
            }
            import('glightbox').then((GLightboxModule) => {
                const GLightbox = GLightboxModule.default;
                lightboxRef.current = GLightbox({
                    selector: '.glightbox5'
                });
            });
        }

        return () => {
            if (lightboxRef.current) {
                lightboxRef.current.destroy();
            }
        };
    }, []);


    const books = [
        {
            id: 1,
            src: "/brand-img/coming-soon-book5.png",
            title: 'The Truth About Giving in the Church',
            author: 'by: Eric Mills',
            category: 'Coming Soon'
        },
        {
            id: 2,
            src: "/brand-img/coming-soon-book6.png",
            title: 'Mystforgotten Chronicles - Hopeful Purpose',
            author: 'by: Hayden M Rusk',
            category: 'Coming Soon'
        },
        {
            id: 3,
            src: "/brand-img/Published-Books-Section/A. David.png",
            title: 'The Lost Gospel of Rabbits',
            author: 'by: A. David',
            category: 'Published Books',
            url: 'https://a.co/d/0XWuJ4u'
        },
        {
            id: 4,
            src: "/brand-img/Published-Books-Section/Ashlee Griffin.png",
            title: 'Fate: The Alpha King and His Unexpected Mate',
            author: 'by: Ashlee Griffin',
            category: 'Published Books',
            url: 'https://a.co/d/9m6GYKD'
        },
        {
            id: 5,
            src: "/brand-img/Published-Books-Section/C.B. Ryan.png",
            title: 'I am a Werewolf Hunter',
            author: 'by: C.B. Ryan',
            category: 'Published Books',
            url: 'https://a.co/d/bBHqxNO'
        },
        {
            id: 6,
            src: "/brand-img/Published-Books-Section/Carla Fendricks.png",
            title: 'Shattered Without A Break',
            author: 'by: Carla Fendricks',
            category: 'Published Books',
            url: 'https://a.co/d/4fidrBJ'
        },
        {
            id: 7,
            src: "/brand-img/Published-Books-Section/Che A. Abongwa.png",
            title: 'Behind Closed Doors: Male Experience of Domestic Violence in the Age of Denial ',
            author: 'by: Che A. Abongwa',
            category: 'Published Books',
            url: 'https://a.co/d/1nsoajL'
        },
        {
            id: 8,
            src: "/brand-img/Published-Books-Section/Chhavyvann So.png",
            title: 'Silent Fear: The True Story of my Life ',
            author: 'by: Chhavyvann So',
            category: 'Published Books',
            url: 'https://a.co/d/0fhsaTT'
        },
        {
            id: 9,
            src: "/brand-img/Published-Books-Section/Christopher Allen.png",
            title: 'Vetting The Book of Enoch For The Last Days',
            author: 'by: Christopher Allen',
            category: 'Published Books',
            url: 'https://a.co/d/hPZVuF3'
        },
        {
            id: 10,
            src: "/brand-img/Published-Books-Section/D.T. Weiss.png",
            title: 'ANOMALOUS: Exploring UFOs, Non-Human-Intelligence and Related Phenomena',
            author: 'by: D.T. Weiss',
            category: 'Published Books',
            url: 'https://a.co/d/d0zNDDB'
        },
        {
            id: 11,
            src: "/brand-img/Published-Books-Section/David Wolfson.png",
            title: 'Financial Syndicate: Some Job Opportunities Go Too Far',
            author: 'by: David Wolfson',
            category: 'Published Books',
            url: 'https://a.co/d/0XWuJ4u'
        },
        {
            id: 12,
            src: "/brand-img/Published-Books-Section/Dr. Joshan A. Flowers, DSL.png",
            title: 'Imposter Syndrome: Silencing the Self-Doubt Within the Workplace',
            author: 'by: Dr. Joshan A. Flowers, DSL',
            category: 'Published Books',
            url: 'https://a.co/d/9OBXNZs'
        },
        {
            id: 13,
            src: "/brand-img/Published-Books-Section/Edward Agbai.png",
            title: 'The 2023 Elections in Nigeria: Actors, Intrigues, and Winners',
            author: 'by: Edward Agbai',
            category: 'Published Books',
            url: 'https://a.co/d/8W8RCsb'
        },
        {
            id: 14,
            src: "/brand-img/Published-Books-Section/Evan M Franzen.png",
            title: 'Steven the Railroad Teen',
            author: 'by: Edward Agbai',
            category: 'Published Books',
            url: 'https://a.co/d/hLhYHea'
        },
        {
            id: 15,
            src: "/brand-img/Published-Books-Section/Frank Willard Morgan.png",
            title: "Jesus in Action at His Feasts: How John's Entire Gospel Builds on Jewish Festal Scriptures",
            author: 'by: Frank Willard Morgan',
            category: 'Published Books',
            url: 'https://a.co/d/9RWZI95'
        },
        {
            id: 16,
            src: "/brand-img/Published-Books-Section/J. Grace.png",
            title: "Are You Ready For Us?",
            author: 'by: J. Grace',
            category: 'Published Books',
            url: 'https://a.co/d/6Y9etUb'
        },
        {
            id: 17,
            src: "/brand-img/Published-Books-Section/J. L. Schaffer.png",
            title: "Caught in the Horizon",
            author: 'by: J. L. Schaffer',
            category: 'Published Books',
            url: 'https://a.co/d/3fKMB5m'
        },
        // {
        //     id: 18,
        //     src: "/brand-img/Published-Books-Section/J. L. Schaffer.png",
        //     title: "Caught in the Horizon",
        //     author: 'by: J. L. Schaffer',
        //     category: 'Published Books',
        //     url: 'https://a.co/d/3fKMB5m'
        // },
        {
            id: 19,
            src: "/brand-img/Published-Books-Section/J.E. Grace.png",
            title: "Mary and Her Little Lamby (Story-Song Series)",
            author: 'by: J.E. Grace',
            category: 'Published Books',
            url: 'https://a.co/d/bVRxqZd'
        },
        {
            id: 20,
            src: "/brand-img/Published-Books-Section/Jeff Ramin.png",
            title: "What More?",
            author: 'by: Jeff Ramin',
            category: 'Published Books',
            url: 'https://a.co/d/du0jfrb'
        },
        {
            id: 21,
            src: "/brand-img/Published-Books-Section/K. C. Climer  pt 1.png",
            title: "Cataclysm: The Rise of Teatrie Part 1",
            author: 'by: K. C. Climer ',
            category: 'Published Books',
            url: 'https://a.co/d/b8Rt1SZ'
        },
        {
            id: 22,
            src: "/brand-img/Published-Books-Section/Katie Loftis  -1.png",
            title: "Thorns are more Deadly",
            author: 'by: Katie Loftis',
            category: 'Published Books',
            url: 'https://a.co/d/7Ny4KeH'
        },
        {
            id: 23,
            src: "/brand-img/Published-Books-Section/Katie Loftis.png",
            title: "Dirt is Forever Deadly",
            author: 'by: Katie Loftis',
            category: 'Published Books',
            url: 'https://a.co/d/icKCEyF'
        },
        {
            id: 24,
            src: "/brand-img/Published-Books-Section/Larry NiMarLee.png",
            title: "The Man With The Knowledge Of Eleven-Eleven",
            author: 'by: Larry NiMarLee',
            category: 'Published Books',
            url: 'https://a.co/d/4mR2Fqx'
        },
        {
            id: 25,
            src: "/brand-img/Published-Books-Section/Leslie Vick.png",
            title: "Finding Our Way",
            author: 'by: Leslie Vick ',
            category: 'Published Books',
            url: 'https://a.co/d/17IqqNj'
        },
        {
            id: 26,
            src: "/brand-img/Published-Books-Section/Lesvi Ferrel -2.png",
            title: "Love and Laughter: Stories Between Abuelita and Her Little Grandchildren",
            author: 'by: Lesvi Ferrel',
            category: 'Published Books',
            url: 'https://a.co/d/2o8sa4k'
        },
        {
            id: 27,
            src: "/brand-img/Published-Books-Section/Lesvi Ferrel.png",
            title: "Free Yourself From Pain: Therapeutic Massages for Fibromyalgia, Neuropathy, and Body Reduction",
            author: 'by: Lesvi Ferrel',
            category: 'Published Books',
            url: 'https://a.co/d/1Tbi2T6'
        },
        {
            id: 28,
            src: "/brand-img/Published-Books-Section/Louis Crump Smithwick.png",
            title: "Gathering: A Collection of Poetry",
            author: 'by: Louis Crump Smithwick',
            category: 'Published Books',
            url: 'https://a.co/d/3w5Jxy7'
        },
        {
            id: 29,
            src: "/brand-img/Published-Books-Section/Megan Siebenlist.png",
            title: "Postpartum & Me",
            author: 'by: Megan Siebenlist',
            category: 'Published Books',
            url: 'https://a.co/d/aGD3kw4'
        },
        {
            id: 30,
            src: "/brand-img/Published-Books-Section/Michael Garrell.png",
            title: "All Blondes Live In Manhattan",
            author: 'by: Michael Garrell',
            category: 'Published Books',
            url: 'https://www.barnesandnoble.com/w/all-blondes-live-in-manhattan-michael-garrell/1145938971'
        },
        {
            id: 31,
            src: "/brand-img/Published-Books-Section/Michele Angelique Vann.png",
            title: "We Are Going to Turn This Thing Around: How to Turn Trauma into Triumph",
            author: 'by: Michele Angelique Vann',
            category: 'Published Books',
            url: 'https://a.co/d/8AMmMQT'
        },
        {
            id: 32,
            src: "/brand-img/Published-Books-Section/Neil Dutta.png",
            title: "Unravelling the World: Adventures Across Continents",
            author: 'by: Neil Dutta',
            category: 'Published Books',
            url: 'https://a.co/d/c8rkJFV'
        },
        {
            id: 33,
            src: "/brand-img/Published-Books-Section/Pamela Avis Harry.png",
            title: "I Am a Girl",
            author: 'by: Pamela Avis Harry',
            category: 'Published Books',
            url: 'https://a.co/d/cx73np1'
        },
        {
            id: 34,
            src: "/brand-img/Published-Books-Section/Ready Writer.png",
            title: "There's No Middle Ground, You Will Either Run to, or Run from This Book",
            author: 'by: Ready Writer',
            category: 'Published Books',
            url: 'https://a.co/d/15EsENy'
        },
        {
            id: 35,
            src: "/brand-img/Published-Books-Section/Reginald Wade.png",
            title: "An Uncivilized State",
            author: 'by: Reginald Wade',
            category: 'Published Books',
            url: 'https://a.co/d/109dGId'
        },
        {
            id: 36,
            src: "/brand-img/Published-Books-Section/Rob Sturgeon.png",
            title: "A Tale Told by a Timber Ghost-Spirit ",
            author: 'by: Rob Sturgeon',
            category: 'Published Books',
            url: 'https://a.co/d/eNzTRtZ'
        },
        {
            id: 37,
            src: "/brand-img/Published-Books-Section/Robert A Eckess.png",
            title: "Stewart, BC History",
            author: 'by: Robert A Eckess',
            category: 'Published Books',
            url: 'https://a.co/d/8MueLIB'
        },
        {
            id: 38,
            src: "/brand-img/Published-Books-Section/Rosetta Khalideen.png",
            title: "Time and the River",
            author: 'by: Rosetta Khalideen',
            category: 'Published Books',
            url: 'https://a.co/d/4uN6KrO'
        },
        {
            id: 39,
            src: "/brand-img/Published-Books-Section/Scott Andrews -2.png",
            title: "Rowen's Secrets: The Quest for the Templar Reliquaries - Part Two",
            author: 'by: Scott Andrews ',
            category: 'Published Books',
            url: 'https://a.co/d/eqnK9Yr'
        },
        {
            id: 40,
            src: "/brand-img/Published-Books-Section/Scott Andrews.png",
            title: "The Quest for the Templar Reliquaries: Rowen’s Secret - Part One",
            author: 'by: Scott Andrews ',
            category: 'Published Books',
            url: 'https://a.co/d/caE3lye'
        },
        {
            id: 41,
            src: "/brand-img/Published-Books-Section/Sherrie Campbell.png",
            title: "The Kingdom",
            author: 'by: Sherrie Campbell',
            category: 'Published Books',
            url: 'https://a.co/d/20fxiNk'
        },
        {
            id: 42,
            src: "/brand-img/Published-Books-Section/Terry-Ann Reid.png",
            title: "My Phonics Book: With Simple Words & Sentences",
            author: 'by: Terry-Ann Reid ',
            category: 'Published Books',
            url: 'https://a.co/d/7dBVBkz'
        },
        {
            id: 43,
            src: "/brand-img/Published-Books-Section/Tonya Richardson.png",
            title: "My Life in Poetry",
            author: 'by: Tonya Richardson',
            category: 'Published Books',
            url: 'https://a.co/d/8pwWdLC'
        },
        {
            id: 44,
            src: "/brand-img/Published-Books-Section/Vikki LeBeau.png",
            title: "Cancer Deception: Lean into the Message Behind the Truth",
            author: 'by: Vikki LeBeau',
            category: 'Published Books',
            url: 'https://www.amazon.com/dp/B0C3G6H7I8'
        },
        {
            id: 45,
            src: "/brand-img/Published-Books-Section/Zach Berger.png",
            title: "The Cocktail Playbook: 32 Game-Changing Recipes",
            author: 'by: Zach Berger',
            category: 'Published Books',
            url: 'https://www.amazon.com/dp/B0C1J2K3L4'
        },
        {
            id: 46,
            src: "/brand-img/Published-Books-Section/Zulfi Ahmed.png",
            title: "Why Quit?: The importance of commitment and follow through",
            author: 'by: Zulfi Ahmed',
            category: 'Published Books',
            url: 'https://a.co/d/0QRWazP'
        },
        {
            id: 47,
            src: "/brand-img/Published-Books-Section/Shiela Orsot.png",
            title: "JujuBean Adventures: OooBoys Burgers",
            author: 'by: Shiela Orsot',
            category: 'Published Books',
            url: 'https://a.co/d/6eOGrwT'
        },
        {
            id: 48,
            src: "/brand-img/Published-Books-Section/World Association for Academic Doctors.png",
            title: "Global Terrorism: Quest for Social and Economic Justice",
            author: 'by: World Association for Academic Doctors ',
            category: 'Published Books',
            url: 'https://a.co/d/40DWfAu'
        },
        {
            id: 49,
            src: "/brand-img/Published-Books-Section/David Van FleetNot.png",
            title: "Ella's Songs",
            author: 'by: David D. Van Fleet',
            category: 'Published Books',
            url: 'https://a.co/d/b3q8TeH'
        },
        {
            id: 50,
            src: "/brand-img/Published-Books-Section/K. C. Climer  pt 2Not.png",
            title: "Cataclysm: The Rise of Teatrie Part 2",
            author: 'by: K. C. Climer',
            category: 'Published Books',
            url: 'https://a.co/d/aZVedtv'
        },
        {
            id: 51,
            src: "/brand-img/Published-Books-Section/Angel Mercado.png",
            title: "The Well of Hope: Bloodlines",
            author: 'by: Angel Mercado',
            category: 'Published Books',
            url: 'https://a.co/d/4QTnH26'
        },
        {
            id: 52,
            src: "/brand-img/Published-Books-Section/56.png",
            title: "Facing Challenges: A Warrior's Story of Overcoming",
            author: 'by: Lesvi Ferrel',
            category: 'Published Books',
            url: 'https://a.co/d/aQtOC47'
        },
        {
            id: 53,
            src: "/brand-img/Published-Books-Section/60.png",
            title: "I Am a Boy",
            author: 'by: Pamela Avis Harry',
            category: 'Published Books',
            url: 'https://a.co/d/iwntism'
        },
       
    ];

    const filteredBooks = books.filter(book => book.category === activeCategory);

    return (
        <>
            <div className="w-full max-w-6xl mx-auto py-8 relative home-book-cover">
                {/* Custom Previous Button */}
                <div
                    className="absolute top-1/2 -left-10 transform -translate-y-1/2 bk-sil2 portfoilio-slider5-icon prev cursor-pointer"
                    onClick={() => swiperRef2.current?.slidePrev()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color="#000" width={18} />
                </div>
                <div className="flex space-x-4 justify-center mb-12">
                    {['Published Books', 'Coming Soon'].map(category => (
                        <button
                            key={category}
                            className={`px-4 py-2 font-poppins ${activeCategory === category ? 'active' : 'in-active'}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                {/* Swiper Slider */}
                <Swiper
                    spaceBetween={30}
                    slidesPerView={4}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    onSwiper={(swiper) => (swiperRef2.current = swiper)}
                    className="mySwiper"
                    modules={[Navigation, Autoplay, Pagination]}
                    breakpoints={{
                        "@0.00": {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        "@1.00": {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                    }}
                >

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
                        {filteredBooks.map(book => (
                            <SwiperSlide key={book.id}>
                                {book.url ? (
                                    <Link href={book.url} className="relative h-full flex flex-col gap-6 books" target="_blank">
                                        <div>
                                            <img src={book.src} alt={`Book ${book.id}`} className="h-70 w-auto object-contain w-100" />
                                        </div>
                                        <div className="content">
                                            <h4 className="text-size-custom">{book.title}</h4>
                                            <h4>{book.author}</h4>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="relative h-full flex flex-col gap-6 books">
                                        <div>
                                            <img src={book.src} alt={`Book ${book.id}`} className="h-70 w-auto object-contain w-100" />
                                        </div>
                                        <div className="content">
                                            <h4 className="text-size-custom">{book.title}</h4>
                                            <h4>{book.author}</h4>
                                        </div>
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </div>
                    {/* {ImageSlides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            {slide.url ? (
                                <Link href={slide.url} className="relative h-full flex flex-col gap-6" target="_blank">
                                    <div>
                                        <img
                                            src={slide.src}
                                            alt={`Slide ${slide.id}`}
                                            className="h-70 w-auto object-contain w-100"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-size-custom">{slide.title}</h4>
                                        <h4>{slide.author}</h4>
                                    </div>
                                </Link>
                            ) : (
                                <div className="relative h-full flex flex-col gap-6">
                                    <div>
                                        <img
                                            src={slide.src}
                                            alt={`Slide ${slide.id}`}
                                            className="h-70 w-auto object-contain w-100"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-size-custom">{slide.title}</h4>
                                        <h4>{slide.author}</h4>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))} */}

                </Swiper>

                {/* Custom Next Button */}
                <div
                    className="absolute top-1/2 -right-10 transform -translate-y-1/2 bk-sil2 portfoilio-slider5-icon next cursor-pointer"
                    onClick={() => swiperRef2.current?.slideNext()}
                >
                    <FontAwesomeIcon icon={faArrowRight} color="#000" width={18} />
                </div>
                <hr className="h-[2px] bg-gray-100 dark:bg-gray-600 mt-10 border-none" />
            </div>
        </>
    );
}
