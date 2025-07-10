import { Model } from 'mongoose';
import { Song } from './song.interface';
export declare class SongsService {
    private songModel;
    constructor(songModel: Model<Song>);
    insertMany(songs: Song[]): Promise<any>;
    findAll(): Promise<Song[]>;
    deleteAll(): Promise<any>;
}
