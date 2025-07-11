import { Schema } from 'mongoose';

/**
 * Esquema de la cancion para la base de datos
 * 
 * @interface Song
 * @property {string} nombre - Título de la canción.
 * @property {string} artista - Nombre del artista o banda que interpreta la canción.
 * @property {string} genero - Género musical de la canción (ej. rock, pop, reggaetón).
 * @property {number} anio - Año de lanzamiento de la canción.
 * @property {number} reproducciones - Número total de veces que se ha reproducido.
 */
export const SongSchema = new Schema({
  nombre: { type: String, required: true },
  artista: { type: String, required: true },
  genero: { type: String, required: true },
  anio: { type: Number, required: true },
  reproducciones: { type: Number, required: true },
});

/**
 * Índice único para evitar duplicados por nombre y artista
 */
SongSchema.index({ nombre: 1, artista: 1 }, { unique: true });
