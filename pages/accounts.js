import Head from 'next/head'
import Script from 'next/script'

import { useEffect, useState } from "react";
import CountryPhoneInput from "../components/CountryPhoneInput";
import axios from "axios";
import ApexCharts from "apexcharts";




export default function Shop() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Head>
  {/* TITLE */}
  <title>Pixio - Shop & eCommerce Tailwind CSS Template | DexignZone</title>

  {/* META */}
  <meta charSet="utf-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="author" content="DexignZone" />
  <meta name="robots" content="index, follow" />
  <meta name="format-detection" content="telephone=no" />

  <meta
    name="keywords"
    content="template, ui kit, clothing, delivery, ecommerce, fashion, order, shopping, store, fashion design, fashion store, responsive design, fashion showcase, modern design, fashion technology, e-shop, ecommerce web, eCommerce Website, minimal shop, online shop, online shopping, pixio, user experience, Design Elements, Trendy, Stylish, User-Friendly, Navigation, Product Display, Branding, Development, Visual Design, UI/UX, Website, Web Design"
  />
  <meta
    name="description"
    content="Elevate your online retail presence with Pixio Shop & eCommerce Tailwind CSS Template. Crafted with precision, this responsive and feature-rich template provides a seamless and visually stunning shopping experience. Explore a world of possibilities with modern design elements, intuitive navigation, and customizable features. Transform your website into a dynamic online storefront with Pixio, where style meets functionality for a captivating and user-friendly eCommerce journey."
  />

  <meta property="og:title" content="Pixio - Shop & eCommerce Tailwind CSS Template | DexignZone" />
  <meta property="og:description" content="Elevate your online retail presence with Pixio Shop & eCommerce Tailwind CSS Template..." />
  <meta property="og:image" content="https://pixio.dexignzone.com/tailwind/social-image.png" />

  {/* TWITTER */}
  <meta name="twitter:title" content="Pixio - Shop & eCommerce Tailwind CSS Template | DexignZone" />
  <meta name="twitter:description" content="Elevate your online retail presence with Pixio Shop & eCommerce Tailwind CSS Template..." />
  <meta name="twitter:image" content="https://pixio.dexignzone.com/tailwind/social-image.png" />
  <meta name="twitter:card" content="summary_large_image" />

  {/* FAVICON */}
  <link rel="icon" href="/assets/images/favicon.png" />

  {/* VIEWPORT */}
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  {/* STYLES */}
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

  {/* MAIN CSS */}
  <link rel="stylesheet" href="/assets/css/style.css" />

  {/* GOOGLE FONTS */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Roboto:wght@100;300;400;500;700;900&display=swap"
    rel="stylesheet"
  />
</Head>
     <header className="site-header mo-left header style-1 header-transparent">		
  {/* Main Header */}
  <div className="sticky-header main-bar-wraper navbar-expand-lg">
    <div className="main-bar !border-b !border-black/10 after:block after:content-[''] after:clear-both">
      <div className="container-fluid after:block after:content-[''] after:clear-both lg:flex block">
        {/* Website Logo */}
        <div className="logo-header logo-dark md:mr-12">
          <a href="index.html"><img src="/assets/images/logo.svg" alt="logo" /></a>
        </div>
        
        {/* Nav Toggle Button */}
      
        <button className="justify-end navbar-toggler collapsed navicon" type="button">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* Main Nav */}
        <div className="justify-start header-nav w3menu navbar-collapse" id="navbarNavDropdown">
          <div className="logo-header logo-dark">
            <a href="index.html"><img src="/assets/images/logo.svg" alt="" /></a>
          </div>
          <ul className=" nav navbar-nav">
            <li className="has-mega-menu sub-menu-down auto-width menu-left">
              <a href="javascript:void(0);"><span>Home</span><i className="fas fa-chevron-down tabindex"></i></a>
              <div className="mega-menu ">
                <ul className="mb-0 demo-menu">
                  <li>
                    <a href="index.html">
                      <img src="/assets/images/demo/demo-1.png" alt="/" />
                      <span className="menu-title">01 Home Page</span>
                    </a>
                  </li>
                  <li>
                    <a href="index-2.html">
                      <img src="/assets/images/demo/demo-2.png" alt="/" />
                      <span className="menu-title">02 Home Page</span>
                    </a>
                  </li>
                  <li>
                    <a href="index-3.html">
                      <img src="/assets/images/demo/demo-3.png" alt="/" />
                      <span className="menu-title">03 Home Page</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="has-mega-menu sub-menu-down">
              <a href="javascript:void(0);"><span>Shop</span><i className="fas fa-chevron-down tabindex"></i></a>
              <div className="mega-menu shop-menu">
                <ul>
                  <li className="side-left">
                    <ul>
                      <li><a href="javascript:void(0);" className="menu-title">Shop Structure</a>
                        <ul>
                          <li><a href="shop-standard.html">Shop Standard</a></li>
                          <li><a href="shop-list.html">Shop List</a></li>
                          <li><a href="shop-with-category.html">Shop With Category</a></li>
                          <li><a href="shop-filters-top-bar.html">Shop Filters Top Bar</a></li>
                          <li><a href="shop-sidebar.html">Shop Sidebar</a></li>
                          <li><a href="shop-style-1.html">Shop Style 1</a></li>
                          <li><a href="shop-style-2.html">Shop Style 2</a></li>
                        </ul>
                      </li>
                      <li><a href="javascript:void(0);" className="menu-title">Product Structure</a>
                        <ul>
                          <li><a href="product-default.html">Default</a></li>
                          <li><a href="product-thumbnail.html">Thumbnail</a></li>
                          <li><a href="product-grid-media.html">Grid Media</a></li>
                          <li><a href="product-carousel.html">Carousel</a></li>
                          <li><a href="product-full-width.html">Full Width</a></li>
                        </ul>
                      </li>
                      <li><a href="javascript:void(0);" className="menu-title">Shop Pages</a>
                        <ul>						
                          <li><a href="shop-wishlist.html">Wishlist</a></li>
                          <li><a href="shop-cart.html">Cart</a></li>
                          <li><a href="shop-checkout.html">Checkout</a></li>
                          <li><a href="shop-compare.html">Compare</a></li>
                          <li><a href="shop-order-tracking.html">Order Tracking</a></li>
                          <li><a href="shop-my-account.html">My Account</a></li>
                          <li><a href="shop-registration.html">Registration</a></li>
                        </ul>
                      </li>
                      <li className="month-deal">
                        <div className="clearfix mr-4">
                          <h3>Deal of the month</h3>
                          <p className="text-2xs">Yes! Send me exclusive offers, personalised, and unique gift ideas, tips for shopping on Pixio <a href="shop-standard.html" className="dz-link-2">View All Products</a></p>
                        </div>
                        <div className="sale-countdown">
                          <div className="text-center countdown">
                            <div className="date">
                              <span className="time days text-primary"></span>
                              <span className="work-time">Days</span>
                            </div>
                            <div className="date">
                              <span className="time hours text-primary"></span>
                              <span className="work-time">Hours</span>
                            </div>
                            <div className="date">
                              <span className="time mins text-primary"></span>
                              <span className="work-time">Minutess</span>
                            </div>
                            <div className="date">
                              <span className="time secs text-primary"></span>
                              <span className="work-time">Second</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="side-right">
                    <div className="adv-media">
                      <img src="/assets/images/adv-1.png" alt="/" />
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="has-mega-menu sub-menu-down auto-width">
              <a href="javascript:void(0);"><span>Blog</span><i className="fas fa-chevron-down tabindex"></i></a>
              <div className="mega-menu">
                <ul>
                  <li>
                    <a href="javascript:void(0);" className="menu-title">Blog Dark Style</a>
                    <ul>
                      <li><a href="blog-dark-2-column.html">Blog 2 Column</a></li>
                      <li><a href="blog-dark-2-column-sidebar.html">Blog 2 Column Sidebar</a></li>
                      <li><a href="blog-dark-3-column.html">Blog 3 Column</a></li>
                      <li><a href="blog-dark-half-image.html">Blog Half Image</a></li>
                    </ul>
                    <a href="javascript:void(0);" className="menu-title">Blog Light Style</a>
                    <ul>
                      <li><a href="blog-light-2-column.html">Blog 2 Column</a></li>
                      <li><a href="blog-light-2-column-sidebar.html">Blog 2 Column Sidebar</a></li>
                      <li><a href="blog-light-half-image.html">Blog Half Image</a></li>
                      <li><a href="blog-exclusive.html">Blog Exclusive</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:void(0);" className="menu-title">Blog Sidebar</a>
                    <ul>
                      <li><a href="blog-left-sidebar.html">Blog left Sidebar</a></li>
                      <li><a href="blog-right-sidebar.html">Blog Right Sidebar</a></li>
                      <li><a href="blog-both-sidebar.html">Blog Both Sidebar</a></li>
                      <li><a href="blog-wide-sidebar.html">Blog Wide Sidebar</a></li>
                    </ul>
                    <a href="javascript:void(0);" className="menu-title">Blog Page</a>
                    <ul>
                      <li><a href="blog-archive.html">Blog Archive</a></li>
                      <li><a href="blog-author.html">Author</a></li>
                      <li><a href="blog-category.html">Blog Category</a></li>
                      <li><a href="blog-tag.html">Blog Tag</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:void(0);" className="menu-title">Blog Details</a>
                    <ul>	
                      <li><a href="post-standard.html">Post Standard</a></li>
                      <li><a href="post-left-sidebar.html">Post Left Sidebar</a></li>
                      <li><a href="post-header-image.html">Post Header Image</a></li>
                      <li><a href="post-slide-show.html">Post Slide Show</a></li>
                      <li><a href="post-side-image.html">Post Side Image</a></li>
                      <li><a href="post-gallery.html">Post Gallery</a></li>
                      <li><a href="post-gallery-alternative.html">Post Gallery Alternative</a></li>
                      <li><a href="post-open-gutenberg.html">Post Open Gutenberg</a></li>
                      <li><a href="post-link.html">Post Link</a></li>
                      <li><a href="post-audio.html">Post Audio</a></li>
                      <li><a href="post-video.html">Post Video</a></li>
                    </ul>
                  </li>
                  <li className="post-menu">
                    <a href="javascript:void(0);" className="menu-title">Recent Posts</a>
                    <div className="pt-2 widget widget_post">
                      <ul className="mb-3.6">
                        <li className="relative flex items-center mb-4">
                          <div className="mr-3.6 size-14.5 min-w-14.5">
                            <img src="/assets/images/shop/product/small/1.png" alt="" className="w-full rounded-xl" />
                          </div>
                          <div className="dz-content">
                            <h6><a className="font-medium text-2sm !text-title" href="post-standard.html">Cozy Knit Cardigan Sweater</a></h6>
                            <span className="text-2xs">July 23, 2024</span>
                          </div>
                        </li>
                        <li className="relative flex items-center mb-4">
                          <div className="mr-3.6 size-14.5 min-w-14.5">
                            <img src="/assets/images/shop/product/small/2.png" alt="" className="w-full rounded-xl" />
                          </div>
                                                    <div className="dz-content">
                            <h6><a className="font-medium text-2sm !text-title" href="post-standard.html">Sophisticated Swagger Suit</a></h6>
                            <span className="text-2xs">July 23, 2024</span>
                          </div>
                        </li>
                        <li className="relative flex items-center mb-4">
                          <div className="mr-3.6 size-14.5 min-w-14.5">
                            <img src="/assets/images/shop/product/small/3.png" alt="" className="w-full rounded-xl" />
                          </div>
                          <div className="dz-content">
                            <h6><a className="font-medium text-2sm !text-title" href="post-standard.html">Athletic Mesh Sports Leggings</a></h6>
                            <span className="text-2xs">July 23, 2024</span>
                          </div>
                        </li>
                        <li className="relative flex items-center mb-4">
                          <div className="mr-3.6 size-14.5 min-w-14.5">
                            <img src="/assets/images/shop/product/small/4.png" alt="" className="w-full rounded-xl" />
                          </div>
                          <div className="dz-content">
                            <h6><a className="font-medium text-2sm !text-title" href="post-standard.html">Satin Wrap Party Blouse</a></h6>
                            <span className="text-2xs">July 23, 2024</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="has-mega-menu sub-menu-down">
              <a href="javascript:void(0);"><span>Portfolio</span><i className="fas fa-chevron-down tabindex"></i></a>
              <div className="mega-menu portfolio-menu">
                <ul>
                  <li className="side-left">
                    <ul className="portfolio-nav-link">
                      <li>
                        <a href="portfolio-tiles.html">
                          <img src="/assets/images/portfolio/icons/portfolio-tiles.svg" alt="/" />
                          <span>Portfolio Tiles</span>
                        </a>
                      </li>
                      <li>
                        <a href="collage-style-1.html">
                          <img src="/assets/images/portfolio/icons/collage-style-1.svg" alt="/" />
                          <span>Collage Style 1</span>
                        </a>
                      </li>
                      <li>
                        <a href="collage-style-2.html">
                          <img src="/assets/images/portfolio/icons/collage-style-2.svg" alt="/" />
                          <span>Collage Style 2</span>
                        </a>
                      </li>
                      <li>
                        <a href="masonry-grid.html">
                          <img src="/assets/images/portfolio/icons/masonry-grid.svg" alt="/" />
                          <span>Masonry Grid</span>
                        </a>
                      </li>
                      <li>
                        <a href="cobble-style-1.html">
                          <img src="/assets/images/portfolio/icons/cobble-style-1.svg" alt="/" />
                          <span>Cobble Style 1</span>
                        </a>
                      </li>
                      <li>
                        <a href="cobble-style-2.html">
                          <img src="/assets/images/portfolio/icons/cobble-style-2.svg" alt="/" />
                          <span>Cobble Style 2</span>
                        </a>
                      </li>
                      <li>
                        <a href="portfolio-thumbs-slider.html">
                          <img src="/assets/images/portfolio/icons/portfolio-thumbs-slider.svg" alt="/" />
                          <span>Portfolio Thumbs Slider</span>
                        </a>
                      </li>
                      <li>
                        <a href="portfolio-film-strip.html">
                          <img src="/assets/images/portfolio/icons/portfolio-film-strip.svg" alt="/" />
                          <span>Portfolio Film Strip</span>
                        </a>
                      </li>
                      <li>
                        <a href="carousel-showcase.html">
                          <img src="/assets/images/portfolio/icons/carousel-showcase.svg" alt="/" />
                          <span>Carousel Showcase</span>
                        </a>
                      </li>
                      <li>
                        <a href="portfolio-split-slider.html">
                          <img src="/assets/images/portfolio/icons/portfolio-split-slider.svg" alt="/" />
                          <span>Portfolio Split Slider</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="side-right line-left">
                    <a href="javascript:void(0);" className="menu-title">Portfolio Details</a>
                    <ul>
                      <li><a href="portfolio-details-1.html">Portfolio Details 1</a></li>
                      <li><a href="portfolio-details-2.html">Portfolio Details 2</a></li>
                      <li><a href="portfolio-details-3.html">Portfolio Details 3</a></li>
                      <li><a href="portfolio-details-4.html">Portfolio Details 4</a></li>
                      <li><a href="portfolio-details-5.html">Portfolio Details 5</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li className="has-mega-menu sub-menu-down wide-width">
              <a href="javascript:void(0);"><span>Pages</span><i className="fas fa-chevron-down tabindex"></i></a>
              <div className="mega-menu">
                <ul>
                  <li>
                    <a href="javascript:void(0);" className="menu-title">Pages</a>
                    <ul>
                      <li><a href="about-us.html">About Us</a></li>
                      <li><a href="about-me.html">About Me</a></li>
                      <li><a href="pricing-table.html">Pricing Table</a></li>
                      <li><a href="our-gift-vouchers.html">Our Gift Vouchers</a></li>
                      <li><a href="what-we-do.html">What We Do</a></li>
                      <li><a href="faqs-1.html">Faqs 1</a></li>
                      <li><a href="faqs-2.html">Faqs 2</a></li>
                      <li><a href="our-team.html">Our Team</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:void(0);" className="menu-title">Contact Us</a>
                    <ul>
                      <li><a href="contact-us-1.html">Contact Us 1</a></li>
                      <li><a href="contact-us-2.html">Contact Us 2</a></li>
                      <li><a href="contact-us-3.html">Contact Us 3</a></li>
                    </ul>
                    <a href="javascript:void(0);" className="menu-title">Web Pages</a>
                    <ul>
                      <li><a href="error-1.html">Error 404 1</a></li>
                      <li><a href="error-2.html">Error 404 2</a></li>
                      <li><a href="coming-soon.html">Coming Soon</a></li>
                      <li><a href="under-construction.html">Under Construction</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:void(0);" className="menu-title">Banner Style</a>
                    <ul>						
                      <li><a href="banner-with-bg-color.html">Banner with BG Color</a></li>
                      <li><a href="banner-with-image.html">Banner with Image</a></li>
                      <li><a href="banner-with-video.html">Banner with Video</a></li>
                      <li><a href="banner-with-kanbern.html">Banner with Kanbern</a></li>
                      <li><a href="banner-small.html">Banner Small</a></li>
                      <li><a href="banner-medium.html">Banner Medium</a></li>
                      <li><a href="banner-large.html">Banner Large</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:void(0);" className="menu-title">Header Style</a>
                    <ul>
                      <li><a href="header-style-1.html">Header Style 1</a></li>
                      <li><a href="header-style-2.html">Header Style 2</a></li>
                      <li><a href="header-style-3.html">Header Style 3</a></li>
                      <li><a href="header-style-4.html">Header Style 4</a></li>
                      <li><a href="header-style-5.html">Header Style 5</a></li>
                      <li><a href="header-style-6.html">Header Style 6</a></li>
                      <li><a href="header-style-7.html">Header Style 7</a></li>
                      <li className="w3menulink"><a href="w3menu.html">Menu Styles</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:void(0);" className="menu-title">Footer Style</a>
                    <ul>
                      <li><a href="footer-style-1.html">Footer Style 1</a></li>
                      <li><a href="footer-style-2.html">Footer Style 2</a></li>
                      <li><a href="footer-style-3.html">Footer Style 3</a></li>
                      <li><a href="footer-style-4.html">Footer Style 4</a></li>
                      <li><a href="footer-style-5.html">Footer Style 5</a></li>
                      <li><a href="footer-style-6.html">Footer Style 6</a></li>
                      <li><a href="footer-style-7.html">Footer Style 7</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:void(0);" className="menu-title">Dashboard</a>
                    <ul>
                      <li><a href="account-dashboard.html">Dashboard</a></li>
                      <li><a href="account-orders.html">Orders</a></li>
                      <li><a href="account-order-details.html">Orders Details</a></li>
                      <li><a href="account-order-confirmation.html">Orders Confirmation</a></li>
                      <li><a href="account-downloads.html">Downloads</a></li>
                      <li><a href="account-return-request.html">Return Request</a></li>
                      <li><a href="account-return-request-detail.html">Return Request Detail</a></li>
                      <li><a href="account-refund-requests-confirmed.html">Return Request Confirmed</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li className="sub-menu-down">
              <a href="javascript:void(0);"><span>My Account</span><i className="fas fa-chevron-down tabindex"></i></a>
              <ul className="sub-menu">						
                <li><a href="account-dashboard.html">Dashboard</a></li>
                <li><a href="account-orders.html">Orders</a></li>
                <li><a href="account-order-details.html">Orders Details</a></li>
                <li><a href="account-order-confirmation.html">Orders Confirmation</a></li>
                <li><a href="account-downloads.html">Downloads</a></li>
                <li><a href="account-return-request.html">Return Request</a></li>
                <li><a href="account-return-request-detail.html">Return Request Detail</a></li>
                <li><a href="account-refund-requests-confirmed.html">Return Request Confirmed</a></li>
                <li><a href="account-profile.html">Profile</a></li>
                <li><a href="account-address.html">Address</a></li>
                <li><a href="account-shipping-methods.html">Shipping methods</a></li>
                <li><a href="account-payment-methods.html">Payment Methods</a></li>
                <li><a href="account-review.html">Review</a></li>
                <li><a href="account-billing-address.html">Billing address</a></li>
                <li><a href="account-shipping-address.html">Shipping address</a></li>
                <li><a href="account-cancellation-requests.html">Cancellation Requests</a></li>
              </ul>
            </li>
          </ul>
          <div className="dz-social-icon">
            <ul>
              <li><a className="fab fa-facebook-f" target="_blank" rel="noreferrer" href="https://www.facebook.com/dexignzone"></a></li>
              <li><a className="fab fa-twitter" target="_blank" rel="noreferrer" href="https://twitter.com/dexignzones"></a></li>
              <li><a className="fab fa-linkedin-in" target="_blank" rel="noreferrer" href="https://www.linkedin.com/showcase/3686700/admin/"></a></li>
              <li><a className="fab fa-instagram" target="_blank" rel="noreferrer" href="https://www.instagram.com/dexignzone/"></a></li>
            </ul>
          </div>
        </div>
        
        {/* EXTRA NAV */}
        <div className="extra-nav" x-data="{ tab: 'shoppingcart' }">
          <div className="extra-cell">						
            <ul className="header-right">
              <li className="nav-item login-link">
                <a className="nav-link border-b border-[#0000005c]" href="shop-my-account.html">
                  Login / Register
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="offcanvas-btn" data-target="offcanvasTop">
                  <i className="iconly-Light-Search"></i>
                </a>
                              </li>
              <li>
                <a
                  className="offcanvas-btn"
                  href="javascript:void(0);"
                  data-target="offcanvasRight"
                >
                  <i className="iconly-Light-Heart2"></i>
                </a>
              </li>
              <li>
                <a
                  className="offcanvas-btn"
                  href="javascript:void(0);"
                  data-target="offcanvasRight"
                >
                  <i className="iconly-Broken-Buy"></i>
                  <span className="absolute -top-1 right-0.5 text-[11px] flex items-center justify-center min-h-4.5 min-w-4.5 font-bold rounded-full bg-primary text-white">5</span>
                </a>
              </li>
              <li className="filte-link">
                <a href="javascript:void(0);" className="filte-btn offcanvas-btn" data-target="offcanvasLeft">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 13" fill="none">
                    <rect y="11" width="30" height="2" fill="black" />
                    <rect width="30" height="2" fill="black" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Sidebar cart */}
          <div className="w-[485px] fixed z-[1045] flex flex-col max-full duration-500 top-0 bottom-0 right-0 bg-light right offcanvas is-closed" id="offcanvasRight">
            <button type="button" className="size-10 flex items-center justify-center absolute top-1.5 right-5 opacity-50 text-4.5xl offcanvas-close">
              &times;
            </button>
            <div className="flex-grow overflow-y-auto py-14.5 px-[75px] max-sm:py-13.5 max-sm:px-3.6">
              <div className="product-description">
                <div>
                  <ul className="flex flex-wrap justify-center border-b border-[#D7D7D7]" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="w-full py-2.5 px-5 text-start font-medium font-Lufga border-b-2 border-transparent mb-[-1px]"
                        id="shoppingcart"
                      >
                        Shopping Cart
                        <span className="text-xs inline-flex items-center justify-center size-6 font-bold rounded-full ml-1.1 px-0.5">5</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="w-full py-2.5 px-5 text-start font-medium font-Lufga border-b-2 border-transparent mb-[-1px]"
                        id="wishlist"
                      >
                        Wishlist
                        <span className="text-xs inline-flex items-center justify-center size-6 font-bold rounded-full ml-1.1 px-0.5">2</span>
                      </button>
                    </li>
                  </ul>
                  <div className="pt-6" id="dz-shopcart-sidebar">
                    <div>
                      <div className="flex flex-col min-h-[calc(100vh_-_190px)]">
                        <ul className="sidebar-cart-list">
                          <li>
                            <div className="py-5 border-b border-border">
                              <div className="flex items-center justify-center">
                                <div className="relative mr-4 overflow-hidden size-20 rounded-3xl">
                                  <img src="/assets/images/shop/shop-cart/pic1.jpg" alt="" className="w-full" />
                                </div>
                                <div className="mr-5 flex-[1]">
                                  <h6 className="mb-2 font-medium"><a href="product-thumbnail.html">Sophisticated Swagger Suit</a></h6>
                                  <div className="flex items-center">
                                    <div className="input-group">
                                      <span className="flex">
                                        <input type="button" value="-" data-field="quantity" className="button-minus size-7.5 leading-[27px] text-xl rounded-full text-center border border-secondary mr-2.5 mb-1.1 bg-secondary text-white" />
                                        <input type="number" step="1" defaultValue="1" name="quantity" className="touchspin size-7.5 leading-[27px] rounded-full text-center border border-secondary mr-2.5 mb-1.1 bg-light outline-none" />
                                        <input type="button" value="+" data-field="quantity" className="button-plus size-7.5 leading-[27px] text-xl rounded-full text-center border border-secondary mr-2.5 mb-1.1 bg-secondary text-white" />
                                      </span>
                                    </div>
                                    <h6 className="font-medium">$50.00</h6>
                                  </div>
                                </div>
                                <a href="javascript:void(0);" className="flex items-center size-7">
                                  <i className="ti-close"></i>
                                </a>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="py-5 border-b border-border">
                              <div className="flex items-center justify-center">
                                <div className="relative mr-4 overflow-hidden size-20 rounded-3xl">
                                  <img src="/assets/images/shop/shop-cart/pic2.jpg" alt="" className="w-full" />
                                </div>
                                <div className="mr-5 flex-[1]">
                                  <h6 className="mb-2 font-medium"><a href="product-thumbnail.html">Cozy Knit Cardigan Sweater</a></h6>
                                  <div className="flex items-center">
                                    <div className="input-group">
                                      <span className="flex">
                                        <input type="button" value="-" data-field="quantity" className="button-minus size-7.5 leading-[27px] text-xl rounded-full text-center border border-secondary mr-2.5 mb-1.1 bg-secondary text-white" />
                                        <input type="number" step="1" defaultValue="1" name="quantity" className="touchspin size-7.5 leading-[27px] rounded-full text-center border border-secondary mr-2.5 mb-1.1 bg-light outline-none" />
                                        <input type="button" value="+" data-field="quantity" className="button-plus size-7.5 leading-[27px] text-xl rounded-full text-center border border-secondary mr-2.5 mb-1.1 bg-secondary text-white" />
                                      </span>
                                    </div>
                                    <h6 className="font-medium">$40.00</h6>
                                  </div>
                                </div>
                                <a href="javascript:void(0);" className="flex items-center size-7">
                                  <i className="ti-close"></i>
                                </a>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="py-5 border-b border-border">
                              <div className="flex items-center justify-center">
                                <div className="relative mr-4 overflow-hidden size-20 rounded-3xl">
                                  <img src="/assets/images/shop/shop-cart/pic3.jpg" alt="" className="w-full" />
                                </div>
                                <div className="mr-5 flex-[1]">
                                  <h6 className="mb-2 font-medium"><a href="product-thumbnail.html">Athletic Mesh Sports Leggings</a></h6>
                                  <div className="flex items-center">
                                    <div className="input-group">
                                      <span className="flex">
                                        <input type="button" value="-" data-field="quantity" className="button-minus size-7.5 leading-[27px] text-xl rounded-full text-center border border-secondary mr-2.5 mb-1.1 bg-secondary text-white" />
                                        <input type="number" step="1" defaultValue="1" name="quantity" className="touchspin size-7.5 leading-[27px] rounded-full text-center border border-secondary mr-2.5 mb-1.1 bg-light outline-none" />
                                        <input type="button" value="+" data-field="quantity" className="button-plus size-7.5 leading-[27px] text-xl rounded-full text-center border border-secondary mr-2.5 mb-1.1 bg-secondary text-white" />
                                      </span>
                                    </div>
                                    <h6 className="font-medium">$65.00</h6>
                                  </div>
                                </div>
                                <a href="javascript:void(0);" className="flex items-center size-7">
                                  <i className="ti-close"></i>
                                </a>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <div className="flex items-center justify-between p-4.5 mb-2.5">
                          <h5 className="font-bold">Subtotal:</h5>
                          <h5 className="font-bold">300.00$</h5>
                        </div>
                        <div className="mt-auto">
                          <div className="flex items-center mb-10">
                            <div className="size-13.5 mr-5 flex items-center justify-center">
                              <i className="flaticon flaticon-ship text-[55px]"></i>
                            </div>
                            <div className="shipping-content">
                              <h6 className="pr-6 mb-2">Congratulations , you've got free shipping!</h6>
                              <div className="h-1.1 bg-[#e9ecef] overflow-hidden flex">
                                <div className="border-0 bg-secondary progress-animated" style={{ width: '75%' }} role="progressbar">
                                  <span className="sr-only">75% Complete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <a href="shop-checkout.html" className="btn py-3 px-7.5 max-sm:px-6 text-base max-sm:text-sm inline-block font-medium font-Lufga leading-[1.2] border border-secondary rounded-xl duration-700 hover:bg-secondary hover:text-white relative overflow-hidden text-center w-full mb-5">Checkout</a>
                          <a href="shop-cart.html" className="btn py-3 px-7.5 max-sm:px-6 text-base max-sm:text-sm font-Lufga inline-block font-medium leading-[1.2] border border-secondary bg-secondary text-white rounded-xl duration-700 relative overflow-hidden text-center w-full">View Cart</a>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-col min-h-[calc(100vh_-_190px)]">
                        <ul className="sidebar-cart-list">
                          <li>
                            <div className="py-5 border-b border-border">
                              <div className="flex items-center justify-center">
                                <div className="relative mr-4 overflow-hidden size-20 rounded-3xl">
                                  <img src="/assets/images/shop/shop-cart/pic1.jpg" alt="" className="w-full" />
                                </div>
                                <div className="mr-5 flex-[1]">
                                  <h6 className="mb-2 font-medium"><a href="product-thumbnail.html">Sophisticated Swagger Suit</a></h6>
                                  <div className="flex items-center">
                                    <h6 className="font-medium">$50.00</h6>
                                  </div>
                                </div>
                                <a href="javascript:void(0);" className="flex items-center size-7">
                                  <i className="ti-close"></i>
                                </a>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="py-5 border-b border-border">
                              <div className="flex items-center justify-center">
                                <div className="relative mr-4 overflow-hidden size-20 rounded-3xl">
                                  <img src="/assets/images/shop/shop-cart/pic2.jpg" alt="" className="w-full" />
                                </div>
                                <div className="mr-5 flex-[1]">
                                  <h6 className="mb-2 font-medium"><a href="product-thumbnail.html">Cozy Knit Cardigan Sweater</a></h6>
                                  <div className="flex items-center">
                                    <h6 className="font-medium">$40.00</h6>
                                  </div>
                                </div>
                                <a href="javascript:void(0);" className="flex items-center size-7">
                                  <i className="ti-close"></i>
                                </a>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="py-5 border-b border-border">
                              <div className="flex items-center justify-center">
                                <div className="relative mr-4 overflow-hidden size-20 rounded-3xl">
                                  <img src="/assets/images/shop/shop-cart/pic3.jpg" alt="" className="w-full" />
                                </div>
                                <div className="mr-5 flex-[1]">
                                  <h6 className="mb-2 font-medium"><a href="product-thumbnail.html">Athletic Mesh Sports Leggings</a></h6>
                                  <div className="flex items-center">
                                    <h6 className="font-medium">$65.00</h6>
                                  </div>
                                </div>
                                <a href="javascript:void(0);" className="flex items-center size-7">
                                  <i className="ti-close"></i>
                                </a>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <div className="mt-auto">
                          <a href="shop-wishlist.html" className="btn py-3 px-7.5 max-sm:px-6 text-base max-sm:text-sm font-Lufga font-medium leading-[1.2] border border-secondary bg-secondary text-white rounded-xl duration-700 relative overflow-hidden text-center block w-full">Check Your Favourite</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar cart */}
        </div>
      </div>
    </div>
  </div>
  {/* Main Header End */}
  
  {/* SearchBar */}
  <div className="h-[580px] max-md:h-[470px] max-sm:!h-[440px] pt-13.5 max-md:pt-7.5 fixed z-[1045] flex flex-col duration-500 top-0 left-0 right-0 bg-light overflow-auto offcanvas offcanvas-top is-closed" tabIndex="-1" id="offcanvasTop">
    <button type="button" className="size-10 flex items-center justify-center absolute top-1.5 right-5 opacity-50 text-4.5xl offcanvas-close">
      &times;
    </button>
    <div className="container">
      <form className="block w-full mb-13.5 relative">
        <div className="relative flex flex-wrap items-center pb-2 border-b-2 border-secondary">
          <div className="relative after:content-[''] after:absolute after:-translate-y-1/2 after:top-1/2 after:right-0 after:w-[1px] after:h-[35px] max-sm:after:h-6.1 after:bg-[#bbbbbbad]">
            <select className="nice-select bg-transparent border-0 float-none px-0 text-xl min-w-[270px] font-Lufga h-[45px] leading-[48px]">
              <option>All Categories</option>
              <option>Clothes</option>
              <option>UrbanSkirt</option>
              <option>VelvetGown</option>
              <option>LushShorts</option>
              <option>Vintage</option>
              <option>Wedding</option>
              <option>Cotton</option>
              <option>Linen</option>
              <option>Navy</option>
              <option>Urban</option>
              <option>Business Meeting</option>
              <option>Formal</option>
            </select>
          </div>
                      <input
              type="search"
              className="py-2.5 px-3.6 text-xl font-Lufga text-title outline-none flex-auto w-[1%] h-[45px] bg-light"
              placeholder="Search Product"
            />
            <button className="btn" type="button">
              <i className="iconly-Light-Search"></i>
            </button>
          </div>
          <ul className="flex items-center flex-wrap py-2.5">
            <li className="text-2sm py-1.1"><span>Quick Search :</span></li>
            <li className="text-2sm py-1.1 px-3.6"><a href="shop-list.html">Clothes</a></li>
            <li className="text-2sm py-1.1 px-3.6"><a href="shop-list.html">UrbanSkirt</a></li>
            <li className="text-2sm py-1.1 px-3.6"><a href="shop-list.html">VelvetGown</a></li>
            <li className="text-2sm py-1.1 px-3.6"><a href="shop-list.html">LushShorts</a></li>
          </ul>
        </form>
        <div className="row">
          <div className="w-full">
            <h5 className="mb-4">You May Also Like</h5>
            <div className="swiper category-swiper2">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="relative z-[1] h-full">
                    <div className="relative overflow-hidden rounded-3xl">
                      <img src="/assets/images/shop/product/1.png" alt="image" />
                    </div>
                    <div className="flex justify-between py-3 font-Lufga">
                      <h6><a href="shop-list.html">SilkBliss Dress</a></h6>
                      <h6>$40.00</h6>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="relative z-[1] h-full">
                    <div className="relative overflow-hidden rounded-3xl">
                      <img src="/assets/images/shop/product/3.png" alt="image" />
                    </div>
                    <div className="flex justify-between py-3 font-Lufga">
                      <h6><a href="shop-list.html">GlamPants</a></h6>
                      <h6>$30.00</h6>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="relative z-[1] h-full">
                    <div className="relative overflow-hidden rounded-3xl">
                      <img src="/assets/images/shop/product/4.png" alt="image" />
                    </div>
                    <div className="flex justify-between py-3 font-Lufga">
                      <h6><a href="shop-list.html">ComfyLeggings</a></h6>
                      <h6>$35.00</h6>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="relative z-[1] h-full">
                    <div className="relative overflow-hidden rounded-3xl">
                      <img src="/assets/images/shop/product/2.png" alt="image" />
                    </div>
                    <div className="flex justify-between py-3 font-Lufga">
                      <h6><a href="shop-list.html">ClassicCapri</a></h6>
                      <h6>$20.00</h6>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="relative z-[1] h-full">
                    <div className="relative overflow-hidden rounded-3xl">
                      <img src="/assets/images/shop/product/5.png" alt="image" />
                    </div>
                    <div className="flex justify-between py-3 font-Lufga">
                      <h6><a href="shop-list.html">DapperCoat</a></h6>
                      <h6>$70.00</h6>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="relative z-[1] h-full">
                    <div className="relative overflow-hidden rounded-3xl">
                      <img src="/assets/images/shop/product/6.png" alt="image" />
                    </div>
                    <div className="flex justify-between py-3 font-Lufga">
                      <h6><a href="shop-list.html">ComfyLeggings</a></h6>
                      <h6>$45.00</h6>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="relative z-[1] h-full">
                    <div className="relative overflow-hidden rounded-3xl">
                      <img src="/assets/images/shop/product/7.png" alt="image" />
                    </div>
                    <div className="flex justify-between py-3 font-Lufga">
                      <h6><a href="shop-list.html">DenimDream Jeans</a></h6>
                      <h6>$40.00</h6>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="relative z-[1] h-full">
                    <div className="relative overflow-hidden rounded-3xl">
                      <img src="/assets/images/shop/product/4.png" alt="image" />
                    </div>
                    <div className="flex justify-between py-3 font-Lufga">
                      <h6><a href="shop-list.html">SilkBliss Dress</a></h6>
                      <h6>$60.00</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  {/* SearchBar */}

  {/* Sidebar filter */}
  <div className="w-[485px] fixed z-[1045] flex flex-col max-full duration-500 top-0 bottom-0 right-0 bg-light right offcanvas is-closed" id="offcanvasLeft">
    <button type="button" className="size-10 flex items-center justify-center absolute top-1.5 right-5 opacity-50 text-4.5xl offcanvas-close">
      &times;
    </button>
    <div className="flex-grow overflow-y-auto py-14.5 px-[75px] max-sm:py-13.5 max-sm:px-3.6">
      <div className="product-description">
        <div className="mb-[45px] max-lg:mb-10 widget_search">
          <div className="mb-10">
            <div className="relative flex flex-wrap items-stretch w-full mb-5">
              <input
                name="dzSearch"
                required
                type="search"
                className="py-2.5 px-3.6 text-2sm text-title outline-none flex-auto w-[1%] rounded-xl border border-secondary bg-light"
                placeholder="Search Product"
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-3.6 z-9">
                <button name="submit" value="Submit" type="submit">
                  <i className="text-xl icon feather icon-search text-title"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-[45px] max-lg:mb-10">
          <h6 className="relative mb-6.1 font-medium">Price</h6>
          <div className="price-slide range-slider">
            <div className="price">
              <div className="range-slider style-1">
                <div id="slider-tooltips" className="mb-4"></div>
                <span className="mr-7.5 text-sm" id="slider-margin-value-min"></span>
                <span className="mr-7.5 text-sm" id="slider-margin-value-max"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-[45px] max-lg:mb-10">
          <h6 className="relative mb-6.1 font-medium">Color</h6>
          <div className="flex flex-wrap items-center color-filter ps-2">
            <div className="form-check">
              <input className="opacity-0 relative z-[2] cursor-pointer float-left mr-1 mb-1 form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel110" value="#000000" aria-label="..." defaultChecked />
              <span className="mr-3.6 size-4 block relative rounded-full z-1"></span>
            </div>
            <div className="form-check">
              <input className="opacity-0 relative z-[2] cursor-pointer float-left mr-1 mb-1 form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel210" value="#9BD1FF" aria-label="..." />
              <span className="mr-3.6 size-4 block relative rounded-full z-1"></span>
            </div>
            <div className="form-check">
              <input className="opacity-0 relative z-[2] cursor-pointer float-left mr-1 mb-1 form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel310" value="#21B290" aria-label="..." />
              <span className="mr-3.6 size-4 block relative rounded-full z-1"></span>
            </div>
            <div className="form-check">
              <input className="opacity-0 relative z-[2] cursor-pointer float-left mr-1 mb-1 form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel410" value="#FEC4C4" aria-label="..." />
              <span className="mr-3.6 size-4 block relative rounded-full z-1"></span>
            </div>
            <div className="form-check">
              <input className="opacity-0 relative z-[2] cursor-pointer float-left mr-1 mb-1 form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel510" value="#FF7354" aria-label="..." />
              <span className="mr-3.6 size-4 block relative rounded-full z-1"></span>
            </div>
            <div className="form-check">
              <input className="opacity-0 relative z-[2] cursor-pointer float-left mr-1 mb-1 form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel610" value="#51EDC8" aria-label="..." />
              <span className="mr-3.6 size-4 block relative rounded-full z-1"></span>
            </div>
            <div className="form-check">
              <input className="opacity-0 relative z-[2] cursor-pointer float-left mr-1 mb-1 form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel710" value="#B77CF3" aria-label="..." />
              <span className="mr-3.6 size-4 block relative rounded-full z-1"></span>
            </div>
            <div className="form-check">
              <input className="opacity-0 relative z-[2] cursor-pointer float-left mr-1 mb-1 form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel810" value="#FF4A76" aria-label="..." />
              <span className="mr-3.6 size-4 block relative rounded-full z-1"></span>
            </div>
            <div className="form-check">
              <input className="opacity-0 relative z-[2] cursor-pointer float-left mr-1 mb-1 form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel910" value="#3E68FF" aria-label="..." />
              <span className="mr-3.6 size-4 block relative rounded-full z-1"></span>
            </div>
            <div className="form-check">
              <input className="opacity-0 relative z-[2] cursor-pointer float-left mr-1 mb-1 form-check-input" type="radio" name="radioNoLabel" id="radioNoLabe201" value="#7BEF68" aria-label="..." />
              <span className="mr-3.6 size-4 block relative rounded-full z-1"></span>
            </div>
          </div>
        </div>

        <div className="mb-[45px] max-lg:mb-10">
          <h6 className="relative mb-6.1 font-medium">Size</h6>
          <div className="relative flex flex-wrap product-size">
            <input type="radio" className="absolute opacity-0 pointer-events-none btn-check" name="btnradio1" id="btnradio11" defaultChecked />
            <label htmlFor="btnradio11" className="size-[34px] leading-[34px] rounded-full text-center border border-secondary mr-2.5 mb-1.1">4</label>

            <input type="radio" className="absolute opacity-0 pointer-events-none btn-check" name="btnradio1" id="btnradio21" />
            <label htmlFor="btnradio21" className="size-[34px] leading-[34px] rounded-full text-center border border-secondary mr-2.5 mb-1.1">6</label>

            <input type="radio" className="absolute opacity-0 pointer-events-none btn-check" name="btnradio1" id="btnradio31" />
            <label htmlFor="btnradio31" className="size-[34px] leading-[34px] rounded-full text-center border border-secondary mr-2.5 mb-1.1">8</label>

            <input type="radio" className="absolute opacity-0 pointer-events-none btn-check" name="btnradio1" id="btnradio41" />
            <label htmlFor="btnradio41" className="size-[34px] leading-[34px] rounded-full text-center border border-secondary mr-2.5 mb-1.1">10</label>

            <input type="radio" className="absolute opacity-0 pointer-events-none btn-check" name="btnradio1" id="btnradio51" />
            <label htmlFor="btnradio51" className="size-[34px] leading-[34px] rounded-full text-center border border-secondary mr-2.5 mb-1.1">12</label>

            <input type="radio" className="absolute opacity-0 pointer-events-none btn-check" name="btnradio1" id="btnradio61" />
            <label htmlFor="btnradio61" className="size-[34px] leading-[34px] rounded-full text-center border border-secondary mr-2.5 mb-1.1">14</label>

            <input type="radio" className="absolute opacity-0 pointer-events-none btn-check" name="btnradio1" id="btnradio71" />
            <label htmlFor="btnradio71" className="size-[34px] leading-[34px] rounded-full text-center border border-secondary mr-2.5 mb-1.1">16</label>

            <input type="radio" className="absolute opacity-0 pointer-events-none btn-check" name="btnradio1" id="btnradio81" />
            <label htmlFor="btnradio81" className="size-[34px] leading-[34px] rounded-full text-center border border-secondary mr-2.5 mb-1.1">18</label>

            <input type="radio" className="absolute opacity-0 pointer-events-none btn-check" name="btnradio1" id="btnradio91" />
            <label htmlFor="btnradio91" className="size-[34px] leading-[34px] rounded-full text-center border border-secondary mr-2.5 mb-1.1">20</label>
          </div>
        </div>

        <div className="mb-[45px] max-lg:mb-10 widget_categories">
          <h6 className="relative mb-6.1 font-medium">Category</h6>
          <ul>
            <li className="w-full py-2 font-medium text-right text-2sm"><a className="inline-block float-left duration-500 hover:text-primary" href="blog-category.html">Dresses</a> (10)</li>
            <li className="w-full py-2 font-medium text-right text-2sm"><a className="inline-block float-left duration-500 hover:text-primary" href="blog-category.html">Top &amp; Blouses</a> (5)</li>
            <li className="w-full py-2 font-medium text-right text-2sm"><a className="inline-block float-left duration-500 hover:text-primary" href="blog-category.html">Boots</a> (17)</li>
            <li className="w-full py-2 font-medium text-right text-2sm"><a className="inline-block float-left duration-500 hover:text-primary" href="blog-category.html">Jewelry</a> (13)</li>
            <li className="w-full py-2 font-medium text-right text-2sm"><a className="inline-block float-left duration-500 hover:text-primary" href="blog-category.html">Makeup</a> (06)</li>
            <li className="w-full py-2 font-medium text-right text-2sm"><a className="inline-block float-left duration-500 hover:text-primary" href="blog-category.html">Fragrances</a> (17)</li>
            <li className="w-full py-2 font-medium text-right text-2sm"><a className="inline-block float-left duration-500 hover:text-primary" href="blog-category.html">Shaving &amp; Grooming</a> (13)</li>
            <li className="w-full py-2 font-medium text-right text-2sm"><a className="inline-block float-left duration-500 hover:text-primary" href="blog-category.html">Jacket</a> (06)</li>
            <li className="w-full py-2 font-medium text-right text-2sm"><a className="inline-block float-left duration-500 hover:text-primary" href="blog-category.html">Coat</a> (22)</li>
          </ul>
        </div>

        <div className="mb-[45px] max-lg:mb-10 widget_tag_cloud">
          <h6 className="relative mb-6.1 font-medium">Tags</h6>
          <div className="tagcloud">
            <a className="relative border border-secondary py-2 px-3.6 inline-block mr-2.5 mb-2.5 text-sm leading-[1.4] rounded-xl duration-500 hover:bg-secondary hover:text-white" href="blog-tag.html">Vintage</a>
            <a className="relative border border-secondary py-2 px-3.6 inline-block mr-2.5 mb-2.5 text-sm leading-[1.4] rounded-xl duration-500 hover:bg-secondary hover:text-white" href="blog-tag.html">Wedding</a>
            <a className="relative border border-secondary py-2 px-3.6 inline-block mr-2.5 mb-2.5 text-sm leading-[1.4] rounded-xl duration-500 hover:bg-secondary hover:text-white" href="blog-tag.html">Cotton</a>
            <a className="relative border border-secondary py-2 px-3.6 inline-block mr-2.5 mb-2.5 text-sm leading-[1.4] rounded-xl duration-500 hover:bg-secondary hover:text-white" href="blog-tag.html">Linen</a>
            <a className="relative border border-secondary py-2 px-3.6 inline-block mr-2.5 mb-2.5 text-sm leading-[1.4] rounded-xl duration-500 hover:bg-secondary hover:text-white" href="blog-tag.html">Navy</a>
            <a className="relative border border-secondary py-2 px-3.6 inline-block mr-2.5 mb-2.5 text-sm leading-[1.4] rounded-xl duration-500 hover:bg-secondary hover:text-white" href="blog-tag.html">Urban</a>
            <a className="relative border border-secondary py-2 px-3.6 inline-block mr-2.5 mb-2.5 text-sm leading-[1.4] rounded-xl duration-500 hover:bg-secondary hover:text-white" href="blog-tag.html">Business Meeting</a>
            <a className="relative border border-secondary py-2 px-3.6 inline-block mr-2.5 mb-2.5 text-sm leading-[1.4] rounded-xl duration-500 hover:bg-secondary hover:text-white" href="blog-tag.html">Formal</a>
          </div>
        </div>

          <a href="javascript:void(0);" className="btn py-2.5 px-3.6 text-2xs font-Lufga inline-block font-medium leading-[1.2] border border-secondary bg-secondary text-white rounded-xl duration-700 relative overflow-hidden">
            RESET
          </a>
        </div>
      </div>
    </div>
  {/* filter sidebar */}

