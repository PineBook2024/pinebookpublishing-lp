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
    className?: string
}

function EventCard({ src, alt, label, className = "" }: EventCardProps) {
    const ref = useRef<HTMLDivElement | null>(null)

    const { scrollYProgress } = useScroll({ target: ref })
    const y = useParallax(scrollYProgress, 40)

    return (
        <motion.div
            ref={ref}
            className={`group relative h-full w-full overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-[0_10px_30px_-12px_rgba(17,125,107,0.25)] hover:shadow-[0_25px_50px_-12px_rgba(17,125,107,0.45)] transition-shadow duration-500 ${className}`}
            style={{ y }}
        >
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Bottom gradient overlay — keeps the label legible on any photo */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Subtle dark hover veil for polish */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

            <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase text-[#117d6b] shadow-md ring-1 ring-black/5"
            >
                <span className="h-1.5 w-1.5 rounded-full bg-[#117d6b]" />
                {label}
            </motion.span>
        </motion.div>
    )
}

export default function ExclusiveBookSigningParallax() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    const events = [
        { src: "/images/Img%2001.jpg", alt: "Book Signing Event 1", label: "#001", span: "" },
        { src: "/images/Img%2002.jpg", alt: "Book Signing Event 2", label: "#002", span: "" },
        { src: "/images/Img%2003.jpg", alt: "Book Signing Event 3", label: "#003", span: "" },
        { src: "/images/Img%2005.jpg", alt: "Book Signing Event 5", label: "#005", span: "" },
        { src: "/images/Img%2006.jpg", alt: "Book Signing Event 6", label: "#006", span: "" },
        { src: "/images/Img%2007.jpg", alt: "Book Signing Event 7", label: "#007", span: "" },
    ]

    return (
        <>
            <section
                className="pt-16 pb-20 md:pb-24 bg-white"
                data-aos="fade-up"
                data-aos-duration="1500"
            >
                <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
                    {/* Heading */}
                    <div className="mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#117d6b] uppercase tracking-wide">
                            Exclusive Book Signing Events
                        </h2>
                        <div className="w-24 h-1 bg-[#15184c] mx-auto mt-4 rounded-full"></div>
                    </div>

                    {/* Events Grid — asymmetric 12-col layout on desktop */}
                    <div className="grid grid-cols-2 auto-rows-[200px] gap-4 md:grid-cols-3 md:auto-rows-[240px] md:gap-x-6 md:gap-y-3">
                        {events.map((event) => (
                            <EventCard
                                key={event.src}
                                src={event.src}
                                alt={event.alt}
                                label={event.label}
                                className={event.span}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
