import Image from "next/image";
import burger from "@/public/images/hero/h2.jpg";
import molcajete from "@/public/images/hero/desckpot-3.webp";
import imperiales from "@/public/images/hero/h1.jpg";
import drinks from "@/public/images/hero/h4.jpg";
import mark from "@/public/images/mark.png";
import { site } from "../_data/site";
import { ArrowIcon, ClockIcon, PinIcon, StarIcon } from "./icons";

const slides = [
  { src: burger, alt: "Burger de top sirloin con tocino crujiente en Pinup's" },
  { src: molcajete, alt: "Molcajete Borracho con arrachera, pollo y camarón" },
  { src: imperiales, alt: "Camarones Imperiales servidos en tendedero" },
  { src: drinks, alt: "Pinup Rita con sandía y bebida de pepino" },
];

const headline = [
  { text: "Burgers,", className: "text-cream" },
  { text: "mariscos", className: "text-outline text-cream" },
  { text: "& rock", className: "text-brand" },
  { text: "en vivo", className: "text-cream" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-svh items-end overflow-hidden bg-ink pb-24 pt-32 md:pb-28">
      <div className="absolute inset-0 -z-10" aria-hidden>
        {slides.map((s, i) => (
          <div key={i} className="hero-slide absolute inset-0" style={{ "--i": i } as React.CSSProperties}>
            <Image
              src={s.src}
              alt=""
              fill
              sizes="100vw"
              placeholder="blur"
              className="object-cover"
              {...(i === 0 ? { preload: true } : {})}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <p className="rise mb-5 flex items-center gap-2 font-display text-xl tracking-[0.2em] text-mustard" style={{ "--d": "100ms" } as React.CSSProperties}>
          <StarIcon className="size-4" /> Zona Dorada · Mazatlán
        </p>

        <h1 className="font-display text-[clamp(4.2rem,15vw,12.5rem)] leading-[0.82] tracking-tight">
          <span className="sr-only">{site.name}: </span>
          {headline.map((w, i) => (
            <span key={w.text} className="block overflow-hidden pb-[0.04em]">
              <span className={`rise inline-block ${w.className}`} style={{ "--d": `${200 + i * 110}ms` } as React.CSSProperties}>
                {w.text}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="rise max-w-md" style={{ "--d": "750ms" } as React.CSSProperties}>
            <p className="text-lg leading-relaxed text-cream/85 md:text-xl">
              Música en vivo, buena comida y el mejor ambiente. Burgers de top sirloin, mariscos frescos y las
              famosas <strong className="font-semibold text-cream">Pinup Ritas</strong>.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={site.phoneHref}
                className="group inline-flex items-center gap-3 rounded-full bg-brand px-7 py-4 font-display text-2xl tracking-wider text-white transition hover:bg-brand-dark"
              >
                Reserva: {site.phoneDisplay}
              </a>
              <a
                href="#menu"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-cream/80 px-7 py-4 font-display text-2xl tracking-wider text-cream transition hover:bg-cream hover:text-ink"
              >
                Ver menú
                <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <ul className="rise flex flex-col gap-2 text-cream/80 md:text-right" style={{ "--d": "900ms" } as React.CSSProperties}>
            <li className="flex items-center gap-2 md:justify-end">
              <ClockIcon className="size-4 text-brand" />
              {site.hours.days} · {site.hours.time}
            </li>
            <li className="flex items-center gap-2 md:justify-end">
              <PinIcon className="size-4 text-brand" />
              {site.address.street} · {site.address.neighborhood}
            </li>
          </ul>
        </div>
      </div>

      {/* Spinning badge */}
      <a
        href="#musica"
        aria-label="Ver música en vivo"
        className="rise absolute right-5 top-28 hidden size-36 md:right-10 md:top-32 md:block lg:size-44"
        style={{ "--d": "1100ms" } as React.CSSProperties}
      >
        <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 size-full" aria-hidden>
          <defs>
            <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <circle cx="100" cy="100" r="98" className="fill-brand" />
          <text className="fill-white font-display text-[25px] tracking-[0.18em]">
            <textPath href="#badge-circle">Música en vivo ✦ Fun & Grill ✦ </textPath>
          </text>
        </svg>
        <Image src={mark} alt="" className="absolute left-1/2 top-1/2 w-[42%] -translate-x-1/2 -translate-y-1/2" />
      </a>

      <div className="checker absolute inset-x-0 bottom-0 opacity-90" aria-hidden />
    </section>
  );
}
