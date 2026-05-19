"use client";

import { ShoppingCart, Heart } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function ShopNavbar() {
  const {
    cartCount,
    wishlist,
    setWishlistOpen,
  } = useStore();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between h-16 max-w-6xl px-4 mx-auto">

        {/* LOGO */}
        <h1 className="text-xl font-bold">
          📚 BookStore
        </h1>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-6">

          {/* WISHLIST */}
          <button
            onClick={() => setWishlistOpen(true)}
            className="relative"
          >
            <Heart className="text-gray-700" />

            {wishlist.length > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* CART */}
          <button className="relative">
            <ShoppingCart />

            {cartCount > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-orange-500 rounded-full -top-2 -right-2">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}