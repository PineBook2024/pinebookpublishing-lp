"use client";
import { useState } from "react";

export default function Navbar() {
  // ---------------- STATE ----------------
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Sophisticated Swagger Suit",
      price: 50,
      qty: 1,
      img: "/assets/images/shop/shop-cart/pic1.jpg",
    },
    {
      id: 2,
      name: "Cozy Knit Cardigan Sweater",
      price: 40,
      qty: 1,
      img: "/assets/images/shop/shop-cart/pic2.jpg",
    },
  ]);

  const [wishlistItems] = useState([
    { id: 1, name: "Suit", price: 50 },
    { id: 2, name: "Sweater", price: 40 },
  ]);

  const [openCart, setOpenCart] = useState(false);

  // ---------------- FUNCTIONS ----------------
  const updateQty = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // ---------------- UI ----------------
  return (
    <header className="site-header header style-1 header-transparent">

      {/* NAVBAR */}
      <div className="flex items-center justify-between p-5 border-b">

        {/* LOGO */}
        <img src="/assets/images/logo.svg" className="h-10" />

        {/* RIGHT ICONS */}
        <ul className="flex items-center gap-5">

          {/* LOGIN */}
          <li>
            <a className="border-b border-black/40">
              Login / Register
            </a>
          </li>

          {/* SEARCH */}
          <li>
            <i className="text-xl cursor-pointer iconly-Light-Search"></i>
          </li>

          {/* WISHLIST */}
          <li className="relative">
            <i className="text-xl cursor-pointer iconly-Light-Heart2"></i>

            {/* BADGE */}
            <span className="absolute -top-2 -right-2 text-[11px] bg-red-500 text-white rounded-full px-1">
              {wishlistItems.length}
            </span>
          </li>

          {/* CART */}
          <li className="relative">
            <i
              className="text-xl cursor-pointer iconly-Broken-Buy"
              onClick={() => setOpenCart(true)}
            ></i>

            {/* BADGE */}
            <span className="absolute -top-2 -right-2 text-[11px] bg-primary text-white rounded-full px-1">
              {cartItems.length}
            </span>
          </li>
        </ul>
      </div>

      {/* ---------------- SIDEBAR CART ---------------- */}
      <div
        className={`fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg transition ${
          openCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* CLOSE */}
        <button
          className="absolute text-2xl top-3 right-4"
          onClick={() => setOpenCart(false)}
        >
          ×
        </button>

        <div className="flex flex-col h-full p-6 overflow-y-auto">

          {/* TITLE */}
          <h3 className="mb-5 text-lg font-bold">
            Shopping Cart ({cartItems.length})
          </h3>

          {/* ITEMS */}
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="py-4 border-b">
                <div className="flex items-center">

                  {/* IMAGE */}
                  <img
                    src={item.img}
                    className="object-cover w-16 h-16 mr-4 rounded"
                  />

                  {/* INFO */}
                  <div className="flex-1">
                    <h6 className="font-medium">{item.name}</h6>

                    {/* QTY */}
                    <div className="flex items-center gap-2 mt-2">

                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="px-2 bg-gray-200"
                      >
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="px-2 bg-gray-200"
                      >
                        +
                      </button>

                      <span className="ml-3 font-medium">
                        ${item.price * item.qty}
                      </span>
                    </div>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-2 text-red-500"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* SUBTOTAL */}
          <div className="pt-5 mt-auto border-t">
            <div className="flex justify-between mb-4 font-bold">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>

            <button className="w-full py-2 mb-3 text-white bg-black">
              Checkout
            </button>

            <button className="w-full py-2 border">
              View Cart
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}