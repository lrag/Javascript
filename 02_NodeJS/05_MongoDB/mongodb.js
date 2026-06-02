//npm install mongodb
const mongoDB = require("mongodb")

/////////////////////
// MONGO DB CLIENT //
/////////////////////

//Funciones asíncronas:
//-mongoClient.connect
//-dbs.close
//-collection.insert
//-collection.insertOne
//-collection.findOne
//-cursor.toArray

//Funciones síncronas:
//-dbs.db("nombre_esquema")
//-db.collection("nombre_coleccion")
//-collection.find() 

//////////////////////////////////
//Obtener una conexión a MongoDB//
//////////////////////////////////

//
//mongodb://<ip>:<puerto>[/esquema]
//
const url = "mongodb://localhost:27017"

//Creamos el objeto 'MongoClient'
const client = new mongoDB.MongoClient(url)

//La función connect es asíncrona
//Nos dan un objeto que representa al servidor de bases de datos
console.log("Conectando a mongoDB...")


//1-Conectar
//2-Insertar un disco
//3-Listar los discos
//4-Desconectar

let dbs
let coleccionDiscos

client.connect()
    .then(function(_dbs){
        console.log("Conectado")
        dbs = _dbs

        //Al objeto dbs le pedimos el esquema que necesitamos
        let esquemaDiscos = dbs.db("esquema_discos")   
        
        //Al esquema le pedimos la colección que vamos a utilizar
        coleccionDiscos = esquemaDiscos.collection("discos")        

        /////////////
        //insertOne//
        /////////////
        let disco = {
            //_id : "TOCOTO",
            titulo : "Back in black",
            grupo  : "AC/DC",
            year   : 1980,
            discografica : "NPI"
        }

        return coleccionDiscos.insertOne(disco)
    })
    .then(function(rs){
        console.log("Disco insertado")
        console.log(rs)

        let cursor = coleccionDiscos.find() //Esto es síncrono y devuelve un cursor
        //toArray (o cualquier otro modo de recorrer el cursor) es asóincrono
        return cursor.toArray()
    })
    .then(function(discos){
        console.log(discos)

        //Desconectamos para quedar bien
        return dbs.close()
    })
    .then(function(){
        console.log("desconectado")
    })
    .catch(function(err){
        console.log(err)
    })

