export declare function buscarNombres(nombres: string[], include: string): string[];
export declare function buscarYFiltrarNombres(nombres: string[], include: string, exclude: string | null): string[];
export declare class Coleccion<T> {
    private componentes;
    constructor(componentes: T[]);
    agregarComponente(nuevoComponente: T): number;
    quitarComponente(posicion: number): T[];
    conseguirSiguienteElemento(): IterableIterator<T>;
    conseguirElementoAleatorio(): IterableIterator<T>;
}
