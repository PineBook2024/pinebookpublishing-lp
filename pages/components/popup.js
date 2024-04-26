
"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

export default function popup() {
    const searchParams = useSearchParams();
    const modal = searchParams.get("modal-digital-design");
    const pathname = usePathname();

    return (
        <>
            {modal &&
                <dialog
                    className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-auto bg-black bg-opacity-50 backdrop-blur">
                    <div className="p-8 m-auto bg-white">
                        <div className="flex flex-col items-center">
                            <div className="grid justify-center grid-flow-col grid-rows-1 gap-16 p-12 custom-flex">
                                <div className="mt-16">
                                    <h6 className="mb-4 text-lg text-black font-tiempos">Visionary</h6>
                                    <p className="leading-6 font-acumin text-sm text-[#595959] md:w-72">
                                        We envision a future where brands transcend boundaries, leveraging digital prowess to inspire and engage audiences worldwide.
                                    </p>
                                </div>
                                <div className="mt-16">
                                    <h6 className="mb-4 text-lg text-black font-tiempos">Collaborative:</h6>
                                    <p className="leading-6 font-acumin text-sm text-[#595959] md:w-72">
                                        We believe in the power of collaboration, working hand-in-hand with our clients to transform their visions into digital realities.
                                    </p>
                                </div>
                                <div className="mt-16">
                                    <h6 className="mb-4 text-lg text-black font-tiempos">Cutting-Edge:</h6>
                                    <p className="leading-6 font-acumin text-sm text-[#595959] md:w-72">
                                        Our approach is rooted in cutting-edge technology and forward-thinking strategies, ensuring our clients stay ahead of the curve.
                                    </p>
                                </div>
                            </div>
                            <div className="grid justify-center grid-flow-col grid-rows-1 gap-16 p-12 custom-flex">
                                <div className="mt-16">
                                    <h6 className="mb-4 text-lg text-black font-tiempos">Results-Driven</h6>
                                    <p className="leading-6 font-acumin text-sm text-[#595959] md:w-72">
                                        Our focus is on delivering measurable results, driving tangible impact and ROI for our clients in the dynamic digital landscape.
                                    </p>
                                </div>
                                <div className="mt-16">
                                    <h6 className="mb-4 text-lg text-black font-tiempos">Innovative:</h6>
                                    <p className="leading-6 font-acumin text-sm text-[#595959] md:w-72">
                                        Innovation is at the heart of everything we do, fueling our creativity and driving transformative change for brands across industries.
                                    </p>
                                </div>
                                <div className="mt-16">
                                    <h6 className="mb-4 text-lg text-black font-tiempos">Forward-Thinking:</h6>
                                    <p className="leading-6 font-acumin text-sm text-[#595959] md:w-72">
                                        Our mindset is forward-thinking, always looking ahead to anticipate trends and opportunities that will shape the future of digital branding
                                    </p>
                                </div>
                            </div>
                            <Link href={pathname} scroll={false}>
                                <button type="button" className="font-2xl py-2 px-4 text-dark bg-[#EBFA0B]">Close</button>
                            </Link>
                        </div>
                    </div>
                </dialog>
            }
        </>
    );
}