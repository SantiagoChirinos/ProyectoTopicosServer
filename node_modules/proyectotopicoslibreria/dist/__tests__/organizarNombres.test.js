"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const libreria_1 = require("../src/libreria");
describe("organizarNombres prueba", () => {
    let arrayNombresPar = ["Juan", "María", "Carlos", "Lucía", "Pedro", "Sofía"];
    let arrayNombresImpar = ["Juan", "María", "Carlos", "Lucía", "Pedro"];
    it("1- buscar a una persona y que la devuelva cumpliendo la feature flag pero sin exclude", () => {
        expect((0, libreria_1.organizarNombres)(arrayNombresPar, "Juan", null)).toEqual(["Juan"]);
    });
    it("2- buscar a varias personas cumpliando la feature flag pero sin excluir", () => {
        expect((0, libreria_1.organizarNombres)(arrayNombresPar, "a", null)).toEqual(["Juan", "María", "Carlos", "Lucía", "Sofía"]);
    });
    it("3- buscar pero no encontrar a nadie cumpliendo la feature flag sin filtrar", () => {
        expect((0, libreria_1.organizarNombres)(arrayNombresPar, "333", null)).toEqual([]);
    });
    it("4- buscar cumpliendo la feature flag, filtrando", () => {
        expect((0, libreria_1.organizarNombres)(arrayNombresPar, "a", "í")).toEqual(["Juan", "Carlos"]);
    });
    it("5- buscar cumpliendo la feature flag, filtrando y no encontrando a nadie", () => {
        expect((0, libreria_1.organizarNombres)(arrayNombresPar, "a", "a")).toEqual([]);
    });
    it("6- buscar cumpliendo la feature flag y que solo resulte una persona", () => {
        expect((0, libreria_1.organizarNombres)(arrayNombresPar, "o", "r")).toEqual(["Sofía"]);
    });
    it("7- buscar sin cumplir la feature flag sin poner exclude", () => {
        expect((0, libreria_1.organizarNombres)(arrayNombresImpar, "Juan", null)).toEqual(["Juan"]);
    });
    it("8- buscar sin cumplir la feature flag intentando filtrar", () => {
        expect((0, libreria_1.organizarNombres)(arrayNombresImpar, "Juan", "Juan")).toEqual(["Juan"]);
    });
    it("9- buscar sin cumplir la feature flag y que no encuentre a nadie", () => {
        expect((0, libreria_1.organizarNombres)(arrayNombresImpar, "333", null)).toEqual([]);
    });
    it("10- buscar sin cumplir la feature flag y que consiga a varias personas sin intentar filtrar", () => {
        expect((0, libreria_1.organizarNombres)(arrayNombresImpar, "ar", null)).toEqual(["María", "Carlos"]);
    });
});
//# sourceMappingURL=organizarNombres.test.js.map