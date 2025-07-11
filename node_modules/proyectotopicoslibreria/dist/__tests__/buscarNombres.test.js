import { buscarNombres } from '../src';
describe("organizarNombres prueba", () => {
    let arrayNombres = ["Juan", "María", "Carlos", "Lucía", "Pedro", "Sofía"];
    it("1- buscar a una persona y que la devuelva", () => {
        expect(buscarNombres(arrayNombres, "Juan")).toEqual(["Juan"]);
    });
    it("2- buscar a varias personas", () => {
        expect(buscarNombres(arrayNombres, "a")).toEqual(["Juan", "María", "Carlos", "Lucía", "Sofía"]);
    });
    it("3- buscar pero no encontrar a nadie", () => {
        expect(buscarNombres(arrayNombres, "333")).toEqual([]);
    });
    it("4- buscar con un caracter con acento", () => {
        expect(buscarNombres(arrayNombres, "í")).toEqual(["María", "Lucía", "Sofía"]);
    });
});
//# sourceMappingURL=buscarNombres.test.js.map