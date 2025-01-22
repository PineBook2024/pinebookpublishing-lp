import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import dynamic from 'next/dynamic';
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
            src: "/brand-img/01.png",
            title: "Anders and Maren Larsen and Descendants' Life Histories and Stories",
            author: 'by: Ronald A Larson',
            url: 'https://a.co/d/1Y5YQs4',
            category: 'Published Books'
        },
        {
            id: 2,
            src: "/brand-img/02.png",
            title: "Facing Challenges: A Warrior's Story of Overcoming ",
            author: 'by: Lesvi Ferrel',
            url: 'https://a.co/d/fyPMmAq',
            category: 'Published Books'
        },
        {
            id: 3,
            src: "/brand-img/03.png",
            title: 'A Day of Play with Foamy and Friends',
            author: 'by: Kristin Kramer',
            url: 'https://a.co/d/b5Xi3E1',
            category: 'Published Books'
        },
        {
            id: 4,
            src: "/brand-img/05.png",
            title: "Ella's Songs",
            author: 'by: David D. Van Fleet',
            url: 'https://a.co/d/7mlkkL9',
            category: 'Published Books'
        },
        {
            id: 5,
            src: "/brand-img/06.png",
            title: 'Cataclysm: The Rise of Teatrie Part 2',
            author: 'by: K. C. Climer',
            url: 'https://a.co/d/1WnuVhJ',
            category: 'Published Books'
        },
        {
            id: 6,
            src: "/brand-img/07.png",
            title: 'Healing In Africa: Exploring Health and Wellness Across the Continent',
            author: 'by: Christian Ehiobuche',
            url: 'https://a.co/d/enWp3KC',
            category: 'Published Books'

        },
        {
            id: 7,
            src: "/brand-img/08.png",
            title: 'Shadows of Valor: Navigating Imposter Syndrome While Serving in the U.S. Military',
            author: 'by: Dr. Joshan A. Flowers, DSL',
            url: 'https://a.co/d/c7ux0mD',
            category: 'Published Books'
        },
        {
            id: 8,
            src: "/brand-img/10.png",
            title: 'My Journey : Vol 1',
            author: 'by: John M Suits',
            url: 'https://a.co/d/9KUT5WH',
            category: 'Published Books'
        },
        // {
        //     id: 9,
        //     src: "/brand-img/11.png",
        //     title: 'Love and Laughter',
        //     author: 'by: Lesvi Ferrel',
        //     logo1: '/brand-img/Amazon Icon.png',
        //     logo2: '/brand-img/Barnes Noble Icon.png',
        //     category: 'Published Books'
        // },
        {
            id: 10,
            src: "/brand-img/12.png",
            title: "A Heart's Desire",
            author: 'by: Queen Starasia',
            url: 'https://a.co/d/eRFpsZR',
            category: 'Published Books'
        },
        {
            id: 11,
            src: "/brand-img/13.png",
            title: 'Genesis ',
            author: 'by:Max O. Miller',
            url: 'https://a.co/d/jhbP3PW',
            category: 'Published Books'
        },
        {
            id: 12,
            src: "/brand-img/14.png",
            title: 'The Well of Hope: Bloodlines',
            author: 'by: Angel Mercado',
            url: 'https://a.co/d/8H81GS7',
            category: 'Published Books'
        },
        {
            id: 13,
            src: "/brand-img/15.png",
            title: '3 Naughty Monkeys & the Christmas Disaster',
            author: 'by: Mary Gunn',
            url: 'https://a.co/d/4JOMf0m',
            category: 'Published Books'
        },
        {
            id: 14,
            src: "/brand-img/16.png",
            title: "Rising 2 B'come: Character building journal",
            author: 'by: Stacey L Joiner',
            url: 'https://a.co/d/6KD7e6K',
            category: 'Published Books'

        },
        {
            id: 15,
            src: "/brand-img/18.png",
            title: 'Sky Cats',
            author: 'by: Mary Gunn',
            url: 'https://www.amazon.com/dp/B0C5M1N2O3',
            category: 'Published Books'
        },
        {
            id: 16,
            src: "/brand-img/19.png",
            title: 'I Am a Boy',
            author: 'by: Pamela Avis Harry',
            url: 'https://a.co/d/dCOUypn',
            category: 'Publish'
        },
        {
            id: 17,
            src: "/brand-img/04.png",
            title: 'Behind Closed Doors: Male Experience of Domestic Violence in the Age of Denial',
            author: 'by: Che A. Abongwa',
            url: '#',
            category: 'Coming Soon',
        },
        {
            id: 18,
            src: "/brand-img/09.png",
            title: 'Gathering: A Collection of Poetry',
            author: 'by: Louis Crump Smithwick',
            url: '#',
            category: 'Coming Soon'
        },
        {
            id: 19,
            src: "/brand-img/17.png",
            title: 'Steven The Railroad Teen',
            author: 'by: Evan M. Franzen',
            url: '#',
            category: 'Coming Soon'
        },
    ];

    const filteredBooks = books.filter(book => book.category === activeCategory);

    return (
        <>
            <div className="w-full max-w-6xl mx-auto py-10 relative home-book-cover">
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
                    loop={true}
                    onSwiper={(swiper) => (swiperRef2.current = swiper)}
                    className="mySwiper"
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
