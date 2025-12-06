"use client"

import Image from "next/image"
import {
    motion,
    MotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react"
import { useRef } from "react"

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance])
}

type EventCardProps = {
    src: string
    alt: string
    label: string
}

function EventCard({ src, alt, label }: EventCardProps) {
    const ref = useRef<HTMLDivElement | null>(null)

    // Track scroll for this specific card
    const { scrollYProgress } = useScroll({
        target: ref,
    })

    // Parallax on Y axis for the whole card
    const y = useParallax(scrollYProgress, 80)

    return (
        <motion.div
            ref={ref}
            className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl duration-300"
            style={{ y }}
        >
            <Image
                src={src}
                alt={alt}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                width={400}
                height={400}
            />
            {/* Optional label like #001, Event 1, etc. */}
            <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                className="absolute bottom-4 left-4 bg-black/60 text-white text-xs md:text-sm px-3 py-1 rounded-full tracking-widest uppercase"
            >
                {label}
            </motion.span>
        </motion.div>
    )
}

export default function ExclusiveBookSigningParallax() {
    // Global scroll progress bar (like your original example)
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <>
            <section
                className="py-16 bg-white"
                data-aos="fade-up"
                data-aos-duration="1500"
            >
                <div className="max-w-6xl mx-auto px-6 text-center">
                    {/* Heading */}
                    <div className="mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#117d6b] uppercase tracking-wide">
                            Exclusive Book Signing Events
                        </h2>
                        <div className="w-24 h-1 bg-[#15184c] mx-auto mt-4 rounded-full"></div>
                    </div>

                    {/* Events Wrapper */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <EventCard
                            src="/images/exclusive book-1.png"
                            alt="Event 1"
                            label="#001"
                        />
                        <EventCard
                            src="/images/exclusive book-2.png"
                            alt="Event 2"
                            label="#002"
                        />
                        <EventCard
                            src="/images/exclusive book-3.png"
                            alt="Event 3"
                            label="#003"
                        />
                    </div>
                </div>
            </section>

            {/* Scroll progress bar (optional, like your demo) */}
            {/* <motion.div
                className="fixed left-0 right-0 h-[5px] bg-[#8df0cc] bottom-12 origin-left z-40"
                style={{ scaleX }}
            /> */}
        </>
    )
}
