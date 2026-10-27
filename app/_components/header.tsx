"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/public/images/logo.png";
import { nav, site } from "../_data/site";
import { PhoneIcon } from "./icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled && !open ? "bg-ink/85 py-2 shadow-lg shadow-black/30 backdrop-blur-md" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <a href="#inicio" aria-label={`${site.name} – inicio`} className="relative z-10 shrink-0">
          <Image
            src={logo}
            alt={site.name}
            className={`h-auto transition-all duration-500 ${scrolled ? "w-28" : "w-32 md:w-36"}`}
            preload
          />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative font-display text-xl tracking-wider text-cream"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-display text-lg tracking-wider text-white transition hover:-rotate-2 hover:scale-105 hover:bg-brand-dark"
          >
            <PhoneIcon className="size-4" />
            Reservar
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="grid size-11 place-items-center rounded-full border border-cream/30 lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-cream transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-cream transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`fixed inset-0 flex flex-col justify-center bg-brand px-8 transition-[clip-path] duration-700 ease-snap lg:hidden ${
          open ? "[clip-path:circle(150%_at_100%_0)]" : "pointer-events-none [clip-path:circle(0_at_100%_0)]"
        }`}
        inert={!open}
      >
        <nav aria-label="Móvil" className="flex flex-col gap-2">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`font-display text-6xl text-white transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <p className="mt-10 text-lg text-white/80">
          {site.address.street} · {site.address.neighborhood}
          <br />
          {site.hours.days} · {site.hours.time}
        </p>
      </div>
    </header>
  );
}
