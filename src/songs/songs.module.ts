import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongSchema } from './song.schema';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';

/**
 * Módulo encargado de gestionar las operaciones relacionadas con canciones.
 * 
 * Configura el esquema Mongoose de la colección 'Song', expone el controlador de rutas
 * y el servicio que maneja la lógica de negocio para las canciones.
 * 
 * @module SongsModule
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Song', schema: SongSchema }])],
  providers: [SongsService],
  controllers: [SongsController],
  exports: [SongsService],
})
export class SongsModule {}
