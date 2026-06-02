let mongoose = require("mongoose")

//No hace falta exportar el esquema porque el modelo tiene una referencia a él (Producto.schema)
esquemaProducto = new mongoose.Schema({
    codigo          : String,
    nombre          : String,
    fabricante      : String,
    categoria       : String,
    caracteristicas : String
})    

exports.Producto = mongoose.model('productos', esquemaProducto)