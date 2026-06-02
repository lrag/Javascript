const Producto = require("../entidades/producto").Producto

exports.listarProductos = async function(){
    try{
        return await Producto.find({})
    } catch (error) {
        console.log(error)
        throw { codigo:500, mensaje:'Error en la base de datos, JDT' }
    }
}

exports.buscarProductoPorId = async function(idProducto){
    try{
        return await Producto.findOne({ _id: idProducto})
    } catch (error) {
        console.log(error)
        throw { codigo:500, mensaje:'Error en la base de datos, JDT' }
    }
}

exports.insertarProducto = async function(producto, autoridad){
    try {
        //Autorizacion
        //if(autoridad.rol != "EMPLEADO"){
        //    throw crearError(403, "Solo los empleados pueden añadir productos")
        //}

        //Validación...

        //Insertar el producto
        let productoMG = new Producto(producto)
        return await productoMG.save()
    } catch(error) {
        console.log(error)
        if(error.codigo){
            throw error
        }
        throw crearError(500, 'Error en la base de datos, TJ')
    }
}