/**
 * Representa una canción dentro del sistema.
 * 
 * @interface Song
 * @property {string} nombre - Título de la canción.
 * @property {string} artista - Nombre del artista o banda que interpreta la canción.
 * @property {string} genero - Género musical de la canción (ej. rock, pop, reggaetón).
 * @property {number} anio - Año de lanzamiento de la canción.
 * @property {number} reproducciones - Número total de veces que se ha reproducido.
 */
export interface Song {
  nombre: string;
  artista: string;
  genero: string;
  anio: number;
  reproducciones: number;
}
