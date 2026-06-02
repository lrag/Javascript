const express = require("express")
const mongoDBUtil = require("./mongoDBUtil")
const middleware = require("./middleware")
const servicioPeliculas = require("./servicioPeliculas")

console.log("Arrancando la aplicación...")
console.log("conectando a la BB.DD....")
mongoDBUtil.conectar()
    .then(function(){
        console.log("Conexión establecida.")
        arrancarServidor()
    })
    .catch(function(err){
        console.log("Fallo al arrancar.")
        console.log(err)
    })

function arrancarServidor(){
    console.log("Arrancando el servidor http...")
    
    const app = express()

    //
    //Cadena de interceptores
    //
    //El CORS
    app.use(middleware.interceptorCORS)
    //
    //JSON Body parser. Debemos añadirlo antes que las urls del api
    app.use(express.json({
        limit: '5mb' //Tamaño máximo del body que estamos dispuestos a leer. IMPRESCINDIBLE
    }))

    //
    // API del servicio
    //
    //El orden de este tipo de llamadas no importa
    app.get('/peliculas', servicioPeliculas.listarPeliculas)
    app.get('/peliculas/:id', servicioPeliculas.buscarPelicula)
    app.post('/peliculas', servicioPeliculas.insertarPelicula)
    app.put('/peliculas/:id', servicioPeliculas.modificarPelicula)
    app.delete('/peliculas/:id', servicioPeliculas.borrarPelicula)

    //
    // Miscelánea
    //
    app.use(express.static("../cliente"))
    app.get("/", home)
    app.disable('x-powered-by')

    //
    // Arrancamos el servidor HTTP
    //
    app.listen(5000, function(){
            console.log("Esperando peticiones en el puerto 5000.")
        })
}

function home(request, response){    
    //__dirname nos da la ruta absoluta hasta el directorio en el que está este código
    //Lo que buscamos está en el directorio anterior
    let trozos = __dirname.split("\\")
    let ruta = ""
    for(let a=0; a<trozos.length-1; a++){
        ruta += trozos[a]+"/"
    }
    //sendFile solo admite rutas absolutas
    response.sendFile(ruta+"/cliente/listadoPeliculas.html")
}