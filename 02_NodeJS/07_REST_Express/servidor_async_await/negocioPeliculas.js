const mongoDBUtil = require("./mongoDBUtil")
const ObjectId = require("mongodb").ObjectId

exports.listarPeliculas = async function(){
    try{
        let coleccionPeliculas = mongoDBUtil.getEsquema().collection("peliculas")
        return await coleccionPeliculas.find().toArray()
    } catch (err) {
        console.log(err)
        throw { codigo  : 500, mensaje : "Fallo con la base de datos al listar las películas" }
    }
}

exports.buscarPelicula = async function(idPelicula){

    try {
        let coleccionPeliculas = mongoDBUtil.getEsquema().collection("peliculas")    
        let objectId = ObjectId.createFromHexString(idPelicula)
        let peliculaEncontrada = await coleccionPeliculas.findOne({ _id : objectId })
        if(peliculaEncontrada){
            return peliculaEncontrada
        } 
        throw { codigo  : 404, mensaje : "No hay una película con el id "+idPelicula }
    } catch (err) {
        console.log(err)
        if(err.codigo){
            throw err
        }
        throw { codigo  : 500, mensaje : "Fallo al buscar la película" }
    }

    /*
    let coleccionPeliculas = mongoDBUtil.getEsquema().collection("peliculas")    
    let objectId = ObjectId.createFromHexString(idPelicula)
    
    let peliculaEncontrada
    try {
        peliculaEncontrada = await coleccionPeliculas.findOne({ _id : objectId })
    } catch (err) {
        console.log(err)
        throw { codigo  : 500, mensaje : "Fallo al buscar la película" }
    }

    if(peliculaEncontrada){
        return peliculaEncontrada
    } 
    throw { codigo  : 404, mensaje : "No hay una película con el id "+idPelicula }
    */

    /*
    ¡ESTO ESTÁ MAL!
    try {
        let coleccionPeliculas = mongoDBUtil.getEsquema().collection("peliculas")    
        let objectId = ObjectId.createFromHexString(idPelicula)
        let peliculaEncontrada = await coleccionPeliculas.findOne({ _id : objectId })
        if(peliculaEncontrada){
            return peliculaEncontrada
        } 
        //Este throw será capturado en el tray de esta misma función :(
        throw { codigo  : 404, mensaje : "No hay una película con el id "+idPelicula }
    } catch (err) {
        console.log(err)
        throw { codigo  : 500, mensaje : "Fallo al buscar la película" }
    }
    */
}

exports.insertarPelicula = async function(pelicula){
    try {
        //Cosas que faltan:
        //- Comprobar que el objeto tenga las propiedades que debe tener una película y 
        //  ninguna más
        //- Validar que los datos de la película sean correctos
        if(!pelicula.titulo || pelicula.titulo.trim()==''){
           throw { codigo: 400, mensaje: "Datos incorrectos en la película." }
        }

        //Nos aseguramos de que la película no tenga _id porque queremos que sea
        //mongodb el que asigne el valor
        delete pelicula._id

        let coleccionPeliculas = mongoDBUtil.getEsquema().collection("peliculas")
        let resultado = await coleccionPeliculas.insertOne(pelicula)
        pelicula._id = resultado.insertedId.toString()
        return pelicula
    } catch (err) {
        console.log(err)
        throw { codigo: 500, mensaje: "Error al insertar la película." }                
    }
}

exports.modificarPelicula = async function(pelicula){
    try {
        let coleccionPeliculas = mongoDBUtil.getEsquema().collection("peliculas")
        let peliculaModificada = await coleccionPeliculas.findOneAndUpdate( 
                { _id : ObjectId.createFromHexString(pelicula._id) },
                {
                    $set : {
                        //Aqui no podemos colocar el _id (es inmutable)
                        titulo       : pelicula.titulo,
                        director     : pelicula.director,
                        genero       : pelicula.genero,
                        year         : pelicula.year,
                        comentario   : pelicula.comentario
                    },
                    //Con $unset indicamos que propiedades queremos ELIMINAR
                    //$unset : {
                    //    genero : true
                    //}
                },
                {
                    //returnOriginal : false,
                    //Con la opcion upsert a true si el criterio de búsqueda no ha dado
                    //resultado se insertará un nuevo documento con los valores disponibles
                    //Es decir, convertimos la consulta en un 'modificar o insertar'
                    //upsert : true            
                }
            )
        if(peliculaModificada){
            return peliculaModificada
        } else {
            throw { codigo: 404, mensaje: "La película a modificar no existe" }                     
        }
    } catch(err){
        console.log(err)
        throw { codigo: 500, mensaje: "Error al modificar la película." }
    }
}

exports.borrarPelicula = async function(idPelicula){
    try {
        let coleccionPeliculas = mongoDBUtil.getEsquema().collection("peliculas")
        let resultado = await coleccionPeliculas.deleteOne({ _id: ObjectId.createFromHexString(idPelicula) })
        if(resultado.deletedCount == 0){
            throw { codigo: 404, mensaje: "La película a borrar no existe" }
        }
    } catch (err){
        console.log(err)
        throw { codigo: 500, mensaje: "Error al borrar la película." }  
    }
}
