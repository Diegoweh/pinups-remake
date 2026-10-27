import { Favorites } from "./_components/favorites";
import { Footer } from "./_components/footer";
import { Gallery } from "./_components/gallery";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { RestaurantJsonLd } from "./_components/json-ld";
import { Marquee } from "./_components/marquee";
import { Menu } from "./_components/menu";
import { Music } from "./_components/music";
import { RevealObserver } from "./_components/reveal-observer";
import { Ritas } from "./_components/ritas";
import { Visit } from "./_components/visit";

export default function Home() {
  return (
    <>
      <RestaurantJsonLd />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee
          words={["Top sirloin burgers", "Mariscos frescos", "Pinup Ritas", "Música en vivo", "Zona Dorada"]}
          className="bg-brand py-4 text-4xl text-white md:text-6xl"
        />
        <Favorites />
        <Ritas />
        <Menu />
        <Music />
        <Gallery />
        <Visit />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
