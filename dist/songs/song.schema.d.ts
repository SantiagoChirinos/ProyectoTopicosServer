import { Schema } from 'mongoose';
export declare const SongSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    nombre: string;
    artista: string;
    genero: string;
    anio: number;
    reproducciones: number;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    nombre: string;
    artista: string;
    genero: string;
    anio: number;
    reproducciones: number;
}>> & import("mongoose").FlatRecord<{
    nombre: string;
    artista: string;
    genero: string;
    anio: number;
    reproducciones: number;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
