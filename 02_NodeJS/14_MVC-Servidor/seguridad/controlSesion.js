
exports.comprobarSesion = function(request, response, next){
    if(request.url.startsWith("/seguro") && !request.session.usuario){
        response.redirect('/login')
        return 
    }
    next()
}