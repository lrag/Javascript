const Usuario = require("../entidades/usuario").Usuario

exports.comprobarCredenciales = async function(login, password){
    try{
        let usuario = await exports.buscarUsuarioPorLogin(login)
        if(!usuario){
            throw { codigo:404, mensaje:'No existe el usuario'}
        }
        if(usuario.password != password) {
            throw { codigo:400, mensaje:'Password incorrecto'}
        }
        return usuario
    } catch (error) {
        if(error.codigo){
            throw error
        }
        console.log(error)
        throw { codigo:500, mensaje:'Error en la base de datos, JDT' }
    }
}

exports.buscarUsuarioPorLogin = async function(login){
    try{
        return await Usuario.findOne({ login: login})
    } catch (error) {
        console.log(error)
        throw { codigo:500, mensaje:'Error en la base de datos, JDT' }
    }
}

//buscarUsuarioPorId
//insertarUsuario
//modificar
//borrar
//...
