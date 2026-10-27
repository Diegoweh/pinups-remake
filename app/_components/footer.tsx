import Image from "next/image";
import logo from "@/public/images/logo.png";
import { nav, site } from "../_data/site";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="checker [--checker-color:var(--color-cream)] opacity-10" aria-hidden />
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <Image src={logo} alt={site.name} className="h-auto w-44" />
          <p className="mt-4 max-w-xs text-cream/60">
            {site.tagline}. {site.address.neighborhood}, {site.address.city}.
          </p>
        </div>
        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-x-8 gap-y-2 font-display text-xl tracking-wider">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition hover:text-brand">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="border-t border-cream/10 px-5 py-6 text-center text-sm text-cream/40">
        © {site.name} · {site.address.street}, {site.address.neighborhood}, {site.address.city}
      </p>
    </footer>
  );
}
