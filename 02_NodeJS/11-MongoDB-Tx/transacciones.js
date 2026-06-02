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

const mongoDB = require("mongodb")

let url = "mongodb://localhost:27017"

const client = new mongoDB.MongoClient(url)
console.log("Conectando a mongoDB...")
client.connect()
    .then(pruebas)
    .catch(err => console.log(err))

async function pruebas(dbs){

    let session 
    try {
        //Obtenemos una sesión
        //Hace falta una por cada petición
        session = dbs.startSession()
        //Iniciamos la transaccion
        session.startTransaction()

        console.log("Conexión establecida.")
        let esquema = dbs.db("mongodb-tx")
        let coleccion = esquema.collection("cosas-que-ver")

        let cosa1 = { titulo : 'Neon Genesis Evangelion' }
        let cosa2 = { titulo : 'Frieren' }
        let cosa3 = { titulo : 'Kimetsu no yaiba' }
        let cosa4 = { titulo : 'Konosuba' }

        await coleccion.insertOne(cosa1, { session } )
        await coleccion.insertOne(cosa2, { session } )
        await coleccion.insertOne(cosa3, { session } )
        await coleccion.insertOne(cosa4, { session } )

        functionQuePeta()
        
        console.log(await coleccion.find({}).toArray())              // []
        console.log(await coleccion.find({}, { session }).toArray()) // [cqv1,cqv2,cqv3,cqv4]
        await session.commitTransaction()

        console.log(await coleccion.find({}).toArray())              // [cqv1,cqv2,cqv3,cqv4]

    } catch (error) {
        console.log(error)
        await session.abortTransaction()
    } finally {
        await session.endSession()
        await dbs.close()
        console.log("FIN")
    }
    
}    

function functionQuePeta(){
    throw "ZASCA"
}

