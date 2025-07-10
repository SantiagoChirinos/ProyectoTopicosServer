"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SongSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    artista: { type: String, required: true },
    genero: { type: String, required: true },
    anio: { type: Number, required: true },
    reproducciones: { type: Number, required: true },
});
exports.SongSchema.index({ nombre: 1, artista: 1 }, { unique: true });
//# sourceMappingURL=song.schema.js.map