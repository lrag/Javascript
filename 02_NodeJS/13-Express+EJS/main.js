//npm install ejs
const http = require("http")
const express = require("express")

//Creamos la infraestructura habitual para node+express
const app = express()
app.get('/listadoPeliculas', mostrarListadoPeliculas)

//Le indicamos a express que vamos a utilizar un motor de plantillas distinto
//a la puta mierda que trae de serie
app.set('view engine', 'ejs');
//Indicamos la ubicación de las plantillas
app.set('views', 'plantillas')

http.createServer(app)
    .listen(9000, () => console.log("Esperando peticiones http en el puerto 9000"))

///////////////////////////////////////
// FUNCIONES DE LA LÓGICA DE CONTROL //
///////////////////////////////////////
/*
Tareas de la lógica de control en una aplicación MVC 100% en el servidor

- averiguar qué nos están pidiendo (esto ya lo hace express porque llama directamente a la función asociada a la petición)
- extraer de la petición los datos necesarios
- transformarlos en lo que necesita la capa del modelo (negocio)
- llamar al método de negocio adecuado (solo a uno!)
- escoger cuál será la siguiente vista
- preparar los datos para la vista (con llamadas a la capa del modelo)
- generar la vista pasandole los valores
- devolver la vista
- FIN
*/

async function mostrarListadoPeliculas(request, response){
    //Si queremos responder con el html generado por una plantilla
    //utilizamos la función render(nombre-plantilla) del request
    let listadoPeliculas = await listarPeliculas()
    response.render('listadoPeliculas', {
        listadoPeliculas : listadoPeliculas
    })
}

/*
@GetMapping(path = "/listadoClientes")
public ModelAndView verListadoClientes() {
    ModelAndView mav = new ModelAndView("listadoClientes");
    mav.addObject("listaClientes", repositorioClientes.findAll());
    return mav;
}
*/

/////////////////////////////////////////////////////
//Simulamos aquí la función de la lógica de negocio//
/////////////////////////////////////////////////////
async function listarPeliculas(){
    //Simulamos una consulta a la bb.dd.
    return [
        {
            titulo : 'Indiana Jones',
            director : 'Steven Spielberg'
        },
        {
            titulo : 'Depredador',
            director : 'John McTiernan'
        },
        {
            titulo : 'Los Goonies',
            director : 'Richerd Donner'
        },
        {
            titulo : 'Tron',
            director : 'Steven Lisberger'
        },
        {
            titulo : 'Los violentos de Kelly',
            director : 'Brian G. Hutton'
        }
    ]    
}


