# ProyectoTopicosLibreria

## Proposito

El propósito de esta librería es sacar buena nota en el proyecto de tópicos especiales de programación.

## Funcionalidades del paquete

El paquete se centra en el manejo de colecciones genéricos, para cumplir con esto, se proporciona una clase
Coleccion que permite la creación de colecciones, agregar y eliminar elementos, consultar elementos y obtener
elementos aleatorios.

También se añadieron funciones de apoyo para ayudar con el manejo de arreglos de arreglos de strings

### Como implementarla

Para implementar la última versión estable de la librería, se puede usar 

`npm i https://github.com/SantiagoChirinos/ProyectoTopicosLibreria.git#main`

## Ejemplos de uso

Para empezar a usar la librería, se puede crear una colección genérica. Por ejemplo, si se quiere hacer una colección de números, se hace lo siguiente: 

`let myColeccion:Coleccion<number>=new Coleccion([])`.

Esto va a generar una coleccion de tipo number sin ningún elemento adentro.

Otra forma en la que podemos inicializar una colección es, por ejemplo filtrando algunos strings con las funciones proporcionadas por la librería, por ejemplo:

`let nombres:string[]=["Juan", "María", "Pedro", "Horace"];`

`let myColeccion2:Coleccion<string>=new Coleccion(buscarNombres(nombres,"a"));`

Esto creará una colección con todos los nombres que contengan la letra "a" en el array nombres.

Tambien se puede usar:

`let myColeccion3:Coleccion<string>=new Coleccion(buscarYFiltrarNombres(nombres,"a","c"));`

Lo cual creará una colección con todos los elementos del array que contengan la letra "a" y que no contengan la letra "c".

Una vez se crean las colecciones se pueden añadir elementos usando las funciones proporcionadas por la clase, por ejemplo

`myColeccion.agregarComponente(1);`

Y se pueden remover elementos de la siguiente forma

`myColeccion2.quitarComponente(2)`

Siendo 2 la posición del elemento a eliminar, por lo cual, los elementos de myColeccion2 quedarían siendo 

`["Juan", "María", "Horace"]`

Se puede obtener un elemento aleatorio de una colección usando el siguiente método:

`let aleatorio= myColeccion2.conseguirElementoAleatorio()`

`aleatorio.next().value`

Finalmente, podemos recorrer nuesta colección usando el siguiente método:

`let siguiente= myColeccion2.conseguirSiguienteElemento()`

`siguiente.next().value`