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
exports.listarPeliculas = async function(request, response){
    try {
        //Aqui buscaríamos el criterio de filtrado en los query parameters
        let peliculas = await negocioPeliculas.listarPeliculas()
        response.json(peliculas)
    } catch (err){
        console.log(err)
        response.statusCode = err.codigo
        response.json(err)
    }
}

//GET /peliculas/:id
//
//200 OK
//CT: app/json
//------------
//{pelicula}
//
//404 NOT FOUND
exports.buscarPelicula = async function(request, response){
    try {
        let idPelicula = request.params.id
        let peliculaEncontrada = await negocioPeliculas.buscarPelicula(idPelicula)
        response.json(peliculaEncontrada)
    } catch (err) {
        console.log(err)
        response.statusCode = err.codigo
        response.json(err)
    }
}

//POST /peliculas 
//Content-Type: application/json
//------------------------------
//{pelicula}
exports.insertarPelicula = async function(request, response){
    try {
        let pelicula = request.body
        let peliculaInsertada = await negocioPeliculas.insertarPelicula(pelicula)
        response.statusCode = 201
        response.json(peliculaInsertada)
    } catch(err) {
        console.log(err)
        response.statusCode = err.codigo
        response.json(err)
    }
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
exports.modificarPelicula = async function(request, response){
    try {
        let idPelicula = request.params.id
        let pelicula = request.body
        pelicula._id = idPelicula
        await negocioPeliculas.modificarPelicula(pelicula)
        response.json({ mensaje: 'La película se ha modificado' })
    } catch(err) {
        console.log(err)
        response.statusCode = err.codigo
        response.json(err)
    }
}

//DELETE /peliculas/:id
//
//200 OK
//CT: app/json
//------------
//{pelicula eliminada}
//
//404 NOT FOUND
exports.borrarPelicula = async function(request, response){
    try {
        let idPelicula = request.params.id
        await negocioPeliculas.borrarPelicula(idPelicula)
        response.json({ mensaje: 'La película se ha borrado' })
    } catch(err){
        console.log(err)
        response.statusCode = err.codigo
        response.json(err)
    }
}
