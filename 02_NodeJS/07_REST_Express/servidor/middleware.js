
exports.interceptorCORS = function (request, response, next){
    console.log("-------------------------------------------------")
    console.log(`Añadiendo las cabeceras Allow-content`)
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")  
    next()
}

exports.interceptorLog = function (request, response, next){
    console.log("-------------------------------------------------")
    console.log(`Peticion recibida: ${request.method} ${request.url}`)
    next()
}