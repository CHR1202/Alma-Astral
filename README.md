# Alma Astral · Visual V9

Versión visual basada en la referencia aprobada del dashboard.

## Cambios principales
- Logo real de Alma Astral en la parte superior del menú lateral.
- Iconografía de navegación rehecha con SVG lineal, más elegante y consistente.
- Luna principal reemplazada por una composición lunar realista y texturizada.
- Hero reconstruido en HTML/CSS: la imagen solo se utiliza como recurso decorativo lunar.
- Paleta oficial:
  - Morados: #4A2C6D, #5B3A82, #6A4C93
  - Dorados: #D4AF37, #C8A75A, #E2C98F
  - Fondos: #1B1C24, #23242E, #2B2B35
- Dashboard responsive.
- Animaciones y transiciones suaves.
- Login y personalización local conservados.
- Preparado para conectar Supabase más adelante.

## Estructura
- index.html — login
- app.html — dashboard
- css/base.css
- css/auth.css
- css/app.css
- js/auth.js
- js/app.js
- assets/logo-original.jpeg
- assets/hero-moon-realistic.jpg

## Nota
El login sigue siendo un prototipo con localStorage. No usar contraseñas reales hasta integrar autenticación segura.


## V10
- Corregido el logo del sidebar: ahora usa `object-fit: contain`, sin zoom ni recorte.
- Aumentado el espacio vertical para mostrar completa la luna y el texto original.
- Glow morado sutil para integrarlo con el fondo sin alterar el logo.


## Publicar en GitHub Pages
Este ZIP ya está preparado para GitHub Pages.

IMPORTANTE: sube **los archivos que están dentro del ZIP directamente a la raíz del repositorio**. No subas una carpeta contenedora extra. En la raíz debes ver `index.html`, `app.html`, `404.html`, `.nojekyll`, `css/`, `js/` y `assets/`.

En GitHub: Settings → Pages → Build and deployment → Deploy from a branch → selecciona tu rama (normalmente `main`) y `/ (root)`.

Las rutas del proyecto son relativas, por lo que funcionan tanto en un dominio propio como en `usuario.github.io/nombre-del-repositorio/`.
