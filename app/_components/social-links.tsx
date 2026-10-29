import { social } from "../_data/site";
import { DeliveryIcon, FacebookIcon, InstagramIcon, WhatsAppIcon } from "./icons";

const icons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
  ubereats: DeliveryIcon,
};

/** Round icon links to the restaurant's social profiles and delivery. `onBrand` inverts the hover for red backgrounds. */
export function SocialLinks({ className = "", onBrand = false }: { className?: string; onBrand?: boolean }) {
  return (
    <ul className={`flex gap-3 ${className}`}>
      {social.map((s) => {
        const Icon = icons[s.id];
        return (
          <li key={s.id}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener"
              aria-label={s.label}
              title={s.label}
              className={`grid size-11 place-items-center rounded-full border-2 border-current transition hover:-rotate-6 hover:scale-110 ${
                onBrand ? "hover:bg-white hover:text-brand" : "hover:border-brand hover:bg-brand hover:text-white"
              }`}
            >
              <Icon className="size-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