</header>

<div className="page-content bg-light">
  {/* Banner Start */}
  <div className="relative min-h-[250px] max-sm:min-h-[230px] bg-cover bg-center z-[2] w-full overlay-black-light before:bg-black before:opacity-40 bg-[url('/images/background/bg1.jpg')]">
   <div className="container relative table h-full z-[1] bg-transparent">
  <div className="text-center py-[90px] max-sm:py-10 table-cell align-middle h-[250px] max-sm:h-[230px]">
    
    <h1 className="mb-2.5 lg:text-4.5xl md:text-3xl sm:text-2.5xl text-2xl text-white">
      My Account
    </h1>

    {/* <nav className="bg-transparent">
      <ul className="text-white bg-transparent">
        <li className="mr-[3px] inline-block text-base font-medium">
          <a href="index.html" className="text-white">Home</a>
        </li>

        <li className="mr-[3px] pl-2 inline-block text-base font-medium before:content-[''] before:font-['Font_Awesome_5_Free'] before:font-bold before:pr-3">
          Account Address
        </li>
      </ul>
    </nav> */}

  </div>
</div>
  </div>


<div className="page-content bg-light">
  

  
  {/* Banner End */}

  <div className="3xl:py-25 md:py-17 sm:py-13.5 py-10">
    <div className="container">
      <div className="row">

        <aside className="w-full xl:w-1/4">
  <div className="hidden max-xl:flex sm:py-4.5 sm:md:px-7.5 py-3 px-3.6 mb-5 bg-white border border-black/10 rounded-lg justify-between items-center">
    <h5>Account Navbar</h5>
    <a
      href="#accountSidebar"
      className="bg-primary text-white py-2.5 px-3.6 rounded-md after:content-[''] after:h-screen after:w-0 after:fixed after:left-[-20%] after:top-0 after:bg-black after:opacity-70 after:z-[99999] after:duration-1000 toggle-btn"
    >
      Account Menu
    </a>
  </div>

  <div className="sticky top-29 lg:z-9 z-[9999999] mt-[-170px] max-xl:mt-0 account-sidebar-wrapper">
    <div
      id="accountSidebar"
      className="bg-white xl:rounded-2xl xl:relative xl:z-9 shadow-[0_0px_20px_0_rgba(0,0,0,0.1)] duration-500 fixed z-[999999] top-0 left-0 max-xl:h-screen max-xl:overflow-scroll max-xl:w-[280px] account-sidebar"
    >
      <div className="p-6.1 rounded-xl text-center">
        <div className="w-[90px] h-auto relative p-1.1 border border-border rounded-full mb-2.5 mx-auto overflow-hidden">
          <img
            className="rounded-full"
            src="/images/profile4.jpg"
            alt="Susan Gardner"
          />
        </div>
        <h5>Ronald M. Spino</h5>
        <span className="text text-primary">info@example.com</span>
      </div>

      <div>
        <div className="py-2.5 px-5 mb-2.5 bg-light">DASHBOARD</div>
        <ul className="pb-2.5">
          <li><a className="block px-5 py-2" href="#dashboard">Dashboard</a></li>
          <li><a className="block px-5 py-2" href="#orders">Orders</a></li>
           <li><a className="block px-5 py-2" href="#account">Account Address </a></li>
          <li><a className="block px-5 py-2" href="#downloads">Downloads</a></li>
          <li><a className="block px-5 py-2" href="#return">Return request</a></li>
           <li><a className="block px-5 py-2" href="#cancelation">Account Cancelation</a></li>
           <li><a className="block px-5 py-2" href="#return">Return Request</a></li>
        </ul>

        <div className="py-2.5 px-5 mb-2.5 bg-light">ACCOUNT SETTINGS</div>
        <ul className="pb-2.5">
          <li><a className="block px-5 py-2" href="#profile">Profile</a></li>
          <li><a className="block px-5 py-2" href="#address">Address</a></li>
          <li><a className="block px-5 py-2" href="#shipping">Shipping methods</a></li>
          <li><a className="block px-5 py-2" href="#payment">Payment Methods</a></li>
          <li><a className="block px-5 py-2" href="#review">Review</a></li>
        </ul>
      </div>
    </div>
  </div>
