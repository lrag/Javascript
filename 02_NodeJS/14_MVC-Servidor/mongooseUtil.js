//npm install mongodb
const mongoose = require("mongoose")

exports.conectar = async function(){
    const url = "mongodb://localhost:27017/ejemplo-mvc"
    console.log("conectando con la base de datos: "+url)

    try {
        await mongoose.connect(url)
        console.log("Conexión con la base de datos establecida.")
    } catch (err) {
        console.log(err)
        throw {
            codigo  : "500",
            mensaje : "Fallo al conectar a la base de datos"
        }
    }
}



