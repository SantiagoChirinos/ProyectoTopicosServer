"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizarNombres = organizarNombres;
const featureFlag_1 = require("./featureFlag");
function organizarNombres(nombres, include, exclude) {
    if (featureFlag_1.organizar.verificarCondicion(nombres)) {
        return nombres.filter(nombre => nombre.search(include) != -1 && (nombre.search(exclude) == -1 || !exclude));
    }
    else {
        return nombres.filter(nombre => nombre.search(include) != -1);
    }
}
//# sourceMappingURL=libreria.js.map