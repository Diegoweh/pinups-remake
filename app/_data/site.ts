export const site = {
  name: "Pinup's Fun & Grill",
  shortName: "Pinup's",
  url: "https://www.pinupsfungrill.com",
  tagline: "Comida, diversión y música en vivo",
  description:
    "Burgers de top sirloin, mariscos frescos, las famosas Pinup Ritas y música en vivo en la Zona Dorada de Mazatlán. Reserva o pide a domicilio.",
  phoneDisplay: "669 250 63 60",
  phoneHref: "tel:+526692506360",
  phoneE164: "+52-669-250-6360",
  address: {
    street: "Av. Gaviotas 404, L1",
    neighborhood: "Zona Dorada",
    city: "Mazatlán",
    region: "Sinaloa",
    postalCode: "82110",
    country: "MX",
  },
  geo: { lat: 23.242316, lng: -106.452191 },
  hours: { days: "Mar – Dom", time: "1:00 PM – 11:30 PM", opens: "13:00", closes: "23:30" },
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=Pinups+Fun+%26+Grill%2C+Av.+Gaviotas+404%2C+Zona+Dorada%2C+Mazatl%C3%A1n",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7332.042377945692!2d-106.45219100000001!3d23.242316!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869f54a32ba5dcf3%3A0x32273f7b960b4a21!2sPINUPS%20FUN%20%26%20GRILL%20Comida%2C%20Diversi%C3%B3n%20y%20M%C3%BAsica%20en%20vivo!5e0!3m2!1ses-419!2sus!4v1793054935014!5m2!1ses-419!2sus",
} as const;

export const nav = [
  { href: "#favoritos", label: "Favoritos" },
  { href: "#menu", label: "Menú" },
  { href: "#musica", label: "Música en vivo" },
  { href: "#visitanos", label: "Visítanos" },
] as const;

export type MenuItem = {
  name: string;
  /** Number in MXN, or null when the printed menu says "$$$$" (market price). */
  price: number | null;
  priceNote?: string;
  description?: string;
  extra?: string;
};

export type MenuSection = { id: string; title: string; items: MenuItem[] };

