import Image from "next/image";
import rita from "@/public/images/musica.jpg";
import { StarIcon } from "./icons";

export function Ritas() {
  return (
    <section aria-labelledby="ritas-title" className="grain relative overflow-hidden bg-brand text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
        <div className="relative order-2 md:order-1">
          <p data-reveal className="flex items-center gap-2 font-display text-xl tracking-[0.2em] text-mustard">
            <StarIcon className="size-4" /> La bebida de la casa
          </p>
          <h2
            id="ritas-title"
            data-reveal
            style={{ "--d": "100ms" } as React.CSSProperties}
            className="font-display text-[clamp(4.5rem,14vw,10rem)] leading-[0.8]"
          >
            Pinup
            <br />
            <span className="text-outline">Ritas</span>
          </h2>
          <p data-reveal style={{ "--d": "200ms" } as React.CSSProperties} className="mt-6 max-w-md text-xl leading-relaxed text-white/90">
            Escarchadas con chile, coronadas con sandía y servidas bien frías. La famosa de Zona Dorada para
            arrancar la noche con la banda.
          </p>
        </div>

        <div className="relative order-1 md:order-2">
          <div
            data-reveal="right"
            className="parallax relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-full border-8 border-white/15"
          >
            <Image
              src={rita}
              alt="Pinup Rita escarchada con chile y rebanada de sandía"
              placeholder="blur"
              sizes="(min-width: 768px) 28rem, 90vw"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <StarIcon className="spin-slow absolute -left-2 bottom-10 size-16 text-mustard md:left-0 md:size-20" />
          <StarIcon className="spin-slow absolute right-2 top-6 size-10 text-white md:right-6" />
        </div>
      </div>
    </section>
  );
}
