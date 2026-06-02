//Este modulo viene por defecto con Node.JS
const fs = require("fs")


//////////////////////////////////
// LECTURA SÍNCRONA DE FICHEROS //
//////////////////////////////////

//Las rutas relativas en node son desde el directorio en el que se encuentra
//el fichero JS que se está ejecutando
//

//JAMAS usaremos rutas absolutas
//let buffer = fs.readFileSync("C:/MEAN/02-NODE.JS/02_Ficheros/texto1.txt")
//let texto = buffer.toString()
//console.log(texto)

//Las rutas relativas en node parten desde el directorio en el que se encuentra
//el fichero JS que se está ejecutando
//

/*
let texto1 = fs.readFileSync("./texto1.txt").toString()
let texto2 = fs.readFileSync("./texto2.txt").toString()
let texto3 = fs.readFileSync("./texto3.txt").toString()

let texto4 = texto1+'\n'+texto2+'\n'+texto3
*/

////////////////////////////////////
// ESCRITURA SÍNCRONA DE FICHEROS //
////////////////////////////////////

//fs.writeFileSync(ruta_al_fichero, contenido)
//fs.writeFileSync("./texto4.txt", texto4)

///////////////////////////////////
// LECTURA ASÍNCRONA DE FICHEROS //
///////////////////////////////////

//fs.readFile(ruta_al_fichero, callback)
//let contenido = fs.readFile("./texto1.txt", function(error, contenido){
//    console.log(contenido.toString())
//})

//Una función asíncrona jamás devolverá el fruto de su trabajo
//console.log(contenido) //undefined
/*
let contenidoFichero1 = null
let contenidoFichero2 = null
let contenidoFichero3 = null

//Si lo hacemos así se leen los tres ficheros en paralelo, no nos garantiza el orden
//y encima no podemos acceder al valor del contenido con las variables declaradas arriba

fs.readFile("./texto1.txt", function(error, contenido){
    console.log(contenido.toString())
    contenidoFichero1 = contenido.toString()   
})

fs.readFile("./texto2.txt", function(error, contenido){
    console.log(contenido.toString())
    contenidoFichero2 = contenido.toString()    
})

fs.readFile("./texto3.txt", function(error, contenido){
    console.log(contenido.toString())
    contenidoFichero3 = contenido.toString()    
})

fs.writeFile("./texto4.txt", "HOLA"+contenidoFichero1+contenidoFichero2+contenidoFichero3, function(error){
    //...
})
*/


//No podemos hacer una espera activa
//De este bucle no se saldrá JAMÁS
//while(contenidoFichero1 == null){
    //nada, esperar
//}
//console.log(contenidoFichero1) 

//Callback hell


fs.readFile("./texto1.txt", function(error, contenido){
    let contenido1 = contenido
    console.log(contenido1.toString())
    fs.readFile("./texto2.txt", function(error, contenido){
        let contenido2 = contenido
        console.log(contenido2.toString())
        fs.readFile("./texto3.txt", function(error, contenido){
            let contenido3 = contenido
            console.log(contenido3)           
            let contenido4 = contenido1 + "\n" + contenido2 + "\n" + contenido3
            fs.writeFile("./texto4.txt", contenido4, function(error){
                console.log("FIN real")
            })
        })
    })
})

/*
fs.readFile("./texto1.txt", function(error, contenido){
        let contenido1 = contenido.toString()
        fs.readFile("./texto2.txt", function(error, contenido){
            let contenido2 = contenido.toString()
            fs.readFile("./texto3.txt", function(error, contenido){
                let contenido3 = contenido.toString()
                let contenido4 = contenido1 + "\n" + contenido2 + "\n" + contenido3
                fs.writeFile("./texto4.txt", contenido4, function(error){
                    console.log("FIN de verdad")                    
                }) //Escribir el cuarto fichero
            }) //Leer el tercer fichero
        }) //Leer el segundo fichero
    }) //Leer el primer fichero
*/

console.log("FIN")    