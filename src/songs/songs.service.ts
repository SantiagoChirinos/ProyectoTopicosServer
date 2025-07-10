import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from './song.interface';

@Injectable()
export class SongsService {
  constructor(@InjectModel('Song') private songModel: Model<Song>) {}

  async insertMany(songs: Song[]): Promise<any> {
    try {
      return await this.songModel.insertMany(songs, { ordered: false });
    } catch (error) {
      if (error.code === 11000 || error.writeErrors) {
        throw new Error('Algunas o todas las canciones ya existen en la base de datos.');
      }
      throw error;
    }
  }

  async findAll(): Promise<Song[]> {
    return this.songModel.find().exec();
  }
}

// http://localhost:3000/songs/bulk
