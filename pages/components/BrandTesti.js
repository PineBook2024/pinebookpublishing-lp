import React from 'react'
import Link from 'next/link';

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
]

const BrandTesti = () => {
    return (
        <div>
            <section className='sec-test max-w-screen-xl mx-auto py-20'>
                <div className="container mx-auto text-center m1-h mb-10">
                    <h3 className="mb-4 text-white text-2xl md:text-4xl font-poppins mt-5 font-bold">
                        Our Success Stories
                    </h3>
                    <p className="text-black">
                        Explore our Success Stories to see how Pine Book Publishing has
                        empowered authors <br></br> in their self-publishing journey and stands out
                        among self-book publishers.
                    </p>
                </div>
                <div className='testimonials-wrap gap-16 grid md:grid-rows-4 md:grid-flow-col grid-col'>

                    {videoClient.map((videoClient) => (
                        <Link href={videoClient.src} className="glightbox block">
                            <div className='' key={videoClient.id}>
                                {/* <h2 className="font-bold text-xl text-black" >{videoClient.clientname}</h2> */}
                                {/* <video height={400} width={400} controls loading="lazy" className="brand-story py-4">
                    <source src={videoClient.src} type={videoClient.type} />
                </video> */}
                                <iframe className='py-4' height={225} width={400} src={videoClient.src} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                                <h4 className='text-black'> <span className='font-bold leading-normal'>Book Title:</span> {videoClient.BookTitle}</h4>
                                <h4 className='text-black'><span className='font-bold leading-normal '>Consultant:</span> {videoClient.Consultant}</h4>
                                <h4 className='text-black'><span className='font-bold leading-normal '>Project Manager: </span>{videoClient.ProjectManager}</h4>
                            </div>
                        </Link>
                    ))}




                </div>
            </section>


        </div>





    )
}

export default BrandTesti
