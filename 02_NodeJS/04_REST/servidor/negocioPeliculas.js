const mongoDBUtil = require("./mongoDBUtil")

exports.listarPeliculas = function(){
    return new Promise(function(resolve, reject) {
        let esquemaPeliculas = mongoDBUtil.getEsquema()
        let coleccionPeliculas = esquemaPeliculas.collection("peliculas")
        let cursor = coleccionPeliculas.find()
        cursor.toArray()
            //.then(function(peliculas){
            //    resolve(peliculas)
            //})
            .then(resolve)
            .catch(function(err){
                console.log(err)
                reject({
                    codigo: 500,
                    mensaje: "Error al listar las peliculas"
                })
            })
        })
}

const ObjectId = require("mongodb").ObjectId


exports.buscarPelicula = function(idPelicula){
    return new Promise(function(resolve, reject) {
        let coleccionPeliculas = mongoDBUtil.getEsquema().collection("peliculas")    
        let objectId = ObjectId.createFromHexString(idPelicula)
        //coleccionPeliculas.find({ _id : idPelicula }) //(síncrono) Tendríamos un cursor con una posicion (si el id existe)
        coleccionPeliculas.findOne({ _id : objectId }) //(asíncrono) Devuelve un único objeto (si existe el id)
            .then(function(peliculaEncontrada){
                if(peliculaEncontrada){
                    resolve(peliculaEncontrada)
                } else {
                    reject({
                        codigo  : 404,
                        mensaje : "No hay una película con el id "+idPelicula
                    })                    
                }                
            })
            .catch(function(err){
                console.log(err)
                reject({
                    codigo  : 500,
                    mensaje : "Fallo al buscar la película"
                })
            })
    })
}

exports.insertarPelicula = function(pelicula){
    return new Promise(function(resolve, reject) {

        //Cosas que faltan:
        //- Comprobar que el objeto tenga las propiedades que debe tener una película y 
        //  ninguna más
        //- Validar que los datos de la película sean correctos
        if(!pelicula.titulo || pelicula.titulo.trim()==''){
            reject({
                codigo: 400,
                mensaje: "Datos incorrectos en la película."
            })
            return
        }

        //Nos aseguramos de que la película no tenga _id porque queremos que sea
        //mongodb el que asigne el valor
        delete pelicula._id

        let coleccionPeliculas = mongoDBUtil.getEsquema().collection("peliculas")
        coleccionPeliculas.insertOne(pelicula)
            .then(function(resultado){
                pelicula._id = resultado.insertedId.toString()
                resolve(pelicula)
            })
            .catch(function(err){
                console.log(err)
                reject({
                    codigo: 500,
                    mensaje: "Error al insertar la película."
                })                
            })
        })
}