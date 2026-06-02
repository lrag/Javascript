
$(inicializar)

function inicializar(){
    $("#btnInsertar").on('click', insertarPelicula)

    let url = window.location.href 
    if(url.includes('?')){
        let idPelicula = url.split("=")[1]
        obtenerPelicula(idPelicula, rellenarFormulario) //Apostamos a que hay solo un parámetro y es el id de la peli
    }
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