</aside>




        <section id="account" className="xl:w-3/4 w-full xl:pl-9 pl-3.6">
          <div className="row">

            <div className="w-full mb-7.5">
              <p className="text-body">
                The following addresses will be used on the checkout page by default.
              </p>
            </div>

            <div className="md:w-1/2 w-full mb-7.5">
              <div>
                <div className="border border-secondary rounded-t-lg p-3.6">
                  <h6 className="mb-4">Billing address</h6>
                  <ul className="text-body">
                    <li>John Doe</li>
                    <li>Londan</li>
                    <li>Mo. 012-345-6789</li>
                    <li>johndoe@example.com</li>
                  </ul>
                </div>

                <div className="flex border border-secondary border-t-0 rounded-b-lg bg-white py-3 px-3.6">
                  <a href="account-billing-address.html" className="block mr-4 hover:text-primary">
                    <i className="mr-2 fa-solid fa-pen"></i>Edit
                  </a>
                  <a href="#" className="block mr-4 hover:text-primary">
                    <i className="mr-2 fa-solid fa-trash-can"></i>Remove
                  </a>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 w-full mb-7.5">
              <div>
                <div className="border border-secondary rounded-t-lg p-3.6">
                  <h6 className="mb-4">Shipping address</h6>
                  <ul className="text-body">
                    <li>John Doe</li>
                    <li>Londan</li>
                    <li>Mo. 012-345-6789</li>
                    <li>johndoe@example.com</li>
                  </ul>
                </div>

                <div className="flex border border-secondary border-t-0 rounded-b-lg bg-white py-3 px-3.6">
                  <a href="account-shipping-address.html" className="block mr-4 hover:text-primary">
                    <i className="mr-2 fa-solid fa-pen"></i>Edit
                  </a>
                  <a href="#" className="block mr-4 hover:text-primary">
                    <i className="mr-2 fa-solid fa-trash-can"></i>Remove
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="flex flex-col items-center justify-center border border-dashed rounded-lg border-black/30 p-9">

                <div className="size-[95px] rounded-full bg-primary flex items-center justify-center mb-3.6">
                  <svg className="fill-white" height="50" viewBox="0 0 64 64" width="50">
                    <path d="m59.28775 26.0578-7.30176-6.251v-11.72068a.99973.99973 0 0 0 -1-1h-7.46a.99974.99974 0 0 0 -1 1v3.60693l-7.2109-6.17675a5.07688 5.07688 0 0 0 -6.6416 0l-23.97314 20.54345a2.04251 2.04251 0 0 0 1.32226 3.56787h5.98047v18.92188a8.60569 8.60569 0 0 0 8.59082 8.60059h10.481a1.00019 1.00019 0 0 0 -.00006-2h-10.48094a6.60308 6.60308 0 0 1 -6.59082-6.60059v-19.92188a1.00005 1.00005 0 0 0 -1-1l-6.99951-.05078 23.97119-20.542a3.08781 3.08781 0 0 1 4.03955 0l8.86133 7.59082a1.00655 1.00655 0 0 0 1.65039-.75934v-4.7802h5.46v11.18066a1.00013 1.00013 0 0 0 .34961.75928l7.63184 6.60156h-6.98148a.99974.99974 0 0 0 -1 1v3.7002a1.00019 1.00019 0 0 0 2-.00006v-2.70014h5.98145a2.03152 2.03152 0 0 0 1.32031-3.56982z" />
                  </svg>
                </div>

                <h4 className="mb-4">Add New Address</h4>

                <button className="btn py-3 max-sm:px-6 text-base max-sm:text-sm font-Lufga inline-block font-medium leading-[1.2] border border-primary bg-primary text-white rounded-xl duration-700 relative overflow-hidden px-12">
                  Add
                </button>

              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  </div>
