
$(inicializar)

function inicializar(){
    $("#btnNuevo").on("click", nuevaPelicula)
    $("#btnRefrescar").on("click", listarPeliculas)
    listarPeliculas()
}

function nuevaPelicula(){
    window.location = "./formularioPeliculas.html"
}

function listarPeliculas(){
    $.ajax({
        url : '/peliculas'
    })
    .done(rellenarTablaPeliculas)
    .fail(function(err){
        console.log(err)
    })
}

function rellenarTablaPeliculas(peliculas){
    $("#tablaPeliculas").html('')
    for(let pelicula of peliculas){
        $(` <tr>
                <td>${pelicula.titulo}</td>
                <td>${pelicula.director}</td>
                <td>${pelicula.genero}</td>
                <td>${pelicula.year}</td>
            </tr>`)
        .on('click', function(){
            seleccionarPelicula(pelicula)
        })
        .appendTo("#tablaPeliculas")
    }
}

function seleccionarPelicula(pelicula){
    window.location = './formularioPeliculas.html?idPelicula='+pelicula._id
}