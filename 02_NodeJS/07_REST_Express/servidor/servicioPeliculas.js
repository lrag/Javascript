/*
METODO    URL             ACCION    BODY_P     RESPUESTA
-----------------------------------------------------------
POST      /peliculas      insertar  {pelicula}
PUT       /peliculas/{id} modificar {pelicula} 
DELETE    /peliculas/{id} borrar    - 
GET       /peliculas/{id} buscar    -          {pelicula}
GET       /peliculas      listar    -          [{pelicula}]
*/

////////////////////////////////////////
// FUNCIONES CON LA LÓGICA DE CONTROL //
////////////////////////////////////////

const negocioPeliculas = require("./negocioPeliculas")

//GET /peliculas
//
//200 OK
//Content-Type: application/json
//------------------------------
//[{pelicula}]
exports.listarPeliculas = function(request, response){
    //Aqui buscaríamos el criterio de filtrado en los query parameters
    negocioPeliculas.listarPeliculas()
        .then(function(peliculas){
            response.json(peliculas)
        })
        .catch(function(err){
            console.log(err)
            response.statusCode = 500
            response.json(json)
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
    let idPelicula = request.params.id
    negocioPeliculas.buscarPelicula(idPelicula)
        .then(function(peliculaEncontrada){
            response.json(peliculaEncontrada)
        })
        .catch(function(err){
            console.log(err)
            response.statusCode = err.codigo
            response.json(err)
        })        

}

//POST /peliculas 
//Content-Type: application/json
//------------------------------
//{pelicula}
exports.insertarPelicula = function(request, response){
    let pelicula = request.body
    negocioPeliculas.insertarPelicula(pelicula)
        .then(function(peliculaInsertada){
            response.statusCode = 201
            response.json(peliculaInsertada)
        })
        .catch(function(err){
            console.log(err)
            response.statusCode = err.codigo
            response.json(err)
        })
}

//PUT /peliculas/:id
//CT: app/json
//------------------
//{
//  _id        :
//  titulo     :
//  director   :
//  genero     :
//  year       :
//  comentario :    
//}
exports.modificarPelicula = function(request, response){
    let idPelicula = request.params.id
    let pelicula = request.body
    pelicula._id = idPelicula

    negocioPeliculas.modificarPelicula(pelicula)
        .then(function(peliculaModificada){
            response.json({ mensaje: 'La película se ha modificado' })
        })
        .catch(function(err){
            console.log(err)
            response.statusCode = err.codigo
            response.json(err)
        })  
}

//DELETE /peliculas/:id
//
//200 OK
//CT: app/json
//------------
//{pelicula eliminada}
//
//404 NOT FOUND
exports.borrarPelicula = function(request, response){
    let idPelicula = request.params.id
    negocioPeliculas.borrarPelicula(idPelicula)
        .then(function(){
            response.json({ mensaje: 'La película se ha borrado' })
        })
        .catch(function(err){
            console.log(err)
            response.statusCode = err.codigo
            response.json(err)
        })
}
