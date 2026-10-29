import ambiente from "@/public/images/ambiente.webp";
import { lineup, site } from "../_data/site";
import { Marquee } from "./marquee";

export function Music() {
  return (
    <section id="musica" aria-labelledby="musica-title" className="relative overflow-hidden bg-ink">
      <div className="grow-on-scroll relative h-[70svh] min-h-[420px] w-full overflow-hidden md:h-[85svh]">
        <video
          src="/video/ambiente.mp4"
          poster={ambiente.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Banda tocando en vivo frente a la terraza de Pinup's Fun & Grill"
          className="absolute inset-0 size-full object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-10 md:px-8 md:pb-16">
          <p data-reveal className="mb-6 font-display text-xl tracking-[0.2em] text-mustard md:mb-9">
            Jueves a domingo
          </p>
          <h2
            id="musica-title"
            data-reveal
            style={{ "--d": "100ms" } as React.CSSProperties}
            className="font-display text-[clamp(4.5rem,15vw,13rem)] leading-[0.8] text-cream"
          >
            Música <span className="text-brand">en vivo</span>
          </h2>
        </div>
      </div>

      <Marquee
        words={["Kraken", "Manhatlan", "Mandrake & The Magics", "Sunday Funday", "Música en vivo"]}
        reverse
        speed="26s"
        className="border-y-2 border-brand py-3 text-4xl text-brand md:text-5xl"
      />

      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h3 data-reveal className="font-display text-5xl leading-none text-cream">La cartelera</h3>
            <p data-reveal style={{ "--d": "100ms" } as React.CSSProperties} className="mt-4 text-lg text-cream/70">
              Cada semana suben al escenario las mejores bandas de Mazatlán. Aparta tu mesa, las noches de sábado
              se llenan.
            </p>
            <a
              data-reveal
              style={{ "--d": "200ms" } as React.CSSProperties}
              href={site.phoneHref}
              className="mt-8 inline-block rounded-full bg-brand px-7 py-4 font-display text-2xl tracking-wider text-white transition hover:-rotate-2 hover:bg-brand-dark"
            >
              Reservar mesa
            </a>
          </div>

          <ol className="md:col-span-8">
            {lineup.map((show, i) => (
              <li
                key={show.day}
                data-reveal
                style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                className="group grid grid-cols-[5.5rem_1fr] items-baseline gap-x-4 border-t border-cream/15 py-6 transition-colors last:border-b hover:bg-brand/10 sm:grid-cols-[8rem_1fr_auto] md:px-4"
              >
                <p className="font-display text-2xl leading-none text-brand md:text-3xl">
                  {show.day}
                  <span className="block text-sm tracking-widest text-cream/50">{show.en}</span>
                </p>
                <p className="font-display text-4xl leading-none text-cream transition-transform duration-300 group-hover:translate-x-2 md:text-6xl">
                  {show.band}
                </p>
                <p className="col-start-2 mt-2 text-cream/70 sm:col-start-auto sm:mt-0 sm:text-right">{show.time}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
