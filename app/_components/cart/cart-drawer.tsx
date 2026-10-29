"use client";

import { useEffect, useMemo, useRef } from "react";
import { menu, site } from "../../_data/site";
import { CartIcon, CloseIcon, MinusIcon, NoteIcon, PlusIcon, TrashIcon, WhatsAppIcon } from "../icons";
import { useCart, type ResolvedLine } from "./cart-context";
import { ProductImage } from "./product-image";

const money = (n: number) => `$${n.toLocaleString("es-MX")}`;

function buildWhatsAppMessage(lines: ResolvedLine[], totalItems: number, total: number, hasPending: boolean) {
  let msg = `*🍔 PEDIDO PINUP'S FUN & GRILL*\n\n`;
  lines.forEach((line, i) => {
    msg += `${i + 1}. *${line.item.name}* x${line.quantity}\n`;
    msg +=
      line.unitPrice === null
        ? `   💲 Precio a confirmar\n`
        : `   💲 ${money(line.unitPrice)} c/u = ${money(line.unitPrice * line.quantity)}\n`;
    for (const opt of line.optionLabels) msg += `   • ${opt.title}: ${opt.label}\n`;
    const notes = line.notes.trim().replace(/\s+/g, " ");
    if (notes) msg += `   📝 ${notes}\n`;
    msg += "\n";
  });
  msg += `━━━━━━━━━━━━━━━\n`;
  msg += `*Productos:* ${totalItems}\n`;
  msg += `*TOTAL: ${money(total)} MXN*${hasPending ? " + productos con precio a confirmar" : ""}\n\n`;
  msg += `_¿Me confirman mi pedido?_ 🙏`;
  return msg;
}

/** Starters the guest doesn't have yet, offered as quick add-ons. */
const suggestionPool = menu.find((s) => s.id === "entradas")?.items ?? [];

