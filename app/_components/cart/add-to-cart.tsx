"use client";

import { useEffect, useState } from "react";
import { menuById } from "../../_data/site";
import { CheckIcon, PlusIcon } from "../icons";
import { useCart } from "./cart-context";

type Props = { itemId: string; variant?: "icon" | "pill"; className?: string };

export function AddToCart({ itemId, variant = "icon", className = "" }: Props) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);
  const item = menuById.get(itemId);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1400);
    return () => clearTimeout(t);
  }, [added]);

  if (!item) return null;

  const onClick = () => {
    addItem(itemId);
    setAdded(true);
    // Items with choices (salsa, proteína…) open the cart so the guest can pick them.
    if (item.options) openCart();
  };

  const Icon = added ? CheckIcon : PlusIcon;

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-xl tracking-wider transition duration-300 ${
          added ? "bg-ink text-cream" : "bg-brand text-white hover:-rotate-2 hover:bg-brand-dark"
        } ${className}`}
      >
        <Icon className={`size-5 transition-transform ${added ? "scale-110" : "group-hover:rotate-90"}`} />
        {added ? "¡Agregado!" : "Agregar al pedido"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Agregar ${item.name} al pedido`}
      className={`grid size-8 shrink-0 place-items-center rounded-full transition duration-300 ${
        added ? "scale-110 bg-ink text-cream" : "bg-brand text-white hover:rotate-90 hover:scale-110 hover:bg-brand-dark"
      } ${className}`}
    >
      <Icon className="size-4" />
    </button>
  );
}
