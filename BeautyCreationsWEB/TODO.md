# TODO - División por carpetas / módulos

- [ ] Crear estructura de carpetas: `frontend/`, `backend/`, `index/` (o equivalente) dentro del repo.
- [ ] Extraer CSS embebido en `beauty-creations-app.html` a `frontend/styles/styles.css`.


- [ ] Extraer HTML de auth/app/modales a `index/index.html` (manteniendo IDs/clases).
- [ ] Extraer JS `Auth` y `Favorites` a `backend/auth.js` y `backend/favorites.js` (o un módulo `backend/auth.js`/`favorites.js`).
- [ ] Extraer el JS de navegación, render, filtros, geolocalización, perfil y dropdown a `frontend/app.js`.
- [ ] Sustituir en el HTML los handlers inline (`onclick=...`, etc.) por `addEventListener` en `frontend/app.js`.
- [ ] Adaptar referencias globales: asegurar que el HTML quede funcionando con el nuevo sistema de módulos.
- [ ] Actualizar `beauty-creations-app.html` para que apunte al nuevo `index/index.html` (o dejarlo como wrapper) según decisión.
- [ ] Probar abriendo `index/index.html` en el navegador.

