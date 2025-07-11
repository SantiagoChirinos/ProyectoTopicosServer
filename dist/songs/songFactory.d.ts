import { Coleccion } from 'proyectotopicoslibreria';
import { Song } from './song.interface';
import { SongsService } from './songs.service';
declare abstract class SongColeccionFactory {
    readonly songService: SongsService;
    constructor(songService: SongsService);
    abstract crearColeccion(canciones: number): Promise<Coleccion<Song>>;
}
export declare class PlaylistFactory extends SongColeccionFactory {
    crearColeccion(cancionesSolicitadas: number): Promise<Coleccion<Song>>;
}
export declare class AlbumFactory extends SongColeccionFactory {
    private readonly artista;
    constructor(songService: SongsService, artista: string);
    crearColeccion(cancionesSolicitadas: number): Promise<Coleccion<Song>>;
}
export {};
