import { formatPrice, menu, site } from "../_data/site";
import { AddToCart } from "./cart/add-to-cart";
import { PhoneIcon } from "./icons";
import { MenuGallery } from "./menu-gallery";

export function Menu() {
  return (
    <section id="menu" aria-labelledby="menu-title" className="relative bg-cream text-ink">
      <div className="checker" aria-hidden />

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-20 md:px-8 md:pb-32 md:pt-28">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p data-reveal className="font-display text-xl tracking-[0.2em] text-brand">Comidas y cenas</p>
            <h2
              id="menu-title"
              data-reveal
              style={{ "--d": "100ms" } as React.CSSProperties}
              className="font-display text-[clamp(4rem,13vw,11rem)] leading-[0.8]"
            >
              El menú
            </h2>
          </div>
          <div data-reveal style={{ "--d": "200ms" } as React.CSSProperties} className="max-w-sm">
            <p className="text-lg text-ink/70">
              Pan horneado diario, top sirloin y mariscos frescos de Mazatlán. Precios en pesos mexicanos.
            </p>
            <MenuGallery />
          </div>
        </header>

        <nav
          aria-label="Categorías del menú"
          className="sticky top-16 z-20 -mx-5 mt-12 overflow-x-auto bg-cream/90 px-5 py-3 backdrop-blur-md [scrollbar-width:none] md:-mx-8 md:px-8"
        >
          <ul className="flex gap-2">
            {menu.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block whitespace-nowrap rounded-full border-2 border-ink px-4 py-1.5 font-display text-lg tracking-wider transition hover:bg-ink hover:text-cream"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-14 gap-x-16 md:columns-2 xl:columns-3">
          {menu.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              data-reveal
              className="mb-14 break-inside-avoid"
            >
              <h3
                id={`${section.id}-title`}
                className="mb-6 flex items-center gap-3 border-b-4 border-brand pb-2 font-display text-5xl leading-none"
              >
                {section.title}
              </h3>
              <ul className="flex flex-col gap-5">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline gap-3 font-display text-2xl leading-tight tracking-wide">
                      <span>{item.name}</span>
                      <span aria-hidden className="mb-1.5 flex-1 border-b-2 border-dotted border-ink/30" />
                      <span className="text-brand">
                        {item.price === null && !item.priceNote ? (
                          <abbr title="Precio según mercado" className="no-underline">
                            {formatPrice(item)}
                          </abbr>
                        ) : (
                          formatPrice(item)
                        )}
                      </span>
                      <AddToCart itemId={item.id} className="self-center" />
                    </div>
                    {item.description && <p className="mt-1 leading-snug text-ink/70">{item.description}</p>}
                    {item.extra && <p className="mt-1 text-sm font-medium text-brand">{item.extra}</p>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div
          data-reveal
          className="mt-6 flex flex-col items-start gap-6 border-t-2 border-ink/15 pt-10 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-2xl font-display text-4xl leading-none md:text-5xl">
            ¿Se te antojó? <span className="text-brand">Arma tu pedido con el + y envíalo por WhatsApp.</span>
          </p>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-display text-2xl tracking-wider text-cream transition hover:-rotate-1 hover:bg-brand"
          >
            <PhoneIcon className="size-5" />
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
