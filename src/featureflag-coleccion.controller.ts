import { Controller, Post, Body, Get, Query, Req, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SongsService } from './songs/songs.service';
// Importa la librería de colecciones
import { Coleccion } from 'proyectotopicoslibreria';

@Controller('feature-coleccion')
export class FeatureFlagColeccionController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly songsService: SongsService,
  ) {}

  // Solo admin: crear álbum de N canciones de un artista
  @Post('album')
  async crearAlbum(@Req() req, @Body() body: { artista: string, cantidad?: number }) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new ForbiddenException('No autorizado');
    const token = authHeader.replace('Bearer ', '');
    const payload = this.jwtService.verify(token);
    if (payload.role !== 'admin') throw new ForbiddenException('Solo administradores');
    const canciones = await this.songsService.findByArtista(body.artista);
    const cantidad = body.cantidad && body.cantidad > 0 ? body.cantidad : 3;
    if (!canciones || canciones.length < cantidad) {
      return { success: false, message: `No hay suficientes canciones de ese artista (se requieren ${cantidad}).` };
    }
    // Selecciona las primeras N canciones (puedes randomizar si prefieres)
    const album = new Coleccion(canciones.slice(0, cantidad));
    // Devuelve los elementos de la colección usando el generador público
    const elementos = [];
    for (let el of album.conseguirSiguienteElemento()) {
      elementos.push(el);
    }
    return { album: elementos };
  }

  // Admin y usuario: crear playlist de N canciones aleatorias
  @Post('playlist')
  async crearPlaylist(@Req() req, @Body() body: { cantidad?: number }) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new ForbiddenException('No autorizado');
    const token = authHeader.replace('Bearer ', '');
    const payload = this.jwtService.verify(token);
    if (![ 'admin', 'user' ].includes(payload.role)) throw new ForbiddenException('Solo usuarios o administradores');
    const canciones = await this.songsService.findAll();
    const cantidad = body.cantidad && body.cantidad > 0 ? body.cantidad : 5;
    if (!canciones || canciones.length < cantidad) {
      return { success: false, message: `No hay suficientes canciones en la base de datos (se requieren ${cantidad}).` };
    }
    // Selecciona N canciones aleatorias
    const seleccionadas = canciones.sort(() => 0.5 - Math.random()).slice(0, cantidad);
    const playlist = new Coleccion(seleccionadas);
    // Devuelve los elementos de la colección usando el generador público
    const elementos = [];
    for (let el of playlist.conseguirSiguienteElemento()) {
      elementos.push(el);
    }
    return { playlist: elementos };
  }
}
