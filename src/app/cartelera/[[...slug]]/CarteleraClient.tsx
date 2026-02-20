"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const THEME_STORAGE_KEY = "osisg-playground-theme";
import {
  getCarteleraByType,
  getCarteleraItem,
  getCarteleraPath,
  type CarteleraItem,
  type CarteleraType,
} from "@/lib/cartelera-data";
import styles from "../cartelera.module.css";

const typeLabels: Record<CarteleraType, string> = {
  series: "Series",
  cortos: "Cortos",
  peliculas: "Películas",
};

type Props = { slug?: string[] };

export default function CarteleraClient({ slug: slugProp }: Props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const type = slugProp?.[0] as CarteleraType | undefined;
  const slug = slugProp?.[1];
  const openItem = type && slug ? getCarteleraItem(type, slug) : null;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark") setDarkMode(true);
    if (stored === "light") setDarkMode(false);
  }, []);


  const closeModal = useCallback(() => {
    router.push("/cartelera");
  }, [router]);

  useEffect(() => {
    if (!openItem?.inProduction) return;
    const t = setTimeout(closeModal, 3000);
    return () => clearTimeout(t);
  }, [openItem?.id, openItem?.inProduction, closeModal]);

  const cartelera = getCarteleraByType();

  if (!mounted) {
    return (
      <div className={styles.page} data-theme="light">
        <div className={styles.pageBackground} aria-hidden="true">
          <div className={styles.pageBackgroundImage} />
          <div className={styles.pageBackgroundOverlay} />
        </div>
        <div className={styles.wrapper}>
          <p>Cargando cartelera…</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page} data-theme={darkMode ? "dark" : "light"}>
      <div className={styles.pageBackground} aria-hidden="true">
        <div className={styles.pageBackgroundImage} />
        <div className={styles.pageBackgroundOverlay} />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.carteleraHeader}>
          <Link href="/" className={styles.backLink}>
            ← Volver al inicio
          </Link>
          <button
            type="button"
            className={styles.themeButton}
            onClick={() => {
            const next = !darkMode;
            setDarkMode(next);
            if (typeof window !== "undefined") {
              localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
            }
          }}
          >
            {darkMode ? "Modo oscuro" : "Modo claro"}
          </button>
        </div>
        <h1 className={styles.title}>Cartelera</h1>

        <section className={styles.section} aria-label="Series">
          <h2 className={styles.sectionTitle}>{typeLabels.series}</h2>
          <div className={styles.cardsGrid}>
            {cartelera.series.map((item, i) => (
              <Link
                key={item.id}
                href={getCarteleraPath(item)}
                className={styles.card}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <img
                  src={item.poster}
                  alt=""
                  className={styles.cardPoster}
                  loading="lazy"
                />
                <div className={styles.cardBody}>
                  <span className={styles.cardBadge}>{item.type}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  {item.subtitle && (
                    <p className={styles.cardSubtitle}>{item.subtitle}</p>
                  )}
                  <div className={styles.cardMeta}>
                    <span>{item.genre}</span>
                    <span>{item.duration}</span>
                    <span>{item.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {cartelera.cortos.length > 0 && (
          <section className={styles.section} aria-label="Cortos">
            <h2 className={styles.sectionTitle}>{typeLabels.cortos}</h2>
            <div className={styles.cardsGrid}>
              {cartelera.cortos.map((item, i) => (
                <Link
                  key={item.id}
                  href={getCarteleraPath(item)}
                  className={styles.card}
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <img
                    src={item.poster}
                    alt=""
                    className={styles.cardPoster}
                    loading="lazy"
                  />
                  <div className={styles.cardBody}>
                    <span className={styles.cardBadge}>{item.type}</span>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    {item.subtitle && (
                      <p className={styles.cardSubtitle}>{item.subtitle}</p>
                    )}
                    <div className={styles.cardMeta}>
                      <span>{item.genre}</span>
                      <span>{item.duration}</span>
                      <span>{item.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {cartelera.peliculas.length > 0 && (
          <section className={styles.section} aria-label="Películas">
            <h2 className={styles.sectionTitle}>{typeLabels.peliculas}</h2>
            <div className={styles.cardsGrid}>
              {cartelera.peliculas.map((item, i) => (
                <Link
                  key={item.id}
                  href={getCarteleraPath(item)}
                  className={styles.card}
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <img
                    src={item.poster}
                    alt=""
                    className={styles.cardPoster}
                    loading="lazy"
                  />
                  <div className={styles.cardBody}>
                    <span className={styles.cardBadge}>{item.type}</span>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    {item.subtitle && (
                      <p className={styles.cardSubtitle}>{item.subtitle}</p>
                    )}
                    <div className={styles.cardMeta}>
                      <span>{item.genre}</span>
                      <span>{item.duration}</span>
                      <span>{item.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {openItem && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalClose}>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
            <div className={styles.modalCardBlock} id="modal-title">
              <CarteleraModalContent
                item={openItem}
                onClose={closeModal}
                autoCloseSeconds={openItem.inProduction ? 3 : undefined}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CarteleraModalContent({
  item,
  onClose,
  autoCloseSeconds,
}: {
  item: CarteleraItem;
  onClose: () => void;
  autoCloseSeconds?: number;
}) {
  const path = getCarteleraPath(item);
  return (
    <>
      {autoCloseSeconds != null && (
        <p className={styles.modalProductionNotice}>
          En producción. Este modal se cierra en {autoCloseSeconds} segundos.
        </p>
      )}
      <div className={styles.modalFeaturedBoard}>
        <div className={styles.modalFeaturedContent}>
          <div className={styles.modalBadges}>
            <span className={styles.modalEpisodeBadge}>{item.type}</span>
            <span className={styles.modalStatusBadge}>En cartelera</span>
          </div>
          <h2>{item.title}</h2>
          {item.subtitle && (
            <p className={styles.modalSubtitle}>{item.subtitle}</p>
          )}
          <p className={styles.modalSynopsis}>{item.synopsis}</p>
          <div className={styles.modalMeta}>
            <span>{item.genre}</span>
            <span>{item.duration}</span>
            <span>{item.rating}</span>
          </div>
          <Link href={path} className={styles.modalRouteLink}>
            Ruta de esta ficha: {path}
          </Link>
        </div>
        <div className={styles.modalPosterWrap}>
          <img src={item.poster} alt="" />
        </div>
      </div>

      <div className={styles.modalFicha}>
        <div className={styles.modalCardRef}>
          <span className={styles.modalCardRefLabel}>Ficha correspondiente a</span>
          <strong className={styles.modalCardRefTitle}>{item.title}</strong>
        </div>
        <h3 className={styles.modalFichaTitle}>Ficha</h3>
        <div className={styles.modalRatingRow}>
          <span className={styles.modalStar} aria-hidden="true">★</span>
          <span className={styles.modalRatingValue}>
            {item.imdbRating || "—"}
          </span>
          <span className={styles.modalRatingMax}>/10</span>
        </div>
        <dl className={styles.modalDetails}>
          <div className={styles.modalDetailRow}>
            <dt className={styles.modalTerm}>Director</dt>
            <dd className={styles.modalDesc}>{item.director}</dd>
          </div>
          <div className={styles.modalDetailRow}>
            <dt className={styles.modalTerm}>Creadores</dt>
            <dd className={styles.modalDesc}>{item.creators.join(", ")}</dd>
          </div>
          <div className={styles.modalDetailRow}>
            <dt className={styles.modalTerm}>Reparto</dt>
            <dd className={styles.modalDesc}>{item.cast.join(", ")}</dd>
          </div>
          <div className={styles.modalDetailRow}>
            <dt className={styles.modalTerm}>Estreno</dt>
            <dd className={styles.modalDesc}>{item.releaseDate}</dd>
          </div>
        </dl>
        <div className={styles.modalPlot}>
          <h4 className={styles.modalPlotTitle}>Trama</h4>
          <p>{item.fullPlot}</p>
        </div>
      </div>

      <div className={styles.modalActors}>
        <h3 className={styles.modalActorsTitle}>Reparto / Actores</h3>
        <p className={styles.modalActorsIntro}>Elenco de &quot;{item.title}&quot;</p>
        <div className={styles.modalActorsGrid}>
          {item.actors.map((actor) => (
            <div key={actor.id} className={styles.modalActorCard}>
              <div className={styles.modalActorAvatar} aria-hidden="true">
              <svg className={styles.modalActorAvatarIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 20c0-3.5 3.5-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
              <span className={styles.modalActorName}>{actor.name}</span>
              <span className={styles.modalActorRole}>{actor.role}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
