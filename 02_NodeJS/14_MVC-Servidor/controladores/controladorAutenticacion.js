const express = require("express")
const router = express.Router()
const negocioUsuarios = require("../modelo/negocio/negocioUsuarios")

router.get("/login", mostrarLogin)
router.post("/login", login)
router.post("/logout", function(request, response){
    request.session.destroy()
    response.redirect("/login")
})

exports.router = router


async function mostrarLogin(request, response){
    try {
        response.render('login', {
            mensaje: ''
        })
    } catch (error) {
        console.log(error)
        response.end("ERROR MOSTRANDO EL LOGIN (WTF)")
    }
}

async function login(request, response){
    let login = request.body.login
    let password = request.body.password

    try {
        let usuario = await negocioUsuarios.comprobarCredenciales(login, password)
        //La sesión se crea automáticamente cuando el request pasa por el middleware de express-session
        const session = request.session
        delete usuario.password
        //Marcamos la sesión como nuestra añadiénole una propiedad
        session.usuario = usuario
        //Estimamos la posibilidad de cambiar el tiempo de expiración
        response.redirect('/seguro/listadoProductos')
    } catch (error) {
        console.log(error)
        if(error.codigo == 500){
            response.end("ERROR 500") //Redirigir a una página de error
            return
        }
        response.render('login', {
            mensaje: 'Credenciales incorrectas'
        })        
    }
}

