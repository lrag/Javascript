const fs = require("fs/promises")

/*
function juntarFicheros(){
    return new Promise(function(resolve, reject){
        let contenido1 = null 
        let contenido2 = null
        let contenido4 = null
        fs.readFile("./texto1.txt")
            .then(function(contenido){
                contenido1 = contenido.toString()
                return fs.readFile("./texto2.txt")
            })
            .then(function(contenido){
                contenido2 = contenido.toString()
                return fs.readFile("./texto3.txt")
            })
            .then(function(contenido){
                contenido4 = contenido1 + "\n" + contenido2 + "\n" + contenido.toString()
                return fs.writeFile("./texto4.txt", contenido4)
            })
            .then(function(x){
                resolve(contenido4)
            })
            .catch(function(err){
                console.log(err)
                reject(err)
            })
    })
}
*/
    
///////////////////////////
// AHORA CON ASYNC-AWAIT //
///////////////////////////

async function juntarFicheros(){
    try {
        let contenido1 = await fs.readFile("./texto1.txt")
        let contenido2 = await fs.readFile("./texto2.txt")
        let contenido3 = await fs.readFile("./texto3.txt")
        let contenido4 = contenido1+contenido2+contenido3
        await fs.writeFile("texto4.txt", contenido4)
    } catch(err){
        throw { 
            codigo  : 500, 
            mensaje : "Error al juntar los ficheros", 
            error   : err.message
        }
    }
}

//Si invocamos una función asíncrona fuera de una función asíncrona estamos obligados
//a trabajar con la promesa que se devuelve
juntarFicheros()
    .then(function(){
        console.log("FIN")
    })
    .catch(function(err){
        console.log(err)
        console.log("FIN con error")
    })




