import Head from "next/head";
import { useState } from "react";
import { useStore } from "../context/StoreContext";

export default function Login() {
  const store = useStore();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("Login Successful ");

        // Save token to localStorage
        localStorage.setItem("token", data.token);
        
        // If store has refresh methods, call them
        if (store?.fetchWishlist) {
          store.fetchWishlist();
        }

        window.location.href = "/shop";
      } else {
        alert("Error: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Head>
        <title>Pixio - Login | DexignZone</title>

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="DexignZone" />
        <meta name="robots" content="index, follow" />
        <meta name="format-detection" content="telephone=no" />

        <meta
          name="description"
          content="Login to your Pixio eCommerce account."
        />

        {/* Favicon */}
        <link rel="icon" href="/assets/images/favicon.png" />

        {/* Styles */}
        <link rel="stylesheet" href="/assets/icons/iconly/index.min.css" />
        <link rel="stylesheet" href="/assets/icons/fontawesome/css/all.min.css" />
        <link rel="stylesheet" href="/assets/icons/flaticon/flaticon_pixio.css" />
        <link rel="stylesheet" href="/assets/icons/themify/themify-icons.css" />
        <link rel="stylesheet" href="/assets/icons/line-awesome/css/line-awesome.min.css" />
        <link rel="stylesheet" href="/assets/icons/feather/css/iconfont.css" />

        <link rel="stylesheet" href="/assets/vendor/niceselect/css/nice-select.css" />
        <link rel="stylesheet" href="/assets/vendor/magnific-popup/magnific-popup.min.css" />
        <link rel="stylesheet" href="/assets/vendor/swiper/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/vendor/nouislider/nouislider.min.css" />
        <link rel="stylesheet" href="/assets/vendor/animate/animate.css" />
        <link rel="stylesheet" href="/assets/vendor/slick/slick.css" />
        <link rel="stylesheet" href="/assets/vendor/lightgallery/dist/css/lightgallery.css" />
        <link rel="stylesheet" href="/assets/vendor/lightgallery/dist/css/lg-thumbnail.css" />
        <link rel="stylesheet" href="/assets/vendor/lightgallery/dist/css/lg-zoom.css" />

        {/* Main CSS */}
        <link rel="stylesheet" href="/assets/css/style.css" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="page-content bg-light">
        <section className="px-4">
          <div className="row align-center-center">

            {/* LEFT SIDE */}
            <div className="col-xxl-6 lg:w-1/2 w-full relative bg-[#FFEDD4] z-1 
      after:content-[''] after:absolute after:bottom-0 after:left-[16%] 
      after:w-[51%] after:h-3/5 after:bg-white after:rounded-t-full 
      after:z-[-2] start-side-content">

        <div className="dz-bnr-inr-entry">
          <h1 style={{ fontWeight: 'bold' }} className="xl:text-[40px] md:text-4xl sm:text-3xl text-2xl mb-2">
            My Account
          </h1>

          <nav className="mb-4">
            <ul>
              <li className="mr-[3px] inline-block text-base font-medium">
                <a href="/">Home</a>
              </li>

             <li className="mr-[3px] pl-2 inline-block text-base font-medium">
    Login
</li>
            </ul>
          </nav>
        </div>

        <div className="text-right relative -z-1 m-auto -mt-[90px] max-3xl:mt-0 registration-media">
          <img src="/images/bb-01.png" alt="" />
        </div>
      </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col w-full col-xxl-6 lg:w-1/2">
              <div className="p-20 max-w-[522px] m-auto rounded-[20px] border border-secondary w-full 
              max-xl:p-7 max-sm:!p-4">

                <h2 className="mb-2 text-center md:text-[28px] text-2xl font-bold">
                  Login Now
                </h2>

                <p className="text-base text-center mb-7">
                  Welcome back! Please login to your account
                </p>

                <form onSubmit={handleSubmit}>

                  {/* EMAIL */}
                  <div className="mb-6">
                    <label className="block mb-1 font-medium">
                      Email Address
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="Email Address"
                      className="w-full py-4 px-5 h-[54px] outline-none rounded-xl border border-black bg-white"
                      type="email"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="mb-10">
                    <label className="block mb-1 font-medium">
                      Password
                    </label>

                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full py-4 px-5 h-[54px] outline-none rounded-xl border border-black bg-white"
                      />

                      <div className="absolute right-3 top-1/2 translate-y-[-50%]">
                        <i className="fa-regular fa-eye"></i>
                      </div>
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="text-center">

                    <button
                      type="submit"
                      className="py-3 mr-2 text-base font-medium text-white uppercase border btn px-7 border-secondary bg-secondary rounded-xl">
                      Login
                    </button>

                    <a
                      href="/register"
                      className="py-3 text-base font-medium uppercase border btn px-7 border-secondary hover:bg-secondary hover:text-white rounded-xl">
                      Register
                    </a>

                  </div>

                </form>
              </div>
            </div>

          </div>
        </section>
      </div>

       <footer className="relative z-1 overflow-hidden border-t border-black/10 !bg-[#FCFBF4] bg-none">
  {/* Footer Top */}
  <div className="pt-[90px] max-lg:pt-13.5 pb-14.5 max-lg:pb-5 max-md:!pb-0">
    <div className="container">
      <div className="row">
        <div className="w-full xl:w-1/4 md:w-1/3 sm:w-1/2 wow fadeInUp" data-wow-delay="0.1s">
          <div className="mb-7.5 widget_about mr-2">
            <div className="mb-6">
              <a href="index.html">
                <img src="assets/images/logo.svg" alt="" className="max-w-[180px]" />
              </a>
            </div>
            <ul className="mb-6">
              <li className="py-1 font-medium text-2sm">
                <p><span>Address</span> : 451 Wall Street, UK, London</p>
              </li>
              <li className="py-1 font-medium text-2sm">
                <p><span>E-mail</span> : example@info.com</p>
              </li>
              <li className="py-1 font-medium text-2sm">
                <p><span>Phone</span> : (064) 332-1233</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="w-full xl:w-1/4 md:w-1/3 sm:w-1/2 wow fadeInUp" data-wow-delay="0.2s">
          <div className="mb-7.5">
            <h5 className="text-xl leading-[1.2] mb-5">Recent Posts</h5>
            <ul>
              {[{ img: "1.png", title: "Cozy Knit Cardigan Sweater", date: "July 23, 2024" },
                { img: "2.png", title: "Sophisticated Swagger Suit", date: "July 23, 2024" },
                { img: "3.png", title: "Athletic Mesh Sports Leggings", date: "July 23, 2024" }].map((post, i) => (
                <li key={i} className="flex items-center mb-4">
                  <div className="size-14.5 min-w-14.5 mr-3.6">
                    <img src={`assets/images/shop/product/small/${post.img}`} alt="" className="w-full rounded-xl" />
                  </div>
                  <div>
                    <h6><a href="post-standard.html">{post.title}</a></h6>
                    <span className="text-2xs">{post.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Our Stores */}
        <div className="w-1/2 xl:w-1/6 sm:w-1/3 wow fadeInUp" data-wow-delay="0.3s">
          <div className="mb-7.5 font-medium">
            <h5 className="text-xl leading-[1.2] mb-5">Our Stores</h5>
            <ul>
              {["New York", "London SF", "Edinburgh", "Los Angeles", "Chicago", "Las Vegas"].map((store, i) => (
                <li key={i} className="py-2 leading-5 text-2sm">
                  <a className="hover:text-primary" href="#">{store}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Useful Links */}
        <div className="w-1/2 xl:w-1/6 sm:w-1/3 wow fadeInUp" data-wow-delay="0.4s">
          <div className="mb-7.5 font-medium">
            <h5 className="text-xl leading-[1.2] mb-5">Useful Links</h5>
            <ul>
              {["Privacy Policy", "Returns", "Terms & Conditions", "Contact Us", "Latest News", "Our Sitemap"].map((link, i) => (
                <li key={i} className="py-2 leading-5 text-2sm">
                  <a className="hover:text-primary" href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Menu */}
        <div className="w-full xl:w-1/6 sm:w-1/3 wow fadeInUp" data-wow-delay="0.5s">
          <div className="mb-7.5 font-medium">
            <h5 className="text-xl leading-[1.2] mb-5">Footer Menu</h5>
            <ul>
              {["Instagram profile", "New Collection", "Woman Dress", "Contact Us", "Latest News"].map((item, i) => (
                <li key={i} className="py-2 leading-5 text-2sm">
                  <a className="hover:text-primary" href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="footer-bottom">
    <div className="container">
      <div className="font-semibold border-t row py-7 max-sm:py-5 border-black/10 text-2sm max-sm:text-sm wow fadeInUp" data-wow-delay="0.1s">
        <div className="w-full lg:w-1/2 text-start max-lg:text-center">
          <p className="copyright-text">
            © <span className="current-year">2024 </span>
            <a className="text-primary" target="_blank" rel="noopener noreferrer" href="https://www.dexignzone.com/">
              DexignZone
            </a> Theme. All Rights Reserved.
          </p>
        </div>
        <div className="lg:w-1/2 w-full text-end max-lg:text-center max-lg:mt-3.6">
          <div className="flex items-center justify-center md:justify-center xl:justify-end">
            <span className="mr-4">We Accept: </span>
            <img src="assets/images/footer-img.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Footer Bottom End */}
</footer>
    </>
  );
}