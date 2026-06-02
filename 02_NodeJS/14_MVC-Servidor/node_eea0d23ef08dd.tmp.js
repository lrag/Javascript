//npm install ejs
//npm install express-session

const http = require("http")
const express = require("express")
const session = require("express-session")
const seguridad = require("./seguridad/controlSesion")
const interceptorNoCache = require("./seguridad/interceptorNoCache")
const bodyParser = require('body-parser')
const mongooseUtil = require("./mongooseUtil")
const routerProductos = require("./controladores/controladorProductos").router
const routerAutenticacion = require("./controladores/controladorAutenticacion").router

arrancarAplicacion()

async function arrancarAplicacion() {

    try {
        await mongooseUtil.conectar()

        const app = express()
        app.set('view engine', 'ejs');
        app.set('views', 'vistas')

        //El manejo de las sesiones en 'express-session' se realiza en un middleware
        app.use(session({
            resave: false,
            saveUninitialized: false,
            secret: "hola",
            rolling: true,
            cookie: {
               expires: 60 * 1000
               /*
               path: '/privado', 
               httpOnly: true, 
               secure: false 
               */
            }    
        })) 

        app.use(seguridad.comprobarSesion)
        app.use(interceptorNoCache.interceptorNoCache)

        //Necesitamos este body parser para acceder a los parámetros que vengan en las
        //peticiones POST
        app.use(bodyParser.urlencoded({     
            extended: true
        }));        

        app.use(routerProductos)
        app.use(routerAutenticacion)

        app.use(express.static("./recursosEstaticos"))

        http.createServer(app)
            .listen(10000, () => console.log("Esperando peticiones http en el puerto 10000"))
            
    } catch(error){
        console.log(error)
    }
}