</div>


{/* export default function AccountDashboard() {
  return ( */}
    
<div className="3xl:py-25 md:py-17 sm:py-13.5 py-10 mb-28">
    <div className="container-fluid" style={{ marginLeft: "150px" }}>
      <div className="row">
        
        <section className="xl:w-3/4 w-full xl:pl-9 pl-3.6">
          <div className="border border-black/10 p-7.5 rounded-xl min-h-[250px] max-sm:p-5">
            <form className="row" action="#">
              <h3 className="mb-7.5 w-full">Billing address</h3>
              <div className="w-full md:w-1/2">
                <div className="form-group mb-6.1">
                  <label className="mb-2.5 inline-block">First Name</label>
                  <input name="dzName" required className="w-full py-4 px-5 h-13.5 outline-none rounded-xl border border-black bg-white duration-500 focus:bg-light" />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="form-group mb-6.1">
                  <label className="mb-2.5 inline-block">Last Name</label>
                  <input name="dzName" required className="w-full py-4 px-5 h-13.5 outline-none rounded-xl border border-black bg-white duration-500 focus:bg-light" />
                </div>
              </div>
              <div className="w-full">
                <div className="form-group mb-6.1">
                  <label className="mb-2.5 inline-block">Company name (optional)</label>
                  <input name="dzName" required className="w-full py-4 px-5 h-13.5 outline-none rounded-xl border border-black bg-white duration-500 focus:bg-light" />
                </div>
              </div>
              <div className="w-full">
                <div className="mb-6.1">
                  <label className="mb-2.5 inline-block">Country / Region *</label>
                  <select className="nice-select w-full py-4 px-5 h-13.5 outline-none rounded-xl border border-black bg-white duration-500 focus:bg-light leading-normal mb-6.1">
                    <option selected>India</option>
                    <option value="1">Another option</option>
                    <option value="2">UK</option>
                    <option value="3">Iraq</option>
                  </select>
                </div>
              </div>
              <div className="w-full">
                <div className="form-group mb-6.1">
                  <label className="mb-2.5 inline-block">Street address *</label>
                  <input name="dzName" required className="w-full py-4 px-5 h-13.5 outline-none rounded-xl border border-black bg-white duration-500 focus:bg-light mb-3.6" placeholder="House number and street name" />
                  <input name="dzName" required className="w-full py-4 px-5 h-13.5 outline-none rounded-xl border border-black bg-white duration-500 focus:bg-light" placeholder="Apartment, suite, unit, etc. (optional)" />
                </div>
              </div>
              <div className="w-full">
                <div className="mb-6.1">
                  <label className="mb-2.5 inline-block">Town / City *</label>
                  <select className="nice-select w-full py-4 px-5 h-13.5 outline-none rounded-xl border border-black bg-white duration-500 focus:bg-light leading-normal mb-6.1">
                    <option selected>Kota</option>
                    <option value="1">Another option</option>
                    <option value="2">Jaipur</option>
                    <option value="3">Udaipur</option>
                  </select>
                </div>
              </div>
              <div className="w-full">
                <div className="mb-6.1">
                  <label className="mb-2.5 inline-block">State*</label>
                  <select className="nice-select w-full py-4 px-5 h-13.5 outline-none rounded-xl border border-black bg-white duration-500 focus:bg-light leading-normal mb-6.1">
                    <option selected>Rajasthan</option>
                    <option value="1">Another option</option>
                    <option value="2">Rajasthan</option>
                    <option value="3">Rajasthan</option>
                  </select>
                </div>
              </div>
              <div className="w-full">
                <div className="form-group mb-6.1">
                  <label className="mb-2.5 inline-block">postcode*</label>
                  <input name="dzName" required className="w-full py-4 px-5 h-13.5 outline-none rounded-xl border border-black bg-white duration-500 focus:bg-light" />
                </div>
              </div>
              <div className="w-full">
                <div className="form-group mb-6.1">
                  <label className="mb-2.5 inline-block">Phone*</label>
                  <CountryPhoneInput name="phone" required />
                </div>
              </div>
              <div className="w-full">
                <div className="form-group mb-6.1">
                  <label className="mb-2.5 inline-block">Email address *</label>
                  <input name="dzName" required className="w-full py-4 px-5 h-13.5 outline-none rounded-xl border border-black bg-white duration-500 focus:bg-light" />
                </div>
              </div>
            </form>
            <button className="btn py-3 px-7.5 max-sm:px-6 text-base max-sm:text-sm font-Lufga inline-block font-medium leading-[1.2] border border-secondary bg-secondary text-white rounded-xl duration-700 relative overflow-hidden">Save changes</button>
          </div>
        </section>
      </div>
    </div>
  </div>
