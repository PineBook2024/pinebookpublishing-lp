"use client";
import React, { useEffect, useRef } from "react";

export default function BrandVideoShowcase() {
    const sectionRef = useRef(null);
    const video1Ref = useRef(null);
    const video2Ref = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const videos = [video1Ref.current, video2Ref.current];
                if (entry.isIntersecting) {
                    videos.forEach((video) => {
                        if (video) {
                            const playPromise = video.play();
                            if (playPromise !== undefined) {
                                playPromise.catch(() => {});
                            }
                        }
                    });
                } else {
                    videos.forEach((video) => video && video.pause());
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white pt-16 pb-16 md:pt-20 md:pb-20">
            <div className="max-w-screen-xl px-4 mx-auto">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-black md:text-4xl font-poppins">
                        See What&apos;s Possible - Watch Our NY Times Square Billboard Reveals
                    </h2>
                    <p className="mt-3 text-base leading-7 text-gray-700 md:text-lg">
                        Every book deserves a big celebration. Check out these real moments we helped our authors launch their hard work right into the heart of Times Square!
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 md:mt-10">
                    <video
                        ref={video1Ref}
                        className="w-full h-full rounded-xl shadow-sm"
                        controls
                        muted
                        playsInline
                        preload="metadata"
                    >
                        <source src="/brand-img/videos/video-board-1.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <video
                        ref={video2Ref}
                        className="w-full h-full rounded-xl shadow-sm"
                        controls
                        muted
                        playsInline
                        preload="metadata"
                    >
                        <source src="/brand-img/videos/video-board-2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </section>
    );
}
