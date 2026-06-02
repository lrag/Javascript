const mongoDB = require("mongodb")

const url = "mongodb://localhost:27017"
const client = new mongoDB.MongoClient(url)

function ejecutarMovida(){
    return new Promise(function(resolve,reject){
        let dbs
        let coleccionDiscos
        let listadoDiscos
        client.connect()
            .then(function(_dbs){
                dbs = _dbs
                let esquemaDiscos = dbs.db("esquema_discos")   
                coleccionDiscos = esquemaDiscos.collection("discos")  
                let disco = {
                    titulo : "Point of no return",
                    grupo  : "Kansas",
                    year   : 1974,
                    discografica : "NPI"
                }
                return coleccionDiscos.insertOne(disco)
            })
            .then(function(rs){
                console.log(resultadoInsercion)
                let cursor = coleccionDiscos.find()         
                return cursor.toArray()
            })
            .then(function(discos){
                listadoDiscos = discos
                return dbs.close()
            })
            .then(function(){
                resolve(listadoDiscos)
            })
            .catch(function(err){
                console.log(err)
                reject(err)
            })
    })
}

//////////////////////////////////////
// AHORA CHUPI GUAY CON ASYNC-AWAIT //
//////////////////////////////////////

async function ejecutarMovida(){

    try {
        let dbs = await client.connect()
        let coleccionDiscos = dbs.db("esquema_discos").collection("discos")  

        let disco = {
            titulo : "Machine head",
            grupo  : "Deep Purple",
            year   : 1971,
            discografica : "EMI"
        }

        let resultadoInsercion = await coleccionDiscos.insertOne(disco)
        console.log(resultadoInsercion)

        let discos = await coleccionDiscos.find().toArray()
        await dbs.close()

        return discos
    } catch (err) {
        console.log(err)
        throw { codigo: 500, mensaje: "error con la base de datos"}
    }
}


ejecutarMovida()
    .then(function(listadoDiscos){
        console.log(listadoDiscos)
    })
    .catch(function(err){
        console.log(err)
    })

