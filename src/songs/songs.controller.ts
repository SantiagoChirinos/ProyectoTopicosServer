import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './song.interface';


@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}
  /**
   * método que retorna todas las canciones de la base de datos
   * @returns todas las canciones de la base de datos
   */
  @Get()
  async getAllSongs() {
    return this.songsService.findAll();
  }
  /**
   * inserta canciones en la base de datos
   * @param {Song[]} songs - canciones a insertar 
   * @returns 
   */
  @Post('bulk')
  async insertSongs(@Body() songs: Song[]) {
    try {
      return await this.songsService.insertMany(songs);
    } catch (error) {
      return { success: false, message: 'Error: ' + error.message };
    }
  }
  /**
   * endpoint que borra todas las canciones de la base de datos
   * 
   */
  @Delete('all')
  async deleteAllSongs() {
    return this.songsService.deleteAll();
  }

  /**
   * endpoint que devuelve las canciones correspondientes a un artista
   * @param {string} artista 
   * @returns todas las canciones de un artista
   */
  @Get('artista/:artista')
  async getSongsByArtista(@Param('artista') artista: string) {
    return this.songsService.findByArtista(artista);
  }
}
