import {buscarYFiltrarNombres} from '../src/libreria'

describe("organizarNombres prueba",()=>{
    let arrayNombres=["Juan", "María", "Carlos", "Lucía", "Pedro", "Sofía"];
    it("1- buscar a una persona y que la devuelva sin filtrar",()=>{
        expect(buscarYFiltrarNombres(arrayNombres,"Juan", null)).toEqual(["Juan"]);
    });

    it("2- buscar a varias personas sin filtrar",()=>{
        expect(buscarYFiltrarNombres(arrayNombres,"a", null)).toEqual(["Juan", "María", "Carlos", "Lucía", "Sofía"]);
    });

    it("3- buscar pero no encontrar a nadie sin filtrar",()=>{
        expect(buscarYFiltrarNombres(arrayNombres,"333", null)).toEqual([]);
    });

    it("4- buscar con un caracter con acento sin filtrar", ()=>{
        expect(buscarYFiltrarNombres(arrayNombres,"í", null)).toEqual(["María", "Lucía", "Sofía"]);
    });

    it("5- buscar a una persona y que la devuelva filtrando una letra que no esté",()=>{
        expect(buscarYFiltrarNombres(arrayNombres,"Juan", "z")).toEqual(["Juan"]);
    });

    it("6- buscar a varias personas filtrando",()=>{
        expect(buscarYFiltrarNombres(arrayNombres,"a", "Ca")).toEqual(["Juan", "María", "Lucía", "Sofía"]);
    });

    it("7- buscar pero no encontrar a nadie sin el filtro, pero añadiendo el parámetro",()=>{
        expect(buscarYFiltrarNombres(arrayNombres,"333", "Juan")).toEqual([]);
    });

    it("8- buscar con un caracter con acento, filtrando", ()=>{
        expect(buscarYFiltrarNombres(arrayNombres,"í", "S")).toEqual(["María", "Lucía"]);
    });

    it("9- buscar y filtrar el mismo string",()=>{
        expect(buscarYFiltrarNombres(arrayNombres,"a", "a")).toEqual([]);
    });
});