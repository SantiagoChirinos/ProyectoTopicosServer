export function buscarNombres(nombres, include) {
    return nombres.filter(nombre => nombre.search(include) != -1);
}
export function buscarYFiltrarNombres(nombres, include, exclude) {
    return nombres.filter(nombre => nombre.search(include) != -1 && (nombre.search(exclude) == -1 || !exclude));
}
export class Coleccion {
    constructor(componentes) {
        this.componentes = componentes;
    }
    agregarComponente(nuevoComponente) {
        return this.componentes.push(nuevoComponente);
    }
    quitarComponente(posicion) {
        if (posicion > this.componentes.length - 1) {
            return;
        }
        return this.componentes.splice(posicion, 1);
    }
    *conseguirSiguienteElemento() {
        let componentesARecorrer = this.componentes;
        let cantidadElementos = componentesARecorrer.length;
        let i = 0;
        while (i < cantidadElementos) {
            yield componentesARecorrer[i];
            i++;
        }
    }
    *conseguirElementoAleatorio() {
        while (true) {
            yield this.componentes[Math.floor(Math.random() * (this.componentes.length + 1))];
        }
    }
}
//# sourceMappingURL=index.js.map