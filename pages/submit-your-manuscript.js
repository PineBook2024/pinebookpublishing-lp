"use client"
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Marquee from "react-fast-marquee";
import { Fragment, useRef, useState, useEffect } from "react";
import CountUp from "react-countup";
import BrandTestimonial from "/components/BrandTestimonial";
import BrandFooterBook from "../components/BrandFooterBook";
import HeroFormBookOffer, { countryCodes as projectCountryCodes } from "../components/HerformBookOffer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter, faCheckCircle, faYoutube, faPhone, faEnvelope, faLocationArrow, faLocation, faMapLocation, faThreads } from "@fortawesome/free-solid-svg-icons";
import Story from "/components/Story";
import PortfolioSlider3LP from "/components/PortfolioSlider3LP";
import PortfolioSlider2LP from "/components/PortfolioSlider2LP";
import { faArrowRight, faArrowLeft, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
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
import GoogleTranslateWidget from "./components/GoogleTranslateWidget";
import LanguageSelectorDropdown from "./components/LanguageSelectorDropdown";

export default function HomePage() {
    const handleOpenChat = () => {
        window.zE && window.zE('webWidget', 'open');
    };

    const counterRef = useRef(null);
    const contentRef = useRef(null);
    const swiperRef = useRef();
    const swiperRef3 = useRef();
    const [startCounter, setStartCounter] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Fiction");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showPackages, setShowPackages] = useState(false);
    const [showPackages2, setShowPackages2] = useState(false);
    const [collapseOpen1, setCollapseOpen1] = useState(false);
    const [collapseOpen2, setCollapseOpen2] = useState(false);
    const [projectCountry, setProjectCountry] = useState("US");
    const [projectPhone, setProjectPhone] = useState("");

    const swiperRef2 = useRef(null);
    const lightboxRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState('Published Books');
    const safeProjectCountryCodes = Array.isArray(projectCountryCodes) ? projectCountryCodes : [];
    const selectedProjectCountry =
        safeProjectCountryCodes.find((country) => country.countryCode === projectCountry) ||
        safeProjectCountryCodes[0] || { name: "United States", code: "1", countryCode: "US", flag: "https://flagcdn.com/us.svg" };

    const togglePackages2 = () => {
        setShowPackages2(!showPackages2);
        setCollapseOpen2(!collapseOpen2);
    };

    const togglePackages = () => {
        setShowPackages(!showPackages);
        setCollapseOpen1(!collapseOpen1);
    };

    const comparisonBasic = [
        {
            section: "Preparing Your Manuscript",
            rows: [
                ["Editorial Support", "✔", "✔", "✔"],
                ["Proofreading", "✔", "✔", "✔"],
                ["Typesetting", "✔", "✔", "✔"],
                ["Layout Adjustment", "✔", "✔", "✔"],
                ["Basic Formatting", "✔", "✔", "✔"],
                ["Publishing Standard Formatting", "✖", "✔", "✔"],
                ["Revisions Per Draft", "2", "3", "5"],
            ],
        },
        {
            section: "Preparing your Book Cover",
            rows: [
                ["Graphic OR Illustrated Design", "✖", "✔", "✔"],
                ["Cover Layout", "✖", "✔", "✔"],
                ["Cover Formatting", "✖", "✔", "✔"],
                ["Front, Back & Spine", "✖", "✔", "✔"],
                ["ISBN + Barcode (2X)", "✖", "✖", "✔"],
            ],
        },
        {
            section: "Preparing for Print and Distribution",
            rows: [
                ["Account Creation", "✔", "✔", "✔"],
                ["Account Verification", "✔", "✔", "✔"],
                ["Account Optimization", "✔", "✔", "✔"],
                ["Kindle", "✔", "✔", "✔"],
                ["Amazon", "✖", "✔", "✔"],
                ["Barnes and Noble", "✖", "✖", "✔"],
                ["eBook Format", "✔", "✔", "✔"],
                ["Paperback Format", "✖", "✔", "✔"],
                ["Hardcover Format", "✖", "✖", "✔"],
            ],
        },
        {
            section: "Guarantees",
            rows: [
                ["No Royalties Share", "✔", "✔", "✔"],
                ["100% Ownership Rights", "✔", "✔", "✔"],
                ["100% Satisfaction", "✔", "✔", "✔"],
            ],
        },
    ];

    const comparisonAdvanced = [
        {
            section: "Preparing Your Manuscript",
            rows: [
                ["Editorial Support", "✔", "✔", "✔"],
                ["Proofreading", "✔", "✔", "✔"],
                ["Typesetting", "✔", "✔", "✔"],
                ["Layout Adjustment", "✔", "✔", "✔"],
                ["Basic Formatting", "✔", "✔", "✔"],
                ["Publishing Standard Formatting", "✔", "✔", "✔"],
                ["Revisions Per Draft", "5", "5", "5"],
            ],
        },
        {
            section: "Preparing your Book Cover",
            rows: [
                ["Graphic OR Illustrated Design", "✔", "✔", "✔"],
                ["Cover Layout", "✔", "✔", "✔"],
                ["Cover Formatting", "✔", "✔", "✔"],
                ["Front, Back & Spine", "✔", "✔", "✔"],
                ["ISBN + Barcode (2X)", "✔", "✔", "✔"],
            ],
        },
        {
            section: "Preparing for Print and Distribution",
            rows: [
                ["Account Creation", "✔", "✔", "✔"],
                ["Account Verification", "✔", "✔", "✔"],
                ["Account Optimization", "✔", "✔", "✔"],
                ["Kindle", "✔", "✔", "✔"],
                ["Amazon", "✔", "✔", "✔"],
                ["Barnes and Noble", "✔", "✔", "✔"],
                ["Google Books", "✔", "✔", "✔"],
                ["Smashwords", "✖", "✔", "✔"],
                ["Draft2Digital", "✖", "✖", "✔"],
                ["ACX", "✖", "✖", "✔"],
                ["eBook Format", "✔", "✔", "✔"],
                ["Paperback Format", "✔", "✔", "✔"],
                ["Hardcover Format", "✔", "✔", "✔"],
                ["Audiobook Format", "✖", "✖", "✔"],
            ],
        },
        {
            section: "Online Presence",
            rows: [
                ["Author Website", "3-5 Pages", "3-5 Pages", "3-5 Pages"],
                ["Domain & Hosting", "1 Year", "1 Year", "2 Year"],
            ],
        },
        {
            section: "Marketing & Branding",
            rows: [
                ["Book Trailer", "30-60 Seconds", "30-60 Seconds", "60-90 Seconds"],
                ["Social Media Marketing", "✖", "3 Platforms", "6 Platforms"],
                ["Organic Google Marketing", "✖", "6 Months", "12 Months"],
                ["Blog & Article Posting", "✖", "✖", "✔"],
                ["Press Releases", "✖", "✖", "150+ Platforms"],
            ],
        },
        {
            section: "Guarantees",
            rows: [
                ["100% Royalties", "✔", "✔", "✔"],
                ["100% Ownership Rights", "✔", "✔", "✔"],
            ],
        },
    ];

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

    useEffect(() => {
        if (lightboxRef.current) {
            lightboxRef.current.reload();
        }
    }, [activeCategory]);


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

    // Function to toggle visibility based on scroll position
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Function to scroll to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Get user location and page info
    const [userInfo, setUserInfo] = useState({
        ip: '',
        city: '',
        region: '',
        country: '',
        referrer: '',
        currentPage: ''
    });

    useEffect(() => {
        // Get page info
        setUserInfo(prev => ({
            ...prev,
            referrer: document.referrer || 'Direct',
            currentPage: window.location.href
        }));

        // Get user IP and location
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                setUserInfo(prev => ({
                    ...prev,
                    ip: data.ip,
                    city: data.city,
                    region: data.region,
                    country: data.country_name
                }));
            })
            .catch(err => console.log('Error fetching location:', err));
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setStartCounter(true);
                }
            },
            { threshold: 0.5 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        };
    }, []);

    // Form submission handler
    const handleFormSubmit = async (e, formType) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            msg: formData.get('msg'),
            formType: formType,
            referringPage: userInfo.referrer,
            currentPage: userInfo.currentPage,
            userIP: userInfo.ip,
            userCity: userInfo.city,
            userRegion: userInfo.region,
            userCountry: userInfo.country,
        };

        // Add services if form has checkboxes
        if (formType === 'Project Needs') {
            const services = formData.getAll('services');
            data.services = services;
            data.manuscript = formData.get('manuscript');
            data.genre = formData.get('genre');
            const manuscriptFile = formData.get('manuscriptFile');
            if (manuscriptFile && manuscriptFile.size > 0) {
                const contentBase64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const result = typeof reader.result === "string" ? reader.result : "";
                        resolve(result.split(",")[1] || "");
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(manuscriptFile);
                });

                data.manuscriptFile = {
                    filename: manuscriptFile.name,
                    contentType: manuscriptFile.type || "application/octet-stream",
                    contentBase64,
                };
            }
        }

        try {
            const response = await fetch('/api/send-email-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                alert('Thank you! Your message has been sent successfully.');
                e.target.reset();
                if (formType === 'Project Needs') {
                    setProjectCountry("US");
                    setProjectPhone("");
                }
                if (formType === 'Modal') {
                    setIsOpen(false);
                }
            } else {
                alert('Sorry, there was an error sending your message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Sorry, there was an error sending your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const tabs = ["Fiction", "Non-Fiction", "Biography", "Children", "Informative"];

    const slidesData = {
        "Fiction": [
            { id: 1, img: "/brand-img/new-lp/ser-1.webp", alt: "fiction1", tags: ["HTML", "CSS", "AI Concept", "3D GenAI"] },
            { id: 2, img: "/brand-img/new-lp/ser-1.webp", alt: "fiction2", tags: ["Creative", "Design", "Visual Story"] }
        ],
        "Non-Fiction": [
            { id: 1, img: "/brand-img/new-lp/ser-1.webp", alt: "fiction1", tags: ["HTML", "CSS", "AI Concept", "3D GenAI"] },
            { id: 2, img: "/brand-img/new-lp/ser-1.webp", alt: "fiction2", tags: ["Creative", "Design", "Visual Story"] },
            { id: 3, img: "/brand-img/new-lp/ser-1.webp", alt: "nonfiction2", tags: ["Rapid branding", "Concept", "Art"] }
        ],
        "Biography": [
            { id: 1, img: "/brand-img/new-lp/ser-1.webp", alt: "fiction1", tags: ["HTML", "CSS", "AI Concept", "3D GenAI"] },
            { id: 2, img: "/brand-img/new-lp/ser-1.webp", alt: "fiction2", tags: ["Creative", "Design", "Visual Story"] }
        ],
        "Children": [
            { id: 1, img: "/brand-img/new-lp/ser-1.webp", alt: "fiction1", tags: ["HTML", "CSS", "AI Concept", "3D GenAI"] },
            { id: 2, img: "/brand-img/new-lp/ser-1.webp", alt: "fiction2", tags: ["Creative", "Design", "Visual Story"] },
            { id: 3, img: "/brand-img/new-lp/ser-1.webp", alt: "fiction1", tags: ["HTML", "CSS", "AI Concept", "3D GenAI"] },
            { id: 4, img: "/brand-img/new-lp/ser-1.webp", alt: "fiction2", tags: ["Creative", "Design", "Visual Story"] }
        ],
        "Informative": [
            { id: 1, img: "/brand-img/new-lp/ser-1.webp", alt: "info1", tags: ["Educational", "Content", "Facts"] }
        ],
    };

    const slides = slidesData[activeTab] || [];

    return (
        <>
            <Head>
                <title>Pine Book Publishing | Submit Your Manuscript</title>
                <meta
                    name="description"
                    content="Hire Professional Book Publishing company. At Pine Book Publishing, we provide to comprehensive book publishing services. Your Trusted Book Writing Partners In The USA And Canada."
                />
                <meta name="google-site-verification" content="v2pKJGIZnMWCWw2QC5nuRPYT5gvDQlUtT0lZYFIhHYo" />
                <link rel="shortcut icon" href="/images/fav.png" />
                <meta name="robots" content="noindex" />

                {/* Google tag Manager Script */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16471224604"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-16471224604'); 
                  `,
                    }}
                />
            </Head>
            <main className="font-sans text-gray-800">

                <GoogleTranslateWidget />
                {/* ------------------ HEADER ------------------ */}

                <header className="absolute top-0 left-0 right-0 container mx-auto py-2 width-container z-50 w-full lg:max-w-6xl bg-transparent">
                    <div className="flex items-center justify-between px-2 flex-wrap md:justify-strat">
                        <div className="head-logo">
                            <Link className="text-center" href="/new-publishing-offer">
                                <Image alt="LOGO" src={'/brand-img/logo.png'} width={200} height={80} loading="lazy" />
                            </Link>
                        </div>

                        <div className="flex items-center justify-end flex-col md:flex-row gap-3 flex-col-reverse">
                            <button className=" btn-a items-center bg-gray-800 md:py-2 py-4 mr-2 px-3 focus:outline-none hover:bg-gray-700">
                                <Link className="" href={'tel:8887867135'}>(888) 786-7135</Link>
                            </button>

                            <button className=" hidden btn-a items-center bg-gray-800 mr-2 md:py-2 py-4 px-3 focus:outline-none hover:bg-gray-700 md:block">
                                <Link className="" href={'mailto:support@pinebookpublishing.com'}>support@pinebookpublishing.com</Link>
                            </button>

                            <button className="btn-a items-center bg-gray-800 md:py-2 py-4 px-3 focus:outline-none hover:bg-gray-700" onClick={handleOpenChat}>
                                <Link className="" href={'javascript:;'}>Talk to an Expert</Link>
                            </button>
                            <LanguageSelectorDropdown />
                        </div>
                    </div>
                </header>


                {/* ------------------ HERO SECTION ------------------ */}
                <section className="relative z-0 bg-[#0a2c24] min-h-[48vh] md:min-h-[62vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <Image
                            src="/images/hero-bg.webp"
                            alt="Hero Background"
                            fill
                            className="object-cover opacity-45"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#031510]/70 via-[#0a2c24]/45 to-[#031510]/70"></div>
                    <div className="relative z-10 w-full lg:max-w-6xl px-4 text-center">
                        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
                            Submit Your Manuscript
                        </h1>
                    </div>
                </section>

                <section
                    className="py-20 bg-white text-[#117d6b]"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                >
                    <div className="max-w-3xl mx-auto text-center px-4 grid md:grid-cols-1 gap-10">

                        {/* Right Side - Form */}
                        <div className="bg-[#117d6b] rounded-2xl p-8">
                            <form onSubmit={(e) => handleFormSubmit(e, 'Project Needs')} className="space-y-4">
                                {/* Services Checkboxes */}
                                <div className="grid grid-cols-2 gap-3 text-white">
                                    {[
                                        "Book Publishing",
                                        "Cover Design",
                                        "Illustration",
                                        "Book Editing",
                                        "Printing",
                                        "Interior Formatting",
                                    ].map((label, index) => (
                                        <label key={index} className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                name="services"
                                                value={label}
                                                className="accent-[#15184c]"
                                            />
                                            {label}
                                        </label>
                                    ))}
                                </div>

                                {/* Name Field */}
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name *"
                                    className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#15184c]"
                                    required
                                />

                                {/* Email Field */}
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address *"
                                    className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#15184c]"
                                    required
                                />

                                {/* Phone Field With Country Code */}
                                <div className="relative w-full">
                                    <div className="tel-box">
                                        <div className="country-input-wrapper">
                                            <div className="select-box">
                                                <div className="select-box flex items-center">
                                                    <select
                                                        className="country-select pl-2 pr-2 py-2 cursor-pointer"
                                                        value={projectCountry}
                                                        onChange={(e) => setProjectCountry(e.target.value)}
                                                    >
                                                        {safeProjectCountryCodes.map((country) => (
                                                            <option key={country.countryCode} value={country.countryCode}>
                                                                {country.name} (+{country.code})
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <img
                                                        src={selectedProjectCountry.flag}
                                                        alt={`Flag of ${selectedProjectCountry.name}`}
                                                        className="flag-img w-6 h-4 ml-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="country-input-wrapper flex items-center mt-2">
                                                <span className="country-code text-lg font-semibold">
                                                    +{selectedProjectCountry.code}
                                                </span>
                                                <input
                                                    type="tel"
                                                    name="phone_local"
                                                    placeholder="Enter your Phone No *"
                                                    pattern="[0-9]{7,15}"
                                                    minLength={7}
                                                    maxLength={15}
                                                    value={projectPhone}
                                                    onChange={(e) => setProjectPhone(e.target.value.replace(/\D/g, ""))}
                                                    className="tel pl-4 pr-4 py-3 w-full rounded text-black focus:outline-none focus:ring-2 focus:ring-[#15184c]"
                                                    required
                                                />
                                            </div>
                                            <input
                                                type="hidden"
                                                name="phone"
                                                value={`+${selectedProjectCountry.code} ${projectPhone}`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Manuscript Status Dropdown */}
                                <select
                                    name="manuscript"
                                    className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#15184c]"
                                    required
                                >
                                    <option value="">Do You Have a Completed Manuscript? *</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="inprogress">In Progress</option>
                                </select>

                                {/* Genre Dropdown */}
                                <select
                                    name="genre"
                                    className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#15184c]"
                                    required
                                >
                                    <option value="">What Genre Is Your Book? *</option>
                                    <option value="Fiction">Fiction</option>
                                    <option value="Non-Fiction">Non-Fiction</option>
                                    <option value="Memoir">Memoir</option>
                                    <option value="Self-Help">Self-Help</option>
                                    <option value="Business">Business</option>
                                    <option value="Children">Children</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Mystery/Thriller">Mystery/Thriller</option>
                                    <option value="Science Fiction">Science Fiction</option>
                                    <option value="Fantasy">Fantasy</option>
                                    <option value="Biography">Biography</option>
                                    <option value="Other">Other</option>
                                </select>

                                {/* Message Textarea */}
                                <textarea
                                    name="msg"
                                    placeholder="Tell us more about your project..."
                                    className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#15184c]"
                                    rows="4"
                                ></textarea>

                                <div className="text-left">
                                    <label className="block text-white text-sm font-medium mb-2">
                                        Upload Manuscript
                                    </label>
                                    <input
                                        type="file"
                                        name="manuscriptFile"
                                        accept=".pdf,.doc,.docx,.txt,.rtf"
                                        className="w-full p-3 rounded bg-white text-black file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-[#15184c] file:text-white file:cursor-pointer"
                                    />
                                </div>

                                {/* Consent Checkbox */}
                                <label className="flex items-start gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        required
                                        className="mt-1 accent-[#15184c]"
                                    />
                                    <span className="text-white">
                                        I agree to receive communications by text message about my
                                        inquiry. Message and data rates may apply.
                                    </span>
                                </label>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-white w-full text-[#117d6b] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>





                {/* Modal */}
                {isOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <div
                            className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-[0_35px_90px_rgba(2,6,23,0.5)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-slate-400 "
                                aria-label="Close modal"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M6 6L18 18M18 6L6 18"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>

                            <div className="grid md:grid-cols-[1.05fr_1.45fr]">
                                <div
                                    className="relative h-full overflow-hidden bg-[#15184c] p-7 text-white sm:p-8"
                                    style={{
                                        backgroundImage: "url('/brand-img/new-lp/333221.webp')",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        // backgroundAttachment: "fixed",
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#15184c]/85 via-[#1f2870]/35 to-[#117d6bd4]/30"></div>
                                    <p className="relative z-[1] mb-3 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]">
                                        Request a Callback
                                    </p>
                                    <h3 className="relative z-[1] text-2xl font-bold leading-tight">
                                        Let us publish your book the right way
                                    </h3>
                                </div>

                                <div className="p-6 sm:p-8">
                                    <h4 className="text-xl font-bold text-slate-900">We are here to help!
                                    </h4>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Fill out the form and our expert will contact you shortly.
                                    </p>

                                    <form onSubmit={(e) => handleFormSubmit(e, 'Modal')} className="mt-6 space-y-4">
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Full Name *"
                                                required
                                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-black transition focus:border-[#117d6b] focus:outline-none focus:ring-2 focus:ring-[#117d6b]/20"
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address *"
                                                required
                                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-black transition focus:border-[#117d6b] focus:outline-none focus:ring-2 focus:ring-[#117d6b]/20"
                                            />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number *"
                                            pattern="[0-9]{10,15}"
                                            minLength={10}
                                            maxLength={15}
                                            required
                                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-black transition focus:border-[#117d6b] focus:outline-none focus:ring-2 focus:ring-[#117d6b]/20"
                                        />
                                        <textarea
                                            name="msg"
                                            placeholder="Tell us about your book project..."
                                            required
                                            rows={4}
                                            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-black transition focus:border-[#117d6b] focus:outline-none focus:ring-2 focus:ring-[#117d6b]/20"
                                        ></textarea>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="view-posts-btn modal-submit-btn"
                                        >
                                            <span className="btn-text">
                                                {isSubmitting ? 'Submitting...' : 'Consult a Publishing Expert'}
                                            </span>
                                            <span className="btn-icon" aria-hidden="true">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42s1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1"
                                                    ></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <BrandFooterBook />

                <div>
                    {isVisible && (
                        <button onClick={scrollToTop} className="responsive-back-to-top" style={{
                            position: 'fixed',
                            bottom: '29px',
                            right: '120px',
                            height: '40px',
                            width: '40px',
                            textAlign: 'center',
                            backgroundColor: '#00',
                            color: '#000',
                            borderRadius: '50%',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '16px',
                            boxShadow: '0 0px 5px #191b42',
                            border: '1px solid #288e7f',
                        }}>
                            <Image src={"/brand-img/top-arrow.png"} width={15} height={15}></Image>
                        </button>
                    )}
                </div>
            </main>
        </>
    );
}


