const fs = require("fs/promises")

exports.servirContenidoEstatico = function(request, response){
    let url = request.url.split('?')[0]
    let ruta = '../cliente'+url
    console.log(ruta)

    fs.readFile(ruta)
        .then(function(contenido){
            response.setHeader('Content-Type', getContentType(ruta))
            response.end(contenido)
        })
        .catch(function(err){
            console.log(err)
            responderConError(404, "Recurso no encontrado.",response)
        })
}

function responderConError(statusCode, mensaje, response){
    response.statusCode = statusCode
    response.setHeader('Content-Type', 'text/html')
    response.end(`
        <html>
            <body>
                <h2 align="center"><font color="red">${statusCode} </font> ${mensaje}</h2>
            </body>
        </html>`
        )
}

function getContentType(ruta){
    let extension = ruta.split(".").pop()
    switch(extension){
        case "html": return "text/html"
        case "css" : return "text/css"
        case "js"  : return "application/javascript"
        default : return "SPM"
    }
}


/*
let coche = {
    marca: "FIAT",
    modelo: "Uno 45s",
    color: "Rojo",
    toString: function(){
        return `Hola, soy el ${this.marca} ${this.modelo}`
    }
}

console.log(coche)
*/


