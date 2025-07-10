import { Coleccion} from 'proyectotopicoslibreria';
import { Song } from './song.interface';
import { SongsService } from './songs.service';
import { Injectable } from '@nestjs/common';
@Injectable()
abstract class SongColeccionFactory{
    constructor(readonly songService:SongsService){}
    abstract crearColeccion(canciones:number):Promise<Coleccion<Song>>;
}

export class PlaylistFactory extends SongColeccionFactory {
  async crearColeccion(cancionesSolicitadas: number): Promise<Coleccion<Song>> {
    const coleccion = new Coleccion<Song>([]);
    const todasLasCanciones = await this.songService.findAll();

    const posicionesSeleccionadas = new Set<number>();
    while (
      posicionesSeleccionadas.size < cancionesSolicitadas &&
      posicionesSeleccionadas.size < todasLasCanciones.length
    ) {
      const posicion = Math.floor(Math.random() * todasLasCanciones.length);
      if (!posicionesSeleccionadas.has(posicion)) {
        posicionesSeleccionadas.add(posicion);
        coleccion.agregarComponente(todasLasCanciones[posicion]);
      }
    }
    return coleccion;
  }
}

export class AlbumFactory extends SongColeccionFactory{
    private readonly artista:string;
    constructor(songService:SongsService, artista:string){
        super(songService);
        this.artista=artista;
    }
    async crearColeccion(cancionesSolicitadas: number): Promise<Coleccion<Song>>{
        let coleccion= new Coleccion<Song>([]);
        let cancionesArtista= await this.songService.findByArtista(this.artista);
        const posicionesSeleccionadas = new Set<number>();
        while (
        posicionesSeleccionadas.size < cancionesSolicitadas &&
        posicionesSeleccionadas.size < cancionesArtista.length
        ) {
        const posicion = Math.floor(Math.random() * cancionesArtista.length);
        if (!posicionesSeleccionadas.has(posicion)) {
            posicionesSeleccionadas.add(posicion);
            coleccion.agregarComponente(cancionesArtista[posicion]);
        }
        }
        return coleccion;
    }
}