export function CartDrawer() {
  const {
    lines,
    totalItems,
    total,
    hasPendingPrices,
    isOpen,
    closeCart,
    addItem,
    setQuantity,
    setOption,
    setNotes,
    removeLine,
    clear,
  } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  const suggestions = useMemo(() => {
    if (lines.length === 0) return [];
    const inCart = new Set(lines.map((l) => l.itemId));
    return suggestionPool.filter((item) => !inCart.has(item.id)).slice(0, 3);
  }, [lines]);

  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    buildWhatsAppMessage(lines, totalItems, total, hasPendingPrices),
  )}`;

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden
        className={`fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        inert={!isOpen}
        className={`fixed inset-y-0 right-0 z-[80] flex w-full flex-col bg-cream text-ink shadow-2xl transition-transform duration-500 ease-snap sm:w-[440px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="relative bg-brand px-6 pb-5 pt-5 text-white">
          <div className="flex items-center justify-between">
            <h2 id="cart-title" className="flex items-center gap-3 font-display text-4xl leading-none">
              <CartIcon className="size-7" />
              Tu pedido
            </h2>
            <button
              ref={closeRef}
              type="button"
              onClick={closeCart}
              aria-label="Cerrar carrito"
              className="grid size-11 place-items-center rounded-full transition hover:rotate-90 hover:bg-brand-dark"
            >
              <CloseIcon className="size-6" />
            </button>
          </div>
          <div className="checker absolute inset-x-0 -bottom-px h-3 [--checker-color:var(--color-cream)] [--sq:6px]" aria-hidden />
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <CartIcon className="size-20 text-ink/15" />
              <p className="mt-4 font-display text-3xl">Tu carrito está vacío</p>
              <p className="mt-1 text-ink/60">Agrega platillos desde el menú.</p>
              <a
                href="#menu"
                onClick={closeCart}
                className="mt-6 rounded-full bg-ink px-6 py-3 font-display text-xl tracking-wider text-cream transition hover:bg-brand"
              >
                Ver menú
              </a>
            </div>
          ) : (
            <>
              <ul className="flex flex-col divide-y-2 divide-dashed divide-ink/15">
                {lines.map((line) => (
                  <li key={line.key} className="cart-line py-5 first:pt-0">
                    <div className="flex gap-4">
                      <ProductImage item={line.item} sizes="72px" className="size-18 rounded-2xl" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-2xl leading-none">{line.item.name}</h3>
                          <button
                            type="button"
                            onClick={() => removeLine(line.key)}
                            aria-label={`Quitar ${line.item.name}`}
                            className="-mr-1 -mt-1 grid size-8 shrink-0 place-items-center rounded-full text-ink/40 transition hover:bg-brand/10 hover:text-brand"
                          >
                            <TrashIcon className="size-4" />
                          </button>
                        </div>
                        {line.item.description && (
                          <p className="mt-1.5 text-sm leading-snug text-ink/70">{line.item.description}</p>
                        )}
                        <p className="mt-1 text-sm text-ink/60">
                          {line.unitPrice === null ? "Precio a confirmar" : `${money(line.unitPrice)} c/u`}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center rounded-full border-2 border-ink">
                            <button
                              type="button"
                              onClick={() => setQuantity(line.key, line.quantity - 1)}
                              aria-label="Disminuir cantidad"
                              className="grid size-8 place-items-center rounded-full transition hover:bg-ink hover:text-cream"
                            >
                              <MinusIcon className="size-4" />
                            </button>
                            <span className="w-8 text-center font-display text-xl" aria-live="polite">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQuantity(line.key, line.quantity + 1)}
                              aria-label="Aumentar cantidad"
                              className="grid size-8 place-items-center rounded-full transition hover:bg-ink hover:text-cream"
                            >
                              <PlusIcon className="size-4" />
                            </button>
                          </div>
                          <span className="font-display text-2xl text-brand">
                            {line.unitPrice === null ? "$$$$" : money(line.unitPrice * line.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {line.item.options && (
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {line.item.options.map((group) => (
                          <label key={group.id} className="block">
                            <span className="mb-1 block font-display text-sm tracking-[0.15em] text-ink/60">
                              {group.title}
                            </span>
                            <select
                              value={line.options[group.id] ?? group.choices[0].id}
                              onChange={(e) => setOption(line.key, group.id, e.target.value)}
                              className="w-full appearance-none rounded-xl border-2 border-ink/15 bg-white bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%23151112%22%20stroke-width=%222.5%22%3E%3Cpath%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat py-2 pl-3 pr-9 text-sm outline-none transition focus:border-brand"
                            >
                              {group.choices.map((c) => (
                                <option key={c.id} value={c.id}>
                                  {c.label}
                                  {c.price ? ` (+$${c.price})` : ""}
                                </option>
                              ))}
                            </select>
                          </label>
                        ))}
                      </div>
                    )}

                    <label className="mt-3 block">
                      <span className="mb-1 flex items-center gap-1.5 font-display text-sm tracking-[0.15em] text-ink/60">
                        <NoteIcon className="size-3.5 text-brand" />
                        Comentarios
                      </span>
                      <textarea
                        value={line.notes}
                        onChange={(e) => setNotes(line.key, e.target.value)}
                        maxLength={160}
                        rows={1}
                        placeholder="Ej. sin cebolla, término medio"
                        className="field-sizing-content min-h-10 w-full resize-none rounded-xl border-2 border-ink/15 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-ink/35 focus:border-brand"
                      />
                    </label>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={clear}
                className="mt-2 w-full rounded-full py-2 text-sm font-medium text-ink/50 transition hover:bg-brand/10 hover:text-brand"
              >
                Vaciar carrito
              </button>

              {suggestions.length > 0 && (
                <section aria-labelledby="cart-suggestions" className="mt-6 border-t-2 border-ink pt-5">
                  <h3 id="cart-suggestions" className="font-display text-2xl">
                    🔥 No olvides algo pa&apos; picar
                  </h3>
                  <ul className="mt-3 flex flex-col gap-3">
                    {suggestions.map((item) => (
                      <li key={item.id} className="flex items-center gap-3">
                        <ProductImage item={item} sizes="48px" className="size-12 rounded-xl" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-display text-xl leading-none">{item.name}</p>
                          <p className="text-sm text-brand">{item.price === null ? "$$$$" : money(item.price)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => addItem(item.id)}
                          aria-label={`Agregar ${item.name}`}
                          className="grid size-9 place-items-center rounded-full bg-brand text-white transition hover:scale-110 hover:bg-brand-dark"
                        >
                          <PlusIcon className="size-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t-2 border-ink/10 bg-white px-6 pb-6 pt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-ink/60">
                {totalItems} {totalItems === 1 ? "producto" : "productos"}
              </span>
              <span className="font-display text-4xl leading-none">{money(total)}</span>
            </div>
            {hasPendingPrices && (
              <p className="mt-1 text-right text-xs text-ink/50">+ productos con precio a confirmar</p>
            )}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener"
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-[#25d366] py-4 font-display text-2xl tracking-wider text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1ebe5b] hover:shadow-xl"
            >
              <WhatsAppIcon className="size-6" />
              Enviar pedido por WhatsApp
            </a>
            <p className="mt-2 text-center text-xs text-ink/45">
              Te confirmamos disponibilidad, tiempo de entrega y total final por WhatsApp.
            </p>
          </footer>
        )}
      </aside>
    </>
  );
}
