

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
    // { id: 1, title: 'Book One', category: 'Fiction', imageUrl: '/brand-img/fiction-1.png' },
    { id: 1, title: 'Book Two', category: 'Fiction', imageUrl: '/brand-img/fiction-2.png' },
    { id: 2, title: 'Book Three', category: 'Fiction', imageUrl: '/brand-img/fiction-3.png' },
    { id: 3, title: 'Book Four', category: 'Fiction', imageUrl: '/brand-img/fiction-4.png' },
    { id: 4, title: 'Book Five', category: 'Fiction', imageUrl: '/brand-img/fiction-5.png' },
    { id: 5, title: 'Book Six', category: 'Fiction', imageUrl: '/brand-img/fiction-6.png' },
    { id: 6, title: 'Book Seven', category: 'Fiction', imageUrl: '/brand-img/fiction-7.png' },
    { id: 7, title: 'Book Eight', category: 'Fiction', imageUrl: '/brand-img/fiction-8.png' },
    { id: 8, title: 'Book Nine', category: 'Fiction', imageUrl: '/brand-img/fiction-9.png' },
    { id: 9, title: 'Book Ten', category: 'Fiction', imageUrl: '/brand-img/fiction-10.png' },
    { id: 10, title: 'Book Eleven', category: 'Fiction', imageUrl: '/brand-img/fiction-11.jpg' },
    { id: 11, title: 'Book Thirdteen', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-1.png' },
    { id: 12, title: 'Book Fourteen', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-2.png' },
    { id: 13, title: 'Book Fifteen', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-3.png' },
    { id: 14, title: 'Book Sixteen', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-4.png' },
    { id: 15, title: 'Book Seventeen', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-5.png' },
    { id: 16, title: 'Book Eighteen', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-6.png' },
    { id: 17, title: 'Book Nineteen', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-7.png' },
    { id: 18, title: 'Book Twenty', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-8.png' },
    { id: 19, title: 'Book TwentyOne', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-9.png' },
    { id: 20, title: 'Book TwentyTwo', category: 'Non-Fiction', imageUrl: '/brand-img/non-fiction-10.jpg' },

];

export default function BrandPortfolio() {
    const [activeCategory, setActiveCategory] = useState('Fiction');
    const filteredBooks = books.filter(book => book.category === activeCategory);
    const lightboxRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (lightboxRef.current) {
                lightboxRef.current.destroy();
            }
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
    }, [filteredBooks]);

    return (
        <>
            <section className="max-w-screen-xl mx-auto brand-portfolio-books py-12">
                <div className="text-center mb-6">
                    {/* <h3 className="text-2xl text-black font-poppins">Get your Book</h3> */}
                    <h2 className=" text-4xl text-black uppercase">Presenting the Shelf-Worthy <br></br> Collection</h2>
                </div>
                <div className="flex space-x-4 justify-center mb-12">
                    {['Fiction', 'Non-Fiction'].map(category => (
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
                            <Link href={book.imageUrl} className="">
                                <img src={book.imageUrl} alt={book.title} className="w-full h-100 glightbox" />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
