import {Coleccion} from '../src/libreria'

describe("Coleccion prueba",()=>{
    let colecPrueba:Coleccion<string> =new Coleccion(["Hola"])
    beforeEach(()=>{
        colecPrueba=new Coleccion(["Hola"]);
    });

    afterEach(()=>{
        jest.restoreAllMocks();
    })

    it("1- Crear coleccion de String",()=>{
        let colec:Coleccion<string>=new Coleccion(["Hola"]);
        expect(colec).toStrictEqual(new Coleccion(["Hola"]));
    });

    it("2- añadir un nuevo elemento a una coleccion",()=>{
        colecPrueba.agregarComponente("Hola2");
        expect(colecPrueba).toStrictEqual(new Coleccion(["Hola", "Hola2"]));
    });

    it("3- conseguir los el primer elemento de la coleccion con su función",()=>{
        expect(colecPrueba.conseguirSiguienteElemento().next().value).toBe("Hola");
    });

    it("4- conseguir los el primer elemento tras recorrer toda la coleccion teniendo mas de un componente",()=>{
        colecPrueba.agregarComponente("Hola2");
        colecPrueba.conseguirSiguienteElemento();
        colecPrueba.conseguirSiguienteElemento();
        expect(colecPrueba.conseguirSiguienteElemento().next().value).toBe("Hola");
    });

    it("5- conseguir un elemento aleatorio", ()=>{
        jest.spyOn(Math, "random").mockReturnValue(0.1);
        colecPrueba.agregarComponente("Hola2");
        colecPrueba.agregarComponente("Hola3");
        colecPrueba.agregarComponente("Hola4");
        colecPrueba.agregarComponente("Hola5");
        colecPrueba.agregarComponente("Hola6");
        colecPrueba.agregarComponente("Hola7");
        colecPrueba.agregarComponente("Hola8");
        let resultado=colecPrueba.conseguirElementoAleatorio().next().value;
        expect(resultado).toBe("Hola");
    });

    it("6- eliminar elemento", ()=>{
        colecPrueba.agregarComponente("Hola2");
        colecPrueba.agregarComponente("Hola3");
        colecPrueba.agregarComponente("Hola4");
        colecPrueba.agregarComponente("Hola5");
        colecPrueba.agregarComponente("Hola6");
        colecPrueba.agregarComponente("Hola7");
        colecPrueba.agregarComponente("Hola8");
        colecPrueba.quitarComponente(4);
        expect(colecPrueba).toStrictEqual(new Coleccion(["Hola", "Hola2", "Hola3", "Hola4", "Hola6", "Hola7", "Hola8"]))
    });

    it("7- intentar quitar un componente que no existe", ()=>{
        colecPrueba.quitarComponente(3);
        expect(colecPrueba).toStrictEqual(new Coleccion(["Hola"]));
    })
});