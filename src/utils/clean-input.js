/**
 * Limpia una cadena de entrada eliminando espacios en blanco y reemplazando múltiples espacios en blanco por uno solo
 *
 * @param {string} input - El texto a limpiar
 * @returns {string} El texto limpio.
 */
export const cleanInput = (input) => {
  return input
    .trim() // Quita espacios en blanco al principio y al final
    .replace(/\s+/g, ' '); // Reemplaza múltiples espacios en blanco por uno solo
};

/**
 * Detecta si una cadena de texto contiene etiquetas HTML.
 *
 * @param {string} input - El texto a analizar
 * @returns {boolean} true si se detectan etiquetas HTML, false en caso contrario
 */
export const detectHTMLTags = (input) => {
  const tags = input.match(/<\/?[^>]+(>|$)/gi);
  // Si el match devuelve algo, es que hay etiquetas HTML
  return tags !== null;
};
