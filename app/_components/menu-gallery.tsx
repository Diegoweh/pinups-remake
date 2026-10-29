"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import boneless from "@/public/images/gallery/boneless.webp";
import burgerChampinones from "@/public/images/gallery/burger-champinones.webp";
import burgerTocino from "@/public/images/gallery/burger-tocino.webp";
import camaronesTendedero from "@/public/images/gallery/camarones-tendedero.webp";
import ceviche from "@/public/images/gallery/ceviche-especial.webp";
import costillas from "@/public/images/gallery/costillas-bbq.webp";
import gratinados from "@/public/images/gallery/gratinados.webp";
import molcajete from "@/public/images/gallery/molcajete-borracho.webp";
import rockamole from "@/public/images/gallery/rockamole.webp";
import tacosCamaron from "@/public/images/gallery/tacos-camaron.webp";
import tostaditas from "@/public/images/gallery/tostaditas-champinones.webp";
import { ArrowIcon, CloseIcon, PhotosIcon } from "./icons";

const photos = [
  { src: burgerChampinones, name: "Pinup's Burger", alt: "Pinup's Burger con champiñones, tocino y queso fundido" },
  { src: molcajete, name: "Molcajete Borracho", alt: "Molcajete Borracho con arrachera, camarón y nopales" },
  { src: ceviche, name: "Ceviche Pinup's Especial", alt: "Ceviche de camarón en molcajete con aguacate" },
  { src: camaronesTendedero, name: "Imperiales", alt: "Camarones envueltos en tocino colgados en tendedero" },
  { src: boneless, name: "Boneless", alt: "Boneless bañados en salsa con papas y ranch" },
  { src: rockamole, name: "Rockamole", alt: "Guacamole en molcajete con totopos" },
  { src: tacosCamaron, name: "Tacos de camarón", alt: "Tacos de camarón en tortilla roja con aguacate" },
  { src: costillas, name: "Baby Back BBQ Ribs", alt: "Costillas BBQ con papas gajo y croqueta" },
  { src: burgerTocino, name: "Bacon Burger", alt: "Burger con tocino, queso fundido y pan glaseado" },
  { src: gratinados, name: "Gratinados", alt: "Pan tostado con camarón gratinado y ensalada" },
  { src: tostaditas, name: "Tostaditas", alt: "Tostaditas con champiñones, carne y salsa" },
];

/** "Ver platillos" button that opens the dish photos in a swipeable popup. */
export function MenuGallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const goTo = (i: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const next = (i + photos.length) % photos.length;
    track.scrollTo({ left: next * track.clientWidth, behavior: smooth ? "smooth" : "instant" });
  };

  const show = () => {
    dialogRef.current?.showModal();
    setOpen(true);
    goTo(0, false);
  };

  const close = () => dialogRef.current?.close();

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={show}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-xl tracking-wider text-cream transition hover:-rotate-2 hover:bg-brand"
      >
        <PhotosIcon className="size-5" />
        Ver platillos
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="menu-gallery-title"
        onClose={() => setOpen(false)}
        // Clicks on the dialog element itself land on the backdrop area around the content.
        onClick={(e) => e.target === e.currentTarget && close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") goTo(current + 1);
          if (e.key === "ArrowLeft") goTo(current - 1);
        }}
        className="m-auto w-[min(100%-2rem,56rem)] max-w-none overflow-visible bg-transparent p-0 text-cream opacity-0 transition-[opacity,scale] duration-300 ease-snap backdrop:bg-ink/85 backdrop:backdrop-blur-sm open:scale-100 open:opacity-100 starting:open:scale-95 starting:open:opacity-0"
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 id="menu-gallery-title" className="font-display text-3xl leading-none md:text-4xl">
            {photos[current].name}
          </h2>
          <div className="flex items-center gap-3">
            <span className="font-display text-xl tracking-widest text-cream/60" aria-live="polite">
              {current + 1}/{photos.length}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar galería"
              className="grid size-11 place-items-center rounded-full bg-brand text-white transition hover:rotate-90 hover:bg-brand-dark"
            >
              <CloseIcon className="size-6" />
            </button>
          </div>
        </div>

        <div className="relative">
          <ul
            ref={trackRef}
            onScroll={(e) => {
              const t = e.currentTarget;
              setCurrent(Math.round(t.scrollLeft / t.clientWidth));
            }}
            className="flex aspect-square snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-3xl bg-ink [scrollbar-width:none] md:aspect-[4/3]"
          >
            {photos.map((p, i) => (
              <li key={p.name} className="relative w-full shrink-0 snap-center" aria-hidden={i !== current}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 56rem, 100vw" className="object-cover" />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => goTo(current - 1)}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-cream text-ink shadow-lg transition hover:scale-110 hover:bg-brand hover:text-white"
          >
            <ArrowIcon className="size-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            aria-label="Foto siguiente"
            className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-cream text-ink shadow-lg transition hover:scale-110 hover:bg-brand hover:text-white"
          >
            <ArrowIcon className="size-5" />
          </button>
        </div>

        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {photos.map((p, i) => (
            <li key={p.name} className="shrink-0">
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ver ${p.name}`}
                aria-current={i === current || undefined}
                className={`relative block size-14 overflow-hidden rounded-xl border-2 transition md:size-16 ${
                  i === current ? "border-brand" : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <Image src={p.src} alt="" fill sizes="4rem" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}
