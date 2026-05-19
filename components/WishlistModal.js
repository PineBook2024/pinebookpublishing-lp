"use client";

import { X, Trash2 } from "lucide-react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";

export default function WishlistModal() {
  const {
    wishlist,
    wishlistOpen,
    setWishlistOpen,
    removeFromWishlist,
  } = useStore();

  if (!wishlistOpen) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={() => setWishlistOpen(false)}
      />

      {/* MODAL */}
      <div className="fixed right-0 top-0 h-full w-[400px] bg-white z-50 shadow-2xl p-4 overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">My Wishlist</h2>

          <button onClick={() => setWishlistOpen(false)}>
            <X />
          </button>
        </div>

        {/* ITEMS */}
        {wishlist.length === 0 ? (
          <p className="text-gray-500">No items in wishlist</p>
        ) : (
          wishlist.map((item) => (
            <div
              key={item.wishlist_id}
              className="flex gap-3 py-3 border-b"
            >
              <div className="relative h-20 w-14">
                <Image
                  src={item.product?.cover_image_url}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-bold">
                  {item.product?.title}
                </h4>

                <p className="text-sm font-bold text-orange-500">
                  ${item.product?.price}
                </p>
              </div>

              <button
                onClick={() => removeFromWishlist(item.wishlist_id)}
                className="text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}