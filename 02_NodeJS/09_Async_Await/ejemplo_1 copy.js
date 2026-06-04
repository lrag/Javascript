const fs = require("fs/promises")


function juntarFicheros(){

    return Promise.all([
            fs.readFile("./texto1.txt"), 
            fs.readFile("./texto2.txt"), 
            fs.readFile("./texto3.txt") 
        ])
        .then( ([contenido1, contenido2, contenido3]) => {
            let contenidoFinal = contenido1.toString()+'\n'+contenido2.toString()+'\n'+contenido3.toString()
            return fs.writeFile("./texto4.txt", contenidoFinal)
        })
        //.then(function(x){
        //    console.log("FIN")
        //})    
        .catch(() => {})    

}

juntarFicheros()
    .then( x => { 
        console.log("FIN 1")
        //copiar el fichero creado a otro directorio
    })

juntarFicheros()
    .then( x => { 
        console.log("FIN 2")
        //enviar el fichero creado a un destino remoto
    })

juntarFicheros()
    .then( x => { 
        console.log("FIN 3")
        //guardar el contenido del fichero creado en la base de datos
    })

    
///////////////////////////
// AHORA CON ASYNC-AWAIT //
///////////////////////////

async function juntarFicheros_ASYNC(){

    //Sin el await: 'contenido1' es una promesa
    //let contenido1 = fs.readFile("./texto1.txt")

    //Con el await: 'contenido1' es el contenido del fichero
    let contenido1 = await fs.readFile("./texto1.txt")
    let contenido2 = await fs.readFile("./texto2.txt") 
    let contenido3 = await fs.readFile("./texto3.txt") 

    let contenido4 = contenido1+'\n'+contenido2+'\n'+contenido3

    await fs.writeFile("./texto4Bis.txt", contenido4)
    console.log("Fichero creado")

}

juntarFicheros_ASYNC()
    .then( () => console.log("Cogiendo el nuevo fichero y moviendolo a otro directorio..."))