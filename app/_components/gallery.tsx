import Image from "next/image";
import g1 from "@/public/images/gallery/g1.jpg";
import g2 from "@/public/images/gallery/g2.jpg";
import g3 from "@/public/images/gallery/g3.jpg";
import g4 from "@/public/images/gallery/g4.jpg";
import g5 from "@/public/images/gallery/g5.jpg";
import g6 from "@/public/images/gallery/g6.jpg";

const photos = [
  { src: g5, alt: "Comensal disfrutando el Molcajete Borracho" },
  { src: g2, alt: "Boneless con papas y salsa en Pinup's" },
  { src: g1, alt: "Camarones envueltos en tocino en tendedero" },
  { src: g4, alt: "Pinup Rita y limonada de pepino" },
  { src: g6, alt: "Burgers con pan encostrado de queso" },
  { src: g3, alt: "Camarones Imperiales con arroz y ensalada" },
];

const tilt = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"];

export function Gallery() {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 gap-6 pr-6 md:gap-10 md:pr-10" aria-hidden={hidden || undefined}>
      {photos.map((p, i) => (
        <li key={i} className={`relative size-56 shrink-0 overflow-hidden rounded-3xl md:size-80 ${tilt[i]}`}>
          <Image
            src={p.src}
            alt={hidden ? "" : p.alt}
            placeholder="blur"
            sizes="(min-width: 768px) 20rem, 14rem"
            className="size-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-labelledby="ambiente-title" className="overflow-hidden bg-ink py-20 md:py-28">
      <h2
        id="ambiente-title"
        data-reveal
        className="mx-auto mb-12 max-w-7xl px-5 font-display text-[clamp(3rem,9vw,7rem)] leading-[0.85] text-cream md:px-8"
      >
        Vive la <span className="text-brand">experiencia</span>
      </h2>
      <div className="marquee-wrap py-6">
        <div className="marquee" style={{ "--speed": "55s" } as React.CSSProperties}>
          {row()}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