export const menu: MenuSection[] = [
  {
    id: "entradas",
    title: "Entradas",
    items: [
      { name: "Bombas de papa", price: 139, description: "Bolitas de papa sazonadas y empanizadas, acompañadas con aderezo casero." },
      { name: "Rockamole", price: 169 },
      { name: "Rock & Roll Nachos", price: 179, description: "Totopos con carne molida, frijoles, queso fundido, pico de gallo y crema." },
      { name: "Corn Ribs", price: 159, description: "Costillitas de elote glaseadas con mantequilla y especias." },
      { name: "Mignon Rock Rolls", price: 179, description: "Tres piezas de filete mignon en tortilla roja y costra crujiente de queso, con reducción de champiñones y puré de papa." },
      { name: "Chimichangas", price: 169, description: "Rollitos crujientes rellenos de top sirloin molida, queso crema y chipotle.", extra: "Cambio a camarón +$59" },
      { name: "Conchitas Rockefeller", price: 219, description: "Cinco conchas rellenas de camarón, salsa Rockefeller y mozzarella gratinada. Especialidad de la casa." },
      { name: "Aros de cebolla", price: 109, description: "Crujientes, caseros y preparados al ordenar." },
      { name: "Mahi Mahi Baja Bites", price: 169, description: "Tres piezas de pescado capeado sobre tortilla roja, con cremoso de aguacate y cebolla encurtida." },
    ],
  },
  {
    id: "burgers",
    title: "Burgers",
    items: [
      { name: "Dorito Macho Burger", price: 198, description: "Top sirloin, tocino crujiente, aguacate fresco, choriqueso al tequila y aderezo especial de Doritos." },
      { name: "Crunchy Chicken Burger", price: 169, description: "Pechuga de pollo crunchy, tocino, piña, lechuga y tomate. Salséala a tu gusto." },
      { name: "Jack Daniel's BBQ Bacon Burger", price: 189 },
      { name: "Surf & Turf Burger", price: null, description: "Top sirloin, camarones al grill, mozzarella, tocino ahumado, aguacate, cebolla crujiente y salsa suiza con chipotle." },
      { name: "La Auténtica", price: 99, description: "La clásica cheeseburger al estilo Pinup's. Pan horneado diariamente y encostrado con queso.", extra: "Agrega papas fritas o papas gajo por $29" },
      { name: "Pinup's Burger", price: 179, description: "Champiñones frescos, mozzarella, aguacate, tocino, cebolla y nuestro aderezo secreto." },
    ],
  },
  {
    id: "especialidades",
    title: "Especialidades Pinup's",
    items: [
      { name: "Molcajete Borracho", price: 588, description: "Para dos: pollo, arrachera y camarón en salsa roja borracha, vegetales y queso. Con guacamole, arroz, frijoles y tortillas." },
      { name: "Enchiladas de camarón", price: 228, description: "Rellenas de camarón y queso, con salsa roja cremosa y mozzarella gratinada." },
      { name: "Fajitas chillantes", price: 298, description: "Pollo, arrachera o camarón con pimientos, cebolla y tomate. Incluyen guacamole, arroz, frijoles y tortillas." },
      { name: "Mahi Mahi Rosa Pinups", price: null, description: "Filete sellado sobre salsa rosa de betabel, nuez de la India y habanero; con camarones al ajillo, elote y crujiente de masa azul." },
    ],
  },
  {
    id: "camarones-y-carne",
    title: "Camarones y carne",
    items: [
      { name: "Imperiales", price: 289, description: "Camarones jumbo rellenos de mozzarella, envueltos en tocino crujiente y servidos en tendedero." },
      { name: "Coco Supremo", price: 294, description: "Camarones jumbo rellenos de queso crema, empanizados con panko y coco, servidos en tendedero." },
      { name: "Baby Back BBQ Ribs", price: 295, description: "Costillitas glaseadas con BBQ casera, elote dulce, papas gajo y ensalada de col." },
      { name: "Filete mignon con camarones", price: 395, description: "Filete envuelto en tocino, gravy de champiñones y camarones imperiales rellenos de queso." },
    ],
  },
  {
    id: "tacos",
    title: "Tacos gourmet",
    items: [
      { name: "Chicken Bacon Tacos", price: 209, description: "Pollo, morrón, cebolla y queso; con lechuga, col morada, aguacate y tocino." },
      { name: "Camarón o pescado", price: 219, description: "Capeados o al grill, con lechuga fresca, col morada y aguacate." },
      { name: "Arrachera", price: 227, description: "Res marinada, pimientos, cebolla y queso; con lechuga, col morada y tocino." },
      { name: "Gobernador Pinups", price: 239, description: "Chile Anaheim con queso al tequila y camarón o arrachera; con aguacate, col morada y chipotle ranch.", extra: "Todas las opciones incluyen tres piezas" },
    ],
  },
  {
    id: "aguachiles-y-ceviches",
    title: "Aguachiles y ceviches",
    items: [
      { name: "Aguachile del Patrón", price: 239, description: "Camarón bañado con nuestra intensa salsa negra." },
      { name: "Aguachile sinaloense", price: 235, description: "Camarón preparado con el sabor tradicional de la casa." },
      { name: "Ceviche tradicional de camarón", price: 230, description: "Estilo sinaloense con tomate, pepino y cebolla morada." },
      { name: "Ceviche Pinup's Especial", price: 349, description: "Camarón fresco con salsa coctelera picosita, servido en molcajete y rodeado de camarones cocidos." },
    ],
  },
  {
    id: "alitas",
    title: "Alitas y boneless",
    items: [
      { name: "Alitas 360 g", price: 159, description: "Con papas fritas, ranch, apio y zanahoria." },
      { name: "Boneless 180 g", price: 179, description: "Pechuga de pollo con empanizado crunchy, papas fritas y ranch.", extra: "Salsas: BBQ Original, Buffalo Ranch, Mango Miel Habanero, Buffalo, Naturales o Lemon Pepper" },
    ],
  },
  {
    id: "pechugas",
    title: "Pechugas",
    items: [
      { name: "Scallopiny", price: 248, description: "Rellena de rajas y mozzarella, cubierta con gravy de champiñones." },
      { name: "Red Velvet", price: 259, description: "Queso crema, champiñón y espinaca; sobre puré de camote y reducción de arándanos al vino tinto." },
      { name: "Toscana", price: 225, description: "Salsa de tomate fresco, champiñones, tocino y queso gratinado." },
    ],
  },
  {
    id: "pastas",
    title: "Pastas",
    items: [
      { name: "Fettuccini Pomodoro", price: 175, description: "Salsa de tomate fresco, especias y parmesano. Elige albóndigas caseras o pollo." },
      { name: "Fettuccini con camarones", price: 239, description: "Salsa blanca con tocino, champiñones frescos y camarones a la parrilla." },
      { name: "Fettuccini Suizo Pinups", price: null, description: "Salsa suiza cremosa con chipotle, pollo o camarones y mezcla de tres quesos gratinada." },
    ],
  },
  {
    id: "filetes",
    title: "Filetes y camarones",
    items: [
      { name: "Preparados a tu gusto", price: 199, priceNote: "$199 / $248", description: "Elige filete de pescado o camarones. A la plancha, guajillo, coco, mojo de ajo, diabla, chipotle o empanizado. Incluye ensalada y arroz o puré." },
    ],
  },
  {
    id: "ensaladas",
    title: "Ensaladas",
    items: [
      { name: "César", price: 128, description: "Lechuga romana, crotones, parmesano y aderezo César." },
      { name: "Taco", price: 219 },
      { name: "Tropical", price: 175 },
    ],
  },
];

