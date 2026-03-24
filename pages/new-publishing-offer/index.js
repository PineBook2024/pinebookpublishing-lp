"use client"
import Image from "next/image";
import Link from "next/link";
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
import ExclusiveBookSigningParallax from "../components/ExclusiveBookSigningParallax";
import PortfolioSlider4 from "../components/PortfolioSlider4";
import PortfolioSlider1 from "../components/PortfolioSlider1";
import PortfolioSlider2 from "../components/PortfolioSlider2";
import PortfolioSlider3 from "../components/PortfolioSlider3";
import PortfolioSlider5 from "../components/PortfolioSlider5";
import HeroFormBookOfferLP from "../components/HerformBookOfferLP";
import GoogleTranslateWidget from "../components/GoogleTranslateWidget";
import LanguageSelectorDropdown from "../components/LanguageSelectorDropdown";

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
  const selectedProjectCountry =
    projectCountryCodes.find((country) => country.countryCode === projectCountry) ||
    projectCountryCodes[0];

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
    }

    try {
      const response = await fetch('/api/send-email', {
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
    <main className="font-sans text-gray-800">

      <GoogleTranslateWidget />
      {/* ------------------ HEADER ------------------ */}

      <header className="absolute top-0 left-0 right-0 container mx-auto py-2 width-container z-50 w-full lg:max-w-6xl bg-transparent">
        <div className="flex items-center justify-between px-2 flex-wrap md:justify-strat">
          <div className="head-logo">
            <Link className="text-center" href="/book-publishing-offer">
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
      <section className="relative z-0 bg-[#0a2c24] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/hero-bg.webp"
            alt="Hero Background"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 w-full lg:max-w-6xl">
          <HeroFormBookOfferLP onOpenModal={() => setIsOpen(true)} />
        </div>
      </section>

      <section className="brnd-slider bg-black overflow-hidden">
        {/* <AnimateFade type={"right"}> */}
        <div className="container grid grid-cols-1 width-container position-relative">
          <div className="container mx-auto position-relative">
            <div className="book-sell-text ">
              <h3 className="font-poppins text-xl md:text-xl leading-3 font-bold">Sell Your <br></br> <span>Book With</span></h3>
            </div>
            <div className="bnd-slider flex py-7 justify-center">
              <Swiper
                className="px-20 gap-x-32"
                spaceBetween={15}
                slidesPerView={6}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={false}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                modules={[Navigation, Autoplay, Pagination]}
                breakpoints={{
                  "@0.00": {
                    slidesPerView: 3,
                    spaceBetween: 10,

                    navigation: {
                      enabled: false,
                    },
                    pagination: true,
                    navigation: true,
                  },
                  "@1.00": {
                    slidesPerView: 6,
                    spaceBetween: 15,
                  },
                }}
              >
                <SwiperSlide className="mx-auto text-center">
                  <div className="flex justify-center">
                    <a href="#">
                      <Image
                        alt="LOGO"
                        src={"/images/Smashwords.png"}
                        width={110}
                        height={80}
                        className="custom-logo-size"
                        loading="lazy"
                      />
                    </a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="flex justify-center">
                    <a href="#">
                      <Image
                        alt="LOGO"
                        src={"/images/Barnes-and-Noble.png"}
                        width={70}
                        height={80}
                        loading="lazy"
                      />
                    </a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="flex justify-center">
                    <a href="#">
                      <Image
                        alt="LOGO"
                        src={"/images/Google-Books.png"}
                        width={100}
                        height={80}
                        loading="lazy"
                      />
                    </a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="flex justify-center">
                    <a href="#">
                      <Image
                        alt="LOGO"
                        src={"/images/Draft2digital.png"}
                        width={100}
                        height={120}
                        loading="lazy"
                        className="custom-logo-size"
                      />
                    </a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="flex justify-center">
                    <a href="#">
                      <Image
                        alt="LOGO"
                        src={"/images/logo5.png"}
                        width={100}
                        height={80}
                        loading="lazy"
                      />
                    </a>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex justify-center">
                    <a href="#">
                      <Image
                        alt="LOGO"
                        src={"/images/logo6.png"}
                        width={100}
                        height={80}
                        loading="lazy"
                      />
                    </a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="flex justify-center">
                    <a href="#">
                      <Image
                        alt="LOGO"
                        src={"/images/logo7.png"}
                        width={100}
                        height={80}
                        loading="lazy"
                      />
                    </a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="flex justify-center">
                    <a href="#">
                      <Image
                        alt="LOGO"
                        src={"/images/logo8.png"}
                        width={100}
                        height={80}
                        loading="lazy"
                      />
                    </a>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
        {/* </AnimateFade> */}
      </section>

      <section className="about pt-14 overflow-hidden">
        <div className="container mx-auto px-5 md:px-0 w-full lg:max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center">
            {/* <AnimateFade type={"top"}> */}
            <div className="abt-txt m1-h p1">
              <h3 className="font-poppins text-3xl md:text-5xl font-bold">
                About<span>Pine Book Publishing</span>
              </h3>
              <p className="pt-3">
                Pine Book Publishing has been helping new to seasoned writers for years with the mission of providing quality writing, editing, and publishing services worldwide, with the mission of providing quality editing and publishing services for authors worldwide. Our founders understood that many authors need support in editing and publishing their works to make them distinct from the rest in the crowded marketplace. They had a vision of creating a company that would help these authors bring their ideas to life and turn them into successful books. That was when Pine Book Publishing was officially established with a mission of providing authors with the best book publishing experience.<br></br>
                We have a qualified team of professionals who will work hand in hand with you from the moment you decide to publish your book to the moment your book is known to the world.
              </p>
              <div className="flex gap-6">
                <button className="book-publishing-cta-btn-3 shadow-xl mt-10 cursor-pointer bg-white" onClick={handleOpenChat}><Link href={'javascript:;'}>Talk to an Expert</Link></button>
                <button className="book-publishing-cta-btn-2 shadow-xl mt-10 cursor-pointer bg-white"><Link href="tel:(888) 786-7135">(888) 786-7135</Link></button>
              </div>
              {/* <div className="flex justify-start items-center mt-8 gap-2 md:gap-x-8 client-logo-sec about-logos-sec">
                  {clientLogos.map((logo, index) => (
                    <Link key={index} href={logo.href} target="_blank">
                      <Image
                        alt={logo.alt}
                        src={logo.src}
                        width={logo.width}
                        height={logo.height}
                      />
                    </Link>
                  ))}
                </div> */}
            </div>
            {/* </AnimateFade> */}
            <div className="abt-pic text-center">
              {/* <AnimateFade type={"left"}> */}
              <Image src={"/images/About-us-img.webp"} width={500} height={570}
                layout="responsive"
                loading="lazy"
                alt="about img"
              />
              {/* </AnimateFade> */}
            </div>
          </div>

          <div className="book-joun relative p-5 rounded-lg md:p-10 mb-9">
            <div className="text-center">
              <Swiper
                className="px-20"
                spaceBetween={15}
                slidesPerView={3}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={false}
                onBeforeInit={(swiper) => {
                  swiperRef3.current = swiper;
                }}
                modules={[Navigation, Autoplay, Pagination]}
                breakpoints={{
                  "@0.00": {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    navigation: {
                      enabled: false,
                    },
                    pagination: false,
                    navigation: true,
                  },
                  "@1.00": {
                    slidesPerView: 3,
                    spaceBetween: 15,
                  },
                }}
              >
                <SwiperSlide>
                  <div className="bg-white rounded-xl flex flex-row justify-between items-center border-about-card">
                    <Image
                      src={"/images/b1.png"}
                      width={100}
                      height={100}
                      loading="lazy"
                      alt="book img one"
                    ></Image>
                    <p className="p-4">
                      Explore worlds of knowledge and discovery.
                    </p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="bg-white rounded-xl flex flex-row items-center border-about-card">
                    <Image
                      src={"/images/b2.png"}
                      width={100}
                      height={100}
                      loading="lazy"
                      alt="book img two"
                    ></Image>
                    <p className="p-4">
                      Journey through the lives and experiences of others.
                    </p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="bg-white rounded-xl flex flex-row items-center border-about-card">
                    <Image
                      src={"/images/b3.png"}
                      width={100}
                      height={100}
                      loading="lazy"
                      alt="book img three"
                    ></Image>
                    <p className="p-4">
                      Get lost in imaginary worlds and captivating narratives.
                    </p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="bg-white rounded-xl flex flex-row items-center border-about-card">
                    <Image
                      src={"/images/b4.png"}
                      width={100}
                      height={100}
                      loading="lazy"
                      alt="book img four"
                    ></Image>
                    <p className="p-4">
                      Discover the truth and reality behind fascinating topics.
                    </p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="bg-white rounded-xl flex flex-row items-center border-about-card">
                    <Image
                      src={"/images/b5.png"}
                      width={100}
                      height={100}
                      loading="lazy"
                      alt="book img five"
                    ></Image>
                    <p className="p-4">
                      Dive into the personal stories and reflections of individuals.
                    </p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="bg-white rounded-xl flex flex-row items-center border-about-card">
                    <Image
                      src={"/images/b6.png"}
                      width={100}
                      height={100}
                      loading="lazy"
                      alt="book img six"
                    ></Image>
                    <p className="p-4">
                      Learn about the lives and achievements of remarkable figures.
                    </p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="bg-white rounded-xl flex flex-row items-center border-about-card">
                    <Image
                      src={"/images/b7.png"}
                      width={100}
                      height={100}
                      loading="lazy"
                      alt="book img seven"
                    ></Image>
                    <p className="p-4">
                      Embark on thrilling quests and adrenaline-pumping escapades.
                    </p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="bg-white rounded-xl flex flex-row items-center border-about-card">
                    <Image
                      src={"/images/b8.png"}
                      width={100}
                      height={100}
                      loading="lazy"
                      alt="book img eight"
                    ></Image>
                    <p className="p-4">
                      Indulge in tales of love, passion, and heartwarming connections.
                    </p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="bg-white rounded-xl flex flex-row items-center border-about-card">
                    <Image
                      src={"/images/b9.png"}
                      width={100}
                      loading="lazy"
                      alt="book img nine"
                      height={100}
                    ></Image>
                    <p className="p-4">
                      Experience a collection of diverse stories and perspectives.
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className="bk-sil prev cursor-pointer" onClick={() => swiperRef3.current?.slidePrev()}><FontAwesomeIcon icon={faArrowLeft} /></div>
              <div className="bk-sil next cursor-pointer" onClick={() => swiperRef3.current?.slideNext()}><FontAwesomeIcon icon={faArrowRight} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ PORTFOLIO SECTION ------------------ */}

      <div className="w-full max-w-6xl mx-auto py-8 relative home-book-cover">
        {/* <div class="max-w-6xl mx-auto px-6"><h2 class="text-3xl font-bold mb-2 text-center">Our Portfolio</h2><p class="text-center text-gray-600 mb-8">A few of the bestselling books we’ve proudly published for our amazing authors.</p></div> */}
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
                <div className="relative h-full flex flex-col gap-6 books">
                  <a
                    href={book.src}
                    className="glightbox5 block"
                    data-gallery="portfolio-books"
                    data-glightbox={`title: ${book.title}; description: ${book.author || ""}`}
                  >
                    <img src={book.src} alt={`Book ${book.id}`} className="object-contain" />
                  </a>
                  <div className="content">
                    <h4 className="text-size-custom">{book.title}</h4>
                    <h4>{book.author}</h4>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>

        {/* Custom Next Button */}
        <div
          className="absolute top-1/2 -right-10 transform -translate-y-1/2 bk-sil2 portfoilio-slider5-icon next cursor-pointer"
          onClick={() => swiperRef2.current?.slideNext()}
        >
          <FontAwesomeIcon icon={faArrowRight} color="#000" width={18} />
        </div>
        {/* <hr className="h-[2px] bg-gray-100 dark:bg-gray-600 mt-10 border-none" /> */}
      </div>

      <section className="bg-[#f5f5f5] pt-10">
        <PortfolioSlider4 />
        <PortfolioSlider1 />
        <PortfolioSlider2 />
        <PortfolioSlider3 />
        <PortfolioSlider5 />
      </section>


      <section className="bg-[#f9fafb]">
        <BrandTestimonial />
      </section>


      {/* 
      <section className="py-16 bg-gray-50" data-aos="fade-up" data-aos-duration="1500">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#117d6b] uppercase tracking-wide">
              Customer Reviews
            </h2>
            <div className="w-20 h-1 bg-[#15184c] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex justify-center">
              <Image
                src="/brand-img/new-lp/whatsapp.webp"
                alt="WhatsApp"
                className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                width={400}
                height={400}
              />
            </div>

            <div className="flex flex-col justify-center gap-6">
              <Image
                src="/brand-img/new-lp/test-1.webp"
                alt="Customer Review 1"
                className="w-full h-full object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                width={400}
                height={400}

              />
              <Image
                src="/brand-img/new-lp/test-2.webp"
                alt="Customer Review 2"
                className="w-full h-full object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                width={400}
                height={400}
              />
              <Image
                src="/brand-img/new-lp/test-3.webp"
                alt="Customer Review 3"
                className="w-full h-full object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="py-16 bg-white" data-aos="fade-up" data-aos-duration="1500">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#117d6b] uppercase tracking-wide">
              Exclusive Book Signing Events
            </h2>
            <div className="w-24 h-1 bg-[#15184c] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

            <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl duration-300">
              <Image
                src="/images/exclusive book-1.png"
                alt="Event 1"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                width={400}
                height={400}
              />

            </div>

            <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl duration-300">
              <Image
                src="/images/exclusive book-2.png"
                alt="Event 2"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                width={400}
                height={400}

              />
            </div>

            <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl duration-300">
              <Image
                src="/images/exclusive book-3.png"
                alt="Event 3"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                width={400}
                height={400}
              />
            </div>

          </div>
        </div>
      </section> */}

      <ExclusiveBookSigningParallax />

      <section
        className="py-20 bg-[#117d6b] bg-cover bg-center bg-no-repeat text-white relative"
        style={{ backgroundImage: "url('/brand-img/new-lp/cta-bg.webp')" }}
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          {/* <!-- Left Side Image --> */}
          <div class="w-full md:w-1/2 flex justify-center">
            <Image
              src="/brand-img/new-lp/cta_img-new.webp"
              alt="Author writing a book"
              width="500"
              height="400"
              class="rounded-2xl shadow-2xl object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* <!-- Right Side Content --> */}
          <div class="w-full md:w-1/2 space-y-6">
            <h2 class="text-3xl md:text-4xl font-bold text-[#fff]">
              How Can We Help?
            </h2>
            <p class="text-gray-100 leading-relaxed">
              At <span class="font-semibold text-white">Pine Book Publishing</span>, we transform your ideas
              into professionally written and published books. Our team of experienced writers covers a wide range
              of genres, ensuring your voice is heard authentically.
            </p>
            <p class="text-gray-100 leading-relaxed">
              With thousands of successful publications delivered, we’ve built a reputation for excellence in
              writing, editing, design, and publishing. Many of our clients’ books have gained traction in the
              literary world and achieved bestseller status.
            </p>

            {/* <!-- CTA Buttons --> */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
              {/* Primary Button */}
              <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="bg-[#15184c] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-white hover:text-black hover:shadow-2xl duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Publish Your Book Now
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                >
                  <path
                    d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3
        0s-12.5 32.8 0 45.3L402.7 224H32c-17.7 0-32
        14.3-32 32s14.3 32 32 32h370.7L297.4
        393.4c-12.5 12.5-12.5 32.8 0
        45.3s32.8 12.5 45.3 0l160-160z"
                  ></path>
                </svg>
              </button>

              {/* Secondary Button */}
              <button
                type="button"
                onClick={handleOpenChat}
                className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#15184c] hover:text-white duration-300 w-full sm:w-auto"
              >
                Live Chat
              </button>
            </div>

          </div>
        </div>
      </section>

      <section class="py-20 bg-gray-50" data-aos="fade-up" data-aos-duration="1500">
        <div class="max-w-6xl mx-auto px-6 text-center">
          {/* <!-- Heading --> */}
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-[#117d6b] uppercase tracking-wide">
              Our Process: From Concept to Perfection
            </h2>
            <div class="w-20 h-1 bg-[#15184c] mx-auto mt-4 rounded-full"></div>
          </div>

          {/* <!-- Process Steps --> */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* <!-- Step 1 --> */}
            <div
              class="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#15184c]"
            >
              <h2 class="mb-20 text-2xl font-bold text-[#15184c] mb-2 transition-colors duration-300 group-hover:text-[#117d6b]">
                Step 1
              </h2>
              <img src={"/images/Editing.png"} alt="logo" className="mx-auto" width={50} height={50} />
              <h6 class="text-lg font-semibold text-[#117d6b] mb-2">
                Editing
              </h6>
            </div>

            {/* <!-- Step 2 --> */}
            <div
              class="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#15184c]"
            >
              <h2 class="mb-20 text-2xl font-bold text-[#15184c] mb-2 transition-colors duration-300 group-hover:text-[#117d6b]">
                Step 2
              </h2>
              <img src={"/images/Proofreading.png"} alt="logo" className="mx-auto" width={50} height={50} />
              <h6 class="text-lg font-semibold text-[#117d6b] mb-2">
                Proofreading
              </h6>
            </div>

            {/* <!-- Step 3 --> */}
            <div
              class="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#15184c]"
            >
              <h2 class="mb-20 text-2xl font-bold text-[#15184c] mb-2 transition-colors duration-300 group-hover:text-[#117d6b]">
                Step 3
              </h2>
              <img src={"/images/Typesetting & Layout adjustment.png"} alt="logo" className="mx-auto" width={50} height={50} />

              <h6 class="text-lg font-semibold text-[#117d6b] mb-2">
                TypeSetting
              </h6>
            </div>

            {/* <!-- Step 4 --> */}
            <div
              class="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#15184c]"
            >
              <h2 class="mb-20 text-2xl font-bold text-[#15184c] mb-2 transition-colors duration-300 group-hover:text-[#117d6b]">
                Step 4
              </h2>
              <img src={"/images/Typesetting & Layout adjustment.png"} alt="logo" className="mx-auto" width={50} height={50} />
              <h6 class="text-lg font-semibold text-[#117d6b] mb-2">
                Layout Adjustment
              </h6>
            </div>

            <div
              class="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#15184c]"
            >
              <h2 class="mb-20 text-2xl font-bold text-[#15184c] mb-2 transition-colors duration-300 group-hover:text-[#117d6b]">
                Step 5
              </h2>
              <img src={"/images/Formatting.png"} alt="logo" className="mx-auto" width={50} height={50} />
              <h6 class="text-lg font-semibold text-[#117d6b] mb-2">
                Formatting
              </h6>
            </div>

            <div
              class="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#15184c]"
            >
              <h2 class="mb-20 text-2xl font-bold text-[#15184c] mb-2 transition-colors duration-300 group-hover:text-[#117d6b]">
                Step 6
              </h2>
              <img src={"/images/Cover Design.png"} alt="logo" className="mx-auto" width={50} height={50} />
              <h6 class="text-lg font-semibold text-[#117d6b] mb-2">
                Cover Designing
              </h6>
            </div>

            <div
              class="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#15184c]"
            >
              <h2 class="mb-20 text-2xl font-bold text-[#15184c] mb-2 transition-colors duration-300 group-hover:text-[#117d6b]">
                Step 7
              </h2>
              <img src={"/images/Cover Design.png"} alt="logo" className="mx-auto" width={50} height={50} />
              <h6 class="text-lg font-semibold text-[#117d6b] mb-2">
                Cover Adjustment
              </h6>
            </div>

            <div
              class="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#15184c]"
            >
              <h2 class="mb-20 text-2xl font-bold text-[#15184c] mb-2 transition-colors duration-300 group-hover:text-[#117d6b]">
                Step 8
              </h2>
              <img src={"/images/Publishing.png"} alt="logo" className="mx-auto" width={50} height={50} />
              <h6 class="text-lg font-semibold text-[#117d6b] mb-2">
                Publishing
              </h6>
            </div>
          </div>
        </div>
      </section>


      <section style={{ backgroundImage: "url('/brand-img/new-lp/pack-bg.png')" }}
        className="py-20 bg-gray-50"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#fff] uppercase">
            Book Publishing Bundles
          </h2>
          <div className="w-24 h-1 bg-[#fff] mx-auto mt-4 rounded-full"></div>
          <h4 class="text-xl font-poppins md:text-xl font-bold mt-4 text-white">Limited Time Offer - Save <span class="blink_me fw-bold text-2xl">50%</span> On Book Publishing Services</h4>


          {/* Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            {/* Package 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:border-[#15184c] duration-500">
              <h3 className="text-xl font-semibold text-[#117d6b] mb-3">
                Basic Package
              </h3>
              <h2 className="text-3xl font-bold text-[#15184c] mb-5">
                <del className="text-red italic">$700</del> | <span className="text-[#117d6b]">$349 USD</span>
              </h2>
              <ul className="text-gray-600 text-sm text-left space-y-2 mb-8 h-[300px] overflow-y-scroll overflow-x-hidden">
                <h4 className="font-bold text-lg">Preparing Your Manuscript</h4>
                <li>Editorial Support</li>
                <li>Proofreading</li>
                <li>Typesetting</li>
                <li>Layout Adjustment</li>
                <li>Basic Formatting</li>
                <li>2 Revisions Per Draft</li>
                <h4 className="font-bold text-lg">Book Publishing</h4>
                <li>Account Creation</li>
                <li>Account Verification</li>
                <li>Account Optimization</li>
                <li>Available on Kindle</li>
                <li>eBook Format</li>
                <h4 className="font-bold text-lg">Guarantees</h4>
                <li>No Royalties Share</li>
                <li>100% Ownership Rights</li>
                <li>100% Satisfaction</li>
              </ul>

              <button onClick={() => setIsOpen(true)} className="w-full py-3 bg-[#15184c] text-[#fff] font-semibold rounded-full duration-300 hover:bg-[#117d6b] hover:text-[#fff]">
                Get A Quote
              </button>

              <div className="mt-6 text-sm">
                <p className="font-semibold text-gray-700">Need more info?</p>
                <div className="flex justify-center gap-6 mt-2 text-[#117d6b] font-medium">
                  <a href="tel:+1-307-243-1331" className="hover:text-[#15184c] transition">
                    📞 Talk to Us
                  </a>
                  <a href="javascript:;" onClick={handleOpenChat} className="hover:text-[#15184c] transition">
                    💬 Chat With Us
                  </a>
                </div>
              </div>
            </div>

            {/* Package 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:border-[#15184c] duration-500">
              <h3 className="text-xl font-semibold text-[#117d6b] mb-3">
                Start Up Package
              </h3>
              <h2 className="text-3xl font-bold text-[#15184c] mb-5">
                <del className="text-red italic">$2,000</del> | <span className="text-[#117d6b]">$999 USD</span>
              </h2>
              <ul className="text-gray-600 text-sm text-left space-y-2 mb-8 h-[300px] overflow-y-scroll overflow-x-hidden">
                <h4 className="font-bold text-lg">Preparing Your Manuscript</h4>
                <li>Editorial Support</li>
                <li>Proofreading</li>
                <li>Typesetting</li>
                <li>Layout Adjustment</li>
                <li>Publishing Standard Formatting</li>
                <li>3 Revisions Per Draft</li>
                <h4 className="font-bold text-lg">Designing your Cover</h4>
                <li>Graphic OR Illustrated Design</li>
                <li>Cover Layout</li>
                <li>Cover Formatting</li>
                <li>Front, Back & Spine</li>
                <h4 className="font-bold text-lg">Book Publishing</h4>
                <li>Account Creation</li>
                <li>Account Verification</li>
                <li>Account Optimization</li>
                <li>Available on Amazon & Kindle</li>
                <li>eBook Format</li>
                <li>Paperback Format</li>
                <h4 className="font-bold text-lg">Guarantees</h4>
                <li>No Royalties Share</li>
                <li>100% Ownership Rights</li>
                <li>100% Satisfaction</li>
              </ul>

              <button onClick={() => setIsOpen(true)} className="w-full py-3 bg-[#15184c] text-[#fff] font-semibold rounded-full duration-300 hover:bg-[#117d6b] hover:text-[#fff]">
                Get A Quote
              </button>

              <div className="mt-6 text-sm">
                <p className="font-semibold text-gray-700">Need more info?</p>
                <div className="flex justify-center gap-6 mt-2 text-[#117d6b] font-medium">
                  <a href="tel:+1-307-243-1331" className="hover:text-[#15184c] transition">
                    📞 Talk to Us
                  </a>
                  <a href="javascript:;" onClick={handleOpenChat} className="hover:text-[#15184c] transition">
                    💬 Chat With Us
                  </a>
                </div>
              </div>
            </div>

            {/* Package 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:border-[#15184c] duration-500">
              <h3 className="text-xl font-semibold text-[#117d6b] mb-3">
                Standard Package
              </h3>
              <h2 className="text-3xl font-bold text-[#15184c] mb-5">
                <del className="text-red italic">$3,000</del> | <span className="text-[#117d6b]">$1,499 USD</span>
              </h2>
              <ul className="text-gray-600 text-sm text-left space-y-2 mb-8 h-[300px] overflow-y-scroll overflow-x-hidden">
                <h4 className="font-bold text-lg">Preparing Your Manuscript</h4>
                <li>Editorial Support</li>
                <li>Proofreading</li>
                <li>Typesetting</li>
                <li>Layout Adjustment</li>
                <li>Publishing Standard Formatting</li>
                <li>5 Revisions Per Draft</li>
                <h4 className="font-bold text-lg">Designing your Cover</h4>
                <li>Graphic OR Illustrated Design</li>
                <li>Cover Layout</li>
                <li>Cover Formatting</li>
                <li>Front, Back & Spine</li>
                <li>ISBN + Barcode (2X)</li>
                <h4 className="font-bold text-lg">Book Publishing</h4>
                <li>Account Creation</li>
                <li>Account Verification</li>
                <li>Account Optimization</li>
                <li>Available on Amazon & Kindle</li>
                <li>Available on Barnes & Noble</li>
                <li>eBook Format</li>
                <li>Paperback Format</li>
                <li>Hardcover Format</li>
                <h4 className="font-bold text-lg">Guarantees</h4>
                <li>No Royalties Share</li>
                <li>100% Ownership Rights</li>
                <li>100% Satisfaction</li>
              </ul>

              <button onClick={() => setIsOpen(true)} className="w-full py-3 bg-[#15184c] text-[#fff] font-semibold rounded-full duration-300 hover:bg-[#117d6b] hover:text-[#fff]">
                Get A Quote
              </button>

              <div className="mt-6 text-sm">
                <p className="font-semibold text-gray-700">Need more info?</p>
                <div className="flex justify-center gap-6 mt-2 text-[#117d6b] font-medium">
                  <a href="tel:+1-307-243-1331" className="hover:text-[#15184c] transition">
                    📞 Talk to Us
                  </a>
                  <a href="javascript:;" onClick={handleOpenChat} className="hover:text-[#15184c] transition">
                    💬 Chat With Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          <section className="table-sec overflow-x-auto max-w-screen-xl mx-auto mt-8">
            <div className="container mx-auto m1-h mt-10 text-center">
              <button className="compare-now-btn-new mb-10 mt-5" onClick={togglePackages2}>Comparison
                <FontAwesomeIcon
                  className="ml-2"
                  icon={collapseOpen2 ? faArrowUp : faArrowDown}
                  color="#fff"
                />
              </button>
            </div>
            <div className={`container container-compare mx-auto transition-height duration-500 ease-in-out ${showPackages2 ? 'expanded' : 'collapsed'}`} ref={contentRef}>
              <div className="md:w-full w-[500px] responsive-width">
                <table className="w-full mb-14 table-auto bundle-comparison-chart table-fixed">
                  <thead className="chart-header-custom">
                    <tr>
                      <th className="mainpage-regular"></th>
                      <th className="font-poppins"><div className="heading">Basic Package</div></th>
                      <th className="font-poppins"><div className="heading">Start Up Package</div></th>
                      <th className="font-poppins"><div className="heading">Standard Package</div></th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {comparisonBasic.map((group) => (
                      <Fragment key={group.section}>
                        <tr className="m-4">
                          <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5" colSpan="4" scope="row">
                            {group.section}
                          </th>
                        </tr>
                        {group.rows.map((row) => (
                          <tr key={`${group.section}-${row[0]}`}>
                            <td>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td>{row[2]}</td>
                            <td>{row[3]}</td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-4">

            {/* Package 4 */}
            <div className="group bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:border-[#15184c] duration-500">
              <h3 className="text-xl font-semibold text-[#117d6b] mb-3">
                Expert Package
              </h3>
              <h2 className="text-3xl font-bold text-[#15184c] mb-5">
                <del className="text-red italic">$7,000</del> | <span className="text-[#117d6b]">$3,499 USD</span>
              </h2>
              <ul className="text-gray-600 text-sm text-left space-y-2 mb-8 h-[300px] overflow-y-scroll overflow-x-hidden">
                <h4 className="font-bold text-lg">Preparing Your Manuscript</h4>
                <li>Editorial Support</li>
                <li>Proofreading</li>
                <li>Typesetting</li>
                <li>Layout Adjustment</li>
                <li>Publishing Standard Formatting</li>
                <li>5 Revisions Per Draft</li>
                <h4 className="font-bold text-lg">Designing your Cover</h4>
                <li>Graphic OR Illustrated Design</li>
                <li>Cover Layout</li>
                <li>Cover Formatting</li>
                <li>Front, Back & Spine</li>
                <li>ISBN + Barcode (2X)</li>
                <h4 className="font-bold text-lg">Book Publishing</h4>
                <li>Account Creation</li>
                <li>Account Verification</li>
                <li>Account Optimization</li>
                <li>Available on Amazon & Kindle</li>
                <li>Available on Barnes & Noble</li>
                <li>Available on Google Books</li>
                <li>eBook Format</li>
                <li>Paperback Format</li>
                <li>Hardcover Format</li>
                <h4 className="font-bold text-lg">Online Presence</h4>
                <li>3 - 5 Page Authors Website</li>
                <li>1 - Year Domain & Hosting</li>
                <li>30 - 60 Seconds Book Trailer</li>
                <h4 className="font-bold text-lg">Guarantees</h4>
                <li>No Royalties Share</li>
                <li>100% Ownership Rights</li>
                <li>100% Satisfaction</li>
              </ul>

              <button onClick={() => setIsOpen(true)} className="w-full py-3 bg-[#15184c] text-[#fff] font-semibold rounded-full duration-300 hover:bg-[#117d6b] hover:text-[#fff]">
                Get A Quote
              </button>

              <div className="mt-6 text-sm">
                <p className="font-semibold text-gray-700">Need more info?</p>
                <div className="flex justify-center gap-6 mt-2 text-[#117d6b] font-medium">
                  <a href="tel:+1-307-243-1331" className="hover:text-[#15184c] transition">
                    📞 Talk to Us
                  </a>
                  <a href="javascript:;" onClick={handleOpenChat} className="hover:text-[#15184c] transition">
                    💬 Chat With Us
                  </a>
                </div>
              </div>
            </div>

            {/* Package 5 */}
            <div className="group bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:border-[#15184c] duration-500">
              <h3 className="text-xl font-semibold text-[#117d6b] mb-3">
                Premium Package
              </h3>
              <h2 className="text-3xl font-bold text-[#15184c] mb-5">
                <del className="text-red italic">$15,000</del> | <span className="text-[#117d6b]">$7,499 USD</span>
              </h2>
              <ul className="text-gray-600 text-sm text-left space-y-2 mb-8 h-[300px] overflow-y-scroll overflow-x-hidden">
                <h4 className="font-bold text-lg">Preparing Your Manuscript</h4>
                <li>Editorial Support</li>
                <li>Proofreading</li>
                <li>Typesetting</li>
                <li>Layout Adjustment</li>
                <li>Publishing Standard Formatting</li>
                <li>5 Revisions Per Draft</li>
                <h4 className="font-bold text-lg">Designing your Cover</h4>
                <li>Graphic OR Illustrated Design</li>
                <li>Cover Layout</li>
                <li>Cover Formatting</li>
                <li>Front, Back & Spine</li>
                <li>ISBN + Barcode (2X)</li>
                <h4 className="font-bold text-lg">Book Publishing</h4>
                <li>Account Creation</li>
                <li>Account Verification</li>
                <li>Account Optimization</li>
                <li>Available on Amazon & Kindle</li>
                <li>Available on Barnes & Noble</li>
                <li>Available on Google Books</li>
                <li>Available on Smashwords</li>
                <li>eBook Format</li>
                <li>Paperback Format</li>
                <li>Hardcover Format</li>
                <h4 className="font-bold text-lg">12 Months Brand Marketing</h4>
                <li>Logo Design (Complimentary)</li>
                <li>3 - 5 Page Authors Website</li>
                <li>1 - Year Domain & Hosting</li>
                <li>30 - 60 Seconds Book Trailer</li>
                <li>Organic Google Marketing</li>
                <li>Social Media Marketing (Facebook, Instagram & Twitter)</li>
                <h4 className="font-bold text-lg">Guarantees</h4>
                <li>No Royalties Share</li>
                <li>100% Ownership Rights</li>
                <li>100% Satisfaction</li>
              </ul>

              <button onClick={() => setIsOpen(true)} className="w-full py-3 bg-[#15184c] text-[#fff] font-semibold rounded-full duration-300 hover:bg-[#117d6b] hover:text-[#fff]">
                Get A Quote
              </button>

              <div className="mt-6 text-sm">
                <p className="font-semibold text-gray-700">Need more info?</p>
                <div className="flex justify-center gap-6 mt-2 text-[#117d6b] font-medium">
                  <a href="tel:+1-307-243-1331" className="hover:text-[#15184c] transition">
                    📞 Talk to Us
                  </a>
                  <a href="javascript:;" onClick={handleOpenChat} className="hover:text-[#15184c] transition">
                    💬 Chat With Us
                  </a>
                </div>
              </div>
            </div>

            {/* Package 6 */}
            <div className="group bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:border-[#15184c] duration-500">
              <h3 className="text-xl font-semibold text-[#117d6b] mb-3">
                Enterprise Package
              </h3>
              <h2 className="text-3xl font-bold text-[#15184c] mb-5">
                <del className="text-red italic">$25,000</del> | <span className="text-[#117d6b]">$12,499 USD</span>
              </h2>
              <ul className="text-gray-600 text-sm text-left space-y-2 mb-8 h-[300px] overflow-y-scroll overflow-x-hidden">
                <h4 className="font-bold text-lg">Preparing Your Manuscript</h4>
                <li>Editorial Support</li>
                <li>Proofreading</li>
                <li>Typesetting</li>
                <li>Layout Adjustment</li>
                <li>Publishing Standard Formatting</li>
                <li>5 Revisions Per Draft</li>
                <h4 className="font-bold text-lg">Designing your Cover</h4>
                <li>Graphic OR Illustrated Design</li>
                <li>Cover Layout</li>
                <li>Cover Formatting</li>
                <li>Front, Back & Spine</li>
                <li>ISBN + Barcode (2X)</li>
                <h4 className="font-bold text-lg">Book Publishing</h4>
                <li>Account Creation</li>
                <li>Account Verification</li>
                <li>Account Optimization</li>
                <li>Available on Amazon & Kindle</li>
                <li>Available on Barnes & Noble</li>
                <li>Available on Google Books</li>
                <li>Available on Smashwords</li>
                <li>Available on Draft2Digital</li>
                <li>Available on ACX</li>
                <li>eBook Format</li>
                <li>Paperback Format</li>
                <li>Hardcover Format</li>
                <li>Audiobook Format</li>
                <h4 className="font-bold text-lg">24 Months Brand Marketing</h4>
                <li>Logo Design (Complimentary)</li>
                <li>3 - 5 Page Authors Website</li>
                <li>2 - Year Domain & Hosting</li>
                <li>Organic Google Marketing</li>
                <li>Blogs & Article Postings</li>
                <li>Press Releases (150+ Platforms)</li>
                <li>Social Media Marketing (Facebook, Instagram, Twitter, YouTube, TikTok)
                </li>
                <h4 className="font-bold text-lg">Guarantees</h4>
                <li>No Royalties Share
                </li>
                <li>100% Ownership Rights
                </li>
                <li>100% Satisfaction
                </li>

              </ul>

              <button onClick={() => setIsOpen(true)} className="w-full py-3 bg-[#15184c] text-[#fff] font-semibold rounded-full duration-300 hover:bg-[#117d6b] hover:text-[#fff]">
                Get A Quote
              </button>

              <div className="mt-6 text-sm">
                <p className="font-semibold text-gray-700">Need more info?</p>
                <div className="flex justify-center gap-6 mt-2 text-[#117d6b] font-medium">
                  <a href="tel:+1-307-243-1331" className="hover:text-[#15184c] transition">
                    📞 Talk to Us
                  </a>
                  <a href="javascript:;" onClick={handleOpenChat} className="hover:text-[#15184c] transition">
                    💬 Chat With Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          <section className="table-sec overflow-x-auto max-w-screen-xl mx-auto">
            <div className="container mx-auto m1-h mt-10 text-center">
              <button className="compare-now-btn-new mb-10 mt-5" onClick={togglePackages}>Comparison
                <FontAwesomeIcon
                  className="ml-2"
                  icon={collapseOpen1 ? faArrowUp : faArrowDown}
                  color="#fff"
                />
              </button>
            </div>
            <div className={`container container-compare mx-auto transition-height duration-500 ease-in-out ${showPackages ? 'expanded' : 'collapsed'}`}>
              <div className="md:w-full w-[500px] responsive-width">
                <table className="w-full mb-14 table-auto bundle-comparison-chart table-fixed">
                  <thead className="chart-header-custom">
                    <tr>
                      <th className="mainpage-regular"></th>
                      <th className="font-poppins"><div className="heading">Expert Package</div></th>
                      <th className="font-poppins"><div className="heading">Premium Package</div></th>
                      <th className="font-poppins"><div className="heading">Enterprise Package</div></th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {comparisonAdvanced.map((group) => (
                      <Fragment key={group.section}>
                        <tr className="m-4">
                          <th className="text-2xl md:text-2xl text-start p-3 font-bold pl-5" colSpan="4" scope="row">
                            {group.section}
                          </th>
                        </tr>
                        {group.rows.map((row) => (
                          <tr key={`${group.section}-${row[0]}`}>
                            <td>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td>{row[2]}</td>
                            <td>{row[3]}</td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </section>


      <section
        className="my-20"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#117d6b] uppercase">
            Our Services for You
          </h2>
          <div className="w-24 h-1 bg-[#15184c] mx-auto mt-4 rounded-full"></div>

          {/* Service Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-16">
            {[
              { img: "/brand-img/new-lp/1.webp", title: "Book Publishing", url: "/book-publishing" },
              { img: "/brand-img/new-lp/9.webp", title: "Book Editing", url: "/book-editing" },
              { img: "/brand-img/new-lp/2.webp", title: "Proofreading", url: "/proofreading" },
              { img: "/brand-img/new-lp/10.webp", title: "Book Formatting", url: "/book-formatting" },
              { img: "/brand-img/new-lp/3.webp", title: "Typesetting & Layout", url: "/typesetting-layout-adjustment" },
              { img: "/brand-img/new-lp/3.webp", title: "Audio Book", url: "/audio-book" },
              { img: "/brand-img/new-lp/3.webp", title: "Print on Demand", url: "/print-on-demand" },
              { img: "/brand-img/new-lp/3.webp", title: "Document Processing", url: "/document-processing" },
              { img: "/brand-img/new-lp/3.webp", title: "ISBN & Barcode", url: "/isbn-and-barcode" },
              { img: "/brand-img/new-lp/3.webp", title: "Merchandising", url: "/merchandising" },
              { img: "/brand-img/new-lp/8.webp", title: "Book Marketing", url: "/book-marketing" },
              { img: "/brand-img/new-lp/8.webp", title: "Children's Book Illustration", url: "/childrens-book-illustration" },
              { img: "/brand-img/new-lp/8.webp", title: "Book Illustration Services", url: "/book-illustration-services" },
              { img: "/brand-img/new-lp/8.webp", title: "Book Translation", url: "/book-translation" },
              { img: "/brand-img/new-lp/4.webp", title: "Book Writing", url: "/book-writing" },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl duration-500 hover:-translate-y-2 flex flex-col items-center justify-between p-6 border border-gray-100 hover:border-[#15184c]"
              >
                <Image
                  src={service.img}
                  alt={service.title}
                  width={50}
                  height={50}
                  className="mx-auto mb-4 transition-transform duration-500 group-hover:scale-110"
                />
                <h5 className="text-lg font-semibold text-[#117d6b] mb-3">
                  {service.title}
                </h5>
                <Link
                  href={service.url}
                  className="px-5 py-2 bg-[#15184c] text-[#ffff] rounded-full font-medium text-sm duration-300 hover:bg-[#117d6b] hover:text-[#fff] flex items-center gap-2"
                >
                  Get Info
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Story />
      <section
        className="py-20 bg-white text-[#117d6b]"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="max-w-7xl mx-auto text-center px-4 grid md:grid-cols-2 gap-10">
          {/* Left Side */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-left">
              Bring Your Book to Life with Pine Book Publishing
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed text-left">
              At Pine Book Publishing, we believe that every story deserves to
              be told — and told beautifully, with the care, passion, and
              professionalism it deserves. Whether you're beginning with a single
              spark of an idea, struggling through the early stages of a rough
              draft, or holding a completed manuscript ready for the world, we are
              here to help transform your vision into a masterpiece.
            </p>

            <ul className="grid grid-cols-2 gap-2 text-sm">
              {[
                "Book Publishing",
                "Book Editing",
                "Proofreading",
                "Book Formatting",
                "Typesetting & Layout",
                "Audio Book",
                "Print on Demand",
                "Document Processing",
                "ISBN & Barcode",
                "Merchandising",
                "Book Marketing",
                "Children's Book Illustration",
                "Book Illustration Services",
                "Book Translation",
                "Book Writing",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Image
                    src="/brand-img/new-lp/check.webp"
                    alt="check"
                    width={16}
                    height={16}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 content-center mt-6">
              {/* Button 1 */}
              <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="bg-[#15184c]  text-[#fff] font-semibold px-6 py-3 rounded-full flex items-center gap-2  duration-300 hover:bg-white hover:text-black"
              >
                Publish Your Book Now
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 
                0s-12.5 32.8 0 45.3L402.7 224H32c-17.7 
                0-32 14.3-32 32s14.3 32 32 32h370.7L297.4 
                393.4c-12.5 12.5-12.5 32.8 0 
                45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </button>

              {/* Button 2 */}
              <button
                type="button"
                onClick={handleOpenChat}
                className="bg-[#15184c] text-[#fff] font-semibold px-6 py-3 rounded-full flex items-center gap-2  duration-300 hover:bg-white hover:text-black"
              >
                Live Chat
              </button>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-[#117d6b] rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Tell Us About Your Project Needs
            </h2>

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
                          {projectCountryCodes.map((country) => (
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


      <section
        style={{ backgroundImage: "url('/brand-img/new-lp/pack-bg.png')" }}
        className="pt-20 pb-[15%] cover bg-center bg-no-repeat bg-cover"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          {/* Left Side Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <Image src={"/images/book-image-big.png"} width={400} height={200} className="aos-init aos-animate book-publishing-cta-img" ></Image>
            </div>
          </div>

          {/* Right Side Text */}
          <div className="text-white space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold leading-snug">
              Achieve Best-Selling <br /> Status at 70% Off
            </h2>
            <p className="text-lg">We’ll help turn your manuscript into a best-seller!</p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 content-center">
              {/* Button 1 */}
              <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="bg-[#15184c]  text-[#fff] font-semibold px-6 py-3 rounded-full flex items-center gap-2  duration-300 hover:bg-white hover:text-black"
              >
                Publish Your Book Now
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 
                0s-12.5 32.8 0 45.3L402.7 224H32c-17.7 
                0-32 14.3-32 32s14.3 32 32 32h370.7L297.4 
                393.4c-12.5 12.5-12.5 32.8 0 
                45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </button>

              {/* Button 2 */}
              <button
                type="button"
                onClick={handleOpenChat}
                className="bg-[#15184c] text-[#fff] font-semibold px-6 py-3 rounded-full flex items-center gap-2  duration-300 hover:bg-white hover:text-black"
              >
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="  text-[#117d6b] relative ">
        <div className="container mx-auto w-full lg:max-w-6xl grid md:grid-cols-2 gap-10 items-center shadow-[0_0_10px_#212529] rounded-[30px] px-[30px] py-[40px] md:mt-[-15%] bg-white z-30">
          {/* Left Content */}
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold leading-snug">
              Excited to Publish Your Manuscript?
            </h2>

            <p className="text-gray-700">
              We’re here to help. At Pine Book Publishing, we offer end-to-end
              book writing and publishing services, including:
            </p>

            <ul className="space-y-2 text-gray-800">
              {[
                "E-book publication",
                "Audiobooks",
                "Website Design, Development, & SEO",
                "Video Book Trailers",
                "Branding & Publicity",
                "Cover Design & Typesetting",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Image
                    src="/brand-img/new-lp/check.webp"
                    alt="Check icon"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  {item}
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
              <button
                type="button"
                className="px-5 py-4 flex gap-2 items-center bg-[#15184c] text-[#ffff] rounded-full font-medium text-sm duration-300 hover:bg-[#117d6b] hover:text-[#fff]"
              >
                Publish Your Book Now
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M502.6 278.6c12.5-12.5 12.5-32.8 
                  0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 
                  0s-12.5 32.8 0 45.3L402.7 224H32c-17.7 
                  0-32 14.3-32 32s14.3 32 32 32h370.7L297.4 
                  393.4c-12.5 12.5-12.5 32.8 0 
                  45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleOpenChat}
                className="bg-[#117d6b] text-white font-semibold py-3 rounded-full hover:bg-[#15184c] hover:text-[#fff] duration-300 px-5 py-2"
              >
                Live Chat
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <Image
              src="/brand-img/new-lp/Our.webp"
              alt="Books stack"
              width={400}
              height={300}
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      </section>


      <section
        className="py-20 bg-[#f9f9f9] bg-cover"
      // style={{ backgroundImage: "url('/brand-img/new-lp/footer.webp')" }}
      >
        <div className="container mx-auto px-4 w-full lg:max-w-6xl">
          {/* Top heading like screenshot */}
          {/* <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1b3040]">
              CONNECT WITH US
            </h2>
          </div> */}

          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-16">
            {/* Left content block */}
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              className="w-full lg:w-5/12"
            >
              <h3 className="text-3xl md:text-4xl font-semibold text-[#123d4f] mb-4">
                Connect Us Now!
              </h3>
              <p className="text-gray-600 max-w-md">
                Ready to share your story? Tell us what you need and we’ll help bring
                your book to life.
              </p>

              {/* Optional book strip behind text, like the covers in the screenshot */}
              <div className="relative mt-10 hidden md:block">
                <div className="absolute inset-0 blur-3xl opacity-40 bg-gradient-to-r from-[#8fd3c8] to-[#fef4d6]" />
                <img
                  src="/brand-img/new-lp/strips.webp"
                  alt="Book covers"
                  className="relative z-[1] max-w-full h-auto"
                />
              </div>
            </div>

            {/* Right form card */}
            <div className="w-full lg:w-7/12 flex justify-center">
              <div className="relative w-full max-w-xl">
                {/* Card shadow halo like screenshot */}
                <div className="absolute inset-0 translate-y-4 blur-2xl bg-black/10 rounded-[32px] pointer-events-none" />

                <form
                  onSubmit={(e) => handleFormSubmit(e, 'Footer Contact')}
                  className="relative bg-white rounded-[32px] px-6 sm:px-8 lg:px-10 py-8 sm:py-10 shadow-[0_20px_45px_rgba(15,23,42,0.18)]"
                >
                  {/* Card header like “Join Thousands…” */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e] mb-2">
                      Join thousands of writers
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#123d4f] leading-snug">
                      Become a published author with Pine Book Publishing
                    </h3>
                  </div>

                  {/* Name and Email Row (unchanged fields) */}
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your Name *"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#117d6b] text-black"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your Email *"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#117d6b] text-black"
                      required
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="mb-4">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your Phone No *"
                      pattern="[0-9]{10,15}"
                      minLength={10}
                      maxLength={15}
                      title="Please Enter Valid Phone No."
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#117d6b] text-black"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="mb-4">
                    <textarea
                      name="msg"
                      placeholder="Enter a brief description about your book *"
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#117d6b] text-black resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* Consent Checkbox */}
                  <label className="flex items-start text-xs sm:text-sm text-black space-x-2 mb-6">
                    <input
                      type="checkbox"
                      name="subscribe"
                      value="yes"
                      className="mt-1 accent-[#117d6b]"
                      required
                    />
                    <span className="text-left leading-relaxed">
                      I agree to receive communications by text message about my
                      inquiry. You may opt-out by replying STOP or ask for more
                      information by replying HELP. Message frequency varies. Message
                      and data rates may apply.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#117d6b] text-white font-semibold py-3 rounded-[999px] hover:bg-[#159372] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Consult a Publishing Expert'}
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Button to Open Modal */}
      {/* <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Open Form
      </button> */}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-lg p-6 rounded-3xl shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4 text-center text-black">We are here to help!</h3>

            <form onSubmit={(e) => handleFormSubmit(e, 'Modal')} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Enter your Phone No"
                pattern="[0-9]{10}"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <textarea
                name="msg"
                placeholder="Describe your project..."
                required
                className="w-full border border-gray-300 rounded-lg p-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#117d6b] text-white py-2 rounded-lg hover:bg-[#15184c] transition disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
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
  );
}

