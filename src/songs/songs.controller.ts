import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './song.interface';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  async getAllSongs() {
    return this.songsService.findAll();
  }

  @Post('bulk')
  async insertSongs(@Body() songs: Song[]) {
    try {
      return await this.songsService.insertMany(songs);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Delete('all')
  async deleteAllSongs() {
    return this.songsService.deleteAll();
  }
}
