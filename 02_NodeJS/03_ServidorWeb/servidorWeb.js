const http = require("http")
const fs   = require("fs/promises")

http.createServer(function(request, response){
    
    console.log("=PETICION RECIBIDA===========================")
    let ruta   = request.url
    let metodo = request.method
    console.log(metodo+" "+ruta)

    if(metodo != "GET"){
        response.statusCode = 405
        response.end("Método no soportado")
        return 
    }

    //leerRecurso(request.url, response)

    /*
    leerRecurso(
            request.url, 
            function(recurso){
                response.end(recurso)
            },
            function(err){
                response.statusCode = 404
                response.end("404. Recurso no encontrado.")
            }
        )
    */

    leerFichero(ruta)
        .then(function(recurso){
            response.appendHeader('content-type', getContentType(ruta))
            response.end(recurso)
        })
        .catch(function(err){
            response.statusCode = 404
            response.end("404. Recurso no encontrado.")
        })

}).listen(2000)

//Con promesas
function leerFichero(ruta){
    return new Promise(function(resolve, reject){
        fs.readFile("./recursos"+ruta)
            .then(function(buffer){
                resolve(buffer.toString())
            })
            .catch(function(err){
                console.log(err)
                reject(err)
            })
    })
}

//Con callbacks
//Esta función respeta el pricipio de responsabilidad única pero al funcionar con callbacks
//desemboca en un callback hell
/*
function leerRecurso(ruta, callbackExito, callbackError){
    fs.readFile('./recursos'+ruta)
        .then(function(recurso){
            callbackExito(recurso.toString())
        })
        .catch(function(err){
            console.log(err)
            //if(callbackError!=null){
            if(callbackError){
                callbackError(err)
            }
        })
}
*/

/*
//Esta funcion está mal porque no respeta el principio de responsabilidad única:
//-lee el fichero
//-lo coloca en el body de la respuesta
function leerRecurso(ruta, response){
    fs.readFile('./recursos'+ruta)
        .then(function(recurso){
            response.end(recurso.toString())
        })
        .catch(function(err){
            console.log(err)
            response.statusCode = 404
            response.end("404 Recurso no encontrado")
        })
}
*/

/*
Mime types:

html: text/html
css : text/css
JS  : application/javascript
*/
function getContentType(ruta){
    let extension = ruta.split(".").pop()
    switch(extension){
        case "html": return "text/html"
        case "css" : return "text/css"
        case "js"  : return "application/javascript"
        default : return "SPM"
    }
}

console.log("Esperando peticiones en el puerto 2000")
