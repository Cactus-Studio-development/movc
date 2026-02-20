"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { sileo } from "sileo";
import styles from "./page.module.css";

const Lottie = dynamic(
  () => import("lottie-react").then((mod) => mod.default),
  { ssr: false }
);

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

const LOTTIE_ENTRANCE_URL =
  "https://assets2.lottiefiles.com/packages/lf20_touohxv0.json";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [previewImage, setPreviewImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [lastHoverToast, setLastHoverToast] = useState<string>("");
  const [entranceDone, setEntranceDone] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [lottieData, setLottieData] = useState<object | null>(null);
  const [entranceLeaving, setEntranceLeaving] = useState(false);
  const entranceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finishEntrance = useCallback(() => {
    setEntranceLeaving(true);
    setTimeout(() => setEntranceDone(true), 480);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark") setDarkMode(true);
    if (stored === "light") setDarkMode(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(LOTTIE_ENTRANCE_URL)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setLottieData(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (entranceDone) return;
    entranceTimeoutRef.current = setTimeout(finishEntrance, 2800);
    return () => {
      if (entranceTimeoutRef.current) clearTimeout(entranceTimeoutRef.current);
    };
  }, [entranceDone, finishEntrance]);

  useEffect(() => {
    const onLoad = () => {
      setTimeout(() => setPageReady(true), 400);
    };
    if (typeof window === "undefined") return;
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
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
      {!entranceDone && (
        <div
          className={`${styles.entranceOverlay} ${entranceLeaving ? styles.entranceOverlayOut : ""}`}
          aria-hidden="true"
        >
          <div className={styles.entranceLottieWrap}>
            {lottieData && (
              <Lottie
                animationData={lottieData}
                loop={false}
                onComplete={finishEntrance}
                className={styles.entranceLottie}
              />
            )}
          </div>
        </div>
      )}

      <div className={styles.pageBackground} aria-hidden="true">
        <div className={styles.pageBackgroundImage} />
        <div className={styles.pageBackgroundOverlay} />
        <div className={styles.pageBackgroundGrain} />
      </div>
      <header className={styles.mainHeader}>
        <div className={styles.mainHeaderContent}>
          <h1 className={styles.mainHeaderTitle}>
            Osisg <span className={styles.mainHeaderHighlight}>Playground</span>
          </h1>
          <p className={styles.mainHeaderTagline}>Plataforma de contenido — series, cortos y películas</p>
        </div>
      </header>

      <nav className={styles.navbar} aria-label="Navegación">
        <div className={styles.brandGroup}>
          <Link href="/" className={styles.logo}>
            Osisg <span className={styles.logoPlayground}>PLAYGROUND</span>
          </Link>
          <button
            type="button"
            className={styles.themeButton}
            onClick={() => setTheme(!darkMode)}
          >
            {darkMode ? "Modo oscuro" : "Modo claro"}
          </button>
        </div>
        <div className={styles.navMenu} role="navigation" aria-label="Menú principal">
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
        </div>
      </nav>

      <main className={styles.main}>
        {!pageReady ? (
          <div className={styles.skeletonRoot}>
            <div className={styles.skeletonSection}>
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonText}>
                <div className={styles.skeletonLine} />
                <div className={styles.skeletonLine} style={{ width: "70%" }} />
                <div className={styles.skeletonLine} style={{ width: "90%" }} />
              </div>
            </div>
            <div className={styles.skeletonSection}>
              <div className={styles.skeletonBar} />
              <div className={styles.skeletonBar} style={{ width: "60%" }} />
            </div>
            <div className={styles.skeletonFeatured}>
              <div className={styles.skeletonText}>
                <div className={styles.skeletonLine} />
                <div className={styles.skeletonLine} style={{ width: "80%" }} />
                <div className={styles.skeletonLine} style={{ width: "50%" }} />
              </div>
              <div className={styles.skeletonImage} />
            </div>
            <div className={styles.skeletonGrid}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.skeletonCard} />
              ))}
            </div>
          </div>
        ) : (
          <>
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

        <section id="nosotros" className={styles.infoSection}>
          <h3>Nosotros</h3>
          <p>Osisg Playground — plataforma de contenido. Patrocinado por Osisg.</p>
        </section>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <div className={styles.footerLinks}>
              <div className={styles.footerCol}>
                <Link href="/">Inicio</Link>
                <Link href="/cartelera">Cartelera</Link>
              </div>
              <div className={styles.footerCol}>
                <a href="https://dev.osisg.com/" target="_blank" rel="noopener noreferrer">Osisg</a>
                <span className={styles.footerDot}>·</span>
                <Link href="/#nosotros">Nosotros</Link>
              </div>
            </div>
            <p className={styles.footerCopy}>
              © {new Date().getFullYear()} Osisg Playground. Patrocinado por Osisg.
            </p>
          </div>
          <div className={styles.footerSocialIcons} aria-hidden="true">
            <span className={styles.footerSocialIcon} title="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </span>
            <span className={styles.footerSocialIcon} title="X">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </span>
            <span className={styles.footerSocialIcon} title="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </span>
            <span className={styles.footerSocialIcon} title="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </span>
          </div>
        </div>
      </footer>

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
