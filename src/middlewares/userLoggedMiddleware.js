const fs = require("fs");
const path = require("path");

const usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../database/users.json")));

function userLoggedMiddleware(req, res, next) {

    let emailInCookie = req.cookies.userEmail
    let userFromCookie = usuarios.find(row => row.email == emailInCookie)

    if(userFromCookie) {
        req.session.usuarioLoggeado = userFromCookie
    }

    if(req.session && req.session.usuarioLoggeado) {
        res.locals.estaLoggeado = true
    } else {
        res.locals.estaLoggeado = false // variable que todas las vistas de mi app puedne conocer, para la navbar
    }



	next();
}

module.exports = userLoggedMiddleware;