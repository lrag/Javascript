
const urlServicio = "http://localhost:3000/"

function mostrarMensaje(){
    let mensaje = sessionStorage.getItem("mensaje")
    if(mensaje){
        $("#mensaje").html(`<h3>${mensaje}</h3>`)
        sessionStorage.removeItem("mensaje")
    }
}