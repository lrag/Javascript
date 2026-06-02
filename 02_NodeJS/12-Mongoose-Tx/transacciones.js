//npm install run-rs -g
//npm install mongodb
//run-rs -v 4.0.0

//Para hacerlo sin historias:
//1 - Parar el servicio de mongodb (si lo tenemos)
//2 - Creamos los directorios
//    mkdir -p /data/rs1 /data/rs2 /data/rs3
//    c:/data/rs1
//    c:/data/rs2
//    c:/data/rs3
//3 - Levantar las tres instancias
//    mongod --port 27017 --dbpath /data/rs1 --replSet rs0
//    mongod --port 27018 --dbpath /data/rs2 --replSet rs0
//    mongod --port 27019 --dbpath /data/rs3 --replSet rs0
//4 - Abrir una shell de mongoDB
//5 - Escribimos el comando
//    rs.initiate({
//        _id : 'rs0',
//        members: [
//            { _id: 0, host: "localhost:27017" },
//            { _id: 1, host: "localhost:27018" },
//            { _id: 2, host: "localhost:27019" }
//        ]
//     })
//6 - Verificar
//    rs.status()


let mongoose = require("mongoose")

//cmd hostname
let urlBBDD = "mongodb://localhost:27017/mongoose-tx"

//Delegamos en mongoose el establecimiento de la conexión con el servidor de BB.DD.

console.log("Conectando con la base de datos")
mongoose
    .connect(urlBBDD)
    .then(pruebasMongoose)
    .catch( err => console.log(err))

async function pruebasMongoose(){

    let esquemaCoche = new mongoose.Schema({
        marca      : String,
        modelo     : String,
        nmatricula : String,
    })

    let Coche = mongoose.model('coches', esquemaCoche) 
    
    const session = await mongoose.startSession();
    session.startTransaction()

    //await Coche.deleteMany({})

    let coche1 = new Coche({ marca:'marca1', modelo:'modelo1', matricula:'matricula1' })
    let coche2 = new Coche({ marca:'marca2', modelo:'modelo2', matricula:'matricula2' })
    let coche3 = new Coche({ marca:'marca3', modelo:'modelo3', matricula:'matricula3' })

    await coche1.save({ session })
    await coche2.save({ session })
    await coche3.save({ session })

    console.log("-1------------------------------------")
    let coches1 = await Coche.find({}).session(session)
    for(let c of coches1){
        console.log(c.marca)
    }
    console.log("-2------------------------------------")
    let coches2 = await Coche.find({})
    for(let c of coches2){
        console.log(c.marca)
    }

    //await session.abortTransaction()  
    await session.commitTransaction()

    console.log("-3------------------------------------")
    let coches3 = await Coche.find({})
    for(let c of coches3){
        console.log(c.marca)
    }    
    
    await mongoose.disconnect()
    console.log("FIN")
}

