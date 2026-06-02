
$(inicializar)

function inicializar(){
    $("#btnInsertar").on('click', insertarPelicula)
    $("#btnVolver").on('click', volver)

    let url = window.location.href 
    if(url.includes('?')){ 
        modoSeleccion() 
        let idPelicula = url.split("=")[1]
        obtenerPelicula(idPelicula, rellenarFormulario) //Apostamos a que hay solo un parámetro y es el id de la peli
    } else {
        modoInserccion()
    }
}

function volver(){
    document.location = "./listadoPeliculas.html"
}

function modoSeleccion(){
    $("#btnInsertar").attr("disabled", true);
    $("#btnModificar").attr("disabled", false);
    $("#btnBorrar").attr("disabled", false);
}

function modoInserccion(){
    $("#btnInsertar").attr("disabled", false);
    $("#btnModificar").attr("disabled", true);
    $("#btnBorrar").attr("disabled", true);
}

function obtenerPelicula(idPelicula, callback){
    
    console.log("WTF")

    $.ajax({
        url: '/peliculas/'+idPelicula
    })
    //.done(function(pelicula){
    //    callback()
    //})
    .done(callback)
    .fail(function(err){
        console.log(err)
    })

}

function rellenarFormulario(pelicula){
    $("#titulo").val(pelicula.titulo),
    $("#director").val(pelicula.director),
    $("#genero").val(pelicula.genero),
    $("#year").val(pelicula.year)    
}

function insertarPelicula(){

    console.log("HABER KE PASA")

    let pelicula = {
        titulo   : $("#titulo").val(),
        director : $("#director").val(),
        genero   : $("#genero").val(),
        year     : $("#year").val()
    }

    $.ajax({
        url : './peliculas',
        type: 'POST',
        contentType : 'application/json',
        data        : JSON.stringify(pelicula)
    })
    .done(function(respuesta){
        console.log(respuesta)
    })
    .fail(function(error){
        console.log(error.responseJSON)
    })

}