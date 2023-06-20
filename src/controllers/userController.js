const fs = require("fs")
const path = require ("path");

const usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../database/users.json")))

module.exports = {

    
    login: (req, res) => {
        return res.render("login")
    },

    register: (req, res) => {
        return res.render("register")
    },
    processRegister: (req, res) => {
        const usuarioNuevo = {
            "id": usuarios.length+1,
            "nombre": req.body.nombre,
            "nombreUsuario": req.body.nombreUsuario,
            "email": req.body.email,
            "fechaNacimiento": req.body.fechaNacimiento,
            "domicilio": req.body.domicilio,
            "perfil": req.body.perfil,
            "intereses": req.body.interes,
            "foto": req.file.filename,
            "contrasenia": req.body.contrasenia
        }


        fs.writeFileSync(path.resolve(__dirname,"../database/users.json"), JSON.stringify([...usuarios, usuarioNuevo],null, 2),"utf-8")
        res.redirect("/")
    },
    perfil: (req, res) => {
        
        const usuarioPerfil = usuarios.find(row => row.nombreUsuario == req.body.nombreUsuario)
        if(usuarioPerfil && usuarioPerfil.borrado == false && usuarioPerfil.contrasenia == req.body.contrasenia) {
            return res.render("perfil", {datos:usuarioPerfil})
        } else {
            return res.render("mensajeSinPerfil")
        }

    },
    perfilEdit: (req, res) => {
        const usuarioPerfil = usuarios.find(row => row.id == req.params.id)
        return res.render("formUserEdit", {datosEdit:usuarioPerfil})
    },

    perfilEditProcess: (req, res) => {
        const usuarioPerfil = usuarios.find(row => row.id == req.params.id)

        /*for (let prop in req.body) {                  es una opcion
            usuarioPerfil[prop] = req.body[prop]
        }*/

        usuarioPerfil.nombre = req.body.nombre,
        usuarioPerfil.nombreUsuario = req.body.nombreUsuario,
        usuarioPerfil.email = req.body.email,
        usuarioPerfil.fechaNacimiento = req.body.fechaNacimiento,
        usuarioPerfil.domicilio = req.body.domicilio,
        usuarioPerfil.perfil = req.body.perfil,
        usuarioPerfil.interes = req.body.interes,


        fs.writeFileSync(path.resolve(__dirname,"../database/users.json"), JSON.stringify(usuarios,null, 2),"utf-8")
        res.redirect("/")


    },
    deleteProcess:(req, res) => {
        const usuarioPerfil = usuarios.find(row => row.id == req.params.id)

        usuarioPerfil.borrado = true

        fs.writeFileSync(path.resolve(__dirname,"../database/users.json"), JSON.stringify(usuarios,null, 2),"utf-8")
        res.redirect("/")
    },
   

}