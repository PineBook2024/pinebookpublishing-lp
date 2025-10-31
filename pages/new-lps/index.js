"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="font-sans text-gray-800">


      {/* ------------------ HEADER ------------------ */}

      <header>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 gap-10">
          <div className="flex flex-row justify-between items-center py-6">
            <Image
              src="/images/logo.png"
              alt="PineBookPublishing Logo"
              width={200}
              height={60}
            />
              <button className="px-8 py-3 rounded-full font-semibold bg-[#f9a825] text-[#064c3b] border-2 border-[#f9a825]  duration-300 hover:bg-[#064c3b] hover:text-[#f9a825] hover:border-[#f9a825] hover:opacity-100">
                Get Started
              </button>
          </div>
        </div>
      </header>

      {/* ------------------ HERO SECTION ------------------ */}
      <section className="relative bg-[#0a2c24] text-white min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.webp"
            alt="Hero Background"
            fill
            className="object-cover opacity-30"
          />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          {/* Left Text */}
          <div className="flex flex-col justify-center space-y-6">
            <h5 className="text-2xl text-bold">RANKED #1 PUBLISHING COMPANY</h5>
            <h1 className="text-4xl md:text-5xl font-bold leading-snug">
              The Best Book Publishing,
              <br /> Book Editing & Marketing Solutions!
            </h1>
            <p className="text-lg text-gray-200 uppercase">
              WE HAVE A TRACK RECORD OF PUBLISHING THOUSANDS OF SUCCESSFUL MANUSCRIPTS METICULOUSLY WRITTEN, EDITED, DESIGNED, AND FORMATTED. MANY OF THE PUBLISHED WORKS WE HAVE DONE FOR OUR CLIENTS HAVE CREATED A BUZZ IN THE LITERARY SPHERE AND RANKED AMONG THE BEST SELLERS.


            </p>
            <div className="flex gap-4 mt-6">
              {/* Primary Button */}
              <button className="px-8 py-3 rounded-full font-semibold bg-[#f9a825] text-[#064c3b] border-2 border-[#f9a825]  duration-300 hover:bg-[#064c3b] hover:text-[#f9a825] hover:border-[#f9a825] hover:opacity-100">
                Get Started
              </button>

              {/* Secondary Button */}
              <button className="px-8 py-3 rounded-full font-semibold bg-transparent text-[#f9a825] border-2 border-[#f9a825]  duration-300 hover:bg-[#f9a825] hover:text-[#064c3b] hover:border-[#f9a825] hover:opacity-100">
                Learn More
              </button>
            </div>






          </div>



          {/* Right Offer Box */}
          {/* <div className="bg-white text-gray-900 rounded-xl p-6 shadow-lg max-w-sm mx-auto">
            <h3 className="text-lg font-bold text-center mb-4">
              UP TO 50% OFF ON
            </h3>
            <ul className="space-y-2 text-center">
              <li>📘 Publishing Packages</li>
              <li>🖋️ Editing & Proofreading</li>
              <li>📢 Book Marketing</li>
              <li>🎨 Book Cover Designing</li>
              <li>💻 Website for Authors</li>
            </ul>
            <button className="mt-5 bg-[#f9a825] w-full py-3 rounded-md font-semibold">
              Get Quote
            </button>
          </div> */}
        </div>
      </section>

      {/* ------------------ COUNTER SECTION ------------------ */}
      <section className="bg-[#114333] text-white py-12 text-center">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-4xl font-bold">2500+</h2>
            <p className="text-sm text-gray-200 mt-1">Published Authors</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">400+</h2>
            <p className="text-sm text-gray-200 mt-1">Editing Experts</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">25000+</h2>
            <p className="text-sm text-gray-200 mt-1">Books Published</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">2 Mil+</h2>
            <p className="text-sm text-gray-200 mt-1">Happy Readers</p>
          </div>
        </div>
      </section>

      {/* ------------------ PORTFOLIO SECTION ------------------ */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-2">Our Portfolio</h2>
          <p className="text-gray-600 mb-8">
            A few of the bestselling books we’ve proudly published for our
            amazing authors.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-xl transition">
              <Image
                src="/images/book1.jpg"
                alt="Book 1"
                width={300}
                height={400}
                className="rounded-md mx-auto"
              />
              <p className="mt-3 font-semibold text-gray-700">
                Thoughts Above My Head
              </p>
              <p className="text-sm text-gray-500">by Jeremy Chang</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-xl transition">
              <Image
                src="/images/book2.jpg"
                alt="Book 2"
                width={300}
                height={400}
                className="rounded-md mx-auto"
              />
              <p className="mt-3 font-semibold text-gray-700">
                I love this version of myself
              </p>
              <p className="text-sm text-gray-500">by James D. Tabor</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-xl transition">
              <Image
                src="/images/book3.jpg"
                alt="Book 3"
                width={300}
                height={400}
                className="rounded-md mx-auto"
              />
              <p className="mt-3 font-semibold text-gray-700">
                Restoring Abrahamic Faith
              </p>
              <p className="text-sm text-gray-500">by Eve Langlais</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ CUSTOMER REVIEWS ------------------ */}
      <section className="bg-[#f9fafb] py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-6 rounded-xl shadow-md text-left">
              <div className="flex items-center mb-4 gap-3">
                <Image
                  src="/images/user1.jpg"
                  alt="User"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">Shalini Wall</p>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </div>
              <p className="text-gray-600">
                “Heritage Publishing made my first book journey smooth and
                enjoyable. Their editing and marketing team is phenomenal!”
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-left">
              <div className="flex items-center mb-4 gap-3">
                <Image
                  src="/images/user2.jpg"
                  alt="User"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">Dexter Tull</p>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </div>
              <p className="text-gray-600">
                “Professional team and high-quality output. They helped me
                publish my novel with a wonderful cover design and editing.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ BOOK SIGNING EVENTS ------------------ */}
      <section className="bg-[#fffaf2] py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">
            Exclusive Book Signing Events
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="overflow-hidden rounded-lg shadow">
              <Image
                src="/images/event1.jpg"
                alt="Event 1"
                width={400}
                height={300}
                className="object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow">
              <Image
                src="/images/event2.jpg"
                alt="Event 2"
                width={400}
                height={300}
                className="object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow">
              <Image
                src="/images/event3.jpg"
                alt="Event 3"
                width={400}
                height={300}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
