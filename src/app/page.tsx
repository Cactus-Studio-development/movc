"use client";

import { useState } from "react";
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
};

const featuredSeries: FeaturedSeries = {
  title: "El Silencio de los Desaparecidos",
  genre: "Serie / Thriller / Drama",
  duration: "8 episodios (40-60 min)",
  rating: "+16",
  launch: "Serie destacada: Episodio 1 (Piloto)",
  synopsis:
    "Serie de 8 episodios. Cada episodio dura entre 40 y 60 minutos. Se muestra únicamente el póster del primer episodio: Piloto.",
  poster:
    "https://placehold.co/1200x700/0f172a/e2e8f0?text=Episodio+Piloto",
};

const navItems = [
  {
    label: "Inicio",
    detail: "Bienvenidos a nuestra plataforma de Contenido.",
  },
  {
    label: "Cartelera",
    detail: "Mostrando episodio 1: Piloto.",
  },
  {
    label: "Próximamente",
    detail: "Bloque de próximos episodios en preparación.",
  },
  {
    label: "Nosotros",
    detail:
      "Somos MOVC Cines: una plataforma de contenido enfocada en experiencias premium.",
    buttonText: "Conocernos",
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
  const [darkMode, setDarkMode] = useState(true);
  const [previewImage, setPreviewImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [lastHoverToast, setLastHoverToast] = useState<string>("");

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
          <div className={styles.logo}>MOVC Cines</div>
          <button
            type="button"
            className={styles.themeButton}
            onClick={() => setDarkMode((current) => !current)}
          >
            {darkMode ? "Modo oscuro" : "Modo claro"}
          </button>
        </div>
        <nav className={styles.navMenu} aria-label="Menú principal">
          {navItems.map((item) => (
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
          ))}
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

        <section className={styles.featuredBoard}>
          <div className={styles.featuredContent}>
            <div className={styles.featuredBadges}>
              <span className={styles.featuredEpisodeBadge}>Episodio 1</span>
              <span className={styles.featuredStatusBadge}>En cartelera</span>
            </div>
            <p className={styles.featuredLabel}>{featuredSeries.launch}</p>
            <h2>{featuredSeries.title}</h2>
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
          <h3>Próximamente</h3>
          <p>
            Próximamente se habilitarán fichas por episodio con horarios y sala.
          </p>
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
