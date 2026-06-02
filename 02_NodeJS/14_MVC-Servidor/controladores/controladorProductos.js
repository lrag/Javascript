const express = require("express")
const router = express.Router()
const negocioProductos = require("../modelo/negocio/negocioProductos")

router.get("/seguro/listadoProductos", mostrarListadoProductos)
router.get("/seguro/formularioProductos", mostrarFormularioProductos)
router.post("/seguro/insertarProducto", insertarProducto)

exports.router = router

const movida = require("../seguridad/controlSesion")

async function mostrarListadoProductos(request, response){
    
    console.log(request.session)
    
    try {
        let listadoProductos = await negocioProductos.listarProductos()
        response.render('seguro/listadoProductos', {
            'listadoProductos': listadoProductos,
            'usuario' : request.session.usuario,
            'expiracionSesion' : request.session.cookie.originalMaxAge
        })
    } catch (error) {
        console.log(error)
        response.end("ERROR LISTANDO LOS PRODUCTOS")
    }
}

async function mostrarFormularioProductos(request, response){

    let idProducto = request.query.idProducto
    let productoSel = {}
    if(idProducto){
        productoSel = await negocioProductos.buscarProductoPorId(idProducto)
    }

    response.render('seguro/formularioProductos', {
        productoSel : productoSel,
        'usuario' : request.session.usuario,
        'expiracionSesion' : request.session.cookie.originalMaxAge        
    })
}

async function insertarProducto(request, response){

    try{
        let producto = {
            codigo : request.body.codigo,
            nombre : request.body.nombre,
            fabricante: request.body.fabricante,
            categoria :request.body.categoria,
            caracteristicas : request.body.caracteristicas,
        }
        await negocioProductos.insertarProducto(producto)

        //Esto está mal porque ya tenemos este código en 'mostrarListadoProductos'
        //let listadoProductos = await negocioProductos.listarProductos()
        //response.render('listadoProductos', {
        //    'listadoProductos': listadoProductos
        //})

        //Esto es un forward. Si el usuario pulsa F5 se repite la última petición
        //que fue 'POST /insertarProducto' y por lo tanto se insertaría un duplicado
        //MAL
        //await mostrarListadoProductos(request, response)

        //Respues de un post va siempre un redirect

        response.redirect('/seguro/listadoProductos')
        
    } catch (error) {
        console.log(error)
        response.end("ERROR INSERTADO EL PRODUCTO")
    }


    //response.render('formularioProductos')
}