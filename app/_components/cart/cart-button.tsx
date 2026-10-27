"use client";

import { CartIcon } from "../icons";
import { useCart } from "./cart-context";

export function FloatingCartButton() {
  const { totalItems, openCart, isOpen, addedTick } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={totalItems === 0 ? "Abrir carrito" : `Abrir carrito, ${totalItems} productos`}
      className={`group fixed bottom-5 right-5 z-60 grid size-16 place-items-center rounded-full bg-brand text-white shadow-2xl shadow-brand/40 ring-4 ring-cream transition duration-300 hover:scale-110 hover:bg-brand-dark md:bottom-8 md:right-8 ${
        isOpen ? "pointer-events-none scale-0 opacity-0" : ""
      }`}
    >
      <CartIcon key={addedTick} className={`size-7 ${addedTick ? "cart-shake" : ""}`} />
      {totalItems > 0 && (
        <span
          key={`badge-${addedTick}`}
          className="cart-bump absolute -right-1 -top-1 grid min-w-7 place-items-center rounded-full bg-mustard px-1.5 py-0.5 font-display text-lg leading-none text-ink ring-2 ring-cream"
        >
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-sm opacity-0 transition-opacity group-hover:opacity-100">
        {totalItems === 0 ? "Tu pedido" : `${totalItems} ${totalItems === 1 ? "producto" : "productos"}`}
      </span>
    </button>
  );
}