</div>



<section className="xl:w-3/4 w-full xl:pl-9 pl-3.6">
  <div className="border border-black/10 p-7.5 rounded-xl min-h-[250px] max-sm:p-5">
    <div className="flex items-center border-b border-black/5 pb-5 mb-7.5">
      <div className="w-20 h-auto border border-border p-2.5 rounded-lg">
        <img src="assets/images/shop/small/pic1.png" alt="" />
      </div>
      <div className="clearfix ml-5">
        <div className="py-1.1 px-2.5 text-white rounded-md uppercase text-center leading-[1] inline-block text-xs font-semibold bg-danger">In Progress</div>
        <h4>Order #17493</h4>
      </div>
    </div>
    <div className="mb-2 row sm:mb-6">
      <div className="w-full sm:w-1/2">
        <div className="mb-3.6">
          <span className="text-body">Item</span>
          <h6 className="text-2sm">casual shirt</h6>
        </div>
      </div>
      <div className="w-full sm:w-1/2">
        <div className="mb-3.6">
          <span className="text-body">Courier</span>
          <h6 className="text-2sm">casual shirt</h6>
        </div>
      </div>
      <div className="w-full sm:w-1/2">
        <div className="mb-3.6">
          <span className="text-body">Start Time</span>
          <h6 className="text-2sm">05 April 2024, 15:43:23</h6>
        </div>
      </div>
      <div className="w-full sm:w-1/2">
        <div className="mb-3.6">
          <span className="text-body">Address</span>
          <h6 className="text-2sm">Address 451 Wall Street UK, London</h6>
        </div>
      </div>
    </div>
    <div className="content-btn mb-3.6">
      <a href="shop-wishlist.html" className="btn py-3 px-7.5 max-sm:px-6 text-base max-sm:text-sm font-Lufga inline-block font-medium leading-[1.2] border border-secondary bg-secondary text-white rounded-xl duration-700 relative overflow-hidden xl:mr-4 mr-2 mb-3.6 btnhover20">Export Details</a>
      <a href="product-default.html" className="btn py-3 px-7.5 max-sm:px-6 text-base max-sm:text-sm inline-block font-medium font-Lufga leading-[1.2] border border-secondary rounded-xl duration-700 hover:bg-secondary hover:text-white relative overflow-hidden mb-3.6 xl:mr-4 mr-2 btnhover20">Request Confirmation</a>
      <a href="account-cancellation-requests.html" className="btn py-3 px-7.5 max-sm:px-6 text-base max-sm:text-sm inline-block font-medium font-Lufga leading-[1.2] border border-primary text-primary rounded-xl duration-700 hover:bg-primary hover:text-white relative overflow-hidden mb-3.6 btnhover20">Cancel Order</a>
    </div>
    <div className="clearfix">
      <div className="dz-tabs style-3">
        <div className="flex flex-wrap border-b border-border mb-7.5" id="nav-tab" role="tablist">
          <button className="inline-block py-3 text-base mr-3.6 duration-500 relative w-auto -mb-1 after:content-[''] after:bg-primary after:w-0 after:h-[3px] after:absolute after:bottom-0.5 after:left-1/2 after:duration-200 after:-translate-x-1/2 hover:after:w-full" 
            onClick={() => setTab('nav-order-history')}>
            Order History
          </button>
          <button className="inline-block py-3 text-base mr-3.6 duration-500 relative w-auto -mb-1 after:content-[''] after:bg-primary after:w-0 after:h-[3px] after:absolute after:bottom-0.5 after:left-1/2 after:duration-200 after:-translate-x-1/2 hover:after:w-full" 
            onClick={() => setTab('nav-Item')}>
            Item Details
          </button>
          <button className="inline-block py-3 text-base mr-3.6 duration-500 relative w-auto -mb-1 after:content-[''] after:bg-primary after:w-0 after:h-[3px] after:absolute after:bottom-0.5 after:left-1/2 after:duration-200 after:-translate-x-1/2 hover:after:w-full" 
            onClick={() => setTab('nav-courier')}>
            Courier
          </button>
          <button className="inline-block py-3 text-base mr-3.6 duration-500 relative w-auto -mb-1 after:content-[''] after:bg-primary after:w-0 after:h-[3px] after:absolute after:bottom-0.5 after:left-1/2 after:duration-200 after:-translate-x-1/2 hover:after:w-full" 
            onClick={() => setTab('nav-receiver')}>
            Receiver
          </button>
        </div>
      </div>
      <div className="tab-content">
        {/* Order History Tab */}
        <div>
          <div className="widget-timeline style-1">
            <ul className="relative after:top-5 after:bottom-12 after:absolute after:content-[''] after:w-[1px] after:left-2.5 after:border-r after:border-dashed after:border-black/15">
              <li className="relative mb-3.6">
                <div className="rounded-full left-0 absolute top-2.5 size-5 border p-1 bg-white border-success after:content-[''] after:size-2.5 after:rounded-full after:block after:bg-success"></div>
                <div className="p-2.5 pl-3.6 relative block ml-10">
                  <a className="timeline-panel" href="javascript:void(0);">
                    <h6 className="mb-0">Product Shipped</h6>
                    <span className="mb-1 text-xs tracking-wide text-body">08/04/2024 5:23pm</span>
                  </a>
                  <p className="text-sm"><strong>Courier Service: </strong>UPS, R. Gosling</p>
                  <p className="text-sm"><strong>Estimated Delivery Date: </strong>09/04/2024</p>
                </div>
              </li>
              <li className="relative mb-3.6">
                <div className="rounded-full left-0 absolute top-2.5 size-5 border p-1 bg-white border-primary after:content-[''] after:size-2.5 after:rounded-full after:block after:bg-primary"></div>
                <div className="p-2.5 pl-3.6 relative block ml-10">
                  <a className="timeline-panel" href="javascript:void(0);">
                    <h6 className="mb-0">Product Shipped</h6>
                    <span className="mb-1 text-xs tracking-wide text-body">08/04/2024 5:23pm</span>
                  </a>
                  <p className="text-sm"><strong>Tracking Number: </strong>3409-4216-8759</p>
                  <p className="text-sm"><strong>Warehouse: </strong>Top Shirt 12b</p>
                </div>
              </li>
              <li className="relative mb-3.6">
                <div className="rounded-full left-0 absolute top-2.5 size-5 border p-1 bg-white border-[#cfcfcf] after:content-[''] after:size-2.5 after:rounded-full after:block after:bg-[#cfcfcf]"></div>
                <div className="p-2.5 pl-3.6 relative block ml-10">
                  <a className="timeline-panel" href="javascript:void(0);">
                    <h6 className="mb-0">Product Packaging</h6>
                    <span className="mb-1 text-xs tracking-wide text-body">09/04/2024 4:34pm</span>
                  </a>
                </div>
              </li>
              <li className="relative mb-3.6">
                <div className="rounded-full left-0 absolute top-2.5 size-5 border p-1 bg-white border-[#cfcfcf] after:content-[''] after:size-2.5 after:rounded-full after:block after:bg-[#cfcfcf]"></div>
                <div className="p-2.5 pl-3.6 relative block ml-10">
                  <a className="timeline-panel" href="javascript:void(0);">
                    <h6 className="mb-0">Order Placed</h6>
                    <span className="mb-1 text-xs tracking-wide text-body">10/04/2024 2:36pm</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* Item Details Tab */}
        <div>
          <h5 className="mb-2">Item Details</h5>
          <div className="flex items-center mb-6">
            <div className="w-[85px] h-auto border border-border p-2.5 rounded-lg mr-5"><img src="assets/images/shop/small/pic1.png" alt="" /></div>
            <div className="tracking-product-content">
              <h6 className="title">Collar Casual Shirt</h6>
              <small className="block text-body"><strong>Price</strong>: $150</small>
              <small className="block text-body"><strong>Size</strong>: XL</small>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-body">Total Price</span>
            <h6 className="mb-2 font-semibold">+ $150</h6>
          </div>
          <div className="flex justify-between mb-2 border-b border-light">
            <span className="text-success">Total Discounts</span>
            <h6 className="mb-2 font-semibold">- $55</h6>
          </div>
          <div className="flex justify-between">
            <span className="text-body">Order Total</span>
            <h6 className="mb-2 font-semibold">$95</h6>
          </div>
        </div>
        {/* Courier Tab */}
        <div >
         <p className="text-body">Commyolk Suspendisse et justo. Praesent mattis augue Aliquam ornare hendrerit augue Cras tellus In pulvinar lectus a est Curabitur eget orci Cras laoreet. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commyolk augue aliquam ornare.</p>
        </div>
        {/* Receiver Tab */}
        <div>
          <h5 className="mb-6 text-success">Thank you Your order has been received</h5>
          <ul className="tracking-receiver">
            <li className="mb-1.1 text-sm text-body">Order Number: <strong className="text-title">#17493</strong></li>
            <li className="mb-1.1 text-sm text-body">Date: <strong className="text-title">17/04/2024, 02:34pm</strong></li>
            <li className="mb-1.1 text-sm text-body">Total: <strong className="text-title">$95</strong></li>
            <li className="mb-1.1 text-sm text-body">Payment Methods: <strong className="text-title">Cash on Delivery</strong></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="cancelation" className="xl:w-3/4 w-full xl:pl-9 pl-3.6 mt-10">
  <div className="flex flex-wrap">
    
    {/* ITEM 1 */}
    <div className="lg:w-1/2 w-full mb-7.5">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h6 className="mb-0">
            Request No: <span className="text-primary">#1374837</span>
          </h6>
        </div>

        <a href="#" className="flex items-center p-5 border border-dashed rounded-lg border-black/20">
          <div className="w-[90px]">
            <img src="/assets/images/shop/small/pic1.png" alt="" />
          </div>

          <div className="ml-5">
            <span>March 21, 2024</span>
            <h5>Collar Casual Shirt</h5>
            <p className="mb-2">
              Quantity: <strong className="text-black">1</strong>
            </p>
            <h6 className="mb-0">$105</h6>
          </div>
        </a>
      </div>
    </div>

    {/* ITEM 2 */}
    <div className="lg:w-1/2 w-full mb-7.5">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h6 className="mb-0">
            Request No: <span className="text-primary">#1374837</span>
          </h6>
        </div>

        <a href="#" className="flex items-center p-5 border border-dashed rounded-lg border-black/20">
          <div className="w-[90px]">
            <img src="/assets/images/shop/small/pic2.png" alt="" />
          </div>

          <div className="ml-5">
            <span>March 21, 2024</span>
            <h5>Collar Casual Shirt</h5>
            <p className="mb-2">
              Quantity: <strong className="text-black">1</strong>
            </p>
            <h6 className="mb-0">$304</h6>
          </div>
        </a>
      </div>
    </div>

    {/* REASON */}
    <div className="lg:w-1/2 mb-7.5">
      <h4 className="mb-2">Reason For Cancellation</h4>

      <div className="mb-1">
        <input className="bg-white form-check-input radio" type="radio" name="reason" id="r1" />
        <label className="ml-2 text-body" htmlFor="r1">I have changed my mind</label>
      </div>

      <div className="mb-1">
        <input className="bg-white form-check-input radio" type="radio" name="reason" id="r2" />
        <label className="ml-2 text-body" htmlFor="r2">Expected delivery time is very long</label>
      </div>

      <div className="mb-1">
        <input className="bg-white form-check-input radio" type="radio" name="reason" id="r3" />
        <label className="ml-2 text-body" htmlFor="r3">I want to change address for the order</label>
      </div>

      <div className="mb-1">
        <input className="bg-white form-check-input radio" type="radio" name="reason" id="r4" />
        <label className="ml-2 text-body" htmlFor="r4">I want to convert my order to Prepaid</label>
      </div>

      <div className="mb-1">
        <input className="bg-white form-check-input radio" type="radio" name="reason" id="r5" />
        <label className="ml-2 text-body" htmlFor="r5">Price for the product has decreased</label>
      </div>

      <div className="mb-1">
        <input className="bg-white form-check-input radio" type="radio" name="reason" id="r6" />
        <label className="ml-2 text-body" htmlFor="r6">I have purchased the product elsewhere</label>
      </div>
    </div>

    {/* REFUND */}
    <div className="lg:w-1/2">
      <h4 className="mb-2">Refund status</h4>
      <p className="mb-4">
        There will be no refund as the order is purchased using Cash-On-Delivery
      </p>

      <a
        href="#"
        className="btn py-3 px-7.5 max-sm:px-6 text-base max-sm:text-sm font-Lufga inline-block font-medium leading-[1.2] border border-secondary bg-secondary text-white rounded-xl duration-700 relative overflow-hidden xl:mr-4 mr-2 btnhover20"
      >
        Submit Request
      </a>
    </div>

  </div>
