// src/utils/imageUrl.js

/**
 * Retourne l'URL complète d'une image dans le dossier /images/
 * Compatible avec base: '/pokedex/' ou '/'
 */
export function getImageUrl (filename, fallback = 'default.png') {
  if (!filename) {
    filename = fallback
  }
  return `${import.meta.env.VITE_API_URL}${filename}`
}
