import React from 'react'
import NewBrandFooter from "./components/NewBrandFooter";
import BrandTopBar from "./components/BrandTopBar";
import BrandNavbar from "./components/BrandNavbar";
import Link from 'next/link';
import Image from 'next/image';
import Head from "next/head";





const notFound = () => {
  return (
    <div>
         <Head>
                <title>Hire Professional Book Writers | 404</title>
                <meta name="description" content="404"
                />
                <link rel="shortcut icon" href="/images/fav.webp" />
            </Head>
      <header id="navbar" className="header-404 bg-transparent left-0 flex justify-between items-center p-4 z-10">
                <div className='max-w-screen-xl flex justify-between items-center mx-auto w-full'>
                    <div>
                        <Link href="/" className="text-xl font-bold text-white">
                            <Image className='logo' src={'/brand-img/logo.png'} width={200} height={80} alt="brand logo" loading="lazy" />
                        </Link>
                    </div>
                </div>
            </header>

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

        <div className="copyright-sec copyright-sec-404">
                    <div className="container text-center mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-white w-full md:text-center text-sm sm:text-left">
                            Copyright © 2024 <span className="powered-by-text"><Link href="https://www.pinebookwriting.com/" >Pine Book Writing Inc.</Link></span> | All Rights Reserved.
                            <Link
                                href="/terms-and-conditions"
                                rel="noopener noreferrer"
                                className="text-white ml-1"
                                target="_blank"
                            >
                                Terms & Conditions |
                            </Link>
                            <Link
                                href="/privacy-policy"
                                rel="noopener noreferrer"
                                className="text-white ml-1"
                                target="_blank"
                            >
                                Privacy Policy 
                            </Link>
                            {/* Powered by <span className="powered-by-text"><Link href="https://www.pinebookwriting.com/" target="_blank">Pine Book Writing Inc.</Link></span> */}
                        </p>
                    </div>
                </div>
      
    </div>
  )
}

export default notFound
