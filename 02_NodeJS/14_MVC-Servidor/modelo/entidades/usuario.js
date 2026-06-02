let mongoose = require("mongoose")

esquemaUsuario = new mongoose.Schema({
    login    : String,
    password : String,
    rol      : String,
    nombre   : String,
    correoE  : String
})    

exports.Usuario = mongoose.model('usuarios', esquemaUsuario)