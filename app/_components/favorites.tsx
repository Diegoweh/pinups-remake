import Image from "next/image";
import burger from "@/public/images/stars/burger.jpg";
import brochetas from "@/public/images/stars/brochetas.jpg";
import alitas from "@/public/images/stars/alitas.jpg";
import mariscos from "@/public/images/stars/mariscos.jpg";
import { favorites } from "../_data/site";

const images = { burger, brochetas, alitas, mariscos };

export function Favorites() {
  return (
    <section id="favoritos" aria-labelledby="favoritos-title" className="relative bg-cream py-24 text-ink md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="mb-16 md:mb-28">
          <p data-reveal className="font-display text-xl tracking-[0.2em] text-brand">Los que mandan</p>
          <h2 id="favoritos-title" data-reveal style={{ "--d": "100ms" } as React.CSSProperties} className="font-display text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.85]">
            Favoritos de <span className="text-brand">la casa</span>
          </h2>
        </header>

        <ol className="flex flex-col gap-24 md:gap-40">
          {favorites.map((item, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={item.name} className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
                <div className={`relative md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}>
                  <div
                    data-reveal="zoom"
                    className="parallax relative aspect-[4/3] overflow-hidden rounded-[2rem] md:rounded-[3rem]"
                  >
                    <Image
                      src={images[item.image]}
                      alt={item.name}
                      placeholder="blur"
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                  <p
                    data-reveal="pop"
                    style={{ "--d": "350ms" } as React.CSSProperties}
                    className={`absolute -top-6 grid size-24 place-items-center rounded-full bg-brand font-display text-3xl text-white shadow-xl md:-top-8 md:size-32 md:text-4xl ${
                      flip ? "-left-2 md:-left-8" : "-right-2 md:-right-8"
                    }`}
                  >
                    <span className="wobble block">${item.price}</span>
                  </p>
                </div>

                <div className={`md:col-span-5 ${flip ? "md:order-1 md:col-start-1 md:row-start-1" : "md:pl-8"}`}>
                  <span
                    aria-hidden
                    data-reveal
                    className="text-outline block font-display text-8xl leading-none text-brand md:text-[9rem]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p data-reveal style={{ "--d": "80ms" } as React.CSSProperties} className="mt-2 font-display text-xl tracking-[0.18em] text-brand">
                    {item.kicker}
                  </p>
                  <h3 data-reveal style={{ "--d": "140ms" } as React.CSSProperties} className="font-display text-6xl leading-[0.9] md:text-7xl">
                    {item.name}
                  </h3>
                  <p data-reveal style={{ "--d": "220ms" } as React.CSSProperties} className="mt-5 max-w-sm text-lg leading-relaxed text-ink/75">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
