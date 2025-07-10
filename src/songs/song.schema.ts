import { Schema } from 'mongoose';

export const SongSchema = new Schema({
  nombre: { type: String, required: true },
  artista: { type: String, required: true },
  genero: { type: String, required: true },
  anio: { type: Number, required: true },
  reproducciones: { type: Number, required: true },
});

// Índice único para evitar duplicados por nombre y artista
SongSchema.index({ nombre: 1, artista: 1 }, { unique: true });
