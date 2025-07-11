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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlagColeccionController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const songs_service_1 = require("./songs/songs.service");
const proyectotopicoslibreria_1 = require("proyectotopicoslibreria");
let FeatureFlagColeccionController = class FeatureFlagColeccionController {
    constructor(jwtService, songsService) {
        this.jwtService = jwtService;
        this.songsService = songsService;
    }
    async crearAlbum(req, body) {
        const authHeader = req.headers['authorization'];
        if (!authHeader)
            throw new common_1.ForbiddenException('No autorizado');
        const token = authHeader.replace('Bearer ', '');
        const payload = this.jwtService.verify(token);
        if (payload.role !== 'admin')
            throw new common_1.ForbiddenException('Solo administradores');
        const canciones = await this.songsService.findByArtista(body.artista);
        const cantidad = body.cantidad && body.cantidad > 0 ? body.cantidad : 3;
        if (!canciones || canciones.length < cantidad) {
            return { success: false, message: `No hay suficientes canciones de ese artista (se requieren ${cantidad}).` };
        }
        const album = new proyectotopicoslibreria_1.Coleccion(canciones.slice(0, cantidad));
        const elementos = [];
        for (let el of album.conseguirSiguienteElemento()) {
            elementos.push(el);
        }
        return { album: elementos };
    }
    async crearPlaylist(req, body) {
        const authHeader = req.headers['authorization'];
        if (!authHeader)
            throw new common_1.ForbiddenException('No autorizado');
        const token = authHeader.replace('Bearer ', '');
        const payload = this.jwtService.verify(token);
        if (!['admin', 'user'].includes(payload.role))
            throw new common_1.ForbiddenException('Solo usuarios o administradores');
        const canciones = await this.songsService.findAll();
        const cantidad = body.cantidad && body.cantidad > 0 ? body.cantidad : 5;
        if (!canciones || canciones.length < cantidad) {
            return { success: false, message: `No hay suficientes canciones en la base de datos (se requieren ${cantidad}).` };
        }
        const seleccionadas = canciones.sort(() => 0.5 - Math.random()).slice(0, cantidad);
        const playlist = new proyectotopicoslibreria_1.Coleccion(seleccionadas);
        const elementos = [];
        for (let el of playlist.conseguirSiguienteElemento()) {
            elementos.push(el);
        }
        return { playlist: elementos };
    }
};
exports.FeatureFlagColeccionController = FeatureFlagColeccionController;
__decorate([
    (0, common_1.Post)('album'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FeatureFlagColeccionController.prototype, "crearAlbum", null);
__decorate([
    (0, common_1.Post)('playlist'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FeatureFlagColeccionController.prototype, "crearPlaylist", null);
exports.FeatureFlagColeccionController = FeatureFlagColeccionController = __decorate([
    (0, common_1.Controller)('feature-coleccion'),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        songs_service_1.SongsService])
], FeatureFlagColeccionController);
//# sourceMappingURL=featureflag-coleccion.controller.js.map