export const favorites = [
  {
    name: "Pinup's Burger",
    price: 179,
    image: "burger",
    kicker: "Top sirloin",
    description: "Champiñones frescos, mozzarella, aguacate, tocino, cebolla y nuestro aderezo secreto, en pan horneado diario.",
  },
  {
    name: "Camarones Imperiales",
    price: 289,
    image: "brochetas",
    kicker: "Servidos en tendedero",
    description: "Camarones jumbo rellenos de mozzarella y envueltos en tocino crujiente. Llegan colgados a tu mesa.",
  },
  {
    name: "Boneless",
    price: 179,
    image: "alitas",
    kicker: "Seis salsas",
    description: "Pechuga con empanizado crunchy, papas y ranch. BBQ, Buffalo Ranch, Mango Miel Habanero, Lemon Pepper y más.",
  },
  {
    name: "Ceviche Pinup's Especial",
    price: 349,
    image: "mariscos",
    kicker: "Mariscos frescos",
    description: "Camarón fresco en salsa coctelera picosita, servido en molcajete y rodeado de camarones cocidos.",
  },
] as const;

export const lineup = [
  { day: "Jueves", en: "Thursday", band: "Kraken", time: "7:00 PM – 11:00 PM" },
  { day: "Viernes", en: "Friday", band: "Manhatlan", time: "8:00 PM – 11:30 PM" },
  { day: "Sábado", en: "Saturday", band: "Mandrake & The Magics", time: "8:00 PM – 12:00 AM" },
  { day: "Domingo", en: "Sunday Funday", band: "Kraken", time: "4:00 PM – 7:00 PM" },
] as const;

export function formatPrice(item: MenuItem) {
  if (item.priceNote) return item.priceNote;
  return item.price === null ? "$$$$" : `$${item.price}`;
}
