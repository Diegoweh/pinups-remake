import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import { site } from "./_data/site";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const title = `${site.name} | Burgers, mariscos y música en vivo en Mazatlán`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "restaurante Mazatlán",
    "Zona Dorada Mazatlán",
    "burgers Mazatlán",
    "hamburguesas Mazatlán",
    "mariscos Mazatlán",
    "música en vivo Mazatlán",
    "bar Zona Dorada",
    "Pinup Ritas",
    "Pinups Fun & Grill",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: true },
  other: {
    "geo.region": "MX-SIN",
    "geo.placename": "Mazatlán",
    "geo.position": `${site.geo.lat};${site.geo.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#e1262d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${bebas.variable} ${outfit.variable} overflow-x-clip antialiased`}>
      <body className="min-h-dvh overflow-x-clip">{children}</body>
    </html>
  );
}
