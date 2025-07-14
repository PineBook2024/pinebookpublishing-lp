import React, { useState } from 'react';



// Object
const videoClient = [
    {
        id: 1,
        src: "https://www.youtube.com/embed/xUTyiqPY6Oo",
        type: "video/mp4",
        BookTitle: "Love And Laughter",
        Consultant: "Damon Peters",
        ProjectManager: "Amara Johnson & Ryan Peters",
        clientname: "Lesvi Ferrel"
    },

    {
        id: 2,
        src: "https://www.youtube.com/embed/QMirTma0Wf4",
        type: "video/mp4",
        BookTitle: "Rising 2 B’Come",
        Consultant: "Damon Peters",
        ProjectManager: "Amara Johnson & Melissa",
        clientname: "Stacey L. Joiner"
    },
    {
        id: 3,
        src: "https://www.youtube.com/embed/Tv3_r0EMVH4",
        type: "video/mp4",
        BookTitle: "Stewart, BC History",
        Consultant: "Damon Peters",
        ProjectManager: "Amara Johnson & Ryan Peters",
        clientname: "Robert A. Eckess"
    },
    {
        id: 4,
        src: "https://www.youtube.com/embed/fX2J8iMy4z4",
        type: "video/mp4",
        BookTitle: "Free Yourself From Pain",
        Consultant: "Damon Peters",
        ProjectManager: "Ryan Peters",
        clientname: "Lesvi Ferrel"
    },
    {
        id: 5,
        src: "https://www.youtube.com/embed/gWW43Tfa8gA",
        type: "video/mp4",
        BookTitle: "The 2023 Elections in Nigeria: Actors, Intrigues, and Winners",
        Consultant: "Damon Peters",
        ProjectManager: "Lia Sinclair & Ryan Peters",
        clientname: "Edward Agbai"
    },
    {
        id: 6,
        src: "https://www.youtube.com/embed/6T96-bq6_g8",
        type: "video/mp4",
        BookTitle: "Thorns are More Deadly",
        Consultant: "Steve Hayes",
        ProjectManager: "Lia Sinclair & Ryan Peters",
        clientname: "Katie Loftis"
    },
    {
        id: 7,
        src: "https://www.youtube.com/embed/pPa-W6unmv0",
        type: "video/mp4",
        BookTitle: "Who will Love me?",
        Consultant: "Damon Peters",
        ProjectManager: "Amara Johnson & Ryan Peters",
        clientname: "John B. Micheal"
    },
    {
        id: 8,
        src: "https://www.youtube.com/embed/7X_BkleuUsA",
        type: "video/mp4",
        BookTitle: " I am a BOY | i am a GIRL",
        Consultant: "Damon Peters",
        ProjectManager: "Ryan Peters",
        clientname: "Pamela Harry"
    },
    {
        id: 9,
        src: "https://www.youtube.com/embed/mGLHZO-DjRg",
        type: "video/mp4",
        BookTitle: "The Well of Hopes: Bloodlines",
        Consultant: "Damon Peters",
        ProjectManager: "Lia Sinclair & Ryan Peters",
        clientname: "Angel Raices"
    },
    {
        id: 10,
        src: "https://www.youtube.com/embed/P91rheXIDzk",
        type: "video/mp4",
        BookTitle: "Fate: The Alpha King and HisFate: The Alpha King and His Unexpected Mate",
        Consultant: "Damon Peters",
        ProjectManager: "Samantha Lewis & Ryan Peters",
        clientname: "Ashlee Griffin"
    },
    {
        id: 11,
        src: "https://www.youtube.com/embed/IsRZv2mR4u0",
        type: "video/mp4",
        BookTitle: "Vetting the Book of Enoch",
        Consultant: "Damon Peters",
        ProjectManager: "Lia Sinclair",
        clientname: "Christopher Allen"
    },
    {
        id: 12,
        src: "https://www.youtube.com/embed/Jwr-u5HQ9Fg?si=PEZvbrKNR1Y0xUH4",
        type: "video/mp4",
        BookTitle: "There's no middle ground, You will either RUN TO or RUN FROM this book",
        Consultant: "Damon Peters",
        ProjectManager: "Lia Sinclair",
        clientname: "John Bowman"

    },
    {
        id: 13,
        src: "https://www.youtube.com/embed/p3dCJ_KdqHk?si=il3lcE_7bLVJDGmp",
        type: "video/mp4",
        BookTitle: "Ellas's Songs",
        Consultant: "Damon Peters",
        ProjectManager: "Amara Johnson & Lia Sinclair",
        clientname: "David Van Fleet"
    },
    {
        id: 14,
        src: "https://www.youtube.com/embed/VsO2MhLTZPk",
        type: "video/mp4",
        BookTitle: "Go Ask Sabrina",
        Consultant: "Damon Peters",
        ProjectManager: "Lia Sinclair",
        clientname: "Sabrina Biamby"
    },
    {
        id: 15,
        src: "https://www.youtube.com/embed/_a6emmDhe7c",
        type: "video/mp4",
        BookTitle: "The Other Side (Part 1 & Part 2)",
        Consultant: "Steve Hayes",
        ProjectManager: "Lia Sinclair",
        clientname: "Unique Moore"
    },
]



export default function LazyYouTube({ videoId }) {
    const [isPlayerActive, setIsPlayerActive] = useState(false);
    return (
        <>

            <section className='sec-test max-w-screen-xl'>
                <div className='testimonials-wrap grid grid-cols-1 gap-10'>

                    <div className="relative w-full aspect-video">
                        {isPlayerActive ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="rounded-lg"
                            />
                        ) : (
                            <div
                                className="w-full h-full bg-gray-300 flex items-center justify-center cursor-pointer"
                                onClick={() => setIsPlayerActive(true)}
                            >
                                <img
                                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                    alt="Video Thumbnail"
                                    className="rounded-lg w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-3xl">
                                    ▶
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

        </>
    )

}
