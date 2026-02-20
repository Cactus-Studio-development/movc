# MOVC Cines

Cartelera de películas y series. Next.js 16, React 19, Tailwind 4, TypeScript.

## Cómo arrancar

```bash
npm run dev
```
Abrí [http://localhost:3000](http://localhost:3000) en el navegador.
//osisg
## Secciones de la página

1. **Navbar** – Logo MOVC Cines, botón modo oscuro/claro, menú (Inicio, Cartelera, Próximamente, Nosotros).
2. **Presentación** – Imagen de portada de la serie destacada y texto de presentación.
3. **Hero** – Bloque “Serie en producción” con hashtags (Thriller, Drama, Misterio, Investigación).
4. **Cartelera (episodio destacado)** – Card del Episodio 1: Piloto con badges, sinopsis, meta (género, duración, edad), botón “Ver detalle del piloto” y póster ampliable.
5. **Ficha de la serie** – Bloque tipo [IMDb](https://www.imdb.com/es/): valoración con estrella, Director, Creadores, Reparto, Estreno y Trama.
6. **Patrocinado por Osisg** – Enlace a [dev.osisg.com](https://dev.osisg.com/), texto de patrocinio y badges App Store / Play Store.
7. **Producción** – Carrusel de imágenes del detrás de cámara (click para ampliar).
8. **Nosotros** – Correo, teléfono, botones WhatsApp y Gmail.
9. **Lightbox** – Modal para ver imágenes en grande (portada, póster, fotos del carrusel).

Fondo: imagen de carteleras (`/image/imagen.jpg`) con overlay y contraste según modo oscuro/claro.

## Scripts

- `npm run dev` – Servidor de desarrollo
- `npm run build` – Build de producción
- `npm run start` – Servidor de producción
- `npm run lint` – ESLint
