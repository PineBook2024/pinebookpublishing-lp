import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from 'next/dynamic';
import 'glightbox/dist/css/glightbox.min.css';

const GLightbox = dynamic(
    () => import('glightbox').then((glightboxModule) => glightboxModule.default),
    { ssr: false }
);
const books = [
    { id: 1, title: 'Book One', category: 'Fiction', imageUrl: '/brand-img/book1.webp' },
    { id: 2, title: 'Book Two', category: 'Non-Fiction', imageUrl: '/brand-img/book2.webp' },
    { id: 3, title: 'Book Three', category: 'Fiction', imageUrl: '/brand-img/book3.webp' },
    { id: 4, title: 'Book Four', category: 'History', imageUrl: '/brand-img/book4.png' },
    { id: 5, title: 'Book Five', category: 'Fiction', imageUrl: '/brand-img/book5.webp' },
    { id: 6, title: 'Book Six', category: 'Non-Fiction', imageUrl: '/brand-img/book6.webp' },
    { id: 7, title: 'Book Seven', category: 'History', imageUrl: '/brand-img/book7.webp' },
    { id: 8, title: 'Book Eight', category: 'Fiction', imageUrl: '/brand-img/book8.webp' }
];

export default function BrandPortfolio() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredBooks = activeCategory === 'All' ? books : books.filter(book => book.category === activeCategory);

    const lightboxRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined" && !lightboxRef.current) {
            import('glightbox').then((GLightboxModule) => {
                const GLightbox = GLightboxModule.default;
                lightboxRef.current = GLightbox({
                    selector: '.glightbox'
                });
            });
        }

        return () => {
            if (lightboxRef.current) {
                lightboxRef.current.destroy();
            }
        };
    }, []);


    return (
        <>
            <section className="max-w-screen-xl mx-auto brand-portfolio-books py-12">
                <div className="text-center mb-6">
                    {/* <h3 className="text-2xl text-black font-poppins">Get your Book</h3> */}
                    <h2 className="font-majallab text-5xl text-black uppercase">Presenting the Shelf-Worthy <br></br> Collection</h2>
                </div>
                <div className="flex space-x-4 justify-center mb-12">
                    {['All', 'Fiction', 'Non-Fiction', 'History'].map(category => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-lg ${activeCategory === category ? 'active' : 'in-active'}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredBooks.map(book => (
                        <div key={book.id} className="border">
                            <Link href={book.imageUrl} className="glightbox">
                                <img src={book.imageUrl} alt={book.title} className="w-full h-100" />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}