/*
METODO    URL             ACCION    BODY_P     RESPUESTA
-----------------------------------------------------------
POST      /peliculas      insertar  {pelicula}
PUT       /peliculas/{id} modificar {pelicula} 
DELETE    /peliculas/{id} borrar    - 
GET       /peliculas/{id} buscar    -          {pelicula}
GET       /peliculas      listar    -          [{pelicula}]

METODO    URL           ACCION    BODY_P     RESPUESTA
-----------------------------------------------------------
POST      /actores      insertar  {actor}
PUT       /actores/{id} modificar {actor} 
DELETE    /actores/{id} borrar    - 
GET       /actores/{id} buscar    -          {actor}
GET       /actores      listar    -          [{actor}]


listar los actores de una pelicula
GET /peliculas/{id}/actores

listar las peliculas de un actor
GET /actores/{id}/peliculas

asignar un actor a una película
POST /peliculas/{id}/actores

dame las películas de 1984
GET /peliculas?year=1984

(otra forma) listar los actores de una película
GET /actores?idPelicula={id}
*/

////////////////////////////////////////
// FUNCIONES CON LA LÓGICA DE CONTROL //
////////////////////////////////////////

/*
Las tareas de la lógica de control en un servicio son las siguientes:

- Extraer de la petición los valores necesarios
    -query parameters
    -parámetros interpolados en la ruta
    -contenido del body
    -valores en los headers
    -cualquier combinación de los anteriores

- Adaptar esos valores a las necesidades de la lógica de negocio

- Invocar la función con la lógica de negocio
    -Solo una!!!

- Componer y entregar la respuesta con el resultado de la ejecución
  de la lógica de negocio

Tareas que NO debe ejecutar la lógica de control:

- Lógica de negocio
- Consultas a la BB.DD.

-Y YA!
*/

const negocioPeliculas = require("./negocioPeliculas")

//GET /peliculas
//
//200 OK
//Content-Type: application/json
//------------------------------
//[{pelicula}]
exports.listarPeliculas = function(request, response){

    response.setHeader("Content-Type", "application/json")

    //Aqui buscaríamos el criterio de filtrado en los query parameters
    negocioPeliculas.listarPeliculas()
        .then(function(peliculas){
            response.end(JSON.stringify(peliculas))
        })
        .catch(function(err){
            console.log(err)
            response.statusCode = 500
            response.end(JSON.stringify(json))
        })
}

//GET /peliculas/:id
//
//200 OK
//CT: app/json
//------------
//{pelicula}
//
//404 NOT FOUND
exports.buscarPelicula = function(request, response){

    //http://localhost:3000 /peliculas/87 ?param=valor
    //                     |             |
    //Para abrir el socket |Ruta         |Query parameters

    let idPelicula = request.url.split('/').pop()
    response.setHeader("Content-Type", "application/json")

    negocioPeliculas.buscarPelicula(idPelicula)
        .then(function(peliculaEncontrada){
            response.end(JSON.stringify(peliculaEncontrada))
        })
        .catch(function(err){
            console.log(err)
            response.statusCode = err.codigo
            response.end(JSON.stringify(err))
        })        

}

//POST /peliculas 
//Content-Type: application/json
//------------------------------
//{pelicula}
exports.insertarPelicula = function(request, response){

    response.setHeader("Content-Type", "application/json")

    request.on('data', function(data){
        let pelicula = JSON.parse(data)
        negocioPeliculas.insertarPelicula(pelicula)
            .then(function(peliculaInsertada){
                response.statusCode = 201
                response.end(JSON.stringify(peliculaInsertada))
            })
            .catch(function(err){
                console.log(err)
                response.statusCode = err.codigo
                response.end(JSON.stringify(err))
            })
    })

}

exports.modificarPelicula = function(request, response){



}

exports.peliculaPelicula = function(request, response){
}

/*
Tambien hay gente que lo hace así

exports.ServicioPeliculas = ServicioPeliculas

class ServicioPeliculas {

    listarPeliculas(request, response){        
    } 

    buscarPelicula(request, response){
    } 

    insertarPelicula(request, response){
    } 

    modificarPelicula(request, response){
    }

    borrarPelicula(request, response){
    }  

}
*/
