import { JwtService } from '@nestjs/jwt';
import { SongsService } from './songs/songs.service';
export declare class FeatureFlagColeccionController {
    private readonly jwtService;
    private readonly songsService;
    constructor(jwtService: JwtService, songsService: SongsService);
    crearAlbum(req: any, body: {
        artista: string;
        cantidad?: number;
    }): Promise<{
        success: boolean;
        message: string;
        album?: undefined;
    } | {
        album: any[];
        success?: undefined;
        message?: undefined;
    }>;
    crearPlaylist(req: any, body: {
        cantidad?: number;
    }): Promise<{
        success: boolean;
        message: string;
        playlist?: undefined;
    } | {
        playlist: any[];
        success?: undefined;
        message?: undefined;
    }>;
}
