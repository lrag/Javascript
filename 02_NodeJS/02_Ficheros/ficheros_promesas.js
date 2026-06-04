//Esta viene de serie con Node.Js
const { readFile } = require("fs")
const fs = require("fs/promises")


//'fs/promises' no tiene funciones síncronas


//Una función asíncrona puede estar programada para que devuelva una promesa
/*
let promesa = fs.readFile("./texto1.txt")
//Las promesas reciben dos callbacks
//Con then reciben el callback que se ejecutará cuando 'todo haya ido bien'
promesa.then(function(contenido){
    console.log("Contenido 1:",contenido.toString())
})
//Con then reciben el callback que se ejecutará cuando 'algo haya salido mal'
promesa.catch(function(err){
    console.log( {err} )
})
*/

//Lo normal es que concatenemos la llamada a then y catch con la llamada a la función que devuelve la promesa
/*
fs.readFile("./texto1.txt")
    .then(function(contenido){
        console.log("Contenido 1:",contenido.toString())
    })
    .catch(function(err){
        console.log( err )
    })
*/


//
//Concatenando tareas asíncronas con promesas
//

//Si las utilizamos mal tenemos un caso especial de callback hell que es mortal de necesidad:
/*
fs.readFile("./recursos/fichero1.txt")
    .then(function(contenido){
        let contenido1 = contenido.toString()
        console.log({contenido1})
        fs.readFile("./recursos/fichero2.txt")
            .then(function(contenido){
                let contenido2 = contenido.toString()
                console.log({contenido2})
                fs.readFile("./recursos/fichero3.txt")
                    .then(function(contenido){
                        let contenido3 = contenido.toString()
                        console.log({contenido3})
                        let contenido4 = contenido1+contenido2+contenido3
                        fs.writeFile("./recursos/fichero4.txt", contenido4)
                            .then(function(){
                                console.log("FIN")
                            })
                            .catch(function(err){
                                console.log( {err} )
                            })                            
                    })
                    .catch(function(err){
                        console.log( {err} )
                    })                    
            })
            .catch(function(err){
                console.log( {err} )
            })            
    })
    .catch(function(err){
        console.log( {err} )
    })
*/

let contenido1 = null 
let contenido2 = null

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
        let contenido4 = contenido1 + "\n" + contenido2 + "\n" + contenido.toString()
        return fs.writeFile("./texto4.txt", contenido4)
    })
    .then(function(x){
        console.log("FIN")
    })
    .catch(function(err){
        console.log(err)
        console.log("FIN con error")
    })

console.log("Fin en falso")    


/*
Promise.all([
        fs.readFile("./texto1.txt"),
        "ATIZA"
    ])
    .then( contenidos => {
        console.log(contenidos[0])
        console.log(contenidos[1])
    })
*/

//Lo mismo pero sin variables auxiliares

fs.readFile("./texto1.txt")
    .then( contenido => {
        contenido1 = contenido.toString()
        return Promise.all([ contenido1, fs.readFile("./texto2.txt")])
    })
    .then(contenidos => {
        contenido1 = contenidos[0]
        contenido2 = contenidos[1].toString()
        return Promise.all([ contenido1+'\n'+contenido2, fs.readFile("./texto3.txt") ])
    })
    .then( ([parcial, contenido3]) => {
        let x = parcial + "\n" + contenido3.toString()
        return fs.writeFile("./texto4Bis.txt", x)
    })
    .then(function(x){
        console.log("FIN")
    })
    .catch(function(err){
        console.log(err)
        console.log("FIN con error")
    })


//
//Podemos leer los ficheros en paralelo
//Promise.all recibe un array de promesas y devuelve una promesa que las engloba todas
//
Promise.all([
        fs.readFile("./texto1.txt"), 
        fs.readFile("./texto2.txt"), 
        fs.readFile("./texto3.txt") 
    ])
    .then( ([contenido1, contenido2, contenido3]) => {
        let contenidoFinal = contenido1.toString()+'\n'+contenido2.toString()+'\n'+contenido3.toString()
        return fs.writeFile("./texto4BisBis.txt", contenidoFinal)
    })
    .then(function(x){
        console.log("FIN")
    })    
    .catch(() => {})