</section>


 


<section id="dashboard" className="xl:w-3/4 w-full xl:pl-9 pl-3.6">
      <div className="border border-black/10 p-7.5 rounded-xl min-h-[250px] max-sm:p-5">

        {/* HEADER TEXT */}
        <div className="mb-7.5">
          <p className="mb-4 text-body">
            Hello <strong className="text-black">John Doe</strong> (not{" "}
            <strong>John Doe</strong>?{" "}
            <a href="#" className="underline hover:text-primary">
              Log out
            </a>
            )
          </p>

          <p className="mb-4 text-body">
            From your account dashboard you can view your{" "}
            <a href="#" className="underline hover:text-primary">
              recent orders
            </a>
            , manage your{" "}
            <a href="#" className="underline hover:text-primary">
              shipping and billing addresses
            </a>
            , and{" "}
            <a href="#" className="underline hover:text-primary">
              edit your password and account details
            </a>
            .
          </p>
        </div>

       
        <div className="flex flex-wrap -mx-2">

          
          <div className="w-full px-2 mb-4 md:w-1/3">
            <div className="flex items-center justify-between px-6 py-5 duration-500 bg-white border rounded-lg shadow border-black/5 group hover:bg-primary md:block">
              <div className="flex items-center justify-center mb-3 bg-white border rounded-lg w-14 h-14">
                
                <span className="text-xl text-primary">🛒</span>
              </div>
              <div>
                <span className="text-sm group-hover:text-white">Total Order</span>
                <h2 className="text-2xl font-medium group-hover:text-white">
                  3658
                </h2>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="w-full px-2 mb-4 md:w-1/3">
            <div className="flex items-center justify-between px-6 py-5 duration-500 bg-white border rounded-lg shadow border-black/5 group hover:bg-primary md:block">
              <div className="flex items-center justify-center mb-3 bg-white border rounded-lg w-14 h-14">
                <span className="text-xl text-primary">🚚</span>
              </div>
              <div>
                <span className="text-sm group-hover:text-white">
                  Total Pending Order
                </span>
                <h2 className="text-2xl font-medium group-hover:text-white">
                  215
                </h2>
              </div>
            </div>
          </div>

          
          <div className="w-full px-2 mb-4 md:w-1/3">
            <div className="flex items-center justify-between px-6 py-5 duration-500 bg-white border rounded-lg shadow border-black/5 group hover:bg-primary md:block">
              <div className="flex items-center justify-center mb-3 bg-white border rounded-lg w-14 h-14">
                <span className="text-xl text-primary">⚙️</span>
              </div>
              <div>
                <span className="text-sm group-hover:text-white">
                  Total Wishlist
                </span>
                <h2 className="text-2xl font-medium group-hover:text-white">
                  31576
                </h2>
              </div>
            </div>
          </div>

          
          <div className="w-full px-2 mb-4 xl:w-2/3">
            <div className="bg-white px-3.6 shadow rounded-lg border border-black/5">
              <div id="handleSalesChart" className="w-full h-[300px]"></div>
            </div>
          </div>

        
          <div className="w-full px-2 mb-4 xl:w-1/3">
            <div className="flex flex-col p-4 bg-white border rounded-lg border-border">
              <h6 className="mb-3 font-semibold">Your Top Countries</h6>

              <ul>
                {[
                  { name: "United States", amount: "$130.00", flag: "🇺🇸" },
                  { name: "India", amount: "$110.00", flag: "🇮🇳" },
                  { name: "Africa", amount: "$90.00", flag: "🌍" },
                  { name: "Canada", amount: "$75.00", flag: "🇨🇦" },
                  { name: "Brazil", amount: "$60.00", flag: "🇧🇷" },
                  { name: "Jordan", amount: "$50.00", flag: "🇯🇴" }
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-border last:border-none"
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.flag}</span>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <h6 className="font-semibold">{item.amount}</h6>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  
<section id="return" className="xl:w-3/4 w-full xl:pl-9 pl-3.6">
  <div className="row">
    
    <div className="w-full mb-7.5">
      <h3 className="mb-0">REQUEST FOR PRODUCT RETURN (2)</h3>
    </div>

    <div className="lg:w-1/2 w-full mb-7.5">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h6 className="mb-0">
            Request No: <span className="text-primary">#1374837</span>
          </h6>
          <a href="javascript:void(0);" className="underline btn-link text-success">
            Return Made
          </a>
        </div>

        <a href="account-return-request-detail.html" className="flex items-center p-5 border border-dashed rounded-lg border-black/20">
          <div className="w-[90px]">
            <img src="assets/images/shop/small/pic1.png" alt="" />
          </div>
          <div className="ml-5">
            <span>March 21, 2024</span>
            <h5>Collar Casual Shirt</h5>
            <p className="mb-2">
              Quantity: <strong className="text-black">1</strong>
            </p>
            <h6 className="mb-0">$105</h6>
          </div>
        </a>
      </div>
    </div>

    <div className="lg:w-1/2 w-full mb-7.5">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h6 className="mb-0">
            Request No: <span className="text-primary">#1374837</span>
          </h6>
          <a href="javascript:void(0);" className="underline btn-link text-priamry">
            Request Submited
          </a>
        </div>

        <a href="account-return-request-detail.html" className="flex items-center p-5 border border-dashed rounded-lg border-black/20">
          <div className="w-[90px]">
            <img src="assets/images/shop/small/pic2.png" alt="" />
          </div>
          <div className="ml-5">
            <span>March 21, 2024</span>
            <h5>Collar Casual Shirt</h5>
            <p className="mb-2">
              Quantity: <strong className="text-black">1</strong>
            </p>
            <h6 className="mb-0">$304</h6>
          </div>
        </a>
      </div>
    </div>

    <div className="lg:w-1/2 w-full mb-7.5">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h6 className="mb-0">
            Request No: <span className="text-primary">#1374837</span>
          </h6>
          <a href="javascript:void(0);" className="underline btn-link text-priamry">
            Request Submited
          </a>
        </div>

        <a href="account-return-request-detail.html" className="flex items-center p-5 border border-dashed rounded-lg border-black/20">
          <div className="w-[90px]">
            <img src="assets/images/shop/small/pic1.png" alt="" />
          </div>
          <div className="ml-5">
            <span>March 21, 2024</span>
            <h5>Classic Denim Skinny Jeans</h5>
            <p className="mb-2">
              Quantity: <strong className="text-black">1</strong>
            </p>
            <h6 className="mb-0">$657</h6>
          </div>
        </a>
      </div>
    </div>

    <div className="lg:w-1/2 w-full mb-7.5">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h6 className="mb-0">
            Request No: <span className="text-primary">#1374837</span>
          </h6>
          <a href="javascript:void(0);" className="underline btn-link text-priamry">
            Request Submited
          </a>
        </div>

        <a href="account-return-request-detail.html" className="flex items-center p-5 border border-dashed rounded-lg border-black/20">
          <div className="w-[90px]">
            <img src="assets/images/shop/small/pic2.png" alt="" />
          </div>
          <div className="ml-5">
            <span>March 21, 2024</span>
            <h5>Plaid Wool Winter Coat</h5>
            <p className="mb-2">
              Quantity: <strong className="text-black">1</strong>
            </p>
            <h6 className="mb-0">$245</h6>
          </div>
        </a>
      </div>
    </div>

  </div>
</section>

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
    {/* Load jQuery FIRST */}
<Script
  src="/assets/js/jquery.min.js"
  strategy="afterInteractive"
  onLoad={() => {
    window.$ = window.jQuery;
  }}
/>

{/* Then ALL plugins AFTER jQuery */}
<Script src="/assets/vendor/wow/wow.min.js" strategy="afterInteractive" />
<Script src="/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
<Script src="/assets/vendor/bootstrap-select/dist/js/bootstrap-select.min.js" strategy="afterInteractive" />
<Script src="/assets/vendor/bootstrap-touchspin/bootstrap-touchspin.js" strategy="afterInteractive" />
<Script src="/assets/vendor/magnific-popup/magnific-popup.js" strategy="afterInteractive" />
<Script src="/assets/vendor/counter/waypoints-min.js" strategy="afterInteractive" />
<Script src="/assets/vendor/counter/counterup.min.js" strategy="afterInteractive" />
<Script src="/assets/vendor/swiper/swiper-bundle.min.js" strategy="afterInteractive" />
<Script src="/assets/vendor/imagesloaded/imagesloaded.js" strategy="afterInteractive" />
<Script src="/assets/vendor/masonry/masonry-4.2.2.js" strategy="afterInteractive" />
<Script src="/assets/vendor/masonry/isotope.pkgd.min.js" strategy="afterInteractive" />
<Script src="/assets/vendor/countdown/jquery.countdown.js" strategy="afterInteractive" />
<Script src="/assets/vendor/wnumb/wNumb.js" strategy="afterInteractive" />
<Script src="/assets/vendor/nouislider/nouislider.min.js" strategy="afterInteractive" />
<Script src="/assets/vendor/slick/slick.min.js" strategy="afterInteractive" />
<Script src="/assets/vendor/lightgallery/dist/lightgallery.min.js" strategy="afterInteractive" />
<Script src="/assets/vendor/lightgallery/dist/plugins/thumbnail/lg-thumbnail.min.js" strategy="afterInteractive" />
<Script src="/assets/vendor/lightgallery/dist/plugins/zoom/lg-zoom.min.js" strategy="afterInteractive" />
<Script src="/assets/vendor/niceselect/js/jquery.nice-select.min.js" strategy="afterInteractive" />

{/* Custom scripts LAST */}
<Script src="/assets/js/dz.carousel.js" strategy="afterInteractive" />
<Script src="/assets/js/dz.ajax.js" strategy="afterInteractive" />
<Script src="/assets/js/custom.js" strategy="afterInteractive" />
</>
  )
}
