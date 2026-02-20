export type CarteleraType = "series" | "cortos" | "peliculas";

export type CarteleraItem = {
  id: string;
  type: CarteleraType;
  slug: string;
  title: string;
  subtitle?: string;
  genre: string;
  duration: string;
  rating: string;
  launch?: string;
  synopsis: string;
  poster: string;
  imdbRating: number;
  director: string;
  creators: string[];
  cast: string[];
  releaseDate: string;
  fullPlot: string;
  actors: { id: string; name: string; role: string }[];
  inProduction?: boolean;
};

const placeholderActors = [
  { id: "1", name: "Por confirmar", role: "Protagonista" },
  { id: "2", name: "Por confirmar", role: "Reparto" },
  { id: "3", name: "Por confirmar", role: "Reparto" },
  { id: "4", name: "Por confirmar", role: "Reparto" },
  { id: "5", name: "Por confirmar", role: "Reparto" },
  { id: "6", name: "Por confirmar", role: "Reparto" },
];

export const carteleraSeries: CarteleraItem[] = [
  {
    id: "1",
    type: "series",
    slug: "el-silencio-de-los-desaparecidos",
    title: "El Silencio de los Desaparecidos",
    subtitle: "Piloto",
    genre: "Serie / Thriller / Drama",
    duration: "8 episodios (40-60 min)",
    rating: "+16",
    launch: "Serie destacada: Episodio 1 (Piloto)",
    synopsis:
      "Serie de 8 episodios. Cada episodio dura entre 40 y 60 minutos. Se muestra únicamente el póster del primer episodio: Piloto.",
    poster: "/image/episodio%20piloto.jpg",
    imdbRating: 8.2,
    director: "Por confirmar",
    creators: ["MOVC Cines", "Cactus Studio"],
    cast: ["Reparto en producción"],
    releaseDate: "2025",
    fullPlot:
      "Una periodista investiga desapariciones sin resolver y descubre secretos que nadie quiere revelar. Serie de 8 episodios de thriller y drama, con una trama que entrelaza misterio e investigación en cada capítulo.",
    actors: placeholderActors,
    inProduction: false,
  },
];

export const carteleraCortos: CarteleraItem[] = [];

export const carteleraPeliculas: CarteleraItem[] = [];

export function getCarteleraByType(): Record<CarteleraType, CarteleraItem[]> {
  return {
    series: carteleraSeries,
    cortos: carteleraCortos,
    peliculas: carteleraPeliculas,
  };
}

export function getCarteleraItem(
  type: CarteleraType,
  slug: string
): CarteleraItem | undefined {
  const map: Record<CarteleraType, CarteleraItem[]> = {
    series: carteleraSeries,
    cortos: carteleraCortos,
    peliculas: carteleraPeliculas,
  };
  return map[type]?.find((item) => item.slug === slug);
}

export function getCarteleraPath(item: CarteleraItem): string {
  return `/cartelera/${item.type}/${item.slug}`;
}
