
exports.interceptorCORS = function (request, response, next){
    //Los headers para el CORS hay que colocarlos en todas las respuestas, no solo tras una petición OPTIONS
    
    //Los navegadores no siempre hacen el preflight y en esas ocasiones esperan a la respuesta para 
    //aceptarla o no dependiendo de los headers recibidos
    //
    //Esas peticiones sin preflight son:
    //-Peticiones con los métodos:
    //	GET, HEAD y POST
    //-Que incluyan solo los headers:
    //	User-Agent, Accept, Accept-Language, Content-Language
    //  Content-Type
    //-Y además para content type solo con los valores
    //  application/x-www-form-urlencoded
    //  multipart/form-data
    //  text/plain  

    //Autorizamos a cualquier dominio a consumir nuestros recursos   
    //Colocar '*' solo en apis públicas 
    //respuesta.setHeader("Access-Control-Allow-Origin", "*");

    //Si admitimos peticiones de solo un origen lo añadimos con protocolo://IP:puerto
    //respuesta.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
    
    //Si admitimos peticiones de más de un origen debemos comprobar si el origen de la petición está
    //en la lista y responder en consecuencia, 
    //porque solo se puede colocar un origen en 'Access-Control-Allow-Origin'
    //Por ejemplo
    //llega una petición de www.origen-a.es
    //Si admitimos sus peticiones respondemos con 
    //respuesta.setHeader("Access-Control-Allow-Origin", "http://www.origen-a.es");
    //si despues llega una peticion de www.origen-b.es y también está en luestra lista
    //les responderemos de manera personalizada
    //respuesta.setHeader("Access-Control-Allow-Origin", "http://www.origen-b.es");

    console.log("-------------------------------------------------")
    console.log(`Añadiendo las cabeceras Allow-content`)
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")  

    //Si la petición ha sido OPTIONS ya damos aqui la respuesta
    //No tiene sentido que continúe hacia delante
    if(request.method == "OPTIONS"){
        response.end()
        return
    }

    next()
}

exports.interceptorLog = function (request, response, next){
    console.log("-------------------------------------------------")
    console.log(`Peticion recibida: ${request.method} ${request.url}`)
    next()
}

exports.interceptorXSS = function(request, response, next){
    console.log("-------------------------------------------------")

    response.setHeader("Content-Security-Policy", "default-src 'self'; style-src cdn.jsdelivr.net;")
        
    //Específicando el src para los js y las imágenes (se supondrían distintos de 'self')
    //response.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; img-src 'self';")
    
    //Específicando más de un origen para javascript
    //response.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self otro y_otro';");
    
    //Específicando connect-src
    //response.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self otro y_otro';");
    
    //Permitiendo js-inline (no puede prevenir el XSS)
    //response.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline';");

    next()
}

