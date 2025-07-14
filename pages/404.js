import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Head from "next/head";
import BrandNavbar from './components/BrandNavbar';
import BrandFooter from './components/BrandFooter';





const notFound = () => {
  return (
    <div>
         <Head>
                <title>Hire Professional Book Publishing | 404</title>
                <meta name="description" content="404"
                />
                <link rel="shortcut icon" href="/images/fav.webp" />
            </Head>
    
    <BrandNavbar />

            <section className="sec404 overflow-hidden">
              <div className='container mx-auto'>
              <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 items-center'>
                            
             

              <div className="box">
              <Image src={"/images/404-img.png"} width={600} height={600}
                layout="responsive"
                loading="lazy"
                alt="about img"/>
              </div>


              <div className="box1 ">
              <h1 className='font-poppins text-3xl md:text-6xl uppercase font-bold'>Lost in the plot?</h1>
              <p className='font-poppins text-xl text-left pt-3 w-8/12'>This page is not a part of our story. Let’s go back to writing yours!</p>
              <div>
                    <button className="brand-nav-btn shadow-xl mt-10 cursor-pointer btn-g"><Link href="/">Back To Home</Link></button>
                </div>
              </div>

              

              </div>
              </div>
          </section>

       <BrandFooter />
      
    </div>
  )
}

export default notFound
