import { site } from "../_data/site";
import { ArrowIcon, ClockIcon, PhoneIcon, PinIcon } from "./icons";

export function Visit() {
  const { address, hours } = site;
  return (
    <section id="visitanos" aria-labelledby="visitanos-title" className="relative bg-brand text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2
            id="visitanos-title"
            data-reveal
            className="font-display text-[clamp(4rem,10vw,7.5rem)] leading-[0.82]"
          >
            Te esperamos
            <br />
            <span className="text-ink">en Zona Dorada</span>
          </h2>

          <dl className="mt-12 flex flex-col gap-8">
            <div data-reveal style={{ "--d": "100ms" } as React.CSSProperties} className="flex gap-4">
              <PinIcon className="mt-1 size-7 shrink-0" />
              <div>
                <dt className="font-display text-xl tracking-[0.2em] text-ink">Dirección</dt>
                <dd>
                  <address className="text-2xl not-italic leading-snug">
                    {address.street} · {address.neighborhood}
                    <br />
                    {address.city}, {address.region} {address.postalCode}
                  </address>
                </dd>
              </div>
            </div>
            <div data-reveal style={{ "--d": "180ms" } as React.CSSProperties} className="flex gap-4">
              <ClockIcon className="mt-1 size-7 shrink-0" />
              <div>
                <dt className="font-display text-xl tracking-[0.2em] text-ink">Horario</dt>
                <dd className="text-2xl">
                  {hours.days} · {hours.time}
                  <span className="block text-base text-white/75">Lunes cerrado</span>
                </dd>
              </div>
            </div>
            <div data-reveal style={{ "--d": "260ms" } as React.CSSProperties} className="flex gap-4">
              <PhoneIcon className="mt-1 size-7 shrink-0" />
              <div>
                <dt className="font-display text-xl tracking-[0.2em] text-ink">Reservaciones y domicilio</dt>
                <dd>
                  <a href={site.phoneHref} className="text-2xl underline decoration-2 underline-offset-4 hover:text-ink">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
            </div>
          </dl>

          <div data-reveal style={{ "--d": "340ms" } as React.CSSProperties} className="mt-12 flex flex-wrap gap-3">
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-display text-2xl tracking-wider text-white transition hover:-rotate-2"
            >
              <PhoneIcon className="size-5" />
              Llamar ahora
            </a>
            <a
              href={site.directionsHref}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-4 font-display text-2xl tracking-wider transition hover:bg-white hover:text-brand"
            >
              Cómo llegar
              <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div data-reveal="right" className="relative min-h-[380px] overflow-hidden rounded-[2rem] bg-ink lg:min-h-full">
          <iframe
            src={site.mapEmbed}
            title={`Mapa: ${site.name}, ${address.street}, ${address.city}`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 size-full border-0 grayscale-[0.6] transition duration-500 hover:grayscale-0"
          />
        </div>
      </div>
    </section>
  );
}
