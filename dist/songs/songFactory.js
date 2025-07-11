"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumFactory = exports.PlaylistFactory = void 0;
const proyectotopicoslibreria_1 = require("proyectotopicoslibreria");
const songs_service_1 = require("./songs.service");
const common_1 = require("@nestjs/common");
let SongColeccionFactory = class SongColeccionFactory {
    constructor(songService) {
        this.songService = songService;
    }
};
SongColeccionFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [songs_service_1.SongsService])
], SongColeccionFactory);
class PlaylistFactory extends SongColeccionFactory {
    async crearColeccion(cancionesSolicitadas) {
        const coleccion = new proyectotopicoslibreria_1.Coleccion([]);
        const todasLasCanciones = await this.songService.findAll();
        const posicionesSeleccionadas = new Set();
        while (posicionesSeleccionadas.size < cancionesSolicitadas &&
            posicionesSeleccionadas.size < todasLasCanciones.length) {
            const posicion = Math.floor(Math.random() * todasLasCanciones.length);
            if (!posicionesSeleccionadas.has(posicion)) {
                posicionesSeleccionadas.add(posicion);
                coleccion.agregarComponente(todasLasCanciones[posicion]);
            }
        }
        return coleccion;
    }
}
exports.PlaylistFactory = PlaylistFactory;
class AlbumFactory extends SongColeccionFactory {
    constructor(songService, artista) {
        super(songService);
        this.artista = artista;
    }
    async crearColeccion(cancionesSolicitadas) {
        let coleccion = new proyectotopicoslibreria_1.Coleccion([]);
        let cancionesArtista = await this.songService.findByArtista(this.artista);
        const posicionesSeleccionadas = new Set();
        while (posicionesSeleccionadas.size < cancionesSolicitadas &&
            posicionesSeleccionadas.size < cancionesArtista.length) {
            const posicion = Math.floor(Math.random() * cancionesArtista.length);
            if (!posicionesSeleccionadas.has(posicion)) {
                posicionesSeleccionadas.add(posicion);
                coleccion.agregarComponente(cancionesArtista[posicion]);
            }
        }
        return coleccion;
    }
}
exports.AlbumFactory = AlbumFactory;
//# sourceMappingURL=songFactory.js.map