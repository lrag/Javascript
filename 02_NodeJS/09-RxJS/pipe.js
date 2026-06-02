"use strict";
exports.__esModule = true;
//npm install rxjs
var rxjs_1 = require("rxjs");
const Observable = require("rxjs").Observable
const pipe = require("rxjs").pipe
const map = require("rxjs").map
const tap = require("rxjs").tap
const filter = require("rxjs").filter

//MAP/////////////////////////////////////////////////////////

class HttpClient {
    get(url){
        return new Observable(function(subscribers){
            subscribers.next(
                {
                    data: ['uno','dos','tres','cuatro','cinco']
                })
            subscribers.complete()
        })
    }
}

class Servicio {

    httpClient = new HttpClient()

    listarPeliculas(){
        return this.httpClient.get('http://localhost/peliculas')
                .pipe(
                    map( respuesta => respuesta.data)
                )
    }

    contarPeliculas(){
        return this.httpClient.get('http://localhost/peliculas')
                .pipe(
                    map( respuesta => respuesta.data.length)
                )        
    }

    listarPeliculasMayusculas(){
        return this.httpClient.get('http://localhost/peliculas')
                .pipe(
                    map( respuesta => respuesta.data.map(e => e.toUpperCase()))
                )        
    }
}

//Componente
let servicio = new Servicio()
servicio.listarPeliculas().subscribe({
    next: listaPeliculas => console.log(listaPeliculas)    
})

servicio.contarPeliculas().subscribe({
    next: numero => console.log(numero)    
})

servicio.listarPeliculasMayusculas().subscribe({
    next: listaPeliculas => console.log(listaPeliculas)       
})

//FILTER//////////////////////////////////////////////////////

function movida(){
    return new Observable(function(subscribers){
        subscribers.next(1)
        subscribers.next(2)
        subscribers.next(3)
        subscribers.next(4)
        subscribers.next(5)
        subscribers.next(6)
        subscribers.complete()
    })
}

function eventosPares(){
    return movida()
        .pipe(
            filter( evento => evento%2==0)
        )
}

function eventosImpares(){
    return movida()
        .pipe(
            filter( evento => evento%2!=0)
        )
}

eventosPares()
    .subscribe({
        next: (evento) => console.log("Evento recibido: "+evento)
    })

eventosImpares()
    .subscribe({
        next: (evento) => console.log("Evento recibido: "+evento)
    })


