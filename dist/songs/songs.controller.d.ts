import { SongsService } from './songs.service';
import { Song } from './song.interface';
export declare class SongsController {
    private readonly songsService;
    constructor(songsService: SongsService);
    getAllSongs(): Promise<Song[]>;
    insertSongs(songs: Song[]): Promise<any>;
    deleteAllSongs(): Promise<any>;
}
