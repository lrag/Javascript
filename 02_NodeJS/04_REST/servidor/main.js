const http = require("http")
const mongoDBUtil = require("./mongoDBUtil")
const servicioPeliculas = require("./servicioPeliculas")
const contenidoEstatico = require("./contenidoEstatico")

//Si exportaramos una clase sería así:
//const servicioPeliculas = new servicioPeliculas.ServicioPeliculas()

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
    http.createServer(procesarPeticion)
        .listen(3000, function(){
                console.log("Esperando peticiones en el puerto 3000.")
            })
}

function procesarPeticion(request, response){
    console.log("-------------------------------")
    let metodo = request.method
    let url    = request.url

    //Cross Origin Resource Sharing
    //Vamos a añadir estos headers a todas las respuestas que demos, sean options o no:
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")  

    console.log("Petición recibida: "+metodo+" "+url)

    //Peticiones dirigidas al servicio
    if(metodo == "GET" && url=="/peliculas"){
        servicioPeliculas.listarPeliculas(request, response)
    } else if(metodo=="POST" && url == "/peliculas"){
        servicioPeliculas.insertarPelicula(request, response)
    } else if(metodo == "GET" && url.match("^/peliculas/[0-9a-fA-F]{24}$")){
        servicioPeliculas.buscarPelicula(request, response)
    } else if(metodo == "GET"){
        //Buscamos contenido estático a ver si ha sido eso lo que nos piden
        contenidoEstatico.servirContenidoEstatico(request, response)
    } else {
        response.statusCode = 404
        response.end("Operación no soportada")
    }
}

