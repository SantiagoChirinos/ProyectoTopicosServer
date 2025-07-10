export function buscarNombres(nombres:string[], include:string):string[]{
    return nombres.filter(nombre=>nombre.search(include)!=-1);
}

export function buscarYFiltrarNombres(nombres:string[], include:string, exclude:string|null):string[]{
    return nombres.filter(nombre=>nombre.search(include)!=-1 && (nombre.search(exclude)==-1||!exclude));
}

export class Coleccion<T>{
    private componentes:T[];

    constructor(componentes:T[]){
        this.componentes=componentes;
    }

    agregarComponente(nuevoComponente:T):number{
        return this.componentes.push(nuevoComponente);
    }

    quitarComponente(posicion:number):T[]{
        if(posicion>this.componentes.length-1){
            return;
        }
        return this.componentes.splice(posicion,1);
    }

    *conseguirSiguienteElemento():IterableIterator<T>{
        let componentesARecorrer=this.componentes;
        let cantidadElementos=componentesARecorrer.length;
        let i=0;
        while(i<cantidadElementos){
            yield componentesARecorrer[i];
            i++;
        }
    }

    *conseguirElementoAleatorio():IterableIterator<T>{
        while(true){
            yield this.componentes[Math.floor(Math.random()*(this.componentes.length+1))]
        }
    }
}