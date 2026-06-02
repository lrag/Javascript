//npm install mongodb
const mongodb = require("mongodb")

let esquemaPeliculas

//Si alguien llama a esta funcion sin haber llamado antes a conectar que se aguante
exports.getEsquema = function(){
    return esquemaPeliculas
}

exports.conectar = function(){
    return new Promise(function(resolve, reject){
        //Esta cadena de conexión debería de estar en un fichero de configuración
        const url = "mongodb://localhost:27017"
        let client = new mongodb.MongoClient(url)

        client.connect()
            .then(function(dbs){
                //AQUI SIGUE
                esquemaPeliculas = dbs.db("esquema_peliculas")
                resolve()
            })
            .catch(function(err){
                console.log(err)
                reject({
                    codigo  : "500",
                    mensaje : "Fallo al conectar a la base de datos"
                })
            })        
    })
}



