import Link from 'next/link';
import { Search, Heart, ShoppingCart, Menu } from 'lucide-react';

export default function ShopHeader() {
  return (
    <header className="site-header mo-left header style-1 header-transparent">
      {/* Main Header */}
      <div className="sticky-header main-bar-wraper navbar-expand-lg">
        <div className="main-bar !border-b !border-black/10 after:block after:content-[''] after:clear-both">
          <div className="container-fluid after:block after:content-[''] after:clear-both lg:flex block">
            {/* Website Logo */}
            <div className="logo-header logo-dark md:mr-12">
              <Link href="/">
                <img src="/assets/images/logo.svg" alt="logo" />
              </Link>
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
                <Link href="/">
                  <img src="/assets/images/logo.svg" alt="" />
                </Link>
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
  );
}