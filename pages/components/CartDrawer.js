"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-xl z-[999] transition-transform duration-300 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold">Cart</h2>
        <button onClick={() => setIsCartOpen(false)}>✕</button>
      </div>

      <div className="p-4">
        {cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.product_id} className="mb-3">
              <p className="font-medium">{item.title}</p>
              <p>Qty: {item.quantity}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}