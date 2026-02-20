"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { sileo } from "sileo";
import styles from "./page.module.css";

type FeaturedSeries = {
  title: string;
  genre: string;
  duration: string;
  rating: string;
  launch: string;
  synopsis: string;
  poster: string;
  imdbRating: number;
  director: string;
  creators: string[];
  cast: string[];
  releaseDate: string;
  fullPlot: string;
};

const featuredSeries: FeaturedSeries = {
  title: "El Silencio de los Desaparecidos",
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
};

const navItems = [
  {
    label: "Inicio",
    detail: "Bienvenidos a nuestra plataforma de Contenido.",
  },
  {
    label: "Cartelera",
    detail: "Mostrando episodio 1: Piloto.",
    href: "/cartelera",
  },
  {
    label: "Nosotros",
    detail:
      "Somos Osisg Playground: una plataforma de contenido enfocada en experiencias premium.",
    buttonText: "Conocernos",
  },
];

const placeholderActors = [
  { id: "1", name: "Por confirmar", role: "Protagonista" },
  { id: "2", name: "Por confirmar", role: "Reparto" },
  { id: "3", name: "Por confirmar", role: "Reparto" },
  { id: "4", name: "Por confirmar", role: "Reparto" },
  { id: "5", name: "Por confirmar", role: "Reparto" },
  { id: "6", name: "Por confirmar", role: "Reparto" },
];

const THEME_STORAGE_KEY = "osisg-playground-theme";

const relatedNews = [
  {
    id: "1",
    platform: "Netflix",
    title: "Estrenos de series y películas",
    excerpt: "Novedades del catálogo en streaming.",
    url: "https://www.netflix.com",
  },
  {
    id: "2",
    platform: "IMDb",
    title: "Críticas y valoraciones",
    excerpt: "Puntuación y reseñas de la audiencia.",
    url: "https://www.imdb.com",
  },
  {
    id: "3",
    platform: "Cine nacional",
    title: "Cartelera de cines argentinos",
    excerpt: "Estrenos en salas de Argentina.",
    url: "https://www.imdb.com",
  },
  {
    id: "4",
    platform: "Osisg",
    title: "Desarrollo y tecnología",
    excerpt: "Conocé más sobre nuestro patrocinador.",
    url: "https://dev.osisg.com/",
  },
];

