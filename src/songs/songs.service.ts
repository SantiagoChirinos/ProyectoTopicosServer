import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from './song.interface';

/**
 * @class
 * realiza servicios relacionados con canciones
 */
@Injectable()
export class SongsService {
  constructor(@InjectModel('Song') private songModel: Model<Song>) {}
  /**
   * Busca en la base de datos todas las canciones correspondientes a un artista
   * @param {string} artista - artista a buscar
   * @returns 
   */
  async findByArtista(artista: string): Promise<Song[]> {
    return this.songModel.find({ artista }).exec();
  }

  /**
   * Inserta canciones en la base de datos
   * @param {Song[]} songs 
   * @returns 
   */
  async insertMany(songs: Song[]): Promise<any> {
    try {
      return await this.songModel.insertMany(songs, { ordered: false });
    } catch (error) {
      if (error.code === 11000 || error.writeErrors) {
        throw new ConflictException('Algunas o todas las canciones ya existen en la base de datos.');
      }
      throw error;
    }
  }
  /**
   * devuelve todas las canciones de la base de datos
   * @returns - todas las canciones de la base de datos
   */
  async findAll(): Promise<Song[]> {
    return this.songModel.find().exec();
  }
  /**
   * borra todas las canciones de la base de datos
   * @returns 
   */
  async deleteAll(): Promise<any> {
    return this.songModel.deleteMany({});
  }
}

// http://localhost:3000/songs/bulk
