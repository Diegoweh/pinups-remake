import { menu, site } from "../_data/site";

export function RestaurantJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${site.url}/#restaurant`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phoneE164,
    image: [`${site.url}/images/og-image.jpg`, `${site.url}/images/ambiente.jpg`],
    logo: `${site.url}/images/logo-dark.png`,
    priceRange: "$$",
    servesCuisine: ["Burgers", "Mariscos", "Mexicana", "Bar & Grill"],
    acceptsReservations: true,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.neighborhood}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.directionsHref,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "Música en vivo", value: true }],
    hasMenu: {
      "@type": "Menu",
      url: `${site.url}/#menu`,
      inLanguage: "es-MX",
      hasMenuSection: menu.map((section) => ({
        "@type": "MenuSection",
        name: section.title,
        hasMenuItem: section.items.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          ...(item.description && { description: item.description }),
          ...(item.price !== null && {
            offers: { "@type": "Offer", price: item.price, priceCurrency: "MXN" },
          }),
        })),
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