const carouselSlides = [
  {
    src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1280&q=80",
    alt: "Cámaras de cine en set de producción",
  },
  {
    src: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=1280&q=80",
    alt: "Estación de edición de video con DaVinci Resolve",
  },
  {
    src: "https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?auto=format&fit=crop&w=1280&q=80",
    alt: "Grabación de escena con equipo técnico",
  },
  {
    src: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1280&q=80",
    alt: "iPhone usado como equipo de grabación",
  },
  {
    src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1280&q=80",
    alt: "Luces y montaje de producción audiovisual",
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [previewImage, setPreviewImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [lastHoverToast, setLastHoverToast] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark") setDarkMode(true);
    if (stored === "light") setDarkMode(false);
  }, []);

  const setTheme = (isDark: boolean) => {
    setDarkMode(isDark);
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
    }
  };

  const showImageHoverToast = (key: string, title: string, description: string) => {
    if (lastHoverToast === key) return;
    setLastHoverToast(key);
    sileo.info({
      title,
      description,
      duration: 1800,
    });
  };

  return (
    <div data-theme={darkMode ? "dark" : "light"} className={styles.page}>
      <div className={styles.pageBackground} aria-hidden="true">
        <div className={styles.pageBackgroundImage} />
        <div className={styles.pageBackgroundOverlay} />
        <div className={styles.pageBackgroundGrain} />
      </div>
      <header className={styles.navbar}>
        <div className={styles.brandGroup}>
          <div className={styles.logo}>
            Osisg <span className={styles.logoPlayground}>PLAYGROUND</span>
          </div>
          <button
            type="button"
            className={styles.themeButton}
            onClick={() => setTheme(!darkMode)}
          >
            {darkMode ? "Modo oscuro" : "Modo claro"}
          </button>
        </div>
        <nav className={styles.navMenu} aria-label="Menú principal">
          {navItems.map((item) =>
            "href" in item && item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={styles.navLink}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                className={styles.navLink}
                onClick={() =>
                  sileo.action({
                    title: item.label,
                    description: item.detail,
                    button: {
                      title: item.buttonText ?? "OK",
                      onClick: () => sileo.clear(),
                    },
                  })
                }
              >
                {item.label}
              </button>
            )
          )}
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.presentationSection}>
          <button
            type="button"
            className={styles.imageTrigger}
            onMouseEnter={() =>
              showImageHoverToast(
                "teaser",
                "Teaser oficial",
                "Imagen de presentación de la serie. Haz click para verla completa.",
              )
            }
            onMouseLeave={() => setLastHoverToast("")}
            onClick={() =>
              setPreviewImage({
                src: "/portada.png",
                alt: "Presentación de la serie El Silencio de los Desaparecidos",
              })
            }
          >
            <img
              src="/portada.png"
              alt="Presentación de la serie El Silencio de los Desaparecidos"
              className={styles.presentationImage}
            />
          </button>
          <div className={styles.presentationContent}>
            <p className={styles.badge}>Presentación</p>
            <h2>El Silencio de los Desaparecidos</h2>
            <p>
              Resumen de la historia: una periodista investiga desapariciones sin
              resolver y descubre secretos que nadie quiere revelar. Portada de
              presentación oficial de la serie. Esta imagen se puede reemplazar
              más adelante por la versión final.
            </p>
          </div>
        </section>

        <section className={styles.hero}>
          <p className={styles.badge}>Serie en producción</p>
          <h1>Serie destacada en cartelera</h1>
          <p>#Thriller #Drama #Misterio #Investigación</p>
        </section>

        <article className={styles.featuredCardBlock} aria-labelledby="featured-title">
          <section className={`${styles.featuredBoard} ${styles.animateFadeIn}`}>
            <div className={styles.featuredContent}>
              <div className={styles.featuredBadges}>
                <span className={styles.featuredEpisodeBadge}>Episodio 1</span>
                <span className={styles.featuredStatusBadge}>En cartelera</span>
              </div>
              <p className={styles.featuredLabel}>{featuredSeries.launch}</p>
              <h2 id="featured-title">{featuredSeries.title}</h2>
              <p className={styles.featuredSubtitle}>Piloto</p>
              <p className={styles.featuredSynopsis}>{featuredSeries.synopsis}</p>
              <div className={styles.featuredMeta}>
                <span>{featuredSeries.genre}</span>
                <span>{featuredSeries.duration}</span>
                <span>{featuredSeries.rating}</span>
              </div>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() =>
                  sileo.success({
                    title: "Piloto en cartelera",
                    description:
                      "Episodio 1 disponible. Duración variable entre 40 y 60 minutos.",
                  })
                }
              >
                Ver detalle del piloto
              </button>
            </div>
            <div className={styles.featuredImageWrap}>
              <button
                type="button"
                className={styles.imageTrigger}
                onMouseEnter={() =>
                  showImageHoverToast(
                    "piloto",
                    "Episodio 1: Piloto",
                    "Póster principal de cartelera. Haz click para ampliar.",
                  )
                }
                onMouseLeave={() => setLastHoverToast("")}
                onClick={() =>
                  setPreviewImage({
                    src: featuredSeries.poster,
                    alt: "Póster del episodio 1: Piloto",
                  })
                }
              >
                <img
                  src={featuredSeries.poster}
                  alt="Póster del episodio 1: Piloto"
                  className={styles.featuredImage}
                />
              </button>
            </div>
          </section>

          <section className={`${styles.imdbSection} ${styles.animateSlideUp}`} aria-label={`Ficha de ${featuredSeries.title}`}>
            <div className={styles.imdbCardRef}>
              <span className={styles.imdbCardRefLabel}>Ficha correspondiente a</span>
              <strong className={styles.imdbCardRefTitle}>{featuredSeries.title}</strong>
            </div>
            <h3 className={styles.imdbSectionTitle}>Ficha de la serie</h3>
            <div className={styles.imdbRatingRow}>
              <span className={styles.imdbLabel}>Valoración</span>
              <div className={styles.imdbStars}>
                <span className={styles.imdbStar} aria-hidden="true">★</span>
                <span className={styles.imdbRatingValue}>{featuredSeries.imdbRating}</span>
                <span className={styles.imdbRatingMax}>/10</span>
              </div>
            </div>
            <dl className={styles.imdbDetails}>
              {[
                { term: "Director", desc: featuredSeries.director },
                { term: "Creadores", desc: featuredSeries.creators.join(", ") },
                { term: "Reparto", desc: featuredSeries.cast.join(", ") },
                { term: "Estreno", desc: featuredSeries.releaseDate },
              ].map((row, i) => (
                <div key={row.term} className={styles.imdbDetailRow} style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
                  <dt className={styles.imdbTerm}>{row.term}</dt>
                  <dd className={styles.imdbDesc}>{row.desc}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.imdbPlot}>
              <h4 className={styles.imdbPlotTitle}>Trama</h4>
              <p>{featuredSeries.fullPlot}</p>
            </div>
          </section>

          <section className={`${styles.actorsSection} ${styles.animateFadeIn}`}>
            <h3 className={styles.actorsSectionTitle}>Reparto / Actores</h3>
            <p className={styles.actorsSectionIntro}>Elenco de &quot;{featuredSeries.title}&quot;</p>
            <div className={styles.actorsGrid}>
              {placeholderActors.map((actor, index) => (
                <div
                  key={actor.id}
                  className={styles.actorCard}
                  style={{ animationDelay: `${0.08 * index}s` }}
                >
                  <div className={styles.actorAvatar} aria-hidden="true">
                    <svg className={styles.actorAvatarIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5 20c0-3.5 3.5-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className={styles.actorName}>{actor.name}</span>
                  <span className={styles.actorRole}>{actor.role}</span>
                </div>
              ))}
            </div>
          </section>
        </article>

        <section className={`${styles.newsSection} ${styles.animateFadeIn}`}>
          <h3 className={styles.newsSectionTitle}>Noticias de otras plataformas</h3>
          <p className={styles.newsSectionIntro}>Enlaces a sitios relacionados con cine y series</p>
          <div className={styles.newsGrid}>
            {relatedNews.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.newsCard}
              >
                <span className={styles.newsPlatform}>{item.platform}</span>
                <h4 className={styles.newsCardTitle}>{item.title}</h4>
                <p className={styles.newsCardExcerpt}>{item.excerpt}</p>
                <span className={styles.newsCardLink}>Visitar →</span>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.sponsorSection}>
          <h3>
            <a
              href="https://dev.osisg.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sponsorLink}
            >
              Patrocinado por Osisg
            </a>
          </h3>
          <p>
            Pronto disponible para App Store y Play Store. Conocé a nuestro
            patrocinador:{" "}
            <a
              href="https://dev.osisg.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sponsorLink}
            >
              Osisg
            </a>
            .
          </p>
          <div className={styles.storeBadges}>
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Disponible en App Store"
              className={styles.storeBadge}
              loading="lazy"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Disponible en Play Store"
              className={styles.storeBadge}
              loading="lazy"
            />
          </div>
        </section>

        <section className={styles.carouselSection}>
          <h3>Producción</h3>
          <div className={styles.carouselViewport}>
            <div className={styles.carouselRail}>
              {[...carouselSlides, ...carouselSlides].map((slide, index) => (
                <img
                  key={`${slide.src}-${index}`}
                  src={slide.src}
                  alt={slide.alt}
                  className={styles.carouselItem}
                  loading="lazy"
                  onMouseEnter={() =>
                    showImageHoverToast(
                      slide.src,
                      "Producción",
                      slide.alt,
                    )
                  }
                  onMouseLeave={() => setLastHoverToast("")}
                  onClick={() =>
                    setPreviewImage({
                      src: slide.src,
                      alt: slide.alt,
                    })
                  }
                />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.infoSection}>
          <h3>Nosotros</h3>
          <p>Correo: cactus.studio.ar@gmail.com</p>
          <p>Teléfono: +54 9 3765287514</p>
          <div className={styles.contactActions}>
            <a
              className={`${styles.contactButton} ${styles.whatsappButton}`}
              href="https://wa.me/3765287514?text=Hola%20MOVC%20Cines,%20quiero%20informaci%C3%B3n%20sobre%20la%20cartelera."
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className={styles.contactIcon}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M20 12A8 8 0 0 1 8.52 19.2L4 20l.82-4.35A8 8 0 1 1 20 12Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.4 8.9c.22-.48.46-.5.68-.5.17 0 .35 0 .53.02.16.01.37-.06.58.44.2.48.68 1.67.74 1.8.06.13.1.28.02.45-.08.17-.12.27-.24.42-.12.15-.25.33-.36.45-.12.12-.24.25-.1.49.15.23.65 1.07 1.39 1.73.95.86 1.74 1.13 1.99 1.26.25.12.4.1.55-.06.15-.17.64-.75.81-1.01.17-.25.34-.21.58-.13.24.08 1.52.72 1.78.86.26.13.43.2.5.32.06.12.06.7-.16 1.37-.22.67-1.3 1.29-1.77 1.36-.45.07-.98.1-1.58-.1-.36-.12-.82-.27-1.4-.53-.25-.11-1.66-.68-2.73-1.66-1.04-.95-1.74-2.13-1.94-2.47-.2-.34-.76-1.27-.76-2.42 0-1.15.58-1.7.81-1.95Z"
                  fill="currentColor"
                />
              </svg>
              WhatsApp
            </a>

            <a
              className={`${styles.contactButton} ${styles.gmailButton}`}
              href="https://mail.google.com/mail/?view=cm&fs=1&to=cactus.studio.ar@gmail.com&su=Consulta%20MOVC%20Cines"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className={styles.contactIcon}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2.2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="m4.5 7 7.5 5.7L19.5 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Gmail
            </a>
          </div>
        </section>
      </main>

      {previewImage ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada de imagen"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className={styles.lightboxContent}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setPreviewImage(null)}
            >
              Cerrar
            </button>
            <img
              src={previewImage.src}
              alt={previewImage.alt}
              className={styles.lightboxImage}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
